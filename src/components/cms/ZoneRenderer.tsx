"use client";

import type { ElementRow, ZoneLayout } from "@/types/supabase";
import { ElementRenderer } from "./ElementRenderer";

/* ---------------------------------------------------------------------------
   ZoneRenderer — Renders elements in layout zones (columns).
   Each element has a `zone` field ("a", "b", "c", "d") that determines
   which column it appears in.
   --------------------------------------------------------------------------- */

const layoutGrids: Record<ZoneLayout, { cols: string; zones: string[] }> = {
  "1-col": { cols: "grid-cols-1", zones: ["a"] },
  "2-col": { cols: "grid-cols-1 md:grid-cols-2", zones: ["a", "b"] },
  "3-col": { cols: "grid-cols-1 md:grid-cols-3", zones: ["a", "b", "c"] },
  "4-col": { cols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4", zones: ["a", "b", "c", "d"] },
  "70-30": { cols: "grid-cols-1 md:grid-cols-[7fr_3fr]", zones: ["a", "b"] },
  "30-70": { cols: "grid-cols-1 md:grid-cols-[3fr_7fr]", zones: ["a", "b"] },
  "60-40": { cols: "grid-cols-1 md:grid-cols-[6fr_4fr]", zones: ["a", "b"] },
  "40-60": { cols: "grid-cols-1 md:grid-cols-[4fr_6fr]", zones: ["a", "b"] },
};

interface ZoneRendererProps {
  elements: ElementRow[];
  layout: ZoneLayout;
  gap?: string;
  isEditing?: boolean;
  onAddToZone?: (zone: string) => void;
}

export function ZoneRenderer({
  elements,
  layout,
  gap = "gap-8",
  isEditing = false,
  onAddToZone,
}: ZoneRendererProps) {
  const config = layoutGrids[layout] || layoutGrids["1-col"];

  return (
    <div className={`grid ${config.cols} ${gap}`}>
      {config.zones.map((zone) => {
        const zoneElements = elements.filter((el) => (el.zone || "a") === zone);

        return (
          <div key={zone} className={`min-h-[40px] ${isEditing ? "border border-dashed border-white/10 rounded-lg p-4" : ""}`}>
            {zoneElements.length > 0 ? (
              <div className="space-y-4">
                <ElementRenderer elements={zoneElements} />
              </div>
            ) : isEditing ? (
              <div className="flex items-center justify-center h-full min-h-[80px] text-[11px] text-white/15">
                Zone {zone.toUpperCase()}
                {onAddToZone && (
                  <button
                    onClick={() => onAddToZone(zone)}
                    className="ml-2 text-[10px] text-blue-400/40 hover:text-blue-400/80 transition-colors"
                  >
                    + Add
                  </button>
                )}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/* Zone labels for the admin UI */
export function getZoneLabels(layout: ZoneLayout): string[] {
  return (layoutGrids[layout] || layoutGrids["1-col"]).zones;
}

export function getZoneCount(layout: ZoneLayout): number {
  return (layoutGrids[layout] || layoutGrids["1-col"]).zones.length;
}
