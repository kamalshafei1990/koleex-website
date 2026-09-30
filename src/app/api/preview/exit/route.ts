/* GET /api/preview/exit?to=/path — leave the draft preview and see the page
   as visitors do. */

import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  (await draftMode()).disable();
  const to = new URL(req.url).searchParams.get("to") ?? "/en";
  const path = /^\/(?!\/)[A-Za-z0-9\-._~/]*$/.test(to) ? to : "/";
  return NextResponse.redirect(new URL(path, req.url), { headers: { "Cache-Control": "no-store" } });
}
