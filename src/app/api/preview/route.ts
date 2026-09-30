/* ---------------------------------------------------------------------------
   GET /api/preview?slug=&exp=&sig=&lang= — the Hub's Page Builder opens a page's
   DRAFT here. The link is signed by the Hub with the shared bridge key
   (HMAC over "preview:<slug>:<exp>") and lasts 10 minutes; a good one turns
   on Next's draft mode for this browser and opens the page, which then
   reads the draft from the Hub, fresh, never cached. Anything else: 401.
   --------------------------------------------------------------------------- */

import { createHmac, timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { isLang } from "@/i18n/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(req: Request) {
  const key = (process.env.WEBSITE_BRIDGE_KEY ?? "").trim();
  if (!key) return NextResponse.json({ error: "Not configured." }, { status: 503 });
  const sp = new URL(req.url).searchParams;
  const slug = sp.get("slug") ?? "";
  const exp = Number(sp.get("exp"));
  const sig = sp.get("sig") ?? "";
  /* The language the editor was writing in (not signed: it only picks which
     language of the same draft opens). */
  const lang = isLang(sp.get("lang")) ? (sp.get("lang") as string) : "en";
  const now = Math.floor(Date.now() / 1000);
  if (!SLUG_RE.test(slug) || !Number.isInteger(exp) || exp < now || exp > now + 660 || !/^[0-9a-f]{64}$/.test(sig)) {
    return NextResponse.json({ error: "This preview link is not valid (or has expired)." }, { status: 401 });
  }
  const expected = createHmac("sha256", key).update(`preview:${slug}:${exp}`).digest();
  if (!timingSafeEqual(Buffer.from(sig, "hex"), expected)) {
    return NextResponse.json({ error: "This preview link is not valid (or has expired)." }, { status: 401 });
  }
  (await draftMode()).enable();
  return NextResponse.redirect(new URL(slug === "home" ? `/${lang}` : `/${lang}/${slug}`, req.url), { headers: { "Cache-Control": "no-store" } });
}
