import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { hubProducts, hubProductsBySlugs } from "@/lib/hub";
import { toCard } from "@/lib/product-list";
import { cn } from "@/lib/utils";
import { paragraphsOf, textIn as textInContent, type I18nText, type PageButton, type PageDoc, type PageSection, type ProductsSection } from "@/types/page-doc";
import { contentLang, dirOf, localize } from "@/i18n/config";

/* Any of the site's languages: its own words where the page has them
   (English, Arabic, Chinese), else the English. */
type PageLang = string;
const textIn = (t: I18nText | null | undefined, lang: string) => textInContent(t, contentLang(lang));

/* ---------------------------------------------------------------------------
   PageDocView — a page built in the Hub's Page Builder, drawn with the
   site's own sections (brand-locked: the layout, type and colours are the
   site's; the page brings words, photos, links and choices). Words come in
   the visitor's language, else in English. Text is rendered as text, never
   HTML.
   --------------------------------------------------------------------------- */

function Cta({ button, lang, primary, light }: { button: PageButton | null; lang: PageLang; primary: boolean; light: boolean }) {
  const label = textIn(button?.label, lang);
  if (!button || !button.href || !label) return null;
  const cls = cn(
    "inline-flex h-[48px] items-center justify-center rounded-full px-8 text-[14px] font-medium transition-all",
    primary
      ? light ? "bg-black text-white hover:bg-black/85" : "bg-white text-black hover:bg-white/90"
      : light ? "border border-black/15 text-black/70 hover:border-black/30 hover:text-black" : "border border-white/15 text-white/70 hover:border-white/25 hover:text-white",
  );
  return button.href.startsWith("/")
    ? <Link href={localize(button.href, lang)} className={cls}>{label}</Link>
    : <a href={button.href} className={cls} rel="noopener noreferrer" target={button.href.startsWith("https://") ? "_blank" : undefined}>{label}</a>;
}

function Paragraphs({ text, light, className }: { text: string; light: boolean; className?: string }) {
  const ps = paragraphsOf(text);
  if (!ps.length) return null;
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {ps.map((p, i) => <p key={i} className={cn("text-body-large whitespace-pre-line leading-relaxed", light ? "!text-[#424245]" : "!text-white/65")}>{p}</p>)}
    </div>
  );
}

async function ProductsBlock({ s, lang }: { s: ProductsSection; lang: PageLang }) {
  const light = s.tone === "light";
  const list = s.source === "manual"
    ? await hubProductsBySlugs(s.slugs)
    : await hubProducts({ featured: s.source === "featured", category: s.source === "category" ? s.category ?? undefined : undefined, pageSize: s.limit });
  const items = list.items.slice(0, s.source === "manual" ? 12 : s.limit).map((x) => toCard(x, lang));
  if (!items.length) return null;
  return (
    <Section background={light ? "light" : "black"}>
      <Container>
        <SectionHeading title={textIn(s.title, lang) || undefined} subtitle={textIn(s.subtitle, lang) || undefined} light={light} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => <ProductCard key={p.slug} product={p} lang={lang} />)}
        </div>
      </Container>
    </Section>
  );
}

function SectionView({ s, lang }: { s: PageSection; lang: PageLang }) {
  const light = s.tone === "light";
  const bg = light ? "light" : "black";
  switch (s.type) {
    case "hero": {
      const img = s.image;
      return (
        <section className={cn("relative overflow-hidden", light ? "bg-[#f5f5f7]" : "bg-black")}>
          {img ? (
            <div className="absolute inset-0">
              <Image src={img.url} alt={textIn(img.alt, lang)} fill priority sizes="100vw" className="object-cover" />
              <div className={cn("absolute inset-0", light ? "bg-white/55" : "bg-black/55")} />
            </div>
          ) : null}
          <Container className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center py-28 text-center md:py-36">
            {textIn(s.eyebrow, lang) ? <p className={cn("text-overline mb-5", light ? "!text-[#6e6e73]" : "")}>{textIn(s.eyebrow, lang)}</p> : null}
            <h1 className={cn("text-display max-w-4xl text-balance", light ? "text-[#1d1d1f]" : "text-gradient-silver")}>{textIn(s.title, lang)}</h1>
            {textIn(s.subtitle, lang) ? <p className={cn("text-subtitle mt-6 max-w-2xl", light ? "!text-[#6e6e73]" : "")}>{textIn(s.subtitle, lang)}</p> : null}
            {(s.primary || s.secondary) ? (
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <Cta button={s.primary} lang={lang} primary light={light} />
                <Cta button={s.secondary} lang={lang} primary={false} light={light} />
              </div>
            ) : null}
          </Container>
        </section>
      );
    }
    case "text":
      return (
        <Section background={bg}>
          <Container>
            <div className="mx-auto max-w-3xl">
              {textIn(s.title, lang) ? <SectionHeading title={textIn(s.title, lang)} align="left" light={light} className="!mb-8" /> : null}
              <Paragraphs text={textIn(s.body, lang)} light={light} />
            </div>
          </Container>
        </Section>
      );
    case "imageText":
      return (
        <Section background={bg}>
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className={cn("relative aspect-[4/3] w-full overflow-hidden rounded-3xl", light ? "bg-black/[0.04]" : "bg-white/[0.03]", s.side === "right" && "lg:order-2")}>
                {s.image ? <Image src={s.image.url} alt={textIn(s.image.alt, lang)} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /> : null}
              </div>
              <div className="flex flex-col gap-6">
                {textIn(s.title, lang) ? <h2 className={cn("text-headline", light ? "text-[#1d1d1f]" : "text-gradient-silver")}>{textIn(s.title, lang)}</h2> : null}
                <Paragraphs text={textIn(s.body, lang)} light={light} />
                {s.button ? <div><Cta button={s.button} lang={lang} primary light={light} /></div> : null}
              </div>
            </div>
          </Container>
        </Section>
      );
    case "features":
      return (
        <Section background={bg}>
          <Container>
            <SectionHeading title={textIn(s.title, lang) || undefined} subtitle={textIn(s.subtitle, lang) || undefined} light={light} />
            <div className={cn("grid gap-6", s.items.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2")}>
              {s.items.map((it) => (
                <div key={it.id} className={cn("rounded-3xl p-8", light ? "border border-black/[0.06] bg-white" : "card-dark")}>
                  <h3 className={cn("text-title-sm", light ? "text-[#1d1d1f]" : "text-white")}>{textIn(it.title, lang)}</h3>
                  {textIn(it.body, lang) ? <p className={cn("mt-3 text-[15px] leading-relaxed", light ? "text-[#6e6e73]" : "text-white/55")}>{textIn(it.body, lang)}</p> : null}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      );
    case "numbers":
      return (
        <Section background={bg}>
          <Container>
            {textIn(s.title, lang) ? <SectionHeading title={textIn(s.title, lang)} light={light} /> : null}
            <dl className={cn("grid gap-10 text-center", s.items.length >= 4 ? "grid-cols-2 lg:grid-cols-4" : s.items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
              {s.items.map((it) => (
                <div key={it.id} className="flex flex-col gap-2">
                  <dt className={cn("order-2 text-[15px]", light ? "text-[#6e6e73]" : "text-white/55")}>{textIn(it.label, lang)}</dt>
                  <dd className={cn("order-1 text-display-sm tabular-nums", light ? "text-[#1d1d1f]" : "text-gradient-silver")}>{it.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>
      );
    case "gallery":
      if (!s.images.length) return null;
      return (
        <Section background={bg}>
          <Container>
            {textIn(s.title, lang) ? <SectionHeading title={textIn(s.title, lang)} light={light} /> : null}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {s.images.map((img, i) => (
                <div key={`${img.url}-${i}`} className={cn("relative aspect-square overflow-hidden rounded-2xl", light ? "bg-black/[0.04]" : "bg-white/[0.03]")}>
                  <Image src={img.url} alt={textIn(img.alt, lang)} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      );
    case "faq":
      return (
        <Section background={bg}>
          <Container>
            <div className="mx-auto max-w-3xl">
              {textIn(s.title, lang) ? <SectionHeading title={textIn(s.title, lang)} light={light} /> : null}
              <div className={cn("divide-y", light ? "divide-black/10" : "divide-white/10")}>
                {s.items.map((it) => (
                  <details key={it.id} className="group py-5">
                    <summary className={cn("flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium", light ? "text-[#1d1d1f]" : "text-white")}>
                      {textIn(it.q, lang)}
                      <span aria-hidden className="shrink-0 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <Paragraphs text={textIn(it.a, lang)} light={light} className="mt-4" />
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      );
    case "cta":
      return (
        <Section background={bg}>
          <Container>
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
              <h2 className={cn("text-headline", light ? "text-[#1d1d1f]" : "text-white")}>{textIn(s.title, lang)}</h2>
              {textIn(s.body, lang) ? <p className={cn("text-subtitle mt-4", light ? "!text-[#6e6e73]" : "!text-white/50")}>{textIn(s.body, lang)}</p> : null}
              <div className="mt-8"><Cta button={s.button} lang={lang} primary light={light} /></div>
            </div>
          </Container>
        </Section>
      );
    default:
      return null;
  }
}

export function PageDocView({ doc, lang = "en" }: { doc: PageDoc; lang?: PageLang }) {
  const sections = doc.sections.filter((s) => !s.hidden);
  return (
    <div dir={dirOf(lang)} lang={lang}>
      {sections.map((s) => (s.type === "products" ? <ProductsBlock key={s.id} s={s} lang={lang} /> : <SectionView key={s.id} s={s} lang={lang} />))}
    </div>
  );
}
