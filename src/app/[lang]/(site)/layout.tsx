import { DraftBar } from "@/components/page-builder/DraftBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { hubTaxonomy } from "@/lib/hub";
import { productsMenuFrom } from "@/data/navigation";
import { isLang } from "@/i18n/config";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

/* ---------------------------------------------------------------------------
   Site chrome for the real pages. The coming-soon route sits beside this
   group, so the teaser does not load the header, the footer, or the Hub
   menu. Route groups do not change URLs.
   --------------------------------------------------------------------------- */

export default async function SiteLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const p = await params;
  const lang = isLang(p.lang) ? p.lang : "en";
  const productsMenu = productsMenuFrom(await hubTaxonomy(), lang);
  return (
    <>
      <Header productsMenu={productsMenu} />
      <main className="min-h-screen pt-[var(--header-height)]">{children}</main>
      <DraftBar lang={lang} />
      <OrganizationJsonLd />
      <Footer productsMenu={productsMenu} lang={lang} />
    </>
  );
}
