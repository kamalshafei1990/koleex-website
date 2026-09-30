import type { Metadata } from "next";
import { hubPage } from "@/lib/hub";
import { PageDocView } from "@/components/page-builder/PageDocView";
import { textIn } from "@/types/page-doc";
import { contentLang } from "@/i18n/config";
import { EnglishOnly } from "@/components/i18n/EnglishOnly";
import { SectionRenderer } from "./SectionRenderer";
import { ElementRenderer } from "./ElementRenderer";
import { getSectionSettings } from "@/lib/section-helpers";
import type { SectionRow, ElementRow } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   DynamicPage — a page built in the Koleex Hub's Website app (pages →
   sections → elements), read on the SERVER through the Hub bridge (lib/hub)
   and cached under "page:<slug>": visitors get finished HTML and never touch
   the Hub or its database. Until the page has content there (or the bridge
   answers nothing), the static fallback shows.
   --------------------------------------------------------------------------- */

interface DynamicPageProps {
  slug: string;
  fallback: React.ReactNode;
  /** The page's language (the Page Builder's words in it, else English). */
  lang?: string;
}

/** A page's title and description for search engines: the Page Builder's
 *  (English), else the page's own, else the given ones. */
export async function pageMetadata(slug: string, fallback: Metadata, lang = "en"): Promise<Metadata> {
  const data = await hubPage(slug);
  const c = contentLang(lang);
  const title = textIn(data?.doc?.seo.title, c) || data?.page.title || (fallback.title as string | undefined);
  const description = textIn(data?.doc?.seo.description, c) || data?.page.description || (fallback.description as string | undefined);
  return { ...fallback, title, description };
}

export async function DynamicPage({ slug, fallback, lang = "en" }: DynamicPageProps) {
  const data = await hubPage(slug);
  /* Built and published in the Hub's Page Builder (or its draft, in the
     signed preview). */
  if (data?.doc) return <PageDocView doc={data.doc} lang={lang} />;
  const rows = (data?.sections ?? []).filter((s) => s.visible !== false);
  /* The built-in page and the old editor's sections are English only. */
  if (rows.length === 0) return <EnglishOnly lang={lang}>{fallback}</EnglishOnly>;
  const sections = rows as unknown as SectionRow[];
  /* Each section's visible elements, in order; the zone comes from their
     settings, as the builder stores it. */
  const elements: Record<string, ElementRow[]> = {};
  for (const row of rows) {
    const list = (Array.isArray(row.elements) ? row.elements : [])
      .filter((e) => e.visible !== false)
      .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0))
      .map((e) => ({ ...e, zone: ((e.settings as Record<string, unknown> | null)?.zone as string) || "a" })) as unknown as ElementRow[];
    if (list.length) elements[String(row.id)] = list;
  }

  return (
    <EnglishOnly lang={lang}>
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
          const bg = section.background || "white";
          const bgPresets: Record<string, string> = { white: "#FFFFFF", light: "#F5F5F7", dark: "#1E1E20", black: "#000000" };
          const bgHex = bgPresets[bg] || bg;
          return (
            <section key={section.id} style={{ backgroundColor: bgHex }}>
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
    </EnglishOnly>
  );
}
