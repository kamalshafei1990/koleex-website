import Image from "next/image";
import { notFound } from "next/navigation";
import { hubProduct, hubProducts } from "@/lib/hub";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";
import { contentLang, localize, nameIn } from "@/i18n/config";
import { translate } from "@/i18n/words";
import type { HubProduct } from "@/types/hub";

/* ---------------------------------------------------------------------------
   A product's page, as the Koleex Hub builds it for the public: its words,
   photos, models and facts — never a price, a supplier or a factory code
   (the Hub scrubs them before they leave). One address per product
   (/product/<slug>), whatever its division, so a move in the taxonomy never
   breaks a link; the breadcrumb follows where it sits today.
   --------------------------------------------------------------------------- */

export const revalidate = 3600;

interface Props { params: Promise<{ lang: string; slug: string }> }

/* The product's words in a language: the Hub's translation when it has one
   (Arabic, Chinese), else the English. */
function wordsIn(product: HubProduct, lang: string) {
  const c = contentLang(lang);
  const tr = c === "en" ? undefined : product.preview.translations?.find((x) => x.locale === c);
  return {
    name: tr?.product_name?.trim() || product.productName,
    tagline: tr?.tagline?.trim() || product.tagline,
    excerpt: tr?.excerpt?.trim() || product.sections.excerpt,
    description: tr?.description?.trim() || product.sections.description,
  };
}
const taxName = (x: { name: string; name_zh: string | null; name_ar: string | null }, lang: string) => nameIn({ name: x.name, zh: x.name_zh, ar: x.name_ar }, lang);

/* The first page of products is built ahead; the rest on their first visit. */
export async function generateStaticParams() {
  const list = await hubProducts({ pageSize: 100 });
  return list.items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const product = await hubProduct(p.slug);
  if (!product) return {};
  const w = wordsIn(product, p.lang);
  const title = (p.lang === "en" ? product.seo.metaTitle : null) ?? w.name;
  const description = (p.lang === "en" ? product.seo.metaDescription ?? product.seo.excerpt : null) ?? w.excerpt ?? w.tagline ?? undefined;
  return {
    title,
    description,
    openGraph: { title, description, images: product.seo.ogImageUrl ? [product.seo.ogImageUrl] : undefined },
  };
}

const paragraphs = (text: string | null) => (text ?? "").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

/* The Hub keeps the country of origin as a code ("CN"); the page says its
   name, in the page's language. */
function countryName(value: string, lang: string): string {
  if (!/^[A-Za-z]{2}$/.test(value)) return value;
  try {
    return new Intl.DisplayNames([lang], { type: "region" }).of(value.toUpperCase()) ?? value;
  } catch {
    return value;
  }
}

export default async function ProductPage({ params }: Props) {
  const p = await params;
  const { lang } = p;
  const t = (s: string, vars?: Record<string, string | number>) => translate(s, lang, vars);
  const L = (href: string) => localize(href, lang);
  const product = await hubProduct(p.slug);
  if (!product) notFound();
  const { classification: cls, highlights, compliance, warrantyMonths, models } = product.sections;
  const w = wordsIn(product, lang);
  const excerpt = w.excerpt;
  const description = w.description;
  const breadcrumb = [{ label: t("Products"), href: L("/products") }];
  if (cls.division) breadcrumb.push({ label: taxName(cls.division, lang), href: L(`/products/${cls.division.slug}`) });
  if (cls.division && cls.category) breadcrumb.push({ label: taxName(cls.category, lang), href: L(`/products/${cls.division.slug}/${cls.category.slug}`) });
  if (cls.division && cls.category && cls.subcategory) {
    breadcrumb.push({ label: taxName(cls.subcategory, lang), href: L(`/products/${cls.division.slug}/${cls.category.slug}/${cls.subcategory.slug}`) });
  }
  const photos = [product.preview.mainImageUrl, ...product.preview.galleryUrls].filter((u): u is string => !!u);
  const uniquePhotos = [...new Set(photos)].slice(0, 7);
  const facts = [
    warrantyMonths ? { label: t("Warranty"), value: t("{n} months", { n: warrantyMonths }) } : compliance.warranty ? { label: t("Warranty"), value: compliance.warranty } : null,
    compliance.countryOfOrigin ? { label: t("Made in"), value: countryName(compliance.countryOfOrigin, lang) } : null,
    compliance.ce ? { label: "CE", value: t("Certified") } : null,
    compliance.rohs ? { label: "RoHS", value: t("Compliant") } : null,
    compliance.ipRating ? { label: t("Protection"), value: compliance.ipRating } : null,
  ].filter((f): f is { label: string; value: string } => !!f);

  return (
    <>
      <PageHero title={w.name} subtitle={w.tagline ?? undefined} breadcrumb={breadcrumb} size="sm" />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-white/[0.03]">
                {uniquePhotos[0] ? (
                  <Image src={uniquePhotos[0]} alt={w.name} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-10" />
                ) : null}
              </div>
              {uniquePhotos.length > 1 && (
                <div className="grid grid-cols-6 gap-3">
                  {uniquePhotos.slice(1).map((u) => (
                    <div key={u} className="relative aspect-square overflow-hidden rounded-xl bg-white/[0.03]">
                      <Image src={u} alt="" fill sizes="120px" className="object-contain p-2" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-6">
              {excerpt ? <p className="text-body-large leading-relaxed !text-white/70">{excerpt}</p> : null}
              {highlights.length > 0 && (
                <ul className="flex flex-col gap-3">
                  {highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-white/80"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />{h}</li>
                  ))}
                </ul>
              )}
              {facts.length > 0 && (
                <dl className="grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-6">
                  {facts.map((f) => (
                    <div key={f.label}>
                      <dt className="text-xs uppercase tracking-wider text-white/40">{f.label}</dt>
                      <dd className="mt-1 text-white/90">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="flex flex-wrap gap-4 pt-2">
                <Button href={L(`/contact?product=${encodeURIComponent(product.slug)}`)} variant="primary" size="lg">{t("Request a quotation")}</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {paragraphs(description).length > 0 && (
        <Section>
          <Container>
            <div className="mx-auto max-w-3xl flex flex-col gap-5">
              {paragraphs(description).map((p, i) => <p key={i} className="text-body-large leading-relaxed !text-white/70">{p}</p>)}
            </div>
          </Container>
        </Section>
      )}

      {models.length > 1 && (
        <Section>
          <Container>
            <SectionHeading eyebrow={w.name} title={t("Models")} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {models.map((m) => (
                <div key={m.id} className="card-dark overflow-hidden">
                  <div className="relative aspect-[4/3] w-full bg-white/[0.03]">
                    {m.photo ? <Image src={m.photo} alt={m.code} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-contain p-6" /> : null}
                  </div>
                  <div className="p-6">
                    <p className="text-overline">{m.code}</p>
                    {(m.nameI18n?.[contentLang(lang)] || m.name) ? <h3 className="mt-2 text-lg font-semibold text-white">{m.nameI18n?.[contentLang(lang)] || m.name}</h3> : null}
                    {(m.taglineI18n?.[contentLang(lang)] || m.tagline) ? <p className="mt-1 text-sm text-white/50">{m.taglineI18n?.[contentLang(lang)] || m.tagline}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
