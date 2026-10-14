import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { NoProducts, ProductCard } from "@/components/products/ProductCard";
import { hubProducts } from "@/lib/hub";
import { toCard } from "@/lib/product-list";
import { translate } from "@/i18n/words";
import type { Metadata } from "next";

/* ---------------------------------------------------------------------------
   Search — every product that matches the words, in the page's language
   (the Hub's own search: names, model codes and SKUs in every language,
   active and visible products only, never supplier data). Replaced a page
   that searched nothing (30/09/2026).
   --------------------------------------------------------------------------- */

interface Props { params: Promise<{ lang: string }>; searchParams: Promise<{ q?: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: translate("Search", lang), robots: { index: false } };
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const q = ((await searchParams).q ?? "").trim().slice(0, 80);
  const t = (s: string, vars?: Record<string, string | number>) => translate(s, lang, vars);
  const list = q.length >= 2 ? await hubProducts({ q, pageSize: 48 }) : null;
  const items = list ? list.items.map((p) => toCard(p, lang)) : [];
  return (
    <>
      <PageHero title={q ? t("Results for “{q}”", { q }) : t("Search")} size="sm" />
      <Section>
        <Container>
          <form action="" method="get" className="mx-auto mb-12 flex max-w-2xl gap-3">
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder={t("Search products by name or model")}
              aria-label={t("Search")}
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-base text-white outline-none placeholder:text-white/35 focus:border-white/30"
            />
            <button type="submit" className="rounded-full bg-white px-7 text-[14px] font-medium text-black hover:bg-white/90">{t("Search")}</button>
          </form>
          {list === null ? (
            <NoProducts text={t("Type at least two letters.")} />
          ) : items.length === 0 ? (
            <NoProducts text={t("No product matches “{q}”.", { q })} />
          ) : (
            <>
              <p className="mb-8 text-center text-sm text-white/40">{t("{n} products", { n: list.total })}</p>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => <ProductCard key={p.slug} product={p} lang={lang} />)}
              </div>
            </>
          )}
        </Container>
      </Section>
    </>
  );
}
