import { notFound } from "next/navigation";
import {
  divisions,
  getDivisionBySlug,
  getCategoryBySlug,
  getSubcategoryBySlug,
  getProductBySlug,
} from "@/data/products";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

interface Props {
  params: Promise<{
    division: string;
    category: string;
    subcategory: string;
    product: string;
  }>;
}

export async function generateStaticParams() {
  const paths: {
    division: string;
    category: string;
    subcategory: string;
    product: string;
  }[] = [];
  for (const division of divisions) {
    for (const category of division.categories) {
      for (const sub of category.subcategories) {
        for (const product of sub.products) {
          paths.push({
            division: division.slug,
            category: category.slug,
            subcategory: sub.slug,
            product: product.slug,
          });
        }
      }
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {
    division: dSlug,
    category: cSlug,
    subcategory: sSlug,
    product: pSlug,
  } = await params;
  const product = getProductBySlug(dSlug, cSlug, sSlug, pSlug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const {
    division: dSlug,
    category: cSlug,
    subcategory: sSlug,
    product: pSlug,
  } = await params;
  const division = getDivisionBySlug(dSlug);
  const category = getCategoryBySlug(dSlug, cSlug);
  const subcategory = getSubcategoryBySlug(dSlug, cSlug, sSlug);
  const product = getProductBySlug(dSlug, cSlug, sSlug, pSlug);

  if (!division || !category || !subcategory || !product) notFound();

  const basePath = `/products/${division.slug}/${category.slug}/${subcategory.slug}`;
  const breadcrumb = [
    { label: "Products", href: "/products" },
    { label: division.name, href: `/products/${division.slug}` },
    {
      label: category.name,
      href: `/products/${division.slug}/${category.slug}`,
    },
    {
      label: subcategory.name,
      href: basePath,
    },
    {
      label: product.name,
      href: `${basePath}/${product.slug}`,
    },
  ];

  return (
    <>
      <PageHero
        title={product.name}
        subtitle={product.description}
        breadcrumb={breadcrumb}
      />

      {/* Specifications */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Overview"
            title="Specifications"
            subtitle="Detailed technical specifications for every configuration."
          />

          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <tbody>
                  {[
                    ["Category", category.name],
                    ["Subcategory", subcategory.name],
                    ["Division", division.name],
                    ["Available Models", String(product.models.length)],
                    ["Certification", "ISO 9001, CE, UL"],
                    ["Warranty", "Standard 24-month coverage"],
                  ].map(([label, value], i) => (
                    <tr
                      key={label}
                      className={i % 2 === 0 ? "bg-white/5" : "bg-black"}
                    >
                      <td className="px-6 py-4 font-medium text-white">
                        {label}
                      </td>
                      <td className="px-6 py-4 text-white/50">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* Models grid */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Configurations"
            title="Available Models"
            subtitle="Select a model to view detailed specifications and request a quote."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.models.map((model) => (
              <AnimatedSection key={model.slug}>
                <Card
                  href={`${basePath}/${product.slug}/${model.slug}`}
                  variant="dark"
                  className="h-full"
                >
                  <div className="p-6">
                    <p className="text-overline">
                      {model.sku}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-white">
                      {model.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/50">
                      {model.tagline}
                    </p>
                    <div className="mt-4">
                      <span className="link-cta link-cta-dark">
                        View details &rarr;
                      </span>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Need Help Choosing?</h2>
            <p className="mt-4 text-white/50">
              Our engineering team is ready to help you select the right
              configuration for your application.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
