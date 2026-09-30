"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/i18n/LangProvider";
import type { ProductCardData } from "@/lib/product-list";

/* ---------------------------------------------------------------------------
   SearchOverlay — the header's search: the Hub's products as the visitor
   types (name, model code or SKU, in any language — the bridge's own
   search, which never reads supplier data), each opening its page; Enter
   opens every result on /<lang>/search. Replaced placeholder "trending"
   terms that searched nothing (30/09/2026).
   --------------------------------------------------------------------------- */

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickLinks = [
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const { lang, t, L } = useLang();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  /* The last answer, with the words it answers — shown only while they are
     still the words in the box. */
  const [found, setFound] = useState<{ term: string; items: ProductCardData[]; total: number } | null>(null);
  const term = q.trim();
  const results = term.length >= 2 && found?.term === term ? found : null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (term.length < 2) return;
    let live = true;
    const h = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(term)}&lang=${lang}&size=8`)
        .then((r) => (r.ok ? r.json() : { items: [], total: 0 }))
        .then((j: { items?: ProductCardData[]; total?: number }) => { if (live) setFound({ term, items: j.items ?? [], total: j.total ?? 0 }); })
        .catch(() => { if (live) setFound({ term, items: [], total: 0 }); });
    }, 250);
    return () => { live = false; clearTimeout(h); };
  }, [term, lang]);

  const openAll = () => {
    if (term.length < 2) return;
    onClose();
    router.push(L(`/search?q=${encodeURIComponent(term)}`));
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex items-start justify-center transition-all duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xl" onClick={onClose} />

      <div
        className={cn(
          "relative z-10 w-full max-w-2xl mt-[15vh] mx-5 transition-all duration-300",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        )}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center gap-4 px-6 py-5 border-b border-border-light">
            <Search className="h-5 w-5 text-text-tertiary shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") openAll(); }}
              placeholder={t("Search products by name or model")}
              aria-label={t("Search")}
              className="flex-1 bg-transparent text-lg font-light text-text-primary placeholder:text-text-quaternary outline-none"
            />
            <button
              onClick={onClose}
              className="shrink-0 h-8 w-8 flex items-center justify-center rounded-full hover:bg-surface-secondary transition-premium"
              aria-label={t("Close")}
            >
              <X className="h-4 w-4 text-text-secondary" />
            </button>
          </div>

          {results ? (
            <div className="px-3 py-3">
              {results.items.length === 0 ? (
                <p className="px-3 py-6 text-center text-[14px] text-text-tertiary">{t("No product matches “{q}”.", { q: term })}</p>
              ) : (
                <ul className="flex flex-col">
                  {results.items.map((p) => (
                    <li key={p.slug}>
                      <Link href={L(`/product/${p.slug}`)} onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-surface-secondary transition-premium">
                        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-surface-secondary">
                          {p.image ? <Image src={p.image} alt="" fill sizes="40px" className="object-contain p-1" /> : null}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14px] font-medium text-text-primary">{p.name}</span>
                          {p.tagline ? <span className="block truncate text-[12px] text-text-tertiary">{p.tagline}</span> : null}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {results.total > results.items.length ? (
                <button onClick={openAll} className="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-medium text-text-secondary hover:bg-surface-secondary">
                  {t("See all {n} results", { n: results.total })}
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </button>
              ) : null}
            </div>
          ) : (
            <div className="px-6 py-5">
              <div className="flex flex-wrap gap-2">
                {quickLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={L(item.href)}
                    onClick={onClose}
                    className="px-4 py-2 text-[13px] font-medium text-text-secondary bg-surface-secondary rounded-full hover:bg-gray-200 transition-premium"
                  >
                    {t(item.label)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
