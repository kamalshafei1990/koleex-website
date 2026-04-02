"use client";

import Link from "next/link";
import type { ElementRow } from "@/types/supabase";
import { CmsImage } from "./CmsImage";

/* ---------------------------------------------------------------------------
   ElementRenderer — Every element supports dark/light theme via style.theme.
   Default: inherits from section. Can be overridden per element.
   --------------------------------------------------------------------------- */

type Theme = "light" | "dark";

function getTheme(el: ElementRow): Theme {
  return ((el.style as Record<string, unknown>)?.theme as Theme) || "light";
}

/* Colors based on theme */
function tx(theme: Theme) {
  return {
    heading: theme === "dark" ? "text-white" : "text-[#1d1d1f]",
    body: theme === "dark" ? "text-white/50" : "text-[#86868b]",
    muted: theme === "dark" ? "text-white/30" : "text-[#aeaeb2]",
    surface: theme === "dark" ? "bg-white/[0.04]" : "bg-[#f5f5f7]",
    surfaceHover: theme === "dark" ? "hover:bg-white/[0.08]" : "hover:bg-[#e8e8ed]",
    border: theme === "dark" ? "border-white/[0.06]" : "border-[#e8e8ed]",
    card: theme === "dark" ? "bg-white/[0.03] border-white/[0.05]" : "bg-[#f5f5f7] border-transparent",
    cardHover: theme === "dark" ? "hover:bg-white/[0.06] hover:border-white/[0.10]" : "hover:bg-white hover:border-[#e8e8ed] hover:shadow-lg",
    btnSolid: theme === "dark" ? "bg-white text-black hover:bg-white/90" : "bg-[#1d1d1f] text-white hover:bg-black",
    btnOutline: theme === "dark" ? "border-white/30 text-white hover:bg-white/10" : "border-[#1d1d1f] text-[#1d1d1f] hover:bg-[#1d1d1f]/5",
    btnGhost: theme === "dark" ? "text-white/60 hover:text-white" : "text-[#1d1d1f]/60 hover:text-[#1d1d1f]",
  };
}

/* ── Elements ── */

function HeadingElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { text?: string; level?: string };
  const s = (el.style || {}) as { size?: string; align?: string };
  const Tag = (d.level || "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const sizes: Record<string, string> = { xl: "text-[48px] md:text-[72px] font-bold tracking-[-0.04em]", lg: "text-[36px] md:text-[56px] font-bold tracking-[-0.035em]", md: "text-[28px] md:text-[44px] font-semibold tracking-[-0.03em]", sm: "text-[22px] md:text-[32px] font-semibold tracking-[-0.025em]" };
  return <Tag className={`${sizes[s.size || "lg"]} leading-[1.06] ${c.heading} ${s.align ? `text-${s.align}` : ""}`}>{d.text || "Heading"}</Tag>;
}

function ParagraphElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { text?: string };
  const s = (el.style || {}) as { size?: string; align?: string };
  const sizes: Record<string, string> = { lg: "text-[18px] md:text-[21px] leading-[1.6]", md: "text-[16px] leading-[1.65]", sm: "text-[14px] leading-[1.55]" };
  return <p className={`${sizes[s.size || "md"]} ${c.body} ${s.align ? `text-${s.align}` : ""}`}>{d.text || "Add your text here."}</p>;
}

function ImageElement({ el }: { el: ElementRow }) {
  const d = (el.content || {}) as { src?: string; alt?: string };
  const s = (el.style || {}) as { rounded?: string };
  if (!d.src) return <div className="h-[200px] bg-[#f5f5f7] rounded-xl flex items-center justify-center text-[#86868b] text-[13px]">No image</div>;
  return <CmsImage src={d.src} alt={d.alt || ""} className={`w-full h-auto ${s.rounded || "rounded-xl"}`} />;
}

function ButtonElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { text?: string; link?: string; style?: string; shape?: string; size?: string; newTab?: boolean };
  const shapes: Record<string, string> = { pill: "rounded-full", rounded: "rounded-xl", square: "rounded-none" };
  const szs: Record<string, string> = { small: "h-9 px-4 text-[13px]", medium: "h-11 px-6 text-[15px]", large: "h-[52px] px-8 text-[17px]" };
  const styleMap: Record<string, string> = { solid: c.btnSolid, outline: `border ${c.btnOutline}`, ghost: c.btnGhost };
  return (
    <Link href={d.link || "#"} target={d.newTab ? "_blank" : undefined}
      className={`inline-flex items-center justify-center font-medium transition-all duration-300 ${szs[d.size || "medium"]} ${shapes[d.shape || "pill"]} ${styleMap[d.style || "solid"]}`}>
      {d.text || "Button"}
    </Link>
  );
}

function DividerElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  return <hr className={`border-t ${c.border} my-4`} />;
}

function SpacerElement({ el }: { el: ElementRow }) {
  const d = (el.content || {}) as { height?: string };
  return <div style={{ height: d.height || "48px" }} />;
}

function VideoElement({ el }: { el: ElementRow }) {
  const d = (el.content || {}) as { src?: string };
  if (!d.src) return <div className="aspect-video bg-[#f5f5f7] rounded-xl flex items-center justify-center text-[#86868b] text-[13px]">No video</div>;
  const isEmbed = /youtube|vimeo|embed/i.test(d.src);
  return (
    <div className="aspect-video rounded-xl overflow-hidden bg-black">
      {isEmbed ? <iframe src={d.src} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen /> : <video src={d.src} controls playsInline className="w-full h-full object-contain" />}
    </div>
  );
}

function ListElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { items?: string[]; style?: string };
  return (
    <ul className={`space-y-2 ${d.style === "number" ? "list-decimal" : "list-disc"} pl-5`}>
      {(d.items || []).map((item, i) => <li key={i} className={`text-[15px] ${c.body} leading-[1.6]`}>{item}</li>)}
    </ul>
  );
}

function CardElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as {
    title?: string; description?: string; icon?: string; image?: string; link?: string;
    cardBg?: string; cardTextColor?: string; cardBorderColor?: string; cardRadius?: string;
    iconColor?: string; iconBgColor?: string; iconBgShape?: string; iconSize?: string;
    titleColor?: string; descColor?: string; cardStyle?: string;
    badge?: string; badgeColor?: string; price?: string;
  };

  // Card style presets
  const presetStyles: Record<string, string> = {
    default: "",
    elevated: "shadow-md hover:shadow-xl",
    outlined: "border-2",
    flat: "",
    glass: "backdrop-blur-xl bg-opacity-80",
  };

  // Custom colors or defaults
  const bgColor = d.cardBg || (t === "dark" ? "rgba(255,255,255,0.03)" : "#f5f5f7");
  const textColor = d.cardTextColor || (t === "dark" ? "#ffffff" : "#1d1d1f");
  const descClr = d.descColor || (t === "dark" ? "rgba(255,255,255,0.5)" : "#86868b");
  const borderClr = d.cardBorderColor || (t === "dark" ? "rgba(255,255,255,0.05)" : "transparent");
  const radius = d.cardRadius || "18px";

  // Icon styling
  const iconSize = d.iconSize || "28px";
  const iconColor = d.iconColor || (t === "dark" ? "#2997ff" : "#0066cc");
  const iconBgShape = d.iconBgShape || "none";
  const iconBgColor = d.iconBgColor || (t === "dark" ? "rgba(255,255,255,0.06)" : "#f0f0f5");

  const inner = (
    <div
      className={`p-6 hover:-translate-y-1 transition-all duration-500 ${presetStyles[d.cardStyle || "default"]}`}
      style={{
        backgroundColor: bgColor,
        borderColor: borderClr,
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: radius,
        color: textColor,
      }}
    >
      {/* Image */}
      {d.image && <CmsImage src={d.image} alt={d.title || ""} className={`w-full h-[180px] object-cover mb-4 rounded-xl`} />}

      {/* Icon — emoji or uploaded image */}
      {d.icon && (
        <div className="mb-3">
          {(() => {
            const isImg = (d.icon as string).startsWith("http") || (d.icon as string).startsWith("/");
            const iconEl = isImg
              ? <img src={d.icon as string} alt="" style={{ width: iconSize, height: iconSize }} className="object-contain" />
              : <span style={{ fontSize: iconSize, color: iconColor, lineHeight: 1 }}>{d.icon}</span>;

            if (iconBgShape !== "none") {
              return (
                <div
                  className={`inline-flex items-center justify-center ${iconBgShape === "circle" ? "rounded-full" : iconBgShape === "rounded" ? "rounded-xl" : "rounded-full px-3"}`}
                  style={{ backgroundColor: iconBgColor, padding: "10px" }}
                >
                  {iconEl}
                </div>
              );
            }
            return iconEl;
          })()}
        </div>
      )}

      {/* Badge */}
      {d.badge && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.06em] mb-2" style={{ color: d.badgeColor || iconColor }}>
          {d.badge}
        </p>
      )}

      {/* Title */}
      {d.title && (
        <h4 className="text-[16px] font-semibold leading-[1.3]" style={{ color: d.titleColor || textColor }}>
          {d.title}
        </h4>
      )}

      {/* Description */}
      {d.description && (
        <p className="text-[13px] mt-2 leading-[1.55]" style={{ color: descClr }}>
          {d.description}
        </p>
      )}

      {/* Price */}
      {d.price && (
        <p className="text-[15px] font-semibold mt-3" style={{ color: textColor }}>
          {d.price}
        </p>
      )}
    </div>
  );
  return d.link ? <Link href={d.link}>{inner}</Link> : inner;
}

function BadgeElement({ el }: { el: ElementRow }) {
  const t = getTheme(el);
  const d = (el.content || {}) as { text?: string; variant?: string };
  const variants: Record<string, string> = {
    default: t === "dark" ? "bg-white/[0.08] text-white/70" : "bg-[#f5f5f7] text-[#1d1d1f]",
    primary: t === "dark" ? "bg-white text-black" : "bg-[#1d1d1f] text-white",
    success: "bg-green-50 text-green-700", warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-700", info: "bg-blue-50 text-blue-700",
  };
  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium ${variants[d.variant || "default"]}`}>{d.text || "Badge"}</span>;
}

function AvatarElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { src?: string; name?: string; role?: string; size?: string };
  const szs: Record<string, string> = { sm: "h-10 w-10", md: "h-14 w-14", lg: "h-20 w-20" };
  return (
    <div className="flex items-center gap-3">
      {d.src ? <img src={d.src} alt={d.name || ""} className={`${szs[d.size || "md"]} rounded-full object-cover`} /> :
        <div className={`${szs[d.size || "md"]} rounded-full ${c.surface} flex items-center justify-center ${c.muted} font-semibold text-[18px]`}>{(d.name || "?")[0]}</div>}
      <div>
        {d.name && <p className={`text-[15px] font-semibold ${c.heading}`}>{d.name}</p>}
        {d.role && <p className={`text-[13px] ${c.body}`}>{d.role}</p>}
      </div>
    </div>
  );
}

function StatElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { value?: string; label?: string; prefix?: string; suffix?: string };
  return (
    <div className="text-center">
      <p className={`text-[44px] md:text-[56px] font-bold tracking-[-0.04em] ${c.heading} leading-none`}>{d.prefix}{d.value || "0"}{d.suffix}</p>
      {d.label && <p className={`text-[13px] ${c.body} mt-2`}>{d.label}</p>}
    </div>
  );
}

function TestimonialElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { quote?: string; name?: string; role?: string; avatar?: string; rating?: number };
  return (
    <div className={`${c.card} border rounded-[20px] p-8`}>
      {d.rating && <div className="flex gap-0.5 mb-4">{Array.from({ length: d.rating }).map((_, i) => <span key={i} className="text-amber-400 text-[16px]">★</span>)}</div>}
      {d.quote && <p className={`text-[17px] leading-[1.6] ${c.heading} italic`}>&ldquo;{d.quote}&rdquo;</p>}
      <div className="flex items-center gap-3 mt-6">
        {d.avatar ? <img src={d.avatar} alt="" className="h-10 w-10 rounded-full object-cover" /> : <div className={`h-10 w-10 rounded-full ${c.surface}`} />}
        <div>
          {d.name && <p className={`text-[14px] font-semibold ${c.heading}`}>{d.name}</p>}
          {d.role && <p className={`text-[12px] ${c.body}`}>{d.role}</p>}
        </div>
      </div>
    </div>
  );
}

function FeatureElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { icon?: string; title?: string; description?: string };
  return (
    <div className="flex gap-4">
      {d.icon && <div className={`h-12 w-12 shrink-0 rounded-2xl ${c.surface} flex items-center justify-center text-[24px]`}>{d.icon}</div>}
      <div>
        {d.title && <h4 className={`text-[16px] font-semibold ${c.heading}`}>{d.title}</h4>}
        {d.description && <p className={`text-[14px] ${c.body} mt-1 leading-[1.55]`}>{d.description}</p>}
      </div>
    </div>
  );
}

function PricingElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { name?: string; price?: string; period?: string; features?: string[]; cta?: string; highlighted?: boolean };
  const hl = d.highlighted;
  return (
    <div className={`rounded-[20px] p-8 border ${hl ? (t === "dark" ? "bg-white text-black border-white" : "bg-[#1d1d1f] text-white border-[#1d1d1f]") : `${c.card}`}`}>
      {d.name && <p className={`text-[14px] font-semibold ${hl ? "opacity-60" : c.body}`}>{d.name}</p>}
      <div className="flex items-baseline gap-1 mt-2">
        {d.price && <span className={`text-[40px] font-bold tracking-tight ${hl ? "" : c.heading}`}>{d.price}</span>}
        {d.period && <span className={`text-[14px] ${hl ? "opacity-40" : c.body}`}>/{d.period}</span>}
      </div>
      {d.features && <ul className="mt-6 space-y-3">{d.features.map((f, i) => <li key={i} className={`text-[14px] flex items-center gap-2 ${hl ? "opacity-70" : c.body}`}><span className="text-green-500">✓</span>{f}</li>)}</ul>}
      {d.cta && <button className={`w-full h-11 mt-6 rounded-full text-[14px] font-semibold transition-colors ${hl ? (t === "dark" ? "bg-[#1d1d1f] text-white" : "bg-white text-black") : c.btnSolid}`}>{d.cta}</button>}
    </div>
  );
}

function FaqElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { question?: string; answer?: string };
  return (
    <details className={`group border-b ${c.border} py-5`}>
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <span className={`text-[16px] font-semibold ${c.heading}`}>{d.question || "Question?"}</span>
        <span className={`${c.muted} group-open:rotate-45 transition-transform duration-300 text-[20px]`}>+</span>
      </summary>
      <p className={`text-[15px] ${c.body} mt-3 leading-[1.65]`}>{d.answer || "Answer goes here."}</p>
    </details>
  );
}

function SocialElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { links?: { platform: string; url: string }[] };
  const icons: Record<string, string> = { linkedin: "in", twitter: "𝕏", facebook: "f", instagram: "📷", youtube: "▶", tiktok: "♪" };
  return (
    <div className="flex gap-3">
      {(d.links || []).map((link, i) => (
        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
          className={`h-10 w-10 rounded-full ${c.surface} flex items-center justify-center ${c.body} ${t === "dark" ? "hover:bg-white hover:text-black" : "hover:bg-[#1d1d1f] hover:text-white"} transition-all duration-300 text-[14px] font-bold`}>
          {icons[link.platform] || link.platform[0]}
        </a>
      ))}
    </div>
  );
}

function LogoElement({ el }: { el: ElementRow }) {
  const d = (el.content || {}) as { src?: string; name?: string; width?: string };
  if (d.src) return <img src={d.src} alt={d.name || ""} className="h-8 opacity-50 hover:opacity-100 transition-opacity" style={{ maxWidth: d.width || "120px" }} />;
  const t = getTheme(el); const c = tx(t);
  return <div className={`h-8 px-4 ${c.surface} rounded-lg flex items-center text-[12px] font-semibold ${c.muted}`}>{d.name || "Logo"}</div>;
}

function ProgressElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { label?: string; value?: number; max?: number };
  const pct = Math.min(100, ((d.value || 0) / (d.max || 100)) * 100);
  return (
    <div>
      <div className="flex justify-between mb-2">
        {d.label && <span className={`text-[13px] font-medium ${c.heading}`}>{d.label}</span>}
        <span className={`text-[13px] ${c.body}`}>{Math.round(pct)}%</span>
      </div>
      <div className={`h-2 ${c.surface} rounded-full overflow-hidden`}>
        <div className={`h-full rounded-full ${t === "dark" ? "bg-white" : "bg-[#1d1d1f]"} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function TagListElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { tags?: string[] };
  return (
    <div className="flex flex-wrap gap-2">
      {(d.tags || []).map((tag, i) => (
        <span key={i} className={`px-3 py-1.5 rounded-full ${c.surface} text-[12px] font-medium ${c.body} ${c.surfaceHover} transition-colors`}>{tag}</span>
      ))}
    </div>
  );
}

function CtaBannerElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { title?: string; description?: string; buttonText?: string; buttonLink?: string; dark?: boolean };
  // Use style.theme first, fall back to content.dark for backward compat
  const isDark = t === "dark" || d.dark;
  const colors = isDark ? tx("dark") : tx("light");
  return (
    <div className={`rounded-[20px] p-8 md:p-12 ${isDark ? "bg-[#1d1d1f]" : "bg-[#f5f5f7]"} flex flex-col md:flex-row items-center justify-between gap-6`}>
      <div>
        {d.title && <h3 className={`text-[24px] font-bold ${colors.heading}`}>{d.title}</h3>}
        {d.description && <p className={`text-[15px] mt-2 ${colors.body}`}>{d.description}</p>}
      </div>
      {d.buttonText && <Link href={d.buttonLink || "#"} className={`shrink-0 h-11 px-6 rounded-full text-[14px] font-semibold flex items-center transition-colors ${colors.btnSolid}`}>{d.buttonText}</Link>}
    </div>
  );
}

function IconBoxElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { icon?: string; title?: string; description?: string };
  return (
    <div className="text-center p-6">
      {d.icon && <div className={`h-16 w-16 mx-auto rounded-2xl ${c.surface} flex items-center justify-center text-[32px] mb-4`}>{d.icon}</div>}
      {d.title && <h4 className={`text-[16px] font-semibold ${c.heading}`}>{d.title}</h4>}
      {d.description && <p className={`text-[13px] ${c.body} mt-2 leading-[1.55]`}>{d.description}</p>}
    </div>
  );
}

function GalleryElement({ el }: { el: ElementRow }) {
  const d = (el.content || {}) as { images?: { src: string; alt?: string }[]; columns?: number };
  return (
    <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${d.columns || 3}, 1fr)` }}>
      {(d.images || []).map((img, i) => (
        <div key={i} className="aspect-square rounded-xl overflow-hidden group">
          <img src={img.src} alt={img.alt || ""} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
        </div>
      ))}
    </div>
  );
}

function AccordionElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { items?: { title: string; content: string }[] };
  return (
    <div className={`divide-y ${t === "dark" ? "divide-white/[0.06]" : "divide-[#e8e8ed]"} rounded-xl border ${c.border} overflow-hidden`}>
      {(d.items || []).map((item, i) => (
        <details key={i} className="group">
          <summary className={`flex items-center justify-between p-5 cursor-pointer list-none ${t === "dark" ? "hover:bg-white/[0.03]" : "bg-white hover:bg-[#f5f5f7]"} transition-colors`}>
            <span className={`text-[15px] font-semibold ${c.heading}`}>{item.title}</span>
            <span className={`${c.muted} group-open:rotate-45 transition-transform duration-300 text-[18px]`}>+</span>
          </summary>
          <div className={`px-5 pb-5 text-[14px] ${c.body} leading-[1.65]`}>{item.content}</div>
        </details>
      ))}
    </div>
  );
}

function AlertElement({ el }: { el: ElementRow }) {
  const d = (el.content || {}) as { text?: string; type?: string };
  const types: Record<string, string> = {
    info: "bg-blue-50 text-blue-800 border-blue-200", success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200", error: "bg-red-50 text-red-800 border-red-200",
  };
  return <div className={`px-5 py-4 rounded-xl border ${types[d.type || "info"]}`}><p className="text-[14px] font-medium">{d.text || "Alert message"}</p></div>;
}

function TableElement({ el }: { el: ElementRow }) {
  const t = getTheme(el); const c = tx(t);
  const d = (el.content || {}) as { headers?: string[]; rows?: string[][] };
  return (
    <div className={`overflow-x-auto rounded-xl border ${c.border}`}>
      <table className="w-full text-left text-[14px]">
        {d.headers && <thead className={c.surface}><tr>{d.headers.map((h, i) => <th key={i} className={`px-5 py-3 font-semibold ${c.heading}`}>{h}</th>)}</tr></thead>}
        <tbody>{(d.rows || []).map((row, i) => <tr key={i} className={`border-t ${c.border}`}>{row.map((cell, j) => <td key={j} className={`px-5 py-3 ${c.body}`}>{cell}</td>)}</tr>)}</tbody>
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
  return <>{elements.map((el) => { const C = elementMap[el.type]; return C ? <div key={el.id}><C el={el} /></div> : null; })}</>;
}
