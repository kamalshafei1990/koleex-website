"use client";

import { useEffect } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import styles from "./coming-soon.module.css";

function focusFirstField() {
  if (window.location.hash !== "#contact") return;
  document.getElementById("cf-name")?.focus();
}

export function ContactCard({ companyEmail }: { companyEmail: string }) {
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
    <div className={`${styles.card} ${styles.contactCard}`}>
      <ContactForm companyEmail={companyEmail} mode="contact" />
    </div>
  );
}
