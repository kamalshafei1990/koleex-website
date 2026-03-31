"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Region, type Language } from "@/data/regions";

/* ---------------------------------------------------------------------------
   LanguageSelector — Subtle, elegant language dropdown.
   Only shows languages valid for the current region.
   Smaller and more subtle than RegionSelector.
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
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  /* Only show if region has more than 1 language */
  const availableLanguages = currentRegion.languages;
  if (availableLanguages.length <= 1) {
    return (
      <span className="text-[11px] font-medium text-white/25 px-1.5">
        {currentLanguage.code.toUpperCase()}
      </span>
    );
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger — subtle, just the language code */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1 h-8 px-2 rounded-lg",
          "text-[11px] font-medium tracking-[0.02em]",
          "transition-all duration-[350ms]",
          open
            ? "text-white/70 bg-white/[0.06]"
            : "text-white/35 hover:text-white/60 hover:bg-white/[0.03]"
        )}
        aria-label="Select language"
        aria-expanded={open}
      >
        <span>{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "h-2.5 w-2.5 transition-transform duration-[300ms]",
            open && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute top-full right-0 mt-2 w-[180px]",
          "rounded-xl overflow-hidden",
          "bg-black/95 backdrop-blur-2xl backdrop-saturate-[1.8]",
          "border border-white/[0.08]",
          "shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
          "transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          "origin-top-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-95 pointer-events-none -translate-y-1"
        )}
      >
        <div className="px-3 pt-3 pb-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/20">
            Language
          </p>
        </div>

        <div className="px-1.5 pb-1.5">
          {availableLanguages.map((lang) => {
            const isActive = lang.code === currentLanguage.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left",
                  "transition-all duration-[200ms]",
                  isActive
                    ? "bg-white/[0.07]"
                    : "hover:bg-white/[0.04]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className={cn(
                    "text-[12px] font-medium",
                    isActive ? "text-white" : "text-white/60"
                  )}>
                    {lang.name}
                  </span>
                  <span className="text-[10px] text-white/20 uppercase">{lang.code}</span>
                </div>
                {isActive && (
                  <Check className="h-3 w-3 text-white/50 shrink-0" strokeWidth={2} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
