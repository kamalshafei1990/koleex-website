# Original-quality same-origin catalog delivery (review draft)

23 November 2026, Asia/Shanghai. Catalog-only follow-up to China-readiness PR11.

## Delivery

Both Coming Soon links say **Download Catalog**, and the section heading is
**Catalog**. They use `/catalogs/KOLEEX-Catalog-2025.pdf`, not github.com.
The provenance URL/path keeps its year; the download filename is
`KOLEEX-Catalog.pdf`. No PDF pages, images, metadata, or compression are changed.

`npm run build` first runs `scripts/prepare-catalog.mjs`. This streams the
existing public official release into an ignored `public/catalogs/` file,
validates both byte count and SHA-256, and atomically renames the verified
file before Next builds. A correctly cached file is rehashed and reused.
HTTP/network/stream errors, truncation, oversize and corruption fail the build;
there is no runtime proxy or GitHub redirect fallback. Attempts are bounded to
three, each with a 120-second network timeout. GitHub/release-assets networking
is needed on a cold build, not on visitors' downloads. Existing deployed files
are unaffected by a later failed build. For local `npm run dev`, prepare first:

```sh
node scripts/prepare-catalog.mjs
npm run dev
```

Pinned original:
- Source: https://github.com/kamalshafei1990/koleex-website/releases/download/catalog-2025/KOLEEX-Catalog-2025.pdf
- Size: **80,247,243 bytes** (~76.5 MiB)
- SHA-256: `c500080c3bad0dbd192eb4f80bf87ecaa876ff6b2adcdf879f7538092c7d1a43`

Next's existing catalog-specific header rule now sends `Content-Type:
application/pdf` and `Content-Disposition: attachment;
filename="KOLEEX-Catalog.pdf"`. The same-origin anchors also carry a `download`
attribute. The existing middleware already excludes extension-bearing assets,
so neither language redirection nor the fail-closed page gate is modified.
The gate remains intact for pages; like other public assets the catalog is
intentionally public. There is no new function, API endpoint, storage resource,
account, plan, region, DNS, billing, or environment setting.

## Hosting feasibility and limits

Official docs inspected 23 November 2026:
- https://vercel.com/docs/limits — 100 MB Hobby / 1 GB Pro are **CLI source
  upload** limits, not a documented per-file build-output cap. Vercel documents
  a 45-minute build maximum, 64 GB build disk and 5 GB build cache. The output
  files paragraph places no upper limit on output file **count**; it must not
  be misquoted as a guarantee of unlimited output **bytes**. The ~80 MB file
  stays out of git/source uploads and is generated during build. No separate
  individual static-output byte ceiling was found in these official pages;
  deployed adapter acceptance still needs a real preview, not an assumption.
- https://vercel.com/docs/build-output-api/v3/primitives — static output in
  `.vercel/output/static` is served by the Edge CDN without changing contents
  or extension. Next's adapter is responsible for putting public assets there.
- https://vercel.com/docs/functions/limitations — buffered response limit is
  4.5 MB (streamed responses excepted). No function delivery is introduced;
  streaming proxying would still create runtime upstream/compute dependency.
- https://vercel.com/docs/pricing/networking — serving static files consumes
  CDN Requests and Fast Data Transfer. Hobby lists 100 GB transfer included;
  Pro entitlements and billing are team-specific. 1,000 full downloads alone
  are ~80.25 GB before headers/other site traffic. Caching cannot eliminate
  CDN-to-visitor transfer. No promise of unlimited or zero-cost traffic.

This adds **no new paid service/resource**, but absolute no-new-charge operation
cannot be certified without checking the existing plan, shared allowance,
usage/spend controls, and expected traffic. The read-only connector returned
project/team metadata but no billing entitlement or remaining allowance. Keep
this a review draft; do not release under a literal zero-incremental-cost
requirement until that decision is resolved. Do not enable/upgrade a plan or
change billing to make this work.

## Validation and release gates

Offline tests cover pinned provenance, exact-byte staging, verified cache reuse,
HTTP/network/stream failure cleanup, same-length corruption, truncation,
oversize, retries, signal wiring, exact CTA text, filename and build wiring.
Also run the existing China-readiness/gate/preview tests and TypeScript/build.

Check a production build locally using full GET (size/hash), HEAD, byte-range
GET (206/Content-Range), conditional GET, and the ordinary page gate. Verify
Next's generated routes manifest. These are not remote CDN proof.

Before release, separately validate a Git preview's actual static output
acceptance, build command (must invoke `npm run build`, not bypass preparation
with bare `next build`), GET/HEAD/range/attachment headers and size/hash. Keep
preview authentication intact. If Vercel rejects the static file, stop and
report; do not silently switch to a proxy or paid Blob account.

No browser or physical iPhone validation was available for this draft. The
site link no longer targets GitHub, which removes the initial GitHub Universal
Link target, but actual iOS Safari/in-app download UI, Files saving, low-storage
behavior, and interrupted/resumed transfers require testing on a real device.
No mainland-China availability promise or DoH-as-HTTP claim is made.
