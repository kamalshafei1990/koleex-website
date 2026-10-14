import type { MetadataRoute } from "next";
import { siteUrl } from "@/i18n/config";
import { isComingSoon } from "@/lib/coming-soon";

export const dynamic = "force-dynamic";

/* While the teaser is up, nothing is offered to crawlers. Afterwards,
   everything public may be crawled except the site's own API; the sitemap
   lists every page in English, Arabic and Chinese. */
export default function robots(): MetadataRoute.Robots {
  if (isComingSoon()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
