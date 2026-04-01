"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   About Hub — Honor.com/brand inspired layout.
   Patterns: centered titles with line, dark stats section, full-bleed images
   with overlay text, masonry grids, scroll-triggered reveals.
   --------------------------------------------------------------------------- */

const arrow = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-px"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/* ═══ 1. TITLE — Light bg, centered heading with decorative line ═══ */
function TitleSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);
  const s = (d: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms`,
  });

  return (
    <section className="bg-[#f9f9f9] flex items-center justify-center text-center py-32 md:py-44">
      <div className="px-6">
        <h1 className="text-[44px] md:text-[64px] lg:text-[80px] font-bold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]" style={s(100)}>
          ABOUT KOLEEX
        </h1>
        <div className="mx-auto mt-6 w-16 h-[2px] bg-[#1d1d1f]" style={s(300)} />
      </div>
    </section>
  );
}

/* ═══ 2. DARK STATS — Black bg, centered text + horizontal stats row ═══ */
function StatsSection() {
  const { ref, visible } = useScrollReveal(0.1);
  const stats = [
    { value: "4", label: "Business Segments" },
    { value: "6+", label: "Global Regions" },
    { value: "24/7", label: "Customer Support" },
    { value: "—", label: "Growing Network" },
    { value: "—", label: "Innovation Pipeline" },
  ];

  return (
    <section ref={ref} className="bg-black py-28 md:py-40 text-center overflow-hidden">
      <div className="max-w-[900px] mx-auto px-6">
        <h2 className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-[-0.02em] text-white" style={revealStyle(visible, 0)}>
          A global industrial technology company built on precision, innovation, and long-term partnerships.
        </h2>
        <p className="text-[15px] leading-[1.7] text-white/35 mt-6 max-w-[600px] mx-auto" style={revealStyle(visible, 120)}>
          Koleex International Group delivers machinery, automation systems, and technology-driven solutions to manufacturing sectors worldwide.
        </p>

        {/* Stats row with dividers */}
        <div className="flex items-center justify-center flex-wrap mt-16 gap-y-8">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center" style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${250 + i * 80}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${250 + i * 80}ms`,
            }}>
              {i > 0 && <div className="w-px h-10 bg-white/10 mx-8 hidden md:block" />}
              <div className="text-center px-4">
                <p className="text-[36px] md:text-[48px] font-bold tracking-[-0.03em] text-white leading-none">{s.value}</p>
                <p className="text-[11px] md:text-[12px] text-white/30 mt-2 uppercase tracking-[0.06em]">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ 3. FULL-BLEED IMAGE with overlay text — History ═══ */
function HistoryHero() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-end overflow-hidden">
      <Image src="/images/factory-floor.jpg" alt="History" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative z-10 max-w-[800px] px-8 md:px-16 pb-16 md:pb-24">
        <h2 className="text-[36px] md:text-[56px] font-bold leading-[1.06] tracking-[-0.03em] text-white" style={revealStyle(visible, 0)}>
          History & Heritage
        </h2>
        <p className="text-[15px] md:text-[17px] leading-[1.65] text-white/50 mt-4 max-w-[500px]" style={revealStyle(visible, 120)}>
          From a family tradition to a global name — driven by integrity, precision, and respect for the past.
        </p>
        <div className="mt-6" style={revealStyle(visible, 240)}>
          <Link href="/about/history" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/70 hover:text-white transition-colors duration-300">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 4. LIGHT CENTERED — Vision ═══ */
function VisionCentered() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#f9f9f9] py-28 md:py-40 text-center overflow-hidden">
      <div className="max-w-[720px] mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86868b] mb-5" style={revealStyle(visible, 0)}>Vision & Mission</p>
        <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.08] tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 80)}>
          To shape a smarter industrial world by connecting innovation with human experience.
        </h2>
        <div className="mx-auto mt-8 w-12 h-[2px] bg-[#1d1d1f]" style={revealStyle(visible, 200)} />
        <div className="mt-8" style={revealStyle(visible, 280)}>
          <Link href="/about/vision-mission" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 5. MASONRY GRID — Core Values ═══ */
function ValuesGrid() {
  const { ref, visible } = useScrollReveal(0.06);
  const values = [
    { t: "Global Perspective", d: "Thinking beyond borders to serve a connected world." },
    { t: "Smart Simplicity", d: "Intelligent systems that are clean and intuitive." },
    { t: "Human Centered", d: "Every feature starts with real people and needs." },
    { t: "Integrity & Trust", d: "Guided by transparency and long-term commitment." },
    { t: "Legacy & Modernity", d: "Preserving heritage while building the future." },
    { t: "Innovation with Purpose", d: "Solving real problems with meaningful technology." },
  ];

  return (
    <section ref={ref} className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Core Values</h2>
          <div className="mx-auto mt-4 w-10 h-[2px] bg-[#1d1d1f]" style={revealStyle(visible, 80)} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <div key={v.t} className="bg-[#f5f5f7] rounded-[16px] p-7 hover:-translate-y-1 transition-transform duration-500" style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${120 + i * 50}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${120 + i * 50}ms`,
            }}>
              <h4 className="text-[15px] font-bold text-[#1d1d1f] mb-2">{v.t}</h4>
              <p className="text-[13px] leading-[1.55] text-[#86868b]">{v.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10" style={revealStyle(visible, 500)}>
          <Link href="/about/values" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 6. FULL-BLEED IMAGE — Corporate Structure ═══ */
function StructureHero() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-end overflow-hidden">
      <Image src="/images/modern-office.jpg" alt="Corporate Structure" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative z-10 max-w-[800px] px-8 md:px-16 pb-14 md:pb-20">
        <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.08] tracking-[-0.03em] text-white" style={revealStyle(visible, 0)}>Corporate Structure</h2>
        <p className="text-[15px] leading-[1.65] text-white/45 mt-3 max-w-[420px]" style={revealStyle(visible, 120)}>
          Defined leadership and clear responsibilities — empowering precision and agility.
        </p>
        <div className="mt-5" style={revealStyle(visible, 240)}>
          <Link href="/about/corporate-structure" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/60 hover:text-white transition-colors duration-300">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 7. SEGMENTS — Image cards on light bg ═══ */
function SegmentsGrid() {
  const { ref, visible } = useScrollReveal(0.06);
  const items = [
    { t: "Manufacturing & Production", img: "/images/factory-floor.jpg" },
    { t: "Smart Technologies", img: "/images/circuit-board.jpg" },
    { t: "Global Trade & Distribution", img: "/images/composites.jpg" },
    { t: "Strategic Investment", img: "/images/modern-office.jpg" },
  ];
  return (
    <section ref={ref} className="bg-[#f9f9f9] py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[32px] md:text-[48px] font-bold tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Business Segments</h2>
          <div className="mx-auto mt-4 w-10 h-[2px] bg-[#1d1d1f]" style={revealStyle(visible, 80)} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map((s, i) => (
            <div key={s.t} className="group rounded-[12px] overflow-hidden bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-500" style={{
              opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.96)",
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${120 + i * 60}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${120 + i * 60}ms`,
            }}>
              <div className="aspect-[4/3] overflow-hidden">
                <Image src={s.img} alt={s.t} width={600} height={450} className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700" />
              </div>
              <div className="p-4">
                <h3 className="text-[13px] font-semibold text-[#1d1d1f]">{s.t}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10" style={revealStyle(visible, 450)}>
          <Link href="/about/business-segments" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 8. DARK FEATURE — Technology with glass cards ═══ */
function TechDark() {
  const { ref, visible } = useScrollReveal(0.06);
  const features = [
    "Custom OS", "AI Machines", "Smart UI",
    "Modular Updates", "Data Production", "Predictive Maintenance", "IoT Integration",
  ];
  return (
    <section ref={ref} className="bg-black py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left text */}
          <div className="lg:w-[45%]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/20 mb-4" style={revealStyle(visible, 0)}>Technology & Innovation</p>
            <h2 className="text-[32px] md:text-[44px] font-bold leading-[1.08] tracking-[-0.03em] text-white" style={revealStyle(visible, 80)}>
              Driven by Innovation. Powered by Technology.
            </h2>
            <p className="text-[15px] leading-[1.7] text-white/30 mt-5" style={revealStyle(visible, 160)}>
              Intelligent solutions powering machines, software, and systems for future-ready industrial performance.
            </p>
            <div className="mt-8" style={revealStyle(visible, 240)}>
              <Link href="/about/technology" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#2997ff] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
            </div>
          </div>
          {/* Right glass cards */}
          <div className="lg:w-[55%] grid grid-cols-3 gap-2.5">
            {features.map((f, i) => (
              <div key={f} className="rounded-[12px] bg-white/[0.05] backdrop-blur-sm border border-white/[0.06] px-4 py-5 text-center hover:bg-white/[0.08] hover:border-white/[0.10] transition-all duration-400" style={{
                opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.92)",
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${200 + i * 40}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${200 + i * 40}ms`,
              }}>
                <p className="text-[12px] font-medium text-white/50">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ 9. FULL-BLEED — Global Presence ═══ */
function GlobalHero() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="relative min-h-[65vh] flex items-center justify-center text-center overflow-hidden">
      <Image src="/images/digital-globe.jpg" alt="Global Presence" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-[650px] px-6 py-20">
        <h2 className="text-[36px] md:text-[56px] font-bold leading-[1.06] tracking-[-0.03em] text-white" style={revealStyle(visible, 0)}>Global Presence</h2>
        <p className="text-[15px] leading-[1.65] text-white/40 mt-4" style={revealStyle(visible, 120)}>
          Strong partnerships across the world&apos;s leading industrial markets.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {["Americas", "Europe", "Middle East", "South Asia", "China", "Africa"].map((r, i) => (
            <span key={r} className="px-4 py-1.5 text-[11px] font-medium text-white/50 border border-white/10 rounded-full" style={{
              opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${250 + i * 40}ms`,
            }}>{r}</span>
          ))}
        </div>
        <div className="mt-8" style={revealStyle(visible, 500)}>
          <Link href="/about/global-presence" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/60 hover:text-white transition-colors duration-300">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 10. SUSTAINABILITY — Split on light bg ═══ */
function Sustainability() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[400px]">
        <div className="lg:w-[52%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src="/images/wind-turbines.jpg" alt="Sustainability" width={1200} height={800} className="w-full h-full object-cover min-h-[260px] lg:min-h-[400px]" />
        </div>
        <div className="lg:w-[48%] flex items-center px-8 md:px-14 lg:px-16 py-12 lg:py-0">
          <div className="max-w-[380px]">
            <h2 className="text-[30px] md:text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 100)}>Sustainability</h2>
            <p className="text-[15px] leading-[1.65] text-[#86868b] mt-3" style={revealStyle(visible, 200)}>
              Creating impact beyond industry — fairness, education, and community empowerment.
            </p>
            <div className="mt-6" style={revealStyle(visible, 300)}>
              <Link href="/about/sustainability" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ 11. CEO — Quote on dark ═══ */
function CEOQuote() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#111] py-28 md:py-36 text-center overflow-hidden">
      <div className="max-w-[700px] mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/15 mb-8" style={revealStyle(visible, 0)}>Leadership Message</p>
        <blockquote className="text-[24px] md:text-[36px] font-semibold leading-[1.25] tracking-[-0.02em] text-white/65 italic" style={revealStyle(visible, 120)}>
          &ldquo;We are shaping the future of manufacturing — with trust, innovation, and responsibility at the core.&rdquo;
        </blockquote>
        <div className="mx-auto mt-8 w-10 h-[2px] bg-white/10" style={revealStyle(visible, 240)} />
        <p className="text-[13px] text-white/20 mt-6" style={revealStyle(visible, 300)}>— The Leadership Team, Koleex International Group</p>
        <div className="mt-8" style={revealStyle(visible, 380)}>
          <Link href="/about/ceo-message" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#2997ff] hover:underline underline-offset-[3px]">Read full message {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 12. FUTURE — Large centered statement ═══ */
function FutureOutlook() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#f9f9f9] py-32 md:py-44 text-center overflow-hidden">
      <div className="max-w-[700px] mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86868b] mb-5" style={revealStyle(visible, 0)}>Future Outlook</p>
        <h2 className="text-[36px] md:text-[56px] font-bold leading-[1.06] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 100)}>
          The next chapter begins now.
        </h2>
        <p className="text-[16px] leading-[1.65] text-[#86868b] mt-5" style={revealStyle(visible, 200)}>
          Manufacturing innovation. Digital integration. Regional expansion. Customer excellence.
        </p>
        <div className="mx-auto mt-8 w-10 h-[2px] bg-[#1d1d1f]" style={revealStyle(visible, 300)} />
        <div className="mt-8" style={revealStyle(visible, 380)}>
          <Link href="/about/future-outlook" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 13. CTA ═══ */
function CTAFinal() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-white text-center py-24 md:py-32">
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
      <TitleSection />
      <StatsSection />
      <HistoryHero />
      <VisionCentered />
      <ValuesGrid />
      <StructureHero />
      <SegmentsGrid />
      <TechDark />
      <GlobalHero />
      <Sustainability />
      <CEOQuote />
      <FutureOutlook />
      <CTAFinal />
    </>
  );
}
