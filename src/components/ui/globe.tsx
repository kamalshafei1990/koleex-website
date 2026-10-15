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
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(config.phi)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

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
        state.phi = phiRef.current + rs.get()
        state.width = widthRef.current * dpr
        state.height = widthRef.current * dpr
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
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
