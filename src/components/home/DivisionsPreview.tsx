"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal, revealStyle, revealScaleStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   DivisionsPreview — Product showcase: IoT Hub Pro.
   --------------------------------------------------------------------------- */

export function DivisionsPreview() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative bg-black text-center overflow-hidden section-accent-top hero-gradient">
      <div className="orb orb-white w-[500px] h-[500px] top-20 left-1/4" style={{ animationDelay: "4s" }} />
      <div className="orb orb-silver w-[350px] h-[350px] bottom-32 right-1/5" style={{ animationDelay: "7s" }} />

      <div className="relative z-10 pt-32 md:pt-44 px-6 max-w-[720px] mx-auto">
        <div style={revealStyle(visible, 0)}>
          <span className="text-overline">Digital Solutions</span>
        </div>
        <h2 className="text-display text-gradient-silver mt-5" style={revealStyle(visible, 120)}>
          IoT Hub Pro
        </h2>
        <p className="text-subtitle mt-7 !leading-[1.8]" style={revealStyle(visible, 240)}>
          Connected intelligence. Everywhere.
          50,000 devices. One platform. Zero compromise.
        </p>
        <div className="flex items-center justify-center gap-10 mt-8" style={revealStyle(visible, 360)}>
          <Link href="/products/digital-solutions" className="link-cta link-cta-dark">Learn more →</Link>
          <Link href="/contact" className="link-cta link-cta-dark">Contact sales →</Link>
        </div>
      </div>

      <div className="relative z-[5] mt-16 md:mt-20 w-full max-w-[1100px] mx-auto" style={revealScaleStyle(visible, 500)}>
        <div className="img-hero img-glow">
          <Image src="/images/digital-globe.jpg" alt="IoT Hub Pro" width={1920} height={1080} className="w-full h-auto object-cover" />
        </div>
      </div>
    </section>
  );
}
