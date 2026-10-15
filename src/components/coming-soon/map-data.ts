import DottedMap from "dotted-map";
import { KOLEEX_MARKETS } from "@/data/koleex-markets";

/* Pin grouping matches the previous dotted map, so the globe keeps the same
   72 destinations: the other hubs plus every market that does not sit on
   Taizhou or on another hub. */

const map = new DottedMap({ height: 100, grid: "diagonal" });

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
const ARC_LENGTH = 0.4;
const CONCURRENT = 22;

function locate(lat: number, lng: number) {
  const pin = map.getPin({ lat, lng });
  if (!pin) return null;
  return `${pin.x},${pin.y}`;
}

function angular(lat: number, lng: number) {
  const dLat = ((lat - TAIZHOU.lat) * Math.PI) / 180;
  const dLng = ((lng - TAIZHOU.lng) * Math.PI) / 180;
  const lat1 = (TAIZHOU.lat * Math.PI) / 180;
  const lat2 = (lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

type Dest = GlobeMarker;

const hubPoints: Dest[] = [];
const hubKeys = new Set<string>();

for (const hub of HUBS) {
  const key = locate(hub.lat, hub.lng);
  if (!key) continue;
  hubKeys.add(key);
  hubPoints.push({
    id: hub.id,
    lat: hub.lat,
    lng: hub.lng,
    label: `${hub.flag} ${hub.name}`,
    kind: "hub",
  });
}

const taizhou = hubPoints.find((point) => point.id === "taizhou");
const taizhouKey = taizhou ? locate(taizhou.lat, taizhou.lng) : "";

const marketGroups = new Map<string, Dest>();

for (const market of KOLEEX_MARKETS) {
  const key = locate(market.location[0], market.location[1]);
  if (!key || key === taizhouKey || hubKeys.has(key)) continue;
  const group = marketGroups.get(key) ?? {
    id: `market-${key}`,
    lat: market.location[0],
    lng: market.location[1],
    label: "",
    kind: "market" as const,
  };
  group.label = group.label ? `${group.label} · ${market.flag} ${market.name}` : `${market.flag} ${market.name}`;
  marketGroups.set(key, group);
}

const destinations = [...hubPoints.filter((point) => point.id !== "taizhou"), ...marketGroups.values()].sort(
  (a, b) => Math.atan2(a.lat - TAIZHOU.lat, a.lng - TAIZHOU.lng) - Math.atan2(b.lat - TAIZHOU.lat, b.lng - TAIZHOU.lng),
);

const dashGap = ARC_LENGTH * (destinations.length / CONCURRENT - 1);
const period = ARC_LENGTH + dashGap;

export const globeMotion = {
  arcLength: ARC_LENGTH,
  arcDashGap: dashGap,
  arcTime: 52000,
};

export const globeArcs: GlobeArc[] = destinations.map((point, index) => ({
  order: (index / destinations.length) * period,
  startLat: TAIZHOU.lat,
  startLng: TAIZHOU.lng,
  endLat: point.lat,
  endLng: point.lng,
  arcAlt: Math.min(0.42, Math.max(0.08, (angular(point.lat, point.lng) / Math.PI) * 0.5)),
  color: STEEL,
}));

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

export const globeMarkers: GlobeMarker[] = clusterMarkers([
  ...hubPoints.filter((point) => point.id === "taizhou"),
  ...destinations,
]);
