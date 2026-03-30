import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function ContactCTA() {
  return (
    <Section background="dark">
      <Container>
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-headline text-white">
              Let&apos;s Build Something Extraordinary
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              Whether you&apos;re exploring a new initiative or ready to scale,
              our team is here to help you move forward with confidence.
            </p>
            <div className="mt-10">
              <Button href="/contact" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
