"use client";

import { CmsImage } from "../CmsImage";
import Link from "next/link";
import type { SectionRow } from "@/types/supabase";

export function ImageRightSection({ section }: { section: SectionRow }) {
  const dark = section.background === "dark" || section.background === "black";

  return (
    <section className={`${dark ? "bg-black" : section.background === "light" ? "bg-[#f5f5f7]" : "bg-white"} overflow-hidden`}>
      <div className="flex flex-col lg:flex-row-reverse min-h-[420px]">
        {section.image_url && (
          <div className="lg:w-[52%] overflow-hidden">
            <CmsImage src={section.image_url} alt={section.image_alt || section.title || ""} className="w-full h-full object-cover min-h-[260px] lg:min-h-[420px]" />
          </div>
        )}
        <div className="lg:w-[48%] flex items-center px-8 md:px-14 lg:px-16 py-12 lg:py-0">
          <div className="max-w-[420px]">
            {section.title && (
              <h2 className={`text-[32px] md:text-[44px] font-bold leading-[1.08] tracking-[-0.03em] ${dark ? "text-white" : "text-[#1d1d1f]"}`}>
                {section.title}
              </h2>
            )}
            {section.subtitle && (
              <p className={`text-[15px] leading-[1.7] mt-4 ${dark ? "text-white/35" : "text-[#86868b]"}`}>
                {section.subtitle}
              </p>
            )}
            {section.content && (
              <p className={`text-[14px] leading-[1.7] mt-3 ${dark ? "text-white/25" : "text-[#aeaeb2]"}`}>
                {section.content}
              </p>
            )}
            {section.button_text && section.button_link && (
              <div className="mt-6">
                <Link href={section.button_link} className={`inline-flex items-center gap-2 text-[14px] font-medium ${dark ? "text-[#2997ff]" : "text-[#0066cc]"} hover:underline underline-offset-[3px]`}>
                  {section.button_text} →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
