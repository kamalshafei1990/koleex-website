import type { MetadataRoute } from "next";
import { siteUrl } from "@/i18n/config";
import { resolveComingSoon } from "@/lib/coming-soon";

export const dynamic = "force-dynamic";

/* While the teaser is up, nothing is offered to crawlers. Afterwards,
   everything public may be crawled except the site's own API; the sitemap
   lists every page in English, Arabic and Chinese. */
export default async function robots(): Promise<MetadataRoute.Robots> {
  if (await resolveComingSoon()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
