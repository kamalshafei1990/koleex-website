import { StaticHome } from "@/components/home/StaticHome";

/* ---------------------------------------------------------------------------
   Homepage — Apple.com-style 11-section static layout.

   Note: the CMS (DynamicPage) integration is temporarily disabled so the
   new Apple-style design is visible immediately. To re-enable CMS editing,
   run scripts/seed-home.ts to sync Supabase with the new layout, then
   swap this file back to:

     <DynamicPage slug="home" fallback={<StaticHome />} />
   --------------------------------------------------------------------------- */

export default function HomePage() {
  return <StaticHome />;
}
