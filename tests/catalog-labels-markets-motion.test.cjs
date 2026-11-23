const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { execFileSync } = require('node:child_process');
const postcss = require('postcss');
const root = resolve(__dirname, '..');
const base = '39c18ce67643d2b8203c14ad5b68e913f1b11dbd';
const read = path => readFileSync(resolve(root, path), 'utf8');
const previous = path => execFileSync('git', ['show', `${base}:${path}`], { cwd: root, encoding: 'utf8' });
const cssPath = 'src/components/coming-soon/coming-soon.module.css';
const tree = postcss.parse(read(cssPath));
const support = tree.nodes.find(n => n.type === 'atrule' && n.name === 'supports' && n.params.includes('details-content'));
const declarations = rule => Object.fromEntries(rule.nodes.map(n => [n.prop, n.value]));
const rules = [];
support.walkRules(rule => rules.push(rule));

test('catalog edit changes exactly two CTA labels and the section heading; delivery and all other content byte-identical', () => {
  const path = 'src/components/coming-soon/ComingSoon.tsx';
  const source = read(path);
  const expected = previous(path).replaceAll('Download Catalog 2025', 'Download Catalog').replace('              Catalog 2025\n', '              Catalog\n');
  assert.equal(source, expected);
  assert.equal((source.match(/^\s*Download Catalog\s*$/gm) || []).length, 2);
  assert.match(source, /id="catalog-heading"[^>]*>\s*Catalog\s*<\/h2>/);
  assert.match(source, /const CATALOG_HREF = "https:\/\/github.com\/kamalshafei1990\/koleex-website\/releases\/download\/catalog-2025\/KOLEEX-Catalog-2025.pdf";/);
  assert.equal((source.match(/href=\{CATALOG_HREF\}/g) || []).length, 2);
});

test('enhancement is gated on complete CSS support and no motion preference; unsupported/reduced motion stays native instant', () => {
  assert.equal(support.params, 'selector(details::details-content) and (interpolate-size: allow-keywords) and (transition-behavior: allow-discrete)');
  assert.equal(support.nodes.length, 1);
  assert.equal(support.nodes[0].name, 'media');
  assert.equal(support.nodes[0].params, '(prefers-reduced-motion: no-preference)');
  assert.equal(rules.length, 2);
  assert.ok(rules.every(rule => rule.parent === support.nodes[0]));
  // No override of UA content-visibility: closing still uses native hiding/AT semantics.
  assert.ok(rules.every(rule => !Object.hasOwn(declarations(rule), 'content-visibility')));
});

test('intrinsic open/closed endpoints and discrete visibility transition support both directions without fixed height caps', () => {
  assert.equal(rules[0].selector, '.marketRegion::details-content');
  assert.deepEqual(declarations(rules[0]), {
    'interpolate-size': 'allow-keywords',
    'block-size': '0',
    overflow: 'clip',
    transition: 'block-size 240ms cubic-bezier(.22, 1, .36, 1),\n        content-visibility 240ms allow-discrete',
  });
  assert.equal(rules[1].selector, '.marketRegion[open]::details-content');
  assert.deepEqual(declarations(rules[1]), { 'block-size': 'auto' });
  assert.doesNotMatch(support.toString(), /max-height|max-block-size|animation:|transition-delay|transform|opacity/);
});

test('rapid reversal contract: only current native open attribute selects endpoint, no pending JS state/timer/hydration work', () => {
  const path = 'src/components/coming-soon/MarketsDirectory.tsx';
  const source = read(path);
  assert.equal(source, previous(path));
  assert.doesNotMatch(source, /"use client"|setTimeout|requestAnimationFrame|onToggle=|onClick=|useEffect|useState|\bopen=|\bname=/);
  assert.doesNotMatch(support.toString(), /transition-delay|animation-delay|@keyframes/);
  // CSS transitions, not onetime keyframes, own interruption/reversal; actual
  // interpolation at mid-animation needs a browser, not a synthetic JS model.
  assert.equal(rules[1].nodes.length, 1);
});

test('after removing this enhancement the stylesheet is byte-identical; headers, chevron, grids and other sections untouched', () => {
  const stripped = tree.clone();
  const addition = stripped.nodes.find(n => n.type === 'atrule' && n.name === 'supports' && n.params.includes('details-content'));
  assert.equal(addition.prev().type, 'comment');
  assert.match(addition.prev().text, /^Progressive enhancement:/);
  addition.prev().remove();
  addition.remove();
  assert.equal(stripped.toString(), previous(cssPath));
  for (const path of ['src/components/coming-soon/MarketFlag.tsx', 'src/data/koleex-markets.ts', 'src/app/globals.css', 'package.json', 'package-lock.json', 'next.config.ts']) {
    assert.equal(read(path), previous(path), path);
  }
});
