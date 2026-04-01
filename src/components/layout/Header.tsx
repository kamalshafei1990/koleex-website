"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Globe, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/data/navigation";
import { getDefaultRegion, type Region, type Language } from "@/data/regions";
import { KoleexLogo } from "@/components/ui/KoleexLogo";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";
import RegionSuggestionModal from "./RegionSuggestionModal";

/* ---------------------------------------------------------------------------
   Header — Premium corporate nav (68px).

   Layout: Logo (left) → Navigation (center) → Tools (right)
   Right order: Search → Region → Language → Sign In
   No AI icon in header.
   --------------------------------------------------------------------------- */

export default function Header() {
  const pathname = usePathname();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [currentRegion, setCurrentRegion] = useState<Region>(getDefaultRegion());
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getDefaultRegion().languages[0]);
  const [showSuggestion, setShowSuggestion] = useState(true);

  const closeMegaMenu = useCallback(() => setMegaMenuOpen(false), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

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
    const defaultLang = region.languages.find((l) => l.code === region.defaultLanguage);
    if (defaultLang) setCurrentLanguage(defaultLang);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 h-[68px]",
          "transition-[background-color,border-color,backdrop-filter] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          scrolled
            ? "bg-black/92 backdrop-blur-2xl backdrop-saturate-[1.8] border-b border-white/[0.07]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav className="max-w-[1200px] mx-auto h-full px-8 flex items-center">

          {/* ── Logo (far left) ── */}
          <Link
            href="/"
            className="shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-[400ms]"
          >
            <KoleexLogo color="white" height={18} />
          </Link>

          {/* ── Desktop Navigation (centered, with right margin to not overlap tools) ── */}
          <div className="hidden lg:flex items-center flex-1 justify-center gap-1 mx-8">
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
                        "group relative px-4 h-[68px] flex items-center",
                        "text-[13px] font-normal tracking-[0.01em]",
                        "transition-colors duration-[400ms]",
                        megaMenuOpen || active
                          ? "text-white"
                          : "text-white/50 hover:text-white/90"
                      )}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute bottom-[16px] left-4 right-4 h-[1.5px] bg-white/40 rounded-full" />
                      )}
                      {!active && (
                        <span className="absolute bottom-[16px] left-4 right-4 h-[1.5px] bg-white/20 rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]" />
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
                    "group relative px-4 h-[68px] flex items-center",
                    "text-[13px] font-normal tracking-[0.01em]",
                    "transition-colors duration-[400ms]",
                    active
                      ? "text-white"
                      : "text-white/50 hover:text-white/90"
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-[16px] left-4 right-4 h-[1.5px] bg-white/40 rounded-full" />
                  )}
                  {!active && (
                    <span className="absolute bottom-[16px] left-4 right-4 h-[1.5px] bg-white/20 rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right Tools: Search → Region → Language → Sign In ── */}
          <div className="flex items-center ml-auto gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-all duration-[400ms]"
              aria-label="Search"
            >
              <Search className="h-[16px] w-[16px]" strokeWidth={1.5} />
            </button>

            {/* Region — links to choose-region page */}
            <Link
              href="/choose-region"
              className="hidden lg:flex items-center gap-[6px] h-9 px-3 rounded-full text-[12px] font-medium text-white/40 hover:text-white/75 hover:bg-white/[0.06] transition-all duration-[400ms]"
            >
              <Globe className="h-[14px] w-[14px]" strokeWidth={1.5} />
              <span>{currentRegion.name}</span>
            </Link>

            {/* Language */}
            <span className="hidden lg:inline text-[11px] font-medium text-white/25 px-1">
              {currentLanguage.code.toUpperCase()}
            </span>

            {/* Divider */}
            <div className="hidden lg:block w-px h-4 bg-white/[0.08]" />

            {/* Sign In */}
            <Link
              href="/contact"
              className="hidden lg:flex h-9 items-center gap-2 px-4 rounded-full text-[12px] font-medium text-white/40 hover:text-white/75 hover:bg-white/[0.06] transition-all duration-[400ms]"
            >
              <User className="h-[14px] w-[14px]" strokeWidth={1.5} />
              <span>Sign In</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full text-white/50 hover:text-white transition-colors duration-[400ms]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
              ) : (
                <Menu className="h-[18px] w-[18px]" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </nav>

        <MegaMenu isOpen={megaMenuOpen} onClose={closeMegaMenu} />
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
      <SearchOverlay isOpen={searchOpen} onClose={closeSearch} />

      {showSuggestion && (
        <RegionSuggestionModal
          currentRegion={currentRegion}
          onAccept={(region) => { handleRegionChange(region); setShowSuggestion(false); }}
          onDismiss={() => setShowSuggestion(false)}
        />
      )}
    </>
  );
}
