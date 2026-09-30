"use client";

/* The page's language for client components: useLang() gives the language,
   its words (t) and its paths (L). Set once by the [lang] layout. */

import { createContext, useContext } from "react";
import { localize } from "@/i18n/config";
import { translate } from "@/i18n/words";

const LangContext = createContext<string>("en");

export function LangProvider({ lang, children }: { lang: string; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang() {
  const lang = useContext(LangContext);
  return {
    lang,
    t: (text: string, vars?: Record<string, string | number>) => translate(text, lang, vars),
    L: (href: string) => localize(href, lang),
  };
}
