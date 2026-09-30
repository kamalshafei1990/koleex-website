"use client";

/* The header's language switch: the current region's languages first, then
   every other language, and the page opens in the one picked (the same
   page, its prefix changed). The choice is remembered by the middleware. */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { languages, type Region } from "@/data/regions";
import { switchLang } from "@/i18n/config";
import { useLang } from "@/i18n/LangProvider";

export default function LangSwitch({ region }: { region: Region }) {
  const { lang, t } = useLang();
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", close); };
  }, [open]);

  const first = region.languages.map((l) => l.code);
  const rest = Object.keys(languages).filter((c) => !first.includes(c));
  const item = (code: string) => (
    <li key={code}>
      <a
        href={switchLang(pathname, code)}
        lang={code}
        className={`flex items-center justify-between gap-3 rounded-lg px-3 py-1.5 text-[12px] ${code === lang ? "bg-white/[0.08] text-white" : "text-white/55 hover:bg-white/[0.05] hover:text-white/85"}`}
      >
        <span>{languages[code].name}</span>
        <span className="text-[10px] uppercase text-white/25">{code}</span>
      </a>
    </li>
  );

  return (
    <div ref={box} className="relative hidden lg:block">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={t("Select language")}
        className="h-9 px-2 rounded-full text-[11px] font-medium uppercase text-white/35 hover:text-white/75 hover:bg-white/[0.06] transition-all duration-[400ms]"
      >
        {lang}
      </button>
      {open ? (
        <div className="absolute end-0 top-11 z-50 max-h-[70vh] w-56 overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#0c0c0c]/[0.97] p-2 shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-[40px]">
          <ul className="flex flex-col gap-0.5">{first.map(item)}</ul>
          <div className="my-2 h-px bg-white/[0.06]" />
          <ul className="flex flex-col gap-0.5">{rest.map(item)}</ul>
        </div>
      ) : null}
    </div>
  );
}
