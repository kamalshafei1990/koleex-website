"use client";

import Link from "next/link";
import { useEffect } from "react";
import { KoleexLogo } from "@/components/ui/KoleexLogo";

/* ---------------------------------------------------------------------------
   Choose Your Country or Region — Honor.com style full page selector.
   White bg, continent headings, 4-column grid of country/language links.

   This page hides the global Header/Footer via useEffect to create
   a standalone experience. They are restored when navigating away.
   --------------------------------------------------------------------------- */

interface CountryItem {
  name: string;
  language: string;
  href: string;
}

interface RegionGroup {
  title: string;
  countries: CountryItem[];
}

const regionGroups: RegionGroup[] = [
  {
    title: "Middle East & Africa",
    countries: [
      { name: "United Arab Emirates", language: "العربية", href: "/middle-east/ar" },
      { name: "United Arab Emirates", language: "English", href: "/middle-east/en" },
      { name: "Saudi Arabia", language: "العربية", href: "/middle-east/ar" },
      { name: "Saudi Arabia", language: "English", href: "/middle-east/en" },
      { name: "Egypt", language: "العربية", href: "/middle-east/ar" },
      { name: "Egypt", language: "English", href: "/middle-east/en" },
      { name: "Qatar", language: "العربية", href: "/middle-east/ar" },
      { name: "Kuwait", language: "العربية", href: "/middle-east/ar" },
      { name: "Bahrain", language: "العربية", href: "/middle-east/ar" },
      { name: "Oman", language: "العربية", href: "/middle-east/ar" },
      { name: "Jordan", language: "العربية", href: "/middle-east/ar" },
      { name: "Iraq", language: "العربية", href: "/middle-east/ar" },
      { name: "Iran", language: "فارسی", href: "/middle-east/fa" },
      { name: "Lebanon", language: "العربية", href: "/middle-east/ar" },
      { name: "Nigeria", language: "English", href: "/africa/en" },
      { name: "Kenya", language: "English", href: "/africa/en" },
      { name: "South Africa", language: "English", href: "/africa/en" },
      { name: "Ghana", language: "English", href: "/africa/en" },
      { name: "Morocco", language: "Français", href: "/africa/fr" },
      { name: "Tunisia", language: "Français", href: "/africa/fr" },
      { name: "Algeria", language: "العربية", href: "/africa/ar" },
      { name: "Senegal", language: "Français", href: "/africa/fr" },
      { name: "Cameroon", language: "Français", href: "/africa/fr" },
      { name: "Ethiopia", language: "English", href: "/africa/en" },
    ],
  },
  {
    title: "Asia Pacific",
    countries: [
      { name: "China", language: "中文", href: "/asia/zh" },
      { name: "Hong Kong", language: "中文", href: "/asia/zh" },
      { name: "Hong Kong", language: "English", href: "/asia/en" },
      { name: "Taiwan", language: "中文", href: "/asia/zh" },
      { name: "India", language: "हिन्दी", href: "/asia/hi" },
      { name: "India", language: "English", href: "/asia/en" },
      { name: "India", language: "தமிழ்", href: "/asia/ta" },
      { name: "India", language: "বাংলা", href: "/asia/bn" },
      { name: "Pakistan", language: "اردو", href: "/asia/ur" },
      { name: "Pakistan", language: "English", href: "/asia/en" },
      { name: "Bangladesh", language: "বাংলা", href: "/asia/bn" },
      { name: "Bangladesh", language: "English", href: "/asia/en" },
      { name: "Sri Lanka", language: "தமிழ்", href: "/asia/ta" },
      { name: "Sri Lanka", language: "English", href: "/asia/en" },
      { name: "Thailand", language: "ไทย", href: "/asia/th" },
      { name: "Vietnam", language: "Tiếng Việt", href: "/asia/vi" },
      { name: "Indonesia", language: "Bahasa Indonesia", href: "/asia/id" },
      { name: "Malaysia", language: "English", href: "/asia/en" },
      { name: "Singapore", language: "English", href: "/asia/en" },
      { name: "Philippines", language: "English", href: "/asia/en" },
      { name: "Japan", language: "English", href: "/asia/en" },
      { name: "South Korea", language: "English", href: "/asia/en" },
    ],
  },
  {
    title: "Europe",
    countries: [
      { name: "United Kingdom", language: "English", href: "/europe/en" },
      { name: "Germany", language: "English", href: "/europe/en" },
      { name: "France", language: "Français", href: "/europe/fr" },
      { name: "Italy", language: "English", href: "/europe/en" },
      { name: "Spain", language: "English", href: "/europe/en" },
      { name: "Netherlands", language: "Nederlands", href: "/europe/nl" },
      { name: "Belgium", language: "Nederlands", href: "/europe/nl" },
      { name: "Belgium", language: "Français", href: "/europe/fr" },
      { name: "Poland", language: "Polski", href: "/europe/pl" },
      { name: "Portugal", language: "Português", href: "/europe/pt" },
      { name: "Sweden", language: "English", href: "/europe/en" },
      { name: "Norway", language: "English", href: "/europe/en" },
      { name: "Denmark", language: "English", href: "/europe/en" },
      { name: "Finland", language: "English", href: "/europe/en" },
      { name: "Austria", language: "English", href: "/europe/en" },
      { name: "Switzerland", language: "Français", href: "/europe/fr" },
      { name: "Ireland", language: "English", href: "/europe/en" },
      { name: "Czech Republic", language: "English", href: "/europe/en" },
      { name: "Romania", language: "English", href: "/europe/en" },
      { name: "Hungary", language: "English", href: "/europe/en" },
      { name: "Greece", language: "English", href: "/europe/en" },
      { name: "Russia", language: "Русский", href: "/europe/ru" },
      { name: "Turkey", language: "Türkçe", href: "/europe/tr" },
      { name: "Ukraine", language: "English", href: "/europe/en" },
    ],
  },
  {
    title: "Americas",
    countries: [
      { name: "United States", language: "English", href: "/americas/en" },
      { name: "Canada", language: "English", href: "/americas/en" },
      { name: "Mexico", language: "Español", href: "/americas/es" },
      { name: "Brazil", language: "Português", href: "/americas/pt" },
      { name: "Argentina", language: "Español", href: "/americas/es" },
      { name: "Colombia", language: "Español", href: "/americas/es" },
      { name: "Chile", language: "Español", href: "/americas/es" },
      { name: "Peru", language: "Español", href: "/americas/es" },
      { name: "Ecuador", language: "Español", href: "/americas/es" },
      { name: "Venezuela", language: "Español", href: "/americas/es" },
    ],
  },
  {
    title: "Global",
    countries: [
      { name: "Global", language: "English", href: "/" },
    ],
  },
];

export default function ChooseRegionPage() {
  /* Hide global Header/Footer on this page */
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
      {/* Minimal header — just logo */}
      <div className="border-b border-[#e8e8ed]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
          <Link href="/">
            <KoleexLogo color="dark" height={16} />
          </Link>
          <Link href="/" className="text-[13px] text-[#0066cc] hover:underline underline-offset-2">
            Go to Global site →
          </Link>
        </div>
      </div>

      {/* Page content */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-20">
        <h1 className="text-[36px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] text-[#1d1d1f]">
          Choose Your Country
          <br />
          <span className="text-[#86868b]">or Region</span>
        </h1>

        {/* Region groups */}
        <div className="mt-16 md:mt-20 space-y-14 md:space-y-16">
          {regionGroups.map((group) => (
            <div key={group.title}>
              {/* Continent heading */}
              <h2 className="text-[18px] md:text-[22px] font-bold text-[#1d1d1f] pb-4 border-b border-[#e8e8ed]">
                {group.title}
              </h2>

              {/* Country grid — 4 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-1 mt-5">
                {group.countries.map((country, i) => (
                  <Link
                    key={`${country.name}-${country.language}-${i}`}
                    href={country.href}
                    className="group flex items-baseline gap-1 py-2.5 text-[14px] hover:text-[#0066cc] transition-colors duration-200"
                  >
                    <span className="font-medium text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors duration-200">
                      {country.name}
                    </span>
                    <span className="text-[#aeaeb2] group-hover:text-[#0066cc]/50 transition-colors duration-200">
                      / {country.language}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#e8e8ed] mt-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[#aeaeb2]">
            © {new Date().getFullYear()} Koleex International Group. All rights reserved.
          </p>
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
