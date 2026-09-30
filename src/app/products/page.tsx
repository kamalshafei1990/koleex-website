import { hubTaxonomy } from "@/lib/hub";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { NoProducts } from "@/components/products/ProductCard";
import type { Metadata } from "next";

/* The divisions, straight from the Koleex Hub (Products is its source). */

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Products",
  description: "Explore Koleex machinery and equipment by division.",
};

export default async function ProductsPage() {
  const divisions = (await hubTaxonomy()).filter((d) => d.productCount > 0);
  return (
    <>
      <PageHero title="Products" subtitle="Machinery and equipment across the Koleex divisions." />

      <Section>
        <Container>
          <SectionHeading eyebrow="Our Divisions" title="Explore by division" />
          {divisions.length === 0 ? (
            <NoProducts text="The product range will appear here shortly." />
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {divisions.map((division) => (
                <AnimatedSection key={division.slug}>
                  <Card href={`/products/${division.slug}`} variant="dark" className="h-full">
                    <div className="p-8 md:p-10">
                      {division.tagline ? <p className="text-overline mb-3">{division.tagline}</p> : null}
                      <h3 className="text-title text-white">{division.name}</h3>
                      {division.description ? <p className="mt-4 text-body-large leading-relaxed !text-white/50">{division.description}</p> : null}
                      <div className="mt-6">
                        <span className="text-sm font-medium text-white/80">
                          {division.productCount} product{division.productCount === 1 ? "" : "s"} &rarr;
                        </span>
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-headline text-white">Find the right machine</h2>
            <p className="text-subtitle mt-4 !text-white/50">Our team can help you choose the right configuration for your production.</p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/contact" variant="primary" size="lg">Contact Sales</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
