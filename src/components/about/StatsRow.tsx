"use client";

import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   StatsRow — Horizontal stats with big numbers (Figma pattern).
   --------------------------------------------------------------------------- */

interface Stat {
  number: string;
  label: string;
}

interface StatsRowProps {
  stats: Stat[];
  dark?: boolean;
}

export function StatsRow({ stats, dark = true }: StatsRowProps) {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className={cn("py-16 md:py-24 overflow-hidden", dark ? "bg-black border-y border-white/[0.06]" : "bg-[#f5f5f7]")}>
      <div className="max-w-[1120px] mx-auto px-6">
        <div className={cn("grid gap-8", `grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} lg:grid-cols-${stats.length}`)}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${200 + i * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${200 + i * 80}ms`,
              }}
            >
              <p className={cn("text-[44px] md:text-[56px] font-bold tracking-[-0.04em] leading-none", dark ? "text-white" : "text-[#1d1d1f]")}>{s.number}</p>
              <p className={cn("text-[13px] mt-2", dark ? "text-white/30" : "text-[#86868b]")}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
