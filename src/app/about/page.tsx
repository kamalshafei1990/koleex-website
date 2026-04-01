"use client";

import { DynamicPage } from "@/components/cms/DynamicPage";
import { StaticAbout } from "@/components/about/StaticAbout";

/* ---------------------------------------------------------------------------
   About Page — CMS-driven with static fallback.

   1. Tries to load sections from Supabase (pages.slug = "about")
   2. Renders them via SectionRenderer (layout-based)
   3. If Supabase fails or returns empty, shows StaticAbout (all 16 sections)
   --------------------------------------------------------------------------- */

export default function AboutPage() {
  return (
    <DynamicPage slug="about" fallback={<StaticAbout />} />
  );
}
