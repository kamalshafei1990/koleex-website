"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------------------
   Hero — Cinematic full-viewport hero.
   Multi-layer ambient lighting, particles, parallax, staggered reveal.
   --------------------------------------------------------------------------- */

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className={i % 4 === 0 ? "particle-glow" : "particle"}
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${14 + Math.random() * 22}s`,
            animationDelay: `${Math.random() * 18}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const y = window.scrollY;
      imgRef.current.style.transform = `translateY(${y * 0.12}px) scale(${1 + y * 0.00008})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const s = (delay: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(36px)",
    transition: `opacity 1s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 1s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
  });

  return (
    <section className="relative bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient">
      <Particles />

      {/* Ambient orbs — multi-layered */}
      <div className="orb orb-silver w-[700px] h-[700px] -top-48 left-1/2 -translate-x-1/2" />
      <div className="orb orb-white w-[500px] h-[500px] bottom-10 -right-48" style={{ animationDelay: "3s" }} />
      <div className="orb orb-warm w-[400px] h-[400px] -bottom-20 -left-40" style={{ animationDelay: "6s" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[800px] mx-auto">
        <div style={s(150)}>
          <span className="badge-pill mb-10 inline-flex">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Koleex International Group
          </span>
        </div>

        <h1 className="text-display-xl text-gradient-hero" style={s(350)}>
          Engineering
          <br />
          What Matters
        </h1>

        <p className="text-subtitle mt-8 max-w-[540px] mx-auto !leading-[1.75]" style={s(550)}>
          Precision-engineered products, intelligent digital solutions,
          and advanced materials — delivered to customers in over 80 countries.
        </p>

        <div className="flex items-center justify-center gap-10 mt-9" style={s(700)}>
          <Link href="/products" className="link-cta link-cta-dark">
            Explore products →
          </Link>
          <Link href="/about" className="link-cta link-cta-dark">
            Learn more →
          </Link>
        </div>
      </div>

      {/* Hero image — parallax */}
      <div
        ref={imgRef}
        className="relative z-[5] mt-16 w-full max-w-[1100px] mx-auto will-change-transform"
        style={s(900)}
      >
        <div className="img-hero img-glow">
          <Image
            src="/images/hero-robot.jpg"
            alt="KX-9000 Series"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        style={s(1100)}
      >
        <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/20">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20" style={{ animation: "bounce 2.5s infinite" }}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
