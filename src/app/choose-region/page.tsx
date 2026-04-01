import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choose Your Country or Region",
  description: "Select your country or region to visit the Koleex website in your local language.",
};

/* ---------------------------------------------------------------------------
   Choose Your Country or Region — With country flags.
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
  {
    title: "Global",
    countries: [
      { name: "Global", flag: "🌐", languages: [{ label: "English", href: "/" }] },
    ],
  },
  {
    title: "Middle East & Africa",
    countries: [
      { name: "United Arab Emirates", flag: "🇦🇪", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Saudi Arabia", flag: "🇸🇦", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Egypt", flag: "🇪🇬", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Qatar", flag: "🇶🇦", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Kuwait", flag: "🇰🇼", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Bahrain", flag: "🇧🇭", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Oman", flag: "🇴🇲", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Jordan", flag: "🇯🇴", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Iraq", flag: "🇮🇶", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Iran", flag: "🇮🇷", languages: [{ label: "فارسی", href: "/middle-east/fa" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Lebanon", flag: "🇱🇧", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Yemen", flag: "🇾🇪", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Syria", flag: "🇸🇾", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Palestine", flag: "🇵🇸", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Nigeria", flag: "🇳🇬", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Kenya", flag: "🇰🇪", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "South Africa", flag: "🇿🇦", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Ghana", flag: "🇬🇭", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Ethiopia", flag: "🇪🇹", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Tanzania", flag: "🇹🇿", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Morocco", flag: "🇲🇦", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Tunisia", flag: "🇹🇳", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Algeria", flag: "🇩🇿", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Senegal", flag: "🇸🇳", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Cameroon", flag: "🇨🇲", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
    ],
  },
  {
    title: "Asia Pacific",
    countries: [
      { name: "China", flag: "🇨🇳", languages: [{ label: "中文", href: "/asia/zh" }, { label: "English", href: "/asia/en" }] },
      { name: "Hong Kong", flag: "🇭🇰", languages: [{ label: "中文", href: "/asia/zh" }, { label: "English", href: "/asia/en" }] },
      { name: "Taiwan", flag: "🇹🇼", languages: [{ label: "中文", href: "/asia/zh" }, { label: "English", href: "/asia/en" }] },
      { name: "Japan", flag: "🇯🇵", languages: [{ label: "日本語", href: "/asia/ja" }, { label: "English", href: "/asia/en" }] },
      { name: "South Korea", flag: "🇰🇷", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "India", flag: "🇮🇳", languages: [{ label: "हिन्दी", href: "/asia/hi" }, { label: "தமிழ்", href: "/asia/ta" }, { label: "বাংলা", href: "/asia/bn" }, { label: "English", href: "/asia/en" }] },
      { name: "Pakistan", flag: "🇵🇰", languages: [{ label: "اردو", href: "/asia/ur" }, { label: "English", href: "/asia/en" }] },
      { name: "Bangladesh", flag: "🇧🇩", languages: [{ label: "বাংলা", href: "/asia/bn" }, { label: "English", href: "/asia/en" }] },
      { name: "Sri Lanka", flag: "🇱🇰", languages: [{ label: "தமிழ்", href: "/asia/ta" }, { label: "English", href: "/asia/en" }] },
      { name: "Thailand", flag: "🇹🇭", languages: [{ label: "ไทย", href: "/asia/th" }, { label: "English", href: "/asia/en" }] },
      { name: "Vietnam", flag: "🇻🇳", languages: [{ label: "Tiếng Việt", href: "/asia/vi" }, { label: "English", href: "/asia/en" }] },
      { name: "Indonesia", flag: "🇮🇩", languages: [{ label: "Bahasa Indonesia", href: "/asia/id" }, { label: "English", href: "/asia/en" }] },
      { name: "Malaysia", flag: "🇲🇾", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Singapore", flag: "🇸🇬", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Philippines", flag: "🇵🇭", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Myanmar", flag: "🇲🇲", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Cambodia", flag: "🇰🇭", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Nepal", flag: "🇳🇵", languages: [{ label: "हिन्दी", href: "/asia/hi" }, { label: "English", href: "/asia/en" }] },
    ],
  },
  {
    title: "Europe",
    countries: [
      { name: "United Kingdom", flag: "🇬🇧", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Germany", flag: "🇩🇪", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "France", flag: "🇫🇷", languages: [{ label: "Français", href: "/europe/fr" }, { label: "English", href: "/europe/en" }] },
      { name: "Italy", flag: "🇮🇹", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Spain", flag: "🇪🇸", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Netherlands", flag: "🇳🇱", languages: [{ label: "Nederlands", href: "/europe/nl" }, { label: "English", href: "/europe/en" }] },
      { name: "Belgium", flag: "🇧🇪", languages: [{ label: "Nederlands", href: "/europe/nl" }, { label: "Français", href: "/europe/fr" }, { label: "English", href: "/europe/en" }] },
      { name: "Poland", flag: "🇵🇱", languages: [{ label: "Polski", href: "/europe/pl" }, { label: "English", href: "/europe/en" }] },
      { name: "Portugal", flag: "🇵🇹", languages: [{ label: "Português", href: "/europe/pt" }, { label: "English", href: "/europe/en" }] },
      { name: "Sweden", flag: "🇸🇪", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Norway", flag: "🇳🇴", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Denmark", flag: "🇩🇰", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Finland", flag: "🇫🇮", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Austria", flag: "🇦🇹", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Switzerland", flag: "🇨🇭", languages: [{ label: "Français", href: "/europe/fr" }, { label: "English", href: "/europe/en" }] },
      { name: "Ireland", flag: "🇮🇪", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Czech Republic", flag: "🇨🇿", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Romania", flag: "🇷🇴", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Hungary", flag: "🇭🇺", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Greece", flag: "🇬🇷", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Russia", flag: "🇷🇺", languages: [{ label: "Русский", href: "/europe/ru" }, { label: "English", href: "/europe/en" }] },
      { name: "Turkey", flag: "🇹🇷", languages: [{ label: "Türkçe", href: "/europe/tr" }, { label: "English", href: "/europe/en" }] },
      { name: "Ukraine", flag: "🇺🇦", languages: [{ label: "English", href: "/europe/en" }] },
    ],
  },
  {
    title: "Americas",
    countries: [
      { name: "United States", flag: "🇺🇸", languages: [{ label: "English", href: "/americas/en" }] },
      { name: "Canada", flag: "🇨🇦", languages: [{ label: "English", href: "/americas/en" }, { label: "Français", href: "/americas/fr" }] },
      { name: "Mexico", flag: "🇲🇽", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Brazil", flag: "🇧🇷", languages: [{ label: "Português", href: "/americas/pt" }, { label: "English", href: "/americas/en" }] },
      { name: "Argentina", flag: "🇦🇷", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Colombia", flag: "🇨🇴", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Chile", flag: "🇨🇱", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Peru", flag: "🇵🇪", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Ecuador", flag: "🇪🇨", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Venezuela", flag: "🇻🇪", languages: [{ label: "Español", href: "/americas/es" }] },
    ],
  },
];

export default function ChooseRegionPage() {
  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      {/* Content */}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-1 mt-5">
                {group.countries.map((country) => (
                  <div key={country.name} className="flex items-center gap-2.5 py-2.5">
                    <span className="text-[18px] shrink-0">{country.flag}</span>
                    <div>
                      <span className="text-[14px] font-medium text-[#1d1d1f]">{country.name}</span>
                      <span className="text-[#d2d2d7]"> — </span>
                      {country.languages.map((lang, li) => (
                        <span key={lang.label}>
                          {li > 0 && <span className="text-[#d2d2d7]"> / </span>}
                          <Link
                            href={lang.href}
                            className="text-[13px] text-[#0066cc] hover:underline underline-offset-2"
                          >
                            {lang.label}
                          </Link>
                        </span>
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
