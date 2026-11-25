const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { createHash } = require('node:crypto');

const root = resolve(__dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const OFFICIAL_QR_SHA256 = '05b05162c9462627b49ee78875aecfc0989606379f8ab0e57db0c1e8c47b7673';

test('official WeChat QR asset is byte-identical to the locked sha256', () => {
  const bytes = readFileSync(resolve(root, 'public/coming-soon/wechat-qr.png'));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), OFFICIAL_QR_SHA256);
  assert.equal(bytes.length, 78023);
});

test('popover shows official QR and scan copy; WeChat href and wechatId stay unpublished', () => {
  const button = read('src/components/coming-soon/WeChatButton.tsx');
  const socials = read('src/data/socials.ts');
  const row = read('src/components/coming-soon/SocialRow.tsx');
  assert.match(button, /const WECHAT_QR_SRC = "\/coming-soon\/wechat-qr\.png"/);
  assert.match(button, /aria-label="WeChat, scan to add"/);
  assert.match(button, /alt="WeChat QR code"/);
  assert.match(button, /width=\{240\}/);
  assert.match(button, /height=\{243\}/);
  assert.match(button, />Scan to add on WeChat\.</);
  assert.doesNotMatch(button, /wechatId/);
  assert.match(row, /<WeChatButton path=\{path\} email=\{email\} \/>/);
  assert.doesNotMatch(row, /wechatId=\{/);
  const wechat = socials.match(/id: "wechat",[\s\S]*?wechatId: null,/);
  assert.ok(wechat);
  assert.match(wechat[0], /href: null,/);
  assert.match(button, /href=\{KOLEEX_WHATSAPP_HREF\}/);
  assert.match(button, /href=\{`mailto:\$\{email\}`\}/);
});

test('popover CSS keeps a 240px unclipped QR on a right-aligned white card', () => {
  const css = read('src/components/coming-soon/coming-soon.module.css');
  assert.match(css, /\.popover\s*\{[^}]*right: 0;[^}]*left: auto;[^}]*width: min\(288px, 78vw\);/);
  assert.match(css, /\.popoverQr\s*\{[^}]*width: 240px;[^}]*max-width: 100%;[^}]*height: auto;[^}]*background: #fff;[^}]*border-radius: 8px;[^}]*filter: none;/);
  assert.match(css, /\.popoverCaption\s*\{[^}]*text-align: center;/);
});

test('popover stays inside 16px gutters at 390 and 320 without clipping the QR or labels', () => {
  const postcss = require('postcss');
  const css = read('src/components/coming-soon/coming-soon.module.css');
  const button = read('src/components/coming-soon/WeChatButton.tsx');
  const tree = postcss.parse(css);
  const rules = [];
  tree.walkRules((rule) => {
    if (rule.selector !== '.popover') return;
    if (
      rule.parent?.type === 'atrule' &&
      rule.parent.name === 'media' &&
      rule.parent.params === '(max-width: 800px)'
    ) {
      rules.push(rule);
    }
  });
  assert.equal(rules.length, 1);
  const decls = Object.fromEntries(
    rules[0].nodes.filter((n) => n.type === 'decl').map((n) => [n.prop, n.value]),
  );
  assert.equal(decls['box-sizing'], 'border-box');
  assert.equal(decls.width, 'min(318px, calc(100vw - 32px))');
  assert.equal(decls.right, 'min(0px, calc(151px - 16px - min(318px, 100vw - 32px)))');
  assert.equal(decls.left, undefined);

  // At max-width 800px the contact column is full width: 22px wrap padding +
  // 1px card border + 28px card padding + 100px to the WeChat button’s right
  // edge (second of three 44px icons) = 151px. The desktop card is content-box
  // 288px + 14px padding × 2 + 1px border × 2 = 318px outer.
  const buttonRight = 151;
  const gutter = 16;
  const maxOuter = 318;
  const paddingBorder = 14 * 2 + 1 * 2;

  for (const vw of [390, 320]) {
    const outer = Math.min(maxOuter, vw - gutter * 2);
    const right = Math.min(0, buttonRight - gutter - Math.min(maxOuter, vw - gutter * 2));
    const boxRight = buttonRight - right;
    const boxLeft = boxRight - outer;
    const content = outer - paddingBorder;
    assert.ok(boxLeft >= gutter, `${vw}px left inset is ${boxLeft}, expected >= ${gutter}`);
    assert.ok(vw - boxRight >= gutter, `${vw}px right inset is ${vw - boxRight}, expected >= ${gutter}`);
    assert.ok(content >= 240, `${vw}px content ${content} must fit the 240px QR`);
  }

  assert.match(button, />Scan to add on WeChat\.</);
  assert.match(button, />\s*WhatsApp\s*<\/a>/);
  assert.match(button, />Email<\/a>/);
});
