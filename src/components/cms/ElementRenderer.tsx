"use client";

import Link from "next/link";
import type { ElementRow } from "@/types/supabase";
import { CmsImage } from "./CmsImage";

/* ---------------------------------------------------------------------------
   ElementRenderer — 20+ premium UI component renderers.
   --------------------------------------------------------------------------- */

/* ── Basic Elements ── */

function HeadingElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { text?: string; level?: string };
  const s = (el.style || {}) as { size?: string; align?: string };
  const level = c.level || "h2";
  const Tag = level as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const sizeMap: Record<string, string> = {
    xl: "text-[48px] md:text-[72px] font-bold tracking-[-0.04em]",
    lg: "text-[36px] md:text-[56px] font-bold tracking-[-0.035em]",
    md: "text-[28px] md:text-[44px] font-semibold tracking-[-0.03em]",
    sm: "text-[22px] md:text-[32px] font-semibold tracking-[-0.025em]",
  };
  return <Tag className={`${sizeMap[s.size || "lg"]} leading-[1.06] ${s.align ? `text-${s.align}` : ""}`}>{c.text || "Heading"}</Tag>;
}

function ParagraphElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { text?: string };
  const s = (el.style || {}) as { size?: string };
  const sizeMap: Record<string, string> = { lg: "text-[18px] md:text-[21px] leading-[1.6]", md: "text-[16px] leading-[1.65]", sm: "text-[14px] leading-[1.55]" };
  return <p className={`${sizeMap[s.size || "md"]} text-[#86868b]`}>{c.text || "Add your text here."}</p>;
}

function ImageElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { src?: string; alt?: string };
  const s = (el.style || {}) as { rounded?: string };
  if (!c.src) return <div className="h-[200px] bg-[#f5f5f7] rounded-xl flex items-center justify-center text-[#86868b] text-[13px]">No image</div>;
  return <CmsImage src={c.src} alt={c.alt || ""} className={`w-full h-auto ${s.rounded || "rounded-xl"}`} />;
}

function ButtonElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { text?: string; link?: string; style?: string; shape?: string; size?: string; newTab?: boolean };
  const shapeMap: Record<string, string> = { pill: "rounded-full", rounded: "rounded-xl", square: "rounded-none" };
  const sizeMap: Record<string, string> = { small: "h-9 px-4 text-[13px]", medium: "h-11 px-6 text-[15px]", large: "h-[52px] px-8 text-[17px]" };
  const styleMap: Record<string, string> = { solid: "bg-[#1d1d1f] text-white hover:bg-black", outline: "border border-[#1d1d1f] text-[#1d1d1f] hover:bg-[#1d1d1f]/5", ghost: "text-[#1d1d1f]/70 hover:text-[#1d1d1f]" };
  return (
    <Link href={c.link || "#"} target={c.newTab ? "_blank" : undefined}
      className={`inline-flex items-center justify-center font-medium transition-all duration-300 ${sizeMap[c.size || "medium"]} ${shapeMap[c.shape || "pill"]} ${styleMap[c.style || "solid"]}`}>
      {c.text || "Button"}
    </Link>
  );
}

function DividerElement() { return <hr className="border-t border-[#e8e8ed] my-4" />; }
function SpacerElement({ el }: { el: ElementRow }) { const c = (el.content || {}) as { height?: string }; return <div style={{ height: c.height || "48px" }} />; }

function VideoElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { src?: string };
  if (!c.src) return <div className="aspect-video bg-[#f5f5f7] rounded-xl flex items-center justify-center text-[#86868b] text-[13px]">No video</div>;
  const isEmbed = /youtube|vimeo|embed/i.test(c.src);
  return (
    <div className="aspect-video rounded-xl overflow-hidden bg-black">
      {isEmbed ? <iframe src={c.src} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen /> : <video src={c.src} controls playsInline className="w-full h-full object-contain" />}
    </div>
  );
}

function ListElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { items?: string[]; style?: string };
  return (
    <ul className={`space-y-2 ${c.style === "number" ? "list-decimal" : "list-disc"} pl-5`}>
      {(c.items || []).map((item, i) => <li key={i} className="text-[15px] text-[#86868b] leading-[1.6]">{item}</li>)}
    </ul>
  );
}

function CardElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { title?: string; description?: string; icon?: string; image?: string; link?: string };
  const inner = (
    <div className="bg-[#f5f5f7] rounded-[18px] p-6 hover:-translate-y-1 transition-transform duration-500 border border-transparent hover:border-[#e8e8ed] hover:shadow-lg">
      {c.image && <CmsImage src={c.image} alt={c.title || ""} className="w-full h-[160px] object-cover rounded-xl mb-4" />}
      {c.icon && <span className="text-[28px] block mb-3">{c.icon}</span>}
      {c.title && <h4 className="text-[16px] font-semibold text-[#1d1d1f]">{c.title}</h4>}
      {c.description && <p className="text-[13px] text-[#86868b] mt-2 leading-[1.55]">{c.description}</p>}
    </div>
  );
  return c.link ? <Link href={c.link}>{inner}</Link> : inner;
}

/* ── Premium UI Components ── */

function BadgeElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { text?: string; variant?: string };
  const variants: Record<string, string> = {
    default: "bg-[#f5f5f7] text-[#1d1d1f]",
    primary: "bg-[#1d1d1f] text-white",
    success: "bg-green-50 text-green-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-700",
    info: "bg-blue-50 text-blue-700",
  };
  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium ${variants[c.variant || "default"]}`}>{c.text || "Badge"}</span>;
}

function AvatarElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { src?: string; name?: string; role?: string; size?: string };
  const sizeMap: Record<string, string> = { sm: "h-10 w-10", md: "h-14 w-14", lg: "h-20 w-20" };
  return (
    <div className="flex items-center gap-3">
      {c.src ? (
        <img src={c.src} alt={c.name || ""} className={`${sizeMap[c.size || "md"]} rounded-full object-cover`} />
      ) : (
        <div className={`${sizeMap[c.size || "md"]} rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#86868b] font-semibold text-[18px]`}>
          {(c.name || "?")[0]}
        </div>
      )}
      <div>
        {c.name && <p className="text-[15px] font-semibold text-[#1d1d1f]">{c.name}</p>}
        {c.role && <p className="text-[13px] text-[#86868b]">{c.role}</p>}
      </div>
    </div>
  );
}

function StatElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { value?: string; label?: string; prefix?: string; suffix?: string };
  return (
    <div className="text-center">
      <p className="text-[44px] md:text-[56px] font-bold tracking-[-0.04em] text-[#1d1d1f] leading-none">
        {c.prefix}{c.value || "0"}{c.suffix}
      </p>
      {c.label && <p className="text-[13px] text-[#86868b] mt-2">{c.label}</p>}
    </div>
  );
}

function TestimonialElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { quote?: string; name?: string; role?: string; avatar?: string; rating?: number };
  return (
    <div className="bg-[#f5f5f7] rounded-[20px] p-8">
      {c.rating && (
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: c.rating }).map((_, i) => <span key={i} className="text-amber-400 text-[16px]">★</span>)}
        </div>
      )}
      {c.quote && <p className="text-[17px] leading-[1.6] text-[#1d1d1f] italic">&ldquo;{c.quote}&rdquo;</p>}
      <div className="flex items-center gap-3 mt-6">
        {c.avatar ? <img src={c.avatar} alt="" className="h-10 w-10 rounded-full object-cover" /> : <div className="h-10 w-10 rounded-full bg-[#e8e8ed]" />}
        <div>
          {c.name && <p className="text-[14px] font-semibold text-[#1d1d1f]">{c.name}</p>}
          {c.role && <p className="text-[12px] text-[#86868b]">{c.role}</p>}
        </div>
      </div>
    </div>
  );
}

function FeatureElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { icon?: string; title?: string; description?: string };
  return (
    <div className="flex gap-4">
      {c.icon && <div className="h-12 w-12 shrink-0 rounded-2xl bg-[#f5f5f7] flex items-center justify-center text-[24px]">{c.icon}</div>}
      <div>
        {c.title && <h4 className="text-[16px] font-semibold text-[#1d1d1f]">{c.title}</h4>}
        {c.description && <p className="text-[14px] text-[#86868b] mt-1 leading-[1.55]">{c.description}</p>}
      </div>
    </div>
  );
}

function PricingElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { name?: string; price?: string; period?: string; features?: string[]; cta?: string; highlighted?: boolean };
  return (
    <div className={`rounded-[20px] p-8 ${c.highlighted ? "bg-[#1d1d1f] text-white" : "bg-[#f5f5f7] text-[#1d1d1f]"} border ${c.highlighted ? "border-[#1d1d1f]" : "border-transparent"}`}>
      {c.name && <p className={`text-[14px] font-semibold ${c.highlighted ? "text-white/60" : "text-[#86868b]"}`}>{c.name}</p>}
      <div className="flex items-baseline gap-1 mt-2">
        {c.price && <span className="text-[40px] font-bold tracking-tight">{c.price}</span>}
        {c.period && <span className={`text-[14px] ${c.highlighted ? "text-white/40" : "text-[#86868b]"}`}>/{c.period}</span>}
      </div>
      {c.features && (
        <ul className="mt-6 space-y-3">
          {c.features.map((f, i) => <li key={i} className={`text-[14px] flex items-center gap-2 ${c.highlighted ? "text-white/70" : "text-[#6e6e73]"}`}><span className="text-green-500">✓</span>{f}</li>)}
        </ul>
      )}
      {c.cta && <button className={`w-full h-11 mt-6 rounded-full text-[14px] font-semibold transition-colors ${c.highlighted ? "bg-white text-black hover:bg-white/90" : "bg-[#1d1d1f] text-white hover:bg-black"}`}>{c.cta}</button>}
    </div>
  );
}

function FaqElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { question?: string; answer?: string };
  return (
    <details className="group border-b border-[#e8e8ed] py-5">
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <span className="text-[16px] font-semibold text-[#1d1d1f]">{c.question || "Question?"}</span>
        <span className="text-[#86868b] group-open:rotate-45 transition-transform duration-300 text-[20px]">+</span>
      </summary>
      <p className="text-[15px] text-[#86868b] mt-3 leading-[1.65]">{c.answer || "Answer goes here."}</p>
    </details>
  );
}

function SocialElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { links?: { platform: string; url: string }[] };
  const icons: Record<string, string> = { linkedin: "in", twitter: "𝕏", facebook: "f", instagram: "📷", youtube: "▶", tiktok: "♪" };
  return (
    <div className="flex gap-3">
      {(c.links || []).map((link, i) => (
        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#6e6e73] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300 text-[14px] font-bold">
          {icons[link.platform] || link.platform[0]}
        </a>
      ))}
    </div>
  );
}

function LogoElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { src?: string; name?: string; width?: string };
  if (c.src) return <img src={c.src} alt={c.name || ""} className="h-8 opacity-50 hover:opacity-100 transition-opacity" style={{ maxWidth: c.width || "120px" }} />;
  return <div className="h-8 px-4 bg-[#f5f5f7] rounded-lg flex items-center text-[12px] font-semibold text-[#86868b]">{c.name || "Logo"}</div>;
}

function ProgressElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { label?: string; value?: number; max?: number; color?: string };
  const pct = Math.min(100, ((c.value || 0) / (c.max || 100)) * 100);
  return (
    <div>
      <div className="flex justify-between mb-2">
        {c.label && <span className="text-[13px] font-medium text-[#1d1d1f]">{c.label}</span>}
        <span className="text-[13px] text-[#86868b]">{Math.round(pct)}%</span>
      </div>
      <div className="h-2 bg-[#f5f5f7] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${c.color || "bg-[#1d1d1f]"} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function TagListElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { tags?: string[] };
  return (
    <div className="flex flex-wrap gap-2">
      {(c.tags || []).map((tag, i) => (
        <span key={i} className="px-3 py-1.5 rounded-full bg-[#f5f5f7] text-[12px] font-medium text-[#6e6e73] hover:bg-[#e8e8ed] transition-colors">{tag}</span>
      ))}
    </div>
  );
}

function CtaBannerElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { title?: string; description?: string; buttonText?: string; buttonLink?: string; dark?: boolean };
  const dark = c.dark;
  return (
    <div className={`rounded-[20px] p-8 md:p-12 ${dark ? "bg-[#1d1d1f]" : "bg-[#f5f5f7]"} flex flex-col md:flex-row items-center justify-between gap-6`}>
      <div>
        {c.title && <h3 className={`text-[24px] font-bold ${dark ? "text-white" : "text-[#1d1d1f]"}`}>{c.title}</h3>}
        {c.description && <p className={`text-[15px] mt-2 ${dark ? "text-white/50" : "text-[#86868b]"}`}>{c.description}</p>}
      </div>
      {c.buttonText && (
        <Link href={c.buttonLink || "#"} className={`shrink-0 h-11 px-6 rounded-full text-[14px] font-semibold flex items-center transition-colors ${dark ? "bg-white text-black hover:bg-white/90" : "bg-[#1d1d1f] text-white hover:bg-black"}`}>
          {c.buttonText}
        </Link>
      )}
    </div>
  );
}

function IconBoxElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { icon?: string; title?: string; description?: string };
  return (
    <div className="text-center p-6">
      {c.icon && <div className="h-16 w-16 mx-auto rounded-2xl bg-[#f5f5f7] flex items-center justify-center text-[32px] mb-4">{c.icon}</div>}
      {c.title && <h4 className="text-[16px] font-semibold text-[#1d1d1f]">{c.title}</h4>}
      {c.description && <p className="text-[13px] text-[#86868b] mt-2 leading-[1.55]">{c.description}</p>}
    </div>
  );
}

function GalleryElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { images?: { src: string; alt?: string }[]; columns?: number };
  return (
    <div className={`grid gap-2 grid-cols-${c.columns || 3}`}>
      {(c.images || []).map((img, i) => (
        <div key={i} className="aspect-square rounded-xl overflow-hidden group">
          <img src={img.src} alt={img.alt || ""} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
        </div>
      ))}
    </div>
  );
}

function AccordionElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { items?: { title: string; content: string }[] };
  return (
    <div className="divide-y divide-[#e8e8ed] rounded-xl border border-[#e8e8ed] overflow-hidden">
      {(c.items || []).map((item, i) => (
        <details key={i} className="group">
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none bg-white hover:bg-[#f5f5f7] transition-colors">
            <span className="text-[15px] font-semibold text-[#1d1d1f]">{item.title}</span>
            <span className="text-[#86868b] group-open:rotate-45 transition-transform duration-300 text-[18px]">+</span>
          </summary>
          <div className="px-5 pb-5 text-[14px] text-[#86868b] leading-[1.65]">{item.content}</div>
        </details>
      ))}
    </div>
  );
}

function AlertElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { text?: string; type?: string };
  const types: Record<string, string> = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    error: "bg-red-50 text-red-800 border-red-200",
  };
  return (
    <div className={`px-5 py-4 rounded-xl border ${types[c.type || "info"]}`}>
      <p className="text-[14px] font-medium">{c.text || "Alert message"}</p>
    </div>
  );
}

function TableElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { headers?: string[]; rows?: string[][] };
  return (
    <div className="overflow-x-auto rounded-xl border border-[#e8e8ed]">
      <table className="w-full text-left text-[14px]">
        {c.headers && (
          <thead className="bg-[#f5f5f7]">
            <tr>{c.headers.map((h, i) => <th key={i} className="px-5 py-3 font-semibold text-[#1d1d1f]">{h}</th>)}</tr>
          </thead>
        )}
        <tbody>
          {(c.rows || []).map((row, i) => (
            <tr key={i} className="border-t border-[#e8e8ed]">
              {row.map((cell, j) => <td key={j} className="px-5 py-3 text-[#6e6e73]">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Master renderer ── */
const elementMap: Record<string, React.ComponentType<{ el: ElementRow }>> = {
  heading: HeadingElement, paragraph: ParagraphElement, image: ImageElement,
  button: ButtonElement, divider: DividerElement, spacer: SpacerElement,
  card: CardElement, list: ListElement, video: VideoElement,
  badge: BadgeElement, avatar: AvatarElement, stat: StatElement,
  testimonial: TestimonialElement, feature: FeatureElement, pricing: PricingElement,
  faq: FaqElement, social: SocialElement, logo: LogoElement,
  progress: ProgressElement, "tag-list": TagListElement, "cta-banner": CtaBannerElement,
  "icon-box": IconBoxElement, gallery: GalleryElement, accordion: AccordionElement,
  alert: AlertElement, table: TableElement,
};

export function ElementRenderer({ elements }: { elements: ElementRow[] }) {
  return (
    <>
      {elements.map((el) => {
        const Component = elementMap[el.type];
        if (!Component) return null;
        return <div key={el.id} className="element-wrapper"><Component el={el} /></div>;
      })}
    </>
  );
}
