const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve, dirname } = require('node:path');
const { execFileSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const ts = require('typescript');
const root = resolve(__dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const cache = new Map();
function load(path) {
  if (cache.has(path)) return cache.get(path);
  const code = ts.transpileModule(read(path), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const mod = { exports: {} };
  function localRequire(id) {
    if (id.endsWith('.css')) return new Proxy({}, { get: (_, key) => key === '__esModule' ? false : key });
    if (id.startsWith('@/')) return load(`src/${id.slice(2)}.ts`);
    if (id.startsWith('.')) return load(`${dirname(path)}/${id.slice(2)}.tsx`);
    return require(id);
  }
  new Function('require', 'module', 'exports', code)(localRequire, mod, mod.exports);
  cache.set(path, mod.exports);
  return mod.exports;
}
const { MarketsDirectory } = load('src/components/coming-soon/MarketsDirectory.tsx');
const markets = load('src/data/koleex-markets.ts').KOLEEX_MARKETS;
const html = renderToStaticMarkup(React.createElement(MarketsDirectory));
const panels = [...html.matchAll(/<details\b([^>]*)>([\s\S]*?)<\/details>/g)];
const expected = [['Asia', 33], ['Africa', 15], ['Europe', 10], ['North America', 5], ['South America', 8]];

test('five native disclosures start closed; no grouping or JS coupling can close a sibling', () => {
  assert.equal(panels.length, 5);
  for (const [, attrs, content] of panels) {
    assert.doesNotMatch(attrs, /\b(open|name)\s*(=|$)/);
    assert.match(content, /^<summary\b/);
    assert.equal((content.match(/<summary\b/g) || []).length, 1);
  }
  const source = read('src/components/coming-soon/MarketsDirectory.tsx');
  assert.doesNotMatch(source, /\b(?:useState|useEffect|onClick|onKeyDown|onToggle)\b|"use client"/);
});

test('native summary keyboard/focus semantics retained; heading, count and decorative chevron present', () => {
  for (let i = 0; i < panels.length; i++) {
    const content = panels[i][2];
    const [continent, count] = expected[i];
    const id = `markets-${continent.toLowerCase().replaceAll(' ', '-')}`;
    assert.match(content, new RegExp(`<h3 id="${id}" class="marketRegionTitle">${continent}</h3>`));
    assert.ok(content.includes(`<span class="marketRegionCount">${count} markets</span>`));
    assert.ok(content.includes(`aria-labelledby="${id}"`));
    assert.match(content, /<svg[^>]*width="16"[^>]*height="16"[^>]*aria-hidden="true"[^>]*focusable="false"/);
    assert.doesNotMatch(content, /tabindex|role="button"|aria-expanded|<button|<a\b/);
  }
  const css = read('src/components/coming-soon/coming-soon.module.css');
  assert.match(css, /\.marketRegionToggle\s*\{[^}]*display: flex;[^}]*justify-content: space-between;[^}]*width: 100%;[^}]*min-height: 44px;[^}]*padding: 14px 0;/);
  assert.match(css, /\.marketRegionCopy\s*\{[^}]*display: flex;[^}]*flex-direction: column;[^}]*gap: 2px;/);
  assert.match(css, /\.marketRegionTitle\s*\{[^}]*font-size: 22px;[^}]*font-weight: 600;[^}]*letter-spacing: -0.022em;[^}]*line-height: 1\.1;/);
  assert.match(css, /\.marketRegionCount\s*\{[^}]*font-size: 13px;[^}]*font-weight: 400;[^}]*line-height: 1\.23;/);
  assert.doesNotMatch(css, /\.marketRegion\[open\]\s*>\s*\.marketRegionToggle|\.marketRegionToggle:hover|\.marketRegionToggle:active\s*\{[^}]*background|rgba\(255,\s*255,\s*255,\s*0\.035\)/);
  assert.match(css, /\.marketRegionToggle:focus-visible\s*\{[^}]*outline: 2px solid #fff;/);
});

test('all 71 countries retain exact base data, continent/count/order and original local asset bytes', () => {
  assert.equal(markets.length, 71);
  const base = execFileSync('git', ['show', 'bab9cd87544cf2e9be97e5f90a3677289034a978:src/data/koleex-markets.ts'], { cwd: root, encoding: 'utf8' });
  assert.equal(read('src/data/koleex-markets.ts'), base);
  const manifest = JSON.parse(read('public/flags/manifest.json'));
  const actualNames = [];
  for (let i = 0; i < panels.length; i++) {
    const rows = [...panels[i][2].matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => m[1]);
    const group = markets.filter(m => m.continent === expected[i][0]);
    assert.equal(rows.length, expected[i][1]);
    rows.forEach((row, index) => {
      const market = group[index];
      assert.ok(row.endsWith(`<span>${market.name}</span>`));
      assert.ok(row.includes(`src="/flags/w80/${market.code.toLowerCase()}.png"`));
      assert.match(row, /alt=""/);
      actualNames.push(market.name);
      const asset = manifest.assets.find(a => a.code === market.code);
      const data = readFileSync(resolve(root, 'public/flags', asset.file));
      assert.equal(createHash('sha256').update(data).digest('hex'), asset.sha256);
    });
  }
  assert.deepEqual(actualNames, markets.map(m => m.name));
});

test('scoped CSS keeps wrapping two-column mobile, contained 20x13 flags, reduced motion and no country cards', () => {
  const css = read('src/components/coming-soon/coming-soon.module.css');
  assert.match(css, /@media \(max-width: 600px\)\s*\{\s*\.marketNames\s*\{[^}]*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 359px\)[\s\S]*?repeat\(auto-fit, minmax\(min\(100%, 120px\), 1fr\)\)/);
  assert.match(css, /\.marketNames li > span:last-child\s*\{[^}]*overflow-wrap: anywhere/);
  assert.match(css, /\.marketFlag img\s*\{[^}]*width: 20px;[^}]*height: 13px;[^}]*object-fit: contain/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.marketRegionChevron\s*\{\s*transition: none/);
  const rows = css.match(/\.marketNames li\s*\{([^}]*)\}/)[1];
  assert.doesNotMatch(rows, /background|border|box-shadow|ellipsis|nowrap/);
});

test('every changed stylesheet rule is markets-scoped; global rules and all other surfaces unchanged', () => {
  const postcss = require('postcss');
  const path = 'src/components/coming-soon/coming-soon.module.css';
  const previous = execFileSync('git', ['show', `bab9cd87544cf2e9be97e5f90a3677289034a978:${path}`], { cwd: root, encoding: 'utf8' });
  function rules(css) {
    const result = new Map();
    const occurrences = new Map();
    postcss.parse(css).walkRules(rule => {
      const parents = [];
      for (let p = rule.parent; p.type !== 'root'; p = p.parent) parents.unshift(`@${p.name} ${p.params}`);
      const identity = `${parents.join(' / ')} | ${rule.selector}`;
      const occurrence = occurrences.get(identity) || 0;
      occurrences.set(identity, occurrence + 1);
      const key = `${identity} #${occurrence}`;
      result.set(key, { selector: rule.selector, declarations: rule.nodes.map(n => n.toString()).join(';') });
    });
    return result;
  }
  const before = rules(previous), after = rules(read(path));
  for (const key of new Set([...before.keys(), ...after.keys()])) {
    if (before.get(key)?.declarations === after.get(key)?.declarations) continue;
    const rule = after.get(key) || before.get(key);
    for (const selector of rule.selector.split(',')) {
      assert.match(selector.trim(), /^\.market(?:Region|Names|Flag)\b|^\.marketRegion(?:Copy|Title|Count|Toggle|Chevron)\b/);
    }
  }
});
