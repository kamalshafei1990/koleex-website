"use client";

import { useEffect, useState } from "react";
import { X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { countryToLanguage, countryToRegion, getRegionBySlug, type Region } from "@/data/regions";
import { useLang } from "@/i18n/LangProvider";
import { isLang } from "@/i18n/config";

/* ---------------------------------------------------------------------------
   RegionSuggestionModal — a quiet first-visit suggestion of the visitor's
   region. The country is the REAL one (Vercel's x-vercel-ip-country, kept by
   the middleware in the koleex_geo cookie) — never a guessed one; with no
   country known, nothing shows. It shows when that country's region is not
   the one chosen (koleex_region, Global by default), once: a dismissal is
   remembered in this browser. "Switch" opens the region in its language
   (the country's own when the region has it).
   --------------------------------------------------------------------------- */

const readCookie = (name: string): string | null => {
  const m = new RegExp(`(?:^|; )${name}=([^;]*)`).exec(document.cookie);
  return m ? decodeURIComponent(m[1]) : null;
};

export default function RegionSuggestionModal({ currentRegion }: { currentRegion: Region }) {
  const { lang, t } = useLang();
  const [suggestion, setSuggestion] = useState<{ region: Region; country: string; target: string } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try { dismissed = localStorage.getItem("koleex-region-dismissed") === "1"; } catch { /* private mode */ }
    if (dismissed) return;
    const code = (readCookie("koleex_geo") ?? "").toUpperCase();
    const region = getRegionBySlug(countryToRegion[code] ?? "");
    if (!code || !region || region.slug === currentRegion.slug) return;
    let country = code;
    try { country = new Intl.DisplayNames([lang], { type: "region" }).of(code) ?? code; } catch { /* old browser */ }
    const own = countryToLanguage[code];
    const target = own && isLang(own) && region.languages.some((l) => l.code === own) ? own : region.defaultLanguage;
    const show = setTimeout(() => { setSuggestion({ region, country, target }); setVisible(true); }, 2500);
    return () => clearTimeout(show);
  }, [currentRegion.slug, lang]);

  const remember = () => { try { localStorage.setItem("koleex-region-dismissed", "1"); } catch { /* private mode */ } };
  const dismiss = () => { setVisible(false); remember(); };
  const accept = () => {
    if (!suggestion) return;
    remember();
    window.location.assign(`/${suggestion.target}?region=${suggestion.region.slug}`);
  };

  if (!suggestion) return null;
  const regionName = t(suggestion.region.name);

  return (
    <div
      className={cn(
        "fixed bottom-5 end-5 z-[55] w-[340px]",
        "transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-[0.97] pointer-events-none"
      )}
    >
      <div className="relative rounded-[18px] overflow-hidden bg-[#0c0c0c]/[0.97] backdrop-blur-[40px] backdrop-saturate-[1.8] border border-white/[0.06] shadow-[0_24px_64px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03)]">
        <button
          onClick={dismiss}
          className="absolute top-3 end-3 h-7 w-7 flex items-center justify-center rounded-[8px] text-white/20 hover:text-white/50 hover:bg-white/[0.06] transition-all duration-300"
          aria-label={t("Dismiss")}
        >
          <X className="h-3 w-3" strokeWidth={1.5} />
        </button>

        <div className="p-5 pe-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-[10px] bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
              <Globe className="h-4 w-4 text-white/30" strokeWidth={1.5} />
            </div>
            <p className="text-[13px] font-medium text-white/80 tracking-[-0.01em]">{t("Region suggestion")}</p>
          </div>

          <p className="text-[13px] leading-[1.7] text-white/45">
            {t("You appear to be visiting from {country}. Would you like to switch to the {region} website?", { country: suggestion.country, region: `${suggestion.region.flag} ${regionName}` })}
          </p>

          <div className="flex items-center gap-2 mt-5">
            <button
              onClick={accept}
              className="flex-1 h-[34px] rounded-[9px] bg-white text-black text-[12px] font-semibold tracking-[-0.01em] hover:bg-white/90 transition-colors duration-300"
            >
              {t("Switch to {region}", { region: regionName })}
            </button>
            <button
              onClick={dismiss}
              className="flex-1 h-[34px] rounded-[9px] border border-white/[0.08] text-white/40 text-[12px] font-medium hover:text-white/60 hover:border-white/[0.14] transition-all duration-300"
            >
              {t("Stay on {region}", { region: t(currentRegion.name) })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
