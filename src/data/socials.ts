// KOLEEX social profiles for the Coming Soon page.
// Only URLs that already exist in this repository are filled in.
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
export const SHOW_UNLINKED_SOCIALS = true;

/**
 * Phone already published on the Coming Soon contact card:
 * +86 130 7380 0720
 */
export const KOLEEX_WHATSAPP_HREF = "https://wa.me/8613073800720";

export const KOLEEX_SOCIALS: readonly KoleexSocial[] = [
  {
    id: "facebook",
    label: "Facebook",
    // TODO: official KOLEEX Facebook page URL.
    href: null,
    brand: "#0866FF",
  },
  {
    id: "instagram",
    label: "Instagram",
    // TODO: official KOLEEX Instagram profile URL.
    href: null,
    brand: "#FF0069",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    // TODO: official KOLEEX LinkedIn page URL.
    href: null,
    brand: "#0A66C2",
  },
  {
    id: "x",
    label: "X",
    // TODO: official KOLEEX X profile URL.
    href: null,
    brand: "#000000",
    ink: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    // TODO: official KOLEEX YouTube channel URL.
    href: null,
    brand: "#FF0000",
  },
  {
    id: "tiktok",
    label: "TikTok",
    // TODO: official KOLEEX TikTok profile URL.
    href: null,
    brand: "#000000",
    ink: true,
  },
  {
    id: "wechat",
    label: "WeChat",
    // TODO: official KOLEEX WeChat ID. No ID or QR asset is in this repo.
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
