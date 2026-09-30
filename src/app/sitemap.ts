import type { MetadataRoute } from "next";
import { hubPages, hubProducts, hubTaxonomy } from "@/lib/hub";
import { CONTENT_LANGS, siteUrl } from "@/i18n/config";

/* ---------------------------------------------------------------------------
   sitemap.xml — every page in the three languages with real translations
   (English, Arabic, Chinese), each entry naming its other languages
   (hreflang): the site's own pages, the Hub's divisions, categories and
   types with products, every product (active and visible), and the pages
   published in the Page Builder. Rebuilt hourly and whenever the Hub says
   products or the taxonomy changed.
   --------------------------------------------------------------------------- */

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const entry = (path: string, priority: number, lastModified?: string | null): MetadataRoute.Sitemap =>
    CONTENT_LANGS.map((lang) => ({
      url: `${base}/${lang}${path}`,
      lastModified: lastModified ? new Date(lastModified) : undefined,
      priority,
      alternates: { languages: Object.fromEntries(CONTENT_LANGS.map((l) => [l, `${base}/${l}${path}`])) },
    }));

  const out: MetadataRoute.Sitemap = [
    ...entry("", 1),
    ...entry("/products", 0.9),
    ...entry("/about", 0.6),
    ...entry("/careers", 0.5),
    ...entry("/contact", 0.6),
    ...entry("/catalogs", 0.6),
  ];

  const divisions = await hubTaxonomy();
  for (const d of divisions.filter((x) => x.productCount > 0)) {
    out.push(...entry(`/products/${d.slug}`, 0.8));
    for (const c of d.categories.filter((x) => x.productCount > 0)) {
      out.push(...entry(`/products/${d.slug}/${c.slug}`, 0.7));
      for (const s of c.subcategories.filter((x) => x.productCount > 0)) out.push(...entry(`/products/${d.slug}/${c.slug}/${s.slug}`, 0.6));
    }
  }

  /* Every product, a hundred at a time. */
  for (let page = 1; page <= 50; page++) {
    const list = await hubProducts({ pageSize: 100, page });
    for (const p of list.items) out.push(...entry(`/product/${p.slug}`, 0.7));
    if (list.items.length < 100) break;
  }

  const own = new Set(["home", "about", "careers", "contact", "products", "solutions", "stories"]);
  for (const p of await hubPages()) {
    if ((p.version ?? 0) > 0 && !own.has(p.slug)) out.push(...entry(`/${p.slug}`, 0.5, p.updatedAt));
  }
  return out;
}
