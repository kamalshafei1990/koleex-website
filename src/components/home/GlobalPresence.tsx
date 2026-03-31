"use client";

import Link from "next/link";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   Section 6: Global Presence — White bg. Centered text.
   No fake metrics — clean brand statement instead.
   --------------------------------------------------------------------------- */

export function GlobalPresence() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="bg-white text-center py-20 md:py-28 overflow-hidden">
      <div className="max-w-[700px] mx-auto px-6">
        <h2 className="text-[48px] md:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
          Global reach.
        </h2>
        <p className="text-[19px] md:text-[21px] font-normal leading-[1.4] text-[#6e6e73] mt-3 max-w-lg mx-auto" style={revealStyle(visible, 80)}>
          Koleex serves customers across multiple regions, providing industrial technology, precision machinery, and automation solutions to key manufacturing markets worldwide.
        </p>
        <div className="mt-8" style={revealStyle(visible, 160)}>
          <Link href="/about/global-presence" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">
            Learn about our global presence {">"}
          </Link>
        </div>
      </div>
    </section>
  );
}
