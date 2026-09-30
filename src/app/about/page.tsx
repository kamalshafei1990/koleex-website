import { DynamicPage } from "@/components/cms/DynamicPage";
import { StaticAbout } from "@/components/about/StaticAbout";
import { hubPage } from "@/lib/hub";
import type { Metadata } from "next";

/* ---------------------------------------------------------------------------
   About — the page built in the Koleex Hub's Website app when it has
   content there (read on the server through the Hub bridge), the static page
   until then.
   --------------------------------------------------------------------------- */

export const revalidate = 3600;

/* The title and description the Website app gives the page, else plain ones. */
export async function generateMetadata(): Promise<Metadata> {
  const page = (await hubPage("about"))?.page;
  return { title: page?.title || "About", description: page?.description || "Koleex International Group: who we are, what we make and where we work." };
}

export default function AboutPage() {
  return <DynamicPage slug="about" fallback={<StaticAbout />} />;
}
