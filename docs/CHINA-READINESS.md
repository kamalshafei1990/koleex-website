# Mainland no-VPN readiness — review-only changes

23 November 2026 (Asia/Shanghai). Base: `63c529aebfd30b7ef285f3dafabcb42a135712bf`.
This is not a production release or a guarantee of mainland availability.

## Implemented without changing the visual design

- Vendor the exact 71 `flagcdn.com/w80/{cc}.png` assets under
  `public/flags/w80/` (24,260 bytes total). `MarketFlag` changes only its URL;
  width/height, original colors, `unoptimized`, accessibility and emoji fallback
  stay the same. See `public/flags/README.md` and `manifest.json` for the source's
  public-domain statement, attribution, original URLs, dimensions and SHA-256s.
- Remove the broken external Inter `@font-face` in `globals.css`. Its `src`
  fetched `text/css`, not font bytes (verified against Google's response).
  This is not a valid way to load Inter. Existing font-family declarations,
  Coming Soon's Apple/system stack, and Arabic/Chinese stacks are unchanged;
  no new font or build-time Google download has been introduced.
- Add offline asset/gate/auth regression tests using existing TypeScript and
  Node's test runner; no new npm dependency or lockfile change.

The remaining Coming Soon source, CSS module, globe (including steel #567FB2),
KoleexLogo SVG, markets, socials, copy, contact form and API endpoints are
unchanged. PR #10 is not incorporated; PR #3 is unrelated and untouched.

## Gate: investigated, deliberately unchanged

`middleware.ts` and the dynamic Coming Soon page each call `resolveComingSoon()`.
When the bridge is configured, a public request rendering the teaser can make
**two** authenticated Hub `/api/website/v1/site` calls. Each remains `no-store`
with a 2.5-second abort signal. No shared/process/CDN cache was introduced.

The current source explicitly documents past redirect loops from independent
Edge/Node TTL caches. An untrusted incoming header must not become a gate-open
signal, and globally caching the authenticated bridge response is out of scope.
React request memoization alone does not deduplicate across middleware and RSC.
A future optimization needs a separately reviewed request-scoped handoff with
spoofed-header, rewrite, draft/RSC navigation and gate-transition integration
coverage. The asset-only win is not contingent on taking that risk now.

Behavior retained and covered by tests:

- Bridge unset, timeout/offline, HTTP failure, malformed JSON or non-boolean
  `comingSoon`: closed by default. Valid Hub booleans win over the env fallback.
- Existing emergency env values `false|0|no|off` still allow fallback-open.
  **Fail-closed is conditional on not explicitly setting that existing override.**
  This PR does not silently alter emergency operational semantics.
- Existing middleware draft-cookie bypass unchanged; `/api/preview` still checks
  a bounded expiry and the HMAC before enabling draft mode and responds no-store.
  This PR does not claim to harden the existing cookie-presence bypass.
- Root rewrite, direct teaser visits, non-teaser redirects, language selection,
  `connection()` per-request rendering and the page's gate-off redirect remain.
- Tests use synthetic keys and mocked bridge responses, not production secrets.

## Catalog: existing same-origin path is not a hosted file

The release metadata reports **80,247,243 bytes** (~76.5 MiB), SHA-256
`c500080c3bad0dbd192eb4f80bf87ecaa876ff6b2adcdf879f7538092c7d1a43`.
`public/catalogs/` contains only a README and placeholder; `next.config.ts` adds
an attachment header for the suggested path but does **not** supply a file,
proxy, rewrite or download handler. The local production build returns 404 there.
The README explicitly says not to commit the PDF.

Therefore the current GitHub Releases link stays unchanged rather than breaking
the download, adding an 80 MB git binary or proxying GitHub on every click.
GitHub remains a mainland reachability risk. No external upload/account/storage
or charge was made. Separate decision: approve an existing entitled object
store/CDN location (preferably a tested HK/offshore origin with a same-origin
path/custom domain), transfer the unchanged PDF, verify SHA-256, range support,
attachment headers, bandwidth terms and no-VPN HTTP performance, then switch the
link. A redirect alone still exposes the storage origin to the visitor.
A streaming same-origin proxy still depends on GitHub and adds function/data
transfer cost; it is not a reliable zero-cost substitute for an approved origin.

## Region: proposal only, not active configuration

Read-only deployment metadata confirms website Node Functions are `iad1` and
Hub Functions are `hnd1`. Note the audit's regional simplification: Routing
Middleware is distributed by Vercel; it is **not established that both bridge
calls originate in iad1**. Changing Node function region does not automatically
pin Routing Middleware there or move static CDN delivery.

If approved separately, one possible **future** root `vercel.json` is:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "regions": ["hkg1"]
}
```

This file has NOT been added. No project setting, deploy region, billing, DNS,
certificate, mail or production alias was changed. Consider `hnd1` as an
alternative: it co-locates Node SSR with the Hub; `hkg1` may improve proximity
to visitors but still calls Tokyo. Measure both with real requests rather than
assuming Hong Kong wins. A project-wide region change also affects the site's
API handlers and their other upstreams, not just the teaser.

Vercel documents one region on Hobby, multiple on Pro/Enterprise, and
region-specific pricing. Confirm actual entitlement, data locality and full API
compatibility first; no purchase or plan change is authorized here. Hong Kong
is offshore, not a mainland hosting/CDN solution, and neither a custom domain nor
DNS resolution proves GFW TCP/TLS/HTTP reachability. No mainland HTTP test or
browser visual QA was performed for this PR.

Official references checked 23 November 2026:
- https://flagpedia.net/download/api
- https://flagpedia.net/download
- https://flagpedia.net/about
- https://vercel.com/docs/functions/configuring-functions/region
- https://vercel.com/docs/pricing/regional-pricing/hkg1

## Verification

- `npm ci --no-audit --no-fund` — success (locked dependencies).
- `npm run test:china-readiness` — 8/8 tests pass.
- `npx tsc --noEmit` — success.
- `npm run build` — success, Next.js 15.5.14.
- `git diff --check` — success.
- Local production HTTP: `/` 200 with noindex/no-store; 71 unique local flag
  paths and 71/71 image bodies equal to recorded SHA-256; direct English/Chinese
  teaser routes 200; `/en/products?region=asia` 307 to `/`; catalog's empty local
  placeholder 404; original release link retained; built CSS has no Google
  Fonts request. This is HTTP verification from the box, not mainland testing.

Before release: separately coordinated browser visual QA; no-VPN HTTP/TLS and
asset waterfall tests on actual China Mobile/Telecom/Unicom networks; inspect the
new draft's CI/preview. Any production release needs fresh explicit approval.
