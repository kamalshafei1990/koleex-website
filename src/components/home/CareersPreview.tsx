"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   Section 8: Careers — Black bg. White text. Full-bleed team image.
   Apple dark hero pattern.
   --------------------------------------------------------------------------- */

export function CareersPreview() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="bg-black text-center overflow-hidden">
      <div className="pt-14 md:pt-20 px-6">
        <h2 className="text-[56px] md:text-[80px] font-semibold leading-[1.03] tracking-[-0.045em] text-white" style={revealStyle(visible, 0)}>
          Join Koleex.
        </h2>
        <p className="text-[19px] md:text-[28px] font-normal leading-[1.14] tracking-[-0.016em] text-[#86868b] mt-1.5" style={revealStyle(visible, 80)}>
          Build what&apos;s next. With people who care.
        </p>
        <div className="flex items-center justify-center gap-5 mt-4" style={revealStyle(visible, 160)}>
          <Link href="/careers" className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">View open positions {">"}</Link>
          <Link href="/about" className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">Our culture {">"}</Link>
        </div>
      </div>
      <div className="mt-4" style={revealStyle(visible, 240)}>
        <Image src="/images/team-office.jpg" alt="Koleex team" width={2560} height={1440} className="w-full h-auto block" />
      </div>
    </section>
  );
}
