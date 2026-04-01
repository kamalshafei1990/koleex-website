"use client";

import Link from "next/link";
import type { SectionRow } from "@/types/supabase";

export function QuoteSection({ section }: { section: SectionRow }) {
  return (
    <section className="bg-[#111] py-24 md:py-32 text-center overflow-hidden">
      <div className="max-w-[700px] mx-auto px-6">
        {section.title && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/15 mb-8">{section.title}</p>
        )}
        {section.content && (
          <blockquote className="text-[24px] md:text-[36px] font-semibold leading-[1.25] tracking-[-0.02em] text-white/65 italic">
            &ldquo;{section.content}&rdquo;
          </blockquote>
        )}
        {section.subtitle && (
          <p className="text-[13px] text-white/20 mt-6">— {section.subtitle}</p>
        )}
        {section.button_text && section.button_link && (
          <div className="mt-8">
            <Link href={section.button_link} className="text-[14px] font-medium text-[#2997ff] hover:underline underline-offset-[3px]">
              {section.button_text} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
