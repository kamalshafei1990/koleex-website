import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { divisions } from "@/data/products";

export function DivisionsPreview() {
  return (
    <Section background="light">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="OUR DIVISIONS"
            title="Four Pillars of Innovation"
          />
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((division) => (
            <AnimatedSection key={division.slug}>
              <Link
                href={`/products/${division.slug}`}
                className="group block rounded-2xl border border-border-light bg-white p-8 transition-premium hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {division.tagline}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-text-primary">
                  {division.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {division.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-accent transition-premium group-hover:translate-x-1">
                  Learn more &rarr;
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
