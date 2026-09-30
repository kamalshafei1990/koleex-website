import { DraftBar } from "@/components/page-builder/DraftBar";
import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { hubTaxonomy } from "@/lib/hub";
import { productsMenuFrom } from "@/data/navigation";
import { CONTENT_LANGS, dirOf, isLang } from "@/i18n/config";
import { LangProvider } from "@/i18n/LangProvider";

/* ---------------------------------------------------------------------------
   Root Layout — every page, in its language (/en, /ar, /zh … — the
   middleware sends a path without one to the visitor's). <html> carries the
   language and its direction (Arabic, Urdu, Farsi right to left).
   - <Header /> is fixed/sticky, so <main> gets a top padding offset.
   - The products menu (header and footer) is the Koleex Hub's taxonomy, in
     the page's language, read once here and cached under "taxonomy".
   English, Arabic and Chinese are built ahead; the other languages on their
   first visit.
   --------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: {
    default: "Koleex International Group",
    template: "%s | Koleex International Group",
  },
  description:
    "Koleex International Group is a global industrial technology company specializing in precision machinery, automation systems, and technology-driven solutions for manufacturing and industrial sectors.",
};

export function generateStaticParams() {
  return CONTENT_LANGS.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const p = await params;
  const lang = isLang(p.lang) ? p.lang : "en";
  const productsMenu = productsMenuFrom(await hubTaxonomy(), lang);
  return (
    <html lang={lang} dir={dirOf(lang)}>
      <body className="font-sans antialiased bg-black text-white">
        <LangProvider lang={lang}>
          <Header productsMenu={productsMenu} />
          <main className="min-h-screen pt-[var(--header-height)]">{children}</main>
          <DraftBar lang={lang} />
          <Footer productsMenu={productsMenu} lang={lang} />
        </LangProvider>
      </body>
    </html>
  );
}
