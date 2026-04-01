import Link from "next/link";
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
      { name: "Global", flag: "🌐", languages: [{ label: "English", href: "/" }] },
    ],
  },

  /* ═══ MIDDLE EAST & AFRICA ═══ */
  {
    title: "Middle East & Africa",
    countries: [
      // Middle East (alphabetical)
      { name: "Bahrain", flag: "🇧🇭", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Egypt", flag: "🇪🇬", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Iran", flag: "🇮🇷", languages: [{ label: "فارسی", href: "/middle-east/fa" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Iraq", flag: "🇮🇶", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Jordan", flag: "🇯🇴", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Kuwait", flag: "🇰🇼", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Lebanon", flag: "🇱🇧", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Libya", flag: "🇱🇾", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Oman", flag: "🇴🇲", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Palestine", flag: "🇵🇸", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Qatar", flag: "🇶🇦", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Saudi Arabia", flag: "🇸🇦", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Syria", flag: "🇸🇾", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "United Arab Emirates", flag: "🇦🇪", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Yemen", flag: "🇾🇪", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      // Africa (alphabetical)
      { name: "Algeria", flag: "🇩🇿", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Angola", flag: "🇦🇴", languages: [{ label: "Português", href: "/africa/pt" }, { label: "English", href: "/africa/en" }] },
      { name: "Cameroon", flag: "🇨🇲", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Côte d'Ivoire", flag: "🇨🇮", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "DR Congo", flag: "🇨🇩", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Ethiopia", flag: "🇪🇹", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Ghana", flag: "🇬🇭", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Kenya", flag: "🇰🇪", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Madagascar", flag: "🇲🇬", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Mauritius", flag: "🇲🇺", languages: [{ label: "English", href: "/africa/en" }, { label: "Français", href: "/africa/fr" }] },
      { name: "Morocco", flag: "🇲🇦", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Mozambique", flag: "🇲🇿", languages: [{ label: "Português", href: "/africa/pt" }, { label: "English", href: "/africa/en" }] },
      { name: "Nigeria", flag: "🇳🇬", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Rwanda", flag: "🇷🇼", languages: [{ label: "English", href: "/africa/en" }, { label: "Français", href: "/africa/fr" }] },
      { name: "Senegal", flag: "🇸🇳", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "South Africa", flag: "🇿🇦", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Sudan", flag: "🇸🇩", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "English", href: "/africa/en" }] },
      { name: "Tanzania", flag: "🇹🇿", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Tunisia", flag: "🇹🇳", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Uganda", flag: "🇺🇬", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Zambia", flag: "🇿🇲", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Zimbabwe", flag: "🇿🇼", languages: [{ label: "English", href: "/africa/en" }] },
    ],
  },

  /* ═══ ASIA PACIFIC ═══ */
  {
    title: "Asia Pacific",
    countries: [
      { name: "Australia", flag: "🇦🇺", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Bangladesh", flag: "🇧🇩", languages: [{ label: "বাংলা", href: "/asia/bn" }, { label: "English", href: "/asia/en" }] },
      { name: "Cambodia", flag: "🇰🇭", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "China", flag: "🇨🇳", languages: [{ label: "中文", href: "/asia/zh" }, { label: "English", href: "/asia/en" }] },
      { name: "Hong Kong", flag: "🇭🇰", languages: [{ label: "中文", href: "/asia/zh" }, { label: "English", href: "/asia/en" }] },
      { name: "India", flag: "🇮🇳", languages: [{ label: "हिन्दी", href: "/asia/hi" }, { label: "தமிழ்", href: "/asia/ta" }, { label: "বাংলা", href: "/asia/bn" }, { label: "English", href: "/asia/en" }] },
      { name: "Indonesia", flag: "🇮🇩", languages: [{ label: "Bahasa Indonesia", href: "/asia/id" }, { label: "English", href: "/asia/en" }] },
      { name: "Japan", flag: "🇯🇵", languages: [{ label: "日本語", href: "/asia/ja" }, { label: "English", href: "/asia/en" }] },
      { name: "Laos", flag: "🇱🇦", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Malaysia", flag: "🇲🇾", languages: [{ label: "Bahasa Melayu", href: "/asia/ms" }, { label: "English", href: "/asia/en" }] },
      { name: "Mongolia", flag: "🇲🇳", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Myanmar", flag: "🇲🇲", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Nepal", flag: "🇳🇵", languages: [{ label: "हिन्दी", href: "/asia/hi" }, { label: "English", href: "/asia/en" }] },
      { name: "New Zealand", flag: "🇳🇿", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Pakistan", flag: "🇵🇰", languages: [{ label: "اردو", href: "/asia/ur" }, { label: "English", href: "/asia/en" }] },
      { name: "Philippines", flag: "🇵🇭", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Singapore", flag: "🇸🇬", languages: [{ label: "English", href: "/asia/en" }, { label: "中文", href: "/asia/zh" }] },
      { name: "South Korea", flag: "🇰🇷", languages: [{ label: "한국어", href: "/asia/ko" }, { label: "English", href: "/asia/en" }] },
      { name: "Sri Lanka", flag: "🇱🇰", languages: [{ label: "தமிழ்", href: "/asia/ta" }, { label: "English", href: "/asia/en" }] },
      { name: "Taiwan", flag: "🇹🇼", languages: [{ label: "中文", href: "/asia/zh" }, { label: "English", href: "/asia/en" }] },
      { name: "Thailand", flag: "🇹🇭", languages: [{ label: "ไทย", href: "/asia/th" }, { label: "English", href: "/asia/en" }] },
      { name: "Vietnam", flag: "🇻🇳", languages: [{ label: "Tiếng Việt", href: "/asia/vi" }, { label: "English", href: "/asia/en" }] },
    ],
  },

  /* ═══ EUROPE ═══ */
  {
    title: "Europe",
    countries: [
      { name: "Austria", flag: "🇦🇹", languages: [{ label: "Deutsch", href: "/europe/de" }, { label: "English", href: "/europe/en" }] },
      { name: "Belgium", flag: "🇧🇪", languages: [{ label: "Nederlands", href: "/europe/nl" }, { label: "Français", href: "/europe/fr" }, { label: "English", href: "/europe/en" }] },
      { name: "Bulgaria", flag: "🇧🇬", languages: [{ label: "Български", href: "/europe/bg" }, { label: "English", href: "/europe/en" }] },
      { name: "Croatia", flag: "🇭🇷", languages: [{ label: "Hrvatski", href: "/europe/hr" }, { label: "English", href: "/europe/en" }] },
      { name: "Cyprus", flag: "🇨🇾", languages: [{ label: "Ελληνικά", href: "/europe/el" }, { label: "English", href: "/europe/en" }] },
      { name: "Czech Republic", flag: "🇨🇿", languages: [{ label: "Čeština", href: "/europe/cs" }, { label: "English", href: "/europe/en" }] },
      { name: "Denmark", flag: "🇩🇰", languages: [{ label: "Dansk", href: "/europe/da" }, { label: "English", href: "/europe/en" }] },
      { name: "Estonia", flag: "🇪🇪", languages: [{ label: "Eesti", href: "/europe/et" }, { label: "English", href: "/europe/en" }] },
      { name: "Finland", flag: "🇫🇮", languages: [{ label: "Suomi", href: "/europe/fi" }, { label: "English", href: "/europe/en" }] },
      { name: "France", flag: "🇫🇷", languages: [{ label: "Français", href: "/europe/fr" }, { label: "English", href: "/europe/en" }] },
      { name: "Germany", flag: "🇩🇪", languages: [{ label: "Deutsch", href: "/europe/de" }, { label: "English", href: "/europe/en" }] },
      { name: "Greece", flag: "🇬🇷", languages: [{ label: "Ελληνικά", href: "/europe/el" }, { label: "English", href: "/europe/en" }] },
      { name: "Hungary", flag: "🇭🇺", languages: [{ label: "Magyar", href: "/europe/hu" }, { label: "English", href: "/europe/en" }] },
      { name: "Iceland", flag: "🇮🇸", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Ireland", flag: "🇮🇪", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Italy", flag: "🇮🇹", languages: [{ label: "Italiano", href: "/europe/it" }, { label: "English", href: "/europe/en" }] },
      { name: "Latvia", flag: "🇱🇻", languages: [{ label: "Latviešu", href: "/europe/lv" }, { label: "English", href: "/europe/en" }] },
      { name: "Lithuania", flag: "🇱🇹", languages: [{ label: "Lietuvių", href: "/europe/lt" }, { label: "English", href: "/europe/en" }] },
      { name: "Luxembourg", flag: "🇱🇺", languages: [{ label: "Français", href: "/europe/fr" }, { label: "Deutsch", href: "/europe/de" }, { label: "English", href: "/europe/en" }] },
      { name: "Malta", flag: "🇲🇹", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Netherlands", flag: "🇳🇱", languages: [{ label: "Nederlands", href: "/europe/nl" }, { label: "English", href: "/europe/en" }] },
      { name: "Norway", flag: "🇳🇴", languages: [{ label: "Norsk", href: "/europe/no" }, { label: "English", href: "/europe/en" }] },
      { name: "Poland", flag: "🇵🇱", languages: [{ label: "Polski", href: "/europe/pl" }, { label: "English", href: "/europe/en" }] },
      { name: "Portugal", flag: "🇵🇹", languages: [{ label: "Português", href: "/europe/pt" }, { label: "English", href: "/europe/en" }] },
      { name: "Romania", flag: "🇷🇴", languages: [{ label: "Română", href: "/europe/ro" }, { label: "English", href: "/europe/en" }] },
      { name: "Serbia", flag: "🇷🇸", languages: [{ label: "Srpski", href: "/europe/sr" }, { label: "English", href: "/europe/en" }] },
      { name: "Slovakia", flag: "🇸🇰", languages: [{ label: "Slovenčina", href: "/europe/sk" }, { label: "English", href: "/europe/en" }] },
      { name: "Slovenia", flag: "🇸🇮", languages: [{ label: "Slovenščina", href: "/europe/sl" }, { label: "English", href: "/europe/en" }] },
      { name: "Spain", flag: "🇪🇸", languages: [{ label: "Español", href: "/europe/es" }, { label: "English", href: "/europe/en" }] },
      { name: "Sweden", flag: "🇸🇪", languages: [{ label: "Svenska", href: "/europe/sv" }, { label: "English", href: "/europe/en" }] },
      { name: "Switzerland", flag: "🇨🇭", languages: [{ label: "Deutsch", href: "/europe/de" }, { label: "Français", href: "/europe/fr" }, { label: "Italiano", href: "/europe/it" }, { label: "English", href: "/europe/en" }] },
      { name: "United Kingdom", flag: "🇬🇧", languages: [{ label: "English", href: "/europe/en" }] },
    ],
  },

  /* ═══ AMERICAS ═══ */
  {
    title: "Americas",
    countries: [
      { name: "Canada", flag: "🇨🇦", languages: [{ label: "English", href: "/americas/en" }, { label: "Français", href: "/americas/fr" }] },
      { name: "United States", flag: "🇺🇸", languages: [{ label: "English", href: "/americas/en" }, { label: "Español", href: "/americas/es" }] },
    ],
  },

  /* ═══ LATIN AMERICA AND THE CARIBBEAN ═══ */
  {
    title: "Latin America and the Caribbean",
    countries: [
      { name: "Argentina", flag: "🇦🇷", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Bolivia", flag: "🇧🇴", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Brazil", flag: "🇧🇷", languages: [{ label: "Português", href: "/americas/pt" }, { label: "English", href: "/americas/en" }] },
      { name: "Chile", flag: "🇨🇱", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Colombia", flag: "🇨🇴", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Costa Rica", flag: "🇨🇷", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Cuba", flag: "🇨🇺", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Dominican Republic", flag: "🇩🇴", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Ecuador", flag: "🇪🇨", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "El Salvador", flag: "🇸🇻", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Guatemala", flag: "🇬🇹", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Guyana", flag: "🇬🇾", languages: [{ label: "English", href: "/americas/en" }] },
      { name: "Haiti", flag: "🇭🇹", languages: [{ label: "Français", href: "/americas/fr" }, { label: "English", href: "/americas/en" }] },
      { name: "Honduras", flag: "🇭🇳", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Jamaica", flag: "🇯🇲", languages: [{ label: "English", href: "/americas/en" }] },
      { name: "Mexico", flag: "🇲🇽", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Nicaragua", flag: "🇳🇮", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Panama", flag: "🇵🇦", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Paraguay", flag: "🇵🇾", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Peru", flag: "🇵🇪", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Puerto Rico", flag: "🇵🇷", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Suriname", flag: "🇸🇷", languages: [{ label: "Nederlands", href: "/americas/nl" }, { label: "English", href: "/americas/en" }] },
      { name: "Trinidad and Tobago", flag: "🇹🇹", languages: [{ label: "English", href: "/americas/en" }] },
      { name: "Uruguay", flag: "🇺🇾", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Venezuela", flag: "🇻🇪", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
    ],
  },

  /* ═══ EURASIA ═══ */
  {
    title: "Eurasia",
    countries: [
      { name: "Armenia", flag: "🇦🇲", languages: [{ label: "Հayerեn", href: "/eurasia/hy" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Azerbaijan", flag: "🇦🇿", languages: [{ label: "Azərbaycanca", href: "/eurasia/az" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Belarus", flag: "🇧🇾", languages: [{ label: "Русский", href: "/eurasia/ru" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Georgia", flag: "🇬🇪", languages: [{ label: "ქართული", href: "/eurasia/ka" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Kazakhstan", flag: "🇰🇿", languages: [{ label: "Қазақша", href: "/eurasia/kk" }, { label: "Русский", href: "/eurasia/ru" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Kyrgyzstan", flag: "🇰🇬", languages: [{ label: "Русский", href: "/eurasia/ru" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Moldova", flag: "🇲🇩", languages: [{ label: "Română", href: "/eurasia/ro" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Russia", flag: "🇷🇺", languages: [{ label: "Русский", href: "/eurasia/ru" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Tajikistan", flag: "🇹🇯", languages: [{ label: "Русский", href: "/eurasia/ru" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Turkey", flag: "🇹🇷", languages: [{ label: "Türkçe", href: "/eurasia/tr" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Turkmenistan", flag: "🇹🇲", languages: [{ label: "English", href: "/eurasia/en" }] },
      { name: "Ukraine", flag: "🇺🇦", languages: [{ label: "Українська", href: "/eurasia/uk" }, { label: "English", href: "/eurasia/en" }] },
      { name: "Uzbekistan", flag: "🇺🇿", languages: [{ label: "Oʻzbekcha", href: "/eurasia/uz" }, { label: "Русский", href: "/eurasia/ru" }, { label: "English", href: "/eurasia/en" }] },
    ],
  },
];

export default function ChooseRegionPage() {
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
                    {/* Country name + flag */}
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] shrink-0">{country.flag}</span>
                      <span className="text-[14px] font-semibold text-[#1d1d1f]">{country.name}</span>
                    </div>
                    {/* Languages on separate line */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 pl-7">
                      {country.languages.map((lang) => (
                        <Link
                          key={lang.href + lang.label}
                          href={lang.href}
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
