import { notFound } from "next/navigation";
import { hubProducts, hubTaxonomy } from "@/lib/hub";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/products/ProductGrid";
import { PRODUCT_PAGE_SIZE, toCard, type ProductFilter } from "@/lib/product-list";
import type { Metadata } from "next";

export const revalidate = 3600;

interface Props { params: Promise<{ division: string; category: string; subcategory: string }> }

/* Types with products are built ahead; any other on its first visit. */
export async function generateStaticParams() {
  return (await hubTaxonomy()).flatMap((d) =>
    d.categories.flatMap((c) =>
      c.subcategories.filter((s) => s.productCount > 0).map((s) => ({ division: d.slug, category: c.slug, subcategory: s.slug }))));
}

async function load(dSlug: string, cSlug: string, sSlug: string) {
  const division = (await hubTaxonomy()).find((d) => d.slug === dSlug) ?? null;
  const category = division?.categories.find((c) => c.slug === cSlug) ?? null;
  const subcategory = category?.subcategories.find((s) => s.slug === sSlug) ?? null;
  return division && category && subcategory ? { division, category, subcategory } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const found = await load(p.division, p.category, p.subcategory);
  return found ? { title: found.subcategory.name, description: found.subcategory.description ?? undefined } : {};
}

export default async function SubcategoryPage({ params }: Props) {
  const p = await params;
  const found = await load(p.division, p.category, p.subcategory);
  if (!found) notFound();
  const { division, category, subcategory } = found;
  const filter: ProductFilter = { subcategory: subcategory.slug };
  const products = await hubProducts({ ...filter, pageSize: PRODUCT_PAGE_SIZE });
  const breadcrumb = [
    { label: "Products", href: "/products" },
    { label: division.name, href: `/products/${division.slug}` },
    { label: category.name, href: `/products/${division.slug}/${category.slug}` },
    { label: subcategory.name, href: `/products/${division.slug}/${category.slug}/${subcategory.slug}` },
  ];
  return (
    <>
      <PageHero title={subcategory.name} subtitle={subcategory.description ?? undefined} breadcrumb={breadcrumb} />
      <Section>
        <Container>
          <SectionHeading eyebrow={category.name} title="Products" />
          <ProductGrid items={products.items.map(toCard)} total={products.total} filter={filter} emptyText="Products of this type will appear here shortly." />
        </Container>
      </Section>
    </>
  );
}
