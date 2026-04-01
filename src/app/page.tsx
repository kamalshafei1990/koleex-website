"use client";

import { DynamicPage } from "@/components/cms/DynamicPage";
import { StaticHome } from "@/components/home/StaticHome";

/* ---------------------------------------------------------------------------
   Homepage — CMS-driven with static fallback.

   1. Tries to load sections from Supabase (pages.slug = "home")
   2. Renders them via SectionRenderer (layout-based)
   3. If Supabase fails or returns empty, shows StaticHome
   --------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <DynamicPage slug="home" fallback={<StaticHome />} />
  );
}
