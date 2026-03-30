import { siteConfig } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Koleex International Group. Reach our sales, support, or corporate teams.",
};

const offices = [
  {
    city: "Zurich",
    country: "Switzerland",
    label: "Global Headquarters",
    address: "One Koleex Tower, 200 Innovation Drive, 8005 Zurich",
  },
  {
    city: "Austin",
    country: "United States",
    label: "Americas Hub",
    address: "500 Technology Parkway, Austin, TX 78701",
  },
  {
    city: "Singapore",
    country: "Singapore",
    label: "Asia-Pacific Hub",
    address: "10 Science Park Road, Singapore 117684",
  },
  {
    city: "Munich",
    country: "Germany",
    label: "European Operations",
    address: "Industriestrasse 42, 80939 Munich",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="Whether you have a technical question, a partnership enquiry, or want to learn more about our solutions, we are here to help."
      />

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact form */}
            <AnimatedSection>
              <div>
                <h2 className="text-title mb-2">Send Us a Message</h2>
                <p className="text-text-secondary mb-8">
                  Fill out the form below and a member of our team will respond
                  within one business day.
                </p>

                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-text-primary"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="John Smith"
                        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary outline-none transition-premium placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-text-primary"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="john@company.com"
                        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary outline-none transition-premium placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-sm font-medium text-text-primary"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Acme Corporation"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary outline-none transition-premium placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-text-primary"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary outline-none transition-premium focus:border-accent focus:ring-1 focus:ring-accent"
                    >
                      <option value="">Select a subject</option>
                      <option value="sales">Sales Enquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="careers">Careers</option>
                      <option value="press">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-text-primary"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary outline-none transition-premium placeholder:text-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact information */}
            <AnimatedSection>
              <div>
                <h2 className="text-title mb-2">Contact Information</h2>
                <p className="text-text-secondary mb-8">
                  Reach us directly through any of the channels below.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-text-tertiary">
                      Email
                    </h3>
                    <p className="mt-2 text-lg text-text-primary">
                      {siteConfig.contact.email}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-text-tertiary">
                      Phone
                    </h3>
                    <p className="mt-2 text-lg text-text-primary">
                      {siteConfig.contact.phone}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-text-tertiary">
                      Headquarters
                    </h3>
                    <div className="mt-2 text-base text-text-secondary">
                      {siteConfig.contact.address.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* Office locations */}
      <Section background="light">
        <Container>
          <SectionHeading
            eyebrow="Our Offices"
            title="Global Locations"
            subtitle="With regional hubs on every major continent, we are never far from our customers."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((office) => (
              <AnimatedSection key={office.city}>
                <div className="rounded-2xl border border-border-light bg-white p-6 h-full">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {office.label}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-text-primary">
                    {office.city}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {office.country}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-tertiary">
                    {office.address}
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
