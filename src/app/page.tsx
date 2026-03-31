import { Hero } from "@/components/home/Hero";
import { BrandIntro } from "@/components/home/BrandIntro";
import { DivisionsPreview } from "@/components/home/DivisionsPreview";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { SolutionsPreview } from "@/components/home/SolutionsPreview";
import { GlobalPresence } from "@/components/home/GlobalPresence";
import { StoriesPreview } from "@/components/home/StoriesPreview";
import { CareersPreview } from "@/components/home/CareersPreview";
import { CatalogSection } from "@/components/home/CatalogSection";
import { ContactCTA } from "@/components/home/ContactCTA";

/* ---------------------------------------------------------------------------
   Homepage — Apple.com layout pattern:
   1. Hero (white, full-bleed image)
   2. Second hero (white, full-bleed image)
   3. Dark hero (black, full-bleed image)
   4. 2×2 tile grid (small product cards)
   5. Solutions (light gray, centered image)
   6. Global Presence (white, stats)
   7. Stories (light gray, 3-column cards)
   8. Careers (black, full-bleed image)
   9. Catalog / Resources (light gray, links)
   10. Contact CTA (white, links)
   --------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <DivisionsPreview />
      <FeaturedProducts />
      <SolutionsPreview />
      <GlobalPresence />
      <StoriesPreview />
      <CareersPreview />
      <CatalogSection />
      <ContactCTA />
    </>
  );
}
