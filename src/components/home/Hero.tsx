"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ---------------------------------------------------------------------------
   Section 1: Hero — Full-viewport. White bg. Centered text. Full-bleed image.
   Exactly like iPhone hero on Apple.com.
   --------------------------------------------------------------------------- */

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const s = (d: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms`,
  });

  return (
    <section className="bg-white text-center overflow-hidden">
      <div className="pt-14 md:pt-20 px-6">
        <h2 className="text-[56px] md:text-[80px] font-semibold leading-[1.03] tracking-[-0.045em] text-[#1d1d1f]" style={s(50)}>
          KX-9000 Series
        </h2>
        <p className="text-[19px] md:text-[28px] font-normal leading-[1.14] tracking-[-0.016em] text-[#6e6e73] mt-1.5" style={s(150)}>
          Precision in motion. Power in every axis.
        </p>
        <div className="flex items-center justify-center gap-5 mt-4" style={s(250)}>
          <Link href="/products/industrial-technology" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
          <Link href="/contact" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Contact sales {">"}</Link>
        </div>
      </div>
      <div className="mt-4" style={s(350)}>
        <Image src="/images/hero-robot.jpg" alt="KX-9000 Series" width={2560} height={1440} className="w-full h-auto block" priority />
      </div>
    </section>
  );
}
