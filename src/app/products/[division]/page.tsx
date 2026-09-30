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
import type { Metadata } from "next";

export const revalidate = 3600;

interface Props { params: Promise<{ division: string }> }

/* Divisions with products are built ahead; any other on its first visit
   (then kept, like the rest, until the Hub says it changed). */
export async function generateStaticParams() {
  return (await hubTaxonomy()).filter((d) => d.productCount > 0).map((d) => ({ division: d.slug }));
}

async function load(slug: string) {
  const division = (await hubTaxonomy()).find((d) => d.slug === slug) ?? null;
  return division;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const division = await load((await params).division);
  return division ? { title: division.name, description: division.description ?? division.tagline ?? undefined } : {};
}

export default async function DivisionPage({ params }: Props) {
  const division = await load((await params).division);
  if (!division) notFound();
  const categories = division.categories.filter((c) => c.productCount > 0);
  const filter: ProductFilter = { division: division.slug };
  const products = await hubProducts({ ...filter, pageSize: PRODUCT_PAGE_SIZE });
  const breadcrumb = [
    { label: "Products", href: "/products" },
    { label: division.name, href: `/products/${division.slug}` },
  ];
  return (
    <>
      <PageHero title={division.name} subtitle={division.description ?? division.tagline ?? undefined} breadcrumb={breadcrumb} />

      {categories.length > 0 && (
        <Section>
          <Container>
            <SectionHeading eyebrow={division.name} title="Categories" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <AnimatedSection key={c.slug}>
                  <Card href={`/products/${division.slug}/${c.slug}`} variant="dark" className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                      {c.description ? <p className="mt-1 text-sm text-white/50">{c.description}</p> : null}
                      <p className="mt-4 text-sm font-medium text-white/80">{c.productCount} product{c.productCount === 1 ? "" : "s"} &rarr;</p>
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
          <SectionHeading eyebrow={division.name} title="Products" />
          <ProductGrid items={products.items.map(toCard)} total={products.total} filter={filter} emptyText="Products of this division will appear here shortly." />
        </Container>
      </Section>
    </>
  );
}
