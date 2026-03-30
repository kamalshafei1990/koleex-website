"use client";

import Link from "next/link";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   ContactCTA — Final CTA with generous spacing and cinematic feel.
   --------------------------------------------------------------------------- */

export function ContactCTA() {
  const { ref, visible } = useScrollReveal(0.15);

  return (
    <section ref={ref} className="relative bg-black text-center py-32 md:py-44 section-accent-top section-gradient-top">
      <div className="orb orb-white w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-[620px] mx-auto px-6">
        <h2 className="text-headline text-gradient-hero" style={revealStyle(visible, 0)}>
          Ready to get started?
        </h2>
        <p className="text-subtitle mt-5 !leading-[1.8]" style={revealStyle(visible, 150)}>
          Talk to a specialist about solutions for your business.
        </p>
        <div className="flex items-center justify-center gap-10 mt-9" style={revealStyle(visible, 300)}>
          <Link href="/contact" className="link-cta link-cta-dark">Contact us →</Link>
          <Link href="/products" className="link-cta link-cta-dark">Explore products →</Link>
        </div>
      </div>
    </section>
  );
}
