/* ---------------------------------------------------------------------------
   Block Library — Section templates organized by category.
   Each template has a type, layout variation, default content, and preview.
   --------------------------------------------------------------------------- */

import type { SectionLayout } from "@/types/supabase";

export interface BlockTemplate {
  id: string;
  type: string;
  layout: SectionLayout;
  label: string;
  preview: string; // emoji/icon preview
  defaults: {
    title?: string;
    subtitle?: string;
    content?: string;
    background?: string;
    button_text?: string;
    button_link?: string;
    button2_text?: string;
    button2_link?: string;
    image_url?: string;
    items?: unknown[];
  };
}

export interface BlockCategory {
  id: string;
  label: string;
  icon: string;
  templates: BlockTemplate[];
}

export const blockLibrary: BlockCategory[] = [
  {
    id: "welcome",
    label: "Welcome / Hero",
    icon: "🏠",
    templates: [
      {
        id: "hero-centered",
        type: "hero",
        layout: "hero",
        label: "Centered Hero",
        preview: "⬜",
        defaults: { title: "Welcome to Koleex", subtitle: "Engineering What Matters.", background: "white", button_text: "Learn more", button_link: "/about" },
      },
      {
        id: "hero-dark",
        type: "hero",
        layout: "hero",
        label: "Dark Hero",
        preview: "⬛",
        defaults: { title: "Discover Our Products", subtitle: "Precision machinery for modern industry.", background: "black", button_text: "Explore", button_link: "/products" },
      },
      {
        id: "hero-bg-image",
        type: "bg-hero",
        layout: "bg-hero",
        label: "Background Image Hero",
        preview: "🖼️",
        defaults: { title: "New Arrival", subtitle: "Precision in motion. Power in every axis.", background: "image", button_text: "Learn more", button_link: "/products", button2_text: "Contact sales", button2_link: "/contact" },
      },
    ],
  },
  {
    id: "about",
    label: "About",
    icon: "ℹ️",
    templates: [
      {
        id: "about-image-left",
        type: "about",
        layout: "image-left",
        label: "Image Left + Text",
        preview: "◧",
        defaults: { title: "About Koleex", subtitle: "A global industrial technology company built on precision and innovation.", background: "white", button_text: "Learn more", button_link: "/about" },
      },
      {
        id: "about-image-right",
        type: "about",
        layout: "image-right",
        label: "Text + Image Right",
        preview: "◨",
        defaults: { title: "Our Story", subtitle: "From a family tradition to a global name.", background: "light", button_text: "Our history", button_link: "/about/history" },
      },
      {
        id: "about-full-image",
        type: "about",
        layout: "full-image",
        label: "Full Image Overlay",
        preview: "🌄",
        defaults: { title: "Engineering Excellence", subtitle: "Decades of commitment to quality and precision.", background: "image", button_text: "About us", button_link: "/about" },
      },
    ],
  },
  {
    id: "services",
    label: "Services / Solutions",
    icon: "⚙️",
    templates: [
      {
        id: "services-cards-3",
        type: "services",
        layout: "cards",
        label: "3-Column Cards",
        preview: "🃏",
        defaults: {
          title: "Our Solutions", subtitle: "End-to-end industrial technology solutions.", background: "white",
          items: [
            { title: "Smart Manufacturing", description: "AI-powered production optimization.", icon: "🏭" },
            { title: "Automation Systems", description: "Robotic and automated production lines.", icon: "🤖" },
            { title: "Digital Solutions", description: "IoT, software, and analytics.", icon: "💻" },
          ],
          button_text: "All solutions", button_link: "/solutions",
        },
      },
      {
        id: "services-grid-icons",
        type: "services",
        layout: "cards",
        label: "Icon Grid",
        preview: "🔲",
        defaults: {
          title: "What We Do", background: "dark",
          items: [
            { title: "Precision Machinery", icon: "⚙️" },
            { title: "Automation", icon: "🤖" },
            { title: "IoT Platforms", icon: "🌐" },
            { title: "Software Solutions", icon: "💻" },
            { title: "Parts & Service", icon: "🔧" },
            { title: "Consulting", icon: "📋" },
          ],
        },
      },
      {
        id: "services-image-left",
        type: "services",
        layout: "image-left",
        label: "Image + Description",
        preview: "◧",
        defaults: { title: "Industrial Automation", subtitle: "Smart production lines built for the future.", content: "Our automation systems combine precision engineering with intelligent software.", background: "light", button_text: "Learn more", button_link: "/solutions" },
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    icon: "📦",
    templates: [
      {
        id: "products-grid",
        type: "products",
        layout: "grid",
        label: "Product Image Grid",
        preview: "🔲",
        defaults: {
          title: "Our Products", subtitle: "Explore our product portfolio.", background: "light",
          items: [
            { title: "Industrial Machinery", image: "/images/factory-floor.jpg" },
            { title: "Automation Systems", image: "/images/hero-robot.jpg" },
            { title: "Technology Solutions", image: "/images/circuit-board.jpg" },
            { title: "Parts & Service", image: "/images/composites.jpg" },
          ],
          button_text: "View all", button_link: "/products",
        },
      },
      {
        id: "products-hero",
        type: "products",
        layout: "hero",
        label: "Featured Product",
        preview: "⭐",
        defaults: { title: "KX-9000 Series", subtitle: "Precision in motion.", background: "white", button_text: "Learn more", button_link: "/products", button2_text: "Contact sales", button2_link: "/contact" },
      },
    ],
  },
  {
    id: "team",
    label: "Team",
    icon: "👥",
    templates: [
      {
        id: "team-grid",
        type: "team",
        layout: "cards",
        label: "Team Grid",
        preview: "👤",
        defaults: {
          title: "Leadership Team", background: "white",
          items: [
            { title: "Chief Executive Officer", description: "Profile to be announced." },
            { title: "Chief Technology Officer", description: "Profile to be announced." },
            { title: "Chief Financial Officer", description: "Profile to be announced." },
            { title: "Chief Operating Officer", description: "Profile to be announced." },
          ],
        },
      },
      {
        id: "team-quote",
        type: "team",
        layout: "quote",
        label: "Leadership Quote",
        preview: "💬",
        defaults: { title: "Leadership Message", content: "Together, we are shaping the future of manufacturing.", subtitle: "— The Leadership Team", background: "dark" },
      },
    ],
  },
  {
    id: "contact",
    label: "Contact / CTA",
    icon: "📞",
    templates: [
      {
        id: "cta-simple",
        type: "cta",
        layout: "cta",
        label: "Simple CTA",
        preview: "📣",
        defaults: { title: "Get in touch.", subtitle: "Talk to a specialist about solutions for your business.", background: "light", button_text: "Contact us", button_link: "/contact", button2_text: "Request quotation", button2_link: "/contact" },
      },
      {
        id: "cta-dark",
        type: "cta",
        layout: "cta",
        label: "Dark CTA",
        preview: "🌑",
        defaults: { title: "Ready to transform your operations?", subtitle: "Connect with our team.", background: "black", button_text: "Contact us", button_link: "/contact" },
      },
      {
        id: "contact-image",
        type: "contact",
        layout: "image-left",
        label: "Contact with Image",
        preview: "🏢",
        defaults: { title: "Contact Us", subtitle: "Reach out to our team for any inquiries.", background: "white", button_text: "Send message", button_link: "/contact" },
      },
    ],
  },
  {
    id: "stats",
    label: "Statistics / Numbers",
    icon: "📊",
    templates: [
      {
        id: "stats-row",
        type: "stats",
        layout: "numbers",
        label: "Stats Row",
        preview: "🔢",
        defaults: {
          title: "Global Reach", background: "black",
          items: [
            { title: "Regions", value: "6+", label: "Regions" },
            { title: "Divisions", value: "4", label: "Divisions" },
            { title: "Support", value: "24/7", label: "Support" },
          ],
        },
      },
      {
        id: "stats-light",
        type: "stats",
        layout: "numbers",
        label: "Light Stats",
        preview: "📈",
        defaults: {
          title: "By the Numbers", background: "white",
          items: [
            { title: "Countries", value: "—", label: "Countries" },
            { title: "Clients", value: "—", label: "Clients" },
            { title: "Products", value: "—", label: "Products" },
            { title: "Support", value: "24/7", label: "Support" },
          ],
        },
      },
    ],
  },
  {
    id: "testimonials",
    label: "Testimonials / Quotes",
    icon: "💬",
    templates: [
      {
        id: "quote-dark",
        type: "testimonial",
        layout: "quote",
        label: "Dark Quote",
        preview: "🌑",
        defaults: { title: "CEO Message", content: "We are shaping the future of manufacturing — with trust, innovation, and responsibility.", subtitle: "— The Leadership Team", background: "dark" },
      },
      {
        id: "quote-light",
        type: "testimonial",
        layout: "quote",
        label: "Light Quote",
        preview: "⬜",
        defaults: { title: "Client Feedback", content: "Koleex has transformed our manufacturing operations with their precision machinery.", subtitle: "— Manufacturing Partner", background: "light" },
      },
    ],
  },
  {
    id: "clients",
    label: "Clients / Partners",
    icon: "🤝",
    templates: [
      {
        id: "clients-brands",
        type: "clients",
        layout: "brands",
        label: "Logo Cloud",
        preview: "🏢",
        defaults: {
          title: "Trusted Partners", background: "black",
          items: [
            { title: "Partner 1" }, { title: "Partner 2" }, { title: "Partner 3" },
            { title: "Partner 4" }, { title: "Partner 5" }, { title: "Partner 6" },
          ],
        },
      },
    ],
  },
  {
    id: "text",
    label: "Text / Content",
    icon: "📝",
    templates: [
      {
        id: "text-centered",
        type: "text",
        layout: "cta",
        label: "Centered Text",
        preview: "📄",
        defaults: { title: "Section Title", subtitle: "A short description for this section.", background: "white" },
      },
      {
        id: "text-dark",
        type: "text",
        layout: "cta",
        label: "Dark Text Block",
        preview: "⬛",
        defaults: { title: "Section Title", subtitle: "Content on dark background.", background: "black" },
      },
    ],
  },
  {
    id: "media",
    label: "Media / Video",
    icon: "🎬",
    templates: [
      {
        id: "video-embed",
        type: "media",
        layout: "video",
        label: "Video Embed",
        preview: "▶️",
        defaults: { title: "Watch Our Story", subtitle: "See how Koleex is transforming manufacturing.", background: "dark" },
      },
      {
        id: "full-image-overlay",
        type: "media",
        layout: "full-image",
        label: "Full Image with Text",
        preview: "🖼️",
        defaults: { title: "Our Facilities", subtitle: "State-of-the-art manufacturing.", background: "image", button_text: "Learn more", button_link: "/about" },
      },
    ],
  },
];

/* Get all categories */
export function getBlockCategories() {
  return blockLibrary;
}

/* Get templates by category */
export function getTemplatesByCategory(categoryId: string) {
  return blockLibrary.find((c) => c.id === categoryId)?.templates || [];
}
