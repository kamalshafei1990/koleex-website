"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal, revealStyle, revealScaleStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   BrandIntro — Product showcase: SolarMax Ultra.
   Cinematic dark section with ambient glow, generous spacing.
   --------------------------------------------------------------------------- */

export function BrandIntro() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative bg-black text-center overflow-hidden section-accent-top hero-gradient-alt">
      <div className="orb orb-silver w-[600px] h-[600px] top-0 right-1/4" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 pt-32 md:pt-44 px-6 max-w-[720px] mx-auto">
        <div style={revealStyle(visible, 0)}>
          <span className="text-overline">Energy Systems</span>
        </div>
        <h2 className="text-display text-gradient-silver mt-5" style={revealStyle(visible, 120)}>
          SolarMax Ultra
        </h2>
        <p className="text-subtitle mt-7 !leading-[1.8]" style={revealStyle(visible, 240)}>
          Next-generation energy. Limitless potential.
          The most advanced solar platform we&apos;ve ever built.
        </p>
        <div className="flex items-center justify-center gap-10 mt-8" style={revealStyle(visible, 360)}>
          <Link href="/products/energy-systems" className="link-cta link-cta-dark">Learn more →</Link>
          <Link href="/contact" className="link-cta link-cta-dark">Contact sales →</Link>
        </div>
      </div>

      <div className="relative z-[5] mt-16 md:mt-20 w-full max-w-[1100px] mx-auto" style={revealScaleStyle(visible, 500)}>
        <div className="img-hero img-glow">
          <Image src="/images/solar-panels.jpg" alt="SolarMax Ultra" width={1920} height={1080} className="w-full h-auto object-cover" />
        </div>
      </div>
    </section>
  );
}
