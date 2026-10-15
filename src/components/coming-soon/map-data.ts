import DottedMap from "dotted-map";
import { KOLEEX_MARKETS } from "@/data/koleex-markets";
import type { WorldMapLine, WorldMapPoint } from "@/components/ui/world-map";

/* Built once on the server. The client map only receives the SVG and pins. */

const map = new DottedMap({ height: 100, grid: "diagonal" });

/* SVG is public/maps/koleex-world.svg, generated with the same settings:
   height 100, diagonal grid, radius 0.22, #FFFFFF40 on #0A0A0A. */

export const worldMapSrc = "/maps/koleex-world.svg";

export const worldMapSize = {
  width: map.image.width,
  height: map.image.height,
};

const HUBS = [
  { id: "taizhou", name: "Taizhou", flag: "🇨🇳", lat: 28.656, lng: 121.421 },
  { id: "shanghai", name: "Shanghai", flag: "🇨🇳", lat: 31.23, lng: 121.474 },
  { id: "hangzhou", name: "Hangzhou", flag: "🇨🇳", lat: 30.274, lng: 120.155 },
  { id: "hong-kong", name: "Hong Kong", flag: "🇭🇰", lat: 22.319, lng: 114.169 },
  { id: "dubai", name: "Dubai", flag: "🇦🇪", lat: 25.205, lng: 55.271 },
  { id: "cairo", name: "Cairo", flag: "🇪🇬", lat: 30.044, lng: 31.236 },
] as const;

const LINKS: ReadonlyArray<readonly [string, string]> = [
  ["shanghai", "hong-kong"],
  ["shanghai", "dubai"],
  ["shanghai", "cairo"],
  ["hangzhou", "dubai"],
  ["taizhou", "cairo"],
  ["hong-kong", "dubai"],
  ["dubai", "cairo"],
];

function locate(lat: number, lng: number) {
  const pin = map.getPin({ lat, lng });
  if (!pin) return null;
  return { x: pin.x, y: pin.y };
}

function keyOf(point: { x: number; y: number }) {
  return `${point.x},${point.y}`;
}

const hubById = new Map<string, { x: number; y: number }>();
const hubPoints: WorldMapPoint[] = [];

for (const hub of HUBS) {
  const pos = locate(hub.lat, hub.lng);
  if (!pos) continue;
  hubById.set(hub.id, pos);
  hubPoints.push({
    id: hub.id,
    x: pos.x,
    y: pos.y,
    label: `${hub.flag} ${hub.name}`,
    kind: "hub",
  });
}

const hubKeys = new Set(hubPoints.map(keyOf));
const marketGroups = new Map<string, { x: number; y: number; labels: string[] }>();

for (const market of KOLEEX_MARKETS) {
  const pos = locate(market.location[0], market.location[1]);
  if (!pos) continue;
  const key = keyOf(pos);
  if (hubKeys.has(key)) continue;
  const group = marketGroups.get(key) ?? { x: pos.x, y: pos.y, labels: [] };
  group.labels.push(`${market.flag} ${market.name}`);
  marketGroups.set(key, group);
}

const marketPoints: WorldMapPoint[] = [...marketGroups.entries()].map(([key, group]) => ({
  id: `market-${key}`,
  x: group.x,
  y: group.y,
  label: group.labels.join(" · "),
  kind: "market",
}));

export const worldMapPoints: WorldMapPoint[] = [...marketPoints, ...hubPoints];

export const worldMapLines: WorldMapLine[] = LINKS.flatMap(([from, to]) => {
  const start = hubById.get(from);
  const end = hubById.get(to);
  if (!start || !end) return [];
  return [{ x1: start.x, y1: start.y, x2: end.x, y2: end.y }];
});
