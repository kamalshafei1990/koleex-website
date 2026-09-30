import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { hubJobs } from "@/lib/hub";
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

/* Open roles come from the Koleex Hub (HR's job postings), never written here. */
export const revalidate = 3600;

export default async function CareersPage() {
  const openPositions = await hubJobs();
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
            subtitle="The roles open at Koleex right now."
          />

          <div className="mx-auto max-w-3xl space-y-4">
            {openPositions.length === 0 ? (
              <p className="py-10 text-center text-white/50">No open positions right now — you are welcome to send us your CV.</p>
            ) : openPositions.map((job) => (
              <AnimatedSection key={job.id}>
                <Card variant="dark" className="h-full">
                  <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {job.department ? <Badge variant="accent">{job.department}</Badge> : null}
                        {job.location ? <Badge>{job.location}</Badge> : null}
                        {typeof job.employmentType === "string" && job.employmentType ? <Badge>{job.employmentType}</Badge> : null}
                      </div>
                      {job.description ? <p className="mt-3 line-clamp-3 text-sm text-white/50">{job.description}</p> : null}
                    </div>
                    <div className="shrink-0">
                      <Button href={`/contact?job=${encodeURIComponent(job.id)}`} variant="secondary">Apply</Button>
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
