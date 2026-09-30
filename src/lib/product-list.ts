import type { HubProductCard } from "@/types/hub";
import { contentLang } from "@/i18n/config";

/* ---------------------------------------------------------------------------
   product-list — what a product list needs, shared by the static pages, the
   "Show more" button and /api/products. The first page of every list comes
   with the page (static, cached under the "products" tag); the next ones
   come from /api/products as the visitor asks for them.
   --------------------------------------------------------------------------- */

export const PRODUCT_PAGE_SIZE = 24;

/** Where a list is: a division, a category or a type (subcategory). */
export interface ProductFilter { division?: string; category?: string; subcategory?: string }


/** Only what a card shows — the rest of the Hub's answer stays on the server. */
export type ProductCardData = Pick<HubProductCard, "slug" | "name" | "tagline" | "excerpt" | "image">;

/** A card in a language: the Hub's translation of the name, tagline and
 *  excerpt when it has one (Arabic, Chinese), else the English. */
export const toCard = (p: HubProductCard, lang = "en"): ProductCardData => {
  const c = contentLang(lang);
  const tr = c === "en" ? undefined : p.translations?.[c];
  return {
    slug: p.slug,
    name: tr?.name?.trim() || p.name,
    tagline: tr?.tagline?.trim() || p.tagline,
    excerpt: tr?.excerpt?.trim() || p.excerpt,
    image: p.image,
  };
};
