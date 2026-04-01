import { supabaseAdmin as supabase } from "./supabase-admin";
import type { ElementRow, ElementType } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   Elements API — CRUD for elements inside sections.
   --------------------------------------------------------------------------- */

export async function getElementsBySectionId(sectionId: string): Promise<ElementRow[]> {
  const { data, error } = await supabase
    .from("elements")
    .select("*")
    .eq("section_id", sectionId)
    .eq("visible", true)
    .order("order", { ascending: true });

  if (error) {
    console.error("[Elements] Fetch error:", error.message);
    return [];
  }
  return (data as ElementRow[]) || [];
}

export async function createElement(
  sectionId: string,
  type: ElementType,
  content?: Record<string, unknown>,
  order?: number
): Promise<ElementRow | null> {
  const defaults: Record<string, Record<string, unknown>> = {
    heading: { text: "Heading", level: "h2" },
    paragraph: { text: "Add your text here." },
    image: { src: "", alt: "" },
    button: { text: "Button", link: "/", style: "solid", shape: "pill", size: "medium" },
    icon: { name: "star", size: 24 },
    card: { title: "Card Title", description: "Card description.", icon: "⚡" },
    list: { items: ["Item 1", "Item 2", "Item 3"], style: "bullet" },
    form: { fields: [{ label: "Name", type: "text" }, { label: "Email", type: "email" }] },
    video: { src: "", type: "embed" },
    divider: { style: "line" },
    container: { direction: "row", gap: "16px" },
    spacer: { height: "48px" },
    badge: { text: "New", variant: "primary" },
    avatar: { name: "Team Member", role: "Position", size: "md" },
    stat: { value: "100", label: "Metric", suffix: "+" },
    testimonial: { quote: "Amazing product and service.", name: "Client Name", role: "Company", rating: 5 },
    feature: { icon: "⚡", title: "Feature Title", description: "Feature description goes here." },
    pricing: { name: "Standard", price: "$99", period: "month", features: ["Feature 1", "Feature 2", "Feature 3"], cta: "Get Started" },
    faq: { question: "Frequently asked question?", answer: "The answer to this question goes here." },
    social: { links: [{ platform: "linkedin", url: "#" }, { platform: "twitter", url: "#" }, { platform: "instagram", url: "#" }] },
    logo: { name: "Brand", width: "120px" },
    countdown: { target: "2025-12-31", label: "Launching Soon" },
    progress: { label: "Progress", value: 75, max: 100 },
    "tag-list": { tags: ["Technology", "Innovation", "Industrial", "Automation"] },
    "cta-banner": { title: "Ready to get started?", description: "Contact our team today.", buttonText: "Contact Us", buttonLink: "/contact" },
    "icon-box": { icon: "🎯", title: "Icon Box Title", description: "Short description here." },
    gallery: { images: [], columns: 3 },
    map: { address: "Koleex International Group", embed: "" },
    code: { language: "javascript", code: "console.log('Hello');" },
    table: { headers: ["Name", "Value", "Status"], rows: [["Item 1", "100", "Active"], ["Item 2", "200", "Pending"]] },
    accordion: { items: [{ title: "Section 1", content: "Content for section 1." }, { title: "Section 2", content: "Content for section 2." }] },
    tabs: { items: [{ label: "Tab 1", content: "Content 1" }, { label: "Tab 2", content: "Content 2" }] },
    alert: { text: "This is an important message.", type: "info" },
    breadcrumb: { items: [{ label: "Home", link: "/" }, { label: "Products", link: "/products" }] },
  };

  const { data, error } = await supabase
    .from("elements")
    .insert({
      section_id: sectionId,
      type,
      content: content || defaults[type] || {},
      style: {},
      settings: {},
      order: order ?? 99,
      visible: true,
    })
    .select()
    .single();

  if (error) {
    console.error("[Elements] Create error:", error.message);
    return null;
  }
  return data as ElementRow;
}

export async function updateElement(
  id: string,
  updates: Partial<Pick<ElementRow, "content" | "style" | "settings" | "order" | "visible" | "type">>
): Promise<boolean> {
  const { error } = await supabase
    .from("elements")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("[Elements] Update error:", error.message);
    return false;
  }
  return true;
}

export async function deleteElement(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("elements")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[Elements] Delete error:", error.message);
    return false;
  }
  return true;
}
