import { notFound } from "next/navigation";
import Link from "next/link";
import { stories, getStoryBySlug } from "@/data/stories";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) notFound();

  return (
    <>
      {/* Article header */}
      <section className="bg-surface-dark py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <Badge variant="accent">{story.category}</Badge>
              <span className="text-sm text-text-inverse/60">
                {story.readTime} min read
              </span>
            </div>
            <h1 className="text-display text-text-inverse">{story.title}</h1>
            <p className="mt-6 text-subtitle text-text-inverse/70">
              {story.excerpt}
            </p>
            <p className="mt-6 text-sm text-text-inverse/50">
              {formatDate(story.date)}
            </p>
          </div>
        </Container>
      </section>

      {/* Article body */}
      <section className="py-20 md:py-28">
        <Container>
          <article className="mx-auto max-w-3xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-body-large leading-relaxed">
                The convergence of advanced engineering and digital intelligence
                is reshaping how industries operate at every level. From the
                factory floor to the executive suite, organisations are
                discovering that precision, connectivity, and sustainability are
                no longer competing priorities but complementary pillars of a
                modern enterprise.
              </p>

              <p className="mt-6 text-base leading-relaxed text-text-secondary">
                At Koleex International Group, this philosophy informs every
                product we design and every solution we deliver. Our teams work
                across disciplines to ensure that the technologies of today are
                built to accommodate the demands of tomorrow. Whether the
                challenge is reducing cycle times in a high-volume assembly line
                or extending the operational life of critical grid
                infrastructure, the approach remains the same: start with the
                data, engineer for resilience, and iterate relentlessly.
              </p>

              <p className="mt-6 text-base leading-relaxed text-text-secondary">
                This commitment to continuous improvement is reflected in our
                latest initiatives. Over the past twelve months, our research
                centres in Zurich, Singapore, and Austin have filed more than
                180 patent applications spanning materials science, edge
                computing, and energy storage. Each patent represents not just
                an invention, but a step toward solving a real-world problem for
                our customers and partners across six continents.
              </p>

              <p className="mt-6 text-base leading-relaxed text-text-secondary">
                As the global landscape continues to evolve, we remain focused
                on what matters most: delivering measurable outcomes for the
                people and organisations that depend on our technology. The
                chapters ahead will demand bold thinking and disciplined
                execution, and we are prepared for both.
              </p>
            </div>

            <hr className="my-12 border-border-light" />

            <div className="flex items-center justify-between">
              <Button href="/stories" variant="secondary">
                &larr; Back to Stories
              </Button>
              <Button href="/contact" variant="link">
                Get in touch
              </Button>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
