"use client";

import Link from "next/link";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   Section 10: Contact CTA — White bg. Centered text. Blue links.
   Apple's final call-to-action style — simple, clean, confident.
   --------------------------------------------------------------------------- */

export function ContactCTA() {
  const { ref, visible } = useScrollReveal(0.15);

  return (
    <section ref={ref} className="bg-white text-center py-16 md:py-24 overflow-hidden">
      <div className="max-w-[680px] mx-auto px-6">
        <h2 className="text-[48px] md:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
          Get in touch.
        </h2>
        <p className="text-[19px] md:text-[21px] font-normal leading-[1.24] text-[#6e6e73] mt-2" style={revealStyle(visible, 80)}>
          Talk to a specialist about solutions for your business.
        </p>
        <div className="flex items-center justify-center gap-5 mt-5" style={revealStyle(visible, 160)}>
          <Link href="/contact" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Contact us {">"}</Link>
          <Link href="/contact" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Become a partner {">"}</Link>
          <Link href="/contact" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Request quotation {">"}</Link>
        </div>
      </div>
    </section>
  );
}
