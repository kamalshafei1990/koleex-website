"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useScrollReveal, revealStyle, revealScaleStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   SplitSection — Image + text side by side (Figma pattern).
   Flip = image on right. Default = image on left.
   --------------------------------------------------------------------------- */

interface SplitSectionProps {
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  title: string;
  description: string;
  flip?: boolean;
  dark?: boolean;
  children?: React.ReactNode;
}

export function SplitSection({
  image,
  imageAlt = "",
  eyebrow,
  title,
  description,
  flip = false,
  dark = true,
  children,
}: SplitSectionProps) {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className={cn("py-20 md:py-32 overflow-hidden", dark ? "bg-black" : "bg-white")}>
      <div className="max-w-[1120px] mx-auto px-6">
        <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center", flip && "lg:direction-rtl")}>
          {/* Image */}
          <div className={cn(flip && "lg:order-2")} style={revealScaleStyle(visible, 0)}>
            <Image
              src={image}
              alt={imageAlt}
              width={1200}
              height={800}
              className="w-full h-auto object-cover rounded-none"
            />
          </div>

          {/* Text */}
          <div className={cn(flip && "lg:order-1")}>
            {eyebrow && (
              <p className={cn("text-[12px] font-semibold uppercase tracking-[0.08em] mb-4", dark ? "text-white/30" : "text-[#86868b]")} style={revealStyle(visible, 100)}>
                {eyebrow}
              </p>
            )}
            <h2 className={cn("text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em]", dark ? "text-white" : "text-[#1d1d1f]")} style={revealStyle(visible, 150)}>
              {title}
            </h2>
            <p className={cn("text-[17px] leading-[1.65] mt-5", dark ? "text-white/40" : "text-[#6e6e73]")} style={revealStyle(visible, 250)}>
              {description}
            </p>
            {children && <div style={revealStyle(visible, 350)}>{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
