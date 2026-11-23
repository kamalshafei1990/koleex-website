const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { createHash, createHmac } = require('node:crypto');
const { readFileSync, readdirSync } = require('node:fs');
const { resolve } = require('node:path');
const ts = require('typescript');
const { NextRequest } = require('next/server');

const root = resolve(__dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
// Exercise the actual TS sources without introducing a test-runner dependency.
// Only framework request context and the bridge are stubbed where noted.
function load(path, stubs = {}) {
  const code = ts.transpileModule(read(path), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const mod = { exports: {} };
  const localRequire = (id) => {
    if (Object.hasOwn(stubs, id)) return stubs[id];
    if (id.startsWith('@/')) return load(`src/${id.slice(2)}.ts`, stubs);
    return require(id);
  };
  new Function('require', 'module', 'exports', code)(localRequire, mod, mod.exports);
  return mod.exports;
}
const originalFetch = global.fetch;
const envNames = ['COMING_SOON', 'WEBSITE_BRIDGE_KEY', 'HUB_URL'];
const originalEnv = Object.fromEntries(envNames.map((key) => [key, process.env[key]]));
afterEach(() => {
  global.fetch = originalFetch;
  for (const key of envNames) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});
function configureBridge() {
  process.env.WEBSITE_BRIDGE_KEY = 'synthetic-test-key';
  process.env.HUB_URL = 'https://hub.example.test/';
  delete process.env.COMING_SOON;
}

test('71 exact original PNGs cover all markets and match recorded SHA-256', () => {
  const markets = load('src/data/koleex-markets.ts').KOLEEX_MARKETS;
  const manifest = JSON.parse(read('public/flags/manifest.json'));
  assert.equal(markets.length, 71);
  assert.equal(manifest.assets.length, 71);
  assert.deepEqual(manifest.assets.map((asset) => asset.code).sort(), markets.map((m) => m.code).sort());
  assert.deepEqual(readdirSync(resolve(root, 'public/flags/w80')).sort(), manifest.assets.map((a) => `${a.code.toLowerCase()}.png`).sort());
  let bytes = 0;
  for (const asset of manifest.assets) {
    assert.equal(asset.source, `https://flagcdn.com/w80/${asset.code.toLowerCase()}.png`);
    assert.equal(asset.file, `w80/${asset.code.toLowerCase()}.png`);
    const data = readFileSync(resolve(root, 'public/flags', asset.file));
    assert.equal(createHash('sha256').update(data).digest('hex'), asset.sha256);
    assert.equal(data.length, asset.bytes);
    assert.equal(data.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(data.readUInt32BE(16), 80);
    assert.equal(data.readUInt32BE(20), asset.height);
    bytes += data.length;
  }
  assert.equal(bytes, 24260);
});

test('flags are same-origin, fallback retained; no Google font request or changed font stacks', () => {
  const flag = read('src/components/coming-soon/MarketFlag.tsx');
  assert.ok(flag.includes('src={`/flags/w80/${code.toLowerCase()}.png`}'));
  assert.ok(flag.includes('onError={() => setFailed(true)}'));
  assert.ok(flag.includes('width={20}') && flag.includes('height={13}') && flag.includes('unoptimized'));
  const css = read('src/app/globals.css');
  assert.doesNotMatch(css, /fonts\.googleapis\.com|fonts\.gstatic\.com|@font-face/);
  assert.ok(css.includes("--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;"));
  assert.ok(css.includes('"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif'));
  assert.ok(css.includes('"SF Arabic", "Geeza Pro", "Segoe UI", "Noto Sans Arabic", Tahoma, sans-serif'));
  assert.ok(read('src/components/coming-soon/coming-soon.module.css').includes('font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;'));
});

test('gate defaults closed without bridge; only existing explicit emergency env values open it', async () => {
  delete process.env.WEBSITE_BRIDGE_KEY;
  global.fetch = async () => { throw new Error('must not fetch without bridge'); };
  const { resolveComingSoon } = load('src/lib/coming-soon.ts');
  for (const value of [undefined, '', ' ', 'true', '1', 'garbage']) {
    if (value === undefined) delete process.env.COMING_SOON;
    else process.env.COMING_SOON = value;
    assert.equal(await resolveComingSoon(), true, String(value));
  }
  for (const value of ['false', '0', 'no', 'off', ' FALSE ']) {
    process.env.COMING_SOON = value;
    assert.equal(await resolveComingSoon(), false, value);
  }
});

test('Hub booleans win; requests stay authenticated, no-store, bounded, and uncached across calls', async () => {
  configureBridge();
  let calls = 0;
  global.fetch = async (url, options) => {
    calls++;
    assert.equal(url, 'https://hub.example.test/api/website/v1/site');
    assert.equal(options.headers.Authorization, 'Bearer synthetic-test-key');
    assert.equal(options.cache, 'no-store');
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ comingSoon: calls === 1 });
  };
  const { resolveComingSoon } = load('src/lib/coming-soon.ts');
  process.env.COMING_SOON = 'false';
  assert.equal(await resolveComingSoon(), true);
  delete process.env.COMING_SOON;
  assert.equal(await resolveComingSoon(), false);
  assert.equal(calls, 2);
  assert.ok(read('src/lib/coming-soon.ts').includes('AbortSignal.timeout(2500)'));
});

test('Hub network, timeout, HTTP, JSON and schema failures stay closed (unless existing env override)', async () => {
  configureBridge();
  const { resolveComingSoon } = load('src/lib/coming-soon.ts');
  const failures = [
    async () => { throw new Error('offline'); },
    async () => { throw new DOMException('timeout', 'TimeoutError'); },
    async () => new Response('', { status: 401 }),
    async () => new Response('', { status: 503 }),
    async () => new Response('not json'),
    async () => Response.json(null),
    async () => Response.json({}),
    async () => Response.json({ comingSoon: 'false' }),
    async () => Response.json({ comingSoon: 0 }),
  ];
  for (const failure of failures) {
    global.fetch = failure;
    delete process.env.COMING_SOON;
    assert.equal(await resolveComingSoon(), true);
    process.env.COMING_SOON = 'off';
    assert.equal(await resolveComingSoon(), false);
  }
});

test('middleware keeps root rewrite, direct teaser, other-page redirect, language and preview semantics', async () => {
  let closed = true;
  let calls = 0;
  const { middleware, config } = load('src/middleware.ts', {
    '@/lib/coming-soon': { resolveComingSoon: async () => { calls++; return closed; } },
  });
  const request = (path, headers) => new NextRequest(`https://www.example.test${path}`, { headers });
  const root = await middleware(request('/'));
  assert.equal(root.headers.get('x-middleware-rewrite'), 'https://www.example.test/en/coming-soon');
  assert.equal(root.headers.get('x-robots-tag'), 'noindex, nofollow');
  for (const path of ['/en/coming-soon', '/zh/coming-soon/']) {
    const response = await middleware(request(path));
    assert.equal(response.headers.get('x-middleware-next'), '1');
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  }
  const blocked = await middleware(request('/en/products?region=asia'));
  assert.equal(blocked.status, 307);
  assert.equal(blocked.headers.get('location'), 'https://www.example.test/');
  // Existing middleware bypass cookie behavior is preserved, not expanded.
  const beforePreview = calls;
  const preview = await middleware(request('/en/products', { cookie: '__prerender_bypass=synthetic' }));
  assert.equal(preview.headers.get('x-middleware-next'), '1');
  assert.equal(calls, beforePreview);
  closed = false;
  const open = await middleware(request('/', { 'accept-language': 'zh-CN' }));
  assert.equal(open.headers.get('location'), 'https://www.example.test/zh');
  assert.ok(config.matcher[0].includes('api/') && config.matcher[0].includes('_next/'));
});

test('preview endpoint still rejects missing/invalid/expired auth and enables draft mode only for valid HMAC', async () => {
  configureBridge();
  let enabled = 0;
  const { GET } = load('src/app/api/preview/route.ts', {
    'next/headers': { draftMode: async () => ({ enable: () => { enabled++; } }) },
  });
  const exp = Math.floor(Date.now() / 1000) + 300;
  const signature = createHmac('sha256', 'synthetic-test-key').update(`preview:home:${exp}`).digest('hex');
  const request = (query) => new Request(`https://www.example.test/api/preview?${query}`);
  const valid = `slug=home&exp=${exp}&sig=${signature}&lang=zh`;
  for (const query of ['', `slug=home&exp=${exp}&sig=${'0'.repeat(64)}`, `slug=home&exp=1&sig=${signature}`, `slug=home&exp=${exp + 1000}&sig=${signature}`]) {
    assert.equal((await GET(request(query))).status, 401);
    assert.equal(enabled, 0);
  }
  const response = await GET(request(valid));
  assert.equal(response.status, 307);
  assert.equal(response.headers.get('location'), 'https://www.example.test/zh');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(enabled, 1);
  delete process.env.WEBSITE_BRIDGE_KEY;
  assert.equal((await GET(request(valid))).status, 503);
  assert.equal(enabled, 1);
});

test('teaser page stays per-request and redirects only when its own fresh gate check is off', async () => {
  let connected = false;
  let closed = true;
  const teaser = () => null;
  const { default: page } = load('src/app/[lang]/coming-soon/page.tsx', {
    'next/server': { connection: async () => { connected = true; } },
    'next/navigation': { redirect: (path) => { throw new Error(`redirect:${path}`); } },
    '@/components/coming-soon/ComingSoon': { ComingSoon: teaser },
    '@/lib/coming-soon': { resolveComingSoon: async () => { assert.ok(connected); return closed; } },
  });
  assert.equal((await page()).type, teaser);
  connected = false;
  closed = false;
  await assert.rejects(page, /redirect:\/en/);
});
