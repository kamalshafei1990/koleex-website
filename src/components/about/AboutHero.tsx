"use client";

import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   AboutHero — Reusable hero for About sub-pages.
   Centered text on black, matching Figma design pattern.
   --------------------------------------------------------------------------- */

interface AboutHeroProps {
  title: string;
  subtitle: string;
}

export function AboutHero({ title, subtitle }: AboutHeroProps) {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="bg-black text-center pt-16 md:pt-24 pb-12 md:pb-16 overflow-hidden">
      <div className="max-w-[800px] mx-auto px-6">
        <h1 className="text-[48px] md:text-[72px] font-semibold leading-[1.04] tracking-[-0.045em] text-white" style={revealStyle(visible, 0)}>
          {title}
        </h1>
        <p className="text-[19px] md:text-[24px] font-normal leading-[1.3] tracking-[-0.01em] text-[#86868b] mt-4" style={revealStyle(visible, 100)}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
