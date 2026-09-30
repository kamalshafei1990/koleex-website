/* ---------------------------------------------------------------------------
   GET /api/products?division=|category=|subcategory=&page=N — the next page
   of a product list, for "Show more" (page 1 comes with the static page).
   Reads the Hub through lib/hub, cached under the "products" tag, so a
   visitor never reaches the Hub; answers public product cards only.
   --------------------------------------------------------------------------- */

import { NextResponse } from "next/server";
import { hubProducts } from "@/lib/hub";
import { PRODUCT_PAGE_SIZE, toCard } from "@/lib/product-list";
import { isLang } from "@/i18n/config";

export const dynamic = "force-dynamic";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const slug = (k: string): string | undefined => {
    const v = sp.get(k);
    return v && v.length <= 120 && SLUG_RE.test(v) ? v : undefined;
  };
  const division = slug("division");
  const category = slug("category");
  const subcategory = slug("subcategory");
  const page = Math.floor(Number(sp.get("page")));
  const lang = isLang(sp.get("lang")) ? (sp.get("lang") as string) : "en";
  if ((!division && !category && !subcategory) || !Number.isFinite(page) || page < 2 || page > 500) {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  let list;
  try {
    list = await hubProducts({ division, category, subcategory, page, pageSize: PRODUCT_PAGE_SIZE });
  } catch {
    /* The Hub did not answer: the button says so and offers to try again. */
    return NextResponse.json({ error: "Products could not be loaded." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
  return NextResponse.json(
    { items: list.items.map((p) => toCard(p, lang)), total: list.total, page: list.page },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600" } },
  );
}
