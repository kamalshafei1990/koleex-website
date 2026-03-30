"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
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
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
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
        className="absolute inset-0 bg-black/40 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Search panel */}
      <div
        className={cn(
          "relative z-10 w-full max-w-2xl mt-[20vh] mx-4 transition-all duration-300",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        )}
      >
        <div className="glass rounded-2xl shadow-2xl p-6">
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5 text-text-secondary shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Koleex"
              className="flex-1 bg-transparent text-xl font-light text-text-primary placeholder:text-text-tertiary outline-none"
            />
            <button
              onClick={onClose}
              className="shrink-0 p-1 rounded-full hover:bg-surface-secondary transition-colors"
              aria-label="Close search"
            >
              <X className="h-5 w-5 text-text-secondary" />
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-border-light">
            <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
              Quick Links
            </p>
            <div className="flex flex-wrap gap-2">
              {["Products", "Solutions", "Support", "Contact"].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 text-sm text-text-secondary bg-surface-secondary rounded-full hover:bg-border-light transition-colors cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
