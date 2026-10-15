"use client";

import dynamic from "next/dynamic";
import type { GlobeArc, GlobeMarker } from "@/components/ui/globe";

const KoleexGlobe = dynamic(() => import("./KoleexGlobe").then((mod) => mod.KoleexGlobe), { ssr: false });

type GlobeFrameProps = {
  arcs: GlobeArc[];
  markers: GlobeMarker[];
  arcLength: number;
  arcDashGap: number;
  arcTime: number;
};

export function GlobeFrame(props: GlobeFrameProps) {
  return <KoleexGlobe {...props} />;
}
