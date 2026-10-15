"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { KOLEEX_WHATSAPP_HREF } from "@/data/socials";
import { BrandIcon } from "./BrandIcon";
import styles from "./coming-soon.module.css";

export function WeChatButton({
  path,
  email,
  wechatId,
}: {
  path: string;
  email: string;
  wechatId: string | null;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className={styles.wechatSlot} ref={rootRef}>
      <button
        type="button"
        className={styles.mark}
        style={{ "--brand": "#07C160" } as CSSProperties}
        data-brand="wechat"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={wechatId ? `WeChat, ID ${wechatId}` : "WeChat, ID not published"}
        onClick={() => setOpen((value) => !value)}
      >
        <BrandIcon path={path} />
      </button>
      {open ? (
        <div id={panelId} className={styles.popover} role="region" aria-label="WeChat">
          {wechatId ? (
            <>
              <p className={styles.popoverLabel}>WeChat ID</p>
              <p className={styles.wechatId}>{wechatId}</p>
            </>
          ) : (
            <p>WeChat ID is not published yet. Ask via WhatsApp or email.</p>
          )}
          <p className={styles.popoverLinks}>
            <a href={KOLEEX_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={`mailto:${email}`}>Email</a>
          </p>
        </div>
      ) : null}
    </div>
  );
}
