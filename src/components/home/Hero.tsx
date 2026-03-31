"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

/* ---------------------------------------------------------------------------
   1. Hero — Apple-style: Light gray background, dark centered text,
   product-showcase image below. Clean, minimal, confident.
   Like iPhone/MacBook hero on Apple.com.
   --------------------------------------------------------------------------- */

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  /* Subtle parallax on the hero image */
  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const y = window.scrollY;
      imgRef.current.style.transform = `translateY(${y * 0.08}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const s = (delay: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
  });

  return (
    <section className="relative bg-[#f5f5f7] overflow-hidden">
      {/* Text content */}
      <div className="text-center pt-16 md:pt-24 pb-8 px-6 max-w-[980px] mx-auto">
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
            className="!bg-[#0066cc] !text-white hover:!bg-[#0077ed] !h-[44px] !px-7 !text-[17px] !font-normal !rounded-full"
          >
            Learn more
          </Button>
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="!border-[#0066cc] !text-[#0066cc] hover:!bg-[#0066cc]/[0.06] !h-[44px] !px-7 !text-[17px] !font-normal !rounded-full"
          >
            Contact sales
          </Button>
        </div>
      </div>

      {/* Hero product image — large, centered, Apple-style showcase */}
      <div
        ref={imgRef}
        className="relative w-full max-w-[980px] mx-auto will-change-transform"
        style={s(550)}
      >
        <Image
          src="/images/hero-robot.jpg"
          alt="KX-9000 Series — Precision Robotic System"
          width={1960}
          height={1100}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
    </section>
  );
}
