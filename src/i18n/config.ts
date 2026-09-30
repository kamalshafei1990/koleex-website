/* ---------------------------------------------------------------------------
   i18n/config — the site's languages (owner, 30/09/2026): all 18, each at
   its own prefix (/en, /ar, /zh, /es …). English, Arabic and Chinese carry
   real translations today (the Hub's Page Builder, product and category
   names, the site's own words); the others show English until they are
   translated. Arabic, Urdu and Farsi read right to left.
   --------------------------------------------------------------------------- */

import { languages } from "@/data/regions";

export const LANGS: readonly string[] = Object.keys(languages);
export const DEFAULT_LANG = "en";
/** Languages with real translations today (built ahead at deploy). */
export const CONTENT_LANGS = ["en", "ar", "zh"] as const;
export type ContentLang = (typeof CONTENT_LANGS)[number];

const RTL = new Set(["ar", "ur", "fa"]);

export const isLang = (v: unknown): v is string => typeof v === "string" && LANGS.includes(v);
export const dirOf = (lang: string): "rtl" | "ltr" => (RTL.has(lang) ? "rtl" : "ltr");
/** The translation a text uses in this language (English when there is none). */
export const contentLang = (lang: string): ContentLang => ((CONTENT_LANGS as readonly string[]).includes(lang) ? (lang as ContentLang) : "en");

/** A site path in a language: "/products" → "/ar/products". Outside links,
 *  API paths and paths already in a language are left as they are. */
export function localize(href: string, lang: string): string {
  if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/api/") || href.startsWith("/_next/")) return href;
  const first = href.split(/[/?#]/)[1] ?? "";
  if (isLang(first)) return href;
  return href === "/" ? `/${lang}` : `/${lang}${href}`;
}

/** The same page in another language. */
export function switchLang(pathname: string, lang: string): string {
  const parts = pathname.split("/");
  if (isLang(parts[1])) parts[1] = lang;
  else parts.splice(1, 0, lang);
  const out = parts.join("/");
  return out.endsWith("/") && out.length > 1 ? out.slice(0, -1) : out;
}

/** A Hub name in a language: its Arabic or Chinese when the Hub has one,
 *  else the English. */
export function nameIn(item: { name: string; zh?: string | null; ar?: string | null }, lang: string): string {
  const c = contentLang(lang);
  return (c === "ar" ? item.ar : c === "zh" ? item.zh : null)?.trim() || item.name;
}

/** "→" that points the reading way ("←" right to left). */
export const arrowOf = (lang: string): string => (dirOf(lang) === "rtl" ? "←" : "→");

/** The site's public address (for sitemaps, canonical links and structured
 *  data): SITE_URL when set (the final domain), else Vercel's production
 *  domain, else local. */
export function siteUrl(): string {
  const explicit = (process.env.SITE_URL ?? "").trim().replace(/\/+$/, "");
  if (explicit) return explicit;
  const vercel = (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "").trim();
  return vercel ? `https://${vercel}` : "http://localhost:3000";
}
