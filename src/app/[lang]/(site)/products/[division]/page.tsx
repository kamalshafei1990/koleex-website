import { notFound } from "next/navigation";
import { hubProducts, hubTaxonomy } from "@/lib/hub";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProductGrid } from "@/components/products/ProductGrid";
import { PRODUCT_PAGE_SIZE, toCard, type ProductFilter } from "@/lib/product-list";
import { arrowOf, localize, nameIn } from "@/i18n/config";
import { productCount, translate } from "@/i18n/words";
import type { Metadata } from "next";

export const revalidate = 3600;

interface Props { params: Promise<{ lang: string; division: string }> }

/* Divisions with products are built ahead; any other on its first visit
   (then kept, like the rest, until the Hub says it changed). */
export async function generateStaticParams() {
  return (await hubTaxonomy()).filter((d) => d.productCount > 0).map((d) => ({ division: d.slug }));
}

async function load(slug: string) {
  return (await hubTaxonomy()).find((d) => d.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const division = await load(p.division);
  return division ? { title: nameIn(division, p.lang), description: p.lang === "en" ? division.description ?? division.tagline ?? undefined : undefined } : {};
}

export default async function DivisionPage({ params }: Props) {
  const p = await params;
  const { lang } = p;
  const division = await load(p.division);
  if (!division) notFound();
  const L = (href: string) => localize(href, lang);
  const categories = division.categories.filter((c) => c.productCount > 0);
  const filter: ProductFilter = { division: division.slug };
  const products = await hubProducts({ ...filter, pageSize: PRODUCT_PAGE_SIZE });
  const breadcrumb = [
    { label: translate("Products", lang), href: L("/products") },
    { label: nameIn(division, lang), href: L(`/products/${division.slug}`) },
  ];
  return (
    <>
      <PageHero title={nameIn(division, lang)} subtitle={lang === "en" ? division.description ?? division.tagline ?? undefined : undefined} breadcrumb={breadcrumb} />

      {categories.length > 0 && (
        <Section>
          <Container>
            <SectionHeading eyebrow={nameIn(division, lang)} title={translate("Categories", lang)} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <AnimatedSection key={c.slug}>
                  <Card href={L(`/products/${division.slug}/${c.slug}`)} variant="dark" className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white">{nameIn(c, lang)}</h3>
                      {lang === "en" && c.description ? <p className="mt-1 text-sm text-white/50">{c.description}</p> : null}
                      <p className="mt-4 text-sm font-medium text-white/80">{productCount(c.productCount, lang)} {arrowOf(lang)}</p>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <SectionHeading eyebrow={nameIn(division, lang)} title={translate("Products", lang)} />
          <ProductGrid items={products.items.map((x) => toCard(x, lang))} total={products.total} filter={filter} emptyText={translate("Products of this division will appear here shortly.", lang)} />
        </Container>
      </Section>
    </>
  );
}
