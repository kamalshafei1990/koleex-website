import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { NoProducts } from "@/components/products/ProductCard";
import { hubCatalogs } from "@/lib/hub";
import { contentLang } from "@/i18n/config";
import { translate } from "@/i18n/words";
import type { Metadata } from "next";

/* ---------------------------------------------------------------------------
   Catalogs — Koleex's own catalogs to download, added in the Hub's Website
   app (never a supplier's: those live elsewhere and never reach the
   bridge). Title and description in the page's language, else English.
   --------------------------------------------------------------------------- */

export const revalidate = 3600;

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: translate("Catalogs", lang), description: translate("Koleex catalogs to download.", lang) };
}

export default async function CatalogsPage({ params }: Props) {
  const { lang } = await params;
  const t = (s: string) => translate(s, lang);
  const c = contentLang(lang);
  const catalogs = await hubCatalogs();
  return (
    <>
      <PageHero title={t("Catalogs")} subtitle={t("Koleex catalogs to download.")} />
      <Section>
        <Container>
          {catalogs.length === 0 ? (
            <NoProducts text={t("Our catalogs will appear here shortly.")} />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {catalogs.map((cat) => {
                const title = cat.title[c] || cat.title.en;
                const description = cat.description[c] || cat.description.en;
                return (
                  <div key={cat.id} className="card-dark flex flex-col overflow-hidden">
                    <div className="relative aspect-[3/4] w-full bg-white/[0.03]">
                      {cat.coverUrl ? <Image src={cat.coverUrl} alt={title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /> : null}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <h2 className="text-lg font-semibold text-white">{title}</h2>
                      {description ? <p className="text-sm leading-relaxed text-white/50">{description}</p> : null}
                      <p className="mt-auto pt-3 text-xs text-white/35" dir="ltr">{[cat.year, cat.fileSize ? `${(cat.fileSize / 1048576).toFixed(1)} MB` : null].filter(Boolean).join(" · ")}</p>
                      <a href={cat.fileUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-[13px] font-medium text-black hover:bg-white/90">
                        {t("Download PDF")}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
