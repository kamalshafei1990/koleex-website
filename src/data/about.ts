/* ---------------------------------------------------------------------------
   About section data — Sub-page navigation and placeholder content.
   --------------------------------------------------------------------------- */

export interface AboutPage {
  slug: string;
  title: string;
  subtitle: string;
  order: number;
}

export const aboutPages: AboutPage[] = [
  { slug: "overview", title: "Company Overview", subtitle: "A global technology and industrial leader.", order: 1 },
  { slug: "history", title: "History & Heritage", subtitle: "From a family tradition to a global name.", order: 2 },
  { slug: "vision-mission", title: "Vision & Mission", subtitle: "Where we're going and why it matters.", order: 3 },
  { slug: "values", title: "Core Values", subtitle: "The principles that guide everything we do.", order: 4 },
  { slug: "corporate-structure", title: "Corporate Structure", subtitle: "How we're organized to deliver.", order: 5 },
  { slug: "business-segments", title: "Business Segments", subtitle: "Four divisions. One purpose.", order: 6 },
  { slug: "technology", title: "Technology & Innovation", subtitle: "Engineering the future.", order: 7 },
  { slug: "global-presence", title: "Global Presence", subtitle: "Operating across 80+ countries.", order: 8 },
  { slug: "sustainability", title: "Sustainability", subtitle: "Progress with responsibility.", order: 9 },
  { slug: "ceo-message", title: "CEO Message", subtitle: "A letter from our leadership.", order: 10 },
  { slug: "future-outlook", title: "Future Outlook", subtitle: "What comes next.", order: 11 },
];

export function getAboutPageBySlug(slug: string): AboutPage | undefined {
  return aboutPages.find((p) => p.slug === slug);
}
