"use client";

import { CmsImage } from "../CmsImage";
import Link from "next/link";
import type { SectionRow } from "@/types/supabase";

export function HeroSection({ section }: { section: SectionRow }) {
  const dark = section.background === "dark" || section.background === "black";

  return (
    <section className={`${dark ? "bg-black" : "bg-white"} text-center overflow-hidden`}>
      <div className="pt-16 md:pt-24 px-6">
        {section.title && (
          <h1 className={`text-[56px] md:text-[80px] font-semibold leading-[1.03] tracking-[-0.045em] ${dark ? "text-white" : "text-[#1d1d1f]"}`}>
            {section.title}
          </h1>
        )}
        {section.subtitle && (
          <p className={`text-[21px] md:text-[28px] font-normal leading-[1.14] tracking-[-0.016em] mt-2 ${dark ? "text-[#86868b]" : "text-[#6e6e73]"}`}>
            {section.subtitle}
          </p>
        )}
        {(section.button_text || section.button2_text) && (
          <div className="flex items-center justify-center gap-5 mt-5">
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
        )}
      </div>
      {section.image_url && (
        <div className="mt-6">
          <CmsImage src={section.image_url} alt={section.image_alt || section.title || ""} className="w-full h-auto block" />
        </div>
      )}
    </section>
  );
}
