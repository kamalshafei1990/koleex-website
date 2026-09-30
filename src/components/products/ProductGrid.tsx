"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { NoProducts, ProductCard } from "@/components/products/ProductCard";
import type { ProductCardData, ProductFilter } from "@/lib/product-list";

/* A product list: the first page comes with the (static) page, and "Show
   more" brings the next ones from /api/products, as many as there are. */
export function ProductGrid({ items: first, total, filter, emptyText }: {
  items: ProductCardData[];
  total: number;
  filter: ProductFilter;
  emptyText: string;
}) {
  const [items, setItems] = useState(first);
  const [page, setPage] = useState(1);
  const [state, setState] = useState<"idle" | "loading" | "failed" | "done">("idle");

  if (items.length === 0) return <NoProducts text={emptyText} />;

  const more = async () => {
    setState("loading");
    try {
      const sp = new URLSearchParams(Object.entries(filter).filter((e): e is [string, string] => !!e[1]));
      sp.set("page", String(page + 1));
      const res = await fetch(`/api/products?${sp}`);
      if (!res.ok) throw new Error(String(res.status));
      const next = ((await res.json()) as { items?: ProductCardData[] }).items ?? [];
      const seen = new Set(items.map((p) => p.slug));
      const fresh = next.filter((p) => !seen.has(p.slug));
      setItems(items.concat(fresh));
      setPage(page + 1);
      /* The list changed under us (a product left): stop rather than ask forever. */
      setState(fresh.length ? "idle" : "done");
    } catch {
      setState("failed");
    }
  };

  const left = Math.max(0, total - items.length);
  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <AnimatedSection key={p.slug}><ProductCard product={p} /></AnimatedSection>
        ))}
      </div>
      {left > 0 && state !== "done" ? (
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-sm text-white/40">Showing {items.length} of {total}</p>
          {state === "failed" ? <p className="text-sm text-white/60">More products could not be loaded. Try again.</p> : null}
          <Button onClick={more} disabled={state === "loading"} variant="secondary" size="md" aria-busy={state === "loading"}>
            {state === "loading" ? "Loading…" : `Show ${Math.min(left, 24)} more`}
          </Button>
        </div>
      ) : null}
    </>
  );
}
