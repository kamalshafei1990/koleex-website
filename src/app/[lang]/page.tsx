import type { Metadata } from "next";
import { StaticHome } from "@/components/home/StaticHome";
import { DynamicPage, pageMetadata } from "@/components/cms/DynamicPage";

/* ---------------------------------------------------------------------------
   Homepage — the page "home" built in the Hub's Page Builder once it is
   published there, in the page's language; the built-in page until then.
   --------------------------------------------------------------------------- */

export const revalidate = 3600;

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata("home", {}, (await params).lang);
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  return <DynamicPage slug="home" lang={lang} fallback={<StaticHome />} />;
}
