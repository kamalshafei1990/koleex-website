import Link from "next/link";
import { footerGroups } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { KoleexLogo } from "@/components/ui/KoleexLogo";

/* ---------------------------------------------------------------------------
   Footer — Premium dark footer with refined spacing and typography.
   --------------------------------------------------------------------------- */

export default function Footer() {
  return (
    <footer className="bg-black">
      {/* Nav columns */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[980px] mx-auto px-5">
          <div className="py-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-10 gap-y-12">
            {footerGroups.map((group) => (
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
                Contact
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-400">
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g,"")}`} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-400">
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li className="text-[12px] text-white/20 leading-relaxed pt-1">
                  {siteConfig.contact.address.slice(1).join(", ")}
                </li>
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
            {siteConfig.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
