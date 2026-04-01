"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";
import { stories } from "@/data/stories";

/* ---------------------------------------------------------------------------
   StaticHome — The existing hardcoded homepage content.
   Used as fallback when Supabase CMS data is unavailable.
   --------------------------------------------------------------------------- */

const storyImages = ["/images/materials-lab.jpg", "/images/factory-floor.jpg", "/images/digital-globe.jpg"];

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 150); }, []);
  const s = (d: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms`,
  });

  return (
    <section className="bg-[#f5f5f7] text-center overflow-hidden">
      <div className="pt-14 md:pt-20 px-6">
        <h2 className="text-[56px] md:text-[80px] font-semibold leading-[1.03] tracking-[-0.045em] text-[#1d1d1f]" style={s(50)}>
          KX-9000 Series
        </h2>
        <p className="text-[19px] md:text-[28px] font-normal leading-[1.14] tracking-[-0.016em] text-[#6e6e73] mt-1.5" style={s(150)}>
          Precision in motion. Power in every axis.
        </p>
        <div className="flex items-center justify-center gap-5 mt-4" style={s(250)}>
          <Link href="/products/industrial-technology" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
          <Link href="/contact" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Contact sales {">"}</Link>
        </div>
      </div>
      <div className="mt-2" style={s(350)}>
        <Image src="/images/hero-hand-trimmed.jpg" alt="KX-9000 Series" width={735} height={674} className="w-full h-auto block max-w-[980px] mx-auto" priority />
      </div>
    </section>
  );
}

function CompanyIntro() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-black text-center overflow-hidden">
      <div className="pt-20 md:pt-28 px-6 max-w-[800px] mx-auto">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/25 mb-5" style={revealStyle(visible, 0)}>About Koleex</p>
        <h2 className="text-[36px] md:text-[56px] font-semibold leading-[1.06] tracking-[-0.035em] text-white" style={revealStyle(visible, 80)}>Engineering What Matters.</h2>
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

function FeaturedProduct() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-white text-center overflow-hidden">
      <div className="pt-20 md:pt-28 px-6">
        <h2 className="text-[56px] md:text-[80px] font-semibold leading-[1.03] tracking-[-0.045em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Smart Machines</h2>
        <p className="text-[21px] md:text-[28px] font-normal leading-[1.14] tracking-[-0.016em] text-[#6e6e73] mt-2" style={revealStyle(visible, 80)}>Intelligent. Automated. Built to perform.</p>
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

function Solutions() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#f5f5f7] text-center overflow-hidden">
      <div className="pt-20 md:pt-28 px-6">
        <h2 className="text-[56px] md:text-[80px] font-semibold leading-[1.03] tracking-[-0.045em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Solutions</h2>
        <p className="text-[21px] md:text-[28px] font-normal leading-[1.14] tracking-[-0.016em] text-[#6e6e73] mt-2" style={revealStyle(visible, 80)}>Engineered for your industry.</p>
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

function GlobalPresence() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-white text-center py-24 md:py-32 overflow-hidden">
      <div className="max-w-[700px] mx-auto px-6">
        <h2 className="text-[48px] md:text-[64px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Global reach.</h2>
        <p className="text-[17px] md:text-[21px] font-normal leading-[1.4] text-[#6e6e73] mt-3" style={revealStyle(visible, 80)}>Serving customers across key industrial markets worldwide.</p>
        <div className="mt-8" style={revealStyle(visible, 160)}>
          <Link href="/about/global-presence" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
        </div>
      </div>
    </section>
  );
}

function StoriesSection() {
  const { ref, visible } = useScrollReveal(0.06);
  return (
    <section ref={ref} className="bg-[#f5f5f7] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-[48px] md:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Latest Stories.</h2>
          <Link href="/stories" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px] hidden sm:block pb-2" style={revealStyle(visible, 80)}>View all {">"}</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stories.slice(0, 3).map((story, i) => (
            <Link key={story.slug} href={`/stories/${story.slug}`} className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-500" style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${160 + i * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${160 + i * 80}ms`,
            }}>
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

function CTA() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-white text-center py-20 md:py-28 overflow-hidden">
      <div className="max-w-[680px] mx-auto px-6">
        <h2 className="text-[48px] md:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>Get in touch.</h2>
        <p className="text-[17px] md:text-[21px] font-normal leading-[1.4] text-[#6e6e73] mt-2" style={revealStyle(visible, 80)}>Talk to a specialist about solutions for your business.</p>
        <div className="flex items-center justify-center gap-6 mt-6" style={revealStyle(visible, 160)}>
          <Link href="/contact" className="text-[21px] text-[#0066cc] hover:underline underline-offset-[3px]">Contact us {">"}</Link>
          <Link href="/contact" className="text-[21px] text-[#0066cc] hover:underline underline-offset-[3px]">Request quotation {">"}</Link>
        </div>
      </div>
    </section>
  );
}

export function StaticHome() {
  return (
    <>
      <Hero />
      <CompanyIntro />
      <FeaturedProduct />
      <Solutions />
      <GlobalPresence />
      <StoriesSection />
      <CTA />
    </>
  );
}
