"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Search, Sparkles, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/data/navigation";
import { KoleexLogo } from "@/components/ui/KoleexLogo";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";
import AIAssistant from "./AIAssistant";

/* ---------------------------------------------------------------------------
   Header — Premium dark glass nav with scroll-aware blur enhancement.
   52px, rgba(0,0,0,0.85) → rgba(0,0,0,0.95) on scroll.
   --------------------------------------------------------------------------- */

export default function Header() {
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
      setScrolled(window.scrollY > 20);
      if (megaMenuOpen && window.scrollY > 50) setMegaMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [megaMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 h-[52px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          scrolled ? "nav-glass-scrolled" : "nav-glass",
          "border-b border-white/[0.06]"
        )}
      >
        <nav className="max-w-[980px] mx-auto h-full px-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center opacity-70 hover:opacity-100 transition-opacity duration-400">
            <KoleexLogo color="white" height={15} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0">
            {mainNav.map((item) => {
              if (item.label === "Products") {
                return (
                  <div key={item.href} className="relative" onMouseEnter={() => setMegaMenuOpen(true)}>
                    <button
                      onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                      className={cn(
                        "px-3.5 h-[52px] flex items-center text-[13px] font-medium transition-all duration-400",
                        megaMenuOpen ? "text-white" : "text-white/55 hover:text-white/90"
                      )}
                    >
                      {item.label}
                    </button>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3.5 h-[52px] flex items-center text-[13px] font-medium text-white/55 hover:text-white/90 transition-colors duration-400"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full text-white/45 hover:text-white/85 hover:bg-white/[0.06] transition-all duration-400"
              aria-label="Search"
            >
              <Search className="h-[15px] w-[15px]" strokeWidth={1.5} />
            </button>

            <button
              onClick={toggleAI}
              className={cn(
                "hidden lg:flex h-9 w-9 items-center justify-center rounded-full transition-all duration-400",
                aiAssistantOpen
                  ? "text-white bg-white/[0.08]"
                  : "text-white/45 hover:text-white/85 hover:bg-white/[0.06]"
              )}
              aria-label="AI Assistant"
            >
              <Sparkles className="h-[15px] w-[15px]" strokeWidth={1.5} />
            </button>

            {/* Language pill */}
            <div className="hidden lg:flex items-center border border-white/[0.10] rounded-full p-[3px] bg-white/[0.03]">
              {["EN", "中文", "العربية"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={cn(
                    "h-[26px] px-3.5 rounded-full text-[11px] font-semibold transition-all duration-350",
                    activeLang === lang
                      ? "bg-white text-black"
                      : "text-white/35 hover:text-white/55"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 flex items-center justify-center rounded-full text-white/60 hover:text-white transition-colors duration-400"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-[17px] w-[17px]" strokeWidth={1.5} />
              ) : (
                <Menu className="h-[17px] w-[17px]" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </nav>
        <MegaMenu isOpen={megaMenuOpen} onClose={closeMegaMenu} />
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
      <SearchOverlay isOpen={searchOpen} onClose={closeSearch} />
      <AIAssistant isOpen={aiAssistantOpen} onToggle={toggleAI} />
    </>
  );
}
