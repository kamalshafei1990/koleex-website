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
  const defaults: Record<ElementType, Record<string, unknown>> = {
    heading: { text: "Heading", level: "h2" },
    paragraph: { text: "Add your text here." },
    image: { src: "", alt: "" },
    button: { text: "Button", link: "/", style: "solid", shape: "pill", size: "medium" },
    icon: { name: "star", size: 24 },
    card: { title: "Card Title", description: "Card description." },
    list: { items: ["Item 1", "Item 2", "Item 3"], style: "bullet" },
    form: { fields: [{ label: "Name", type: "text" }, { label: "Email", type: "email" }] },
    video: { src: "", type: "embed" },
    divider: { style: "line" },
    container: { direction: "row", gap: "16px" },
    spacer: { height: "48px" },
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
