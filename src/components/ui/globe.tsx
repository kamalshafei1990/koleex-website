"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type MutableRefObject, type RefObject } from "react";
import { Fog, MeshPhongMaterial, PerspectiveCamera, Scene, Vector3, type Group } from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

/* Aceternity GitHub globe (three-globe + react-three-fiber).
   Rotation speed, arc timing, and the dark hero treatment are Koleex's. */

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe;
    };
  }
}

extend({ ThreeGlobe: ThreeGlobe });

const CAMERA_Z = 300;
const features = (countries as { features: object[] }).features;

export type GlobeArc = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  arcDashGap?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

export type GlobeMarker = {
  id: string;
  lat: number;
  lng: number;
  label: string;
  kind: "hub" | "market";
};

type WorldProps = {
  globeConfig: GlobeConfig;
  data: GlobeArc[];
  markers: GlobeMarker[];
};

type GlobeProps = {
  globeConfig: GlobeConfig;
  data: GlobeArc[];
  globeRef: MutableRefObject<ThreeGlobe | null>;
};

function Globe({ globeConfig, data, globeRef }: GlobeProps) {
  const groupRef = useRef<Group>(null);
  const [ready, setReady] = useState(false);

  const pointSize = globeConfig.pointSize ?? 0.55;
  const atmosphereColor = globeConfig.atmosphereColor ?? "#567FB2";
  const showAtmosphere = globeConfig.showAtmosphere ?? true;
  const atmosphereAltitude = globeConfig.atmosphereAltitude ?? 0.16;
  const polygonColor = globeConfig.polygonColor ?? "rgba(255,255,255,0.5)";
  const arcLength = globeConfig.arcLength ?? 0.4;
  const arcDashGap = globeConfig.arcDashGap ?? 1;
  const arcTime = globeConfig.arcTime ?? 52000;

  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      const globe = new ThreeGlobe();
      globeRef.current = globe;
      groupRef.current.add(globe);
      setReady(true);
    }
  }, [globeRef]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !ready) return;
    const material = globe.globeMaterial() as MeshPhongMaterial;
    material.color.set(globeConfig.globeColor ?? "#121418");
    material.emissive.set(globeConfig.emissive ?? "#0A0A0A");
    material.emissiveIntensity = globeConfig.emissiveIntensity ?? 0.18;
    material.shininess = globeConfig.shininess ?? 0.85;
  }, [ready, globeRef, globeConfig.globeColor, globeConfig.emissive, globeConfig.emissiveIntensity, globeConfig.shininess]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !ready) return;

    const points = data.flatMap((arc) => [
      {
        lat: arc.startLat,
        lng: arc.startLng,
        color: "#567FB2",
        radius: 0.85,
        altitude: 0.01,
      },
      {
        lat: arc.endLat,
        lng: arc.endLng,
        color: "rgba(255,255,255,0.72)",
        radius: pointSize,
        altitude: 0,
      },
    ]);
    const unique = points.filter(
      (point, index, all) => all.findIndex((other) => other.lat === point.lat && other.lng === point.lng) === index,
    );

    globe
      .hexPolygonsData(features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(showAtmosphere)
      .atmosphereColor(atmosphereColor)
      .atmosphereAltitude(atmosphereAltitude)
      .hexPolygonColor(() => polygonColor);

    globe.arcCurveResolution(72).arcsTransitionDuration(0);

    globe
      .arcsData(data)
      .arcStartLat((item: object) => (item as GlobeArc).startLat)
      .arcStartLng((item: object) => (item as GlobeArc).startLng)
      .arcEndLat((item: object) => (item as GlobeArc).endLat)
      .arcEndLng((item: object) => (item as GlobeArc).endLng)
      .arcColor((item: object) => (item as GlobeArc).color)
      .arcAltitude((item: object) => (item as GlobeArc).arcAlt)
      .arcStroke(0.28)
      .arcDashLength(arcLength)
      .arcDashGap(arcDashGap)
      .arcDashInitialGap((item: object) => (item as GlobeArc).order)
      .arcDashAnimateTime(arcTime);

    globe
      .pointsData(unique)
      .pointColor((item: object) => (item as { color: string }).color)
      .pointsMerge(false)
      .pointAltitude((item: object) => (item as { altitude: number }).altitude)
      .pointRadius((item: object) => (item as { radius: number }).radius);

    globe.ringsData([]);
  }, [ready, globeRef, data, pointSize, showAtmosphere, atmosphereColor, atmosphereAltitude, polygonColor, arcLength, arcDashGap, arcTime]);

  return <group ref={groupRef} />;
}

function AimCamera({ lat, lng }: { lat: number; lng: number }) {
  const { camera } = useThree();
  useLayoutEffect(() => {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((90 - lng) * Math.PI) / 180;
    const phiSin = Math.sin(phi);
    camera.position.set(CAMERA_Z * phiSin * Math.cos(theta), CAMERA_Z * Math.cos(phi), CAMERA_Z * phiSin * Math.sin(theta));
    camera.lookAt(0, 0, 0);
  }, [camera, lat, lng]);
  return null;
}

function RendererConfig() {
  const { gl, size, camera } = useThree();
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.setClearColor(0x000000, 0);
    if (camera instanceof PerspectiveCamera) {
      camera.aspect = size.width / Math.max(1, size.height);
      camera.updateProjectionMatrix();
    }
  }, [gl, size, camera]);
  return null;
}

function MarkerProjector({
  globeRef,
  markers,
  rootRef,
  activeRef,
  tipRef,
}: {
  globeRef: MutableRefObject<ThreeGlobe | null>;
  markers: GlobeMarker[];
  rootRef: RefObject<HTMLDivElement | null>;
  activeRef: MutableRefObject<string | null>;
  tipRef: RefObject<HTMLParagraphElement | null>;
}) {
  const { camera } = useThree();
  const tmp = useMemo(() => new Vector3(), []);
  const center = useMemo(() => new Vector3(), []);
  const outward = useMemo(() => new Vector3(), []);

  useFrame(() => {
    const globe = globeRef.current;
    const root = rootRef.current;
    if (!globe || !root) return;
    globe.getWorldPosition(center);
    const width = root.clientWidth;
    const height = root.clientHeight;
    let activeX = 0;
    let activeY = 0;
    let activeVisible = false;

    for (const marker of markers) {
      const el = root.querySelector<HTMLButtonElement>(`[data-marker="${marker.id}"]`);
      if (!el) continue;
      const coords = globe.getCoords(marker.lat, marker.lng, 0.01);
      tmp.set(coords.x, coords.y, coords.z);
      globe.localToWorld(tmp);
      outward.copy(tmp).sub(center);
      const facing = outward.dot(camera.position.clone().sub(center));
      if (facing <= 0) {
        el.style.display = "none";
        continue;
      }
      const projected = tmp.clone().project(camera);
      const x = (projected.x * 0.5 + 0.5) * width;
      const y = (-projected.y * 0.5 + 0.5) * height;
      if (projected.z > 1 || x < -20 || y < -20 || x > width + 20 || y > height + 20) {
        el.style.display = "none";
        continue;
      }
      el.style.display = "block";
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (activeRef.current === marker.id) {
        activeX = x;
        activeY = y;
        activeVisible = true;
      }
    }

    const tip = tipRef.current;
    if (!tip) return;
    if (!activeVisible) {
      tip.style.visibility = "hidden";
      return;
    }
    tip.style.visibility = "visible";
    tip.style.transform = activeY < 56 ? `translate(${activeX}px, ${activeY}px) translate(-50%, 16px)` : `translate(${activeX}px, ${activeY}px) translate(-50%, calc(-100% - 16px))`;
  });

  return null;
}

export function World({ globeConfig, data, markers }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLParagraphElement>(null);
  const activeRef = useRef<string | null>(null);
  const labelId = useId();
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const activeId = pinned ?? hover;
  const active = markers.find((marker) => marker.id === activeId) ?? null;
  activeRef.current = activeId;
  const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const aim = globeConfig.initialPosition ?? { lat: 28.656, lng: 121.421 };

  const scene = useMemo(() => {
    const next = new Scene();
    next.fog = new Fog(0x0a0a0a, 380, 1800);
    return next;
  }, []);
  const camera = useMemo(() => new PerspectiveCamera(50, 1, 180, 1800), []);

  return (
    <div ref={rootRef} className="absolute inset-0" data-globe-routes={data.length}>
      <Canvas
        className="h-full w-full"
        scene={scene}
        camera={camera}
        frameloop={reduceMotion ? "demand" : "always"}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.75]}
      >
        <RendererConfig />
        <AimCamera lat={aim.lat} lng={aim.lng} />
        <ambientLight color={globeConfig.ambientLight} intensity={0.85} />
        <directionalLight color={globeConfig.directionalLeftLight} position={[-400, 100, 400]} />
        <directionalLight color={globeConfig.directionalTopLight} position={[-200, 500, 200]} />
        <pointLight color={globeConfig.pointLight} position={[-200, 500, 200]} intensity={0.55} />
        <Globe globeConfig={globeConfig} data={data} globeRef={globeRef} />
        <MarkerProjector globeRef={globeRef} markers={markers} rootRef={rootRef} activeRef={activeRef} tipRef={tipRef} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={CAMERA_Z}
          maxDistance={CAMERA_Z}
          autoRotate={reduceMotion ? false : (globeConfig.autoRotate ?? true)}
          autoRotateSpeed={globeConfig.autoRotateSpeed ?? 0.5}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
      {markers.map((marker) => (
        <button
          key={marker.id}
          type="button"
          data-marker={marker.id}
          aria-label={marker.label}
          aria-pressed={pinned === marker.id}
          aria-describedby={activeId === marker.id ? labelId : undefined}
          className="absolute left-0 top-0 z-[2] cursor-pointer rounded-full border-0 bg-transparent p-0"
          style={{ display: "none", width: marker.kind === "hub" ? 28 : 18, height: marker.kind === "hub" ? 28 : 18 }}
          onMouseEnter={() => setHover(marker.id)}
          onMouseLeave={() => setHover((current) => (current === marker.id ? null : current))}
          onFocus={() => setHover(marker.id)}
          onBlur={() => setHover((current) => (current === marker.id ? null : current))}
          onClick={() => setPinned((current) => (current === marker.id ? null : marker.id))}
        />
      ))}
      <p
        ref={tipRef}
        id={labelId}
        role="status"
        className="pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-full border border-[#567FB2] bg-[#0A0A0A]/95 px-2.5 py-1 text-[13px] font-medium text-white"
        style={{ visibility: active ? "visible" : "hidden" }}
      >
        {active?.label}
      </p>
    </div>
  );
}
