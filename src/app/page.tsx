"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";
import { stories } from "@/data/stories";

/* ---------------------------------------------------------------------------
   Homepage — Large full-width cinematic sections.
   Apple layout philosophy: big type, full-bleed images, minimal text,
   alternating dark/light backgrounds, generous spacing.
   --------------------------------------------------------------------------- */

const storyImages = ["/images/materials-lab.jpg", "/images/factory-floor.jpg", "/images/digital-globe.jpg"];

/* ═══ 1. HERO — Full screen, white, centered text + image ═══ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 150); }, []);
  const s = (d: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms`,
  });

  return (
    <section className="bg-white text-center overflow-hidden">
      <div className="pt-16 md:pt-24 px-6">
        <h1 className="text-[56px] md:text-[80px] font-semibold leading-[1.03] tracking-[-0.045em] text-[#1d1d1f]" style={s(50)}>
          KX-9000 Series
        </h1>
        <p className="text-[21px] md:text-[28px] font-normal leading-[1.14] tracking-[-0.016em] text-[#6e6e73] mt-2" style={s(150)}>
          Precision in motion. Power in every axis.
        </p>
        <div className="flex items-center justify-center gap-4 mt-5" style={s(250)}>
          <Link href="/products" className="inline-flex items-center justify-center h-[44px] px-7 text-[17px] font-normal rounded-full bg-[#1d1d1f] text-white hover:bg-black transition-colors duration-300">
            Explore Products
          </Link>
          <Link href="/solutions" className="inline-flex items-center justify-center h-[44px] px-7 text-[17px] font-normal rounded-full border border-[#1d1d1f] text-[#1d1d1f] hover:bg-[#1d1d1f]/5 transition-colors duration-300">
            Our Solutions
          </Link>
        </div>
      </div>
      <div className="mt-6" style={s(380)}>
        <Image src="/images/hero-hand-trimmed.jpg" alt="KX-9000 Series" width={1960} height={1080} className="w-full max-w-[980px] mx-auto h-auto block" priority />
      </div>
    </section>
  );
}

/* ═══ 2. COMPANY INTRO — Dark, centered text + full-bleed image ═══ */
function CompanyIntro() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-black text-center overflow-hidden">
      <div className="pt-20 md:pt-28 px-6 max-w-[800px] mx-auto">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/25 mb-5" style={revealStyle(visible, 0)}>About Koleex</p>
        <h2 className="text-[36px] md:text-[56px] font-semibold leading-[1.06] tracking-[-0.035em] text-white" style={revealStyle(visible, 80)}>
          Engineering What Matters.
        </h2>
        <p className="text-[17px] md:text-[21px] font-normal leading-[1.5] text-white/40 mt-5 max-w-[580px] mx-auto" style={revealStyle(visible, 180)}>
          A global industrial technology company delivering precision machinery, automation systems, and smart solutions to manufacturers worldwide.
        </p>
        <div className="mt-6" style={revealStyle(visible, 280)}>
          <Link href="/about" className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
        </div>
      </div>
      <div className="mt-10" style={revealStyle(visible, 380)}>
        <Image src="/images/factory-floor.jpg" alt="Koleex Operations" width={2560} height={1200} className="w-full h-auto block" />
      </div>
    </section>
  );
}

/* ═══ 3. DIVISIONS — Light gray, 2×2 tile grid ═══ */
function Divisions() {
  const { ref, visible } = useScrollReveal(0.05);
  const items = [
    { t: "Industrial Machinery", sub: "Precision equipment for manufacturing.", img: "/images/factory-floor.jpg", dark: false },
    { t: "Automation Systems", sub: "Smart production lines.", img: "/images/hero-robot.jpg", dark: false },
    { t: "Technology Solutions", sub: "Software, IoT & digital tools.", img: "/images/circuit-board.jpg", dark: true },
    { t: "Parts & Service", sub: "Global after-sales support.", img: "/images/composites.jpg", dark: true },
  ];

  return (
    <section ref={ref} className="px-3 py-3 bg-[#f5f5f7]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((tile, i) => (
          <div
            key={tile.t}
            className={`${tile.dark ? "bg-black" : "bg-white"} text-center overflow-hidden`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms`,
            }}
          >
            <div className="pt-10 md:pt-14 px-6">
              <h2 className={`text-[36px] md:text-[48px] font-semibold leading-[1.05] tracking-[-0.035em] ${tile.dark ? "text-white" : "text-[#1d1d1f]"}`}>
                {tile.t}
              </h2>
              <p className={`text-[17px] md:text-[21px] font-normal mt-1 ${tile.dark ? "text-[#86868b]" : "text-[#6e6e73]"}`}>
                {tile.sub}
              </p>
              <div className="mt-3">
                <Link href="/products" className={`text-[17px] ${tile.dark ? "text-[#2997ff]" : "text-[#0066cc]"} hover:underline underline-offset-[3px]`}>
                  Learn more {">"}
                </Link>
              </div>
            </div>
            <div className="mt-5">
              <Image src={tile.img} alt={tile.t} width={1200} height={800} className="w-full h-[260px] md:h-[340px] object-cover" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══ 4. FEATURED PRODUCT — White, full-bleed hero ═══ */
function FeaturedProduct() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-white text-center overflow-hidden">
      <div className="pt-20 md:pt-28 px-6">
        <h2 className="text-[56px] md:text-[80px] font-semibold leading-[1.03] tracking-[-0.045em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
          Smart Machines
        </h2>
        <p className="text-[21px] md:text-[28px] font-normal leading-[1.14] tracking-[-0.016em] text-[#6e6e73] mt-2" style={revealStyle(visible, 80)}>
          Intelligent. Automated. Built to perform.
        </p>
        <div className="flex items-center justify-center gap-5 mt-4" style={revealStyle(visible, 160)}>
          <Link href="/products" className="text-[21px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
          <Link href="/contact" className="text-[21px] text-[#0066cc] hover:underline underline-offset-[3px]">Contact sales {">"}</Link>
        </div>
      </div>
      <div className="mt-8" style={revealStyle(visible, 260)}>
        <Image src="/images/hero-robot.jpg" alt="Smart Machines" width={2560} height={1440} className="w-full h-auto block" />
      </div>
    </section>
  );
}

/* ═══ 5. TECHNOLOGY — Dark, text left + glass cards right ═══ */
function Technology() {
  const { ref, visible } = useScrollReveal(0.06);
  const features = ["Smart Automation", "Industrial IoT", "AI-Powered Systems", "Precision Engineering", "Digital Solutions", "Predictive Analytics"];
  return (
    <section ref={ref} className="bg-black py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-[45%]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/20 mb-5" style={revealStyle(visible, 0)}>Technology & Innovation</p>
            <h2 className="text-[40px] md:text-[56px] font-semibold leading-[1.06] tracking-[-0.035em] text-white" style={revealStyle(visible, 80)}>
              Driven by Innovation.
            </h2>
            <p className="text-[17px] leading-[1.65] text-white/30 mt-5" style={revealStyle(visible, 180)}>
              We design intelligent solutions that power machines, software, and systems for future-ready industrial performance.
            </p>
            <div className="mt-8" style={revealStyle(visible, 280)}>
              <Link href="/about/technology" className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">Explore technology {">"}</Link>
            </div>
          </div>
          <div className="lg:w-[55%] grid grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f, i) => (
              <div key={f} className="rounded-[14px] bg-white/[0.04] border border-white/[0.05] px-5 py-6 text-center hover:bg-white/[0.07] hover:border-white/[0.10] transition-all duration-400" style={{
                opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.92)",
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${220 + i * 50}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${220 + i * 50}ms`,
              }}>
                <p className="text-[13px] font-medium text-white/45">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ 6. SOLUTIONS — Light gray, full-bleed ═══ */
function Solutions() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#f5f5f7] text-center overflow-hidden">
      <div className="pt-20 md:pt-28 px-6">
        <h2 className="text-[56px] md:text-[80px] font-semibold leading-[1.03] tracking-[-0.045em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
          Solutions
        </h2>
        <p className="text-[21px] md:text-[28px] font-normal leading-[1.14] tracking-[-0.016em] text-[#6e6e73] mt-2" style={revealStyle(visible, 80)}>
          Engineered for your industry.
        </p>
        <div className="mt-4" style={revealStyle(visible, 160)}>
          <Link href="/solutions" className="text-[21px] text-[#0066cc] hover:underline underline-offset-[3px]">Explore solutions {">"}</Link>
        </div>
      </div>
      <div className="mt-8 max-w-[1000px] mx-auto px-4" style={revealStyle(visible, 260)}>
        <Image src="/images/solar-panels.jpg" alt="Solutions" width={2000} height={1125} className="w-full h-auto block" />
      </div>
    </section>
  );
}

/* ═══ 7. GLOBAL PRESENCE — White, centered ═══ */
function GlobalPresence() {
  const { ref, visible } = useScrollReveal(0.1);
  const regions = ["Middle East", "Europe", "Asia", "Americas", "Africa"];
  return (
    <section ref={ref} className="bg-white text-center py-24 md:py-32 overflow-hidden">
      <div className="max-w-[700px] mx-auto px-6">
        <h2 className="text-[48px] md:text-[64px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
          Global reach.
        </h2>
        <p className="text-[17px] md:text-[21px] font-normal leading-[1.4] text-[#6e6e73] mt-3" style={revealStyle(visible, 80)}>
          Serving customers across key industrial markets worldwide.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5 mt-10">
          {regions.map((r, i) => (
            <span key={r} className="px-5 py-2 text-[13px] font-medium text-[#6e6e73] bg-[#f5f5f7] rounded-full" style={{
              opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${200 + i * 50}ms`,
            }}>{r}</span>
          ))}
        </div>
        <div className="mt-8" style={revealStyle(visible, 500)}>
          <Link href="/about/global-presence" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ 8. STORIES — Light gray, 3-column cards ═══ */
function Stories() {
  const { ref, visible } = useScrollReveal(0.06);
  return (
    <section ref={ref} className="bg-[#f5f5f7] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-[48px] md:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
            Latest Stories.
          </h2>
          <Link href="/stories" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px] hidden sm:block pb-2" style={revealStyle(visible, 80)}>
            View all {">"}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stories.slice(0, 3).map((story, i) => (
            <Link
              key={story.slug}
              href={`/stories/${story.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${160 + i * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${160 + i * 80}ms`,
              }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <Image src={storyImages[i]} alt={story.title} width={800} height={500} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="p-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#6e6e73] mb-1.5">{story.category}</p>
                <h3 className="text-[17px] font-semibold leading-[1.23] text-[#1d1d1f]">{story.title}</h3>
                <p className="text-[14px] leading-[1.43] text-[#6e6e73] mt-1.5 line-clamp-2">{story.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ 9. CTA — White, centered ═══ */
function CTA() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-white text-center py-20 md:py-28 overflow-hidden">
      <div className="max-w-[680px] mx-auto px-6">
        <h2 className="text-[48px] md:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
          Get in touch.
        </h2>
        <p className="text-[17px] md:text-[21px] font-normal leading-[1.4] text-[#6e6e73] mt-2" style={revealStyle(visible, 80)}>
          Talk to a specialist about solutions for your business.
        </p>
        <div className="flex items-center justify-center gap-6 mt-6" style={revealStyle(visible, 160)}>
          <Link href="/contact" className="text-[21px] text-[#0066cc] hover:underline underline-offset-[3px]">Contact us {">"}</Link>
          <Link href="/contact" className="text-[21px] text-[#0066cc] hover:underline underline-offset-[3px]">Become a partner {">"}</Link>
          <Link href="/contact" className="text-[21px] text-[#0066cc] hover:underline underline-offset-[3px]">Request quotation {">"}</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ PAGE ═══ */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanyIntro />
      <Divisions />
      <FeaturedProduct />
      <Technology />
      <Solutions />
      <GlobalPresence />
      <Stories />
      <CTA />
    </>
  );
}
