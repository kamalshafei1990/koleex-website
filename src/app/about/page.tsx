import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Koleex International Group, a global technology and industrial conglomerate with operations in over 80 countries.",
};

const leaders = [
  {
    name: "Elena Richter",
    role: "Chief Executive Officer",
    bio: "25 years in industrial technology. Previously led global operations at a Fortune 100 conglomerate.",
  },
  {
    name: "David Chen",
    role: "Chief Technology Officer",
    bio: "Former VP of Engineering at a leading robotics firm. PhD in Mechanical Engineering from MIT.",
  },
  {
    name: "Amara Osei",
    role: "Chief Financial Officer",
    bio: "Two decades of financial leadership across energy and advanced manufacturing sectors.",
  },
  {
    name: "Marcus Johansson",
    role: "President, Industrial Technology",
    bio: "Pioneered the adoption of collaborative robotics in European automotive manufacturing.",
  },
  {
    name: "Priya Sharma",
    role: "President, Digital Solutions",
    bio: "Built enterprise IoT platforms serving over 10 million connected devices worldwide.",
  },
  {
    name: "Thomas Keller",
    role: "President, Energy Systems",
    bio: "Led the development of grid-scale battery storage systems deployed across three continents.",
  },
];

const values = [
  {
    title: "Engineering Excellence",
    description:
      "We hold ourselves to the highest standards of precision, reliability, and innovation in everything we design and deliver.",
  },
  {
    title: "Customer Partnership",
    description:
      "We succeed when our customers succeed. Every solution starts with a deep understanding of the challenges they face.",
  },
  {
    title: "Sustainable Progress",
    description:
      "We engineer for the long term, creating technologies that advance industry while protecting the planet.",
  },
  {
    title: "Global Perspective",
    description:
      "With operations on six continents, we bring diverse expertise and local insight to every engagement.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Koleex International Group"
        subtitle="A global technology and industrial conglomerate engineering what matters for a better world."
      />

      {/* Our Story */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedSection>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
                Our Story
              </p>
              <h2 className="text-headline">Built on Decades of Innovation</h2>
              <p className="mt-6 text-body-large leading-relaxed">
                Founded with a singular vision to bridge the gap between
                cutting-edge research and real-world industrial application,
                Koleex International Group has grown into one of the world's
                most diversified technology conglomerates. Today, our products
                and platforms serve customers in over 80 countries across
                manufacturing, energy, healthcare, aerospace, and digital
                infrastructure.
              </p>
              <p className="mt-6 text-base leading-relaxed text-text-secondary">
                From our headquarters in Zurich, Switzerland, we coordinate
                research centres, manufacturing facilities, and service
                operations spanning six continents. Our 28,000 employees share
                a common purpose: to engineer technologies that make industries
                safer, more efficient, and more sustainable.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section background="light">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <AnimatedSection>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
                  Mission
                </p>
                <h2 className="text-title">
                  Deliver precision-engineered technology that empowers
                  industries and improves lives.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  We combine deep domain expertise with relentless innovation to
                  create products and solutions that solve the most complex
                  challenges facing our customers today.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
                  Vision
                </p>
                <h2 className="text-title">
                  To be the global standard for industrial innovation and
                  sustainable progress.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  We envision a world where technology and sustainability
                  reinforce each other, where every factory, grid, and supply
                  chain operates at its full potential with minimal environmental
                  impact.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* Leadership */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="Guided by Experience"
            subtitle="Our executive team brings together decades of expertise across technology, manufacturing, energy, and global operations."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader) => (
              <AnimatedSection key={leader.name}>
                <Card className="h-full">
                  <div className="aspect-[4/3] bg-surface-secondary" />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {leader.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent">
                      {leader.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {leader.bio}
                    </p>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* Global Presence */}
      <Section background="dark">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedSection>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
                Global Presence
              </p>
              <h2 className="text-headline text-text-inverse">
                Engineering on Every Continent
              </h2>
              <p className="mt-4 text-subtitle text-text-inverse/70">
                With operations in over 80 countries, we combine global scale
                with local expertise to serve our customers wherever they
                operate.
              </p>

              <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
                {[
                  { stat: "80+", label: "Countries" },
                  { stat: "28,000", label: "Employees" },
                  { stat: "12", label: "R&D Centres" },
                  { stat: "45", label: "Manufacturing Sites" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-display text-accent">{item.stat}</p>
                    <p className="mt-2 text-sm text-text-inverse/60">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Our Values"
            title="What Drives Us"
            subtitle="The principles that guide every decision, product, and partnership."
          />

          <div className="grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <AnimatedSection key={value.title}>
                <div className="rounded-2xl border border-border-light p-8">
                  <h3 className="text-xl font-semibold text-text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-text-secondary">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
