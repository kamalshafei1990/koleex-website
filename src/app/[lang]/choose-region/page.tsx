import { EnglishOnly } from "@/components/i18n/EnglishOnly";
import Link from "next/link";
import { isLang } from "@/i18n/config";
import { regions } from "@/data/regions";

const regionSlugs = new Set(regions.map((r) => r.slug));
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choose Your Country or Region",
  description: "Select your country or region to visit the Koleex website in your local language.",
};

/* ---------------------------------------------------------------------------
   Choose Your Country or Region
   Groups: Global → Middle East & Africa → Asia Pacific → Europe →
   Latin America & Caribbean → Eurasia
   --------------------------------------------------------------------------- */

interface CountryItem {
  name: string;
  native: string; // Country name in its own language
  flag: string;
  languages: { label: string; href: string }[];
}

interface RegionGroup {
  title: string;
  countries: CountryItem[];
}

const regionGroups: RegionGroup[] = [
  /* ═══ GLOBAL ═══ */
  {
    title: "Global",
    countries: [
      { name: "Global", native: "Global", flag: "🌐", languages: [{ label: "English", href: "/" }] },
    ],
  },

  /* ═══ MIDDLE EAST & AFRICA ═══ */
  {
    title: "Middle East & Africa",
    countries: [
      { name: "Bahrain", native: "البحرين", flag: "🇧🇭", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Egypt", native: "مصر", flag: "🇪🇬", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Iran", native: "ایران", flag: "🇮🇷", languages: [{ label: "فارسی", href: "/middle-east/fa" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Iraq", native: "العراق", flag: "🇮🇶", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Jordan", native: "الأردن", flag: "🇯🇴", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Kuwait", native: "الكويت", flag: "🇰🇼", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Lebanon", native: "لبنان", flag: "🇱🇧", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Libya", native: "ليبيا", flag: "🇱🇾", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Oman", native: "عُمان", flag: "🇴🇲", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Palestine", native: "فلسطين", flag: "🇵🇸", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Qatar", native: "قطر", flag: "🇶🇦", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Saudi Arabia", native: "المملكة العربية السعودية", flag: "🇸🇦", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Syria", native: "سوريا", flag: "🇸🇾", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "United Arab Emirates", native: "الإمارات العربية المتحدة", flag: "🇦🇪", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Yemen", native: "اليمن", flag: "🇾🇪", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Algeria", native: "الجزائر", flag: "🇩🇿", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Angola", native: "Angola", flag: "🇦🇴", languages: [{ label: "Português", href: "/africa/pt" }, { label: "English", href: "/africa/en" }] },
      { name: "Cameroon", native: "Cameroun", flag: "🇨🇲", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Côte d'Ivoire", native: "Côte d'Ivoire", flag: "🇨🇮", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "DR Congo", native: "RD Congo", flag: "🇨🇩", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Ethiopia", native: "ኢትዮጵያ", flag: "🇪🇹", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Ghana", native: "Ghana", flag: "🇬🇭", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Kenya", native: "Kenya", flag: "🇰🇪", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Madagascar", native: "Madagasikara", flag: "🇲🇬", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Mauritius", native: "Maurice", flag: "🇲🇺", languages: [{ label: "English", href: "/africa/en" }, { label: "Français", href: "/africa/fr" }] },
      { name: "Morocco", native: "المغرب", flag: "🇲🇦", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Mozambique", native: "Moçambique", flag: "🇲🇿", languages: [{ label: "Português", href: "/africa/pt" }, { label: "English", href: "/africa/en" }] },
      { name: "Nigeria", native: "Nigeria", flag: "🇳🇬", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Rwanda", native: "Rwanda", flag: "🇷🇼", languages: [{ label: "English", href: "/africa/en" }, { label: "Français", href: "/africa/fr" }] },
      { name: "Senegal", native: "Sénégal", flag: "🇸🇳", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "South Africa", native: "South Africa", flag: "🇿🇦", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Sudan", native: "السودان", flag: "🇸🇩", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "English", href: "/africa/en" }] },
      { name: "Tanzania", native: "Tanzania", flag: "🇹🇿", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Tunisia", native: "تونس", flag: "🇹🇳", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Uganda", native: "Uganda", flag: "🇺🇬", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Zambia", native: "Zambia", flag: "🇿🇲", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Zimbabwe", native: "Zimbabwe", flag: "🇿🇼", languages: [{ label: "English", href: "/africa/en" }] },
    ],
  },

  /* ═══ ASIA PACIFIC ═══ */
  {
    title: "Asia Pacific",
    countries: [
      { name: "Australia", native: "Australia", flag: "🇦🇺", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Bangladesh", native: "বাংলাদেশ", flag: "🇧🇩", languages: [{ label: "বাংলা", href: "/asia/bn" }, { label: "English", href: "/asia/en" }] },
      { name: "Cambodia", native: "កម្ពុជា", flag: "🇰🇭", languages: [{ label: "ភាសាខ្មែរ", href: "/asia/km" }, { label: "English", href: "/asia/en" }] },
      { name: "China", native: "中国", flag: "🇨🇳", languages: [{ label: "中文", href: "/asia/zh" }, { label: "English", href: "/asia/en" }] },
      { name: "Hong Kong", native: "香港", flag: "🇭🇰", languages: [{ label: "中文", href: "/asia/zh" }, { label: "English", href: "/asia/en" }] },
      { name: "India", native: "भारत", flag: "🇮🇳", languages: [{ label: "हिन्दी", href: "/asia/hi" }, { label: "தமிழ்", href: "/asia/ta" }, { label: "বাংলা", href: "/asia/bn" }, { label: "English", href: "/asia/en" }] },
      { name: "Indonesia", native: "Indonesia", flag: "🇮🇩", languages: [{ label: "Bahasa Indonesia", href: "/asia/id" }, { label: "English", href: "/asia/en" }] },
      { name: "Japan", native: "日本", flag: "🇯🇵", languages: [{ label: "日本語", href: "/asia/ja" }, { label: "English", href: "/asia/en" }] },
      { name: "Laos", native: "ລາວ", flag: "🇱🇦", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Malaysia", native: "Malaysia", flag: "🇲🇾", languages: [{ label: "Bahasa Melayu", href: "/asia/ms" }, { label: "English", href: "/asia/en" }] },
      { name: "Mongolia", native: "Монгол", flag: "🇲🇳", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Myanmar", native: "မြန်မာ", flag: "🇲🇲", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Nepal", native: "नेपाल", flag: "🇳🇵", languages: [{ label: "हिन्दी", href: "/asia/hi" }, { label: "English", href: "/asia/en" }] },
      { name: "New Zealand", native: "New Zealand", flag: "🇳🇿", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Pakistan", native: "پاکستان", flag: "🇵🇰", languages: [{ label: "اردو", href: "/asia/ur" }, { label: "English", href: "/asia/en" }] },
      { name: "Philippines", native: "Pilipinas", flag: "🇵🇭", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Singapore", native: "新加坡", flag: "🇸🇬", languages: [{ label: "English", href: "/asia/en" }, { label: "中文", href: "/asia/zh" }] },
      { name: "South Korea", native: "대한민국", flag: "🇰🇷", languages: [{ label: "한국어", href: "/asia/ko" }, { label: "English", href: "/asia/en" }] },
      { name: "Sri Lanka", native: "இலங்கை", flag: "🇱🇰", languages: [{ label: "தமிழ்", href: "/asia/ta" }, { label: "English", href: "/asia/en" }] },
      { name: "Taiwan", native: "台灣", flag: "🇹🇼", languages: [{ label: "中文", href: "/asia/zh" }, { label: "English", href: "/asia/en" }] },
      { name: "Thailand", native: "ประเทศไทย", flag: "🇹🇭", languages: [{ label: "ไทย", href: "/asia/th" }, { label: "English", href: "/asia/en" }] },
      { name: "Vietnam", native: "Việt Nam", flag: "🇻🇳", languages: [{ label: "Tiếng Việt", href: "/asia/vi" }, { label: "English", href: "/asia/en" }] },
    ],
  },

  /* ═══ EUROPE ═══ */
  {
    title: "Europe",
    countries: [
      { name: "Austria", native: "Österreich", flag: "🇦🇹", languages: [{ label: "Deutsch", href: "/europe/de" }, { label: "English", href: "/europe/en" }] },
      { name: "Belgium", native: "België", flag: "🇧🇪", languages: [{ label: "Nederlands", href: "/europe/nl" }, { label: "Français", href: "/europe/fr" }, { label: "English", href: "/europe/en" }] },
      { name: "Bulgaria", native: "България", flag: "🇧🇬", languages: [{ label: "Български", href: "/europe/bg" }, { label: "English", href: "/europe/en" }] },
      { name: "Croatia", native: "Hrvatska", flag: "🇭🇷", languages: [{ label: "Hrvatski", href: "/europe/hr" }, { label: "English", href: "/europe/en" }] },
      { name: "Cyprus", native: "Κύπρος", flag: "🇨🇾", languages: [{ label: "Ελληνικά", href: "/europe/el" }, { label: "English", href: "/europe/en" }] },
      { name: "Czech Republic", native: "Česko", flag: "🇨🇿", languages: [{ label: "Čeština", href: "/europe/cs" }, { label: "English", href: "/europe/en" }] },
      { name: "Denmark", native: "Danmark", flag: "🇩🇰", languages: [{ label: "Dansk", href: "/europe/da" }, { label: "English", href: "/europe/en" }] },
      { name: "Estonia", native: "Eesti", flag: "🇪🇪", languages: [{ label: "Eesti", href: "/europe/et" }, { label: "English", href: "/europe/en" }] },
      { name: "Finland", native: "Suomi", flag: "🇫🇮", languages: [{ label: "Suomi", href: "/europe/fi" }, { label: "English", href: "/europe/en" }] },
      { name: "France", native: "France", flag: "🇫🇷", languages: [{ label: "Français", href: "/europe/fr" }, { label: "English", href: "/europe/en" }] },
      { name: "Germany", native: "Deutschland", flag: "🇩🇪", languages: [{ label: "Deutsch", href: "/europe/de" }, { label: "English", href: "/europe/en" }] },
      { name: "Greece", native: "Ελλάδα", flag: "🇬🇷", languages: [{ label: "Ελληνικά", href: "/europe/el" }, { label: "English", href: "/europe/en" }] },
      { name: "Hungary", native: "Magyarország", flag: "🇭🇺", languages: [{ label: "Magyar", href: "/europe/hu" }, { label: "English", href: "/europe/en" }] },
      { name: "Iceland", native: "Ísland", flag: "🇮🇸", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Ireland", native: "Ireland", flag: "🇮🇪", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Italy", native: "Italia", flag: "🇮🇹", languages: [{ label: "Italiano", href: "/europe/it" }, { label: "English", href: "/europe/en" }] },
      { name: "Latvia", native: "Latvija", flag: "🇱🇻", languages: [{ label: "Latviešu", href: "/europe/lv" }, { label: "English", href: "/europe/en" }] },
      { name: "Lithuania", native: "Lietuva", flag: "🇱🇹", languages: [{ label: "Lietuvių", href: "/europe/lt" }, { label: "English", href: "/europe/en" }] },
      { name: "Luxembourg", native: "Lëtzebuerg", flag: "🇱🇺", languages: [{ label: "Français", href: "/europe/fr" }, { label: "Deutsch", href: "/europe/de" }, { label: "English", href: "/europe/en" }] },
      { name: "Malta", native: "Malta", flag: "🇲🇹", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Netherlands", native: "Nederland", flag: "🇳🇱", languages: [{ label: "Nederlands", href: "/europe/nl" }, { label: "English", href: "/europe/en" }] },
      { name: "Norway", native: "Norge", flag: "🇳🇴", languages: [{ label: "Norsk", href: "/europe/no" }, { label: "English", href: "/europe/en" }] },
      { name: "Poland", native: "Polska", flag: "🇵🇱", languages: [{ label: "Polski", href: "/europe/pl" }, { label: "English", href: "/europe/en" }] },
      { name: "Portugal", native: "Portugal", flag: "🇵🇹", languages: [{ label: "Português", href: "/europe/pt" }, { label: "English", href: "/europe/en" }] },
      { name: "Romania", native: "România", flag: "🇷🇴", languages: [{ label: "Română", href: "/europe/ro" }, { label: "English", href: "/europe/en" }] },
      { name: "Serbia", native: "Србија", flag: "🇷🇸", languages: [{ label: "Srpski", href: "/europe/sr" }, { label: "English", href: "/europe/en" }] },
      { name: "Slovakia", native: "Slovensko", flag: "🇸🇰", languages: [{ label: "Slovenčina", href: "/europe/sk" }, { label: "English", href: "/europe/en" }] },
      { name: "Slovenia", native: "Slovenija", flag: "🇸🇮", languages: [{ label: "Slovenščina", href: "/europe/sl" }, { label: "English", href: "/europe/en" }] },
      { name: "Spain", native: "España", flag: "🇪🇸", languages: [{ label: "Español", href: "/europe/es" }, { label: "English", href: "/europe/en" }] },
      { name: "Sweden", native: "Sverige", flag: "🇸🇪", languages: [{ label: "Svenska", href: "/europe/sv" }, { label: "English", href: "/europe/en" }] },
      { name: "Switzerland", native: "Schweiz", flag: "🇨🇭", languages: [{ label: "Deutsch", href: "/europe/de" }, { label: "Français", href: "/europe/fr" }, { label: "Italiano", href: "/europe/it" }, { label: "English", href: "/europe/en" }] },
      { name: "United Kingdom", native: "United Kingdom", flag: "🇬🇧", languages: [{ label: "English", href: "/europe/en" }] },
    ],
  },

  /* ═══ AMERICAS ═══ */
  {
    title: "Americas",
    countries: [
      { name: "Canada", native: "Canada", flag: "🇨🇦", languages: [{ label: "English", href: "/americas/en" }, { label: "Français", href: "/americas/fr" }] },
      { name: "United States", native: "United States", flag: "🇺🇸", languages: [{ label: "English", href: "/americas/en" }, { label: "Español", href: "/americas/es" }] },
    ],
  },

  /* ═══ LATIN AMERICA AND THE CARIBBEAN ═══ */
  {
    title: "Latin America and the Caribbean",
    countries: [
      { name: "Argentina", native: "Argentina", flag: "🇦🇷", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Bolivia", native: "Bolivia", flag: "🇧🇴", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Brazil", native: "Brasil", flag: "🇧🇷", languages: [{ label: "Português", href: "/americas/pt" }, { label: "English", href: "/americas/en" }] },
      { name: "Chile", native: "Chile", flag: "🇨🇱", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Colombia", native: "Colombia", flag: "🇨🇴", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Costa Rica", native: "Costa Rica", flag: "🇨🇷", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Cuba", native: "Cuba", flag: "🇨🇺", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Dominican Republic", native: "República Dominicana", flag: "🇩🇴", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Ecuador", native: "Ecuador", flag: "🇪🇨", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "El Salvador", native: "El Salvador", flag: "🇸🇻", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Guatemala", native: "Guatemala", flag: "🇬🇹", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Guyana", native: "Guyana", flag: "🇬🇾", languages: [{ label: "English", href: "/americas/en" }] },
      { name: "Haiti", native: "Ayiti", flag: "🇭🇹", languages: [{ label: "Français", href: "/americas/fr" }, { label: "English", href: "/americas/en" }] },
      { name: "Honduras", native: "Honduras", flag: "🇭🇳", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Jamaica", native: "Jamaica", flag: "🇯🇲", languages: [{ label: "English", href: "/americas/en" }] },
      { name: "Mexico", native: "México", flag: "🇲🇽", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Nicaragua", native: "Nicaragua", flag: "🇳🇮", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Panama", native: "Panamá", flag: "🇵🇦", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Paraguay", native: "Paraguay", flag: "🇵🇾", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Peru", native: "Perú", flag: "🇵🇪", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Puerto Rico", native: "Puerto Rico", flag: "🇵🇷", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Suriname", native: "Suriname", flag: "🇸🇷", languages: [{ label: "Nederlands", href: "/americas/nl" }, { label: "English", href: "/americas/en" }] },
      { name: "Trinidad and Tobago", native: "Trinidad and Tobago", flag: "🇹🇹", languages: [{ label: "English", href: "/americas/en" }] },
      { name: "Uruguay", native: "Uruguay", flag: "🇺🇾", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Venezuela", native: "Venezuela", flag: "🇻🇪", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
    ],
  },

  /* ═══ EURASIA ═══ */
  {
    title: "Eurasia",
    countries: [
      { name: "Armenia", native: "Հայաստան", flag: "🇦🇲", languages: [{ label: "Հայերեն", href: "/eurasia/hy" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Azerbaijan", native: "Azərbaycan", flag: "🇦🇿", languages: [{ label: "Azərbaycanca", href: "/eurasia/az" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Belarus", native: "Беларусь", flag: "🇧🇾", languages: [{ label: "Русский", href: "/eurasia/ru" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Georgia", native: "საქართველო", flag: "🇬🇪", languages: [{ label: "ქართული", href: "/eurasia/ka" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Kazakhstan", native: "Қазақстан", flag: "🇰🇿", languages: [{ label: "Қазақша", href: "/eurasia/kk" }, { label: "Русский", href: "/eurasia/ru" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Kyrgyzstan", native: "Кыргызстан", flag: "🇰🇬", languages: [{ label: "Русский", href: "/eurasia/ru" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Moldova", native: "Moldova", flag: "🇲🇩", languages: [{ label: "Română", href: "/eurasia/ro" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Russia", native: "Россия", flag: "🇷🇺", languages: [{ label: "Русский", href: "/eurasia/ru" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Tajikistan", native: "Тоҷикистон", flag: "🇹🇯", languages: [{ label: "Русский", href: "/eurasia/ru" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Turkey", native: "Türkiye", flag: "🇹🇷", languages: [{ label: "Türkçe", href: "/eurasia/tr" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Turkmenistan", native: "Türkmenistan", flag: "🇹🇲", languages: [{ label: "English", href: "/eurasia/en" }] },
      { name: "Ukraine", native: "Україна", flag: "🇺🇦", languages: [{ label: "Українська", href: "/eurasia/uk" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Uzbekistan", native: "Oʻzbekiston", flag: "🇺🇿", languages: [{ label: "Oʻzbekcha", href: "/eurasia/uz" }, { label: "Русский", href: "/eurasia/ru" }, { label: "English", href: "/eurasia/en" }] },
    ],
  },
];

/* The list's links were "/<region>/<language>" (never built). They now open
   the language's own pages — any of the site's 18 languages, else English —
   and keep the region (?region=, read by the middleware). */
function regionHref(href: string): string {
  const [, region, lang] = href.split("/");
  if (!region) return "/en?region=global";
  const target = isLang(lang) ? lang : "en";
  const slug = regionSlugs.has(region) ? region : region === "eurasia" ? "europe" : "global";
  return `/${target}?region=${slug}`;
}

function ChooseRegionPage() {
  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-20">
        <h1 className="text-[36px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] text-[#1d1d1f]">
          Choose Your Country
          <br />
          <span className="text-[#86868b]">or Region</span>
        </h1>

        <div className="mt-16 md:mt-20 space-y-14 md:space-y-16">
          {regionGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-[18px] md:text-[22px] font-bold text-[#1d1d1f] pb-4 border-b border-[#e8e8ed]">
                {group.title}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-0 mt-5">
                {group.countries.map((country) => (
                  <div key={country.name} className="py-3 border-b border-[#f0f0f2]">
                    {/* Country name in native language + flag */}
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] shrink-0">{country.flag}</span>
                      <span className="text-[14px] font-semibold text-[#1d1d1f]">{country.native}</span>
                    </div>
                    {/* Languages on separate line */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 pl-7">
                      {country.languages.map((lang) => (
                        <Link
                          key={lang.href + lang.label}
                          href={regionHref(lang.href)}
                          className="text-[13px] text-[#0066cc] hover:underline underline-offset-2 hover:text-[#004499] transition-colors duration-200"
                        >
                          {lang.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* English only for now: in another language it reads as English, under a
   note (components/i18n/EnglishOnly). */
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  return <EnglishOnly lang={(await params).lang}><ChooseRegionPage /></EnglishOnly>;
}
