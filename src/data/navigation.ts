// ---------------------------------------------------------------------------
// Navigation data for the Koleex International Group website
// ---------------------------------------------------------------------------

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

export const productsMegaMenu: MegaMenuItem[] = [
  {
    division: "Industrial Technology",
    slug: "industrial-technology",
    description:
      "Precision-engineered systems that power manufacturing lines, logistics networks, and critical infrastructure worldwide.",
    categories: [
      {
        name: "Automation & Robotics",
        slug: "automation-robotics",
        href: "/products/industrial-technology/automation-robotics",
      },
      {
        name: "Precision Instruments",
        slug: "precision-instruments",
        href: "/products/industrial-technology/precision-instruments",
      },
      {
        name: "Process Control",
        slug: "process-control",
        href: "/products/industrial-technology/process-control",
      },
    ],
  },
  {
    division: "Energy Systems",
    slug: "energy-systems",
    description:
      "Next-generation energy platforms spanning generation, storage, and distribution for a sustainable future.",
    categories: [
      {
        name: "Renewable Generation",
        slug: "renewable-generation",
        href: "/products/energy-systems/renewable-generation",
      },
      {
        name: "Grid Infrastructure",
        slug: "grid-infrastructure",
        href: "/products/energy-systems/grid-infrastructure",
      },
      {
        name: "Energy Storage",
        slug: "energy-storage",
        href: "/products/energy-systems/energy-storage",
      },
    ],
  },
  {
    division: "Digital Solutions",
    slug: "digital-solutions",
    description:
      "Enterprise software and connected platforms that turn operational data into decisive action.",
    categories: [
      {
        name: "IoT Platforms",
        slug: "iot-platforms",
        href: "/products/digital-solutions/iot-platforms",
      },
      {
        name: "Enterprise Analytics",
        slug: "enterprise-analytics",
        href: "/products/digital-solutions/enterprise-analytics",
      },
      {
        name: "Cybersecurity",
        slug: "cybersecurity",
        href: "/products/digital-solutions/cybersecurity",
      },
    ],
  },
  {
    division: "Advanced Materials",
    slug: "advanced-materials",
    description:
      "High-performance materials engineered at the molecular level for aerospace, medical, and industrial applications.",
    categories: [
      {
        name: "Composite Systems",
        slug: "composite-systems",
        href: "/products/advanced-materials/composite-systems",
      },
      {
        name: "Specialty Polymers",
        slug: "specialty-polymers",
        href: "/products/advanced-materials/specialty-polymers",
      },
      {
        name: "Ceramic & Thermal",
        slug: "ceramic-thermal",
        href: "/products/advanced-materials/ceramic-thermal",
      },
    ],
  },
];

// ---- Footer navigation ----

export const footerGroups: FooterGroup[] = [
  {
    title: "Products",
    links: [
      { label: "Industrial Technology", href: "/products/industrial-technology" },
      { label: "Energy Systems", href: "/products/energy-systems" },
      { label: "Digital Solutions", href: "/products/digital-solutions" },
      { label: "Advanced Materials", href: "/products/advanced-materials" },
      { label: "All Products", href: "/products" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Manufacturing", href: "/solutions/smart-manufacturing" },
      { label: "Energy Transition", href: "/solutions/energy-transition" },
      { label: "Infrastructure", href: "/solutions/connected-infrastructure" },
      { label: "Healthcare", href: "/solutions/healthcare-innovation" },
      { label: "All Solutions", href: "/solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Sustainability", href: "/about/sustainability" },
      { label: "Investors", href: "/about/investors" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Stories & Insights", href: "/stories" },
      { label: "Technical Documentation", href: "/resources/docs" },
      { label: "Support Center", href: "/support" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];
