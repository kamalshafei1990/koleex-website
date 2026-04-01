"use client";

import { useEffect, useState } from "react";
import { getPageWithSections } from "@/lib/cms";
import { getElementsBySectionId } from "@/lib/elements";
import { SectionRenderer } from "./SectionRenderer";
import { ElementRenderer } from "./ElementRenderer";
import { ZoneRenderer } from "./ZoneRenderer";
import { getSectionSettings } from "@/lib/section-helpers";
import type { SectionRow, ElementRow, ZoneLayout } from "@/types/supabase";

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
        return (
          <div key={section.id}>
            <SectionRenderer sections={[section]} />
            {sectionElements.length > 0 && (() => {
              const settings = getSectionSettings(section);
              const zoneLayout = settings.zoneLayout || "1-col";
              return (
                <div className="max-w-[1000px] mx-auto px-6 py-8">
                  {zoneLayout === "1-col" ? (
                    <div className="space-y-6"><ElementRenderer elements={sectionElements} /></div>
                  ) : (
                    <ZoneRenderer elements={sectionElements} layout={zoneLayout as ZoneLayout} />
                  )}
                </div>
              );
            })()}
          </div>
        );
      })}
    </>
  );
}
