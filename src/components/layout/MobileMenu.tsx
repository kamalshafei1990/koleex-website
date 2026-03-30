"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Search, Globe, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, productsMegaMenu } from "@/data/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [productsExpanded, setProductsExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setProductsExpanded(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[55] lg:hidden",
        "transition-opacity duration-300",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <div
        className={cn(
          "absolute top-0 right-0 h-full w-full max-w-sm bg-white",
          "shadow-2xl overflow-y-auto",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-6 h-12 border-b border-border-light">
          <span className="text-sm font-bold tracking-wide text-text-primary">
            KOLEEX
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-secondary transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-text-primary" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="px-6 py-4">
          <ul className="space-y-1">
            {mainNav.map((item) => {
              if (item.label === "Products") {
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => setProductsExpanded(!productsExpanded)}
                      className="flex items-center justify-between w-full py-3 text-base font-medium text-text-primary"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-text-tertiary transition-transform duration-200",
                          productsExpanded && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Products accordion */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        productsExpanded ? "max-h-[800px]" : "max-h-0"
                      )}
                    >
                      <div className="pb-3 pl-4 space-y-4">
                        {productsMegaMenu.map((division) => (
                          <div key={division.slug}>
                            <Link
                              href={`/products/${division.slug}`}
                              className="text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                              onClick={onClose}
                            >
                              {division.division}
                            </Link>
                            <ul className="mt-2 space-y-1.5">
                              {division.categories.map((cat) => (
                                <li key={cat.slug}>
                                  <Link
                                    href={cat.href}
                                    className="block text-sm text-text-secondary hover:text-accent transition-colors"
                                    onClick={onClose}
                                  >
                                    {cat.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link
                          href="/products"
                          className="block text-sm font-medium text-accent"
                          onClick={onClose}
                        >
                          View All Products
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 text-base font-medium text-text-primary hover:text-accent transition-colors"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom utilities */}
        <div className="mt-auto px-6 py-6 border-t border-border-light space-y-3">
          <button className="flex items-center gap-3 w-full py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
            <Search className="h-4 w-4" />
            Search
          </button>
          <button className="flex items-center gap-3 w-full py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
            <Globe className="h-4 w-4" />
            Language
          </button>
          <button className="flex items-center gap-3 w-full py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
            <MapPin className="h-4 w-4" />
            Region
          </button>
        </div>
      </div>
    </div>
  );
}
