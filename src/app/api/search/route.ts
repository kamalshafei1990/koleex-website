/* ---------------------------------------------------------------------------
   GET /api/search?q=words&lang=&size= — the site's product search: the
   Hub's own search over names, model codes and SKUs in every language,
   active and visible products only, never supplier data (the bridge's
   rule). Cards come in the page's language.
   --------------------------------------------------------------------------- */

import { NextResponse } from "next/server";
import { hubProducts } from "@/lib/hub";
import { toCard } from "@/lib/product-list";
import { isLang } from "@/i18n/config";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const q = (sp.get("q") ?? "").trim().slice(0, 80);
  const lang = isLang(sp.get("lang")) ? (sp.get("lang") as string) : "en";
  const size = Math.min(48, Math.max(1, Math.floor(Number(sp.get("size")) || 8)));
  if (q.length < 2) return NextResponse.json({ items: [], total: 0 });
  try {
    const list = await hubProducts({ q, pageSize: size });
    return NextResponse.json(
      { items: list.items.map((p) => toCard(p, lang)), total: list.total },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600" } },
    );
  } catch {
    return NextResponse.json({ error: "Search is not available right now." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
