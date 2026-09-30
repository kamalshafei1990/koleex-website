import Link from "next/link";
import { footerGroups, type FooterGroup, type MegaMenuItem } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { KoleexLogo } from "@/components/ui/KoleexLogo";
import { localize } from "@/i18n/config";
import { translate } from "@/i18n/words";
import { hubCompany } from "@/lib/hub";

/* ---------------------------------------------------------------------------
   Footer — Premium dark footer with refined spacing and typography.
   --------------------------------------------------------------------------- */

export default async function Footer({ productsMenu, lang = "en" }: { productsMenu: MegaMenuItem[]; lang?: string }) {
  /* The company's details from the Hub's own record — nothing shows until it answers. */
  const company = await hubCompany();
  const t = (s: string) => translate(s, lang);
  const L = (href: string) => localize(href, lang);
  /* Products first, from the Hub's divisions; then the site's own groups. */
  const groups: FooterGroup[] = [
    { title: t("Products"), links: [...productsMenu.slice(0, 5).map((d) => ({ label: d.division, href: L(`/products/${d.slug}`) })), { label: t("All Products"), href: L("/products") }] },
    ...footerGroups.map((g) => ({ title: t(g.title), links: g.links.map((l) => ({ label: t(l.label), href: L(l.href) })) })),
  ];
  return (
    <footer className="bg-black">
      {/* Nav columns */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[980px] mx-auto px-5">
          <div className="py-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-10 gap-y-12">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/20 mb-6">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/20 mb-6">
                {t("Contact")}
              </h3>
              <ul className="space-y-3">
                {company ? (
                  <>
                    <li>
                      <a dir="ltr" href={`mailto:${company.email}`} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-400">
                        {company.email}
                      </a>
                    </li>
                    <li>
                      <a dir="ltr" href={`tel:${company.tel.replace(/[^+\d]/g, "")}`} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-400">
                        {company.tel}
                      </a>
                    </li>
                    <li>
                      <a dir="ltr" href={`tel:${company.mobile.replace(/[^+\d]/g, "")}`} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-400">
                        {company.mobile}
                      </a>
                    </li>
                    <li dir="ltr" className="text-[12px] text-white/20 leading-relaxed pt-1">{company.base}</li>
                  </>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[980px] mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <KoleexLogo color="white" height={13} className="opacity-25" />
          <p className="text-[12px] text-white/20 tracking-wide">
            © {new Date().getFullYear()} {company?.name ?? siteConfig.companyName}
          </p>
        </div>
      </div>
    </footer>
  );
}
