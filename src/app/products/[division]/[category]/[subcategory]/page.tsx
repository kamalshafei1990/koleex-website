import { notFound } from "next/navigation";
import {
  divisions,
  getDivisionBySlug,
  getCategoryBySlug,
  getSubcategoryBySlug,
} from "@/data/products";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

interface Props {
  params: Promise<{
    division: string;
    category: string;
    subcategory: string;
  }>;
}

export async function generateStaticParams() {
  const paths: { division: string; category: string; subcategory: string }[] =
    [];
  for (const division of divisions) {
    for (const category of division.categories) {
      for (const sub of category.subcategories) {
        paths.push({
          division: division.slug,
          category: category.slug,
          subcategory: sub.slug,
        });
      }
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { division: dSlug, category: cSlug, subcategory: sSlug } = await params;
  const sub = getSubcategoryBySlug(dSlug, cSlug, sSlug);
  if (!sub) return {};
  return {
    title: sub.name,
    description: sub.description,
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { division: dSlug, category: cSlug, subcategory: sSlug } = await params;
  const division = getDivisionBySlug(dSlug);
  const category = getCategoryBySlug(dSlug, cSlug);
  const subcategory = getSubcategoryBySlug(dSlug, cSlug, sSlug);

  if (!division || !category || !subcategory) notFound();

  const breadcrumb = [
    { label: "Products", href: "/products" },
    { label: division.name, href: `/products/${division.slug}` },
    {
      label: category.name,
      href: `/products/${division.slug}/${category.slug}`,
    },
    {
      label: subcategory.name,
      href: `/products/${division.slug}/${category.slug}/${subcategory.slug}`,
    },
  ];

  return (
    <>
      <PageHero
        title={subcategory.name}
        subtitle={subcategory.description}
        breadcrumb={breadcrumb}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow={category.name}
            title="Products"
            subtitle={`Discover the products available within ${subcategory.name}.`}
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {subcategory.products.map((product) => (
              <AnimatedSection key={product.slug}>
                <Card
                  href={`/products/${division.slug}/${category.slug}/${subcategory.slug}/${product.slug}`}
                  title={product.name}
                  description={product.description}
                  className="h-full"
                >
                  <div className="mt-4 px-6 pb-6">
                    <span className="text-sm font-medium text-accent">
                      {product.models.length} model{product.models.length !== 1 ? "s" : ""} available &rarr;
                    </span>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
