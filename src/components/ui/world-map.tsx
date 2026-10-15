"use client";

import { useEffect, useId, useMemo, useState } from "react";

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

function arc(start: { x: number; y: number }, end: { x: number; y: number }) {
  const dist = Math.hypot(end.x - start.x, end.y - start.y);
  const lift = Math.min(16, Math.max(3.5, dist * 0.22));
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - lift;
  let length = 0;
  let prevX = start.x;
  let prevY = start.y;
  const steps = 32;
  for (let step = 1; step <= steps; step += 1) {
    const t = step / steps;
    const mt = 1 - t;
    const x = mt * mt * start.x + 2 * mt * t * midX + t * t * end.x;
    const y = mt * mt * start.y + 2 * mt * t * midY + t * t * end.y;
    length += Math.hypot(x - prevX, y - prevY);
    prevX = x;
    prevY = y;
  }
  return {
    d: `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`,
    length,
  };
}

/* Ten lights, each walking its own list of destinations. */
const LANES = 10;
const STAGGER = 1.6;

const HUB_DELAY = [0.15, 1.7, 0.9, 2.5, 3.2, 4.0];

function routeTiming(lane: number) {
  return {
    duration: 16.2 + (lane % 5) * 0.75,
    delay: lane * STAGGER,
  };
}

export function WorldMap({
  mapSrc,
  width,
  height,
  lines,
  points,
  lineColor = "#567FB2",
}: WorldMapProps) {
  const rawId = useId().replace(/:/g, "");
  const glowFilterId = `wm-glow-${rawId}`;
  const travelName = `wm-travel-${rawId}`;
  const haloName = `wm-halo-${rawId}`;
  const hubName = `wm-hub-${rawId}`;
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const hits = useMemo(() => hitTargets(points), [points]);
  const routes = useMemo(
    () =>
      lines.map((line) => {
        const { d, length } = arc({ x: line.x1, y: line.y1 }, { x: line.x2, y: line.y2 });
        const coreDash = Math.min(7.2, Math.max(1.15, length * 0.14));
        const haloDash = Math.min(13.5, Math.max(2.1, length * 0.3));
        const tail = Math.min(length * 0.22, 8);
        return {
          d,
          length,
          tail,
          x1: line.x1,
          y1: line.y1,
          x2: line.x2,
          y2: line.y2,
          gap: length + haloDash + 4,
          coreDash,
          haloDash,
          coreFrom: coreDash,
          coreTo: -(length + (haloDash - coreDash)),
          haloFrom: haloDash,
          haloTo: -length,
        };
      }),
    [lines],
  );
  const lanes = useMemo(() => {
    const groups: (typeof routes)[] = Array.from({ length: LANES }, () => []);
    routes.forEach((route, index) => {
      groups[index % LANES].push(route);
    });
    return groups.filter((group) => group.length > 0);
  }, [routes]);
  const [cursor, setCursor] = useState<number[]>(() => Array.from({ length: LANES }, () => 0));
  const visible = lanes.map((lane, laneIndex) => {
    const step = cursor[laneIndex] ?? 0;
    return {
      ...lane[step % lane.length],
      ...routeTiming(laneIndex),
      delay: step === 0 ? laneIndex * STAGGER : 0,
      laneIndex,
      step,
    };
  });

  useEffect(() => {
    if (lanes.every((lane) => lane.length < 2)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];
    lanes.forEach((lane, laneIndex) => {
      if (lane.length < 2) return;
      const duration = routeTiming(laneIndex).duration;
      const tick = () => {
        setCursor((current) => {
          const next = current.slice();
          next[laneIndex] = (next[laneIndex] ?? 0) + 1;
          return next;
        });
        timers[laneIndex] = window.setTimeout(tick, duration * 1000);
      };
      timers[laneIndex] = window.setTimeout(tick, (laneIndex * STAGGER + duration) * 1000);
    });
    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [lanes]);
  const activeId = pinned ?? hover;
  const active = hits.find((point) => point.id === activeId) ?? null;
  let hubOrdinal = 0;

  return (
    <div
      className="relative w-full font-sans"
      style={{ aspectRatio: `${width} / ${height}` }}
      role="group"
      aria-label="KOLEEX hubs and markets"
      data-wm={rawId}
    >
      <style>{`
        @property --wm-p-${rawId} {
          syntax: "<number>";
          inherits: false;
          initial-value: 0;
        }
        @keyframes ${travelName} {
          0% { --wm-p-${rawId}: 0; opacity: 0; }
          8% { --wm-p-${rawId}: 0; opacity: 0; }
          16% { --wm-p-${rawId}: 0.05; opacity: 1; }
          28% { --wm-p-${rawId}: 0.42; opacity: 1; }
          38% { --wm-p-${rawId}: 0.84; opacity: 1; }
          46% { --wm-p-${rawId}: 1; opacity: 1; }
          54% { opacity: 0; }
          100% { --wm-p-${rawId}: 1; opacity: 0; }
        }
        @keyframes ${haloName} {
          0% { --wm-p-${rawId}: 0; opacity: 0; }
          8% { --wm-p-${rawId}: 0; opacity: 0; }
          16% { --wm-p-${rawId}: 0.05; opacity: 0.72; }
          28% { --wm-p-${rawId}: 0.42; opacity: 0.72; }
          38% { --wm-p-${rawId}: 0.84; opacity: 0.72; }
          46% { --wm-p-${rawId}: 1; opacity: 0.72; }
          54% { opacity: 0; }
          100% { --wm-p-${rawId}: 1; opacity: 0; }
        }
        @keyframes ${hubName} {
          0% { transform: scale(1); opacity: 0.28; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        [data-wm="${rawId}"] [data-route-core],
        [data-wm="${rawId}"] [data-route-halo] {
          stroke-dasharray: var(--dash) var(--gap);
          stroke-dashoffset: calc(var(--from) + (var(--to) - var(--from)) * var(--wm-p-${rawId}));
          opacity: 0;
          animation-duration: var(--route-dur);
          animation-timing-function: linear;
          animation-iteration-count: 1;
          animation-delay: var(--route-delay);
          animation-fill-mode: both;
        }
        [data-wm="${rawId}"] [data-route-core] { animation-name: ${travelName}; }
        [data-wm="${rawId}"] [data-route-halo] { animation-name: ${haloName}; }
        [data-wm="${rawId}"] [data-hub-pulse] {
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(1);
          opacity: 0.28;
          animation: ${hubName} 5.2s cubic-bezier(0.22, 0.04, 0.26, 1) infinite;
          animation-delay: var(--hub-delay);
        }
        @media (prefers-reduced-motion: reduce) {
          [data-wm="${rawId}"] [data-route-glow],
          [data-wm="${rawId}"] [data-hub-pulse] {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
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
          data-route-total={routes.length}
        >
          <defs>
            <filter id={glowFilterId} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="0.55" />
            </filter>
          </defs>
          {routes.map((route) => (
            <path
              key={`tail-${route.x2}-${route.y2}`}
              d={route.d}
              fill="none"
              stroke={lineColor}
              strokeWidth="0.14"
              strokeOpacity="0.2"
              strokeLinecap="round"
              strokeDasharray={`${route.tail} ${route.length + 2}`}
              strokeDashoffset={-(route.length - route.tail)}
            />
          ))}
          {visible.map((route) => (
            <g
              key={`${route.laneIndex}-${route.step}-${route.x2}-${route.y2}`}
              data-route-lane={route.laneIndex}
              style={{ ["--route-dur" as string]: `${route.duration}s`, ["--route-delay" as string]: `${route.delay}s` }}
            >
              <path
                d={route.d}
                fill="none"
                stroke={lineColor}
                strokeWidth="0.16"
                strokeOpacity="0.16"
                strokeLinecap="round"
              />
              <path
                data-route-glow=""
                data-route-halo=""
                d={route.d}
                fill="none"
                stroke={lineColor}
                strokeWidth="0.9"
                strokeLinecap="round"
                filter={`url(#${glowFilterId})`}
                style={{
                  ["--dash" as string]: `${route.haloDash}px`,
                  ["--gap" as string]: `${route.gap}px`,
                  ["--from" as string]: `${route.haloFrom}px`,
                  ["--to" as string]: `${route.haloTo}px`,
                }}
              />
              <path
                data-route-glow=""
                data-route-core=""
                d={route.d}
                fill="none"
                stroke={lineColor}
                strokeWidth="0.38"
                strokeLinecap="round"
                style={{
                  ["--dash" as string]: `${route.coreDash}px`,
                  ["--gap" as string]: `${route.gap}px`,
                  ["--from" as string]: `${route.coreFrom}px`,
                  ["--to" as string]: `${route.coreTo}px`,
                }}
              />
            </g>
          ))}
          {points.map((point) => {
            if (point.kind === "market") {
              return <circle key={point.id} cx={point.x} cy={point.y} r="0.3" fill="#ffffff" opacity="0.38" />;
            }
            const delay = HUB_DELAY[hubOrdinal] ?? hubOrdinal * 0.75;
            hubOrdinal += 1;
            return (
              <g key={point.id}>
                <circle
                  data-hub-pulse=""
                  cx={point.x}
                  cy={point.y}
                  r="0.64"
                  fill={lineColor}
                  style={{ ["--hub-delay" as string]: `${delay}s` }}
                />
                <circle cx={point.x} cy={point.y} r="0.58" fill={lineColor} />
              </g>
            );
          })}
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
