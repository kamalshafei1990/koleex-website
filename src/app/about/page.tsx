import { DynamicPage, pageMetadata } from "@/components/cms/DynamicPage";
import { StaticAbout } from "@/components/about/StaticAbout";
import type { Metadata } from "next";

/* ---------------------------------------------------------------------------
   About — the page built in the Koleex Hub's Website app when it has
   content there (read on the server through the Hub bridge), the static page
   until then.
   --------------------------------------------------------------------------- */

export const revalidate = 3600;

/* The title and description the Hub gives the page, else plain ones. */
export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("about", { title: "About", description: "Koleex International Group: who we are, what we make and where we work." });
}

export default function AboutPage() {
  return <DynamicPage slug="about" fallback={<StaticAbout />} />;
}
