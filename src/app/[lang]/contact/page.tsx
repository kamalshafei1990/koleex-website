import { EnglishOnly } from "@/components/i18n/EnglishOnly";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { EmailUs } from "@/components/contact/EmailUs";
import { hubCompany } from "@/lib/hub";
import type { Metadata } from "next";

/* ---------------------------------------------------------------------------
   Contact — the company's real details, from the Hub's own record (the
   address, phones and email its quotations and invoices print, and the
   cities where it has a presence). Replaced the made-up offices (Zurich,
   Austin, Singapore, Munich) and a form that sent nothing (30/09/2026); the
   form returns with the leads step, into the Hub's Contacts.
   --------------------------------------------------------------------------- */

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Koleex International Group — sales, quotations and support.",
};

async function ContactPage() {
  const company = await hubCompany();
  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="Tell us what you produce and what you need — our team will help you choose the right machines."
      />

      <Section>
        <Container>
          {company ? (
            <div className="grid gap-16 lg:grid-cols-2">
              <AnimatedSection>
                <div className="flex flex-col gap-8">
                  <div>
                    <h2 className="text-title text-white mb-2">Write or call us</h2>
                    <p className="text-white/50">A quotation, a question about a machine, or a partnership — we answer in English, Arabic and Chinese.</p>
                  </div>
                  <div>
                    <h3 className="text-overline">Email</h3>
                    <p className="mt-2 text-lg text-white" dir="ltr">{company.email}</p>
                  </div>
                  <div>
                    <h3 className="text-overline">Phone</h3>
                    <p className="mt-2 text-lg text-white" dir="ltr"><a href={`tel:${company.tel.replace(/[^+\d]/g, "")}`} className="hover:underline underline-offset-4">{company.tel}</a></p>
                    <p className="mt-1 text-lg text-white" dir="ltr"><a href={`tel:${company.mobile.replace(/[^+\d]/g, "")}`} className="hover:underline underline-offset-4">{company.mobile}</a></p>
                  </div>
                  <div>
                    <EmailUs email={company.email} className="inline-flex h-[48px] items-center justify-center rounded-full bg-white px-8 text-[14px] font-medium text-black hover:bg-white/90">
                      Email us
                    </EmailUs>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="text-overline">Main base</h3>
                    <p className="mt-2 text-white">{company.base}</p>
                    <p className="mt-2 text-base leading-relaxed text-white/50">{company.address}</p>
                  </div>
                  <div>
                    <h3 className="text-overline">Where we work</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {company.offices.map((city) => (
                        <li key={city} className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/70">{city}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          ) : (
            <p className="py-16 text-center text-body-large !text-white/40">Our contact details will appear here shortly.</p>
          )}
        </Container>
      </Section>
    </>
  );
}

/* English only for now: in another language it reads as English, under a
   note (components/i18n/EnglishOnly). */
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  return <EnglishOnly lang={(await params).lang}><ContactPage /></EnglishOnly>;
}
