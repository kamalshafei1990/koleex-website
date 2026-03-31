"use client";

import { useState, useEffect } from "react";
import { X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { getRegionBySlug, type Region } from "@/data/regions";

/* ---------------------------------------------------------------------------
   RegionSuggestionModal — Non-intrusive first-visit suggestion.
   Floating bottom-right card, appears after 2.5s delay.
   Placeholder geo detection — replace with real API later.
   --------------------------------------------------------------------------- */

interface RegionSuggestionModalProps {
  currentRegion: Region;
  onAccept: (region: Region) => void;
  onDismiss: () => void;
}

function getSimulatedDetection(): { country: string; regionSlug: string } | null {
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
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("koleex-region-dismissed")) {
        setDismissed(true);
        return;
      }
    }

    const detection = getSimulatedDetection();
    if (!detection) return;

    const region = getRegionBySlug(detection.regionSlug);
    if (!region || region.slug === currentRegion.slug) return;

    setSuggestedRegion(region);
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, [currentRegion.slug]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("koleex-region-dismissed", "true");
    setTimeout(onDismiss, 450);
  };

  const accept = () => {
    if (!suggestedRegion) return;
    setVisible(false);
    sessionStorage.setItem("koleex-region-dismissed", "true");
    setTimeout(() => onAccept(suggestedRegion), 450);
  };

  if (dismissed || !suggestedRegion) return null;

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-[55] w-[320px]",
        "transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-3 scale-[0.97] pointer-events-none"
      )}
    >
      <div className="relative rounded-[16px] overflow-hidden bg-[#0c0c0c]/[0.97] backdrop-blur-[40px] backdrop-saturate-[1.8] border border-white/[0.06] shadow-[0_24px_64px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03)]">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-[10px] right-[10px] h-[26px] w-[26px] flex items-center justify-center rounded-[8px] text-white/20 hover:text-white/50 hover:bg-white/[0.05] transition-all duration-[300ms]"
          aria-label="Dismiss"
        >
          <X className="h-[12px] w-[12px]" strokeWidth={1.5} />
        </button>

        <div className="p-[18px] pr-[36px]">
          {/* Icon */}
          <div className="flex items-center gap-[10px] mb-[14px]">
            <div className="h-[34px] w-[34px] rounded-[10px] bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
              <Globe className="h-[14px] w-[14px] text-white/30" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[12px] font-medium text-white/75 tracking-[-0.01em]">
                Region suggestion
              </p>
              <p className="text-[10px] text-white/25 mt-[1px]">
                Based on your location
              </p>
            </div>
          </div>

          {/* Message */}
          <p className="text-[12.5px] leading-[1.65] text-white/45 tracking-[-0.005em]">
            You appear to be visiting from{" "}
            <span className="text-white/75 font-medium">Egypt</span>.
            Would you like to switch to the{" "}
            <span className="text-white/75 font-medium">
              {suggestedRegion.flag} {suggestedRegion.name}
            </span>{" "}
            website?
          </p>

          {suggestedRegion.defaultLanguage !== "en" && (
            <p className="text-[10px] text-white/18 mt-[6px]">
              Available in {suggestedRegion.languages.map((l) => l.name).join(", ")}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-[8px] mt-[16px]">
            <button
              onClick={accept}
              className="flex-1 h-[32px] rounded-[8px] bg-white text-black text-[11.5px] font-semibold tracking-[-0.01em] hover:bg-white/90 transition-colors duration-[300ms]"
            >
              Switch to {suggestedRegion.name}
            </button>
            <button
              onClick={dismiss}
              className="flex-1 h-[32px] rounded-[8px] border border-white/[0.08] text-white/40 text-[11.5px] font-medium hover:text-white/60 hover:border-white/[0.14] transition-all duration-[300ms]"
            >
              Stay on Global
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
