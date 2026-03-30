// ---------------------------------------------------------------------------
// Stories / news data for the Koleex International Group website
// ---------------------------------------------------------------------------

export type StoryCategory = "News" | "Case Study" | "Insight";

export interface Story {
  title: string;
  slug: string;
  excerpt: string;
  category: StoryCategory;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  /** Estimated reading time in minutes. */
  readTime: number;
  /** Optional hero image path or placeholder key. */
  image?: string;
}

export const stories: Story[] = [
  {
    title: "Koleex Unveils Next-Generation Solid-State Battery Platform",
    slug: "next-generation-solid-state-battery-platform",
    excerpt:
      "A new modular battery architecture promises 40% higher energy density and a pathway to grid-scale deployment by 2027.",
    category: "News",
    date: "2026-03-18",
    readTime: 4,
    image: "/images/stories/solid-state-battery.jpg",
  },
  {
    title: "How a European Automaker Cut Assembly Defects by 62%",
    slug: "european-automaker-assembly-defects-case-study",
    excerpt:
      "By integrating KX Sight vision systems and KX CoBot collaborative robots, one of Europe's largest vehicle manufacturers transformed its body-in-white inspection process.",
    category: "Case Study",
    date: "2026-03-05",
    readTime: 7,
    image: "/images/stories/automaker-case-study.jpg",
  },
  {
    title: "The Role of Digital Twins in Predictive Grid Management",
    slug: "digital-twins-predictive-grid-management",
    excerpt:
      "As renewable penetration rises, utilities are turning to real-time digital twin models to forecast demand, detect faults, and optimise energy storage dispatch.",
    category: "Insight",
    date: "2026-02-20",
    readTime: 6,
    image: "/images/stories/digital-twin-grid.jpg",
  },
  {
    title: "Koleex Expands Advanced Materials Research Centre in Singapore",
    slug: "advanced-materials-research-centre-singapore",
    excerpt:
      "A new 12,000-square-metre facility will accelerate development of biocompatible polymers and thermal barrier coatings for aerospace and medical markets.",
    category: "News",
    date: "2026-02-10",
    readTime: 3,
    image: "/images/stories/singapore-research-centre.jpg",
  },
  {
    title: "Securing Operational Technology in the Age of Connected Industry",
    slug: "securing-operational-technology-connected-industry",
    excerpt:
      "A practical framework for defending industrial control systems against sophisticated cyber threats without sacrificing operational uptime.",
    category: "Insight",
    date: "2026-01-28",
    readTime: 8,
    image: "/images/stories/ot-cybersecurity.jpg",
  },
  {
    title: "Middle East Desalination Plant Achieves 99.7% Uptime with KX Predict",
    slug: "desalination-plant-uptime-kx-predict",
    excerpt:
      "Deploying predictive maintenance across 240 critical assets, the region's largest reverse-osmosis facility virtually eliminated unplanned downtime in its first year of operation.",
    category: "Case Study",
    date: "2026-01-15",
    readTime: 6,
    image: "/images/stories/desalination-case-study.jpg",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getStoriesByCategory(category: StoryCategory): Story[] {
  return stories.filter((s) => s.category === category);
}
