"use client"

import { useEffect, useRef } from "react"
import cobeCreateGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"
/* Stock cobe draws at most 64 markers. Catalog markets plus hubs need more. */
import createGlobeMarkets from "@/vendor/cobe-markets"

import { cn } from "@/lib/utils"

const createGlobe = createGlobeMarkets as typeof cobeCreateGlobe

const MOVEMENT_DAMPING = 1400
/* Radians per frame. Magic UI’s default is 0.005; Coming Soon uses half of that. */
const AUTO_ROTATE = 0.0025
const CLICK_SLOP = 8

export type GlobeMarker = {
  location: [number, number]
  size: number
  name?: string
  flag?: string
  color?: [number, number, number]
}

/* cobe maps a front-facing city to the center when phi/theta match locationToAngles. */
function projectMarker(
  location: readonly [number, number],
  phi: number,
  theta: number,
  width: number,
  height: number,
) {
  const lat = (location[0] * Math.PI) / 180
  const lng = (location[1] * Math.PI) / 180 - Math.PI
  const cosLat = Math.cos(lat)
  const world: [number, number, number] = [
    -cosLat * Math.cos(lng),
    Math.sin(lat),
    cosLat * Math.sin(lng),
  ]
  const ct = Math.cos(theta)
  const cp = Math.cos(phi)
  const st = Math.sin(theta)
  const sp = Math.sin(phi)
  const x = cp * world[0] + sp * world[2]
  const y = sp * st * world[0] + ct * world[1] - cp * st * world[2]
  const z = -sp * ct * world[0] + st * world[1] + cp * ct * world[2]
  if (z <= 0.08) return null
  const aspect = width / height
  const nx = (x * 0.8) / aspect
  const ny = y * 0.8
  return {
    x: ((nx + 1) / 2) * width,
    y: height - ((ny + 1) / 2) * height,
    z,
  }
}

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
  tipClassName,
}: {
  className?: string
  config?: COBEOptions
  tipClassName?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const phiRef = useRef(config.phi)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const pointerDown = useRef<{ x: number; y: number } | null>(null)
  const pointerOver = useRef(false)
  const pointerClient = useRef({ x: 0, y: 0 })
  const rectRef = useRef({ left: 0, top: 0, width: 0, height: 0 })
  const hoverIndex = useRef<number | null>(null)
  const pinnedIndex = useRef<number | null>(null)
  const shownIndex = useRef<number | null>(null)
  const markersRef = useRef<GlobeMarker[]>([])
  const thetaRef = useRef(config.theta ?? 0)
  markersRef.current = (config.markers ?? []) as GlobeMarker[]
  thetaRef.current = config.theta ?? 0

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const cacheRect = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    rectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
  }

  const hitTest = (clientX: number, clientY: number, phi: number) => {
    const { left, top, width, height } = rectRef.current
    if (width < 8 || height < 8) return null
    const x = clientX - left
    const y = clientY - top
    const markers = markersRef.current
    let best = -1
    let bestDist = Infinity
    for (let i = 0; i < markers.length; i++) {
      const marker = markers[i]
      if (!marker.name) continue
      const point = projectMarker(marker.location, phi, thetaRef.current, width, height)
      if (!point) continue
      const dist = Math.hypot(point.x - x, point.y - y)
      const radius = Math.max(16, marker.size * 0.4 * width + 8)
      if (dist <= radius && dist < bestDist) {
        best = i
        bestDist = dist
      }
    }
    return best >= 0 ? best : null
  }

  const syncTip = (phi: number) => {
    const el = tipRef.current
    const canvas = canvasRef.current
    if (!el || !canvas) return
    if (pointerOver.current && pointerInteracting.current === null) {
      hoverIndex.current = hitTest(pointerClient.current.x, pointerClient.current.y, phi)
    }
    const index = hoverIndex.current ?? pinnedIndex.current
    const { width, height } = rectRef.current
    const marker = index == null ? undefined : markersRef.current[index]
    const point =
      marker?.name && width >= 8
        ? projectMarker(marker.location, phi, thetaRef.current, width, height)
        : null
    if (!marker?.name || !point) {
      el.dataset.open = "false"
      shownIndex.current = null
      if (canvas && pointerInteracting.current === null) canvas.style.cursor = "grab"
      return
    }
    if (shownIndex.current !== index) {
      shownIndex.current = index
      const flag = el.querySelector("[data-flag]")
      const name = el.querySelector("[data-name]")
      if (flag) flag.textContent = marker.flag ?? ""
      if (name) name.textContent = marker.name
    }
    el.dataset.open = "true"
    const tipW = el.offsetWidth
    const tipH = el.offsetHeight
    let shift = 0
    if (point.x - tipW / 2 < 8) shift = 8 - (point.x - tipW / 2)
    if (point.x + tipW / 2 > width - 8) shift = width - 8 - (point.x + tipW / 2)
    const above = point.y - tipH - 14 > 6
    el.style.left = `${point.x}px`
    el.style.top = `${point.y}px`
    el.style.transform = above
      ? `translate(calc(-50% + ${shift}px), calc(-100% - 12px))`
      : `translate(calc(-50% + ${shift}px), 14px)`
    if (pointerInteracting.current === null) canvas.style.cursor = "pointer"
  }

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    /* Heavy WebGL stays off when the visitor asks for less motion. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const onResize = () => {
      widthRef.current = canvas.offsetWidth
    }

    window.addEventListener("resize", onResize)
    onResize()
    if (widthRef.current < 8) {
      window.removeEventListener("resize", onResize)
      return
    }

    const dpr = Math.min(Math.max(config.devicePixelRatio || 1, 1), 2)

    const globe = createGlobe(canvas, {
      ...config,
      width: widthRef.current * dpr,
      height: widthRef.current * dpr,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += AUTO_ROTATE
        const phi = phiRef.current + rs.get()
        state.phi = phi
        state.width = widthRef.current * dpr
        state.height = widthRef.current * dpr
        syncTip(phi)
      },
    })

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-150",
        className
      )}
    >
      <canvas
        className={cn("size-full")}
        ref={canvasRef}
        aria-hidden="true"
        onPointerDown={(e) => {
          pointerDown.current = { x: e.clientX, y: e.clientY }
          hoverIndex.current = null
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
          cacheRect()
        }}
        onPointerUp={(e) => {
          const down = pointerDown.current
          pointerDown.current = null
          updatePointerInteraction(null)
          if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) >= CLICK_SLOP) return
          cacheRect()
          const phi = phiRef.current + rs.get()
          const hit = hitTest(e.clientX, e.clientY, phi)
          pinnedIndex.current = hit == null || pinnedIndex.current === hit ? null : hit
          hoverIndex.current = hit
          syncTip(phi)
        }}
        onPointerEnter={() => {
          pointerOver.current = true
          cacheRect()
        }}
        onPointerLeave={() => {
          pointerOver.current = false
          hoverIndex.current = null
          pointerDown.current = null
          updatePointerInteraction(null)
          syncTip(phiRef.current + rs.get())
        }}
        onPointerMove={(e) => {
          pointerClient.current = { x: e.clientX, y: e.clientY }
          if (pointerInteracting.current !== null) {
            updateMovement(e.clientX)
            return
          }
          cacheRect()
          hoverIndex.current = hitTest(e.clientX, e.clientY, phiRef.current + rs.get())
          syncTip(phiRef.current + rs.get())
        }}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
      <div ref={tipRef} className={tipClassName} data-open="false" role="status">
        <span data-flag />
        <span data-name />
      </div>
    </div>
  )
}
