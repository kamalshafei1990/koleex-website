import { solutions } from "@/data/solutions";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Discover how Koleex International Group delivers integrated solutions across manufacturing, energy, infrastructure, healthcare, supply chain, and aerospace.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        title="Solutions"
        subtitle="Integrated solutions that combine our products, platforms, and expertise to solve the most pressing challenges across industries."
      />

      {solutions.map((solution, index) => (
        <Section
          key={solution.slug}
          background={index % 2 === 0 ? "white" : "light"}
        >
          <Container>
            <AnimatedSection>
              <div className="mx-auto max-w-4xl">
                <div
                  className={`grid items-center gap-12 lg:grid-cols-2 ${
                    index % 2 !== 0 ? "lg:direction-rtl" : ""
                  }`}
                >
                  <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
                      Solution
                    </p>
                    <h2 className="text-headline">{solution.title}</h2>
                    <p className="mt-4 text-body-large leading-relaxed">
                      {solution.description}
                    </p>
                    <p className="mt-6 text-sm leading-relaxed text-text-secondary">
                      {solution.overview}
                    </p>
                    <div className="mt-8">
                      <Button href="/contact" variant="secondary">
                        Learn More
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`aspect-[4/3] rounded-2xl bg-surface-secondary ${
                      index % 2 !== 0 ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="flex h-full items-center justify-center text-text-tertiary">
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-30"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </Container>
        </Section>
      ))}

      <Section background="dark">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-headline text-text-inverse">
              Ready to Transform Your Operations?
            </h2>
            <p className="mt-4 text-subtitle text-text-inverse/70">
              Our solutions team works with you to design integrated systems
              tailored to your unique challenges.
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Talk to an Expert
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
