import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { stories } from "@/data/stories";

const latestStories = stories.slice(0, 3);

export function StoriesPreview() {
  return (
    <Section background="white">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="STORIES"
            title="Insights and Impact"
          />
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestStories.map((story) => (
            <AnimatedSection key={story.slug}>
              <Card
                image={story.image}
                imageAlt={story.title}
                href={`/stories/${story.slug}`}
              >
                <div className="flex items-center gap-3">
                  <Badge variant="accent">{story.category}</Badge>
                  <time className="text-xs text-text-secondary">
                    {new Date(story.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-text-primary">
                  {story.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {story.excerpt}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-accent">
                  Read More &rarr;
                </span>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
