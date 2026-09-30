import type { HubProductCard } from "@/types/hub";

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

export const toCard = (p: HubProductCard): ProductCardData => ({
  slug: p.slug,
  name: p.name,
  tagline: p.tagline,
  excerpt: p.excerpt,
  image: p.image,
});
