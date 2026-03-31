/* ---------------------------------------------------------------------------
   Region & Language configuration for Koleex International Group.

   Region = business context (pricing, contacts, distributors, catalogs)
   Language = UI translation only

   URL strategy (future): /{region}/{language}
   e.g. /global/en, /middle-east/ar, /china/zh, /americas/es
   --------------------------------------------------------------------------- */

export interface Language {
  code: string;       // ISO 639-1 (en, ar, zh, fr, es, etc.)
  name: string;       // Native name shown in selector
  nameEn: string;     // English name for reference
  dir?: "ltr" | "rtl";
}

export interface Region {
  slug: string;         // URL-safe slug
  name: string;         // Display name
  flag: string;         // Emoji flag or code
  currency?: string;    // Default currency code
  languages: Language[];
  defaultLanguage: string; // code of default language
  description?: string;    // Short description for dropdown
}

/* ── Languages ── */

export const languages: Record<string, Language> = {
  en: { code: "en", name: "English", nameEn: "English" },
  ar: { code: "ar", name: "العربية", nameEn: "Arabic", dir: "rtl" },
  zh: { code: "zh", name: "中文", nameEn: "Chinese" },
  fr: { code: "fr", name: "Français", nameEn: "French" },
  es: { code: "es", name: "Español", nameEn: "Spanish" },
  de: { code: "de", name: "Deutsch", nameEn: "German" },
  pt: { code: "pt", name: "Português", nameEn: "Portuguese" },
  hi: { code: "hi", name: "हिन्दी", nameEn: "Hindi" },
  tr: { code: "tr", name: "Türkçe", nameEn: "Turkish" },
};

/* ── Regions ── */

export const regions: Region[] = [
  {
    slug: "global",
    name: "Global",
    flag: "🌐",
    currency: "USD",
    languages: [languages.en],
    defaultLanguage: "en",
    description: "Worldwide — default experience",
  },
  {
    slug: "middle-east",
    name: "Middle East",
    flag: "🇦🇪",
    currency: "AED",
    languages: [languages.ar, languages.en],
    defaultLanguage: "ar",
    description: "GCC, Levant & North Africa",
  },
  {
    slug: "china",
    name: "China",
    flag: "🇨🇳",
    currency: "CNY",
    languages: [languages.zh, languages.en],
    defaultLanguage: "zh",
    description: "Mainland China & Hong Kong",
  },
  {
    slug: "europe",
    name: "Europe",
    flag: "🇪🇺",
    currency: "EUR",
    languages: [languages.en, languages.de, languages.fr],
    defaultLanguage: "en",
    description: "EU, UK & Switzerland",
  },
  {
    slug: "south-asia",
    name: "South Asia",
    flag: "🇮🇳",
    currency: "INR",
    languages: [languages.en, languages.hi],
    defaultLanguage: "en",
    description: "India, Bangladesh & Sri Lanka",
  },
  {
    slug: "africa",
    name: "Africa",
    flag: "🌍",
    currency: "USD",
    languages: [languages.en, languages.fr],
    defaultLanguage: "en",
    description: "Sub-Saharan & North Africa",
  },
  {
    slug: "americas",
    name: "Americas",
    flag: "🌎",
    currency: "USD",
    languages: [languages.en, languages.es, languages.pt],
    defaultLanguage: "en",
    description: "North, Central & South America",
  },
  {
    slug: "turkey",
    name: "Turkey",
    flag: "🇹🇷",
    currency: "TRY",
    languages: [languages.tr, languages.en],
    defaultLanguage: "tr",
    description: "Türkiye",
  },
];

/* ── Helpers ── */

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

export function getDefaultRegion(): Region {
  return regions[0]; // Global
}

/* Placeholder country-to-region mapping for suggestion modal */
export const countryToRegion: Record<string, string> = {
  EG: "middle-east",
  AE: "middle-east",
  SA: "middle-east",
  QA: "middle-east",
  KW: "middle-east",
  BH: "middle-east",
  OM: "middle-east",
  JO: "middle-east",
  LB: "middle-east",
  IQ: "middle-east",
  CN: "china",
  HK: "china",
  DE: "europe",
  FR: "europe",
  GB: "europe",
  IT: "europe",
  ES: "europe",
  NL: "europe",
  CH: "europe",
  AT: "europe",
  BE: "europe",
  IN: "south-asia",
  BD: "south-asia",
  LK: "south-asia",
  PK: "south-asia",
  NG: "africa",
  KE: "africa",
  ZA: "africa",
  GH: "africa",
  US: "americas",
  CA: "americas",
  MX: "americas",
  BR: "americas",
  AR: "americas",
  CO: "americas",
  TR: "turkey",
};
