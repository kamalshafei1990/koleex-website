"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sparkles, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/data/navigation";
import { KoleexLogo } from "@/components/ui/KoleexLogo";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";
import AIAssistant from "./AIAssistant";

/* ---------------------------------------------------------------------------
   Header — Premium slim navigation bar.

   - 48px height (slim, Apple-like)
   - Fully transparent at top → dark glass on scroll
   - Smooth 600ms transition for background change
   - Active page indicator (subtle underline)
   - Hover underline animation on nav links
   - 12px font, 0.02em tracking, weight 400 → brighter on hover
   - Subtle bottom border appears on scroll
   --------------------------------------------------------------------------- */

export default function Header() {
  const pathname = usePathname();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiAssistantOpen, setAIAssistantOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("EN");
  const [scrolled, setScrolled] = useState(false);

  const closeMegaMenu = useCallback(() => setMegaMenuOpen(false), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const toggleAI = useCallback(() => setAIAssistantOpen((p) => !p), []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (megaMenuOpen && window.scrollY > 60) setMegaMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [megaMenuOpen]);

  /* Check if a nav item is active */
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 h-[48px]",
          "transition-[background-color,border-color,backdrop-filter] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          scrolled
            ? "bg-black/90 backdrop-blur-xl backdrop-saturate-[1.8] border-b border-white/[0.08]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav className="max-w-[1024px] mx-auto h-full px-6 flex items-center">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="shrink-0 mr-8 opacity-80 hover:opacity-100 transition-opacity duration-[400ms]"
          >
            <KoleexLogo color="white" height={13} />
          </Link>

          {/* ── Desktop Navigation (centered) ── */}
          <div className="hidden lg:flex items-center flex-1 justify-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(item.href);

              if (item.label === "Products") {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                  >
                    <button
                      onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                      className={cn(
                        "relative px-3 h-[48px] flex items-center",
                        "text-[12px] font-normal tracking-[0.02em]",
                        "transition-colors duration-[400ms]",
                        megaMenuOpen || active
                          ? "text-white"
                          : "text-white/50 hover:text-white/90"
                      )}
                    >
                      {item.label}
                      {/* Active indicator */}
                      {active && (
                        <span className="absolute bottom-[10px] left-3 right-3 h-px bg-white/40 rounded-full" />
                      )}
                      {/* Hover underline (only when not active) */}
                      {!active && (
                        <span className="absolute bottom-[10px] left-3 right-3 h-px bg-white/30 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]" />
                      )}
                    </button>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative px-3 h-[48px] flex items-center",
                    "text-[12px] font-normal tracking-[0.02em]",
                    "transition-colors duration-[400ms]",
                    active
                      ? "text-white"
                      : "text-white/50 hover:text-white/90"
                  )}
                >
                  {item.label}
                  {/* Active indicator */}
                  {active && (
                    <span className="absolute bottom-[10px] left-3 right-3 h-px bg-white/40 rounded-full" />
                  )}
                  {/* Hover underline */}
                  {!active && (
                    <span className="absolute bottom-[10px] left-3 right-3 h-px bg-white/25 rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-1 ml-auto lg:ml-8">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-full text-white/40 hover:text-white/80 hover:bg-white/[0.05] transition-all duration-[400ms]"
              aria-label="Search"
            >
              <Search className="h-[14px] w-[14px]" strokeWidth={1.5} />
            </button>

            {/* AI */}
            <button
              onClick={toggleAI}
              className={cn(
                "hidden lg:flex h-8 w-8 items-center justify-center rounded-full transition-all duration-[400ms]",
                aiAssistantOpen
                  ? "text-white bg-white/[0.08]"
                  : "text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
              )}
              aria-label="AI Assistant"
            >
              <Sparkles className="h-[14px] w-[14px]" strokeWidth={1.5} />
            </button>

            {/* Divider */}
            <div className="hidden lg:block w-px h-3.5 bg-white/[0.08] mx-1.5" />

            {/* Language pill */}
            <div className="hidden lg:flex items-center border border-white/[0.08] rounded-full p-[2px] bg-white/[0.02]">
              {["EN", "中文", "العربية"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={cn(
                    "h-[24px] px-3 rounded-full text-[10px] font-semibold transition-all duration-[350ms]",
                    activeLang === lang
                      ? "bg-white text-black"
                      : "text-white/30 hover:text-white/50"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-8 w-8 flex items-center justify-center rounded-full text-white/50 hover:text-white transition-colors duration-[400ms]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-[16px] w-[16px]" strokeWidth={1.5} />
              ) : (
                <Menu className="h-[16px] w-[16px]" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </nav>

        {/* Mega Menu */}
        <MegaMenu isOpen={megaMenuOpen} onClose={closeMegaMenu} />
      </header>

      {/* Overlays */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
      <SearchOverlay isOpen={searchOpen} onClose={closeSearch} />
      <AIAssistant isOpen={aiAssistantOpen} onToggle={toggleAI} />
    </>
  );
}
