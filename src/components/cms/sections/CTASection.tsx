"use client";

import Link from "next/link";
import type { SectionRow } from "@/types/supabase";

export function CTASection({ section }: { section: SectionRow }) {
  const dark = section.background === "dark" || section.background === "black";

  return (
    <section className={`${dark ? "bg-black" : section.background === "light" ? "bg-[#f5f5f7]" : "bg-white"} text-center py-20 md:py-28 overflow-hidden`}>
      <div className="max-w-[680px] mx-auto px-6">
        {section.title && (
          <h2 className={`text-[36px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] ${dark ? "text-white" : "text-[#1d1d1f]"}`}>
            {section.title}
          </h2>
        )}
        {section.subtitle && (
          <p className={`text-[17px] leading-[1.5] mt-3 ${dark ? "text-white/35" : "text-[#86868b]"}`}>
            {section.subtitle}
          </p>
        )}
        <div className="flex items-center justify-center gap-6 mt-6">
          {section.button_text && section.button_link && (
            <Link href={section.button_link} className={`text-[21px] ${dark ? "text-[#2997ff]" : "text-[#0066cc]"} hover:underline underline-offset-[3px]`}>
              {section.button_text} {">"}
            </Link>
          )}
          {section.button2_text && section.button2_link && (
            <Link href={section.button2_link} className={`text-[21px] ${dark ? "text-[#2997ff]" : "text-[#0066cc]"} hover:underline underline-offset-[3px]`}>
              {section.button2_text} {">"}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
