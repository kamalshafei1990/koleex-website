"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Search, Globe, MapPin, Sparkles, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/data/navigation";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";
import AIAssistant from "./AIAssistant";

export default function Header() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiAssistantOpen, setAIAssistantOpen] = useState(false);

  const closeMegaMenu = useCallback(() => setMegaMenuOpen(false), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const toggleAIAssistant = useCallback(
    () => setAIAssistantOpen((prev) => !prev),
    []
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-12 glass border-b border-border-light">
        <div className="max-w-[1200px] mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold tracking-wide text-text-primary shrink-0"
          >
            KOLEEX
          </Link>

          {/* Desktop nav - center */}
          <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
            {mainNav.map((item) => {
              if (item.label === "Products") {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-xs font-medium text-text-secondary hover:text-text-primary transition-colors",
                        megaMenuOpen && "text-text-primary"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        setMegaMenuOpen(!megaMenuOpen);
                      }}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-text-secondary" />
            </button>

            <button
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              aria-label="Language"
            >
              <Globe className="h-4 w-4 text-text-secondary" />
            </button>

            <button
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              aria-label="Region"
            >
              <MapPin className="h-4 w-4 text-text-secondary" />
            </button>

            <button
              onClick={toggleAIAssistant}
              className={cn(
                "hidden lg:flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 transition-colors",
                aiAssistantOpen && "bg-accent/10"
              )}
              aria-label="AI Assistant"
            >
              <Sparkles
                className={cn(
                  "h-4 w-4",
                  aiAssistantOpen ? "text-accent" : "text-text-secondary"
                )}
              />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-8 w-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4 text-text-primary" />
              ) : (
                <Menu className="h-4 w-4 text-text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <MegaMenu isOpen={megaMenuOpen} onClose={closeMegaMenu} />
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={closeSearch} />

      {/* AI Assistant */}
      <AIAssistant isOpen={aiAssistantOpen} onToggle={toggleAIAssistant} />
    </>
  );
}
