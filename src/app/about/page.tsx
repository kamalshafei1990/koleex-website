"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   About Hub — Company story page with 13 varied section layouts.
   Each section tells a piece of the Koleex story and links to a sub-page.

   Order:
   1. Hero
   2. Company Overview (full-width text)
   3. History & Heritage (timeline)
   4. Vision & Mission (full-bleed image + overlay)
   5. Core Values (card grid)
   6. Corporate Structure (image right / text left)
   7. Business Segments (2×2 cards)
   8. Technology & Innovation (dark bento)
   9. Global Presence (stats row)
   10. Sustainability (image left / text right)
   11. CEO Message (quote style)
   12. Future Outlook (image right / text left)
   13. CTA
   --------------------------------------------------------------------------- */

/* ═══════════════════════════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const { ref, visible } = useScrollReveal(0.05);
  return (
    <section ref={ref} className="bg-white text-center py-24 md:py-36 overflow-hidden">
      <div className="max-w-[800px] mx-auto px-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#86868b] mb-4" style={revealStyle(visible, 0)}>
          About Koleex
        </p>
        <h1 className="text-[52px] md:text-[80px] font-bold leading-[1.03] tracking-[-0.045em] text-[#1d1d1f]" style={revealStyle(visible, 80)}>
          Our Story.
        </h1>
        <p className="text-[19px] md:text-[24px] font-normal leading-[1.4] text-[#6e6e73] mt-5 max-w-[580px] mx-auto" style={revealStyle(visible, 160)}>
          A global industrial technology company built on precision, innovation, and long-term partnerships — shaping the future of manufacturing.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. COMPANY OVERVIEW — Full-width image with text below
   ═══════════════════════════════════════════════════════════ */
function OverviewSection() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="bg-[#f5f5f7] overflow-hidden">
      <div style={revealStyle(visible, 0)}>
        <Image src="/images/factory-floor.jpg" alt="Koleex Operations" width={2560} height={1000} className="w-full h-[360px] md:h-[480px] object-cover" />
      </div>
      <div className="max-w-[780px] mx-auto px-6 py-16 md:py-20 text-center">
        <h2 className="text-[36px] md:text-[48px] font-bold leading-[1.08] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 100)}>
          Company Overview
        </h2>
        <p className="text-[17px] leading-[1.7] text-[#6e6e73] mt-5" style={revealStyle(visible, 200)}>
          Koleex International Group is a technology-driven industrial company with a focus on precision machinery, automation systems, and integrated solutions for manufacturing sectors worldwide. With roots in engineering and a commitment to quality, Koleex serves customers across multiple regions through a growing portfolio of products and services.
        </p>
        <div className="mt-8" style={revealStyle(visible, 300)}>
          <Link href="/about" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Company overview {">"}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. HISTORY & HERITAGE — Timeline style
   ═══════════════════════════════════════════════════════════ */
function HistorySection() {
  const { ref, visible } = useScrollReveal(0.06);
  const milestones = [
    { era: "Early Years", title: "Founded", desc: "A focused industrial trading and engineering business takes root." },
    { era: "Growth Phase", title: "Regional Expansion", desc: "Operations extend across new markets and product lines." },
    { era: "Expansion Era", title: "Technology Integration", desc: "Investing in automation, software, and smart manufacturing." },
    { era: "Modern Era", title: "Global Growth", desc: "Establishing presence across multiple continents." },
    { era: "Present Day", title: "Digital Transformation", desc: "Leading the shift to Industry 4.0 and connected systems." },
  ];

  return (
    <section ref={ref} className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left: title + image */}
          <div className="lg:w-[40%] lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-[40px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
              History and
              <br />Heritage
            </h2>
            <p className="text-[16px] leading-[1.65] text-[#6e6e73] mt-4" style={revealStyle(visible, 100)}>
              Koleex has grown from a family tradition into a global name, driven by integrity, precision, and a deep respect for the past.
            </p>
            <div className="mt-6" style={revealStyle(visible, 200)}>
              <Link href="/about/history" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Full history {">"}</Link>
            </div>
          </div>

          {/* Right: timeline */}
          <div className="lg:w-[60%]">
            <div className="relative pl-8 border-l-2 border-[#e8e8ed]">
              {milestones.map((m, i) => (
                <div
                  key={m.era}
                  className="relative mb-10 last:mb-0"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${200 + i * 100}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${200 + i * 100}ms`,
                  }}
                >
                  {/* Dot */}
                  <div className="absolute -left-[9px] top-[6px] w-4 h-4 rounded-full bg-white border-2 border-[#1d1d1f]" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#86868b] mb-1">{m.era}</p>
                  <h3 className="text-[22px] font-bold text-[#1d1d1f]">{m.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-[#6e6e73] mt-1">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. VISION & MISSION — Full-bleed dark image with text overlay
   ═══════════════════════════════════════════════════════════ */
function VisionSection() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="relative min-h-[520px] flex items-center overflow-hidden">
      <Image src="/images/digital-globe.jpg" alt="Vision" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-[700px] mx-auto px-6 py-20 md:py-28 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/40 mb-4" style={revealStyle(visible, 0)}>Vision & Mission</p>
        <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.06] tracking-[-0.035em] text-white" style={revealStyle(visible, 80)}>
          To shape a smarter industrial world.
        </h2>
        <p className="text-[17px] leading-[1.65] text-white/55 mt-5" style={revealStyle(visible, 160)}>
          Our vision is to redefine the future of smart industry by fusing innovation with heritage — delivering intelligent tools that shape progress across global markets and generations.
        </p>
        <div className="mt-8" style={revealStyle(visible, 240)}>
          <Link href="/about/vision-mission" className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. CORE VALUES — 2×3 dark card grid on white
   ═══════════════════════════════════════════════════════════ */
function ValuesSection() {
  const { ref, visible } = useScrollReveal(0.06);
  const values = [
    { title: "Global Perspective", icon: "⊕", desc: "We think beyond borders to serve a connected world." },
    { title: "Smart Simplicity", icon: "◎", desc: "Intelligent systems that are clean, intuitive, and efficient." },
    { title: "Human Centered Innovation", icon: "◇", desc: "Every feature starts with people and their real needs." },
    { title: "Integrity & Trust", icon: "♡", desc: "Transparency, honesty, and long-term commitment." },
    { title: "Legacy & Modernity", icon: "□", desc: "We preserve our heritage while building the future." },
    { title: "Innovation with Purpose", icon: "△", desc: "We solve problems with meaningful technology." },
  ];

  return (
    <section ref={ref} className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[40px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Core Values</h2>
          <p className="text-[17px] leading-[1.5] text-[#6e6e73] mt-3 max-w-[500px] mx-auto" style={revealStyle(visible, 80)}>
            The principles that guide every decision, product, and partnership at Koleex.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="bg-[#1d1d1f] rounded-[18px] p-6 transition-all duration-500 hover:-translate-y-1"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${160 + i * 60}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${160 + i * 60}ms`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-[14px] font-semibold text-white leading-snug pr-2">{v.title}</h4>
                <span className="text-white/20 text-[18px] shrink-0">{v.icon}</span>
              </div>
              <p className="text-[12px] leading-[1.55] text-white/30">{v.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10" style={revealStyle(visible, 600)}>
          <Link href="/about/values" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. CORPORATE STRUCTURE — Image right / text left
   ═══════════════════════════════════════════════════════════ */
function StructureSection() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="bg-[#f5f5f7] overflow-hidden">
      <div className="flex flex-col lg:flex-row-reverse min-h-[460px]">
        <div className="lg:w-[55%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src="/images/modern-office.jpg" alt="Corporate Structure" width={1200} height={800} className="w-full h-full object-cover min-h-[280px] lg:min-h-[460px]" />
        </div>
        <div className="lg:w-[45%] flex items-center px-8 md:px-12 lg:px-16 py-14">
          <div>
            <h2 className="text-[36px] md:text-[48px] font-bold leading-[1.08] tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 100)}>Corporate Structure</h2>
            <p className="text-[16px] leading-[1.65] text-[#6e6e73] mt-4 max-w-[400px]" style={revealStyle(visible, 200)}>
              With defined leadership roles and clear departmental responsibilities, our structure empowers teams to innovate and operate with precision and agility.
            </p>
            <div className="mt-6" style={revealStyle(visible, 300)}>
              <Link href="/about/corporate-structure" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. BUSINESS SEGMENTS — 2×2 card grid
   ═══════════════════════════════════════════════════════════ */
function SegmentsSection() {
  const { ref, visible } = useScrollReveal(0.06);
  const segments = [
    { title: "Manufacturing & Production", icon: "⚙️", desc: "Precision machinery and equipment for industrial operations.", image: "/images/factory-floor.jpg" },
    { title: "Smart Technologies", icon: "💻", desc: "Software, IoT, and digital tools for modern manufacturing.", image: "/images/circuit-board.jpg" },
    { title: "Global Trade & Distribution", icon: "🌐", desc: "International supply chain and market access.", image: "/images/composites.jpg" },
    { title: "Strategic Investment", icon: "📈", desc: "Investing in innovation and growth opportunities.", image: "/images/modern-office.jpg" },
  ];

  return (
    <section ref={ref} className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1060px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[40px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Business Segments</h2>
          <p className="text-[17px] leading-[1.5] text-[#6e6e73] mt-3 max-w-[520px] mx-auto" style={revealStyle(visible, 80)}>
            Four integrated segments driving innovation across industries.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {segments.map((s, i) => (
            <div
              key={s.title}
              className="group rounded-[20px] overflow-hidden bg-[#f5f5f7] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${160 + i * 80}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${160 + i * 80}ms`,
              }}
            >
              <div className="h-[200px] overflow-hidden">
                <Image src={s.image} alt={s.title} width={800} height={400} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{s.icon}</span>
                  <h3 className="text-[18px] font-bold text-[#1d1d1f]">{s.title}</h3>
                </div>
                <p className="text-[14px] leading-[1.55] text-[#6e6e73]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10" style={revealStyle(visible, 600)}>
          <Link href="/about/business-segments" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   8. TECHNOLOGY — Dark bento grid
   ═══════════════════════════════════════════════════════════ */
function TechSection() {
  const { ref, visible } = useScrollReveal(0.06);
  const features = [
    { title: "Custom Operation System", desc: "Platform-optimized operating systems." },
    { title: "AI Powered Machines", desc: "Smart machines enhanced with AI." },
    { title: "Smart User Interface", desc: "Intuitive interfaces for operators." },
    { title: "Modular Software Updates", desc: "Seamless feature upgrades." },
    { title: "Data-Driven Production", desc: "Real-time performance monitoring." },
    { title: "Predictive Maintenance", desc: "Reduce downtime proactively." },
  ];

  return (
    <section ref={ref} className="bg-[#0a0a0a] py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1060px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-[42%]">
            <h2 className="text-[36px] md:text-[44px] font-bold leading-[1.08] tracking-[-0.03em] text-white" style={revealStyle(visible, 0)}>
              Driven by Innovation.
              <br />Powered by Technology.
            </h2>
            <p className="text-[15px] leading-[1.7] text-white/35 mt-5" style={revealStyle(visible, 100)}>
              We design intelligent solutions that power machines, software, and systems to achieve precision and future-ready performance.
            </p>
            <div className="mt-8 rounded-[16px] overflow-hidden" style={revealStyle(visible, 200)}>
              <Image src="/images/hero-robot.jpg" alt="Technology" width={600} height={400} className="w-full h-auto opacity-70" />
            </div>
          </div>
          <div className="lg:w-[58%]">
            <div className="rounded-[18px] border border-white/[0.06] bg-white/[0.02] p-6 mb-4" style={revealStyle(visible, 120)}>
              <p className="text-[11px] uppercase tracking-[0.08em] text-white/25 mb-2">Koleex Technology</p>
              <h3 className="text-[24px] md:text-[30px] font-semibold text-white leading-tight">
                Smart Solutions.
                <span className="text-white/35"> Empowering Industry.</span>
              </h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className="rounded-[14px] border border-white/[0.05] bg-white/[0.02] p-4 hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-400"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(10px)",
                    transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${250 + i * 50}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${250 + i * 50}ms`,
                  }}
                >
                  <h4 className="text-[12px] font-semibold text-white mb-1">{f.title}</h4>
                  <p className="text-[10.5px] leading-[1.5] text-white/20">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6" style={revealStyle(visible, 550)}>
              <Link href="/about/technology" className="text-[15px] text-[#2997ff] hover:underline underline-offset-[3px]">Explore technology {">"}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   9. GLOBAL PRESENCE — Statistics row + map reference
   ═══════════════════════════════════════════════════════════ */
function GlobalSection() {
  const { ref, visible } = useScrollReveal(0.08);
  const regions = ["Americas", "Europe", "Middle East", "South Asia", "China", "Africa"];

  return (
    <section ref={ref} className="bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[480px]">
        <div className="lg:w-[55%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src="/images/digital-globe.jpg" alt="Global Presence" width={1200} height={800} className="w-full h-full object-cover min-h-[300px] lg:min-h-[480px]" />
        </div>
        <div className="lg:w-[45%] flex items-center px-8 md:px-12 lg:px-16 py-14">
          <div>
            <h2 className="text-[40px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 100)}>
              Global Presence
            </h2>
            <p className="text-[16px] leading-[1.65] text-[#6e6e73] mt-4 max-w-[380px]" style={revealStyle(visible, 200)}>
              Koleex operates across multiple continents, establishing strong partnerships in the world&apos;s leading industrial markets.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {regions.map((r, i) => (
                <span
                  key={r}
                  className="px-3 py-1.5 text-[11px] font-medium text-[#6e6e73] bg-[#f5f5f7] rounded-full"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.5s ease ${300 + i * 50}ms`,
                  }}
                >
                  {r}
                </span>
              ))}
            </div>
            <div className="mt-6" style={revealStyle(visible, 600)}>
              <Link href="/about/global-presence" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   10. SUSTAINABILITY — Image left / text right
   ═══════════════════════════════════════════════════════════ */
function SustainabilitySection() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="bg-[#f5f5f7] overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[460px]">
        <div className="lg:w-[55%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src="/images/wind-turbines.jpg" alt="Sustainability" width={1200} height={800} className="w-full h-full object-cover min-h-[280px] lg:min-h-[460px]" />
        </div>
        <div className="lg:w-[45%] flex items-center px-8 md:px-12 lg:px-16 py-14">
          <div>
            <h2 className="text-[36px] md:text-[48px] font-bold leading-[1.08] tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 100)}>Social Responsibility</h2>
            <p className="text-[16px] leading-[1.65] text-[#6e6e73] mt-4 max-w-[400px]" style={revealStyle(visible, 200)}>
              Koleex believes in creating impact beyond industry — promoting fairness, education, and community empowerment in every region we operate in.
            </p>
            <div className="mt-6" style={revealStyle(visible, 300)}>
              <Link href="/about/sustainability" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   11. CEO MESSAGE — Quote style, dark gradient
   ═══════════════════════════════════════════════════════════ */
function CEOSection() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #3a3a3a 100%)" }}>
      <div className="flex flex-col lg:flex-row min-h-[500px]">
        <div className="lg:w-[55%] flex items-center px-8 md:px-12 lg:px-16 py-16 lg:py-20">
          <div className="max-w-[500px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/25 mb-6" style={revealStyle(visible, 0)}>CEO Message</p>
            <blockquote className="text-[24px] md:text-[32px] font-semibold leading-[1.25] tracking-[-0.02em] text-white/80 italic" style={revealStyle(visible, 100)}>
              &ldquo;Together, we are shaping the future of manufacturing — with trust, innovation, and responsibility at the core of everything we do.&rdquo;
            </blockquote>
            <p className="text-[14px] text-white/30 mt-6" style={revealStyle(visible, 200)}>
              — The Leadership Team, Koleex International Group
            </p>
            <div className="mt-8" style={revealStyle(visible, 300)}>
              <Link href="/about/ceo-message" className="text-[15px] text-[#2997ff] hover:underline underline-offset-[3px]">Read full message {">"}</Link>
            </div>
          </div>
        </div>
        <div className="lg:w-[45%] overflow-hidden" style={revealStyle(visible, 100)}>
          <Image src="/images/team-office.jpg" alt="Leadership" width={1000} height={800} className="w-full h-full object-cover min-h-[360px] lg:min-h-[500px] grayscale opacity-80" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   12. FUTURE OUTLOOK — Image right / text left
   ═══════════════════════════════════════════════════════════ */
function FutureSection() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row-reverse min-h-[460px]">
        <div className="lg:w-[55%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src="/images/circuit-board.jpg" alt="Future Outlook" width={1200} height={800} className="w-full h-full object-cover min-h-[280px] lg:min-h-[460px]" />
        </div>
        <div className="lg:w-[45%] flex items-center px-8 md:px-12 lg:px-16 py-14">
          <div>
            <h2 className="text-[36px] md:text-[48px] font-bold leading-[1.08] tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 100)}>Future Outlook</h2>
            <p className="text-[16px] leading-[1.65] text-[#6e6e73] mt-4 max-w-[400px]" style={revealStyle(visible, 200)}>
              Looking ahead, Koleex is focused on manufacturing innovation, digital integration, regional expansion, and customer excellence — building the next chapter of industrial technology.
            </p>
            <div className="mt-6" style={revealStyle(visible, 300)}>
              <Link href="/about/future-outlook" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   13. CTA
   ═══════════════════════════════════════════════════════════ */
function CTASection() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#f5f5f7] text-center py-20 md:py-28 overflow-hidden">
      <div className="max-w-[600px] mx-auto px-6">
        <h2 className="text-[36px] md:text-[48px] font-bold leading-[1.08] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
          Want to work with us?
        </h2>
        <p className="text-[17px] leading-[1.5] text-[#6e6e73] mt-3" style={revealStyle(visible, 80)}>
          Connect with our team to discuss partnerships, solutions, or career opportunities.
        </p>
        <div className="flex items-center justify-center gap-6 mt-8" style={revealStyle(visible, 160)}>
          <Link href="/contact" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Contact us {">"}</Link>
          <Link href="/careers" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Careers {">"}</Link>
          <Link href="/products" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Products {">"}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <OverviewSection />
      <HistorySection />
      <VisionSection />
      <ValuesSection />
      <StructureSection />
      <SegmentsSection />
      <TechSection />
      <GlobalSection />
      <SustainabilitySection />
      <CEOSection />
      <FutureSection />
      <CTASection />
    </>
  );
}
