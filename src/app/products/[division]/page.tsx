import { notFound } from "next/navigation";
import { divisions, getDivisionBySlug } from "@/data/products";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ division: string }>;
}

export async function generateStaticParams() {
  return divisions.map((d) => ({ division: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { division: slug } = await params;
  const division = getDivisionBySlug(slug);
  if (!division) return {};
  return {
    title: division.name,
    description: division.description,
  };
}

export default async function DivisionPage({ params }: Props) {
  const { division: slug } = await params;
  const division = getDivisionBySlug(slug);

  if (!division) notFound();

  const breadcrumb = [
    { label: "Products", href: "/products" },
    { label: division.name, href: `/products/${division.slug}` },
  ];

  return (
    <>
      <PageHero
        title={division.name}
        subtitle={division.description}
        breadcrumb={breadcrumb}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow={division.tagline}
            title="Categories"
            subtitle={`Explore the product categories within ${division.name}.`}
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {division.categories.map((category) => (
              <AnimatedSection key={category.slug}>
                <Card
                  href={`/products/${division.slug}/${category.slug}`}
                  variant="dark"
                  className="h-full"
                >
                  <div className="p-6">
                    <p className="text-overline">{division.name}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/50">
                      {category.description}
                    </p>
                    <div className="mt-4">
                      <span className="link-cta link-cta-dark">
                        {category.subcategories.length} subcategories &rarr;
                      </span>
                    </div>
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
