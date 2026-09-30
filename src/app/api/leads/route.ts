/* ---------------------------------------------------------------------------
   POST /api/leads — the contact form's send, and «Request a quotation».
   The visitor's browser posts here; this server hands the message to the
   Hub's bridge with the shared key, which never reaches a browser. The Hub
   gets a keyed hash of where the visitor writes from — never the address —
   and makes the message a potential customer in its Customers app.

   Robots are turned away before the Hub is asked: a post from another site,
   the hidden field filled in (told "sent", and nothing goes anywhere), or a
   form never opened here. A form sent within seconds of opening is asked to
   be checked and sent again — a person who pasted fast can; a robot rarely
   does. Nothing a visitor writes is logged.
   --------------------------------------------------------------------------- */

import { NextResponse } from "next/server";
import { hubPlaceHash, hubPost } from "@/lib/hub";
import { isLang } from "@/i18n/config";

export const dynamic = "force-dynamic";

const BODY_MAX = 16 * 1024;
const MIN_OPEN_MS = 3000;

const answer = (data: Record<string, unknown>, status = 200) =>
  NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
const text = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

/** Only this site's own pages send here. */
function sameSite(req: Request): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameSite(req)) return answer({ code: "forbidden" }, 403);
  const raw = await req.text();
  if (raw.length > BODY_MAX) return answer({ code: "too_long" }, 413);
  let b: Record<string, unknown>;
  try {
    const v: unknown = JSON.parse(raw);
    if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error("not an object");
    b = v as Record<string, unknown>;
  } catch {
    return answer({ code: "bad_request" }, 400);
  }
  /* The hidden field people never see, or no opening time: a robot. */
  if (text(b.website, 200) || typeof b.elapsed !== "number") return answer({ ok: true });
  if (b.elapsed < MIN_OPEN_MS) return answer({ code: "too_fast" }, 400);

  const address = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "";
  const r = await hubPost("/leads", {
    kind: b.kind === "quote" ? "quote" : "contact",
    name: text(b.name, 200),
    email: text(b.email, 300),
    phone: text(b.phone, 60),
    company: text(b.company, 200),
    country: text(b.country, 2),
    message: text(b.message, 5000),
    product: text(b.product, 120),
    lang: isLang(b.lang) ? b.lang : "en",
    page: text(b.page, 300),
    ipHash: hubPlaceHash(address),
  });
  if (r.status === 200) return answer({ ok: true });
  const code = typeof r.data?.code === "string" ? r.data.code : "failed";
  if (r.status === 400 || r.status === 413 || r.status === 429) return answer({ code }, r.status);
  return answer({ code: "failed" }, 502);
}
