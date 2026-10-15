"use client";

import { useEffect, useMemo, useState } from "react";
import type { COBEOptions } from "cobe";
import { KOLEEX_MARKETS } from "@/data/koleex-markets";
import { Globe } from "@/components/ui/globe";
import styles from "./coming-soon.module.css";
import { useComingSoonTheme } from "./theme";

/* Koleex hubs: Taizhou, Shanghai, Hangzhou, Hong Kong, Dubai, Cairo. */
const HUBS: { location: [number, number]; size: number; name: string; flag: string }[] = [
  { location: [28.656, 121.421], size: 0.06, name: "Taizhou", flag: "🇨🇳" },
  { location: [31.23, 121.474], size: 0.07, name: "Shanghai", flag: "🇨🇳" },
  { location: [30.274, 120.155], size: 0.055, name: "Hangzhou", flag: "🇨🇳" },
  { location: [22.319, 114.169], size: 0.06, name: "Hong Kong", flag: "🇭🇰" },
  { location: [25.205, 55.271], size: 0.07, name: "Dubai", flag: "🇦🇪" },
  { location: [30.044, 31.236], size: 0.075, name: "Cairo", flag: "🇪🇬" },
];

/* Dubai and Cairo share a hub pin: keep the larger hub dot. */
function overlapsHub(location: readonly [number, number]) {
  return HUBS.some((hub) => {
    const dLat = hub.location[0] - location[0];
    const dLng = hub.location[1] - location[1];
    return dLat * dLat + dLng * dLng < 0.4 * 0.4;
  });
}

const MARKERS: COBEOptions["markers"] = [
  ...KOLEEX_MARKETS.filter((market) => !overlapsHub(market.location)).map((market) => ({
    location: market.location,
    size: market.size,
    name: market.name,
    flag: market.flag,
  })),
  ...HUBS,
];

const GLOBE_BASE: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 2.15,
  theta: 0.28,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 12000,
  mapBrightness: 9,
  mapBaseBrightness: 0.24,
  baseColor: [0.5, 0.6, 0.74],
  markerColor: [0.86, 0.93, 1],
  glowColor: [0.28, 0.34, 0.45],
  opacity: 1,
  markers: MARKERS,
};

const GLOBE_COMPACT: COBEOptions = {
  ...GLOBE_BASE,
  devicePixelRatio: 1.25,
  mapSamples: 6000,
  mapBrightness: 7,
};

type Mode = "pending" | "off" | "full" | "compact";

const LIGHT_GLOBE = {
  dark: 0,
  diffuse: 1.15,
  mapBaseBrightness: 0.06,
  baseColor: [0.93, 0.93, 0.94] as [number, number, number],
  markerColor: [0.22, 0.38, 0.56] as [number, number, number],
  glowColor: [0.86, 0.88, 0.9] as [number, number, number],
};

export function HeroGlobe() {
  const { theme } = useComingSoonTheme();
  const [mode, setMode] = useState<Mode>("pending");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 960px)");
    const sync = () => {
      if (reduce.matches) setMode("off");
      else setMode(narrow.matches ? "compact" : "full");
    };
    sync();
    reduce.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, []);

  const show = mode === "full" || mode === "compact";
  const config = useMemo(() => {
    const base = mode === "compact" ? GLOBE_COMPACT : GLOBE_BASE;
    if (theme !== "light") return base;
    return {
      ...base,
      ...LIGHT_GLOBE,
      mapBrightness: mode === "compact" ? 5 : 6,
    };
  }, [mode, theme]);

  return (
    <div className={styles.globeSlot} data-static={mode === "off" ? "true" : undefined}>
      {show ? <Globe config={config} tipClassName={styles.markerTip} /> : null}
    </div>
  );
}
