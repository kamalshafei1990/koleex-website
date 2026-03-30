"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   FeaturedProducts — 2×2 tile grid with premium dark glass cards.
   Staggered reveal, hover lift + image zoom, generous spacing.
   --------------------------------------------------------------------------- */

const tiles = [
  { label: "Advanced Materials", title: "CarbonX Pro", subtitle: "Strength without compromise.", href: "/products/advanced-materials", image: "/images/composites.jpg" },
  { label: "Energy Systems", title: "GridVault", subtitle: "Store. Distribute. Scale.", href: "/products/energy-systems", image: "/images/wind-turbines.jpg" },
  { label: "Digital Solutions", title: "CyberShield", subtitle: "Enterprise-grade protection.", href: "/products/digital-solutions", image: "/images/server-room.jpg" },
  { label: "Industrial Technology", title: "VisionX", subtitle: "See what others can't.", href: "/products/industrial-technology", image: "/images/factory-floor.jpg" },
];

export function FeaturedProducts() {
  const { ref, visible } = useScrollReveal(0.05);

  return (
    <section ref={ref} className="bg-black py-4 section-accent-top">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tiles.map((tile, i) => (
            <Link
              key={tile.title}
              href={tile.href}
              className="card-image group block text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
                transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
              }}
            >
              <div className="pt-14 md:pt-16 px-8 pb-0">
                <p className="text-overline mb-3">{tile.label}</p>
                <h3 className="text-[34px] md:text-[42px] font-bold leading-[1.06] tracking-[-0.038em] text-white">
                  {tile.title}
                </h3>
                <p className="text-[16px] font-light text-white/35 mt-3 tracking-[-0.01em]">{tile.subtitle}</p>
                <p className="text-[15px] font-medium text-white/30 mt-6 group-hover:text-white/55 transition-colors duration-500">
                  Learn more →
                </p>
              </div>
              <div className="mt-8 md:mt-10 overflow-hidden">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  width={1200}
                  height={800}
                  className="w-full h-[260px] md:h-[320px] object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
