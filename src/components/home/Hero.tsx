"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

/* ---------------------------------------------------------------------------
   Hero — Apple-style: white background, centered text,
   full-width product image on white/clean background.
   Buttons: black primary + black outline (no blue).
   --------------------------------------------------------------------------- */

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  const s = (delay: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
  });

  return (
    <section className="bg-white overflow-hidden">
      {/* Text */}
      <div className="text-center pt-16 md:pt-24 pb-6 md:pb-8 px-6 max-w-[980px] mx-auto">
        <h1
          className="text-[48px] sm:text-[64px] md:text-[80px] font-semibold leading-[1.04] tracking-[-0.045em] text-[#1d1d1f]"
          style={s(100)}
        >
          KX-9000 Series
        </h1>
        <p
          className="text-[21px] md:text-[28px] font-normal leading-[1.14] tracking-[-0.016em] text-[#6e6e73] mt-3"
          style={s(250)}
        >
          Precision in motion. Power in every axis.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6" style={s(400)}>
          <Button
            href="/products/industrial-technology"
            variant="primary"
            size="lg"
            className="!bg-[#1d1d1f] !text-white hover:!bg-[#000000] !h-[44px] !px-7 !text-[17px] !font-normal !rounded-full"
          >
            Learn more
          </Button>
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="!border-[#1d1d1f] !text-[#1d1d1f] hover:!bg-[#1d1d1f]/[0.05] !h-[44px] !px-7 !text-[17px] !font-normal !rounded-full"
          >
            Contact sales
          </Button>
        </div>
      </div>

      {/* Full-width product image on white background */}
      <div className="w-full bg-white" style={s(550)}>
        <Image
          src="/images/drone-white.jpg"
          alt="KX-9000 Series — Precision Robotic System"
          width={2560}
          height={1440}
          className="w-full h-auto block"
          priority
        />
      </div>
    </section>
  );
}
