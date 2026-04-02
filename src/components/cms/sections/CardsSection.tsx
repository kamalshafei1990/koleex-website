"use client";

import Link from "next/link";
import type { SectionRow } from "@/types/supabase";
import { getContentItems } from "@/lib/section-helpers";

export function CardsSection({ section }: { section: SectionRow }) {
  const dark = section.background === "dark" || section.background === "black";
  const items = getContentItems(section);

  return (
    <section className={`${dark ? "bg-black" : section.background === "light" ? "bg-[#f5f5f7]" : "bg-white"} py-24 md:py-32 overflow-hidden`}>
      <div className="max-w-[1000px] mx-auto px-6">
        {(section.title || section.subtitle) && (
          <div className="text-center mb-14">
            {section.title && (
              <h2 className={`text-[32px] md:text-[48px] font-bold tracking-[-0.035em] ${dark ? "text-white" : "text-[#1d1d1f]"}`}>
                {section.title}
              </h2>
            )}
            {section.subtitle && (
              <p className={`text-[16px] mt-3 ${dark ? "text-white/35" : "text-[#86868b]"}`}>
                {section.subtitle}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div key={i} className={`${dark ? "bg-white/[0.03] border border-white/[0.05]" : "bg-[#1d1d1f]"} rounded-[18px] p-6 hover:-translate-y-1 transition-transform duration-500`}>
              {item.icon && <span className="text-[20px] block mb-3">{item.icon}</span>}
              <h4 className={`text-[14px] font-semibold ${dark ? "text-white" : "text-white"}`}>{item.title}</h4>
              {item.description && (
                <p className={`text-[12px] leading-[1.55] mt-2 ${dark ? "text-white/25" : "text-white/30"}`}>{item.description}</p>
              )}
            </div>
          ))}
        </div>
        {section.button_text && section.button_link && (
          <div className="text-center mt-10">
            <Link href={section.button_link} className={`text-[14px] font-medium ${dark ? "text-[#2997ff]" : "text-[#0066cc]"} hover:underline underline-offset-[3px]`}>
              {section.button_text} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
