"use client";

import Link from "next/link";
import type { SectionRow } from "@/types/supabase";
import { getContentItems } from "@/lib/section-helpers";

export function NumbersSection({ section }: { section: SectionRow }) {
  const dark = section.background === "dark" || section.background === "black";
  const items = getContentItems(section);

  return (
    <section className={`${dark ? "bg-black" : "bg-white"} py-24 md:py-32 text-center overflow-hidden`}>
      <div className="max-w-[900px] mx-auto px-6">
        {section.title && (
          <h2 className={`text-[36px] md:text-[52px] font-bold tracking-[-0.035em] ${dark ? "text-white" : "text-[#1d1d1f]"}`}>
            {section.title}
          </h2>
        )}
        {section.subtitle && (
          <p className={`text-[17px] leading-[1.5] mt-3 ${dark ? "text-white/35" : "text-[#86868b]"}`}>
            {section.subtitle}
          </p>
        )}
        <div className="flex items-center justify-center flex-wrap mt-14 gap-y-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && <div className={`w-px h-10 mx-8 hidden md:block ${dark ? "bg-white/10" : "bg-[#e8e8ed]"}`} />}
              <div className="text-center px-4">
                <p className={`text-[36px] md:text-[48px] font-bold tracking-[-0.03em] leading-none ${dark ? "text-white" : "text-[#1d1d1f]"}`}>
                  {item.value || item.title}
                </p>
                <p className={`text-[12px] uppercase tracking-[0.06em] mt-2 ${dark ? "text-white/25" : "text-[#86868b]"}`}>
                  {item.label || item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {section.button_text && section.button_link && (
          <div className="mt-10">
            <Link href={section.button_link} className={`text-[17px] ${dark ? "text-[#2997ff]" : "text-[#0066cc]"} hover:underline underline-offset-[3px]`}>
              {section.button_text} {">"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
