import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hubPage, hubPages } from "@/lib/hub";
import { PageDocView } from "@/components/page-builder/PageDocView";
import { pageMetadata } from "@/components/cms/DynamicPage";

/* ---------------------------------------------------------------------------
   Any page built in the Hub's Page Builder that has no screen of its own
   here (a new page — "support", "warranty", …), at /<slug>, once it is
   published (or its draft, in the Hub's signed preview). The site's own
   screens (/about, /products, …) win over this route; "home" is "/".
   --------------------------------------------------------------------------- */

export const revalidate = 3600;

interface Props { params: Promise<{ slug: string }> }

/* The pages published in the Hub are built ahead; any other on first visit. */
export async function generateStaticParams() {
  return (await hubPages()).filter((p) => (p.version ?? 0) > 0 && p.slug !== "home").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).slug, {});
}

export default async function BuiltPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "home") notFound();
  const data = await hubPage(slug);
  if (!data?.doc) notFound();
  return <PageDocView doc={data.doc} />;
}
