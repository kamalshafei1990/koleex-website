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
                <h2 className="text-title text-white mb-2">Send Us a Message</h2>
                <p className="text-white/50 mb-8">
                  Fill out the form below and a member of our team will respond
                  within one business day.
                </p>

                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-white/80"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="John Smith"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-premium placeholder:text-white/35 focus:border-white/30 focus:ring-1 focus:ring-white/30"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-white/80"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="john@company.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-premium placeholder:text-white/35 focus:border-white/30 focus:ring-1 focus:ring-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-sm font-medium text-white/80"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Acme Corporation"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-premium placeholder:text-white/35 focus:border-white/30 focus:ring-1 focus:ring-white/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-white/80"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-premium focus:border-white/30 focus:ring-1 focus:ring-white/30"
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
                      className="mb-2 block text-sm font-medium text-white/80"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-premium placeholder:text-white/35 focus:border-white/30 focus:ring-1 focus:ring-white/30"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact information */}
            <AnimatedSection>
              <div>
                <h2 className="text-title text-white mb-2">Contact Information</h2>
                <p className="text-white/50 mb-8">
                  Reach us directly through any of the channels below.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-overline">
                      Email
                    </h3>
                    <p className="mt-2 text-lg text-white">
                      {siteConfig.contact.email}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-overline">
                      Phone
                    </h3>
                    <p className="mt-2 text-lg text-white">
                      {siteConfig.contact.phone}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-overline">
                      Headquarters
                    </h3>
                    <div className="mt-2 text-base text-white/50">
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
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Our Offices"
            title="Global Locations"
            subtitle="With regional hubs on every major continent, we are never far from our customers."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((office) => (
              <AnimatedSection key={office.city}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 h-full">
                  <p className="text-overline">
                    {office.label}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {office.city}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">
                    {office.country}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/35">
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
