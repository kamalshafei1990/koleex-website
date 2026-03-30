import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function BrandIntro() {
  return (
    <Section background="white">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="WHO WE ARE"
            title="A Global Force in Technology and Innovation"
          />

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-text-secondary">
              For over two decades, Koleex International Group has partnered
              with the world&apos;s most ambitious organisations to solve
              complex engineering challenges. Our four divisions span
              industrial technology, energy systems, digital platforms, and
              advanced materials &mdash; delivering integrated solutions that
              drive efficiency, resilience, and growth at global scale.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
