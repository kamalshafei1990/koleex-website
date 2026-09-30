// ---------------------------------------------------------------------------
// Navigation data for the Koleex International Group website
// ---------------------------------------------------------------------------

import { localize, nameIn } from "@/i18n/config";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface MegaMenuItem {
  division: string;
  slug: string;
  description: string;
  categories: {
    name: string;
    slug: string;
    href: string;
  }[];
}

export interface FooterGroup {
  title: string;
  links: { label: string; href: string }[];
}

// ---- Main navigation ----

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Stories", href: "/stories" },
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

// ---- Products mega menu ----
// Built from the Koleex Hub's taxonomy (lib/hub) in the root layout and handed
// to the Header and Footer — never a list written here.

/** The Hub's divisions as the mega menu and the footer show them: divisions
 *  that have products, and their categories that have products. */
type Named = { name: string; zh?: string | null; ar?: string | null };
export function productsMenuFrom(divisions: Array<Named & { slug: string; tagline: string | null; description: string | null; productCount: number; categories: Array<Named & { slug: string; productCount: number }> }>, lang = "en"): MegaMenuItem[] {
  return divisions
    .filter((d) => d.productCount > 0)
    .map((d) => ({
      division: nameIn(d, lang),
      slug: d.slug,
      description: lang === "en" ? d.tagline ?? d.description ?? "" : "",
      categories: d.categories
        .filter((c) => c.productCount > 0)
        .map((c) => ({ name: nameIn(c, lang), slug: c.slug, href: localize(`/products/${d.slug}/${c.slug}`, lang) })),
    }));
}

// ---- Footer navigation ----

/* The footer's groups after Products (which comes from the Hub). */
export const footerGroups: FooterGroup[] = [
  {
    title: "Solutions",
    links: [
      // Anchor deep-links into /solutions — there are no per-solution pages.
      { label: "Manufacturing", href: "/solutions#smart-manufacturing" },
      { label: "Energy Transition", href: "/solutions#energy-transition" },
      { label: "Infrastructure", href: "/solutions#connected-infrastructure" },
      { label: "Healthcare", href: "/solutions#healthcare-innovation" },
      { label: "All Solutions", href: "/solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      // Only real pages — a footer link that 404s is worse than no link.
      { label: "About Us", href: "/about" },
      { label: "CEO Message", href: "/about/ceo-message" },
      { label: "Sustainability", href: "/about/sustainability" },
      { label: "History", href: "/about/history" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Stories & Insights", href: "/stories" },
      { label: "Technology", href: "/about/technology" },
      { label: "Global Presence", href: "/about/global-presence" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];
