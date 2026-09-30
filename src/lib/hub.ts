/* ---------------------------------------------------------------------------
   hub — how this site reads the Koleex Hub (its ONLY data source).

   Server-side only: the bridge key (WEBSITE_BRIDGE_KEY, no NEXT_PUBLIC_
   prefix) never reaches a browser, and visitors never call the Hub or its
   database. Every answer is cached under a tag; when something changes in
   the Hub it calls /api/revalidate with the same key, and the tag's pages
   are rebuilt within seconds. An hourly revalidate catches changes made
   around the Hub's own screens.

   Until the key is set, every read comes back empty — the pages show their
   empty states, never invented content. Once it is set, a Hub that does not
   answer (or answers an error) makes the read THROW: the site then keeps the
   last good copy of the page instead of caching an empty one or a "not
   found" for the hour (30/09/2026). Only the Hub's own 404 means "gone".
   --------------------------------------------------------------------------- */

import { createHmac } from "node:crypto";
import { draftMode } from "next/headers";
import type { HubCatalog, HubCompany, HubDivision, HubJob, HubPage, HubPageSummary, HubProduct, HubProductList } from "@/types/hub";

export type HubTag = "products" | "taxonomy" | "jobs" | "company" | "catalogs" | `page:${string}`;

const HUB_URL = (process.env.HUB_URL ?? "https://hub.koleexgroup.com").trim().replace(/\/+$/, "");
const bridgeKey = () => (process.env.WEBSITE_BRIDGE_KEY ?? "").trim();
/** The fallback refresh, in seconds, for changes made around the Hub's screens. */
export const HUB_REVALIDATE = 3600;

export const hubConfigured = (): boolean => !!bridgeKey();

/** A Hub answer, or null when the key is not set or the Hub says 404 (not
 *  there, or no longer shown). A Hub that does not answer, or answers 5xx,
 *  is asked once more (a passing hiccup); anything still wrong throws. */
async function hubGet<T>(path: string, tags: HubTag[], opts: { fresh?: boolean } = {}): Promise<T | null> {
  const key = bridgeKey();
  if (!key) return null;
  const where = path.split("?")[0];
  for (let attempt = 1; ; attempt++) {
    const last = attempt >= 2;
    let res: Response;
    try {
      res = await fetch(`${HUB_URL}/api/website/v1${path}`, {
        headers: { Authorization: `Bearer ${key}` },
        /* A draft (the preview) is read fresh and never kept. */
        ...(opts.fresh ? { cache: "no-store" as const } : { next: { tags, revalidate: HUB_REVALIDATE } }),
        signal: AbortSignal.timeout(15_000),
      });
    } catch (e) {
      console.error(`[hub] ${where} failed (try ${attempt}): ${e instanceof Error ? e.name : "error"}`);
      if (!last) { await new Promise((r) => setTimeout(r, 400)); continue; }
      throw new Error(`The Hub did not answer (${where}).`);
    }
    if (res.status === 404) return null;
    if (res.ok) return (await res.json()) as T;
    console.error(`[hub] ${where} answered ${res.status} (try ${attempt})`);
    if (res.status >= 500 && !last) { await new Promise((r) => setTimeout(r, 400)); continue; }
    throw new Error(`The Hub answered ${res.status} (${where}).`);
  }
}

/** Send something to the Hub (a visitor's message). Never retried — a
 *  second send could file the message twice; the visitor can send again.
 *  503 while the key is not set, 502 when the Hub does not answer. */
export async function hubPost(path: string, body: unknown): Promise<{ status: number; data: Record<string, unknown> | null }> {
  const key = bridgeKey();
  if (!key) return { status: 503, data: null };
  try {
    const res = await fetch(`${HUB_URL}/api/website/v1${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const data = (await res.json().catch(() => null)) as Record<string, unknown> | null;
    if (!res.ok) console.error(`[hub] POST ${path} answered ${res.status}`);
    return { status: res.status, data };
  } catch (e) {
    console.error(`[hub] POST ${path} failed: ${e instanceof Error ? e.name : "error"}`);
    return { status: 502, data: null };
  }
}

/** Where a visitor writes from, as the Hub may know it: a keyed hash of the
 *  address (the bridge key), never the address — enough to slow a flood from
 *  one place, useless to anyone without the key. */
export function hubPlaceHash(address: string): string | null {
  const key = bridgeKey();
  return key && address ? createHmac("sha256", key).update(address).digest("hex") : null;
}

/** Divisions → categories → subcategories, with how many products each shows. */
export async function hubTaxonomy(): Promise<HubDivision[]> {
  const r = await hubGet<{ divisions: HubDivision[] }>("/taxonomy", ["taxonomy"]);
  return Array.isArray(r?.divisions) ? r.divisions : [];
}

export interface ProductQuery { division?: string; category?: string; subcategory?: string; featured?: boolean; q?: string; page?: number; pageSize?: number }

export async function hubProducts(query: ProductQuery = {}): Promise<HubProductList> {
  const sp = new URLSearchParams();
  if (query.division) sp.set("division", query.division);
  if (query.category) sp.set("category", query.category);
  if (query.subcategory) sp.set("subcategory", query.subcategory);
  if (query.featured) sp.set("featured", "1");
  if (query.q) sp.set("q", query.q);
  if (query.page) sp.set("page", String(query.page));
  if (query.pageSize) sp.set("pageSize", String(query.pageSize));
  const qs = sp.toString();
  const r = await hubGet<HubProductList>(`/products${qs ? `?${qs}` : ""}`, ["products"]);
  return r && Array.isArray(r.items) ? r : { items: [], total: 0, page: 1, pageSize: query.pageSize ?? 24 };
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function hubProduct(slug: string): Promise<HubProduct | null> {
  if (!SLUG_RE.test(slug)) return null;
  const r = await hubGet<{ product: HubProduct }>(`/products/${slug}`, ["products"]);
  return r?.product ?? null;
}

export async function hubPages(): Promise<HubPageSummary[]> {
  const r = await hubGet<{ pages: HubPageSummary[] }>("/pages", ["page:*"]);
  return Array.isArray(r?.pages) ? r.pages : [];
}

/** Whether this request is the Hub's signed draft preview (/api/preview). */
async function previewing(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false; // outside a request (a build step)
  }
}

/** A page: its published Page Builder document (or the old editor's
 *  sections) — or, in the Hub's signed preview, its draft. */
export async function hubPage(slug: string): Promise<HubPage | null> {
  if (!SLUG_RE.test(slug)) return null;
  if (await previewing()) return hubGet<HubPage>(`/pages/${slug}?draft=1`, [], { fresh: true });
  return hubGet<HubPage>(`/pages/${slug}`, [`page:${slug}`]);
}

/** These products, in this order (a page's hand-picked products). */
export async function hubProductsBySlugs(slugs: string[]): Promise<HubProductList> {
  const picked = slugs.filter((s) => SLUG_RE.test(s)).slice(0, 24);
  if (!picked.length) return { items: [], total: 0, page: 1, pageSize: 0 };
  const r = await hubGet<HubProductList>(`/products?slugs=${picked.join(",")}`, ["products"]);
  return r && Array.isArray(r.items) ? r : { items: [], total: 0, page: 1, pageSize: 0 };
}

export async function hubJobs(): Promise<HubJob[]> {
  const r = await hubGet<{ jobs: HubJob[] }>("/jobs", ["jobs"]);
  return Array.isArray(r?.jobs) ? r.jobs : [];
}

/** The company's details (address, phones, email) and approved facts — the
 *  same record the Hub prints on its papers. null until the key is set. */
export async function hubCompany(): Promise<HubCompany | null> {
  const r = await hubGet<{ company: HubCompany }>("/company", ["company"]);
  return r?.company ?? null;
}

/** Koleex's own catalogs the site offers (the Website app's; suppliers'
 *  catalogs never reach the bridge). */
export async function hubCatalogs(): Promise<HubCatalog[]> {
  const r = await hubGet<{ catalogs: HubCatalog[] }>("/catalogs", ["catalogs"]);
  return Array.isArray(r?.catalogs) ? r.catalogs : [];
}
