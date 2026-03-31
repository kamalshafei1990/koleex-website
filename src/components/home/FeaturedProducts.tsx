"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   Section 4: 2×2 tile grid — Like Apple's secondary product grid.
   Each tile: colored bg, centered text at top, image filling bottom.
   Tiny 12px gap between tiles. No rounded corners — square edges.
   --------------------------------------------------------------------------- */

function Tile({
  title,
  subtitle,
  href,
  learnLink,
  image,
  dark,
  visible,
  delay,
}: {
  title: string;
  subtitle: string;
  href: string;
  learnLink: string;
  image: string;
  dark: boolean;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`${dark ? "bg-black" : "bg-[#f5f5f7]"} text-center overflow-hidden`}
      style={revealStyle(visible, delay)}
    >
      <div className="pt-10 md:pt-14 px-6">
        <h2 className={`text-[36px] md:text-[48px] font-semibold leading-[1.05] tracking-[-0.04em] ${dark ? "text-white" : "text-[#1d1d1f]"}`}>
          {title}
        </h2>
        <p className={`text-[17px] md:text-[21px] font-normal leading-[1.19] tracking-[-0.012em] mt-1 ${dark ? "text-[#86868b]" : "text-[#6e6e73]"}`}>
          {subtitle}
        </p>
        <div className="flex items-center justify-center gap-5 mt-3">
          <Link href={href} className={`text-[17px] ${dark ? "text-[#2997ff]" : "text-[#0066cc]"} hover:underline underline-offset-[3px]`}>
            Learn more {">"}
          </Link>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <Image src={image} alt={title} width={1200} height={800} className="w-full h-[280px] md:h-[380px] object-cover" />
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  const { ref, visible } = useScrollReveal(0.05);

  return (
    <section ref={ref} className="px-[12px] py-[12px] bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
        <Tile title="CarbonX Pro" subtitle="Strength without compromise." href="/products/advanced-materials" learnLink="/products/advanced-materials" image="/images/composites.jpg" dark={false} visible={visible} delay={0} />
        <Tile title="GridVault" subtitle="Store. Distribute. Scale." href="/products/energy-systems" learnLink="/products/energy-systems" image="/images/wind-turbines.jpg" dark={false} visible={visible} delay={80} />
        <Tile title="CyberShield" subtitle="Enterprise-grade protection." href="/products/digital-solutions" learnLink="/products/digital-solutions" image="/images/server-room.jpg" dark={true} visible={visible} delay={0} />
        <Tile title="VisionX" subtitle="See what others can't." href="/products/industrial-technology" learnLink="/products/industrial-technology" image="/images/factory-floor.jpg" dark={true} visible={visible} delay={80} />
      </div>
    </section>
  );
}
