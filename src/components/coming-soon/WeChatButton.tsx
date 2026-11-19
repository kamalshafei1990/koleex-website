"use client";

import { useEffect, useId, useRef, useState } from "react";
import { KOLEEX_WHATSAPP_HREF } from "@/data/socials";
import { BrandIcon } from "./BrandIcon";
import styles from "./coming-soon.module.css";

const WECHAT_QR_SRC = "/coming-soon/wechat-qr.png";

export function WeChatButton({
  path,
  email,
}: {
  path: string;
  email: string;
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
        data-brand="wechat"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="WeChat, scan to add"
        onClick={() => setOpen((value) => !value)}
      >
        <BrandIcon path={path} />
      </button>
      {open ? (
        <div id={panelId} className={styles.popover} role="region" aria-label="WeChat">
          {/* Official QR is a static public asset; plain img avoids next/image recompression. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.popoverQr}
            src={WECHAT_QR_SRC}
            width={240}
            height={243}
            alt="WeChat QR code"
          />
          <p className={styles.popoverCaption}>Scan to add on WeChat.</p>
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
