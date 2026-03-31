"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal, revealStyle, revealScaleStyle } from "@/lib/useScrollReveal";
import { Button } from "@/components/ui/Button";

/* ---------------------------------------------------------------------------
   8. Careers — Invitation to join, with team photo and CTA button.
   --------------------------------------------------------------------------- */

export function CareersPreview() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative bg-black py-32 md:py-44 section-accent-top hero-gradient-alt overflow-hidden">
      <div className="orb orb-silver w-[500px] h-[500px] top-10 left-1/3" style={{ animationDelay: "1s" }} />

      <div className="max-w-[1100px] mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-overline mb-4" style={revealStyle(visible, 0)}>Careers</p>
            <h2 className="text-display-sm text-gradient-hero" style={revealStyle(visible, 100)}>
              Build what&apos;s next.
            </h2>
            <p className="text-subtitle mt-6 !leading-[1.8]" style={revealStyle(visible, 200)}>
              Join engineers, scientists, and innovators working on problems
              that matter. We&apos;re hiring across all divisions worldwide.
            </p>
            <div className="flex gap-4 mt-10" style={revealStyle(visible, 350)}>
              <Button href="/careers" variant="primary" size="lg">
                View Open Positions
              </Button>
              <Button href="/about" variant="secondary" size="lg">
                Our Culture
              </Button>
            </div>
          </div>

          {/* Image */}
          <div style={revealScaleStyle(visible, 200)}>
            <div className="card-image overflow-hidden">
              <Image src="/images/team-office.jpg" alt="Koleex team" width={1200} height={800} className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
