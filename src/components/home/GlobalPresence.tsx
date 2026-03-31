"use client";

import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   6. Global Presence — Stats counters with animated entrance.
   --------------------------------------------------------------------------- */

const stats = [
  { number: "80+", label: "Countries", icon: "🌍" },
  { number: "12,000+", label: "Enterprise Clients", icon: "🏢" },
  { number: "340+", label: "Active Projects", icon: "📊" },
  { number: "4", label: "Business Divisions", icon: "⚡" },
  { number: "15,000+", label: "Product Configurations", icon: "🔧" },
  { number: "24/7", label: "Global Support", icon: "🛡️" },
];

export function GlobalPresence() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative bg-black py-32 md:py-44 section-accent-top hero-gradient overflow-hidden">
      <div className="orb orb-silver w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />

      <div className="max-w-[1100px] mx-auto px-5 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-overline mb-4" style={revealStyle(visible, 0)}>Global Presence</p>
          <h2 className="text-display-sm text-gradient-hero" style={revealStyle(visible, 100)}>
            Engineering at scale.
          </h2>
          <p className="text-subtitle mt-5 max-w-lg mx-auto" style={revealStyle(visible, 200)}>
            Operating across continents, delivering precision everywhere.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="card-dark !p-6 !rounded-[20px] text-center !min-h-0"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.85)",
                transition: `opacity 0.7s cubic-bezier(0.34,1.56,0.64,1) ${350 + i * 60}ms, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${350 + i * 60}ms`,
              }}
            >
              <span className="text-2xl block mb-3 opacity-50">{stat.icon}</span>
              <p className="text-[28px] md:text-[32px] font-extrabold text-white tracking-[-0.03em] leading-none">{stat.number}</p>
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/30 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
