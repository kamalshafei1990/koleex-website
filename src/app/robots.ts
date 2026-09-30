import type { MetadataRoute } from "next";
import { siteUrl } from "@/i18n/config";

/* Everything public may be crawled except the site's own API; the sitemap
   lists every page in English, Arabic and Chinese. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
