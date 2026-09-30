/* ---------------------------------------------------------------------------
   A page built in the Koleex Hub's Page Builder, as the bridge hands it over
   (kept in step with lib/website/page-doc.ts in the Hub, which cleans every
   saved page: known shape only, texts cut to length, safe links, the Hub's
   own photos). Brand-locked sections; the words come in English, Arabic and
   Chinese, and a missing word shows in English (owner, 30/09/2026).
   --------------------------------------------------------------------------- */

export type PageLang = "en" | "ar" | "zh";
export interface I18nText { en: string; ar: string; zh: string }
export interface PageButton { label: I18nText; href: string }
export interface PageImage { url: string; alt: I18nText }
export type SectionTone = "dark" | "light";

interface SectionBase { id: string; hidden: boolean; tone: SectionTone }
export interface HeroSection extends SectionBase { type: "hero"; eyebrow: I18nText; title: I18nText; subtitle: I18nText; image: PageImage | null; primary: PageButton | null; secondary: PageButton | null }
export interface TextSection extends SectionBase { type: "text"; title: I18nText; body: I18nText }
export interface ImageTextSection extends SectionBase { type: "imageText"; title: I18nText; body: I18nText; image: PageImage | null; side: "left" | "right"; button: PageButton | null }
export interface FeaturesSection extends SectionBase { type: "features"; title: I18nText; subtitle: I18nText; items: Array<{ id: string; title: I18nText; body: I18nText }> }
export interface NumbersSection extends SectionBase { type: "numbers"; title: I18nText; items: Array<{ id: string; value: string; label: I18nText }> }
export interface ProductsSection extends SectionBase { type: "products"; title: I18nText; subtitle: I18nText; source: "featured" | "category" | "manual"; category: string | null; slugs: string[]; limit: number }
export interface GallerySection extends SectionBase { type: "gallery"; title: I18nText; images: PageImage[] }
export interface FaqSection extends SectionBase { type: "faq"; title: I18nText; items: Array<{ id: string; q: I18nText; a: I18nText }> }
export interface CtaSection extends SectionBase { type: "cta"; title: I18nText; body: I18nText; button: PageButton | null }

export type PageSection = HeroSection | TextSection | ImageTextSection | FeaturesSection | NumbersSection | ProductsSection | GallerySection | FaqSection | CtaSection;

export interface PageDoc { v: 1; sections: PageSection[]; seo: { title: I18nText; description: I18nText } }

/** The word in a language, else the English. */
export const textIn = (t: I18nText | null | undefined, lang: PageLang): string => (t?.[lang] || t?.en || "").trim();

/** A text's paragraphs (a blank line starts a new one). */
export const paragraphsOf = (s: string): string[] => s.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
