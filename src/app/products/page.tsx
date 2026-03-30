import { divisions } from "@/data/products";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the full range of Koleex products across Industrial Technology, Energy Systems, Digital Solutions, and Advanced Materials.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Products"
        subtitle="Precision-engineered solutions across four core divisions, designed to meet the demands of a rapidly evolving world."
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Our Divisions"
            title="Four Pillars of Innovation"
            subtitle="Each division represents decades of engineering excellence, delivering products that set industry benchmarks."
          />

          <div className="grid gap-8 md:grid-cols-2">
            {divisions.map((division) => (
              <AnimatedSection key={division.slug}>
                <Card
                  href={`/products/${division.slug}`}
                  className="h-full"
                >
                  <div className="p-8 md:p-10">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
                      {division.tagline}
                    </p>
                    <h3 className="text-title text-text-primary">
                      {division.name}
                    </h3>
                    <p className="mt-4 text-body-large leading-relaxed">
                      {division.description}
                    </p>
                    <div className="mt-6">
                      <span className="text-sm font-medium text-accent">
                        Explore {division.categories.length} categories &rarr;
                      </span>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="light">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-headline">Find the Right Product</h2>
            <p className="text-subtitle mt-4">
              With thousands of configurations across our portfolio, our team can
              help you identify the ideal solution for your application.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/contact" size="lg">
                Contact Sales
              </Button>
              <Button href="/solutions" variant="secondary" size="lg">
                View Solutions
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
