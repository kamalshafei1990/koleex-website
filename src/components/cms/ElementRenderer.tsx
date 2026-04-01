"use client";

import Link from "next/link";
import type { ElementRow } from "@/types/supabase";
import { CmsImage } from "./CmsImage";

/* ---------------------------------------------------------------------------
   ElementRenderer — Renders individual elements inside a section.
   Each element type maps to a specific component.
   --------------------------------------------------------------------------- */

function HeadingElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { text?: string; level?: string };
  const s = (el.style || {}) as { color?: string; align?: string; size?: string };
  const level = c.level || "h2";
  const Tag = level as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const sizeMap: Record<string, string> = {
    xl: "text-[48px] md:text-[72px] font-bold tracking-[-0.04em]",
    lg: "text-[36px] md:text-[56px] font-bold tracking-[-0.035em]",
    md: "text-[28px] md:text-[44px] font-semibold tracking-[-0.03em]",
    sm: "text-[22px] md:text-[32px] font-semibold tracking-[-0.025em]",
  };
  return (
    <Tag className={`${sizeMap[s.size || "lg"] || sizeMap.lg} ${s.color || ""} ${s.align ? `text-${s.align}` : ""} leading-[1.06]`}>
      {c.text || "Heading"}
    </Tag>
  );
}

function ParagraphElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { text?: string };
  const s = (el.style || {}) as { color?: string; align?: string; size?: string };
  const sizeMap: Record<string, string> = {
    lg: "text-[18px] md:text-[21px] leading-[1.6]",
    md: "text-[16px] md:text-[17px] leading-[1.65]",
    sm: "text-[14px] leading-[1.55]",
  };
  return (
    <p className={`${sizeMap[s.size || "md"] || sizeMap.md} ${s.color || "text-[#86868b]"} ${s.align ? `text-${s.align}` : ""}`}>
      {c.text || "Add your text here."}
    </p>
  );
}

function ImageElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { src?: string; alt?: string };
  const s = (el.style || {}) as { rounded?: string; maxWidth?: string };
  if (!c.src) return <div className="h-[200px] bg-white/[0.03] rounded-xl flex items-center justify-center text-white/15 text-[13px]">No image selected</div>;
  return (
    <CmsImage
      src={c.src}
      alt={c.alt || ""}
      className={`w-full h-auto ${s.rounded || "rounded-xl"} ${s.maxWidth ? `max-w-[${s.maxWidth}]` : ""}`}
    />
  );
}

function ButtonElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { text?: string; link?: string; style?: string; shape?: string; size?: string; newTab?: boolean };
  const shapeMap: Record<string, string> = { pill: "rounded-full", rounded: "rounded-xl", square: "rounded-none" };
  const sizeMap: Record<string, string> = { small: "h-9 px-4 text-[13px]", medium: "h-11 px-6 text-[15px]", large: "h-[52px] px-8 text-[17px]" };
  const styleMap: Record<string, string> = {
    solid: "bg-[#1d1d1f] text-white hover:bg-black",
    outline: "border border-[#1d1d1f] text-[#1d1d1f] hover:bg-[#1d1d1f]/5",
    ghost: "text-[#1d1d1f]/70 hover:text-[#1d1d1f]",
  };

  return (
    <Link
      href={c.link || "#"}
      target={c.newTab ? "_blank" : undefined}
      className={`inline-flex items-center justify-center font-medium transition-all duration-300 ${sizeMap[c.size || "medium"]} ${shapeMap[c.shape || "pill"]} ${styleMap[c.style || "solid"]}`}
    >
      {c.text || "Button"}
    </Link>
  );
}

function DividerElement({ el }: { el: ElementRow }) {
  const s = (el.style || {}) as { color?: string; width?: string };
  return <hr className={`border-t ${s.color || "border-white/[0.06]"} ${s.width || "w-full"} my-2`} />;
}

function SpacerElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { height?: string };
  return <div style={{ height: c.height || "48px" }} />;
}

function CardElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { title?: string; description?: string; icon?: string; image?: string };
  return (
    <div className="bg-white/[0.03] border border-white/[0.05] rounded-[18px] p-6 hover:-translate-y-1 transition-transform duration-500">
      {c.icon && <span className="text-[24px] block mb-3">{c.icon}</span>}
      {c.image && <CmsImage src={c.image} alt={c.title || ""} className="w-full h-[160px] object-cover rounded-xl mb-4" />}
      {c.title && <h4 className="text-[15px] font-semibold text-white">{c.title}</h4>}
      {c.description && <p className="text-[13px] text-white/30 mt-2 leading-[1.55]">{c.description}</p>}
    </div>
  );
}

function ListElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { items?: string[]; style?: string };
  const items = c.items || [];
  return (
    <ul className={`space-y-2 ${c.style === "number" ? "list-decimal" : "list-disc"} pl-5`}>
      {items.map((item, i) => (
        <li key={i} className="text-[15px] text-[#86868b] leading-[1.6]">{item}</li>
      ))}
    </ul>
  );
}

function VideoElement({ el }: { el: ElementRow }) {
  const c = (el.content || {}) as { src?: string; type?: string };
  if (!c.src) return <div className="aspect-video bg-white/[0.03] rounded-xl flex items-center justify-center text-white/15 text-[13px]">No video</div>;
  const isEmbed = /youtube|vimeo|embed/i.test(c.src);
  return (
    <div className="aspect-video rounded-xl overflow-hidden bg-black">
      {isEmbed ? (
        <iframe src={c.src} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
      ) : (
        <video src={c.src} controls playsInline className="w-full h-full object-contain" />
      )}
    </div>
  );
}

/* ── Master renderer ── */
const elementMap: Record<string, React.ComponentType<{ el: ElementRow }>> = {
  heading: HeadingElement,
  paragraph: ParagraphElement,
  image: ImageElement,
  button: ButtonElement,
  divider: DividerElement,
  spacer: SpacerElement,
  card: CardElement,
  list: ListElement,
  video: VideoElement,
};

export function ElementRenderer({ elements }: { elements: ElementRow[] }) {
  return (
    <>
      {elements.map((el) => {
        const Component = elementMap[el.type];
        if (!Component) return null;
        return (
          <div key={el.id} className="element-wrapper">
            <Component el={el} />
          </div>
        );
      })}
    </>
  );
}
