/* ---------------------------------------------------------------------------
   middleware — every page lives under a language (/en, /ar, /zh …). A path
   without one is sent to the visitor's language (owner, 30/09/2026:
   automatic): the language they read last (cookie), else their country's
   (Vercel's x-vercel-ip-country), else their browser's, else English.
   ?region=<slug> on a page keeps the region they chose (the region
   selector), and the visitor's real country is kept for the region
   suggestion — never a guessed one.
   --------------------------------------------------------------------------- */

import { NextResponse, type NextRequest } from "next/server";
import { countryToLanguage, regions } from "@/data/regions";
import { CONTENT_LANGS, DEFAULT_LANG, isLang, siteUrl } from "@/i18n/config";

const YEAR = 60 * 60 * 24 * 365;
const cookieOpts = { path: "/", maxAge: YEAR, sameSite: "lax" as const };

function browserLang(header: string | null): string | null {
  for (const part of (header ?? "").split(",")) {
    const code = part.split(";")[0].trim().toLowerCase().split("-")[0];
    if (isLang(code)) return code;
  }
  return null;
}

function pickLang(req: NextRequest): string {
  const saved = req.cookies.get("koleex_lang")?.value;
  if (isLang(saved)) return saved;
  const country = (req.headers.get("x-vercel-ip-country") ?? "").toUpperCase();
  const byCountry = countryToLanguage[country];
  if (isLang(byCountry)) return byCountry;
  return browserLang(req.headers.get("accept-language")) ?? DEFAULT_LANG;
}

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (!isLang(first)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${pickLang(req)}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url, 307);
  }

  const region = searchParams.get("region");
  if (region !== null) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("region");
    const res = NextResponse.redirect(url, 307);
    if (regions.some((r) => r.slug === region)) res.cookies.set("koleex_region", region, cookieOpts);
    res.cookies.set("koleex_lang", first, cookieOpts);
    return res;
  }

  const res = NextResponse.next();
  /* Search engines: the page in English, Arabic and Chinese (hreflang), and
     its canonical address — a language without a translation of its own is
     the English page, so it points there. */
  const rest = pathname.slice(first.length + 1);
  const base = siteUrl();
  const links = CONTENT_LANGS.map((l) => `<${base}/${l}${rest}>; rel="alternate"; hreflang="${l}"`);
  links.push(`<${base}/en${rest}>; rel="alternate"; hreflang="x-default"`);
  const canonicalLang = (CONTENT_LANGS as readonly string[]).includes(first) ? first : "en";
  links.push(`<${base}/${canonicalLang}${rest}>; rel="canonical"`);
  res.headers.set("Link", links.join(", "));
  if (req.cookies.get("koleex_lang")?.value !== first) res.cookies.set("koleex_lang", first, cookieOpts);
  const country = req.headers.get("x-vercel-ip-country");
  if (country && req.cookies.get("koleex_geo")?.value !== country) res.cookies.set("koleex_geo", country, { path: "/", maxAge: 60 * 60 * 24, sameSite: "lax" });
  return res;
}

export const config = {
  /* Pages only: not the API, Next's files, or anything with an extension. */
  matcher: ["/((?!api/|_next/|_vercel/|favicon\\.ico|.*\\.[a-zA-Z0-9]+$).*)"],
};

