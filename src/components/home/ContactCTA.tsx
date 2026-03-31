"use client";

import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";
import { Button } from "@/components/ui/Button";

/* ---------------------------------------------------------------------------
   10. Contact / CTA — Large call-to-action with multiple buttons.
   --------------------------------------------------------------------------- */

export function ContactCTA() {
  const { ref, visible } = useScrollReveal(0.15);

  return (
    <section ref={ref} className="relative bg-black text-center py-32 md:py-44 section-accent-top section-gradient-top overflow-hidden">
      <div className="orb orb-white w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-[700px] mx-auto px-6">
        <p className="text-overline mb-4" style={revealStyle(visible, 0)}>Get in Touch</p>
        <h2 className="text-display-sm text-gradient-hero" style={revealStyle(visible, 100)}>
          Ready to transform
          <br />your operations?
        </h2>
        <p className="text-subtitle mt-6 !leading-[1.8]" style={revealStyle(visible, 200)}>
          Connect with our team to discuss solutions, request a quotation,
          or explore partnership opportunities.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10" style={revealStyle(visible, 350)}>
          <Button href="/contact" variant="primary" size="lg">
            Contact Us
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Become a Partner
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Request Quotation
          </Button>
        </div>
      </div>
    </section>
  );
}
