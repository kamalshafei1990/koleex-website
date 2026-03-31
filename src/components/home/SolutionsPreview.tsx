"use client";

import Link from "next/link";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   5. Solutions / Industries — Card grid showing key industry solutions.
   --------------------------------------------------------------------------- */

const solutions = [
  { icon: "🏭", title: "Smart Manufacturing", desc: "AI-powered production optimization and predictive maintenance.", href: "/solutions" },
  { icon: "⚡", title: "Energy Transition", desc: "Grid modernization, renewable integration, and storage.", href: "/solutions" },
  { icon: "🏗️", title: "Connected Infrastructure", desc: "IoT-enabled facility and asset management.", href: "/solutions" },
  { icon: "👕", title: "Garment & Textile", desc: "Automated cutting, sewing, and quality control systems.", href: "/solutions" },
  { icon: "🏥", title: "Healthcare Innovation", desc: "Precision instruments and medical-grade materials.", href: "/solutions" },
  { icon: "🚀", title: "Aerospace & Defense", desc: "Ultra-performance composites and thermal systems.", href: "/solutions" },
];

export function SolutionsPreview() {
  const { ref, visible } = useScrollReveal(0.06);

  return (
    <section className="bg-black py-32 md:py-44 section-accent-top">
      <div ref={ref} className="max-w-[1100px] mx-auto px-5">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-overline mb-4" style={revealStyle(visible, 0)}>Solutions</p>
          <h2 className="text-display-sm text-gradient-silver" style={revealStyle(visible, 100)}>
            Engineered for your industry.
          </h2>
          <p className="text-subtitle mt-5 max-w-xl mx-auto" style={revealStyle(visible, 200)}>
            End-to-end solutions combining hardware, software, and services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s, i) => (
            <Link
              key={s.title}
              href={s.href}
              className="card-dark group !p-8 !rounded-[20px]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${300 + i * 80}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${300 + i * 80}ms`,
              }}
            >
              <span className="text-3xl block mb-5">{s.icon}</span>
              <h3 className="text-[17px] font-semibold text-white tracking-[-0.014em]">{s.title}</h3>
              <p className="text-[14px] leading-[1.55] text-white/35 mt-2.5">{s.desc}</p>
              <p className="text-[13px] font-medium text-white/20 mt-6 group-hover:text-white/50 transition-colors duration-500">
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
