import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Koleex International Group and help shape the future of technology, energy, and advanced materials.",
};

const whyKoleex = [
  {
    title: "Impact at Scale",
    description:
      "Your work reaches customers in over 80 countries. Every line of code, every design decision, and every research breakthrough makes a tangible difference.",
  },
  {
    title: "Continuous Growth",
    description:
      "From mentorship programmes to global rotation assignments, we invest in your development at every stage of your career.",
  },
  {
    title: "Collaborative Culture",
    description:
      "Our best innovations come from cross-functional teams. Engineers, scientists, designers, and strategists work side by side.",
  },
  {
    title: "Purposeful Work",
    description:
      "We engineer technologies that advance sustainability, improve safety, and create lasting value for communities worldwide.",
  },
];

const openPositions = [
  {
    title: "Senior Robotics Engineer",
    department: "Industrial Technology",
    location: "Zurich, Switzerland",
    type: "Full-time",
  },
  {
    title: "IoT Platform Architect",
    department: "Digital Solutions",
    location: "Austin, TX, USA",
    type: "Full-time",
  },
  {
    title: "Battery Systems Researcher",
    department: "Energy Systems",
    location: "Singapore",
    type: "Full-time",
  },
  {
    title: "Materials Science Engineer",
    department: "Advanced Materials",
    location: "Munich, Germany",
    type: "Full-time",
  },
  {
    title: "Product Design Lead",
    department: "Corporate Design",
    location: "London, UK",
    type: "Full-time",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Shape the Future With Us"
        subtitle="Join a team of 28,000 engineers, scientists, and innovators building the technologies that define what comes next."
      />

      {/* Why Koleex */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why Koleex"
            title="More Than a Career"
            subtitle="We offer an environment where ambition meets purpose and talent meets opportunity."
          />

          <div className="grid gap-8 sm:grid-cols-2">
            {whyKoleex.map((item) => (
              <AnimatedSection key={item.title}>
                <div className="rounded-2xl border border-white/10 p-8 h-full">
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white/50">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* Open Positions */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Open Positions"
            title="Current Opportunities"
            subtitle="Explore roles across our four divisions and corporate teams worldwide."
          />

          <div className="mx-auto max-w-3xl space-y-4">
            {openPositions.map((job) => (
              <AnimatedSection key={job.title}>
                <Card variant="dark" className="h-full">
                  <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {job.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge variant="accent">{job.department}</Badge>
                        <Badge>{job.location}</Badge>
                        <Badge>{job.type}</Badge>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="text-sm font-medium text-white/80">
                        View Role &rarr;
                      </span>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/50">
              Don&apos;t see the right role?
            </p>
            <Button href="/contact" variant="secondary" className="mt-4">
              Send Us Your CV
            </Button>
          </div>
        </Container>
      </Section>

      {/* Culture */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedSection>
              <p className="text-overline mb-3">
                Our Culture
              </p>
              <h2 className="text-headline text-white">
                Built on Respect, Driven by Curiosity
              </h2>
              <p className="mt-6 text-body-large leading-relaxed !text-white/50">
                At Koleex, we believe the best ideas emerge when diverse
                perspectives come together in an environment of mutual respect.
                We foster a culture of intellectual curiosity, rigorous debate,
                and shared ownership, where every team member has the agency to
                make meaningful contributions.
              </p>
              <p className="mt-6 text-base leading-relaxed text-white/35">
                From our annual innovation summit to local community initiatives,
                we create spaces for our people to connect, learn, and grow both
                professionally and personally.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </Section>
    </>
  );
}
