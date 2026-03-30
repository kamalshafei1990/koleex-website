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
  /** General enquiries email. */
  email: string;
  /** Main switchboard phone number. */
  phone: string;
  /** Headquarters address lines. */
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
    "Koleex International Group is a global technology and industrial conglomerate delivering precision-engineered products, intelligent digital solutions, and advanced materials to customers in over 80 countries.",
  url: "https://www.koleex.com",
  locale: "en-US",

  social: [
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/koleex",
      icon: "Linkedin",
    },
    {
      platform: "x",
      label: "X (Twitter)",
      href: "https://x.com/koleex",
      icon: "Twitter",
    },
    {
      platform: "youtube",
      label: "YouTube",
      href: "https://www.youtube.com/@koleex",
      icon: "Youtube",
    },
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/koleex",
      icon: "Instagram",
    },
  ],

  contact: {
    email: "info@koleex.com",
    phone: "+1 (800) 555-0199",
    address: [
      "Koleex International Group",
      "One Koleex Tower, 200 Innovation Drive",
      "Zurich, 8005",
      "Switzerland",
    ],
  },

  copyright: `\u00A9 ${currentYear} Koleex International Group. All rights reserved.`,
};
