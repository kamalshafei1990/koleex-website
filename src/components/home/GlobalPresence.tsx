"use client";

import Link from "next/link";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   Section 6: Global Presence — White bg. Stats in a clean row.
   Like Apple's trade-in / Apple Card sections — centered text with data.
   --------------------------------------------------------------------------- */

const stats = [
  { number: "80+", label: "Countries" },
  { number: "12,000+", label: "Clients" },
  { number: "340+", label: "Projects" },
  { number: "15,000+", label: "Configurations" },
];

export function GlobalPresence() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="bg-white text-center py-20 md:py-28 overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <h2 className="text-[48px] md:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
          Global reach.
        </h2>
        <p className="text-[19px] md:text-[21px] font-normal leading-[1.24] text-[#6e6e73] mt-2 max-w-md mx-auto" style={revealStyle(visible, 80)}>
          Operating across continents, delivering precision everywhere.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14">
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${200 + i * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${200 + i * 80}ms`,
              }}
            >
              <p className="text-[44px] md:text-[56px] font-bold tracking-[-0.04em] text-[#1d1d1f] leading-none">{s.number}</p>
              <p className="text-[14px] text-[#86868b] mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12" style={revealStyle(visible, 500)}>
          <Link href="/about" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn about Koleex {">"}</Link>
        </div>
      </div>
    </section>
  );
}
