"use client";

import { CmsImage } from "../CmsImage";
import Link from "next/link";
import type { SectionRow } from "@/types/supabase";

export function GridSection({ section }: { section: SectionRow }) {
  const items = section.items || [];

  return (
    <section className={`${section.background === "light" ? "bg-[#f5f5f7]" : "bg-white"} py-24 md:py-32 overflow-hidden`}>
      <div className="max-w-[1040px] mx-auto px-6">
        {section.title && (
          <div className="text-center mb-14">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-[-0.035em] text-[#1d1d1f]">{section.title}</h2>
            {section.subtitle && <p className="text-[16px] text-[#86868b] mt-3">{section.subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map((item, i) => (
            <div key={i} className="group rounded-[14px] overflow-hidden bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-500">
              {item.image && (
                <div className="aspect-[4/3] overflow-hidden">
                  <CmsImage src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700" />
                </div>
              )}
              <div className="p-4">
                {item.icon && <span className="text-lg">{item.icon}</span>}
                <h3 className="text-[13px] font-semibold text-[#1d1d1f]">{item.title}</h3>
                {item.description && <p className="text-[12px] text-[#86868b] mt-1">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
        {section.button_text && section.button_link && (
          <div className="text-center mt-10">
            <Link href={section.button_link} className="text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">
              {section.button_text} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
