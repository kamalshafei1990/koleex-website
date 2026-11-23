# Original market flags — provenance and reuse

These 71 PNGs are unmodified downloads of the **same** `https://flagcdn.com/w80/{cc}.png`
assets previously used by `MarketFlag`. Retrieved 23 November 2026 (Asia/Shanghai).
No recoloring, resizing, optimization or format conversion was performed. Country
codes, market order, dimensions in the UI and emoji fallback are unchanged.
The files total 24,260 bytes (not 71 full-size flag illustrations).

Source: [Flagpedia.net / FlagCDN](https://flagpedia.net/download/api), maintained
by David Krmela, based on [Wikimedia Commons country flag vectors](https://commons.wikimedia.org/wiki/Category:SVG_flags_by_country).

Flagpedia's [license statement](https://flagpedia.net/about#license) says:

> Flag images are in the public domain (exempt from copyright). They are
> completely free for non-commercial and even commercial use.

The [download page](https://flagpedia.net/download) also identifies the flags as
public domain and permits commercial/non-commercial use. Attribution/backlinks
are appreciated by the source; retained here without changing the page visuals.
National flag/emblem usage restrictions may apply independently of copyright.
This notice describes these flag images, not the license of the website's code.

`manifest.json` records each original URL, byte length, PNG dimensions and SHA-256.
`npm run test:china-readiness` checks every local file against that manifest and
checks exact coverage of the market codes. No network is used by those tests.
Updating flags is an explicit asset change: review source/license and regenerate
the checksums; do not silently replace files at deploy/build time.
