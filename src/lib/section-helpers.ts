import type { SectionRow, SectionSettings, ButtonConfig, SectionItem } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   Section Helpers — Parse settings from section data.

   Settings are stored in the `items` JSONB array as a special entry
   with title="_settings". This avoids schema changes while keeping
   button styles, overlay opacity, text alignment, etc.
   --------------------------------------------------------------------------- */

const DEFAULT_BTN: ButtonConfig = {
  text: "",
  linkType: "url",
  link: "",
  newTab: false,
  style: "solid",
  shape: "pill",
  size: "medium",
};

const DEFAULT_SETTINGS: SectionSettings = {
  overlayOpacity: 60,
  textAlign: "center",
  textMode: "light",
  contentWidth: "medium",
  verticalAlign: "center",
  columns: 3,
};

/* Get settings from section items array */
export function getSectionSettings(section: SectionRow): SectionSettings {
  const items = section.items as (SectionItem & { _settings?: SectionSettings })[] | null;
  if (!items) return { ...DEFAULT_SETTINGS };

  const settingsItem = items.find((i) => i.title === "_settings");
  if (settingsItem && settingsItem._settings) {
    return { ...DEFAULT_SETTINGS, ...settingsItem._settings };
  }

  return { ...DEFAULT_SETTINGS };
}

/* Get button config */
export function getButtonConfig(section: SectionRow, which: "btn1" | "btn2"): ButtonConfig {
  const settings = getSectionSettings(section);
  const btn = settings[which];
  if (btn) return { ...DEFAULT_BTN, ...btn };

  // Fallback to legacy button fields
  if (which === "btn1" && section.button_text) {
    return { ...DEFAULT_BTN, text: section.button_text, link: section.button_link || "", linkType: "url" };
  }
  if (which === "btn2" && section.button2_text) {
    return { ...DEFAULT_BTN, text: section.button2_text, link: section.button2_link || "", style: "outline", linkType: "url" };
  }

  return { ...DEFAULT_BTN };
}

/* Save settings back into items array */
export function updateSectionSettings(
  items: SectionItem[] | null,
  settings: SectionSettings
): SectionItem[] {
  const arr = (items || []).filter((i) => i.title !== "_settings");
  arr.push({ title: "_settings", _settings: settings } as SectionItem & { _settings: SectionSettings });
  return arr;
}

/* Get non-settings items (actual content items) */
export function getContentItems(section: SectionRow): SectionItem[] {
  if (!section.items) return [];
  return (section.items as (SectionItem & { _settings?: unknown })[]).filter((i) => i.title !== "_settings");
}

/* Render button classes based on config */
export function getButtonClasses(btn: ButtonConfig, dark: boolean): string {
  const base = "inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer";

  // Size
  const sizes = {
    small: "h-9 px-4 text-[13px]",
    medium: "h-11 px-6 text-[15px]",
    large: "h-[52px] px-8 text-[17px]",
  };

  // Shape
  const shapes = {
    pill: "rounded-full",
    rounded: "rounded-xl",
    square: "rounded-none",
  };

  // Style
  let styleClass = "";
  if (btn.style === "solid") {
    styleClass = dark
      ? "bg-white text-black hover:bg-white/90"
      : "bg-[#1d1d1f] text-white hover:bg-black";
  } else if (btn.style === "outline") {
    styleClass = dark
      ? "border border-white/30 text-white hover:bg-white/10"
      : "border border-[#1d1d1f] text-[#1d1d1f] hover:bg-[#1d1d1f]/5";
  } else {
    // ghost
    styleClass = dark
      ? "text-white/70 hover:text-white hover:bg-white/5"
      : "text-[#1d1d1f]/70 hover:text-[#1d1d1f] hover:bg-[#1d1d1f]/5";
  }

  return `${base} ${sizes[btn.size]} ${shapes[btn.shape]} ${styleClass}`;
}

/* Build href with link type */
export function buildHref(btn: ButtonConfig): string {
  switch (btn.linkType) {
    case "email": return `mailto:${btn.link}`;
    case "phone": return `tel:${btn.link}`;
    case "anchor": return `#${btn.link}`;
    default: return btn.link || "#";
  }
}
