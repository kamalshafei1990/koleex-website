import { hubTaxonomy } from "@/lib/hub";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { NoProducts } from "@/components/products/ProductCard";
import { arrowOf, localize, nameIn } from "@/i18n/config";
import { productCount, translate } from "@/i18n/words";
import type { Metadata } from "next";

/* The divisions, straight from the Koleex Hub (Products is its source), in
   the page's language. */

export const revalidate = 3600;

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: translate("Products", lang), description: translate("Machinery and equipment across the Koleex divisions.", lang) };
}

export default async function ProductsPage({ params }: Props) {
  const { lang } = await params;
  const t = (s: string) => translate(s, lang);
  const divisions = (await hubTaxonomy()).filter((d) => d.productCount > 0);
  return (
    <>
      <PageHero title={t("Products")} subtitle={t("Machinery and equipment across the Koleex divisions.")} />

      <Section>
        <Container>
          <SectionHeading eyebrow={t("Our Divisions")} title={t("Explore by division")} />
          {divisions.length === 0 ? (
            <NoProducts text={t("The product range will appear here shortly.")} />
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {divisions.map((division) => (
                <AnimatedSection key={division.slug}>
                  <Card href={localize(`/products/${division.slug}`, lang)} variant="dark" className="h-full">
                    <div className="p-8 md:p-10">
                      {lang === "en" && division.tagline ? <p className="text-overline mb-3">{division.tagline}</p> : null}
                      <h3 className="text-title text-white">{nameIn(division, lang)}</h3>
                      {lang === "en" && division.description ? <p className="mt-4 text-body-large leading-relaxed !text-white/50">{division.description}</p> : null}
                      <div className="mt-6">
                        <span className="text-sm font-medium text-white/80">{productCount(division.productCount, lang)} {arrowOf(lang)}</span>
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-headline text-white">{t("Find the right machine")}</h2>
            <p className="text-subtitle mt-4 !text-white/50">{t("Our team can help you choose the right configuration for your production.")}</p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href={localize("/contact", lang)} variant="primary" size="lg">{t("Contact Sales")}</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
