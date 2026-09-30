import { draftMode } from "next/headers";
import { translate } from "@/i18n/words";

/* Shown only in the Hub's signed draft preview, so a draft is never taken
   for the live page. */
export async function DraftBar({ lang = "en" }: { lang?: string }) {
  let on = false;
  try {
    on = (await draftMode()).isEnabled;
  } catch {
    on = false;
  }
  if (!on) return null;
  return (
    <div role="status" className="fixed inset-x-0 bottom-0 z-[100] flex items-center justify-center gap-4 bg-[#0066FF] px-4 py-2.5 text-[13px] font-medium text-white">
      <span>{translate("Draft preview — visitors do not see these changes until the page is published.", lang)}</span>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href={`/api/preview/exit?to=/${lang}`} className="rounded-full border border-white/40 px-3 py-1 hover:bg-white/10">{translate("Exit preview", lang)}</a>
    </div>
  );
}
