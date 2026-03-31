"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Region, type Language } from "@/data/regions";

/* ---------------------------------------------------------------------------
   LanguageSelector — Subtle, secondary language dropdown.
   Only shows when region has 2+ languages.
   Lighter treatment than RegionSelector — just the code + chevron.
   --------------------------------------------------------------------------- */

interface LanguageSelectorProps {
  currentRegion: Region;
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export default function LanguageSelector({
  currentRegion,
  currentLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
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

  const available = currentRegion.languages;

  /* Single language — just show label, no dropdown */
  if (available.length <= 1) {
    return (
      <span className="text-[10.5px] font-medium text-white/20 tracking-[0.03em] px-1">
        {currentLanguage.code.toUpperCase()}
      </span>
    );
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger — minimal: just code + tiny chevron */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-[4px] h-[32px] px-[8px] rounded-[8px]",
          "text-[10.5px] font-medium tracking-[0.03em]",
          "transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          open
            ? "text-white/60 bg-white/[0.05]"
            : "text-white/28 hover:text-white/50 hover:bg-white/[0.03]"
        )}
        aria-label="Select language"
        aria-expanded={open}
      >
        <span>{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "h-[8px] w-[8px] opacity-50 transition-transform duration-[300ms]",
            open && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute top-[calc(100%+6px)] right-0 w-[170px]",
          "rounded-[12px] overflow-hidden",
          "bg-[#0c0c0c]/[0.97] backdrop-blur-[40px] backdrop-saturate-[1.8]",
          "border border-white/[0.06]",
          "shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)]",
          "transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          "origin-top-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-[0.96] pointer-events-none -translate-y-1"
        )}
      >
        <div className="px-3 pt-[12px] pb-[6px]">
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/18">
            Language
          </p>
        </div>

        <div className="px-[5px] pb-[5px]">
          {available.map((lang) => {
            const isActive = lang.code === currentLanguage.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-[10px] py-[7px] rounded-[8px] text-left",
                  "transition-all duration-[200ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isActive
                    ? "bg-white/[0.06]"
                    : "hover:bg-white/[0.03]"
                )}
              >
                <div className="flex items-center gap-[8px]">
                  <span className={cn(
                    "text-[12px] font-medium",
                    isActive ? "text-white/85" : "text-white/50"
                  )}>
                    {lang.name}
                  </span>
                  <span className="text-[9px] text-white/15 uppercase tracking-wider">{lang.code}</span>
                </div>
                {isActive && (
                  <Check className="h-[9px] w-[9px] text-white/35 shrink-0" strokeWidth={2} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
