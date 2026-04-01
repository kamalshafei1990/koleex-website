/* ---------------------------------------------------------------------------
   Region & Language configuration for Koleex International Group.

   Region = business context (pricing, contacts, distributors, catalogs)
   Language = UI translation only

   URL strategy: /{region}/{language}
   e.g. /global/en, /middle-east/ar, /asia/zh
   --------------------------------------------------------------------------- */

export interface Language {
  code: string;
  name: string;
  nameEn: string;
  dir?: "ltr" | "rtl";
}

export interface Region {
  slug: string;
  name: string;
  flag: string;
  languages: Language[];
  defaultLanguage: string;
  description?: string;
}

/* ── All 18 Languages ── */

export const languages: Record<string, Language> = {
  en: { code: "en", name: "English", nameEn: "English" },
  zh: { code: "zh", name: "中文", nameEn: "Chinese" },
  ar: { code: "ar", name: "العربية", nameEn: "Arabic", dir: "rtl" },
  es: { code: "es", name: "Español", nameEn: "Spanish" },
  fr: { code: "fr", name: "Français", nameEn: "French" },
  nl: { code: "nl", name: "Nederlands", nameEn: "Dutch" },
  pl: { code: "pl", name: "Polski", nameEn: "Polish" },
  pt: { code: "pt", name: "Português", nameEn: "Portuguese" },
  hi: { code: "hi", name: "हिन्दी", nameEn: "Hindi" },
  ur: { code: "ur", name: "اردو", nameEn: "Urdu", dir: "rtl" },
  fa: { code: "fa", name: "فارسی", nameEn: "Farsi", dir: "rtl" },
  th: { code: "th", name: "ไทย", nameEn: "Thai" },
  vi: { code: "vi", name: "Tiếng Việt", nameEn: "Vietnamese" },
  ru: { code: "ru", name: "Русский", nameEn: "Russian" },
  id: { code: "id", name: "Bahasa Indonesia", nameEn: "Indonesian" },
  tr: { code: "tr", name: "Türkçe", nameEn: "Turkish" },
  ta: { code: "ta", name: "தமிழ்", nameEn: "Tamil" },
  bn: { code: "bn", name: "বাংলা", nameEn: "Bengali" },
};

/* ── 6 Regions with language mappings ── */

export const regions: Region[] = [
  {
    slug: "global",
    name: "Global",
    flag: "🌐",
    languages: [languages.en],
    defaultLanguage: "en",
    description: "Worldwide — default experience",
  },
  {
    slug: "middle-east",
    name: "Middle East",
    flag: "🌍",
    languages: [languages.ar, languages.en, languages.fa],
    defaultLanguage: "ar",
    description: "GCC, Levant, Iran & North Africa",
  },
  {
    slug: "europe",
    name: "Europe",
    flag: "🇪🇺",
    languages: [languages.en, languages.fr, languages.nl, languages.pl, languages.pt, languages.ru, languages.tr],
    defaultLanguage: "en",
    description: "EU, UK, Turkey & Russia",
  },
  {
    slug: "asia",
    name: "Asia",
    flag: "🌏",
    languages: [languages.en, languages.zh, languages.hi, languages.ur, languages.ta, languages.bn, languages.th, languages.vi, languages.id],
    defaultLanguage: "en",
    description: "China, South Asia & Southeast Asia",
  },
  {
    slug: "americas",
    name: "Americas",
    flag: "🌎",
    languages: [languages.en, languages.es, languages.pt],
    defaultLanguage: "en",
    description: "North, Central & South America",
  },
  {
    slug: "africa",
    name: "Africa",
    flag: "🌍",
    languages: [languages.en, languages.fr, languages.ar],
    defaultLanguage: "en",
    description: "Sub-Saharan & North Africa",
  },
];

/* ── Helpers ── */

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

export function getDefaultRegion(): Region {
  return regions[0];
}

/* Country → Region mapping (placeholder for future IP detection) */
export const countryToRegion: Record<string, string> = {
  // Middle East
  EG: "middle-east", AE: "middle-east", SA: "middle-east", QA: "middle-east",
  KW: "middle-east", BH: "middle-east", OM: "middle-east", JO: "middle-east",
  LB: "middle-east", IQ: "middle-east", IR: "middle-east", SY: "middle-east",
  YE: "middle-east", PS: "middle-east",
  // Europe
  GB: "europe", DE: "europe", FR: "europe", IT: "europe", ES: "europe",
  NL: "europe", PL: "europe", PT: "europe", BE: "europe", AT: "europe",
  CH: "europe", SE: "europe", NO: "europe", DK: "europe", FI: "europe",
  IE: "europe", CZ: "europe", RO: "europe", HU: "europe", GR: "europe",
  RU: "europe", UA: "europe", TR: "europe",
  // Asia
  CN: "asia", HK: "asia", TW: "asia", JP: "asia", KR: "asia",
  IN: "asia", PK: "asia", BD: "asia", LK: "asia", NP: "asia",
  TH: "asia", VN: "asia", ID: "asia", MY: "asia", SG: "asia",
  PH: "asia", MM: "asia", KH: "asia",
  // Americas
  US: "americas", CA: "americas", MX: "americas", BR: "americas",
  AR: "americas", CO: "americas", CL: "americas", PE: "americas",
  VE: "americas", EC: "americas",
  // Africa
  NG: "africa", KE: "africa", ZA: "africa", GH: "africa",
  ET: "africa", TZ: "africa", MA: "africa", TN: "africa",
  DZ: "africa", SN: "africa", CI: "africa", CM: "africa",
};

/* Country → suggested language (placeholder) */
export const countryToLanguage: Record<string, string> = {
  EG: "ar", AE: "ar", SA: "ar", IR: "fa", IQ: "ar",
  CN: "zh", HK: "zh", TW: "zh",
  IN: "hi", PK: "ur", BD: "bn", LK: "ta",
  TH: "th", VN: "vi", ID: "id",
  FR: "fr", NL: "nl", PL: "pl", PT: "pt", BR: "pt",
  RU: "ru", TR: "tr",
  MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
  MA: "fr", TN: "fr", DZ: "ar", SN: "fr",
};

/* Simulated detection — returns a placeholder country */
export function getSimulatedDetection(): { countryCode: string; countryName: string } {
  return { countryCode: "EG", countryName: "Egypt" };
}
