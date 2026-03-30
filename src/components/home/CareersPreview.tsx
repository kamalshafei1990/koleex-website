import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function CareersPreview() {
  return (
    <Section background="light">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="CAREERS"
            title="Shape the Future With Us"
          />

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-text-secondary">
              We bring together engineers, scientists, designers, and
              strategists who share a passion for solving hard problems. Join a
              team where your work has a measurable impact on industries and
              communities worldwide.
            </p>

            <div className="mt-10">
              <Button href="/careers" size="lg">
                View Open Positions
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
