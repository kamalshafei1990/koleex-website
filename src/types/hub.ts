/* ---------------------------------------------------------------------------
   What the Koleex Hub's website bridge answers (hub.koleexgroup.com
   /api/website/v1/*). The Hub is the ONLY source of this site's products,
   taxonomy, pages and jobs: active and visible products of Koleex only, never
   a price, a cost, a supplier or a factory code (the Hub scrubs them before
   they leave). Kept in step with lib/server/website-catalog.ts in the Hub.
   --------------------------------------------------------------------------- */

export interface HubNames { name: string; zh: string | null; ar: string | null }

export interface HubSubcategory extends HubNames {
  slug: string; code: string | null; description: string | null; order: number | null; productCount: number;
}
export interface HubCategory extends HubNames {
  slug: string; description: string | null; order: number | null; productCount: number; subcategories: HubSubcategory[];
}
export interface HubDivision extends HubNames {
  slug: string; tagline: string | null; description: string | null; order: number | null; productCount: number; categories: HubCategory[];
}

export interface HubProductCard {
  slug: string;
  name: string;
  tagline: string | null;
  excerpt: string | null;
  translations: Record<string, { name: string | null; tagline: string | null; excerpt: string | null }>;
  brand: string | null;
  division: string | null;
  category: string | null;
  subcategory: string | null;
  featured: boolean;
  image: string | null;
}

export interface HubProductList { items: HubProductCard[]; total: number; page: number; pageSize: number }

export interface HubTaxonomyName { slug: string; name: string; name_zh: string | null; name_ar: string | null }

/** The product page as the Hub builds it for the public (a subset of the
 *  fields this site reads; the rest of the answer is ignored). */
export interface HubProduct {
  id: string;
  slug: string;
  productName: string;
  tagline: string | null;
  sections: {
    classification: { division: HubTaxonomyName | null; category: HubTaxonomyName | null; subcategory: HubTaxonomyName | null };
    excerpt: string | null;
    description: string | null;
    highlights: string[];
    compliance: { ce: boolean | null; rohs: boolean | null; ipRating: string | null; countryOfOrigin: string | null; warranty: string | null };
    warrantyMonths: number | null;
    models: Array<{ id: string; code: string; name: string | null; tagline: string | null; primary: boolean; photo: string | null }>;
  };
  seo: { brand: string | null; excerpt: string | null; metaTitle: string | null; metaDescription: string | null; ogImageUrl: string | null };
  preview: { mainImageUrl: string | null; galleryUrls: string[]; brand: string | null };
}

export interface HubPageSummary { slug: string; name: string; title: string | null; description: string | null; updatedAt: string | null }
export interface HubPage {
  page: HubPageSummary;
  sections: Array<Record<string, unknown> & { elements: Array<Record<string, unknown>> }>;
}

export interface HubJob {
  id: string;
  title: string;
  description: string | null;
  requirements: string | null;
  location: string | null;
  department: string | null;
  [key: string]: unknown;
}
