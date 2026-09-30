/* ---------------------------------------------------------------------------
   What the Koleex Hub's website bridge answers (hub.koleexgroup.com
   /api/website/v1/*). The Hub is the ONLY source of this site's products,
   taxonomy, pages and jobs: active and visible products of Koleex only, never
   a price, a cost, a supplier or a factory code (the Hub scrubs them before
   they leave). Kept in step with lib/server/website-catalog.ts in the Hub.
   --------------------------------------------------------------------------- */

import type { PageDoc } from "@/types/page-doc";

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
    models: Array<{ id: string; code: string; name: string | null; tagline: string | null; nameI18n?: Record<string, string> | null; taglineI18n?: Record<string, string> | null; primary: boolean; photo: string | null }>;
  };
  seo: { brand: string | null; excerpt: string | null; metaTitle: string | null; metaDescription: string | null; ogImageUrl: string | null };
  preview: {
    mainImageUrl: string | null; galleryUrls: string[]; brand: string | null;
    translations?: Array<{ locale: string; product_name: string | null; tagline: string | null; excerpt: string | null; description: string | null }>;
    /** The spec sheet: the schema's groups and fields, and the product's values (keyed by field key). */
    schema?: HubSpecSchema | null;
    values?: Record<string, unknown>;
    knowledge?: HubKnowledgeBlock[];
    videoUrls?: string[];
    manuals?: Array<{ url: string; label: string | null }>;
  };
}

export interface HubPageSummary { slug: string; name: string; title: string | null; description: string | null; updatedAt: string | null; version?: number }
export interface HubPage {
  page: HubPageSummary;
  /** The Page Builder's published document (or the draft, in the signed
   *  preview); null when the page was never published there. */
  doc?: PageDoc | null;
  /** The old editor's sections (only when there is no document). */
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

/** The company as the Hub keeps it (its papers' address, phones and email,
 *  and the owner-approved facts). */
export interface HubCompany {
  name: string; legalName: string; legalNameZh: string; slogan: string;
  address: string; tel: string; mobile: string; email: string; web: string;
  base: string; offices: string[]; brandEstablished: string; originsFrom: string;
}

/* The Hub's spec schema (types/product-schema there), as much as the site reads. */
export interface HubSpecField {
  key: string; label: string; unit?: string; order: number;
  dataType?: "string" | "number" | "boolean" | "json";
  options?: Array<{ value: string; label: string }>;
  internalOnly?: boolean; publicVisible?: boolean; websiteVisible?: boolean;
}
export interface HubSpecGroup { id: string; title: string; order: number; formTab?: "specs" | "logistics"; visibility?: { websiteVisible?: boolean; internalOnly?: boolean }; fields: HubSpecField[] }
export interface HubSpecSchema { name: string; groups: HubSpecGroup[] }
export interface HubKnowledgeBlock {
  id: string; type: string; title: string;
  content: string | string[] | Record<string, unknown>;
  visibility?: { websiteVisible?: boolean; publicVisible?: boolean; internalOnly?: boolean };
  title_i18n?: Record<string, string>;
  content_i18n?: Record<string, string | string[]>;
}

/** A Koleex catalog the site offers (never a supplier's). */
export interface HubCatalog {
  id: string;
  title: { en: string; ar: string; zh: string };
  description: { en: string; ar: string; zh: string };
  fileUrl: string; fileSize: number | null; coverUrl: string | null; year: number | null;
}
