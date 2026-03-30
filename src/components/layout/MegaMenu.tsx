"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { productsMegaMenu } from "@/data/navigation";

/* ---------------------------------------------------------------------------
   MegaMenu — Guidelines-aligned dark dropdown.
   rgba(0,0,0,0.92) glass, silver category links, subtle borders.
   --------------------------------------------------------------------------- */

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[-1] bg-black/40 backdrop-blur-sm transition-opacity duration-400",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "absolute top-full left-0 w-full transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          isOpen
            ? "opacity-100 pointer-events-auto max-h-[600px]"
            : "opacity-0 pointer-events-none max-h-0"
        )}
        onMouseLeave={onClose}
      >
        <div className="nav-glass border-b border-white/[0.08]">
          <div className="max-w-[980px] mx-auto px-5 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {productsMegaMenu.map((division) => (
                <div key={division.slug}>
                  <Link
                    href={`/products/${division.slug}`}
                    className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/30 hover:text-white/50 transition-colors duration-300"
                    onClick={onClose}
                  >
                    {division.division}
                  </Link>
                  <ul className="mt-3 space-y-2">
                    {division.categories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={cat.href}
                          className="text-[14px] font-semibold text-white/80 hover:text-white transition-colors duration-300"
                          onClick={onClose}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-white/[0.06]">
              <Link
                href="/products"
                className="text-[14px] font-medium text-silver-dark hover:text-silver transition-colors duration-300"
                onClick={onClose}
              >
                Explore all products →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
