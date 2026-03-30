import { notFound } from "next/navigation";
import {
  divisions,
  getDivisionBySlug,
  getCategoryBySlug,
  getSubcategoryBySlug,
  getProductBySlug,
  getModelBySlug,
} from "@/data/products";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

interface Props {
  params: Promise<{
    division: string;
    category: string;
    subcategory: string;
    product: string;
    model: string;
  }>;
}

export async function generateStaticParams() {
  const paths: {
    division: string;
    category: string;
    subcategory: string;
    product: string;
    model: string;
  }[] = [];
  for (const division of divisions) {
    for (const category of division.categories) {
      for (const sub of category.subcategories) {
        for (const product of sub.products) {
          for (const model of product.models) {
            paths.push({
              division: division.slug,
              category: category.slug,
              subcategory: sub.slug,
              product: product.slug,
              model: model.slug,
            });
          }
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
    model: mSlug,
  } = await params;
  const model = getModelBySlug(dSlug, cSlug, sSlug, pSlug, mSlug);
  if (!model) return {};
  return {
    title: model.name,
    description: model.tagline,
  };
}

export default async function ModelPage({ params }: Props) {
  const {
    division: dSlug,
    category: cSlug,
    subcategory: sSlug,
    product: pSlug,
    model: mSlug,
  } = await params;
  const division = getDivisionBySlug(dSlug);
  const category = getCategoryBySlug(dSlug, cSlug);
  const subcategory = getSubcategoryBySlug(dSlug, cSlug, sSlug);
  const product = getProductBySlug(dSlug, cSlug, sSlug, pSlug);
  const model = getModelBySlug(dSlug, cSlug, sSlug, pSlug, mSlug);

  if (!division || !category || !subcategory || !product || !model) notFound();

  const basePath = `/products/${division.slug}/${category.slug}/${subcategory.slug}`;
  const productPath = `${basePath}/${product.slug}`;

  const breadcrumb = [
    { label: "Products", href: "/products" },
    { label: division.name, href: `/products/${division.slug}` },
    {
      label: category.name,
      href: `/products/${division.slug}/${category.slug}`,
    },
    { label: subcategory.name, href: basePath },
    { label: product.name, href: productPath },
    { label: model.name, href: `${productPath}/${model.slug}` },
  ];

  const relatedModels = product.models.filter((m) => m.slug !== model.slug);

  return (
    <>
      <PageHero
        title={model.name}
        subtitle={model.tagline}
        breadcrumb={breadcrumb}
      />

      {/* Model details */}
      <Section>
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Badge variant="accent">{model.sku}</Badge>
              <Badge>{product.name}</Badge>
              <Badge>{division.name}</Badge>
            </div>

            <h2 className="text-headline mb-4">Technical Specifications</h2>
            <p className="text-subtitle mb-10">
              Complete specifications for the {model.name}. Contact our
              engineering team for application-specific configuration details.
            </p>

            <div className="overflow-hidden rounded-2xl border border-border-light">
              <table className="w-full text-left text-sm">
                <tbody>
                  {[
                    ["Model", model.name],
                    ["SKU", model.sku],
                    ["Configuration", model.tagline],
                    ["Product Family", product.name],
                    ["Category", category.name],
                    ["Division", division.name],
                    ["Operating Temperature", "-20 C to +55 C"],
                    ["Protection Rating", "IP65"],
                    ["Compliance", "CE, UL, IEC 61010"],
                    ["Warranty", "Standard 24-month coverage"],
                    ["Lead Time", "6-8 weeks (standard)"],
                    ["Support", "24/7 global technical support"],
                  ].map(([label, value], i) => (
                    <tr
                      key={label}
                      className={
                        i % 2 === 0 ? "bg-surface-secondary" : "bg-white"
                      }
                    >
                      <td className="px-6 py-4 font-medium text-text-primary w-1/3">
                        {label}
                      </td>
                      <td className="px-6 py-4 text-text-secondary">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" size="lg">
                Request Quote
              </Button>
              <Button href={productPath} variant="secondary" size="lg">
                View All Models
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related models */}
      {relatedModels.length > 0 && (
        <Section background="light">
          <Container>
            <SectionHeading
              eyebrow="Also Available"
              title="Related Models"
              subtitle={`Other configurations in the ${product.name} family.`}
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedModels.map((related) => (
                <AnimatedSection key={related.slug}>
                  <Card
                    href={`${productPath}/${related.slug}`}
                    className="h-full"
                  >
                    <div className="p-6">
                      <p className="text-xs font-mono text-text-tertiary">
                        {related.sku}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-text-primary">
                        {related.name}
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        {related.tagline}
                      </p>
                      <div className="mt-4">
                        <span className="text-sm font-medium text-accent">
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
      )}
    </>
  );
}
