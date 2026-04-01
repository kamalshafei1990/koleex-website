"use client";

import { useEffect, useState } from "react";
import { getPageWithSections } from "@/lib/cms";
import { SectionRenderer } from "./SectionRenderer";
import type { SectionRow } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   DynamicPage — Loads sections from Supabase by page slug.
   Shows a loading state while fetching, then renders sections.
   If Supabase fails or returns empty, renders the static fallback.
   --------------------------------------------------------------------------- */

interface DynamicPageProps {
  slug: string;
  fallback: React.ReactNode;
}

export function DynamicPage({ slug, fallback }: DynamicPageProps) {
  const [sections, setSections] = useState<SectionRow[] | null>(null);
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

  // Loading — show nothing (static content renders instantly below)
  if (loading) return <>{fallback}</>;

  // Error or empty — show static fallback
  if (error || !sections) return <>{fallback}</>;

  // Success — render CMS sections
  return <SectionRenderer sections={sections} />;
}
