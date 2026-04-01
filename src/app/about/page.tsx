"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   About Hub — Honor-style layout with ALL Figma sections.
   16 sections matching Koleex Company Profile design.
   --------------------------------------------------------------------------- */

const arrow = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-px"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/* ═══ 1. HERO TITLE ═══ */
function HeroTitle() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);
  const s = (d: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 1s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms, transform 1s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms`,
  });
  return (
    <section className="bg-[#f9f9f9] flex items-center justify-center text-center py-36 md:py-48">
      <div className="px-6">
        <h1 className="text-[48px] md:text-[72px] lg:text-[88px] font-bold leading-[1.02] tracking-[-0.045em] text-[#1d1d1f]" style={s(100)}>
          ABOUT KOLEEX
        </h1>
        <div className="mx-auto mt-7 w-16 h-[2px] bg-[#1d1d1f]" style={s(350)} />
        <p className="text-[16px] md:text-[18px] text-[#86868b] mt-6 max-w-[480px] mx-auto leading-[1.6]" style={s(500)}>
          A global industrial technology company built on precision, innovation, and long-term partnerships.
        </p>
      </div>
    </section>
  );
}

/* ═══ 2. CEO MESSAGE — Gradient dark, text + photo ═══ */
function CEOMessage() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="overflow-hidden" style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #252525 100%)" }}>
      <div className="flex flex-col lg:flex-row min-h-[520px]">
        <div className="lg:w-[55%] flex items-center px-8 md:px-14 lg:px-16 py-16 lg:py-20">
          <div className="max-w-[500px]">
            <h2 className="text-[36px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] text-white" style={revealStyle(visible, 0)}>CEO Message</h2>
            <p className="text-[14px] leading-[1.8] text-white/40 mt-6" style={revealStyle(visible, 120)}>
              At Koleex International Group, every step we take is guided by a shared commitment to progress and excellence. We have grown from a family legacy into a global enterprise, but our core values remain unchanged: trust, innovation, and responsibility.
            </p>
            <p className="text-[14px] leading-[1.8] text-white/40 mt-4" style={revealStyle(visible, 200)}>
              Together, we are shaping the future of manufacturing. With your support, Koleex will continue to push boundaries and open new opportunities for generations to come.
            </p>
            <div className="mt-8" style={revealStyle(visible, 320)}>
              <Link href="/about/ceo-message" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/50 hover:text-white transition-colors duration-300">Know more {arrow}</Link>
            </div>
          </div>
        </div>
        <div className="lg:w-[45%] overflow-hidden" style={revealStyle(visible, 100)}>
          <Image src="/images/team-office.jpg" alt="CEO" width={1000} height={800} className="w-full h-full object-cover min-h-[400px] lg:min-h-[520px] grayscale" />
        </div>
      </div>
    </section>
  );
}

/* ═══ 3. HISTORY — Full-bleed image, text bottom-left ═══ */
function History() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-end overflow-hidden">
      <Image src="/images/factory-floor.jpg" alt="History" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="relative z-10 max-w-[700px] px-8 md:px-16 pb-16 md:pb-24">
        <h2 className="text-[36px] md:text-[56px] font-bold leading-[1.06] tracking-[-0.035em] text-white" style={revealStyle(visible, 0)}>History and Heritage</h2>
        <p className="text-[15px] leading-[1.65] text-white/45 mt-4 max-w-[480px]" style={revealStyle(visible, 120)}>
          Koleex has grown from a family tradition into a global name, driven by integrity, precision, and a deep respect for the past that shapes our future direction.
        </p>
        <div className="mt-6" style={revealStyle(visible, 240)}>
          <Link href="/about/history" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/55 hover:text-white transition-colors duration-300">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 4. VISION — Light bg, centered text ═══ */
function Vision() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#f9f9f9] py-32 md:py-44 text-center overflow-hidden">
      <div className="max-w-[700px] mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86868b] mb-5" style={revealStyle(visible, 0)}>Our Vision</p>
        <h2 className="text-[30px] md:text-[46px] font-bold leading-[1.1] tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 100)}>
          To shape a smarter industrial world by connecting innovation with human experience.
        </h2>
        <div className="mx-auto mt-8 w-12 h-[2px] bg-[#1d1d1f]" style={revealStyle(visible, 220)} />
        <div className="mt-8" style={revealStyle(visible, 320)}>
          <Link href="/about/vision-mission" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 5. CORE VALUES — Cards grid ═══ */
function Values() {
  const { ref, visible } = useScrollReveal(0.06);
  const items = [
    { t: "Global Perspective", d: "We think beyond borders to serve a connected, fast-changing world.", i: "⊕" },
    { t: "Smart Simplicity", d: "We design intelligent systems that are clean, intuitive, and efficient.", i: "◎" },
    { t: "Human Centered Innovation", d: "Every feature we create starts with people.", i: "◇" },
    { t: "Integrity & Trust", d: "Our actions are guided by transparency and honesty.", i: "♡" },
    { t: "Legacy & Modernity", d: "We preserve our heritage while building the future.", i: "□" },
    { t: "Innovation with Purpose", d: "We solve problems with meaningful technology.", i: "△" },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[32px] md:text-[48px] font-bold tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Core Values</h2>
          <div className="mx-auto mt-4 w-10 h-[2px] bg-[#1d1d1f]" style={revealStyle(visible, 80)} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((v, i) => (
            <div key={v.t} className="bg-[#1d1d1f] rounded-[16px] p-6 hover:-translate-y-1 transition-transform duration-500" style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${140 + i * 50}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${140 + i * 50}ms`,
            }}>
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-[14px] font-semibold text-white leading-snug pr-2">{v.t}</h4>
                <span className="text-white/15 text-[18px] shrink-0">{v.i}</span>
              </div>
              <p className="text-[12px] leading-[1.55] text-white/25">{v.d}</p>
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

/* ═══ 6. CORPORATE STRUCTURE — Full-bleed image ═══ */
function Structure() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-end overflow-hidden">
      <Image src="/images/modern-office.jpg" alt="Corporate Structure" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative z-10 max-w-[700px] px-8 md:px-16 pb-14 md:pb-20">
        <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.08] tracking-[-0.03em] text-white" style={revealStyle(visible, 0)}>Corporate Structure</h2>
        <p className="text-[15px] leading-[1.65] text-white/40 mt-3 max-w-[420px]" style={revealStyle(visible, 120)}>
          With defined leadership roles and clear responsibilities, empowering teams to operate with precision and agility.
        </p>
        <div className="mt-5" style={revealStyle(visible, 240)}>
          <Link href="/about/corporate-structure" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/50 hover:text-white transition-colors duration-300">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 7. BUSINESS SEGMENTS — Image cards ═══ */
function Segments() {
  const { ref, visible } = useScrollReveal(0.06);
  const items = [
    { t: "Manufacturing & Production", img: "/images/factory-floor.jpg" },
    { t: "Smart Technologies & Software", img: "/images/circuit-board.jpg" },
    { t: "Global Trade & Distribution", img: "/images/composites.jpg" },
    { t: "Strategic Investment & Innovation", img: "/images/modern-office.jpg" },
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
            <div key={s.t} className="group rounded-[14px] overflow-hidden bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-500" style={{
              opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.96)",
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${140 + i * 60}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${140 + i * 60}ms`,
            }}>
              <div className="aspect-[4/3] overflow-hidden">
                <Image src={s.img} alt={s.t} width={600} height={450} className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700" />
              </div>
              <div className="p-4"><h3 className="text-[12px] font-semibold text-[#1d1d1f]">{s.t}</h3></div>
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

/* ═══ 8. TECHNOLOGY — Dark with glass cards ═══ */
function Technology() {
  const { ref, visible } = useScrollReveal(0.06);
  const features = ["Custom OS", "AI Machines", "Smart UI", "Modular Updates", "Data Production", "Predictive Maintenance", "IoT Integration"];
  return (
    <section ref={ref} className="bg-black py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-14">
          <div className="lg:w-[45%]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/18 mb-4" style={revealStyle(visible, 0)}>Technology & Innovation</p>
            <h2 className="text-[32px] md:text-[44px] font-bold leading-[1.08] tracking-[-0.03em] text-white" style={revealStyle(visible, 80)}>
              Driven by Innovation.<br />Powered by Technology.
            </h2>
            <p className="text-[14px] leading-[1.7] text-white/28 mt-5" style={revealStyle(visible, 160)}>
              Intelligent solutions that power machines, software, and systems for future-ready industrial performance.
            </p>
            <div className="mt-8" style={revealStyle(visible, 260)}>
              <Link href="/about/technology" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#2997ff] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
            </div>
          </div>
          <div className="lg:w-[55%] grid grid-cols-3 gap-2.5">
            {features.map((f, i) => (
              <div key={f} className="rounded-[12px] bg-white/[0.04] backdrop-blur-sm border border-white/[0.05] px-4 py-5 text-center hover:bg-white/[0.07] hover:border-white/[0.10] transition-all duration-400" style={{
                opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.92)",
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${200 + i * 40}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${200 + i * 40}ms`,
              }}>
                <p className="text-[12px] font-medium text-white/45">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ 9. MARKET STRATEGY — Split, image + text + cards ═══ */
function Strategy() {
  const { ref, visible } = useScrollReveal(0.08);
  const cards = ["Market Research", "Strategy Design", "Channel Activation", "Performance Optimization"];
  return (
    <section ref={ref} className="bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[460px]">
        <div className="lg:w-[42%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src="/images/modern-office.jpg" alt="Market Strategy" width={1000} height={800} className="w-full h-full object-cover min-h-[280px] lg:min-h-[460px]" />
        </div>
        <div className="lg:w-[58%] px-8 md:px-14 lg:px-16 py-14 flex flex-col justify-center">
          <h2 className="text-[32px] md:text-[44px] font-bold tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 80)}>Market Strategy</h2>
          <p className="text-[15px] leading-[1.65] text-[#86868b] mt-3 max-w-[440px]" style={revealStyle(visible, 160)}>
            We move with strategy, not chance — understanding markets, shaping demands, and leading with innovation.
          </p>
          <div className="grid grid-cols-2 gap-2.5 mt-8">
            {cards.map((c, i) => (
              <div key={c} className="bg-[#1d1d1f] rounded-[12px] px-4 py-4 hover:-translate-y-0.5 transition-transform duration-400" style={{
                opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${240 + i * 50}ms`,
              }}>
                <p className="text-[12px] font-semibold text-white">{c}</p>
              </div>
            ))}
          </div>
          <div className="mt-6" style={revealStyle(visible, 500)}>
            <Link href="/about/future-outlook" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ 10. SOCIAL RESPONSIBILITY — Full-bleed ═══ */
function Responsibility() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-end overflow-hidden">
      <Image src="/images/wind-turbines.jpg" alt="Social Responsibility" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="relative z-10 max-w-[700px] px-8 md:px-16 pb-14 md:pb-20">
        <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.08] tracking-[-0.03em] text-white" style={revealStyle(visible, 0)}>Social Responsibility</h2>
        <p className="text-[15px] leading-[1.65] text-white/40 mt-3 max-w-[440px]" style={revealStyle(visible, 120)}>
          Creating impact beyond industry — promoting fairness, education, and community empowerment in every region we operate.
        </p>
        <div className="mt-5" style={revealStyle(visible, 240)}>
          <Link href="/about/sustainability" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/50 hover:text-white transition-colors duration-300">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 11. BRANDS & DIVISIONS — Dark, image + brand names grid ═══ */
function BrandsDivisions() {
  const { ref, visible } = useScrollReveal(0.06);
  const brands = ["KOLEEX", "Xiatang", "NEXO", "OSTA", "Kalia House", "KTEC", "DIMTEX", "Teramac", "Lexi", "CTC", "ENZO", "El Barto Group"];
  return (
    <section ref={ref} className="bg-[#0a0a0a] overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[480px]">
        <div className="lg:w-[40%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src="/images/team-office.jpg" alt="Brands" width={1000} height={800} className="w-full h-full object-cover min-h-[280px] lg:min-h-[480px]" />
        </div>
        <div className="lg:w-[60%] px-8 md:px-14 lg:px-16 py-14 flex flex-col justify-center">
          <h2 className="text-[32px] md:text-[44px] font-bold tracking-[-0.03em] text-white" style={revealStyle(visible, 80)}>
            Koleex Group<br />Brands and Divisions
          </h2>
          <p className="text-[14px] leading-[1.65] text-white/30 mt-3 max-w-[440px]" style={revealStyle(visible, 160)}>
            Leading companies and brands united under one vision. Each represents Koleex growth, innovation, and trusted global presence.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-8">
            {brands.map((b, i) => (
              <div key={b} className="bg-white/[0.04] border border-white/[0.06] rounded-[10px] px-3 py-3 text-center hover:bg-white/[0.07] transition-colors duration-300" style={{
                opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${220 + i * 30}ms`,
              }}>
                <p className="text-[10px] font-semibold text-white/40 tracking-wide">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ 12. GLOBAL PRESENCE — Full-bleed globe ═══ */
function GlobalPresence() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="relative min-h-[65vh] flex items-center justify-center text-center overflow-hidden">
      <Image src="/images/digital-globe.jpg" alt="Global Presence" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-[620px] px-6 py-20">
        <h2 className="text-[36px] md:text-[56px] font-bold leading-[1.06] tracking-[-0.035em] text-white" style={revealStyle(visible, 0)}>Global Presence</h2>
        <p className="text-[15px] leading-[1.65] text-white/35 mt-4" style={revealStyle(visible, 120)}>
          Operating across multiple continents with strong partnerships in the world&apos;s leading industrial markets.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {["Americas", "Europe", "Middle East", "South Asia", "China", "Africa"].map((r, i) => (
            <span key={r} className="px-4 py-1.5 text-[11px] font-medium text-white/40 border border-white/8 rounded-full" style={{
              opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${250 + i * 40}ms`,
            }}>{r}</span>
          ))}
        </div>
        <div className="mt-8" style={revealStyle(visible, 500)}>
          <Link href="/about/global-presence" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/50 hover:text-white transition-colors duration-300">Know more {arrow}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 13. PRODUCTION STRENGTH — Split, text + photo mosaic ═══ */
function Production() {
  const { ref, visible } = useScrollReveal(0.06);
  const images = ["/images/factory-floor.jpg", "/images/hero-robot.jpg", "/images/circuit-board.jpg", "/images/composites.jpg", "/images/materials-lab.jpg", "/images/server-room.jpg"];
  return (
    <section ref={ref} className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-14 items-start">
          <div className="lg:w-[35%] lg:sticky lg:top-32">
            <h2 className="text-[32px] md:text-[44px] font-bold tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
              Koleex Production Strength
            </h2>
            <p className="text-[14px] leading-[1.7] text-[#86868b] mt-4" style={revealStyle(visible, 120)}>
              Our production facilities are equipped with advanced technology and strict quality controls, ensuring every product meets international standards of excellence.
            </p>
            <div className="mt-6" style={revealStyle(visible, 240)}>
              <Link href="/products" className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">Know more {arrow}</Link>
            </div>
          </div>
          <div className="lg:w-[65%] grid grid-cols-3 gap-2.5">
            {images.map((img, i) => (
              <div key={img} className="group aspect-square rounded-[10px] overflow-hidden" style={{
                opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.94)",
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${200 + i * 50}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${200 + i * 50}ms`,
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

/* ═══ 14. FUTURE OUTLOOK — Large centered statement ═══ */
function FutureOutlook() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#f9f9f9] py-32 md:py-44 text-center overflow-hidden">
      <div className="max-w-[680px] mx-auto px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86868b] mb-5" style={revealStyle(visible, 0)}>Future Outlook</p>
        <h2 className="text-[36px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 100)}>
          The next chapter begins now.
        </h2>
        <p className="text-[15px] leading-[1.65] text-[#86868b] mt-5" style={revealStyle(visible, 200)}>
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

/* ═══ 15. CLIENTS & PARTNERS — Dark, partner names grid ═══ */
function ClientsPartners() {
  const { ref, visible } = useScrollReveal(0.06);
  const partners = ["Feiyue", "BOTE", "Dulipu", "Butterfly", "Linjian", "XYO", "Paradyne", "Synaptic", "Siasun", "Dahua", "Venturis", "Haodi"];
  const clients = ["Xurue", "Dxing", "Duma", "Fujian", "Dober", "Tekno", "IHG", "Doso", "Hikari", "Finzen", "Jinzen", "Omron", "Siemens", "Schneider", "Odoo"];
  return (
    <section ref={ref} className="bg-[#050505] py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Partners */}
          <div>
            <h3 className="text-[24px] md:text-[32px] font-bold text-white leading-tight" style={revealStyle(visible, 0)}>
              United by Investment.<br />Strengthened by Partnership.
            </h3>
            <p className="text-[13px] text-white/25 mt-3" style={revealStyle(visible, 100)}>
              We invest in partners and factories that build our growth and vision.
            </p>
            <div className="grid grid-cols-3 gap-2 mt-8">
              {partners.map((p, i) => (
                <div key={p} className="bg-white/[0.04] border border-white/[0.06] rounded-[10px] px-3 py-3 text-center" style={{
                  opacity: visible ? 1 : 0, transition: `opacity 0.3s ease ${200 + i * 25}ms`,
                }}>
                  <p className="text-[10px] font-medium text-white/35">{p}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Clients */}
          <div>
            <h3 className="text-[24px] md:text-[32px] font-bold text-white leading-tight" style={revealStyle(visible, 80)}>
              Trusted Partners.<br />Driven by Koleex Excellence.
            </h3>
            <p className="text-[13px] text-white/25 mt-3" style={revealStyle(visible, 180)}>
              Koleex cooperates with leading businesses worldwide.
            </p>
            <div className="grid grid-cols-4 md:grid-cols-5 gap-2 mt-8">
              {clients.map((c, i) => (
                <div key={c} className="bg-white/[0.04] border border-white/[0.06] rounded-[8px] px-2 py-2.5 text-center" style={{
                  opacity: visible ? 1 : 0, transition: `opacity 0.3s ease ${280 + i * 20}ms`,
                }}>
                  <p className="text-[9px] font-medium text-white/30">{c}</p>
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
    <section ref={ref} className="bg-white text-center py-24 md:py-32">
      <div className="max-w-[480px] mx-auto px-6">
        <h2 className="text-[28px] md:text-[38px] font-bold tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Want to work with us?</h2>
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
      <HeroTitle />
      <CEOMessage />
      <History />
      <Vision />
      <Values />
      <Structure />
      <Segments />
      <Technology />
      <Strategy />
      <Responsibility />
      <BrandsDivisions />
      <GlobalPresence />
      <Production />
      <FutureOutlook />
      <ClientsPartners />
      <CTA />
    </>
  );
}
