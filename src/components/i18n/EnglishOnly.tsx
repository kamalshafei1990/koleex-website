import { dirOf } from "@/i18n/config";
import { translate } from "@/i18n/words";

/* A page the site has in English only (until it is written in the Hub's
   Page Builder, or translated): in another language it reads left to
   right, as English, under a one-line note in the visitor's language. */
export function EnglishOnly({ lang, children }: { lang: string; children: React.ReactNode }) {
  if (lang === "en") return <>{children}</>;
  return (
    <>
      <p lang={lang} dir={dirOf(lang)} className="bg-white/[0.04] px-5 py-2.5 text-center text-[12px] text-white/45">
        {translate("This page is shown in English until its translation is ready.", lang)}
      </p>
      <div lang="en" dir="ltr">{children}</div>
    </>
  );
}
