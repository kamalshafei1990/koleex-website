import { DraftBar } from "@/components/page-builder/DraftBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { hubSite, hubTaxonomy } from "@/lib/hub";
import { mainNav, productsMenuFrom, type NavItem } from "@/data/navigation";
import { isLang } from "@/i18n/config";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

/* ---------------------------------------------------------------------------
   Site chrome for the real pages. The coming-soon route sits beside this
   group, so the teaser does not load the header, the footer, or the Hub
   menu. Route groups do not change URLs. Nav visibility comes from Hub
   site settings when the bridge answers.
   --------------------------------------------------------------------------- */

function navFromHub(chromeNav: Array<{ href: string; visible: boolean }> | undefined): NavItem[] {
  if (!chromeNav?.length) return mainNav;
  const visible = new Set(chromeNav.filter((n) => n.visible).map((n) => n.href.replace(/\/+$/, "") || "/"));
  return mainNav.filter((item) => visible.has(item.href.replace(/\/+$/, "") || "/"));
}

export default async function SiteLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const p = await params;
  const lang = isLang(p.lang) ? p.lang : "en";
  const [taxonomy, site] = await Promise.all([hubTaxonomy(), hubSite()]);
  const productsMenu = productsMenuFrom(taxonomy, lang);
  const navItems = navFromHub(site?.chrome?.nav);
  return (
    <>
      <Header productsMenu={productsMenu} navItems={navItems} />
      <main className="min-h-screen pt-[var(--header-height)]">{children}</main>
      <DraftBar lang={lang} />
      <OrganizationJsonLd />
      <Footer productsMenu={productsMenu} lang={lang} />
    </>
  );
}
