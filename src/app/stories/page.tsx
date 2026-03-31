import { stories } from "@/data/stories";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "News, case studies, and insights from across the Koleex International Group.",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function StoriesPage() {
  return (
    <>
      <PageHero
        title="Stories"
        subtitle="News, case studies, and insights from across our global operations and the industries we serve."
      />

      <Section>
        <Container>
          {/* Category filter visual (static, shows all) */}
          <div className="mb-12 flex flex-wrap items-center gap-3">
            {["All", "News", "Case Studies", "Insights"].map((tab, i) => (
              <span
                key={tab}
                className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-medium transition-premium ${
                  i === 0
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <AnimatedSection key={story.slug}>
                <Card
                  href={`/stories/${story.slug}`}
                  variant="dark"
                  className="h-full"
                >
                  <div className="aspect-[16/10] bg-white/5" />
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <Badge variant="accent">{story.category}</Badge>
                      <span className="text-xs text-white/35">
                        {story.readTime} min read
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold leading-snug text-white">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50 line-clamp-3">
                      {story.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-white/35">
                      {formatDate(story.date)}
                    </p>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
