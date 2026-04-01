"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   About Hub v3 — Cinematic storytelling page.
   Taller hero, shorter sections, more layout variety, bigger spacing.
   --------------------------------------------------------------------------- */

const arrow = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-px"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/* ═══════════════════════════════════════════════════════════
   HERO — Full viewport, animated, cinematic
   ═══════════════════════════════════════════════════════════ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);

  // Subtle mouse-follow on orb
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      orbRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const s = (d: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 1.1s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms, transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms`,
  });

  return (
    <section className="relative bg-black min-h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Multi-layer ambient glow */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.05) 0%, transparent 55%),
          radial-gradient(ellipse at 15% 75%, rgba(180,180,220,0.03) 0%, transparent 45%),
          radial-gradient(ellipse at 85% 25%, rgba(200,200,200,0.02) 0%, transparent 40%)
        `,
      }} />

      {/* Mouse-following orb */}
      <div
        ref={orbRef}
        className="absolute w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-[2000ms] ease-out"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 65%)", filter: "blur(60px)" }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className={i % 6 === 0 ? "particle-glow" : "particle"}
            style={{
              left: `${8 + (i * 3.7) % 85}%`,
              animationDuration: `${14 + (i * 2.9) % 20}s`,
              animationDelay: `${(i * 1.7) % 14}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 max-w-[720px]">
        <div style={s(100)}>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-[11px] font-medium tracking-[0.04em] text-white/25 mb-10">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Koleex International Group
          </span>
        </div>

        <h1 style={s(300)}>
          <span className="block text-[72px] md:text-[112px] lg:text-[130px] font-bold leading-[0.88] tracking-[-0.06em] text-gradient-hero">
            About
          </span>
          <span className="block text-[72px] md:text-[112px] lg:text-[130px] font-bold leading-[0.88] tracking-[-0.06em] text-gradient-silver mt-1">
            Koleex
          </span>
        </h1>

        <p className="text-[17px] md:text-[21px] font-light leading-[1.6] text-white/30 mt-10 max-w-[480px] mx-auto" style={s(500)}>
          Precision. Innovation. Partnership.
          <br />
          Building the future of industrial technology.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={s(750)}>
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/12">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/15 to-transparent" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPACT SPLIT — Image + short text + Know More
   ═══════════════════════════════════════════════════════════ */
function Split({ image, title, summary, href, flip = false, bg = "white" }: {
  image: string; title: string; summary: string; href: string; flip?: boolean; bg?: "white" | "gray";
}) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className={`${bg === "gray" ? "bg-[#f5f5f7]" : "bg-white"} overflow-hidden`}>
      <div className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} min-h-[380px] md:min-h-[420px]`}>
        <div className="lg:w-[52%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src={image} alt={title} width={1200} height={800} className="w-full h-full object-cover min-h-[240px] lg:min-h-[420px]" />
        </div>
        <div className="lg:w-[48%] flex items-center px-8 md:px-14 lg:px-16 py-12 lg:py-0">
          <div className="max-w-[380px]">
            <h2 className="text-[30px] md:text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 100)}>
              {title}
            </h2>
            <p className="text-[15px] leading-[1.65] text-[#86868b] mt-3" style={revealStyle(visible, 200)}>
              {summary}
            </p>
            <div className="mt-6" style={revealStyle(visible, 300)}>
              <Link href={href} className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">
                Know more {arrow}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   VISION — Full-bleed overlay, cinematic
   ═══════════════════════════════════════════════════════════ */
function Vision() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="relative min-h-[480px] flex items-center overflow-hidden">
      <Image src="/images/digital-globe.jpg" alt="Vision" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 max-w-[600px] mx-auto px-6 py-24 md:py-32 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/25 mb-5" style={revealStyle(visible, 0)}>Vision & Mission</p>
        <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.08] tracking-[-0.03em] text-white" style={revealStyle(visible, 100)}>
          To shape a smarter industrial world.
        </h2>
        <p className="text-[15px] leading-[1.65] text-white/35 mt-4" style={revealStyle(visible, 200)}>
          Fusing innovation with heritage to deliver intelligent tools that shape progress across generations.
        </p>
        <div className="mt-7" style={revealStyle(visible, 300)}>
          <Link href="/about/vision-mission" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#2997ff] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   VALUES — Compact dark cards
   ═══════════════════════════════════════════════════════════ */
function Values() {
  const { ref, visible } = useScrollReveal(0.06);
  const items = [
    { t: "Global Perspective", i: "⊕" }, { t: "Smart Simplicity", i: "◎" }, { t: "Human Centered", i: "◇" },
    { t: "Integrity & Trust", i: "♡" }, { t: "Legacy & Modernity", i: "□" }, { t: "Innovation with Purpose", i: "△" },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[32px] md:text-[44px] font-bold tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Core Values</h2>
          <p className="text-[15px] text-[#86868b] mt-2" style={revealStyle(visible, 60)}>The principles behind every decision.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((v, i) => (
            <div key={v.t} className="bg-[#1d1d1f] rounded-[16px] p-5 hover:-translate-y-0.5 transition-transform duration-500" style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${120 + i * 40}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${120 + i * 40}ms`,
            }}>
              <div className="flex justify-between mb-2">
                <h4 className="text-[13px] font-semibold text-white">{v.t}</h4>
                <span className="text-white/12 text-[16px]">{v.i}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8" style={revealStyle(visible, 400)}>
          <Link href="/about/values" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SEGMENTS — Compact image cards
   ═══════════════════════════════════════════════════════════ */
function Segments() {
  const { ref, visible } = useScrollReveal(0.06);
  const items = [
    { t: "Manufacturing", img: "/images/factory-floor.jpg" },
    { t: "Smart Technologies", img: "/images/circuit-board.jpg" },
    { t: "Global Trade", img: "/images/composites.jpg" },
    { t: "Strategic Investment", img: "/images/modern-office.jpg" },
  ];
  return (
    <section ref={ref} className="bg-[#f5f5f7] py-24 md:py-32 overflow-hidden">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[32px] md:text-[44px] font-bold tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Business Segments</h2>
          <p className="text-[15px] text-[#86868b] mt-2" style={revealStyle(visible, 60)}>Four pillars driving industrial innovation.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map((s, i) => (
            <div key={s.t} className="group rounded-[14px] overflow-hidden bg-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-500" style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${120 + i * 60}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${120 + i * 60}ms`,
            }}>
              <div className="h-[120px] md:h-[140px] overflow-hidden">
                <Image src={s.img} alt={s.t} width={600} height={400} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="p-4">
                <h3 className="text-[13px] font-semibold text-[#1d1d1f]">{s.t}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8" style={revealStyle(visible, 400)}>
          <Link href="/about/business-segments" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   GLOBAL — Stats-style
   ═══════════════════════════════════════════════════════════ */
function Global() {
  const { ref, visible } = useScrollReveal(0.1);
  const regions = ["Americas", "Europe", "Middle East", "South Asia", "China", "Africa"];
  return (
    <section ref={ref} className="bg-white py-24 md:py-32 text-center overflow-hidden">
      <div className="max-w-[700px] mx-auto px-6">
        <h2 className="text-[32px] md:text-[44px] font-bold tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Global Presence</h2>
        <p className="text-[15px] text-[#86868b] mt-2" style={revealStyle(visible, 60)}>Strong partnerships across industrial markets worldwide.</p>
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {regions.map((r, i) => (
            <span key={r} className="px-4 py-2 text-[12px] font-medium text-[#6e6e73] bg-[#f5f5f7] rounded-full" style={{
              opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${200 + i * 50}ms`,
            }}>{r}</span>
          ))}
        </div>
        <div className="mt-8" style={revealStyle(visible, 500)}>
          <Link href="/about/global-presence" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CEO — Quote block
   ═══════════════════════════════════════════════════════════ */
function CEO() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#111] py-24 md:py-32 overflow-hidden">
      <div className="max-w-[680px] mx-auto px-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/18 mb-8" style={revealStyle(visible, 0)}>CEO Message</p>
        <blockquote className="text-[24px] md:text-[34px] font-semibold leading-[1.3] tracking-[-0.02em] text-white/70 italic" style={revealStyle(visible, 120)}>
          &ldquo;We are shaping the future of manufacturing — with trust, innovation, and responsibility at the core.&rdquo;
        </blockquote>
        <p className="text-[13px] text-white/20 mt-6" style={revealStyle(visible, 240)}>— The Leadership Team</p>
        <div className="mt-8" style={revealStyle(visible, 340)}>
          <Link href="/about/ceo-message" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#2997ff] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FUTURE — Large text statement
   ═══════════════════════════════════════════════════════════ */
function Future() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-white py-28 md:py-36 text-center overflow-hidden">
      <div className="max-w-[700px] mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86868b] mb-5" style={revealStyle(visible, 0)}>Future Outlook</p>
        <h2 className="text-[36px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 100)}>
          The next chapter begins now.
        </h2>
        <p className="text-[16px] leading-[1.65] text-[#86868b] mt-5" style={revealStyle(visible, 200)}>
          Manufacturing innovation. Digital integration. Regional expansion. Customer excellence.
        </p>
        <div className="mt-8" style={revealStyle(visible, 300)}>
          <Link href="/about/future-outlook" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════════════════ */
function CTA() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#f5f5f7] text-center py-24 md:py-32">
      <div className="max-w-[500px] mx-auto px-6">
        <h2 className="text-[28px] md:text-[38px] font-bold tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
          Want to work with us?
        </h2>
        <div className="flex items-center justify-center gap-7 mt-6" style={revealStyle(visible, 100)}>
          <Link href="/contact" className="text-[15px] text-[#0066cc] hover:underline underline-offset-[3px]">Contact {">"}</Link>
          <Link href="/careers" className="text-[15px] text-[#0066cc] hover:underline underline-offset-[3px]">Careers {">"}</Link>
          <Link href="/products" className="text-[15px] text-[#0066cc] hover:underline underline-offset-[3px]">Products {">"}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ PAGE ═══ */
export default function AboutPage() {
  return (
    <>
      <Hero />

      <Split image="/images/factory-floor.jpg" title="Company Overview" summary="A technology-driven industrial company focused on precision machinery, automation, and integrated manufacturing solutions." href="/about" />

      <Split image="/images/solar-panels.jpg" title="History & Heritage" summary="From a family tradition to a global name — driven by integrity, precision, and respect for the past." href="/about/history" flip bg="gray" />

      <Vision />

      <Values />

      <Split image="/images/modern-office.jpg" title="Corporate Structure" summary="Defined leadership and clear responsibilities — empowering teams to operate with precision." href="/about/corporate-structure" bg="gray" />

      <Segments />

      <Split image="/images/circuit-board.jpg" title="Technology & Innovation" summary="Intelligent solutions powering machines, software, and systems for future-ready performance." href="/about/technology" flip />

      <Global />

      <Split image="/images/wind-turbines.jpg" title="Sustainability" summary="Creating impact beyond industry — fairness, education, and community empowerment." href="/about/sustainability" bg="gray" />

      <CEO />

      <Future />

      <CTA />
    </>
  );
}
