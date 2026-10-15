"use client";

import { World, type GlobeArc, type GlobeMarker } from "@/components/ui/globe";

type KoleexGlobeProps = {
  arcs: GlobeArc[];
  markers: GlobeMarker[];
  arcLength: number;
  arcDashGap: number;
  arcTime: number;
};

export function KoleexGlobe({ arcs, markers, arcLength, arcDashGap, arcTime }: KoleexGlobeProps) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <World
      data={arcs}
      markers={markers}
      globeConfig={{
        globeColor: "#121418",
        showAtmosphere: true,
        atmosphereColor: "#567FB2",
        atmosphereAltitude: 0.16,
        emissive: "#0A0A0A",
        emissiveIntensity: 0.18,
        shininess: 0.85,
        polygonColor: "rgba(255,255,255,0.5)",
        ambientLight: "#d7dde8",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#f4f7fb",
        pointLight: "#567FB2",
        pointSize: 0.48,
        arcTime: reduceMotion ? 1000000000 : arcTime,
        arcLength,
        arcDashGap,
        autoRotate: !reduceMotion,
        autoRotateSpeed: 0.5,
        initialPosition: { lat: 28.656, lng: 121.421 },
      }}
    />
  );
}
