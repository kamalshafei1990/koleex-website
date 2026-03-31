// ---------------------------------------------------------------------------
// Site-wide configuration for the Koleex International Group website
// ---------------------------------------------------------------------------

export interface SocialLink {
  platform: string;
  label: string;
  href: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string[];
}

export interface SiteConfig {
  companyName: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  social: SocialLink[];
  contact: ContactInfo;
  copyright: string;
}

const currentYear = new Date().getFullYear();

export const siteConfig: SiteConfig = {
  companyName: "Koleex International Group",
  shortName: "Koleex",
  tagline: "Engineering What Matters",
  description:
    "Koleex International Group is a global industrial technology company specializing in precision machinery, automation systems, and technology-driven solutions for manufacturing and industrial sectors.",
  url: "https://www.koleex.com",
  locale: "en-US",

  social: [
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "#",
      icon: "Linkedin",
    },
    {
      platform: "x",
      label: "X (Twitter)",
      href: "#",
      icon: "Twitter",
    },
    {
      platform: "youtube",
      label: "YouTube",
      href: "#",
      icon: "Youtube",
    },
    {
      platform: "instagram",
      label: "Instagram",
      href: "#",
      icon: "Instagram",
    },
  ],

  contact: {
    email: "—",
    phone: "—",
    address: [
      "Koleex International Group",
      "Contact details to be confirmed",
    ],
  },

  copyright: `\u00A9 ${currentYear} Koleex International Group. All rights reserved.`,
};
