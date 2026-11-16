// KOLEEX social profiles for the Coming Soon page.
// Official URLs are those published on koleexgroup.com/contact-us-koleex.
// Do not invent handles. `href: "#"` entries in src/data/site.ts are
// placeholders, not published profiles.

export type KoleexSocialId =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "x"
  | "youtube"
  | "tiktok"
  | "wechat"
  | "whatsapp";

export type KoleexSocial = {
  id: KoleexSocialId;
  label: string;
  /** Public profile or chat URL. null = not published in this repo. */
  href: string | null;
  /** Official brand color, shown on hover. */
  brand: string;
  /**
   * True when the official mark is black. On a dark section the hover
   * uses the reversed light mark so the glyph stays visible.
   */
  ink?: boolean;
  /** WeChat ID. null = none published in this repo. */
  wechatId?: string | null;
};

/**
 * Unlinked icons stay on the page and are not anchors.
 * Set this to false to hide every icon that has no href (WeChat still shows).
 */
export const SHOW_UNLINKED_SOCIALS = false;

/**
 * Phone already published on the Coming Soon contact card:
 * +86 130 7380 0720
 */
export const KOLEEX_WHATSAPP_HREF = "https://wa.me/8613073800720";

export const KOLEEX_SOCIALS: readonly KoleexSocial[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/koleexgroup",
    brand: "#0866FF",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/koleexgroup",
    brand: "#FF0069",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/koleex",
    brand: "#0A66C2",
  },
  {
    id: "x",
    label: "X",
    // x.com/koleex and x.com/koleexgroup are 404. No official handle.
    href: null,
    brand: "#000000",
    ink: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@Koleex",
    brand: "#FF0000",
  },
  {
    id: "tiktok",
    label: "TikTok",
    // Wix leftover @wix is not an official account. No official handle.
    href: null,
    brand: "#000000",
    ink: true,
  },
  {
    id: "wechat",
    label: "WeChat",
    // No official ID or QR is published.
    href: null,
    brand: "#07C160",
    wechatId: null,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: KOLEEX_WHATSAPP_HREF,
    brand: "#25D366",
  },
];
