"use client";

import { useEffect, type ReactNode } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import styles from "./coming-soon.module.css";

function focusFirstField() {
  if (window.location.hash !== "#contact") return;
  document.getElementById("cf-name")?.focus();
}

export function ContactCard({
  companyEmail,
  children,
}: {
  companyEmail: string;
  children: ReactNode;
}) {
  useEffect(() => {
    focusFirstField();

    function onHashChange() {
      focusFirstField();
    }

    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.('a[href="#contact"]');
      if (!link) return;
      requestAnimationFrame(() => {
        focusFirstField();
      });
    }

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className={`${styles.card} ${styles.contactCard}`} id="contact">
      <h3 className={styles.cardTitle}>Contact</h3>
      <ContactForm companyEmail={companyEmail} mode="contact" />
      <div className={styles.channels}>{children}</div>
    </div>
  );
}
