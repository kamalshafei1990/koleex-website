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
