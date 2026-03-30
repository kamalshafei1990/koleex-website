"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { productsMegaMenu } from "@/data/navigation";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 w-full z-40",
        "transition-all duration-300 ease-out",
        isOpen
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none -translate-y-2"
      )}
      onMouseLeave={onClose}
    >
      <div className="bg-white border-b border-border-light shadow-lg shadow-black/5">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsMegaMenu.map((division) => (
              <div key={division.slug}>
                <Link
                  href={`/products/${division.slug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-text-tertiary hover:text-accent transition-colors"
                  onClick={onClose}
                >
                  {division.division}
                </Link>
                <p className="mt-1.5 text-xs text-text-tertiary/70 leading-relaxed line-clamp-2">
                  {division.description}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {division.categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={category.href}
                        className="text-sm text-text-primary hover:text-accent transition-colors"
                        onClick={onClose}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border-light">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              onClick={onClose}
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
