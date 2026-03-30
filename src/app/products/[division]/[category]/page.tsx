import { notFound } from "next/navigation";
import {
  divisions,
  getDivisionBySlug,
  getCategoryBySlug,
} from "@/data/products";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ division: string; category: string }>;
}

export async function generateStaticParams() {
  const paths: { division: string; category: string }[] = [];
  for (const division of divisions) {
    for (const category of division.categories) {
      paths.push({ division: division.slug, category: category.slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { division: dSlug, category: cSlug } = await params;
  const category = getCategoryBySlug(dSlug, cSlug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { division: dSlug, category: cSlug } = await params;
  const division = getDivisionBySlug(dSlug);
  const category = getCategoryBySlug(dSlug, cSlug);

  if (!division || !category) notFound();

  const breadcrumb = [
    { label: "Products", href: "/products" },
    { label: division.name, href: `/products/${division.slug}` },
    {
      label: category.name,
      href: `/products/${division.slug}/${category.slug}`,
    },
  ];

  return (
    <>
      <PageHero
        title={category.name}
        subtitle={category.description}
        breadcrumb={breadcrumb}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow={division.name}
            title="Subcategories"
            subtitle={`Browse the specialised product lines within ${category.name}.`}
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {category.subcategories.map((sub) => (
              <AnimatedSection key={sub.slug}>
                <Card
                  href={`/products/${division.slug}/${category.slug}/${sub.slug}`}
                  title={sub.name}
                  description={sub.description}
                  className="h-full"
                >
                  <div className="mt-4 px-6 pb-6">
                    <span className="text-sm font-medium text-accent">
                      {sub.products.length} product{sub.products.length !== 1 ? "s" : ""} &rarr;
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
