"use client";

import { useEffect, useState } from "react";
import { getPageWithSections } from "@/lib/cms";
import { getElementsBySectionId } from "@/lib/elements";
import { SectionRenderer } from "./SectionRenderer";
import { ElementRenderer } from "./ElementRenderer";
import { getSectionSettings } from "@/lib/section-helpers";
import type { SectionRow, ElementRow } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   DynamicPage — Loads sections + elements from Supabase by page slug.
   Shows static fallback while loading or if CMS is empty/fails.
   --------------------------------------------------------------------------- */

interface DynamicPageProps {
  slug: string;
  fallback: React.ReactNode;
}

export function DynamicPage({ slug, fallback }: DynamicPageProps) {
  const [sections, setSections] = useState<SectionRow[] | null>(null);
  const [elements, setElements] = useState<Record<string, ElementRow[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { sections: data } = await getPageWithSections(slug);
        if (!cancelled) {
          if (data && data.length > 0) {
            setSections(data);
            // Load elements for each section
            const elementsMap: Record<string, ElementRow[]> = {};
            await Promise.all(
              data.map(async (section) => {
                const els = await getElementsBySectionId(section.id);
                if (els.length > 0) elementsMap[section.id] = els;
              })
            );
            if (!cancelled) setElements(elementsMap);
          } else {
            setError(true);
          }
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) return <>{fallback}</>;
  if (error || !sections) return <>{fallback}</>;

  return (
    <>
      {sections.map((section) => {
        const sectionElements = elements[section.id] || [];
        const settings = getSectionSettings(section);

        // ELEMENTS MODE: when section has elements, render them in a grid
        // with the section's background — SectionRenderer is skipped.
        if (sectionElements.length > 0) {
          const cols = settings.columns || 1;
          const rows = settings.rows || 0;
          const gap = settings.gap || "24px";
          const pt = settings.paddingTop || "48px";
          const pb = settings.paddingBottom || "48px";
          const bg = section.background;
          const bgClass = bg === "dark" ? "bg-[#1d1d1f]" : bg === "black" ? "bg-black" : bg === "light" ? "bg-[#f5f5f7]" : "bg-white";
          return (
            <section key={section.id} className={bgClass}>
              <div className="max-w-[1000px] mx-auto px-6" style={{ paddingTop: pt, paddingBottom: pb }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gridTemplateRows: rows ? `repeat(${rows}, auto)` : undefined,
                  gap,
                  alignItems: "center",
                }}>
                  <ElementRenderer elements={sectionElements} />
                </div>
              </div>
            </section>
          );
        }

        // SECTION MODE: no elements → render built-in section content
        return (
          <div key={section.id}>
            <SectionRenderer sections={[section]} />
          </div>
        );
      })}
    </>
  );
}
