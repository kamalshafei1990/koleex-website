"use client";

import { useState, useEffect } from "react";
import { X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getRegionBySlug,
  getSimulatedDetection,
  countryToRegion,
  countryToLanguage,
  languages as allLanguages,
  type Region,
} from "@/data/regions";

/* ---------------------------------------------------------------------------
   RegionSuggestionModal — Non-intrusive first-visit region suggestion.

   How it works:
   1. On mount, calls getSimulatedDetection() → returns { countryCode, countryName }
   2. Maps countryCode → regionSlug via countryToRegion
   3. Maps countryCode → suggested language via countryToLanguage
   4. If the suggested region differs from current, shows the modal after 2.5s
   5. User can Accept (switch region) or Dismiss (stay on Global)
   6. Choice is persisted in sessionStorage so modal doesn't reappear

   Future integration:
   - Replace getSimulatedDetection() with a real IP geolocation API call
   - e.g. fetch('https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_KEY')
   - Parse response.country_code2 and response.country_name
   --------------------------------------------------------------------------- */

interface RegionSuggestionModalProps {
  currentRegion: Region;
  onAccept: (region: Region) => void;
  onDismiss: () => void;
}

export default function RegionSuggestionModal({
  currentRegion,
  onAccept,
  onDismiss,
}: RegionSuggestionModalProps) {
  const [visible, setVisible] = useState(false);
  const [suggestedRegion, setSuggestedRegion] = useState<Region | null>(null);
  const [detectedCountry, setDetectedCountry] = useState("");
  const [suggestedLangName, setSuggestedLangName] = useState("");
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

    setDetectedCountry(detection.countryName);

    const regionSlug = countryToRegion[detection.countryCode];
    if (!regionSlug) return;

    const region = getRegionBySlug(regionSlug);
    if (!region || region.slug === currentRegion.slug) return;

    setSuggestedRegion(region);

    // Suggest a language if it differs from English
    const langCode = countryToLanguage[detection.countryCode];
    if (langCode && langCode !== "en") {
      const lang = allLanguages[langCode];
      if (lang) setSuggestedLangName(lang.name);
    }

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
        "fixed bottom-5 right-5 z-[55] w-[340px]",
        "transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-3 scale-[0.97] pointer-events-none"
      )}
    >
      <div className="relative rounded-[18px] overflow-hidden bg-[#0c0c0c]/[0.97] backdrop-blur-[40px] backdrop-saturate-[1.8] border border-white/[0.06] shadow-[0_24px_64px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03)]">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 h-7 w-7 flex items-center justify-center rounded-[8px] text-white/20 hover:text-white/50 hover:bg-white/[0.06] transition-all duration-300"
          aria-label="Dismiss"
        >
          <X className="h-3 w-3" strokeWidth={1.5} />
        </button>

        <div className="p-5 pr-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-[10px] bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
              <Globe className="h-4 w-4 text-white/30" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[13px] font-medium text-white/80 tracking-[-0.01em]">
                Region suggestion
              </p>
              <p className="text-[10px] text-white/25 mt-0.5">
                Based on your location
              </p>
            </div>
          </div>

          {/* Message */}
          <p className="text-[13px] leading-[1.7] text-white/45">
            You appear to be visiting from{" "}
            <span className="text-white/80 font-medium">{detectedCountry}</span>.
            Would you like to switch to the{" "}
            <span className="text-white/80 font-medium">
              {suggestedRegion.flag} {suggestedRegion.name}
            </span>{" "}
            website?
          </p>

          {/* Language hint */}
          {suggestedRegion.languages.length > 1 && (
            <p className="text-[10.5px] text-white/20 mt-2">
              Available in {suggestedRegion.languages.map((l) => l.name).join(", ")}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-5">
            <button
              onClick={accept}
              className="flex-1 h-[34px] rounded-[9px] bg-white text-black text-[12px] font-semibold tracking-[-0.01em] hover:bg-white/90 transition-colors duration-300"
            >
              Switch to {suggestedRegion.name}
            </button>
            <button
              onClick={dismiss}
              className="flex-1 h-[34px] rounded-[9px] border border-white/[0.08] text-white/40 text-[12px] font-medium hover:text-white/60 hover:border-white/[0.14] transition-all duration-300"
            >
              Stay on Global
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
