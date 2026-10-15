"use client";

import { useId, useMemo, useState } from "react";
import { motion } from "motion/react";

/* Port of @aceternity/world-map.
   The registry file calls useTheme() from next-themes, which this app does not
   install, and dotted-map 3 no longer lines up with the old 800×400 overlay.
   Pins are precomputed with getPin() and drawn in the map's own viewBox. */

export type WorldMapPoint = {
  id: string;
  x: number;
  y: number;
  label: string;
  kind: "hub" | "market";
};

export type WorldMapLine = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type WorldMapProps = {
  mapSrc: string;
  width: number;
  height: number;
  lines: WorldMapLine[];
  points: WorldMapPoint[];
  lineColor?: string;
};

function hitTargets(points: WorldMapPoint[]) {
  const groups: WorldMapPoint[] = [];
  for (const point of points) {
    const found = groups.find((group) => Math.hypot(group.x - point.x, group.y - point.y) < 2.5);
    if (!found) {
      groups.push({ ...point });
      continue;
    }
    found.label = `${found.label} · ${point.label}`;
    if (point.kind === "hub") found.kind = "hub";
  }
  return groups;
}

function curve(start: { x: number; y: number }, end: { x: number; y: number }) {
  const dist = Math.hypot(end.x - start.x, end.y - start.y);
  const lift = Math.min(16, Math.max(3.5, dist * 0.22));
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - lift;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

export function WorldMap({
  mapSrc,
  width,
  height,
  lines,
  points,
  lineColor = "#567FB2",
}: WorldMapProps) {
  const gradientId = `wm-${useId().replace(/:/g, "")}`;
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const hits = useMemo(() => hitTargets(points), [points]);
  const activeId = pinned ?? hover;
  const active = hits.find((point) => point.id === activeId) ?? null;

  return (
    <div className="relative w-full font-sans" style={{ aspectRatio: `${width} / ${height}` }} role="group" aria-label="KOLEEX hubs and markets">
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <img
          src={mapSrc}
          className="pointer-events-none h-full w-full select-none"
          alt=""
          draggable={false}
        />
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="pointer-events-none absolute inset-0 h-full w-full select-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
              <stop offset="8%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="92%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          {lines.map((line, index) => (
            <motion.path
              key={`${line.x1}-${line.y1}-${line.x2}-${line.y2}`}
              d={curve({ x: line.x1, y: line.y1 }, { x: line.x2, y: line.y2 })}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="0.45"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.15, delay: 0.28 * index, ease: "easeOut" }}
            />
          ))}
          {points.map((point) =>
            point.kind === "market" ? (
              <circle key={point.id} cx={point.x} cy={point.y} r="0.55" fill="#ffffff" />
            ) : (
              <g key={point.id}>
                <circle cx={point.x} cy={point.y} r="0.85" fill={lineColor} />
                <circle cx={point.x} cy={point.y} r="0.85" fill={lineColor} opacity="0.45">
                  <animate attributeName="r" from="0.85" to="2.6" dur="1.8s" begin="0s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.45" to="0" dur="1.8s" begin="0s" repeatCount="indefinite" />
                </circle>
              </g>
            ),
          )}
        </svg>
      </div>

      {hits.map((point) => (
        <button
          key={`hit-${point.id}`}
          type="button"
          aria-label={point.label}
          aria-pressed={pinned === point.id}
          className="absolute z-[1] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-0 bg-transparent p-0"
          style={{
            left: `${(point.x / width) * 100}%`,
            top: `${(point.y / height) * 100}%`,
            width: point.kind === "hub" ? 22 : 16,
            height: point.kind === "hub" ? 22 : 16,
          }}
          onMouseEnter={() => setHover(point.id)}
          onMouseLeave={() => setHover((current) => (current === point.id ? null : current))}
          onFocus={() => setHover(point.id)}
          onBlur={() => setHover((current) => (current === point.id ? null : current))}
          onClick={() => setPinned((current) => (current === point.id ? null : point.id))}
        />
      ))}

      {active ? (
        <p
          role="status"
          className="pointer-events-none absolute z-10 whitespace-nowrap rounded-full border border-[#567FB2] bg-[#0A0A0A]/95 px-2.5 py-1 text-[13px] font-medium text-white"
          style={{
            left: `${(active.x / width) * 100}%`,
            top: `${(active.y / height) * 100}%`,
            transform: active.y < 16 ? "translate(-50%, 12px)" : "translate(-50%, calc(-100% - 12px))",
          }}
        >
          {active.label}
        </p>
      ) : null}
    </div>
  );
}
