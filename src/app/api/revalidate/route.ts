/* ---------------------------------------------------------------------------
   POST /api/revalidate — the Koleex Hub tells this site that something it
   shows changed: { tags: ["products", "taxonomy", "jobs", "page:<slug>"] }
   with the shared key (Authorization: Bearer WEBSITE_BRIDGE_KEY). Each known
   tag's cached pages are rebuilt on their next visit. Nobody else may call
   it: no key configured → 503; a wrong key → 401 (compared in constant time).
   --------------------------------------------------------------------------- */

import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TAG_RE = /^(products|taxonomy|jobs|company|page:[a-z0-9]+(?:-[a-z0-9]+)*)$/;

export async function POST(req: Request) {
  const key = (process.env.WEBSITE_BRIDGE_KEY ?? "").trim();
  if (!key) return NextResponse.json({ error: "Not configured." }, { status: 503 });
  const header = req.headers.get("authorization") ?? "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
  const given = Buffer.from(token);
  const expected = Buffer.from(key);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as { tags?: unknown };
  const tags = Array.isArray(body.tags) ? [...new Set(body.tags.filter((t): t is string => typeof t === "string" && TAG_RE.test(t)))].slice(0, 50) : [];
  for (const tag of tags) revalidateTag(tag);
  /* A page changed or was added: the list of pages changes too. */
  if (tags.some((t) => t.startsWith("page:"))) revalidateTag("page:*");
  return NextResponse.json({ ok: true, revalidated: tags }, { headers: { "Cache-Control": "no-store" } });
}
