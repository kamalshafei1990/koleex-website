import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { CATALOG, prepareCatalog, verifyCatalog } from '../scripts/prepare-catalog.mjs';

const bytes = Buffer.from('%PDF-1.7\noriginal fixture\n%%EOF\n');
const expected = { url: 'https://example.invalid/catalog.pdf', bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'koleex-catalog-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  return { dir, destination: join(dir, 'catalog.pdf'), expected };
}

test('official original provenance is pinned, not environment-controlled', () => {
  assert.equal(CATALOG.bytes, 80247243);
  assert.equal(CATALOG.sha256, 'c500080c3bad0dbd192eb4f80bf87ecaa876ff6b2adcdf879f7538092c7d1a43');
  assert.equal(CATALOG.url, 'https://github.com/kamalshafei1990/koleex-website/releases/download/catalog-2025/KOLEEX-Catalog-2025.pdf');
});
test('stages exact bytes atomically and rechecks cache without network', async t => {
  const options = await fixture(t);
  await prepareCatalog({ ...options, fetcher: async () => new Response(bytes) });
  assert.deepEqual(await readFile(options.destination), bytes);
  assert.equal(await verifyCatalog(options.destination, expected), true);
  assert.equal(await prepareCatalog({ ...options, fetcher: () => { throw new Error('no network allowed'); } }), 'verified existing file');
  assert.deepEqual(await readdir(options.dir), ['catalog.pdf']);
});
for (const [name, fetcher] of [
  ['HTTP failure', async () => new Response('not found', { status: 404 })],
  ['truncation', async () => new Response(bytes.subarray(0, 6))],
  ['same-length corruption', async () => new Response(Buffer.alloc(bytes.length, 88))],
  ['oversized response', async () => new Response(Buffer.alloc(bytes.length + 1))],
  ['network failure', async () => { throw new Error('offline'); }],
  ['body stream failure', async () => new Response(new ReadableStream({ start(controller) { controller.error(new Error('interrupted')); } }))],
]) {
  test(`${name} stops preparation and removes invalid/partial output`, async t => {
    const options = await fixture(t);
    await writeFile(options.destination, 'invalid cached PDF');
    await assert.rejects(prepareCatalog({ ...options, fetcher, attempts: 1 }));
    assert.deepEqual(await readdir(options.dir), []);
  });
}
test('bounded retries recover from transient HTTP errors and apply timeout signal', async t => {
  const options = await fixture(t);
  let calls = 0;
  await prepareCatalog({ ...options, fetcher: async (url, init) => {
    assert.equal(url, expected.url);
    assert.equal(init.redirect, 'follow');
    assert.ok(init.signal instanceof AbortSignal);
    return ++calls === 1 ? new Response(null, { status: 503 }) : new Response(bytes);
  } });
  assert.equal(calls, 2);
  assert.equal(await verifyCatalog(options.destination, expected), true);
});
test('both CTAs stay same-origin with exact unversioned copy and filename', async () => {
  const source = await readFile(new URL('../src/components/coming-soon/ComingSoon.tsx', import.meta.url), 'utf8');
  assert.match(source, /const CATALOG_HREF = "\/catalogs\/KOLEEX-Catalog-2025.pdf";/);
  assert.equal((source.match(/href=\{CATALOG_HREF\} download="KOLEEX-Catalog.pdf"/g) ?? []).length, 2);
  assert.equal((source.match(/Download Catalog\n/g) ?? []).length, 2);
  assert.doesNotMatch(source, /Catalog 2025|github.com/);
  const config = await readFile(new URL('../next.config.ts', import.meta.url), 'utf8');
  assert.match(config, /value: 'attachment; filename="KOLEEX-Catalog.pdf"'/);
  assert.match(config, /key: "Content-Type", value: "application\/pdf"/);
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(pkg.scripts.build, 'node scripts/prepare-catalog.mjs && next build');
});
test('timeouts exhaust bounded retries and leave no output', async t => {
  const options = await fixture(t);
  let calls = 0;
  // Keep the event loop alive: AbortSignal.timeout timers are unref'ed in Node.
  const keepAlive = setInterval(() => {}, 1000);
  t.after(() => clearInterval(keepAlive));
  await assert.rejects(prepareCatalog({ ...options, attempts: 2, timeoutMs: 5, fetcher: async (_url, { signal }) => {
    calls++;
    return new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true }));
  } }), { name: 'TimeoutError' });
  assert.equal(calls, 2);
  assert.deepEqual(await readdir(options.dir), []);
});
