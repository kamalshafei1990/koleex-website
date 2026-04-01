"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   About Hub — Cinematic hero + compact preview sections.
   No tabs, no sidebar, no internal nav. Pure storytelling.
   --------------------------------------------------------------------------- */

/* ── Animated Hero ── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 150); }, []);

  const s = (d: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 1s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms, transform 1s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms`,
  });

  return (
    <section className="relative bg-black min-h-[85vh] flex items-center justify-center text-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.02) 0%, transparent 50%)",
      }} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${10 + (i * 6.2) % 90}%`,
              animationDuration: `${16 + (i * 3.7) % 18}s`,
              animationDelay: `${(i * 2.3) % 12}s`,
            }}
          />
        ))}
      </div>

      {/* Orbs */}
      <div className="orb orb-silver w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2" />
      <div className="orb orb-white w-[400px] h-[400px] bottom-20 -right-32" style={{ animationDelay: "4s" }} />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-[700px]">
        <div style={s(100)}>
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-[12px] font-medium text-white/35 mb-8">
            Koleex International Group
          </span>
        </div>
        <h1 className="text-[60px] md:text-[96px] font-bold leading-[0.95] tracking-[-0.05em]" style={s(250)}>
          <span className="text-gradient-hero">About</span>
          <br />
          <span className="text-gradient-silver">Koleex</span>
        </h1>
        <p className="text-[18px] md:text-[22px] font-light leading-[1.5] text-white/35 mt-8 max-w-[500px] mx-auto" style={s(420)}>
          A global industrial technology company built on precision, innovation, and long-term partnerships.
        </p>
        {/* Scroll hint */}
        <div className="mt-14" style={s(600)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-white/15" style={{ animation: "bounce 2.5s infinite" }}>
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ── Compact Split Section: image + text ── */
function Preview({
  image, title, desc, href, flip = false, bg = "white",
}: {
  image: string; title: string; desc: string; href: string; flip?: boolean; bg?: "white" | "gray";
}) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className={`${bg === "gray" ? "bg-[#f5f5f7]" : "bg-white"} overflow-hidden`}>
      <div className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} min-h-[420px] md:min-h-[460px]`}>
        <div className="lg:w-[55%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src={image} alt={title} width={1200} height={800} className="w-full h-full object-cover min-h-[260px] lg:min-h-[460px]" />
        </div>
        <div className="lg:w-[45%] flex items-center px-8 md:px-14 lg:px-16 py-14 lg:py-0">
          <div className="max-w-[420px]">
            <h2 className="text-[32px] md:text-[44px] font-bold leading-[1.08] tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 120)}>
              {title}
            </h2>
            <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#86868b] mt-4" style={revealStyle(visible, 220)}>
              {desc}
            </p>
            <div className="mt-7" style={revealStyle(visible, 320)}>
              <Link href={href} className="inline-flex items-center gap-2 text-[15px] font-medium text-[#0066cc] hover:underline underline-offset-[3px] transition-colors duration-300">
                Know more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-px"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Vision: full-bleed overlay ── */
function VisionSection() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="relative min-h-[500px] flex items-center overflow-hidden">
      <Image src="/images/digital-globe.jpg" alt="Vision" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 max-w-[650px] mx-auto px-6 py-24 md:py-32 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/30 mb-5" style={revealStyle(visible, 0)}>Vision & Mission</p>
        <h2 className="text-[36px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] text-white" style={revealStyle(visible, 100)}>
          To shape a smarter industrial world.
        </h2>
        <p className="text-[16px] leading-[1.7] text-white/45 mt-5" style={revealStyle(visible, 200)}>
          Fusing innovation with heritage to deliver intelligent tools that shape progress across global markets and generations.
        </p>
        <div className="mt-8" style={revealStyle(visible, 300)}>
          <Link href="/about/vision-mission" className="inline-flex items-center gap-2 text-[15px] font-medium text-[#2997ff] hover:underline underline-offset-[3px]">
            Know more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Core Values: card grid ── */
function ValuesSection() {
  const { ref, visible } = useScrollReveal(0.06);
  const values = [
    { t: "Global Perspective", d: "Thinking beyond borders.", i: "⊕" },
    { t: "Smart Simplicity", d: "Clean, intuitive systems.", i: "◎" },
    { t: "Human Centered", d: "Designed for people.", i: "◇" },
    { t: "Integrity & Trust", d: "Guided by honesty.", i: "♡" },
    { t: "Legacy & Modernity", d: "Heritage meets future.", i: "□" },
    { t: "Innovation with Purpose", d: "Solving real problems.", i: "△" },
  ];

  return (
    <section ref={ref} className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[36px] md:text-[48px] font-bold leading-[1.08] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Core Values</h2>
          <p className="text-[16px] text-[#86868b] mt-3 max-w-[440px] mx-auto" style={revealStyle(visible, 80)}>
            The principles that guide every decision at Koleex.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <div key={v.t} className="bg-[#1d1d1f] rounded-[18px] p-6 hover:-translate-y-1 transition-transform duration-500" style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${160 + i * 50}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${160 + i * 50}ms`,
            }}>
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-[14px] font-semibold text-white leading-snug">{v.t}</h4>
                <span className="text-white/15 text-[18px]">{v.i}</span>
              </div>
              <p className="text-[12px] text-white/25">{v.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10" style={revealStyle(visible, 550)}>
          <Link href="/about/values" className="inline-flex items-center gap-2 text-[15px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">
            Know more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Business Segments: image cards ── */
function SegmentsSection() {
  const { ref, visible } = useScrollReveal(0.06);
  const items = [
    { t: "Manufacturing & Production", icon: "⚙️", img: "/images/factory-floor.jpg" },
    { t: "Smart Technologies", icon: "💻", img: "/images/circuit-board.jpg" },
    { t: "Global Trade", icon: "🌐", img: "/images/composites.jpg" },
    { t: "Strategic Investment", icon: "📈", img: "/images/modern-office.jpg" },
  ];

  return (
    <section ref={ref} className="bg-[#f5f5f7] py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[36px] md:text-[48px] font-bold leading-[1.08] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Business Segments</h2>
          <p className="text-[16px] text-[#86868b] mt-3 max-w-[440px] mx-auto" style={revealStyle(visible, 80)}>
            Four integrated pillars driving industrial innovation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((s, i) => (
            <div key={s.t} className="group rounded-[18px] overflow-hidden bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-500" style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${160 + i * 80}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${160 + i * 80}ms`,
            }}>
              <div className="h-[180px] overflow-hidden">
                <Image src={s.img} alt={s.t} width={800} height={400} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="p-5 flex items-center gap-3">
                <span className="text-lg">{s.icon}</span>
                <h3 className="text-[16px] font-bold text-[#1d1d1f]">{s.t}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10" style={revealStyle(visible, 550)}>
          <Link href="/about/business-segments" className="inline-flex items-center gap-2 text-[15px] font-medium text-[#0066cc] hover:underline underline-offset-[3px]">
            Know more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── CEO Quote ── */
function CEOSection() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="overflow-hidden" style={{ background: "linear-gradient(135deg, #111 0%, #1a1a1a 50%, #222 100%)" }}>
      <div className="flex flex-col lg:flex-row min-h-[440px]">
        <div className="lg:w-[55%] flex items-center px-8 md:px-14 lg:px-16 py-16">
          <div className="max-w-[480px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/20 mb-8" style={revealStyle(visible, 0)}>CEO Message</p>
            <blockquote className="text-[22px] md:text-[30px] font-semibold leading-[1.3] tracking-[-0.02em] text-white/75 italic" style={revealStyle(visible, 120)}>
              &ldquo;We are shaping the future of manufacturing — with trust, innovation, and responsibility at the core.&rdquo;
            </blockquote>
            <p className="text-[13px] text-white/25 mt-6" style={revealStyle(visible, 240)}>— The Leadership Team</p>
            <div className="mt-8" style={revealStyle(visible, 340)}>
              <Link href="/about/ceo-message" className="inline-flex items-center gap-2 text-[15px] font-medium text-[#2997ff] hover:underline underline-offset-[3px]">
                Know more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:w-[45%] overflow-hidden" style={revealStyle(visible, 80)}>
          <Image src="/images/team-office.jpg" alt="Leadership" width={1000} height={800} className="w-full h-full object-cover min-h-[320px] lg:min-h-[440px] grayscale opacity-70" />
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTASection() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#f5f5f7] text-center py-24 md:py-32">
      <div className="max-w-[550px] mx-auto px-6">
        <h2 className="text-[32px] md:text-[44px] font-bold leading-[1.1] tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
          Want to work with us?
        </h2>
        <p className="text-[16px] text-[#86868b] mt-3" style={revealStyle(visible, 80)}>
          Partnerships, solutions, or career opportunities.
        </p>
        <div className="flex items-center justify-center gap-7 mt-8" style={revealStyle(visible, 160)}>
          <Link href="/contact" className="text-[16px] text-[#0066cc] hover:underline underline-offset-[3px]">Contact us {">"}</Link>
          <Link href="/careers" className="text-[16px] text-[#0066cc] hover:underline underline-offset-[3px]">Careers {">"}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ PAGE ═══ */
export default function AboutPage() {
  return (
    <>
      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Company Overview */}
      <Preview
        image="/images/factory-floor.jpg"
        title="Company Overview"
        desc="A technology-driven industrial company focused on precision machinery, automation systems, and integrated solutions for manufacturing sectors worldwide."
        href="/about"
      />

      {/* 3. History & Heritage */}
      <Preview
        image="/images/solar-panels.jpg"
        title="History & Heritage"
        desc="From a family tradition into a global name — driven by integrity, precision, and a deep respect for the past that shapes our future."
        href="/about/history"
        flip
        bg="gray"
      />

      {/* 4. Vision & Mission */}
      <VisionSection />

      {/* 5. Core Values */}
      <ValuesSection />

      {/* 6. Corporate Structure */}
      <Preview
        image="/images/modern-office.jpg"
        title="Corporate Structure"
        desc="Defined leadership roles and clear responsibilities — empowering teams to innovate and operate with precision and agility."
        href="/about/corporate-structure"
        bg="gray"
      />

      {/* 7. Business Segments */}
      <SegmentsSection />

      {/* 8. Technology & Innovation */}
      <Preview
        image="/images/circuit-board.jpg"
        title="Technology & Innovation"
        desc="Designing intelligent solutions that power machines, software, and systems to achieve precision and future-ready performance."
        href="/about/technology"
        flip
      />

      {/* 9. Global Presence */}
      <Preview
        image="/images/digital-globe.jpg"
        title="Global Presence"
        desc="Operating across multiple continents, establishing strong partnerships in the world's leading industrial markets."
        href="/about/global-presence"
        bg="gray"
      />

      {/* 10. Sustainability */}
      <Preview
        image="/images/wind-turbines.jpg"
        title="Social Responsibility"
        desc="Creating impact beyond industry — promoting fairness, education, and community empowerment in every region we operate."
        href="/about/sustainability"
        flip
      />

      {/* 11. CEO Message */}
      <CEOSection />

      {/* 12. Future Outlook */}
      <Preview
        image="/images/hero-robot.jpg"
        title="Future Outlook"
        desc="Manufacturing innovation, digital integration, regional expansion — building the next chapter of industrial technology."
        href="/about/future-outlook"
        bg="gray"
      />

      {/* 13. CTA */}
      <CTASection />
    </>
  );
}
