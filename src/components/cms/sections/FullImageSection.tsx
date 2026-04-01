"use client";

import { CmsImage } from "../CmsImage";
import Link from "next/link";
import type { SectionRow } from "@/types/supabase";

export function FullImageSection({ section }: { section: SectionRow }) {
  return (
    <section className="relative min-h-[65vh] flex items-end overflow-hidden">
      {section.image_url && (
        <CmsImage src={section.image_url} alt={section.image_alt || section.title || ""}className="object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-8 md:px-16 pb-16 md:pb-24">
        {section.title && (
          <h2 className="text-[36px] md:text-[56px] font-bold leading-[1.06] tracking-[-0.035em] text-white">
            {section.title}
          </h2>
        )}
        {section.subtitle && (
          <p className="text-[15px] leading-[1.65] text-white/40 mt-4 max-w-[440px]">{section.subtitle}</p>
        )}
        {section.button_text && section.button_link && (
          <div className="mt-6">
            <Link href={section.button_link} className="inline-flex items-center gap-2 text-[14px] font-medium text-white/50 hover:text-white transition-colors duration-300">
              {section.button_text} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
