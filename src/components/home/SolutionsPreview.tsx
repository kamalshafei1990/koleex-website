import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { solutions } from "@/data/solutions";

export function SolutionsPreview() {
  return (
    <Section background="dark">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="SOLUTIONS"
            title="Transforming Industries"
          />
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <AnimatedSection key={solution.slug}>
              <a
                href="/solutions"
                className="group block rounded-2xl border border-white/10 bg-white/5 p-8 transition-premium hover:bg-white/10"
              >
                <p className="text-2xl">{getIconEmoji(solution.icon)}</p>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {solution.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {solution.description}
                </p>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Map icon names to simple unicode glyphs as lightweight placeholders. */
function getIconEmoji(icon: string): string {
  const map: Record<string, string> = {
    Factory: "\u2699",
    Zap: "\u26A1",
    Network: "\uD83C\uDF10",
    HeartPulse: "\u2764",
    Truck: "\uD83D\uDE9A",
    Plane: "\u2708",
  };
  return map[icon] ?? "\u25CF";
}
