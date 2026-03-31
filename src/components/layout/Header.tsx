"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sparkles, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/data/navigation";
import { getDefaultRegion, type Region, type Language } from "@/data/regions";
import { KoleexLogo } from "@/components/ui/KoleexLogo";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";
import AIAssistant from "./AIAssistant";
import RegionSelector from "./RegionSelector";
import LanguageSelector from "./LanguageSelector";
import RegionSuggestionModal from "./RegionSuggestionModal";

/* ---------------------------------------------------------------------------
   Header — Premium 48px slim nav.

   Right side order:
   Search → AI → Region → Language → Sign In

   Features:
   - Transparent at top → dark glass on scroll
   - Active page underline via usePathname
   - Hover underline animation on nav links
   - Region + Language selectors (enterprise dropdowns)
   - First-visit region suggestion modal
   --------------------------------------------------------------------------- */

export default function Header() {
  const pathname = usePathname();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiAssistantOpen, setAIAssistantOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Region & Language state */
  const [currentRegion, setCurrentRegion] = useState<Region>(getDefaultRegion());
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    getDefaultRegion().languages[0]
  );
  const [showSuggestion, setShowSuggestion] = useState(true);

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

  const handleRegionChange = (region: Region) => {
    setCurrentRegion(region);
    /* Auto-select default language for new region */
    const defaultLang = region.languages.find(
      (l) => l.code === region.defaultLanguage
    );
    if (defaultLang) setCurrentLanguage(defaultLang);
  };

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };

  const handleSuggestionAccept = (region: Region) => {
    handleRegionChange(region);
    setShowSuggestion(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 h-[52px]",
          "transition-[background-color,border-color,backdrop-filter] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          scrolled
            ? "bg-black/90 backdrop-blur-xl backdrop-saturate-[1.8] border-b border-white/[0.08]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav className="max-w-[1120px] mx-auto h-full px-6 flex items-center">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="shrink-0 mr-6 opacity-80 hover:opacity-100 transition-opacity duration-[400ms]"
          >
            <KoleexLogo color="white" height={19} />
          </Link>

          {/* ── Desktop Navigation (centered) ── */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-1">
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
                        "group relative px-3 h-[52px] flex items-center",
                        "text-[11.5px] font-normal tracking-[0.02em]",
                        "transition-colors duration-[400ms]",
                        megaMenuOpen || active
                          ? "text-white"
                          : "text-white/45 hover:text-white/85"
                      )}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute bottom-[11px] left-3 right-3 h-px bg-white/40 rounded-full" />
                      )}
                      {!active && (
                        <span className="absolute bottom-[11px] left-3 right-3 h-px bg-white/25 rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]" />
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
                    "group relative px-3 h-[52px] flex items-center",
                    "text-[11.5px] font-normal tracking-[0.02em]",
                    "transition-colors duration-[400ms]",
                    active
                      ? "text-white"
                      : "text-white/45 hover:text-white/85"
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-[11px] left-3 right-3 h-px bg-white/40 rounded-full" />
                  )}
                  {!active && (
                    <span className="absolute bottom-[11px] left-3 right-3 h-px bg-white/25 rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right Actions: Search → AI → Region → Language → Sign In ── */}
          <div className="flex items-center gap-0.5 ml-auto">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg text-white/35 hover:text-white/70 hover:bg-white/[0.04] transition-all duration-[400ms]"
              aria-label="Search"
            >
              <Search className="h-[14px] w-[14px]" strokeWidth={1.5} />
            </button>

            {/* AI */}
            <button
              onClick={toggleAI}
              className={cn(
                "hidden lg:flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-[400ms]",
                aiAssistantOpen
                  ? "text-white bg-white/[0.08]"
                  : "text-white/35 hover:text-white/70 hover:bg-white/[0.04]"
              )}
              aria-label="AI Assistant"
            >
              <Sparkles className="h-[14px] w-[14px]" strokeWidth={1.5} />
            </button>

            {/* Divider */}
            <div className="hidden lg:block w-px h-3 bg-white/[0.06] mx-1" />

            {/* Region selector */}
            <div className="hidden lg:block">
              <RegionSelector
                currentRegion={currentRegion}
                onRegionChange={handleRegionChange}
              />
            </div>

            {/* Language selector */}
            <div className="hidden lg:block">
              <LanguageSelector
                currentRegion={currentRegion}
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-3 bg-white/[0.06] mx-1" />

            {/* Sign In / Portal */}
            <button
              className="hidden lg:flex h-8 items-center gap-1.5 px-2.5 rounded-lg text-[11px] font-medium text-white/35 hover:text-white/65 hover:bg-white/[0.04] transition-all duration-[400ms]"
              aria-label="Sign In"
            >
              <User className="h-[13px] w-[13px]" strokeWidth={1.5} />
              <span>Sign In</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg text-white/45 hover:text-white transition-colors duration-[400ms]"
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

        <MegaMenu isOpen={megaMenuOpen} onClose={closeMegaMenu} />
      </header>

      {/* Overlays */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
      <SearchOverlay isOpen={searchOpen} onClose={closeSearch} />
      <AIAssistant isOpen={aiAssistantOpen} onToggle={toggleAI} />

      {/* Region suggestion modal */}
      {showSuggestion && (
        <RegionSuggestionModal
          currentRegion={currentRegion}
          onAccept={handleSuggestionAccept}
          onDismiss={() => setShowSuggestion(false)}
        />
      )}
    </>
  );
}
