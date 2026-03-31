import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { DivisionsPreview } from "@/components/home/DivisionsPreview";
import { TechnologySection } from "@/components/home/TechnologySection";
import { SolutionsPreview } from "@/components/home/SolutionsPreview";
import { GlobalPresence } from "@/components/home/GlobalPresence";
import { StoriesPreview } from "@/components/home/StoriesPreview";
import { CareersPreview } from "@/components/home/CareersPreview";
import { CatalogSection } from "@/components/home/CatalogSection";
import { ContactCTA } from "@/components/home/ContactCTA";

/* ---------------------------------------------------------------------------
   Homepage — 10 sections in defined order.
   1. Hero
   2. Featured Products
   3. Business Divisions
   4. Technology & Innovation
   5. Solutions / Industries
   6. Global Presence (stats)
   7. Stories / News
   8. Careers
   9. Download Catalog
   10. Contact / CTA
   --------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <DivisionsPreview />
      <TechnologySection />
      <SolutionsPreview />
      <GlobalPresence />
      <StoriesPreview />
      <CareersPreview />
      <CatalogSection />
      <ContactCTA />
    </>
  );
}
