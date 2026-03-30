"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal, revealStyle, revealScaleStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   CareersPreview — Cinematic dark section with team photo.
   --------------------------------------------------------------------------- */

export function CareersPreview() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative bg-black text-center overflow-hidden section-accent-top hero-gradient-alt">
      <div className="orb orb-silver w-[500px] h-[500px] top-10 left-1/3" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 pt-32 md:pt-44 px-6 max-w-[720px] mx-auto">
        <div style={revealStyle(visible, 0)}>
          <span className="text-overline">Careers</span>
        </div>
        <h2 className="text-display text-gradient-hero mt-5" style={revealStyle(visible, 120)}>
          Build what&apos;s next.
        </h2>
        <p className="text-subtitle mt-7 !leading-[1.8]" style={revealStyle(visible, 240)}>
          Join engineers and innovators working on problems that matter.
          We&apos;re hiring across all divisions worldwide.
        </p>
        <div className="flex items-center justify-center gap-10 mt-8" style={revealStyle(visible, 360)}>
          <Link href="/careers" className="link-cta link-cta-dark">View open positions →</Link>
          <Link href="/about" className="link-cta link-cta-dark">Our culture →</Link>
        </div>
      </div>

      <div className="relative z-[5] mt-16 md:mt-20 w-full max-w-[1100px] mx-auto" style={revealScaleStyle(visible, 500)}>
        <div className="img-hero">
          <Image src="/images/team-office.jpg" alt="Koleex team" width={1200} height={675} className="w-full h-auto object-cover" />
        </div>
      </div>
    </section>
  );
}
