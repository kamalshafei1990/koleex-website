import type { Metadata } from "next";
import { StaticHome } from "@/components/home/StaticHome";
import { DynamicPage, pageMetadata } from "@/components/cms/DynamicPage";

/* ---------------------------------------------------------------------------
   Homepage — the page "home" built in the Hub's Page Builder once it is
   published there; the built-in page until then.
   --------------------------------------------------------------------------- */

export const revalidate = 3600;

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("home", {});
}

export default function HomePage() {
  return <DynamicPage slug="home" fallback={<StaticHome />} />;
}
