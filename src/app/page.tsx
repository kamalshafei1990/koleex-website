import { Hero } from "@/components/home/Hero";
import { BrandIntro } from "@/components/home/BrandIntro";
import { DivisionsPreview } from "@/components/home/DivisionsPreview";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { SolutionsPreview } from "@/components/home/SolutionsPreview";
import { StoriesPreview } from "@/components/home/StoriesPreview";
import { CareersPreview } from "@/components/home/CareersPreview";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <DivisionsPreview />
      <FeaturedProducts />
      <SolutionsPreview />
      <StoriesPreview />
      <CareersPreview />
      <ContactCTA />
    </>
  );
}
