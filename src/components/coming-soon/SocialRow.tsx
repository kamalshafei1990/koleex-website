import { KOLEEX_SOCIALS, SHOW_UNLINKED_SOCIALS, type KoleexSocial } from "@/data/socials";
import { brandPath } from "./brand-marks";
import { BrandIcon } from "./BrandIcon";
import { WeChatButton } from "./WeChatButton";
import styles from "./coming-soon.module.css";
import type { CSSProperties } from "react";

function visible(item: KoleexSocial) {
  if (item.id === "wechat" || item.href) return true;
  return SHOW_UNLINKED_SOCIALS;
}

export function SocialRow({ email }: { email: string }) {
  return (
    <ul className={styles.social} aria-label="KOLEEX social media">
      {KOLEEX_SOCIALS.filter(visible).map((item) => {
        const path = brandPath(item.id);
        const brandStyle = { "--brand": item.brand } as CSSProperties;

        if (item.id === "wechat") {
          return (
            <li key={item.id}>
              <WeChatButton path={path} email={email} wechatId={item.wechatId ?? null} />
            </li>
          );
        }

        const icon = <BrandIcon path={path} duo={item.id === "tiktok"} />;

        if (item.href) {
          return (
            <li key={item.id}>
              <a
                className={styles.mark}
                style={brandStyle}
                data-brand={item.id}
                data-ink={item.ink ? "true" : undefined}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                {icon}
              </a>
            </li>
          );
        }

        return (
          <li key={item.id}>
            <span
              className={styles.mark}
              style={brandStyle}
              data-brand={item.id}
              data-ink={item.ink ? "true" : undefined}
              role="img"
              aria-label={`${item.label}, link coming soon`}
              title={`${item.label} link coming soon`}
            >
              {icon}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
