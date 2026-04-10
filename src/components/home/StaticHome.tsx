"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";
import { stories } from "@/data/stories";

/* ---------------------------------------------------------------------------
   StaticHome — Apple.com-style 11-section homepage.

   Rhythm: light → white(2-col) → white(2-col) → black → white(2-col)
         → light(stats) → image(solutions) → black(innovation)
         → dark(quote) → light(stories) → white(cta)

   Used as the fallback when Supabase CMS data is unavailable. Matching CMS
   sections are seeded via scripts/seed-home.ts so everything is editable
   from /admin.
   --------------------------------------------------------------------------- */

/* ═══════════════════════════════════════════════════════════════════════════
   1. HERO — Light bg, large title "KX-9000 Series" + product image
   ═══════════════════════════════════════════════════════════════════════════ */

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 150);
  }, []);
  const s = (d: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${d}ms`,
  });

  return (
    <section className="bg-[#f5f5f7] text-center overflow-hidden">
      <div className="pt-14 md:pt-20 px-6">
        <h2
          className="text-[56px] md:text-[80px] font-semibold leading-[1.03] tracking-[-0.045em] text-[#1d1d1f]"
          style={s(50)}
        >
          KX-9000 Series
        </h2>
        <p
          className="text-[19px] md:text-[28px] font-normal leading-[1.14] tracking-[-0.016em] text-[#6e6e73] mt-1.5"
          style={s(150)}
        >
          Precision in motion. Power in every axis.
        </p>
        <div
          className="flex items-center justify-center gap-5 mt-4"
          style={s(250)}
        >
          <Link
            href="/products/industrial-technology"
            className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]"
          >
            Learn more {">"}
          </Link>
          <Link
            href="/contact"
            className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]"
          >
            Contact sales {">"}
          </Link>
        </div>
      </div>
      <div className="mt-2" style={s(350)}>
        <Image
          src="/images/hero-hand-trimmed.jpg"
          alt="KX-9000 Series"
          width={735}
          height={674}
          className="w-full h-auto block max-w-[980px] mx-auto"
          priority
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT CARD ROW — Reusable Apple-style 2-col card grid
   ═══════════════════════════════════════════════════════════════════════════ */

interface ProductCardData {
  variant: "dark" | "light";
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image: string;
  imageAlt: string;
}

function ProductCardRow({
  left,
  right,
  id,
}: {
  left: ProductCardData;
  right: ProductCardData;
  id?: string;
}) {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section
      ref={ref}
      id={id}
      className="bg-white overflow-hidden px-2 md:px-3 py-2 md:py-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 max-w-none">
        <div style={revealStyle(visible, 0)}>
          <ProductCard data={left} />
        </div>
        <div style={revealStyle(visible, 120)}>
          <ProductCard data={right} />
        </div>
      </div>
    </section>
  );
}

function ProductCard({ data }: { data: ProductCardData }) {
  const isDark = data.variant === "dark";
  const titleColor = isDark ? "text-white" : "text-[#1d1d1f]";
  const subColor = isDark ? "text-white/65" : "text-[#6e6e73]";
  const linkColor = isDark
    ? "text-[#2997ff] hover:text-[#5cb0ff]"
    : "text-[#0066cc] hover:text-[#0077ed]";
  const bg = isDark ? "bg-[#1d1d1f]" : "bg-[#f5f5f7]";

  return (
    <article
      className={`relative flex h-[560px] md:h-[640px] flex-col overflow-hidden rounded-[22px] ${bg}`}
    >
      {/* Text block */}
      <div className="relative z-10 pt-12 md:pt-16 px-6 md:px-10 text-center">
        {data.eyebrow && (
          <p
            className={`text-[12px] font-semibold uppercase tracking-[0.14em] mb-3 ${
              isDark ? "text-white/40" : "text-[#6e6e73]"
            }`}
          >
            {data.eyebrow}
          </p>
        )}
        <h3
          className={`text-[32px] md:text-[44px] font-semibold leading-[1.08] tracking-[-0.025em] ${titleColor}`}
        >
          {data.title}
        </h3>
        <p
          className={`text-[17px] md:text-[21px] font-normal leading-[1.24] mt-2 ${subColor}`}
        >
          {data.subtitle}
        </p>
        <div className="flex items-center justify-center gap-5 mt-4">
          <Link
            href={data.primaryHref}
            className={`text-[17px] underline-offset-[3px] hover:underline ${linkColor}`}
          >
            {data.primaryLabel} {">"}
          </Link>
          {data.secondaryLabel && data.secondaryHref && (
            <Link
              href={data.secondaryHref}
              className={`text-[17px] underline-offset-[3px] hover:underline ${linkColor}`}
            >
              {data.secondaryLabel} {">"}
            </Link>
          )}
        </div>
      </div>

      {/* Image block */}
      <div className="relative mt-auto w-full flex-1 min-h-[220px]">
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. COMPANY BANNER — Black, "Engineering What Matters." + factory image
   ═══════════════════════════════════════════════════════════════════════════ */

function CompanyBanner() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-black text-center overflow-hidden">
      <div className="pt-20 md:pt-28 px-6 max-w-[800px] mx-auto">
        <p
          className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/25 mb-5"
          style={revealStyle(visible, 0)}
        >
          About Koleex
        </p>
        <h2
          className="text-[36px] md:text-[56px] font-semibold leading-[1.06] tracking-[-0.035em] text-white"
          style={revealStyle(visible, 80)}
        >
          Engineering What Matters.
        </h2>
        <p
          className="text-[17px] md:text-[21px] font-normal leading-[1.5] text-white/50 mt-5 max-w-[580px] mx-auto"
          style={revealStyle(visible, 180)}
        >
          A global industrial technology company delivering precision
          machinery, automation systems, and smart solutions to manufacturers
          worldwide.
        </p>
        <div
          className="flex items-center justify-center gap-5 mt-6"
          style={revealStyle(visible, 280)}
        >
          <Link
            href="/about"
            className="text-[17px] text-[#2997ff] hover:text-[#5cb0ff] underline-offset-[3px] hover:underline"
          >
            Our story {">"}
          </Link>
          <Link
            href="/about#leadership"
            className="text-[17px] text-[#2997ff] hover:text-[#5cb0ff] underline-offset-[3px] hover:underline"
          >
            Leadership {">"}
          </Link>
        </div>
      </div>
      <div className="mt-12" style={revealStyle(visible, 380)}>
        <Image
          src="/images/factory-floor.jpg"
          alt="Koleex Operations"
          width={2560}
          height={1200}
          className="w-full h-auto block"
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. STATS ROW — Light bg, 4 large numbers
   ═══════════════════════════════════════════════════════════════════════════ */

const stats = [
  { value: "40+", label: "Countries" },
  { value: "12K+", label: "Employees" },
  { value: "8", label: "R&D Centers" },
  { value: "$4.2B", label: "Revenue" },
];

function StatsRow() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section
      ref={ref}
      className="bg-[#f5f5f7] text-center py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto px-6">
        <p
          className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6e6e73] mb-3"
          style={revealStyle(visible, 0)}
        >
          Global Scale
        </p>
        <h2
          className="text-[40px] md:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]"
          style={revealStyle(visible, 80)}
        >
          A worldwide footprint.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 mt-14 md:mt-20">
          {stats.map((stat, i) => (
            <div key={stat.label} style={revealStyle(visible, 160 + i * 80)}>
              <p className="text-[56px] md:text-[80px] font-semibold leading-[1] tracking-[-0.04em] text-[#1d1d1f]">
                {stat.value}
              </p>
              <p className="text-[14px] md:text-[17px] font-medium text-[#6e6e73] mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. SOLUTIONS — Full-image with gradient overlay + text
   ═══════════════════════════════════════════════════════════════════════════ */

function SolutionsBanner() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="relative w-full h-[560px] md:h-[720px]">
        <Image
          src="/images/solar-panels.jpg"
          alt="Clean power at scale"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,transparent_35%,transparent_60%,rgba(0,0,0,0.55)_100%)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p
            className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80"
            style={revealStyle(visible, 0)}
          >
            Solutions
          </p>
          <h2
            className="text-[44px] md:text-[72px] font-semibold leading-[1.05] tracking-[-0.04em] text-white mt-3 max-w-[880px]"
            style={revealStyle(visible, 80)}
          >
            Clean power, at planetary scale.
          </h2>
          <p
            className="text-[17px] md:text-[21px] font-normal leading-[1.4] text-white/85 mt-4 max-w-[640px]"
            style={revealStyle(visible, 180)}
          >
            Integrated renewable generation, storage, and grid intelligence —
            designed and delivered as one.
          </p>
          <div
            className="flex items-center justify-center gap-5 mt-6"
            style={revealStyle(visible, 280)}
          >
            <Link
              href="/solutions"
              className="text-[17px] text-white underline-offset-[3px] hover:underline"
            >
              Explore solutions {">"}
            </Link>
            <Link
              href="/contact"
              className="text-[17px] text-white underline-offset-[3px] hover:underline"
            >
              Talk to an engineer {">"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. INNOVATION CARDS — Black, 6 icon cards
   ═══════════════════════════════════════════════════════════════════════════ */

const innovations = [
  {
    icon: "⚙",
    title: "Precision Engineering",
    description:
      "Micron-scale tolerances and five-axis machining for demanding production.",
  },
  {
    icon: "⚡",
    title: "Energy Intelligence",
    description:
      "Battery chemistry, power electronics, and grid software for a renewable future.",
  },
  {
    icon: "🧠",
    title: "Applied AI",
    description:
      "Vision systems, predictive models, and digital twins that learn every shift.",
  },
  {
    icon: "🔬",
    title: "Materials Science",
    description:
      "Composites, ceramics, and polymers engineered for extreme environments.",
  },
  {
    icon: "🛡",
    title: "Industrial Security",
    description:
      "Zero-trust platforms protecting operational technology end-to-end.",
  },
  {
    icon: "🌐",
    title: "Connected Operations",
    description:
      "Edge to cloud telemetry at the scale of global manufacturing networks.",
  },
];

function InnovationCards() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section
      ref={ref}
      className="bg-black text-center py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto px-6">
        <p
          className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#2997ff] mb-3"
          style={revealStyle(visible, 0)}
        >
          Innovation
        </p>
        <h2
          className="text-[40px] md:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-white"
          style={revealStyle(visible, 80)}
        >
          Driven by innovation.
        </h2>
        <p
          className="text-[17px] md:text-[21px] font-normal leading-[1.45] text-white/55 mt-4 max-w-[640px] mx-auto"
          style={revealStyle(visible, 180)}
        >
          Six disciplines. One integrated stack. Decades of compounding
          investment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-14 md:mt-20 text-left">
          {innovations.map((item, i) => (
            <div
              key={item.title}
              className="rounded-[18px] border border-white/10 bg-white/[0.03] p-7 md:p-8 hover:bg-white/[0.06] transition-colors duration-500"
              style={revealStyle(visible, 240 + i * 80)}
            >
              <div className="text-[28px] mb-5">{item.icon}</div>
              <h3 className="text-[19px] font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-[14px] leading-[1.45] text-white/55 mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   9. CUSTOMER QUOTE — Dark, large testimonial
   ═══════════════════════════════════════════════════════════════════════════ */

function CustomerQuote() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section
      ref={ref}
      className="bg-[#0a0a0a] text-center py-28 md:py-40 overflow-hidden"
    >
      <div className="max-w-[880px] mx-auto px-6">
        <svg
          aria-hidden="true"
          viewBox="0 0 40 32"
          className="mx-auto mb-8 h-7 w-9 text-white/25"
          style={revealStyle(visible, 0)}
        >
          <path
            fill="currentColor"
            d="M10.8 0C4.83 0 0 4.83 0 10.8V32h14.4V14.4H6.48C6.48 9.48 10.36 5.6 15.28 5.6V0Zm24 0c-5.97 0-10.8 4.83-10.8 10.8V32H38.4V14.4h-7.92c0-4.92 3.88-8.8 8.8-8.8V0Z"
          />
        </svg>
        <blockquote
          className="text-[28px] md:text-[44px] font-semibold leading-[1.12] tracking-[-0.025em] text-white"
          style={revealStyle(visible, 100)}
        >
          &ldquo;Koleex didn&rsquo;t just sell us equipment. They engineered
          the future of our factory with us — machine by machine, line by
          line.&rdquo;
        </blockquote>
        <footer className="mt-10" style={revealStyle(visible, 260)}>
          <p className="text-[15px] md:text-[17px] font-semibold text-white">
            Maria Ivanova
          </p>
          <p className="text-[13px] md:text-[15px] text-white/50 mt-1">
            VP of Operations, Northwind Industrial
          </p>
        </footer>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   10. STORIES — Light bg, 3-up grid
   ═══════════════════════════════════════════════════════════════════════════ */

const storyImages = [
  "/images/materials-lab.jpg",
  "/images/factory-floor.jpg",
  "/images/digital-globe.jpg",
];

function StoriesSection() {
  const { ref, visible } = useScrollReveal(0.06);
  return (
    <section
      ref={ref}
      className="bg-[#f5f5f7] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <p
              className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6e6e73] mb-3"
              style={revealStyle(visible, 0)}
            >
              Latest
            </p>
            <h2
              className="text-[40px] md:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]"
              style={revealStyle(visible, 80)}
            >
              Stories from our teams.
            </h2>
          </div>
          <Link
            href="/stories"
            className="text-[17px] text-[#0066cc] hover:text-[#0077ed] underline-offset-[3px] hover:underline hidden sm:block pb-2"
            style={revealStyle(visible, 160)}
          >
            View all {">"}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {stories.slice(0, 3).map((story, i) => (
            <Link
              key={story.slug}
              href={`/stories/${story.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${240 + i * 100}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${240 + i * 100}ms`,
              }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <Image
                  src={storyImages[i]}
                  alt={story.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="p-6 md:p-7">
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#0066cc] mb-2">
                  {story.category}
                </p>
                <h3 className="text-[19px] md:text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#1d1d1f]">
                  {story.title}
                </h3>
                <p className="text-[14px] md:text-[15px] leading-[1.45] text-[#6e6e73] mt-2 line-clamp-3">
                  {story.excerpt}
                </p>
                <span className="inline-block text-[14px] font-medium text-[#0066cc] mt-4 group-hover:translate-x-1 transition-transform duration-500">
                  Read more {">"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   11. CTA — White, Get in touch
   ═══════════════════════════════════════════════════════════════════════════ */

function CTA() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section
      ref={ref}
      className="bg-white text-center py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[720px] mx-auto px-6">
        <h2
          className="text-[48px] md:text-[64px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]"
          style={revealStyle(visible, 0)}
        >
          Get in touch.
        </h2>
        <p
          className="text-[17px] md:text-[21px] font-normal leading-[1.4] text-[#6e6e73] mt-3"
          style={revealStyle(visible, 80)}
        >
          Talk to a specialist about solutions for your business.
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-6 mt-8"
          style={revealStyle(visible, 160)}
        >
          <Link
            href="/contact"
            className="text-[17px] md:text-[21px] text-[#0066cc] hover:text-[#0077ed] underline-offset-[3px] hover:underline"
          >
            Contact sales {">"}
          </Link>
          <Link
            href="/contact"
            className="text-[17px] md:text-[21px] text-[#0066cc] hover:text-[#0077ed] underline-offset-[3px] hover:underline"
          >
            Request quotation {">"}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Product card data — six cards across three 2-column rows
   ═══════════════════════════════════════════════════════════════════════════ */

const smartMachines: ProductCardData = {
  variant: "dark",
  eyebrow: "Industrial Technology",
  title: "Smart Machines",
  subtitle: "Intelligent. Automated. Built to perform.",
  primaryLabel: "Learn more",
  primaryHref: "/products/industrial-technology",
  secondaryLabel: "Contact sales",
  secondaryHref: "/contact",
  image: "/images/hero-robot.jpg",
  imageAlt: "Smart machines — industrial robotics",
};

const automationSystems: ProductCardData = {
  variant: "light",
  eyebrow: "Industrial Technology",
  title: "Automation Systems",
  subtitle: "Process control, from line to enterprise.",
  primaryLabel: "Learn more",
  primaryHref: "/products/industrial-technology/process-control",
  secondaryLabel: "Get a quote",
  secondaryHref: "/contact",
  image: "/images/modern-office.jpg",
  imageAlt: "Automation systems — control rooms",
};

const advancedMaterials: ProductCardData = {
  variant: "light",
  eyebrow: "Advanced Materials",
  title: "Advanced Materials",
  subtitle: "Composites and polymers for extremes.",
  primaryLabel: "Learn more",
  primaryHref: "/products/advanced-materials",
  secondaryLabel: "Talk to an engineer",
  secondaryHref: "/contact",
  image: "/images/composites.jpg",
  imageAlt: "Advanced composites and polymers",
};

const digitalSolutions: ProductCardData = {
  variant: "dark",
  eyebrow: "Digital Solutions",
  title: "Digital Solutions",
  subtitle: "Connected platforms. Applied AI. Secure.",
  primaryLabel: "Learn more",
  primaryHref: "/products/digital-solutions",
  secondaryLabel: "Request demo",
  secondaryHref: "/contact",
  image: "/images/circuit-board.jpg",
  imageAlt: "Digital solutions — IoT and AI",
};

const energySystems: ProductCardData = {
  variant: "light",
  eyebrow: "Energy Systems",
  title: "Energy Systems",
  subtitle: "Generation, storage, and grid intelligence.",
  primaryLabel: "Learn more",
  primaryHref: "/products/energy-systems",
  secondaryLabel: "Get a quote",
  secondaryHref: "/contact",
  image: "/images/wind-turbines.jpg",
  imageAlt: "Energy systems — wind turbines",
};

const precisionInstruments: ProductCardData = {
  variant: "dark",
  eyebrow: "Precision Instruments",
  title: "Precision Instruments",
  subtitle: "Lab and field metrology engineered for certainty.",
  primaryLabel: "Learn more",
  primaryHref: "/products/industrial-technology/precision-instruments",
  secondaryLabel: "Request demo",
  secondaryHref: "/contact",
  image: "/images/materials-lab.jpg",
  imageAlt: "Precision instruments — lab metrology",
};

/* ═══════════════════════════════════════════════════════════════════════════
   StaticHome — 11-section composition
   ═══════════════════════════════════════════════════════════════════════════ */

export function StaticHome() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Product row 1 — dark / light */}
      <ProductCardRow left={smartMachines} right={automationSystems} />

      {/* 3. Product row 2 — light / dark */}
      <ProductCardRow left={advancedMaterials} right={digitalSolutions} />

      {/* 4. Company banner */}
      <CompanyBanner />

      {/* 5. Product row 3 — light / dark */}
      <ProductCardRow left={energySystems} right={precisionInstruments} />

      {/* 6. Stats */}
      <StatsRow />

      {/* 7. Solutions full-image */}
      <SolutionsBanner />

      {/* 8. Innovation cards */}
      <InnovationCards />

      {/* 9. Customer quote */}
      <CustomerQuote />

      {/* 10. Stories */}
      <StoriesSection />

      {/* 11. CTA */}
      <CTA />
    </>
  );
}
