"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   Section 2: Second hero — White bg. Centered text. Full-bleed image.
   Like MacBook section on Apple.com.
   --------------------------------------------------------------------------- */

export function BrandIntro() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="bg-white text-center overflow-hidden">
      <div className="pt-14 md:pt-20 px-6">
        <h2 className="text-[56px] md:text-[80px] font-semibold leading-[1.03] tracking-[-0.045em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
          SolarMax Ultra
        </h2>
        <p className="text-[19px] md:text-[28px] font-normal leading-[1.14] tracking-[-0.016em] text-[#6e6e73] mt-1.5" style={revealStyle(visible, 80)}>
          Next-generation energy. Limitless potential.
        </p>
        <div className="flex items-center justify-center gap-5 mt-4" style={revealStyle(visible, 160)}>
          <Link href="/products/energy-systems" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
          <Link href="/contact" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Contact sales {">"}</Link>
        </div>
      </div>
      <div className="mt-4" style={revealStyle(visible, 240)}>
        <Image src="/images/solar-panels.jpg" alt="SolarMax Ultra" width={2560} height={1440} className="w-full h-auto block" />
      </div>
    </section>
  );
}
