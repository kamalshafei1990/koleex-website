"use client";

import { useState, useEffect } from "react";
import { X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { regions, getRegionBySlug, type Region } from "@/data/regions";

/* ---------------------------------------------------------------------------
   RegionSuggestionModal — Elegant floating popup shown on first visit.
   Suggests a region based on placeholder detection.
   Non-intrusive, dismissible, with smooth entrance animation.

   Future integration: replace simulatedCountry with real IP geolocation.
   --------------------------------------------------------------------------- */

interface RegionSuggestionModalProps {
  currentRegion: Region;
  onAccept: (region: Region) => void;
  onDismiss: () => void;
}

/* Placeholder: simulate detected country. Replace with real detection later. */
function getSimulatedDetection(): { country: string; regionSlug: string } | null {
  /* In production, this would call a geolocation API or read a header.
     For now, return a simulated detection to demonstrate the UI. */
  return { country: "Egypt", regionSlug: "middle-east" };
}

export default function RegionSuggestionModal({
  currentRegion,
  onAccept,
  onDismiss,
}: RegionSuggestionModalProps) {
  const [visible, setVisible] = useState(false);
  const [suggestedRegion, setSuggestedRegion] = useState<Region | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    /* Check if already dismissed this session */
    if (typeof window !== "undefined") {
      const alreadyDismissed = sessionStorage.getItem("koleex-region-dismissed");
      if (alreadyDismissed) {
        setDismissed(true);
        return;
      }
    }

    const detection = getSimulatedDetection();
    if (!detection) return;

    const region = getRegionBySlug(detection.regionSlug);
    if (!region || region.slug === currentRegion.slug) return;

    setSuggestedRegion(region);

    /* Delay appearance for a premium feel — don't show instantly */
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, [currentRegion.slug]);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("koleex-region-dismissed", "true");
    setTimeout(onDismiss, 400);
  };

  const handleAccept = () => {
    if (!suggestedRegion) return;
    setVisible(false);
    sessionStorage.setItem("koleex-region-dismissed", "true");
    setTimeout(() => onAccept(suggestedRegion), 400);
  };

  if (dismissed || !suggestedRegion) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[55] w-[340px]",
        "transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      )}
    >
      <div className="relative rounded-2xl overflow-hidden bg-black/95 backdrop-blur-2xl backdrop-saturate-[1.8] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 h-7 w-7 flex items-center justify-center rounded-full text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all duration-[300ms]"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>

        <div className="p-5 pr-10">
          {/* Icon + flag */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
              <Globe className="h-4 w-4 text-white/40" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[13px] font-medium text-white/80">
                Region suggestion
              </p>
              <p className="text-[11px] text-white/30">
                Based on your location
              </p>
            </div>
          </div>

          {/* Message */}
          <p className="text-[13px] leading-[1.6] text-white/55">
            You appear to be visiting from{" "}
            <span className="text-white/80 font-medium">Egypt</span>.
            Would you like to switch to the{" "}
            <span className="text-white/80 font-medium">
              {suggestedRegion.flag} {suggestedRegion.name}
            </span>{" "}
            website?
          </p>

          {/* Language note */}
          {suggestedRegion.defaultLanguage !== "en" && (
            <p className="text-[11px] text-white/25 mt-2">
              Available in{" "}
              {suggestedRegion.languages.map((l) => l.name).join(", ")}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2.5 mt-5">
            <button
              onClick={handleAccept}
              className="flex-1 h-[34px] rounded-lg bg-white text-black text-[12px] font-semibold hover:bg-white/90 transition-colors duration-[300ms]"
            >
              Switch to {suggestedRegion.name}
            </button>
            <button
              onClick={handleDismiss}
              className="flex-1 h-[34px] rounded-lg border border-white/[0.10] text-white/50 text-[12px] font-medium hover:text-white/70 hover:border-white/[0.18] transition-all duration-[300ms]"
            >
              Stay on Global
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
