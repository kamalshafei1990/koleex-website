"use client";

import Link from "next/link";
import type { SectionRow } from "@/types/supabase";
import { getSectionSettings, getButtonConfig, getButtonClasses, buildHref } from "@/lib/section-helpers";

/* ---------------------------------------------------------------------------
   BgHeroSection — Full background image with overlay + content.
   Supports: overlay opacity, text alignment, text mode, content width,
   vertical alignment, and styled buttons.
   --------------------------------------------------------------------------- */

export function BgHeroSection({ section }: { section: SectionRow }) {
  const settings = getSectionSettings(section);
  const btn1 = getButtonConfig(section, "btn1");
  const btn2 = getButtonConfig(section, "btn2");
  const dark = settings.textMode !== "dark";

  const widthMap = { narrow: "max-w-[500px]", medium: "max-w-[700px]", wide: "max-w-[900px]", full: "max-w-full" };
  const alignMap = { left: "text-left items-start", center: "text-center items-center", right: "text-right items-end" };
  const vAlignMap = { top: "justify-start pt-20 md:pt-32", center: "justify-center", bottom: "justify-end pb-20 md:pb-32" };

  return (
    <section className="relative min-h-[80vh] flex overflow-hidden">
      {/* Background image or video */}
      {section.video_url ? (
        <video
          src={section.video_url}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : section.image_url ? (
        <img
          src={section.image_url}
          alt={section.image_alt || ""}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : null}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${(settings.overlayOpacity || 60) / 100})` }}
      />

      {/* Content */}
      <div className={`relative z-10 w-full flex flex-col px-8 md:px-16 py-16 ${vAlignMap[settings.verticalAlign || "center"]}`}>
        <div className={`${widthMap[settings.contentWidth || "medium"]} mx-auto flex flex-col ${alignMap[settings.textAlign || "center"]}`}>
          {section.title && (
            <h1 className={`text-[48px] md:text-[72px] font-bold leading-[1.04] tracking-[-0.04em] ${dark ? "text-white" : "text-[#1d1d1f]"}`}>
              {section.title}
            </h1>
          )}
          {section.subtitle && (
            <p className={`text-[21px] md:text-[28px] font-normal leading-[1.2] mt-4 ${dark ? "text-white/60" : "text-[#6e6e73]"}`}>
              {section.subtitle}
            </p>
          )}
          {section.content && (
            <p className={`text-[16px] leading-[1.65] mt-5 max-w-[560px] ${dark ? "text-white/40" : "text-[#86868b]"}`}>
              {section.content}
            </p>
          )}

          {/* Buttons */}
          {(btn1.text || btn2.text) && (
            <div className={`flex flex-wrap gap-4 mt-8 ${settings.textAlign === "center" ? "justify-center" : settings.textAlign === "right" ? "justify-end" : "justify-start"}`}>
              {btn1.text && (
                <Link href={buildHref(btn1)} target={btn1.newTab ? "_blank" : undefined} className={getButtonClasses(btn1, dark)}>
                  {btn1.text}
                </Link>
              )}
              {btn2.text && (
                <Link href={buildHref(btn2)} target={btn2.newTab ? "_blank" : undefined} className={getButtonClasses(btn2, dark)}>
                  {btn2.text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
