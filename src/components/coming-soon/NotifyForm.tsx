"use client";

import { useState } from "react";
import styles from "./coming-soon.module.css";

/* Client-side only. Nothing is stored or sent — the list is not wired yet. */
export function NotifyForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className={styles.success} role="status">
        You&apos;re on the list. We&apos;ll send one email when the new site goes live.
      </p>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        const value = email.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return;
        setDone(true);
      }}
    >
      <input
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        placeholder="Business email"
        aria-label="Business email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Notify me</button>
    </form>
  );
}
