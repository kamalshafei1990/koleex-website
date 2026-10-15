import { KOLEEX_MARKETS } from "@/data/koleex-markets";

/* Every arc starts at Taizhou and ends on a real market or hub coordinate.
   Places that share a city (Dubai/UAE, Cairo/Egypt) keep one arc. */

const HUBS = [
  { id: "taizhou", name: "Taizhou", flag: "🇨🇳", lat: 28.656, lng: 121.421 },
  { id: "shanghai", name: "Shanghai", flag: "🇨🇳", lat: 31.23, lng: 121.474 },
  { id: "hangzhou", name: "Hangzhou", flag: "🇨🇳", lat: 30.274, lng: 120.155 },
  { id: "hong-kong", name: "Hong Kong", flag: "🇭🇰", lat: 22.319, lng: 114.169 },
  { id: "dubai", name: "Dubai", flag: "🇦🇪", lat: 25.205, lng: 55.271 },
  { id: "cairo", name: "Cairo", flag: "🇪🇬", lat: 30.044, lng: 31.236 },
] as const;

export const TAIZHOU = { lat: HUBS[0].lat, lng: HUBS[0].lng };

export type GlobeArc = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeMarker = {
  id: string;
  lat: number;
  lng: number;
  label: string;
  kind: "hub" | "market";
};

const STEEL = "#567FB2";

/* three-globe draws a dash of length L on the 0–1 arc, then waits `gap`.
   The dash stays on that arc for 1+L of travel, so the repeat period has to
   be (1+L) * routes / 22 or almost every route lights up at once.
   `order` is the initial gap. It starts at 1, which is the start of the arc
   after three-globe flips its distance attribute, so each dash is born at
   Taizhou and runs outward. An order of 0 parks the dash at the destination. */
const ARC_LENGTH = 0.35;
const CONCURRENT = 22;
const ARC_TIME = 2800;

type Dest = GlobeMarker;

function samePlace(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  return Math.hypot(a.lat - b.lat, a.lng - b.lng) < 0.05;
}

function angular(lat: number, lng: number) {
  const dLat = ((lat - TAIZHOU.lat) * Math.PI) / 180;
  const dLng = ((lng - TAIZHOU.lng) * Math.PI) / 180;
  const lat1 = (TAIZHOU.lat * Math.PI) / 180;
  const lat2 = (lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function arcAltitude(lat: number, lng: number) {
  const lift = angular(lat, lng) / Math.PI;
  return Math.min(0.36, Math.max(0.02, lift * 0.4));
}

const destinations: Dest[] = [];

for (const hub of HUBS) {
  if (hub.id === "taizhou") continue;
  destinations.push({
    id: hub.id,
    lat: hub.lat,
    lng: hub.lng,
    label: `${hub.flag} ${hub.name}`,
    kind: "hub",
  });
}

for (const market of KOLEEX_MARKETS) {
  const point = { lat: market.location[0], lng: market.location[1] };
  if (samePlace(point, TAIZHOU) || destinations.some((dest) => samePlace(dest, point))) continue;
  destinations.push({
    id: market.code,
    lat: point.lat,
    lng: point.lng,
    label: `${market.flag} ${market.name}`,
    kind: "market",
  });
}

destinations.sort(
  (a, b) => Math.atan2(a.lat - TAIZHOU.lat, a.lng - TAIZHOU.lng) - Math.atan2(b.lat - TAIZHOU.lat, b.lng - TAIZHOU.lng),
);

const travelWindow = 1 + ARC_LENGTH;
const period = (travelWindow * destinations.length) / CONCURRENT;
const dashGap = period - ARC_LENGTH;
const stride = 17;

export const globeMotion = {
  arcLength: ARC_LENGTH,
  arcDashGap: dashGap,
  arcTime: ARC_TIME,
};

export const globeArcs: GlobeArc[] = destinations.map((point, index) => {
  const phase = (index * stride) % destinations.length;
  return {
    order: 1 + (phase / destinations.length) * period,
    startLat: TAIZHOU.lat,
    startLng: TAIZHOU.lng,
    endLat: point.lat,
    endLng: point.lng,
    arcAlt: arcAltitude(point.lat, point.lng),
    color: STEEL,
  };
});

function clusterMarkers(points: Dest[]) {
  const groups: Dest[] = [];
  for (const point of points) {
    const found = groups.find((group) => Math.hypot(group.lat - point.lat, group.lng - point.lng) < 3);
    if (!found) {
      groups.push({ ...point });
      continue;
    }
    found.label = `${found.label} · ${point.label}`;
    if (point.kind === "hub") found.kind = "hub";
  }
  return groups;
}

const taizhouMarker: Dest = {
  id: "taizhou",
  lat: TAIZHOU.lat,
  lng: TAIZHOU.lng,
  label: `${HUBS[0].flag} ${HUBS[0].name}`,
  kind: "hub",
};

export const globeMarkers: GlobeMarker[] = clusterMarkers([taizhouMarker, ...destinations]);
