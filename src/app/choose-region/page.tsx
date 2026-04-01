"use client";

import Link from "next/link";
import { useEffect } from "react";
import { KoleexLogo } from "@/components/ui/KoleexLogo";

/* ---------------------------------------------------------------------------
   Choose Your Country or Region — One country, multiple languages.
   No duplicates. Format: "Country — Lang1 / Lang2"
   --------------------------------------------------------------------------- */

interface CountryItem {
  name: string;
  languages: { label: string; href: string }[];
}

interface RegionGroup {
  title: string;
  countries: CountryItem[];
}

const regionGroups: RegionGroup[] = [
  {
    title: "Middle East & Africa",
    countries: [
      { name: "United Arab Emirates", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Saudi Arabia", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Egypt", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Qatar", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Kuwait", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Bahrain", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Oman", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Jordan", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Iraq", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Iran", languages: [{ label: "فارسی", href: "/middle-east/fa" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Lebanon", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Yemen", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Syria", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Palestine", languages: [{ label: "العربية", href: "/middle-east/ar" }, { label: "English", href: "/middle-east/en" }] },
      { name: "Nigeria", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Kenya", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "South Africa", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Ghana", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Ethiopia", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Tanzania", languages: [{ label: "English", href: "/africa/en" }] },
      { name: "Morocco", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Tunisia", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Algeria", languages: [{ label: "العربية", href: "/africa/ar" }, { label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Senegal", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
      { name: "Cameroon", languages: [{ label: "Français", href: "/africa/fr" }, { label: "English", href: "/africa/en" }] },
    ],
  },
  {
    title: "Asia Pacific",
    countries: [
      { name: "China", languages: [{ label: "中文", href: "/asia/zh" }, { label: "English", href: "/asia/en" }] },
      { name: "Hong Kong", languages: [{ label: "中文", href: "/asia/zh" }, { label: "English", href: "/asia/en" }] },
      { name: "Taiwan", languages: [{ label: "中文", href: "/asia/zh" }, { label: "English", href: "/asia/en" }] },
      { name: "Japan", languages: [{ label: "日本語", href: "/asia/ja" }, { label: "English", href: "/asia/en" }] },
      { name: "South Korea", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "India", languages: [{ label: "हिन्दी", href: "/asia/hi" }, { label: "தமிழ்", href: "/asia/ta" }, { label: "বাংলা", href: "/asia/bn" }, { label: "English", href: "/asia/en" }] },
      { name: "Pakistan", languages: [{ label: "اردو", href: "/asia/ur" }, { label: "English", href: "/asia/en" }] },
      { name: "Bangladesh", languages: [{ label: "বাংলা", href: "/asia/bn" }, { label: "English", href: "/asia/en" }] },
      { name: "Sri Lanka", languages: [{ label: "தமிழ்", href: "/asia/ta" }, { label: "English", href: "/asia/en" }] },
      { name: "Thailand", languages: [{ label: "ไทย", href: "/asia/th" }, { label: "English", href: "/asia/en" }] },
      { name: "Vietnam", languages: [{ label: "Tiếng Việt", href: "/asia/vi" }, { label: "English", href: "/asia/en" }] },
      { name: "Indonesia", languages: [{ label: "Bahasa Indonesia", href: "/asia/id" }, { label: "English", href: "/asia/en" }] },
      { name: "Malaysia", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Singapore", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Philippines", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Myanmar", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Cambodia", languages: [{ label: "English", href: "/asia/en" }] },
      { name: "Nepal", languages: [{ label: "हिन्दी", href: "/asia/hi" }, { label: "English", href: "/asia/en" }] },
    ],
  },
  {
    title: "Europe",
    countries: [
      { name: "United Kingdom", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Germany", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "France", languages: [{ label: "Français", href: "/europe/fr" }, { label: "English", href: "/europe/en" }] },
      { name: "Italy", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Spain", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Netherlands", languages: [{ label: "Nederlands", href: "/europe/nl" }, { label: "English", href: "/europe/en" }] },
      { name: "Belgium", languages: [{ label: "Nederlands", href: "/europe/nl" }, { label: "Français", href: "/europe/fr" }, { label: "English", href: "/europe/en" }] },
      { name: "Poland", languages: [{ label: "Polski", href: "/europe/pl" }, { label: "English", href: "/europe/en" }] },
      { name: "Portugal", languages: [{ label: "Português", href: "/europe/pt" }, { label: "English", href: "/europe/en" }] },
      { name: "Sweden", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Norway", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Denmark", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Finland", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Austria", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Switzerland", languages: [{ label: "Français", href: "/europe/fr" }, { label: "English", href: "/europe/en" }] },
      { name: "Ireland", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Czech Republic", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Romania", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Hungary", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Greece", languages: [{ label: "English", href: "/europe/en" }] },
      { name: "Russia", languages: [{ label: "Русский", href: "/europe/ru" }, { label: "English", href: "/europe/en" }] },
      { name: "Turkey", languages: [{ label: "Türkçe", href: "/europe/tr" }, { label: "English", href: "/europe/en" }] },
      { name: "Ukraine", languages: [{ label: "English", href: "/europe/en" }] },
    ],
  },
  {
    title: "Americas",
    countries: [
      { name: "United States", languages: [{ label: "English", href: "/americas/en" }] },
      { name: "Canada", languages: [{ label: "English", href: "/americas/en" }, { label: "Français", href: "/americas/fr" }] },
      { name: "Mexico", languages: [{ label: "Español", href: "/americas/es" }, { label: "English", href: "/americas/en" }] },
      { name: "Brazil", languages: [{ label: "Português", href: "/americas/pt" }, { label: "English", href: "/americas/en" }] },
      { name: "Argentina", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Colombia", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Chile", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Peru", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Ecuador", languages: [{ label: "Español", href: "/americas/es" }] },
      { name: "Venezuela", languages: [{ label: "Español", href: "/americas/es" }] },
    ],
  },
  {
    title: "Global",
    countries: [
      { name: "Global", languages: [{ label: "English", href: "/" }] },
    ],
  },
];

export default function ChooseRegionPage() {
  useEffect(() => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const main = document.querySelector("main");
    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";
    if (main) { main.style.paddingTop = "0"; main.style.background = "white"; }
    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
      if (main) { main.style.paddingTop = ""; main.style.background = ""; }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      {/* Header */}
      <div className="border-b border-[#e8e8ed]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
          <Link href="/"><KoleexLogo color="dark" height={16} /></Link>
          <Link href="/" className="text-[13px] text-[#0066cc] hover:underline underline-offset-2">Go to Global site →</Link>
        </div>
      </div>

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
                  <div key={country.name} className="py-2.5">
                    <span className="text-[14px] font-medium text-[#1d1d1f]">{country.name}</span>
                    <span className="text-[#aeaeb2]"> — </span>
                    {country.languages.map((lang, li) => (
                      <span key={lang.label}>
                        {li > 0 && <span className="text-[#d2d2d7]"> / </span>}
                        <Link
                          href={lang.href}
                          className="text-[14px] text-[#0066cc] hover:underline underline-offset-2"
                        >
                          {lang.label}
                        </Link>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#e8e8ed] mt-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[#aeaeb2]">© {new Date().getFullYear()} Koleex International Group. All rights reserved.</p>
          <div className="flex items-center gap-5 text-[12px]">
            <Link href="/privacy" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors">Terms</Link>
            <Link href="/contact" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
