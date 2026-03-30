import Link from "next/link";
import {
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Globe,
  MapPin,
} from "lucide-react";
import { footerGroups } from "@/data/navigation";
import { siteConfig } from "@/data/site";

const iconMap: Record<string, React.ElementType> = {
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
};

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-text-inverse">
      {/* Top section */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="py-12 border-b border-white/10">
          <Link href="/" className="inline-block">
            <span className="text-lg font-bold tracking-wide text-white">
              KOLEEX
            </span>
          </Link>
          <p className="mt-2 text-sm text-white/50 max-w-md">
            {siteConfig.tagline}. {siteConfig.description.split(".")[0]}.
          </p>
        </div>

        {/* Middle section - nav columns */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">{siteConfig.copyright}</p>

          <div className="flex items-center gap-6">
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {siteConfig.social.map((social) => {
                const Icon = iconMap[social.icon];
                return Icon ? (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : null;
              })}
            </div>

            {/* Language / Region */}
            <div className="flex items-center gap-3 text-xs text-white/40">
              <button className="flex items-center gap-1 hover:text-white transition-colors">
                <Globe className="h-3.5 w-3.5" />
                English
              </button>
              <span className="text-white/20">|</span>
              <button className="flex items-center gap-1 hover:text-white transition-colors">
                <MapPin className="h-3.5 w-3.5" />
                Global
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
