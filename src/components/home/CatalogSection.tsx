"use client";

import Link from "next/link";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   Section 9: Catalog / Downloads — Light gray. Centered text. Simple links.
   Like Apple's Trade-In or Apple Card section — clean, minimal.
   --------------------------------------------------------------------------- */

export function CatalogSection() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="bg-[#f5f5f7] text-center py-16 md:py-24 overflow-hidden">
      <div className="max-w-[680px] mx-auto px-6">
        <h2 className="text-[48px] md:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
          Resources.
        </h2>
        <p className="text-[19px] md:text-[21px] font-normal leading-[1.24] text-[#6e6e73] mt-2" style={revealStyle(visible, 80)}>
          Download our product catalogs, company profile, and technology brochures.
        </p>
        <div className="flex items-center justify-center gap-5 mt-5" style={revealStyle(visible, 160)}>
          <Link href="/contact" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Product Catalog {">"}</Link>
          <Link href="/contact" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Company Profile {">"}</Link>
          <Link href="/contact" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Brochures {">"}</Link>
        </div>
      </div>
    </section>
  );
}
