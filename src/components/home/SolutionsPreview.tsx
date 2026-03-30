"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal, revealStyle, revealScaleStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   SolutionsPreview — Cinematic dark section with hero image card.
   --------------------------------------------------------------------------- */

export function SolutionsPreview() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative bg-black text-center overflow-hidden section-accent-top section-gradient-top">

      <div className="relative z-10 pt-32 md:pt-44 px-6 max-w-[720px] mx-auto">
        <div style={revealStyle(visible, 0)}>
          <span className="text-overline">Solutions</span>
        </div>
        <h2 className="text-display text-gradient-silver mt-5" style={revealStyle(visible, 120)}>
          Engineered for
          <br />your industry.
        </h2>
        <p className="text-subtitle mt-7 !leading-[1.8]" style={revealStyle(visible, 240)}>
          End-to-end solutions combining hardware, software, and services
          to solve real-world challenges at scale.
        </p>
        <div className="flex items-center justify-center gap-10 mt-8" style={revealStyle(visible, 360)}>
          <Link href="/solutions" className="link-cta link-cta-dark">Explore solutions →</Link>
        </div>
      </div>

      <div className="relative z-[5] mt-16 md:mt-20 max-w-[1100px] mx-auto px-4 sm:px-5 pb-4" style={revealScaleStyle(visible, 500)}>
        <div className="card-image overflow-hidden">
          <Image src="/images/factory-floor.jpg" alt="Smart manufacturing" width={1200} height={675} className="w-full h-auto object-cover" />
        </div>
      </div>
    </section>
  );
}
