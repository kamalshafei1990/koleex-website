"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   2. Featured Products — 3 product cards with images, hover zoom + lift.
   --------------------------------------------------------------------------- */

const products = [
  {
    name: "KX-9000 Robotic Arm",
    description: "Six-axis precision robotic system with AI-driven path planning and sub-micron repeatability.",
    image: "/images/hero-robot.jpg",
    href: "/products/industrial-technology/automation-robotics",
    division: "Industrial Technology",
  },
  {
    name: "SolarMax Ultra Panel",
    description: "Next-generation photovoltaic module delivering 24.5% cell efficiency for commercial installations.",
    image: "/images/solar-panels.jpg",
    href: "/products/energy-systems/renewable-generation",
    division: "Energy Systems",
  },
  {
    name: "KX-IoT Hub Pro",
    description: "Enterprise-grade IoT gateway connecting up to 50,000 devices with real-time analytics.",
    image: "/images/digital-globe.jpg",
    href: "/products/digital-solutions/iot-platforms",
    division: "Digital Solutions",
  },
];

export function FeaturedProducts() {
  const { ref, visible } = useScrollReveal(0.08);

  return (
    <section className="bg-black py-32 md:py-44 section-accent-top">
      <div ref={ref} className="max-w-[1100px] mx-auto px-5">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-overline mb-4" style={revealStyle(visible, 0)}>Featured Products</p>
          <h2 className="text-display-sm text-gradient-silver" style={revealStyle(visible, 100)}>
            Built for performance.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <Link
              key={p.name}
              href={p.href}
              className="card-image group block"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${250 + i * 120}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${250 + i * 120}ms`,
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-6 md:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/25 mb-2">{p.division}</p>
                <h3 className="text-[18px] font-semibold leading-[1.25] tracking-[-0.016em] text-white">{p.name}</h3>
                <p className="text-[14px] leading-[1.55] text-white/35 mt-2.5 line-clamp-2">{p.description}</p>
                <p className="text-[14px] font-medium text-white/30 mt-5 group-hover:text-white/60 transition-colors duration-500">
                  View product →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
