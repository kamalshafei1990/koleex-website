import type { Metadata } from "next";
import "../globals.css";
import { CONTENT_LANGS, dirOf, isLang, siteUrl } from "@/i18n/config";
import { LangProvider } from "@/i18n/LangProvider";

/* ---------------------------------------------------------------------------
   Root layout — every page, in its language (/en, /ar, /zh … — middleware
   sends a path without one to the visitor's). <html> carries the language
   and its direction (Arabic, Urdu, Farsi right to left).

   The header, footer and Hub menu live in (site)/layout so the coming-soon
   route can render without them. English, Arabic and Chinese are built
   ahead; the other languages on their first visit.
   --------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Koleex International Group",
    template: "%s | Koleex International Group",
  },
  description:
    "Koleex International Group is a global manufacturing, international-trade and technology group focused on the garment and textile industry — garment and sewing machinery above all.",
};

export function generateStaticParams() {
  return CONTENT_LANGS.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const p = await params;
  const lang = isLang(p.lang) ? p.lang : "en";
  return (
    <html lang={lang} dir={dirOf(lang)}>
      <body className="font-sans antialiased bg-black text-white">
        <LangProvider lang={lang}>{children}</LangProvider>
      </body>
    </html>
  );
}
