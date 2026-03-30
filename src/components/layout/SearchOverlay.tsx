"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   SearchOverlay — Full-screen search modal with glass backdrop.
   Shows quick links and trending searches as placeholder content.
   --------------------------------------------------------------------------- */

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickLinks = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Support", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const trending = [
  "Industrial Automation",
  "Energy Storage",
  "IoT Platform",
  "Advanced Composites",
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex items-start justify-center transition-all duration-300",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Search panel */}
      <div
        className={cn(
          "relative z-10 w-full max-w-2xl mt-[15vh] mx-5 transition-all duration-300",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        )}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-4 px-6 py-5 border-b border-border-light">
            <Search className="h-5 w-5 text-text-tertiary shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products, solutions, stories..."
              className="flex-1 bg-transparent text-lg font-light text-text-primary placeholder:text-text-quaternary outline-none"
            />
            <button
              onClick={onClose}
              className="shrink-0 h-8 w-8 flex items-center justify-center rounded-full hover:bg-surface-secondary transition-premium"
              aria-label="Close search"
            >
              <X className="h-4 w-4 text-text-secondary" />
            </button>
          </div>

          {/* Quick links */}
          <div className="px-6 py-5">
            <p className="text-overline mb-3">Quick Links</p>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="px-4 py-2 text-[13px] font-medium text-text-secondary bg-surface-secondary rounded-full hover:bg-gray-200 transition-premium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div className="px-6 pb-6">
            <p className="text-overline mb-3">Trending</p>
            <ul className="space-y-1">
              {trending.map((term) => (
                <li key={term}>
                  <button className="flex items-center justify-between w-full py-2 px-3 text-[13px] text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-premium group">
                    {term}
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
