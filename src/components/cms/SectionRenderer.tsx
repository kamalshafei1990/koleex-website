"use client";

import type { SectionRow } from "@/types/supabase";
import { HeroSection } from "./sections/HeroSection";
import { ImageLeftSection } from "./sections/ImageLeftSection";
import { ImageRightSection } from "./sections/ImageRightSection";
import { CardsSection } from "./sections/CardsSection";
import { GridSection } from "./sections/GridSection";
import { NumbersSection } from "./sections/NumbersSection";
import { VideoSection } from "./sections/VideoSection";
import { CTASection } from "./sections/CTASection";
import { QuoteSection } from "./sections/QuoteSection";
import { FullImageSection } from "./sections/FullImageSection";

/* ---------------------------------------------------------------------------
   SectionRenderer — Takes an array of SectionRow[] from Supabase and
   renders the correct component for each layout type.

   Usage:
     <SectionRenderer sections={sections} />
   --------------------------------------------------------------------------- */

const layoutMap: Record<string, React.ComponentType<{ section: SectionRow }>> = {
  hero: HeroSection,
  "image-left": ImageLeftSection,
  "image-right": ImageRightSection,
  cards: CardsSection,
  grid: GridSection,
  numbers: NumbersSection,
  video: VideoSection,
  cta: CTASection,
  quote: QuoteSection,
  "full-image": FullImageSection,
};

interface SectionRendererProps {
  sections: SectionRow[];
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        const Component = layoutMap[section.layout];

        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            return (
              <div key={section.id} className="bg-red-500/10 border border-red-500/20 p-8 text-center text-red-400 text-sm">
                Unknown layout: <code>{section.layout}</code> (section: {section.section_key})
              </div>
            );
          }
          return null;
        }

        return <Component key={section.id} section={section} />;
      })}
    </>
  );
}
