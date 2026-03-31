"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   3. Business Divisions — 2x2 grid with images, titles, descriptions.
   --------------------------------------------------------------------------- */

const divisions = [
  {
    name: "Industrial Technology",
    description: "Precision-engineered systems powering manufacturing lines, logistics networks, and critical infrastructure.",
    image: "/images/factory-floor.jpg",
    href: "/products/industrial-technology",
  },
  {
    name: "Energy Systems",
    description: "Next-generation energy platforms spanning generation, storage, and distribution for a sustainable future.",
    image: "/images/solar-panels.jpg",
    href: "/products/energy-systems",
  },
  {
    name: "Digital Solutions",
    description: "Enterprise software and connected platforms that turn operational data into decisive action.",
    image: "/images/server-room.jpg",
    href: "/products/digital-solutions",
  },
  {
    name: "Advanced Materials",
    description: "High-performance materials engineered at the molecular level for aerospace, medical, and industrial use.",
    image: "/images/composites.jpg",
    href: "/products/advanced-materials",
  },
];

export function DivisionsPreview() {
  const { ref, visible } = useScrollReveal(0.06);

  return (
    <section className="bg-black py-32 md:py-44 section-accent-top">
      <div ref={ref} className="max-w-[1100px] mx-auto px-5">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-overline mb-4" style={revealStyle(visible, 0)}>Our Divisions</p>
          <h2 className="text-display-sm text-gradient-silver" style={revealStyle(visible, 100)}>
            Four pillars of innovation.
          </h2>
          <p className="text-subtitle mt-5 max-w-xl mx-auto" style={revealStyle(visible, 200)}>
            Each division operates at the forefront of its industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {divisions.map((d, i) => (
            <Link
              key={d.name}
              href={d.href}
              className="card-image group block"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
                transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${300 + i * 100}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${300 + i * 100}ms`,
              }}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.name}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-7">
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-white">{d.name}</h3>
                <p className="text-[14px] leading-[1.55] text-white/35 mt-2">{d.description}</p>
                <p className="text-[14px] font-medium text-white/25 mt-5 group-hover:text-white/55 transition-colors duration-500">
                  Explore division →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
