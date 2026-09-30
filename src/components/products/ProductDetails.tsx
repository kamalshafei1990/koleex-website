import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contentLang } from "@/i18n/config";
import { translate } from "@/i18n/words";
import type { HubProduct } from "@/types/hub";

/* ---------------------------------------------------------------------------
   ProductDetails — what the Hub knows about a product beyond its hero: the
   spec sheet (the schema's groups, the website-visible fields that are
   filled — an empty field or group never shows), the knowledge texts marked
   for the website (in the page's language when translated), videos and
   manuals. On 30/09/2026 most products had little of this yet: the page
   grows by itself as the Hub's product data is filled.
   --------------------------------------------------------------------------- */

const filled = (v: unknown) => v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0);

function formatValue(v: unknown, field: { options?: Array<{ value: string; label: string }>; unit?: string }, lang: string): string {
  const opt = (x: unknown) => field.options?.find((o) => o.value === String(x))?.label ?? String(x);
  let out: string;
  if (typeof v === "boolean") out = translate(v ? "Yes" : "No", lang);
  else if (Array.isArray(v)) out = v.map(opt).join(", ");
  else if (typeof v === "object") out = "";
  else out = opt(v);
  return out && field.unit && !Array.isArray(v) && typeof v !== "boolean" ? `${out} ${field.unit}` : out;
}

function youtubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    const id = u.hostname.includes("youtu.be") ? u.pathname.slice(1) : u.hostname.includes("youtube.com") ? u.searchParams.get("v") : null;
    return id && /^[\w-]{6,20}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

export function ProductDetails({ product, lang }: { product: HubProduct; lang: string }) {
  const t = (s: string) => translate(s, lang);
  const c = contentLang(lang);
  const { schema, values = {}, knowledge = [], videoUrls = [], manuals = [] } = product.preview;

  const groups = (schema?.groups ?? [])
    .filter((g) => g.visibility?.internalOnly !== true && g.visibility?.websiteVisible !== false)
    .sort((a, b) => a.order - b.order)
    .map((g) => ({
      title: g.title,
      rows: g.fields
        .filter((f) => !f.internalOnly && f.websiteVisible !== false && filled(values[f.key]))
        .sort((a, b) => a.order - b.order)
        .map((f) => ({ label: f.label, value: formatValue(values[f.key], f, lang) }))
        .filter((r) => r.value),
    }))
    .filter((g) => g.rows.length > 0);

  const blocks = knowledge.filter((k) => k.visibility?.internalOnly !== true && k.visibility?.websiteVisible !== false && k.type !== "ai_summary");
  const videos = videoUrls.filter(Boolean).slice(0, 4);
  const docs = manuals.filter((m) => m.url).slice(0, 12);

  if (!groups.length && !blocks.length && !videos.length && !docs.length) return null;

  return (
    <>
      {blocks.length > 0 && (
        <Section>
          <Container>
            <div className="mx-auto flex max-w-3xl flex-col gap-10">
              {blocks.map((k) => {
                const title = (c !== "en" && k.title_i18n?.[c]) || k.title;
                const raw = (c !== "en" && k.content_i18n?.[c]) || k.content;
                return (
                  <div key={k.id} className="flex flex-col gap-4">
                    <h2 className="text-title text-white">{title}</h2>
                    {Array.isArray(raw) ? (
                      <ul className="flex flex-col gap-2">{raw.map((x, i) => <li key={i} className="flex gap-3 text-white/70"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />{String(x)}</li>)}</ul>
                    ) : typeof raw === "string" ? (
                      raw.split(/\n{2,}/).filter(Boolean).map((p, i) => <p key={i} className="text-body-large whitespace-pre-line leading-relaxed !text-white/70">{p}</p>)
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {groups.length > 0 && (
        <Section>
          <Container>
            <SectionHeading title={t("Specifications")} />
            <div className="mx-auto flex max-w-3xl flex-col gap-10">
              {groups.map((g) => (
                <div key={g.title}>
                  <h3 className="text-overline mb-3">{g.title}</h3>
                  <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                    {g.rows.map((r) => (
                      <div key={r.label} className="grid grid-cols-2 gap-6 py-3">
                        <dt className="text-sm text-white/50">{r.label}</dt>
                        <dd className="text-sm text-white" dir="auto">{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {videos.length > 0 && (
        <Section>
          <Container>
            <SectionHeading title={t("Videos")} />
            <div className="grid gap-6 md:grid-cols-2">
              {videos.map((u) => {
                const yt = youtubeEmbed(u);
                return (
                  <div key={u} className="relative aspect-video overflow-hidden rounded-2xl bg-white/[0.03]">
                    {yt ? (
                      <iframe src={yt} title={product.productName} className="absolute inset-0 h-full w-full" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
                    ) : (
                      <video src={u} controls preload="metadata" className="absolute inset-0 h-full w-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {docs.length > 0 && (
        <Section>
          <Container>
            <SectionHeading title={t("Manuals")} />
            <ul className="mx-auto flex max-w-3xl flex-col gap-2">
              {docs.map((m) => (
                <li key={m.url}>
                  <a href={m.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-white/10 px-5 py-4 text-white/80 hover:border-white/25 hover:text-white">
                    <span>{m.label || t("Manual")}</span>
                    <span className="text-sm text-white/40">{t("Download")}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  );
}
