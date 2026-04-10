/* ---------------------------------------------------------------------------
   Seed the Supabase `home` page with 11 Apple-style CMS sections that
   mirror the hardcoded StaticHome.tsx layout.

   Run with:
     npx tsx scripts/seed-home.ts

   Requires .env.local with:
     NEXT_PUBLIC_SUPABASE_URL=...
     NEXT_PUBLIC_SUPABASE_ANON_KEY=...

   The script:
   1. Looks up (or creates) the `home` page.
   2. Deletes existing sections for that page (clean re-seed).
   3. Inserts 11 sections in order, matching the StaticHome design.
   --------------------------------------------------------------------------- */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

/* Load .env.local manually (no dotenv dep) */
try {
  const envPath = resolve(process.cwd(), ".env.local");
  const envContent = readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eq = trimmed.indexOf("=");
    if (eq === -1) return;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  });
} catch {
  // .env.local not found — fall back to existing process.env
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "\n❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local\n",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

type SectionSeed = {
  section_key: string;
  layout: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
  image_alt: string | null;
  video_url: string | null;
  button_text: string | null;
  button_link: string | null;
  button2_text: string | null;
  button2_link: string | null;
  background: "white" | "light" | "dark" | "black" | "image" | null;
  items:
    | {
        title: string;
        description?: string;
        icon?: string;
        image?: string;
        href?: string;
        value?: string;
        label?: string;
      }[]
    | null;
  visible: boolean;
};

const sections: SectionSeed[] = [
  // 1. Hero
  {
    section_key: "hero",
    layout: "hero",
    title: "KX-9000 Series",
    subtitle: "Precision in motion. Power in every axis.",
    content: null,
    image_url: "/images/hero-hand-trimmed.jpg",
    image_alt: "KX-9000 Series",
    video_url: null,
    button_text: "Learn more",
    button_link: "/products/industrial-technology",
    button2_text: "Contact sales",
    button2_link: "/contact",
    background: "light",
    items: null,
    visible: true,
  },

  // 2. Product row 1 — Smart Machines (dark)
  {
    section_key: "product-smart-machines",
    layout: "bg-hero",
    title: "Smart Machines",
    subtitle: "Intelligent. Automated. Built to perform.",
    content: "Industrial Technology",
    image_url: "/images/hero-robot.jpg",
    image_alt: "Smart machines — industrial robotics",
    video_url: null,
    button_text: "Learn more",
    button_link: "/products/industrial-technology",
    button2_text: "Contact sales",
    button2_link: "/contact",
    background: "dark",
    items: null,
    visible: true,
  },
  // 2b. Product row 1 — Automation Systems (light)
  {
    section_key: "product-automation-systems",
    layout: "bg-hero",
    title: "Automation Systems",
    subtitle: "Process control, from line to enterprise.",
    content: "Industrial Technology",
    image_url: "/images/modern-office.jpg",
    image_alt: "Automation systems — control rooms",
    video_url: null,
    button_text: "Learn more",
    button_link: "/products/industrial-technology/process-control",
    button2_text: "Get a quote",
    button2_link: "/contact",
    background: "light",
    items: null,
    visible: true,
  },

  // 3. Product row 2 — Advanced Materials (light)
  {
    section_key: "product-advanced-materials",
    layout: "bg-hero",
    title: "Advanced Materials",
    subtitle: "Composites and polymers for extremes.",
    content: "Advanced Materials",
    image_url: "/images/composites.jpg",
    image_alt: "Advanced composites and polymers",
    video_url: null,
    button_text: "Learn more",
    button_link: "/products/advanced-materials",
    button2_text: "Talk to an engineer",
    button2_link: "/contact",
    background: "light",
    items: null,
    visible: true,
  },
  // 3b. Product row 2 — Digital Solutions (dark)
  {
    section_key: "product-digital-solutions",
    layout: "bg-hero",
    title: "Digital Solutions",
    subtitle: "Connected platforms. Applied AI. Secure.",
    content: "Digital Solutions",
    image_url: "/images/circuit-board.jpg",
    image_alt: "Digital solutions — IoT and AI",
    video_url: null,
    button_text: "Learn more",
    button_link: "/products/digital-solutions",
    button2_text: "Request demo",
    button2_link: "/contact",
    background: "dark",
    items: null,
    visible: true,
  },

  // 4. Company banner
  {
    section_key: "company-banner",
    layout: "hero",
    title: "Engineering What Matters.",
    subtitle:
      "A global industrial technology company delivering precision machinery, automation systems, and smart solutions to manufacturers worldwide.",
    content: "About Koleex",
    image_url: "/images/factory-floor.jpg",
    image_alt: "Koleex Operations",
    video_url: null,
    button_text: "Our story",
    button_link: "/about",
    button2_text: "Leadership",
    button2_link: "/about#leadership",
    background: "black",
    items: null,
    visible: true,
  },

  // 5. Product row 3 — Energy Systems (light)
  {
    section_key: "product-energy-systems",
    layout: "bg-hero",
    title: "Energy Systems",
    subtitle: "Generation, storage, and grid intelligence.",
    content: "Energy Systems",
    image_url: "/images/wind-turbines.jpg",
    image_alt: "Energy systems — wind turbines",
    video_url: null,
    button_text: "Learn more",
    button_link: "/products/energy-systems",
    button2_text: "Get a quote",
    button2_link: "/contact",
    background: "light",
    items: null,
    visible: true,
  },
  // 5b. Product row 3 — Precision Instruments (dark)
  {
    section_key: "product-precision-instruments",
    layout: "bg-hero",
    title: "Precision Instruments",
    subtitle: "Lab and field metrology engineered for certainty.",
    content: "Precision Instruments",
    image_url: "/images/materials-lab.jpg",
    image_alt: "Precision instruments — lab metrology",
    video_url: null,
    button_text: "Learn more",
    button_link:
      "/products/industrial-technology/precision-instruments",
    button2_text: "Request demo",
    button2_link: "/contact",
    background: "dark",
    items: null,
    visible: true,
  },

  // 6. Stats row
  {
    section_key: "stats",
    layout: "numbers",
    title: "A worldwide footprint.",
    subtitle: null,
    content: "Global Scale",
    image_url: null,
    image_alt: null,
    video_url: null,
    button_text: null,
    button_link: null,
    button2_text: null,
    button2_link: null,
    background: "light",
    items: [
      { title: "Countries", value: "40+", label: "Countries" },
      { title: "Employees", value: "12K+", label: "Employees" },
      { title: "R&D Centers", value: "8", label: "R&D Centers" },
      { title: "Revenue", value: "$4.2B", label: "Revenue" },
    ],
    visible: true,
  },

  // 7. Solutions full-image
  {
    section_key: "solutions",
    layout: "full-image",
    title: "Clean power, at planetary scale.",
    subtitle:
      "Integrated renewable generation, storage, and grid intelligence — designed and delivered as one.",
    content: "Solutions",
    image_url: "/images/solar-panels.jpg",
    image_alt: "Clean power at scale",
    video_url: null,
    button_text: "Explore solutions",
    button_link: "/solutions",
    button2_text: "Talk to an engineer",
    button2_link: "/contact",
    background: "image",
    items: null,
    visible: true,
  },

  // 8. Innovation cards
  {
    section_key: "innovation",
    layout: "cards",
    title: "Driven by innovation.",
    subtitle:
      "Six disciplines. One integrated stack. Decades of compounding investment.",
    content: "Innovation",
    image_url: null,
    image_alt: null,
    video_url: null,
    button_text: null,
    button_link: null,
    button2_text: null,
    button2_link: null,
    background: "black",
    items: [
      {
        icon: "⚙",
        title: "Precision Engineering",
        description:
          "Micron-scale tolerances and five-axis machining for demanding production.",
      },
      {
        icon: "⚡",
        title: "Energy Intelligence",
        description:
          "Battery chemistry, power electronics, and grid software for a renewable future.",
      },
      {
        icon: "🧠",
        title: "Applied AI",
        description:
          "Vision systems, predictive models, and digital twins that learn every shift.",
      },
      {
        icon: "🔬",
        title: "Materials Science",
        description:
          "Composites, ceramics, and polymers engineered for extreme environments.",
      },
      {
        icon: "🛡",
        title: "Industrial Security",
        description:
          "Zero-trust platforms protecting operational technology end-to-end.",
      },
      {
        icon: "🌐",
        title: "Connected Operations",
        description:
          "Edge to cloud telemetry at the scale of global manufacturing networks.",
      },
    ],
    visible: true,
  },

  // 9. Customer quote
  {
    section_key: "customer-quote",
    layout: "quote",
    title:
      "Koleex didn't just sell us equipment. They engineered the future of our factory with us — machine by machine, line by line.",
    subtitle: "Maria Ivanova — VP of Operations, Northwind Industrial",
    content: null,
    image_url: null,
    image_alt: null,
    video_url: null,
    button_text: null,
    button_link: null,
    button2_text: null,
    button2_link: null,
    background: "dark",
    items: null,
    visible: true,
  },

  // 10. Stories
  {
    section_key: "stories",
    layout: "grid",
    title: "Stories from our teams.",
    subtitle: null,
    content: "Latest",
    image_url: null,
    image_alt: null,
    video_url: null,
    button_text: "View all",
    button_link: "/stories",
    button2_text: null,
    button2_link: null,
    background: "light",
    items: [
      {
        title:
          "Koleex Unveils Next-Generation Solid-State Battery Platform",
        description:
          "A new modular battery architecture promises 40% higher energy density and a pathway to grid-scale deployment by 2027.",
        image: "/images/materials-lab.jpg",
        href: "/stories/next-generation-solid-state-battery-platform",
        label: "News",
      },
      {
        title: "How a European Automaker Cut Assembly Defects by 62%",
        description:
          "KX Sight vision systems and KX CoBot collaborative robots transformed body-in-white inspection for one of Europe's largest OEMs.",
        image: "/images/factory-floor.jpg",
        href: "/stories/european-automaker-assembly-defects-case-study",
        label: "Case Study",
      },
      {
        title: "The Role of Digital Twins in Predictive Grid Management",
        description:
          "As renewables rise, utilities are turning to real-time digital twin models to forecast demand and optimise storage dispatch.",
        image: "/images/digital-globe.jpg",
        href: "/stories/digital-twins-predictive-grid-management",
        label: "Insight",
      },
    ],
    visible: true,
  },

  // 11. CTA
  {
    section_key: "cta",
    layout: "cta",
    title: "Get in touch.",
    subtitle: "Talk to a specialist about solutions for your business.",
    content: null,
    image_url: null,
    image_alt: null,
    video_url: null,
    button_text: "Contact sales",
    button_link: "/contact",
    button2_text: "Request quotation",
    button2_link: "/contact",
    background: "white",
    items: null,
    visible: true,
  },
];

async function run() {
  console.log("🚀 Seeding home page…\n");

  /* 1. Find or create the `home` page */
  const { data: existingPage, error: pageErr } = await supabase
    .from("pages")
    .select("id, name, slug")
    .eq("slug", "home")
    .maybeSingle();

  if (pageErr) {
    console.error("❌ Error finding home page:", pageErr.message);
    process.exit(1);
  }

  let pageId: string;

  if (existingPage) {
    pageId = existingPage.id;
    console.log(`✓ Found existing home page (id=${pageId})`);
  } else {
    const { data: created, error: createErr } = await supabase
      .from("pages")
      .insert({
        name: "Home",
        slug: "home",
        title: "Koleex International Group",
        description:
          "Koleex International Group — engineering what matters. Precision machinery, automation, and smart solutions for global industry.",
      })
      .select("id")
      .single();

    if (createErr || !created) {
      console.error(
        "❌ Error creating home page:",
        createErr?.message || "unknown",
      );
      process.exit(1);
    }
    pageId = created.id;
    console.log(`✓ Created home page (id=${pageId})`);
  }

  /* 2. Wipe existing sections for this page */
  const { error: delErr } = await supabase
    .from("sections")
    .delete()
    .eq("page_id", pageId);

  if (delErr) {
    console.error("❌ Error deleting existing sections:", delErr.message);
    process.exit(1);
  }
  console.log("✓ Cleared existing sections\n");

  /* 3. Insert new sections */
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const { error } = await supabase.from("sections").insert({
      page_id: pageId,
      order: i + 1,
      ...section,
    });

    if (error) {
      console.error(
        `❌ Error inserting section "${section.section_key}":`,
        error.message,
      );
      process.exit(1);
    }
    console.log(
      `✓ ${String(i + 1).padStart(2, " ")}. ${section.section_key} (${section.layout}, ${section.background})`,
    );
  }

  console.log(
    `\n🎉 Successfully seeded ${sections.length} sections for /home\n`,
  );
  console.log(
    "Visit /admin and select the Home page to edit any section.\n",
  );
}

run().catch((err) => {
  console.error("❌ Unexpected error:", err);
  process.exit(1);
});
