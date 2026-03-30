import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getAllProducts } from "@/data/products";

const featured = getAllProducts().slice(0, 3);

export function FeaturedProducts() {
  return (
    <Section background="white">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="FEATURED"
            title="Engineered for Excellence"
          />
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <AnimatedSection key={product.slug}>
              <Card
                title={product.name}
                description={product.description}
                href={`/products/${product.divisionSlug}/${product.categorySlug}/${product.subcategorySlug}/${product.slug}`}
              >
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-accent">
                  {product.categorySlug.replace(/-/g, " ")}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-accent">
                  Learn More &rarr;
                </span>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
