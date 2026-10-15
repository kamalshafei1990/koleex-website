"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import styles from "./coming-soon.module.css";

export type ComingSoonTheme = "dark" | "light";

const STORAGE_KEY = "koleex-coming-soon-theme";

const ThemeContext = createContext<{
  theme: ComingSoonTheme;
  setTheme: (theme: ComingSoonTheme) => void;
}>({
  theme: "dark",
  setTheme: () => {},
});

export function useComingSoonTheme() {
  return useContext(ThemeContext);
}

export function ThemeRoot({ className, children }: { className?: string; children: ReactNode }) {
  const [theme, setTheme] = useState<ComingSoonTheme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") setTheme(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [ready, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={className} data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useComingSoonTheme();

  return (
    <div className={styles.themeSwitch} role="group" aria-label="Color theme">
      <button type="button" aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>
        Dark
      </button>
      <button type="button" aria-pressed={theme === "light"} onClick={() => setTheme("light")}>
        Light
      </button>
    </div>
  );
}
