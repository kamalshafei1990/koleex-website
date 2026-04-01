/* ---------------------------------------------------------------------------
   Supabase Database Types — Maps to the CMS tables.

   Tables:
   - pages: website pages (home, about, products, etc.)
   - sections: content sections within pages
   - media: uploaded files and images

   Layout types for sections:
   hero | image-left | image-right | cards | grid | video | numbers | cta |
   quote | timeline | full-image | split | brands
   --------------------------------------------------------------------------- */

export type SectionLayout =
  | "hero"
  | "image-left"
  | "image-right"
  | "cards"
  | "grid"
  | "video"
  | "numbers"
  | "cta"
  | "quote"
  | "timeline"
  | "full-image"
  | "split"
  | "brands"
  | "bg-hero";

export type ButtonStyle = "solid" | "outline" | "ghost";
export type ButtonShape = "pill" | "rounded" | "square";
export type ButtonSize = "small" | "medium" | "large";
export type LinkType = "none" | "page" | "product" | "anchor" | "url" | "file" | "email" | "phone";

export interface ButtonConfig {
  text: string;
  linkType: LinkType;
  link: string;
  newTab: boolean;
  style: ButtonStyle;
  shape: ButtonShape;
  size: ButtonSize;
}

export interface SectionSettings {
  btn1?: ButtonConfig;
  btn2?: ButtonConfig;
  overlayOpacity?: number;
  textAlign?: "left" | "center" | "right";
  textMode?: "dark" | "light";
  contentWidth?: "narrow" | "medium" | "wide" | "full";
  verticalAlign?: "top" | "center" | "bottom";
  columns?: number;
  paddingTop?: string;
  paddingBottom?: string;
  gap?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  // Layout zones
  zoneLayout?: ZoneLayout;
}

/* ── Layout Zones ── */
export type ZoneLayout =
  | "1-col"
  | "2-col"
  | "3-col"
  | "4-col"
  | "70-30"
  | "30-70"
  | "60-40"
  | "40-60";

/* ── Icon Config ── */
export interface IconConfig {
  type: "emoji" | "lucide" | "svg" | "image";
  value: string; // emoji char, lucide name, svg string, or image URL
  size: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
  customSize?: number;
  color?: string;
  bgShape?: "none" | "circle" | "rounded" | "pill";
  bgColor?: string;
  position?: "left" | "right" | "top" | "bottom" | "center";
  align?: "left" | "center" | "right";
}

/* ── Element Types ── */

export type ElementType =
  | "heading"
  | "paragraph"
  | "image"
  | "button"
  | "icon"
  | "card"
  | "list"
  | "form"
  | "video"
  | "divider"
  | "container"
  | "spacer"
  | "badge"
  | "avatar"
  | "stat"
  | "testimonial"
  | "feature"
  | "pricing"
  | "faq"
  | "social"
  | "logo"
  | "countdown"
  | "progress"
  | "tag-list"
  | "cta-banner"
  | "icon-box"
  | "gallery"
  | "map"
  | "code"
  | "table"
  | "accordion"
  | "tabs"
  | "alert"
  | "breadcrumb";

export interface ElementRow {
  id: string;
  section_id: string;
  type: ElementType;
  content: Record<string, unknown> | null;
  style: Record<string, unknown> | null;
  settings: Record<string, unknown> | null;
  order: number;
  visible: boolean;
  zone?: string; // "a", "b", "c", "d" — which column/zone the element is in
  created_at: string;
  updated_at: string;
}

/* ── Row types (what comes back from Supabase) ── */

export interface PageRow {
  id: string;
  name: string;
  slug: string;
  title: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface SectionRow {
  id: string;
  page_id: string;
  section_key: string;
  layout: SectionLayout;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
  image_alt: string | null;
  video_url: string | null;
  button_text: string | null;
  button_link: string | null;
  button2_text: string | null;
  button2_link: string | null;
  background: "white" | "light" | "dark" | "black" | "image" | null;
  items: SectionItem[] | null;
  order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface SectionItem {
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  href?: string;
  value?: string;
  label?: string;
}

export interface MediaRow {
  id: string;
  name: string;
  file_path: string;
  url: string;
  type: string;
  size: number;
  created_at: string;
}

/* ── Insert types (what you send to Supabase) ── */

export type PageInsert = Omit<PageRow, "id" | "created_at" | "updated_at">;
export type SectionInsert = Omit<SectionRow, "id" | "created_at" | "updated_at">;
export type MediaInsert = Omit<MediaRow, "id" | "created_at">;

/* ── Update types ── */

export type PageUpdate = Partial<PageInsert>;
export type SectionUpdate = Partial<SectionInsert>;

/* ── Database schema type for createClient<Database> ── */

export interface Database {
  public: {
    Tables: {
      pages: {
        Row: PageRow;
        Insert: PageInsert;
        Update: PageUpdate;
      };
      sections: {
        Row: SectionRow;
        Insert: SectionInsert;
        Update: SectionUpdate;
      };
      media: {
        Row: MediaRow;
        Insert: MediaInsert;
        Update: Partial<MediaInsert>;
      };
    };
  };
}
