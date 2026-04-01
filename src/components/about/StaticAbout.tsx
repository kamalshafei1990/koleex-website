"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   About Hub — Cinematic corporate story page.
   Full-screen hero + alternating dark/light sections with varied layouts.
   All 16 Figma sections preserved with improved visual hierarchy.
   --------------------------------------------------------------------------- */

const arrow = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-px"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/* ═══ 1. HERO — Full screen, animated ═══ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 35;
      orbRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const s = (d: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 1.1s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms, transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms`,
  });

  return (
    <section className="relative bg-black min-h-[calc(100vh-var(--header-height))] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.04) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(180,180,220,0.025) 0%, transparent 45%)",
      }} />
      <div ref={orbRef} className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-[2500ms] ease-out" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)", filter: "blur(80px)" }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={i % 5 === 0 ? "particle-glow" : "particle"} style={{ left: `${8 + (i * 4.3) % 85}%`, animationDuration: `${15 + (i * 2.8) % 18}s`, animationDelay: `${(i * 1.9) % 14}s` }} />
        ))}
      </div>

      <div className="relative z-10 px-6 max-w-[750px]">
        <div style={s(100)}>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-[11px] font-medium tracking-[0.04em] text-white/20 mb-10">
            Koleex International Group
          </span>
        </div>
        <h1 style={s(300)}>
          <span className="block text-[64px] md:text-[100px] lg:text-[120px] font-bold leading-[0.9] tracking-[-0.05em] text-gradient-hero">About</span>
          <span className="block text-[64px] md:text-[100px] lg:text-[120px] font-bold leading-[0.9] tracking-[-0.05em] text-gradient-silver mt-1">Koleex</span>
        </h1>
        <p className="text-[17px] md:text-[21px] font-light leading-[1.65] text-white/25 mt-10 max-w-[500px] mx-auto" style={s(520)}>
          Precision. Innovation. Partnership.
          <br />
          <span className="text-white/15">Building the future of industrial technology.</span>
        </p>

        {/* Stats strip */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mt-16" style={s(680)}>
          {[{ v: "4", l: "Divisions" }, { v: "6+", l: "Regions" }, { v: "24/7", l: "Support" }].map((stat, i) => (
            <div key={stat.l} className="text-center">
              {i > 0 && <div className="hidden" />}
              <p className="text-[28px] md:text-[36px] font-bold text-white/20 tracking-tight">{stat.v}</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-white/10 mt-1">{stat.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4" style={s(800)}>
        <span className="text-[9px] font-medium tracking-[0.25em] uppercase text-white/8">Scroll to explore</span>
        <div className="relative w-[1px] h-12">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
          <div className="absolute top-0 w-[1px] h-4 bg-white/20" style={{ animation: "scrollLine 2s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}

/* ═══ 2. CEO MESSAGE — Dark gradient, quote + photo ═══ */
function CEO() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="overflow-hidden" style={{ background: "linear-gradient(145deg, #080808 0%, #111111 40%, #1a1a1a 100%)" }}>
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        <div className="lg:w-[55%] flex items-center px-8 md:px-16 lg:px-20 py-20">
          <div className="max-w-[480px]">
            <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.04] tracking-[-0.04em] text-white" style={revealStyle(visible, 0)}>CEO Message</h2>
            <div className="w-12 h-[2px] bg-white/10 mt-6 mb-8" style={revealStyle(visible, 120)} />
            <p className="text-[15px] leading-[1.85] text-white/35" style={revealStyle(visible, 180)}>
              At Koleex International Group, every step we take is guided by a shared commitment to progress and excellence. We have grown from a family legacy into a global enterprise, but our core values remain unchanged: trust, innovation, and responsibility.
            </p>
            <p className="text-[15px] leading-[1.85] text-white/35 mt-5" style={revealStyle(visible, 260)}>
              Together, we are shaping the future of manufacturing.
            </p>
            <div className="mt-10" style={revealStyle(visible, 360)}>
              <Link href="/about/ceo-message" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/40 hover:text-white/70 transition-colors duration-300">Know more {arrow}</Link>
            </div>
          </div>
        </div>
        <div className="lg:w-[45%] overflow-hidden" style={revealStyle(visible, 100)}>
          <Image src="/images/team-office.jpg" alt="Leadership" width={1000} height={800} className="w-full h-full object-cover min-h-[400px] lg:min-h-[560px] grayscale opacity-60" />
        </div>
      </div>
    </section>
  );
}

/* ═══ 3. HISTORY — Full-bleed cinematic ═══ */
function History() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="relative min-h-[75vh] flex items-end overflow-hidden">
      <Image src="/images/factory-floor.jpg" alt="History" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-8 md:px-16 pb-20 md:pb-28">
        <h2 className="text-[40px] md:text-[64px] font-bold leading-[1.02] tracking-[-0.04em] text-white" style={revealStyle(visible, 0)}>
          History and Heritage
        </h2>
        <p className="text-[16px] leading-[1.7] text-white/40 mt-5 max-w-[480px]" style={revealStyle(visible, 140)}>
          From a family tradition to a global name — driven by integrity, precision, and a deep respect for the past that shapes our future.
        </p>
        <div className="mt-8" style={revealStyle(visible, 280)}>
          <Link href="/about/history" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/45 hover:text-white/80 transition-colors duration-300">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 4. VISION — Light bg, large statement text ═══ */
function Vision() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#f9f9f9] py-40 md:py-56 text-center overflow-hidden">
      <div className="max-w-[820px] mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#aeaeb2] mb-8" style={revealStyle(visible, 0)}>Vision & Mission</p>
        <h2 className="text-[34px] md:text-[56px] font-bold leading-[1.08] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 120)}>
          To shape a smarter industrial world by connecting innovation with human experience.
        </h2>
        <p className="text-[18px] md:text-[22px] font-light leading-[1.6] text-[#86868b] mt-8 max-w-[560px] mx-auto" style={revealStyle(visible, 240)}>
          Creating intelligent solutions that inspire, empower, and endure.
        </p>
        <div className="mx-auto mt-12 w-16 h-[2px] bg-[#1d1d1f]/20" style={revealStyle(visible, 360)} />
        <div className="mt-10" style={revealStyle(visible, 440)}>
          <Link href="/about/vision-mission" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 5. VALUES — Dark cards ═══ */
function Values() {
  const { ref, visible } = useScrollReveal(0.06);
  const items = [
    { t: "Global Perspective", d: "Thinking beyond borders to serve a connected world.", i: "⊕" },
    { t: "Smart Simplicity", d: "Intelligent systems that are clean and intuitive.", i: "◎" },
    { t: "Human Centered", d: "Every feature starts with people and their needs.", i: "◇" },
    { t: "Integrity & Trust", d: "Guided by transparency and long-term commitment.", i: "♡" },
    { t: "Legacy & Modernity", d: "Preserving heritage while building the future.", i: "□" },
    { t: "Innovation with Purpose", d: "Solving real problems with meaningful technology.", i: "△" },
  ];
  return (
    <section ref={ref} className="bg-white py-32 md:py-44 overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[36px] md:text-[52px] font-bold tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Core Values</h2>
          <div className="mx-auto mt-6 w-10 h-[2px] bg-[#1d1d1f]/20" style={revealStyle(visible, 80)} />
          <p className="text-[16px] text-[#86868b] mt-6 max-w-[420px] mx-auto leading-[1.6]" style={revealStyle(visible, 140)}>The principles that guide every decision at Koleex.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((v, i) => (
            <div key={v.t} className="bg-[#1d1d1f] rounded-[18px] p-7 hover:-translate-y-1 transition-transform duration-500" style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${200 + i * 50}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${200 + i * 50}ms`,
            }}>
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-[15px] font-semibold text-white leading-snug pr-2">{v.t}</h4>
                <span className="text-white/12 text-[20px] shrink-0">{v.i}</span>
              </div>
              <p className="text-[13px] leading-[1.6] text-white/22">{v.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12" style={revealStyle(visible, 550)}>
          <Link href="/about/values" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 6. STRUCTURE — Full-bleed ═══ */
function Structure() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="relative min-h-[65vh] flex items-end overflow-hidden">
      <Image src="/images/modern-office.jpg" alt="Corporate Structure" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-8 md:px-16 pb-16 md:pb-24">
        <h2 className="text-[36px] md:text-[56px] font-bold leading-[1.04] tracking-[-0.035em] text-white" style={revealStyle(visible, 0)}>Corporate Structure</h2>
        <p className="text-[15px] leading-[1.7] text-white/35 mt-4 max-w-[440px]" style={revealStyle(visible, 140)}>
          Defined leadership and clear responsibilities — empowering precision and agility across the organization.
        </p>
        <div className="mt-7" style={revealStyle(visible, 280)}>
          <Link href="/about/corporate-structure" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/40 hover:text-white/70 transition-colors duration-300">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 7. SEGMENTS — Image cards on light bg ═══ */
function Segments() {
  const { ref, visible } = useScrollReveal(0.06);
  const items = [
    { t: "Manufacturing & Production", img: "/images/factory-floor.jpg" },
    { t: "Smart Technologies & Software", img: "/images/circuit-board.jpg" },
    { t: "Global Trade & Distribution", img: "/images/composites.jpg" },
    { t: "Strategic Investment & Innovation", img: "/images/modern-office.jpg" },
  ];
  return (
    <section ref={ref} className="bg-[#f9f9f9] py-32 md:py-44 overflow-hidden">
      <div className="max-w-[1040px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[36px] md:text-[52px] font-bold tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Business Segments</h2>
          <div className="mx-auto mt-6 w-10 h-[2px] bg-[#1d1d1f]/20" style={revealStyle(visible, 80)} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map((s, i) => (
            <div key={s.t} className="group rounded-[14px] overflow-hidden bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-500" style={{
              opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.95)",
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${160 + i * 70}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${160 + i * 70}ms`,
            }}>
              <div className="aspect-[4/3] overflow-hidden">
                <Image src={s.img} alt={s.t} width={600} height={450} className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700" />
              </div>
              <div className="p-4"><h3 className="text-[12px] font-semibold text-[#1d1d1f]">{s.t}</h3></div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12" style={revealStyle(visible, 500)}>
          <Link href="/about/business-segments" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 8. TECHNOLOGY — Dark, text + glass cards ═══ */
function Technology() {
  const { ref, visible } = useScrollReveal(0.06);
  const features = ["Custom OS", "AI Machines", "Smart UI", "Modular Updates", "Data Production", "Predictive Maintenance", "IoT Integration"];
  return (
    <section ref={ref} className="bg-black py-36 md:py-48 overflow-hidden">
      <div className="max-w-[1040px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-[42%]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/15 mb-5" style={revealStyle(visible, 0)}>Technology & Innovation</p>
            <h2 className="text-[36px] md:text-[48px] font-bold leading-[1.06] tracking-[-0.035em] text-white" style={revealStyle(visible, 80)}>
              Driven by Innovation.<br />Powered by Technology.
            </h2>
            <p className="text-[15px] leading-[1.75] text-white/25 mt-6" style={revealStyle(visible, 180)}>
              Intelligent solutions that power machines, software, and systems for future-ready industrial performance.
            </p>
            <div className="mt-10" style={revealStyle(visible, 280)}>
              <Link href="/about/technology" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#2997ff] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
            </div>
          </div>
          <div className="lg:w-[58%] grid grid-cols-3 gap-2.5 content-start">
            {features.map((f, i) => (
              <div key={f} className="rounded-[12px] bg-white/[0.035] backdrop-blur-sm border border-white/[0.04] px-4 py-6 text-center hover:bg-white/[0.06] hover:border-white/[0.08] transition-all duration-400" style={{
                opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.9)",
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${220 + i * 40}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${220 + i * 40}ms`,
              }}>
                <p className="text-[12px] font-medium text-white/40">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ 9. STRATEGY — White, split with cards ═══ */
function Strategy() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[460px]">
        <div className="lg:w-[45%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src="/images/modern-office.jpg" alt="Market Strategy" width={1000} height={800} className="w-full h-full object-cover min-h-[280px] lg:min-h-[460px]" />
        </div>
        <div className="lg:w-[55%] flex items-center px-8 md:px-14 lg:px-16 py-14">
          <div>
            <h2 className="text-[36px] md:text-[48px] font-bold tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 100)}>Market Strategy</h2>
            <p className="text-[15px] leading-[1.7] text-[#86868b] mt-4 max-w-[420px]" style={revealStyle(visible, 200)}>
              We move with strategy, not chance — understanding markets, shaping demands, and leading with innovation.
            </p>
            <div className="grid grid-cols-2 gap-2.5 mt-8">
              {["Market Research", "Strategy Design", "Channel Activation", "Performance"].map((c, i) => (
                <div key={c} className="bg-[#1d1d1f] rounded-[12px] px-4 py-4" style={{
                  opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${300 + i * 50}ms`,
                }}><p className="text-[12px] font-semibold text-white">{c}</p></div>
              ))}
            </div>
            <div className="mt-8" style={revealStyle(visible, 520)}>
              <Link href="/about/future-outlook" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ 10. RESPONSIBILITY — Full-bleed ═══ */
function Responsibility() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="relative min-h-[65vh] flex items-end overflow-hidden">
      <Image src="/images/wind-turbines.jpg" alt="Social Responsibility" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-8 md:px-16 pb-16 md:pb-24">
        <h2 className="text-[36px] md:text-[56px] font-bold leading-[1.04] tracking-[-0.035em] text-white" style={revealStyle(visible, 0)}>Social Responsibility</h2>
        <p className="text-[15px] leading-[1.7] text-white/35 mt-4 max-w-[440px]" style={revealStyle(visible, 140)}>
          Creating impact beyond industry — promoting fairness, education, and community empowerment.
        </p>
        <div className="mt-7" style={revealStyle(visible, 280)}>
          <Link href="/about/sustainability" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/40 hover:text-white/70 transition-colors duration-300">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 11. BRANDS — Dark, image + brand grid ═══ */
function Brands() {
  const { ref, visible } = useScrollReveal(0.06);
  const brands = ["KOLEEX", "Xiatang", "NEXO", "OSTA", "Kalia House", "KTEC", "DIMTEX", "Teramac", "Lexi", "CTC", "ENZO", "El Barto Group"];
  return (
    <section ref={ref} className="bg-[#0a0a0a] overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[500px]">
        <div className="lg:w-[40%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src="/images/team-office.jpg" alt="Brands" width={1000} height={800} className="w-full h-full object-cover min-h-[300px] lg:min-h-[500px]" />
        </div>
        <div className="lg:w-[60%] flex items-center px-8 md:px-14 lg:px-16 py-14">
          <div>
            <h2 className="text-[36px] md:text-[48px] font-bold tracking-[-0.035em] text-white leading-tight" style={revealStyle(visible, 80)}>
              Koleex Group<br />Brands & Divisions
            </h2>
            <p className="text-[14px] leading-[1.7] text-white/25 mt-4 max-w-[420px]" style={revealStyle(visible, 180)}>
              Leading companies and brands united under one vision. Each represents Koleex growth, innovation, and trusted global presence.
            </p>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-8">
              {brands.map((b, i) => (
                <div key={b} className="bg-white/[0.03] border border-white/[0.05] rounded-[10px] px-3 py-3 text-center hover:bg-white/[0.06] transition-colors duration-300" style={{
                  opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${260 + i * 25}ms`,
                }}><p className="text-[9px] font-semibold text-white/30 tracking-wide">{b}</p></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ 12. GLOBAL — Full-bleed globe ═══ */
function GlobalPresence() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden">
      <Image src="/images/digital-globe.jpg" alt="Global Presence" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 max-w-[640px] px-6 py-24">
        <h2 className="text-[40px] md:text-[64px] font-bold leading-[1.02] tracking-[-0.04em] text-white" style={revealStyle(visible, 0)}>Global Presence</h2>
        <p className="text-[16px] leading-[1.65] text-white/35 mt-5" style={revealStyle(visible, 140)}>
          Strong partnerships across the world&apos;s leading industrial markets.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-10">
          {["Americas", "Europe", "Middle East", "South Asia", "China", "Africa"].map((r, i) => (
            <span key={r} className="px-4 py-1.5 text-[11px] font-medium text-white/35 border border-white/[0.06] rounded-full" style={{
              opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${280 + i * 40}ms`,
            }}>{r}</span>
          ))}
        </div>
        <div className="mt-10" style={revealStyle(visible, 540)}>
          <Link href="/about/global-presence" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/45 hover:text-white/80 transition-colors duration-300">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 13. PRODUCTION — Text + photo mosaic ═══ */
function Production() {
  const { ref, visible } = useScrollReveal(0.06);
  const images = ["/images/factory-floor.jpg", "/images/hero-robot.jpg", "/images/circuit-board.jpg", "/images/composites.jpg", "/images/materials-lab.jpg", "/images/server-room.jpg"];
  return (
    <section ref={ref} className="bg-white py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-[32%] lg:sticky lg:top-32">
            <h2 className="text-[36px] md:text-[48px] font-bold tracking-[-0.035em] text-[#1d1d1f] leading-tight" style={revealStyle(visible, 0)}>
              Production Strength
            </h2>
            <p className="text-[14px] leading-[1.75] text-[#86868b] mt-5" style={revealStyle(visible, 140)}>
              Advanced technology and strict quality controls ensuring every product meets international standards of excellence.
            </p>
            <div className="mt-8" style={revealStyle(visible, 280)}>
              <Link href="/products" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
            </div>
          </div>
          <div className="lg:w-[68%] grid grid-cols-3 gap-2.5">
            {images.map((img, i) => (
              <div key={img} className="group aspect-square rounded-[10px] overflow-hidden" style={{
                opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.93)",
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${220 + i * 50}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${220 + i * 50}ms`,
              }}>
                <Image src={img} alt="Production" width={400} height={400} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ 14. FUTURE — Large statement ═══ */
function Future() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#f9f9f9] py-44 md:py-56 text-center overflow-hidden">
      <div className="max-w-[720px] mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#aeaeb2] mb-8" style={revealStyle(visible, 0)}>Future Outlook</p>
        <h2 className="text-[40px] md:text-[64px] font-bold leading-[1.04] tracking-[-0.04em] text-[#1d1d1f]" style={revealStyle(visible, 120)}>
          The next chapter begins now.
        </h2>
        <p className="text-[18px] md:text-[22px] font-light leading-[1.6] text-[#86868b] mt-8" style={revealStyle(visible, 260)}>
          Manufacturing innovation. Digital integration.<br className="hidden md:block" /> Regional expansion. Customer excellence.
        </p>
        <div className="mx-auto mt-12 w-14 h-[2px] bg-[#1d1d1f]/20" style={revealStyle(visible, 380)} />
        <div className="mt-10" style={revealStyle(visible, 440)}>
          <Link href="/about/future-outlook" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 15. PARTNERS — Dark, 2 grids ═══ */
function Partners() {
  const { ref, visible } = useScrollReveal(0.06);
  const partners = ["Feiyue", "BOTE", "Dulipu", "Butterfly", "Linjian", "XYO", "Paradyne", "Synaptic", "Siasun", "Dahua", "Venturis", "Haodi"];
  const clients = ["Xurue", "Dxing", "Duma", "Fujian", "Dober", "Omron", "Siemens", "Schneider", "Odoo", "Finzen", "Jinzen", "Hikari"];
  return (
    <section ref={ref} className="bg-[#050505] py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h3 className="text-[28px] md:text-[36px] font-bold text-white leading-tight" style={revealStyle(visible, 0)}>
              United by Investment.<br />Strengthened by Partnership.
            </h3>
            <div className="grid grid-cols-3 gap-2 mt-10">
              {partners.map((p, i) => (
                <div key={p} className="bg-white/[0.03] border border-white/[0.04] rounded-[10px] px-3 py-3.5 text-center" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.3s ease ${240 + i * 20}ms` }}>
                  <p className="text-[10px] font-medium text-white/28">{p}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[28px] md:text-[36px] font-bold text-white leading-tight" style={revealStyle(visible, 100)}>
              Trusted Partners.<br />Driven by Excellence.
            </h3>
            <div className="grid grid-cols-4 gap-2 mt-10">
              {clients.map((c, i) => (
                <div key={c} className="bg-white/[0.03] border border-white/[0.04] rounded-[8px] px-2 py-3 text-center" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.3s ease ${340 + i * 18}ms` }}>
                  <p className="text-[9px] font-medium text-white/25">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ 16. CTA ═══ */
function CTA() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-white text-center py-28 md:py-36">
      <div className="max-w-[500px] mx-auto px-6">
        <h2 className="text-[32px] md:text-[44px] font-bold tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Want to work with us?</h2>
        <div className="flex items-center justify-center gap-7 mt-7" style={revealStyle(visible, 120)}>
          <Link href="/contact" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Contact {">"}</Link>
          <Link href="/careers" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Careers {">"}</Link>
          <Link href="/products" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Products {">"}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ PAGE ═══ */
export function StaticAbout() {
  return (
    <>
      <Hero />
      <CEO />
      <History />
      <Vision />
      <Values />
      <Structure />
      <Segments />
      <Technology />
      <Strategy />
      <Responsibility />
      <Brands />
      <GlobalPresence />
      <Production />
      <Future />
      <Partners />
      <CTA />
    </>
  );
}
