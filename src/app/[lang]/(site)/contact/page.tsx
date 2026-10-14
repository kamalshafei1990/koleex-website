import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { hubCompany } from "@/lib/hub";
import { translate } from "@/i18n/words";
import type { Metadata } from "next";

/* ---------------------------------------------------------------------------
   Contact — the form beside the company's real details. A message or a
   quotation request (?product=<slug> from a product's page) reaches the
   Hub as a potential customer in its Customers app, and the team there is
   told (the leads step, 01/10/2026). The details — address, phones, email,
   the cities where it works — are the Hub's own record, the ones its
   quotations and invoices print. Every word of the page follows its
   language; the details stay as the Hub keeps them.
   --------------------------------------------------------------------------- */

export const revalidate = 3600;

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: translate("Contact", lang),
    description: translate("Get in touch with Koleex International Group — sales, quotations and support.", lang),
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const t = (s: string) => translate(s, lang);
  const company = await hubCompany();
  return (
    <>
      <PageHero
        title={t("Get in Touch")}
        subtitle={t("Tell us what you produce and what you need — our team will help you choose the right machines.")}
      />

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <AnimatedSection>
              <ContactForm companyEmail={company?.email ?? null} />
            </AnimatedSection>

            <AnimatedSection>
              {company ? (
                <div className="flex flex-col gap-8">
                  <div>
                    <h2 className="text-title text-white mb-2">{t("Write or call us")}</h2>
                    <p className="text-white/50">{t("A quotation, a question about a machine, or a partnership — we answer in English, Arabic and Chinese.")}</p>
                  </div>
                  <div>
                    <h3 className="text-overline">{t("Email")}</h3>
                    <p className="mt-2 text-lg text-white" dir="ltr"><a href={`mailto:${company.email}`} className="hover:underline underline-offset-4">{company.email}</a></p>
                  </div>
                  <div>
                    <h3 className="text-overline">{t("Phone")}</h3>
                    <p className="mt-2 text-lg text-white" dir="ltr"><a href={`tel:${company.tel.replace(/[^+\d]/g, "")}`} className="hover:underline underline-offset-4">{company.tel}</a></p>
                    <p className="mt-1 text-lg text-white" dir="ltr"><a href={`tel:${company.mobile.replace(/[^+\d]/g, "")}`} className="hover:underline underline-offset-4">{company.mobile}</a></p>
                  </div>
                  <div>
                    <h3 className="text-overline">{t("Main base")}</h3>
                    <p className="mt-2 text-white">{company.base}</p>
                    <p className="mt-2 text-base leading-relaxed text-white/50">{company.address}</p>
                  </div>
                  <div>
                    <h3 className="text-overline">{t("Where we work")}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {company.offices.map((city) => (
                        <li key={city} className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/70">{city}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-white/40">{t("Our contact details will appear here shortly.")}</p>
              )}
            </AnimatedSection>
          </div>
        </Container>
      </Section>
    </>
  );
}
