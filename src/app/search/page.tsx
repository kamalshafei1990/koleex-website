import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across the Koleex International Group website.",
};

export default function SearchPage() {
  return (
    <>
      <PageHero title="Search Results" />

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search products, solutions, stories..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-base text-white outline-none transition-premium placeholder:text-white/35 focus:border-white/30 focus:ring-1 focus:ring-white/30"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-12">
              <p className="text-white/50">
                Enter a search term above to find products, solutions, stories,
                and more across the Koleex website.
              </p>
              <p className="mt-4 text-sm text-white/35">
                Search functionality will be available in a future update.
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/products" variant="secondary">
                Browse Products
              </Button>
              <Button href="/solutions" variant="secondary">
                View Solutions
              </Button>
              <Button href="/stories" variant="secondary">
                Read Stories
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
