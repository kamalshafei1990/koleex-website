"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { regions, type Region } from "@/data/regions";

/* ---------------------------------------------------------------------------
   RegionSelector — Enterprise-style region dropdown.
   Shows current region with flag + name + chevron.
   Dropdown lists all regions with flags, names, descriptions.
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

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 h-8 px-2.5 rounded-lg",
          "text-[11px] font-medium tracking-[0.01em]",
          "transition-all duration-[350ms]",
          open
            ? "text-white bg-white/[0.08]"
            : "text-white/45 hover:text-white/75 hover:bg-white/[0.04]"
        )}
        aria-label="Select region"
        aria-expanded={open}
      >
        <span className="text-[13px] leading-none">{currentRegion.flag}</span>
        <span>{currentRegion.name}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-[300ms]",
            open && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute top-full right-0 mt-2 w-[260px]",
          "rounded-2xl overflow-hidden",
          "bg-black/95 backdrop-blur-2xl backdrop-saturate-[1.8]",
          "border border-white/[0.08]",
          "shadow-[0_16px_48px_rgba(0,0,0,0.5)]",
          "transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          "origin-top-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-95 pointer-events-none -translate-y-1"
        )}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/25">
            Select Region
          </p>
        </div>

        {/* Region list */}
        <div className="px-2 pb-2 max-h-[360px] overflow-y-auto">
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
                  "w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left",
                  "transition-all duration-[250ms]",
                  isActive
                    ? "bg-white/[0.07]"
                    : "hover:bg-white/[0.04]"
                )}
              >
                <span className="text-[16px] leading-none mt-0.5 shrink-0">{region.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[13px] font-medium",
                      isActive ? "text-white" : "text-white/70"
                    )}>
                      {region.name}
                    </span>
                    {isActive && (
                      <Check className="h-3 w-3 text-white/60 shrink-0" strokeWidth={2} />
                    )}
                  </div>
                  {region.description && (
                    <p className="text-[11px] text-white/25 mt-0.5 truncate">
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
