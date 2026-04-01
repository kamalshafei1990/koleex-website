import { supabase } from "./supabase";
import type { PageRow, SectionRow } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   CMS Data Functions — Fetch pages and sections from Supabase.

   Usage:
     const page = await getPageBySlug("home");
     const sections = await getSectionsByPageId(page.id);

   Or combined:
     const { page, sections } = await getPageWithSections("home");

   All sections are:
   - Filtered to visible = true
   - Sorted by order ASC
   --------------------------------------------------------------------------- */

/* ── Get a single page by slug ── */
export async function getPageBySlug(slug: string): Promise<PageRow | null> {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`[CMS] Error fetching page "${slug}":`, error.message);
    return null;
  }

  return data;
}

/* ── Get all visible sections for a page ── */
export async function getSectionsByPageId(pageId: string): Promise<SectionRow[]> {
  const { data, error } = await supabase
    .from("sections")
    .select("*")
    .eq("page_id", pageId)
    .eq("visible", true)
    .order("order", { ascending: true });

  if (error) {
    console.error(`[CMS] Error fetching sections for page ${pageId}:`, error.message);
    return [];
  }

  return data || [];
}

/* ── Get page + sections in one call ── */
export async function getPageWithSections(slug: string): Promise<{
  page: PageRow | null;
  sections: SectionRow[];
}> {
  const page = await getPageBySlug(slug);

  if (!page) {
    return { page: null, sections: [] };
  }

  const sections = await getSectionsByPageId(page.id);

  return { page, sections };
}

/* ── Get all pages (for sitemap, admin, etc.) ── */
export async function getAllPages(): Promise<PageRow[]> {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("[CMS] Error fetching all pages:", error.message);
    return [];
  }

  return data || [];
}
