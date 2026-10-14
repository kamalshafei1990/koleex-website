import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon/ComingSoon";
import { isComingSoon } from "@/lib/coming-soon";

/* connection() opts this route into per-request rendering so the flag is
   read live. A cached teaser would keep showing after COMING_SOON=false. */

const TITLE = "KOLEEX International Group – Shaping the Future";
const DESCRIPTION =
  "Koleex International Group. Industrial garment-production systems since 1955. Our new website is in development. Contact our team.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

/* Internal route. Middleware rewrites "/" here while the gate is on, and
   sends every other public URL back to "/". With the gate off, this page
   leaves so the real homepage can answer. */
export default async function ComingSoonPage() {
  await connection();
  if (!isComingSoon()) redirect("/");
  return <ComingSoon />;
}
