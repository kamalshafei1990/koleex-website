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

interface Props { params: Promise<{ division: string; category: string }> }

/* Categories with products are built ahead; any other on its first visit. */
export async function generateStaticParams() {
  return (await hubTaxonomy()).flatMap((d) =>
    d.categories.filter((c) => c.productCount > 0).map((c) => ({ division: d.slug, category: c.slug })));
}

async function load(dSlug: string, cSlug: string) {
  const division = (await hubTaxonomy()).find((d) => d.slug === dSlug) ?? null;
  const category = division?.categories.find((c) => c.slug === cSlug) ?? null;
  return division && category ? { division, category } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { division, category } = await params;
  const found = await load(division, category);
  return found ? { title: found.category.name, description: found.category.description ?? undefined } : {};
}

export default async function CategoryPage({ params }: Props) {
  const p = await params;
  const found = await load(p.division, p.category);
  if (!found) notFound();
  const { division, category } = found;
  const subcategories = category.subcategories.filter((s) => s.productCount > 0);
  const filter: ProductFilter = { category: category.slug };
  const products = await hubProducts({ ...filter, pageSize: PRODUCT_PAGE_SIZE });
  const breadcrumb = [
    { label: "Products", href: "/products" },
    { label: division.name, href: `/products/${division.slug}` },
    { label: category.name, href: `/products/${division.slug}/${category.slug}` },
  ];
  return (
    <>
      <PageHero title={category.name} subtitle={category.description ?? undefined} breadcrumb={breadcrumb} />

      {subcategories.length > 0 && (
        <Section>
          <Container>
            <SectionHeading eyebrow={category.name} title="Types" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {subcategories.map((s) => (
                <AnimatedSection key={s.slug}>
                  <Card href={`/products/${division.slug}/${category.slug}/${s.slug}`} variant="dark" className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white">{s.name}</h3>
                      {s.description ? <p className="mt-1 text-sm text-white/50">{s.description}</p> : null}
                      <p className="mt-4 text-sm font-medium text-white/80">{s.productCount} product{s.productCount === 1 ? "" : "s"} &rarr;</p>
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
          <SectionHeading eyebrow={category.name} title="Products" />
          <ProductGrid items={products.items.map(toCard)} total={products.total} filter={filter} emptyText="Products of this category will appear here shortly." />
        </Container>
      </Section>
    </>
  );
}
