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
interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata("about", { title: "About", description: "Koleex International Group: who we are, what we make and where we work." }, (await params).lang);
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  return <DynamicPage slug="about" lang={lang} fallback={<StaticAbout />} />;
}
