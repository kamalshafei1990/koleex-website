import { notFound } from "next/navigation";
import { hubProducts, hubTaxonomy } from "@/lib/hub";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/products/ProductGrid";
import { PRODUCT_PAGE_SIZE, toCard, type ProductFilter } from "@/lib/product-list";
import { localize, nameIn } from "@/i18n/config";
import { translate } from "@/i18n/words";
import type { Metadata } from "next";

export const revalidate = 3600;

interface Props { params: Promise<{ lang: string; division: string; category: string; subcategory: string }> }

/* Types with products are built ahead (in each language built ahead); any
   other on its first visit. */
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
  return found ? { title: nameIn(found.subcategory, p.lang), description: p.lang === "en" ? found.subcategory.description ?? undefined : undefined } : {};
}

export default async function SubcategoryPage({ params }: Props) {
  const p = await params;
  const { lang } = p;
  const found = await load(p.division, p.category, p.subcategory);
  if (!found) notFound();
  const { division, category, subcategory } = found;
  const L = (href: string) => localize(href, lang);
  const filter: ProductFilter = { subcategory: subcategory.slug };
  const products = await hubProducts({ ...filter, pageSize: PRODUCT_PAGE_SIZE });
  const breadcrumb = [
    { label: translate("Products", lang), href: L("/products") },
    { label: nameIn(division, lang), href: L(`/products/${division.slug}`) },
    { label: nameIn(category, lang), href: L(`/products/${division.slug}/${category.slug}`) },
    { label: nameIn(subcategory, lang), href: L(`/products/${division.slug}/${category.slug}/${subcategory.slug}`) },
  ];
  return (
    <>
      <PageHero title={nameIn(subcategory, lang)} subtitle={lang === "en" ? subcategory.description ?? undefined : undefined} breadcrumb={breadcrumb} />
      <Section>
        <Container>
          <SectionHeading eyebrow={nameIn(category, lang)} title={translate("Products", lang)} />
          <ProductGrid items={products.items.map((x) => toCard(x, lang))} total={products.total} filter={filter} emptyText={translate("Products of this type will appear here shortly.", lang)} />
        </Container>
      </Section>
    </>
  );
}
