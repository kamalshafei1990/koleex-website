"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { regions, type Region } from "@/data/regions";

/* ---------------------------------------------------------------------------
   RegionSelector — Premium enterprise region dropdown.
   Trigger: Globe icon + region name + chevron.
   Dropdown: dark glass with flag + name + description per region.
   --------------------------------------------------------------------------- */

interface RegionSelectorProps {
  currentRegion: Region;
  onRegionChange: (region: Region) => void;
}

export default function RegionSelector({
  currentRegion,
  onRegionChange,
}: RegionSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-[6px] h-[32px] pl-2 pr-[7px] rounded-[8px]",
          "text-[11px] font-medium tracking-[0.015em]",
          "transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          open
            ? "text-white/80 bg-white/[0.07]"
            : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
        )}
        aria-label="Select region"
        aria-expanded={open}
      >
        <Globe className="h-[12px] w-[12px] opacity-60" strokeWidth={1.5} />
        <span>{currentRegion.name}</span>
        <ChevronDown
          className={cn(
            "h-[10px] w-[10px] opacity-50 transition-transform duration-[300ms]",
            open && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute top-[calc(100%+6px)] right-0 w-[280px]",
          "rounded-[16px] overflow-hidden",
          "bg-[#0c0c0c]/[0.97] backdrop-blur-[40px] backdrop-saturate-[1.8]",
          "border border-white/[0.06]",
          "shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03)]",
          "transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          "origin-top-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-[0.96] pointer-events-none -translate-y-1"
        )}
      >
        {/* Header */}
        <div className="px-4 pt-[14px] pb-[8px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/20">
            Region
          </p>
        </div>

        {/* Region list */}
        <div className="px-[6px] pb-[6px] max-h-[380px] overflow-y-auto">
          {regions.map((region) => {
            const isActive = region.slug === currentRegion.slug;
            return (
              <button
                key={region.slug}
                onClick={() => {
                  onRegionChange(region);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-start gap-[10px] px-[10px] py-[9px] rounded-[10px] text-left",
                  "transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isActive
                    ? "bg-white/[0.06]"
                    : "hover:bg-white/[0.03]"
                )}
              >
                <span className="text-[15px] leading-none mt-[2px] shrink-0">{region.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-[6px]">
                    <span className={cn(
                      "text-[12.5px] font-medium tracking-[-0.01em]",
                      isActive ? "text-white" : "text-white/65"
                    )}>
                      {region.name}
                    </span>
                    {isActive && (
                      <Check className="h-[10px] w-[10px] text-white/40 shrink-0" strokeWidth={2} />
                    )}
                  </div>
                  {region.description && (
                    <p className="text-[10.5px] text-white/20 mt-[2px] truncate leading-snug">
                      {region.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
