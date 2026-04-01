"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronDown, Search, Globe, MapPin, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, productsMegaMenu } from "@/data/navigation";
import { KoleexLogo } from "@/components/ui/KoleexLogo";

/* ---------------------------------------------------------------------------
   MobileMenu — Premium full-screen dark menu.

   Improvements:
   - Smooth slide-down entrance (not just opacity)
   - Staggered link animations
   - Active page indicator
   - Larger touch targets (52px per item)
   - Products accordion with smooth height transition
   - Bottom utility section with region/language/search
   - Smooth backdrop blur
   --------------------------------------------------------------------------- */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Delay for stagger animation
      setTimeout(() => setMounted(true), 50);
    } else {
      document.body.style.overflow = "";
      setMounted(false);
      setProductsExpanded(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        "transition-all duration-[500ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop blur */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-[600ms]",
          isOpen ? "backdrop-blur-xl bg-black/95" : "backdrop-blur-none bg-black/0"
        )}
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        className={cn(
          "relative z-10 h-full flex flex-col",
          "transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-y-0" : "-translate-y-3"
        )}
      >
        {/* ── Header bar ── */}
        <div className="flex items-center justify-between px-6 h-[52px] shrink-0">
          <Link href="/" onClick={onClose} className="opacity-80">
            <KoleexLogo color="white" height={15} />
          </Link>
          <button
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white/[0.06] text-white/70 hover:text-white hover:bg-white/[0.10] transition-all duration-300"
            aria-label="Close menu"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Navigation links ── */}
        <nav className="flex-1 overflow-y-auto px-6 pt-6 pb-8">
          <div className="space-y-0">
            {mainNav.map((item, idx) => {
              const active = isActive(item.href);

              if (item.label === "Products") {
                return (
                  <div key={item.href}>
                    <button
                      onClick={() => setProductsExpanded(!productsExpanded)}
                      className={cn(
                        "flex items-center justify-between w-full h-[52px] text-left",
                        "transition-all duration-[400ms]",
                      )}
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateX(0)" : "translateX(-12px)",
                        transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${80 + idx * 50}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${80 + idx * 50}ms`,
                      }}
                    >
                      <span className={cn(
                        "text-[28px] md:text-[32px] font-semibold tracking-[-0.02em]",
                        active ? "text-white" : "text-white/80"
                      )}>
                        {item.label}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-white/25 transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                          productsExpanded && "rotate-180"
                        )}
                        strokeWidth={1.5}
                      />
                    </button>

                    {/* Products accordion */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-[500ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                        productsExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="pl-1 pb-4 space-y-6">
                        {productsMegaMenu.map((division) => (
                          <div key={division.slug}>
                            <Link
                              href={`/products/${division.slug}`}
                              className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/20 hover:text-white/40 transition-colors duration-300"
                              onClick={onClose}
                            >
                              {division.division}
                            </Link>
                            <ul className="mt-2.5 space-y-1.5">
                              {division.categories.map((cat) => (
                                <li key={cat.slug}>
                                  <Link
                                    href={cat.href}
                                    className="block text-[16px] text-white/50 hover:text-white py-1 transition-colors duration-300"
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
                          className="inline-block text-[14px] font-medium text-white/35 hover:text-white/60 transition-colors duration-300"
                          onClick={onClose}
                        >
                          View all products →
                        </Link>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/[0.05]" />
                  </div>
                );
              }

              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between h-[52px]"
                    onClick={onClose}
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateX(0)" : "translateX(-12px)",
                      transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${80 + idx * 50}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${80 + idx * 50}ms`,
                    }}
                  >
                    <span className={cn(
                      "text-[28px] md:text-[32px] font-semibold tracking-[-0.02em]",
                      active ? "text-white" : "text-white/80"
                    )}>
                      {item.label}
                    </span>
                    {active && (
                      <div className="h-2 w-2 rounded-full bg-white/40" />
                    )}
                  </Link>
                  <div className="h-px bg-white/[0.05]" />
                </div>
              );
            })}
          </div>
        </nav>

        {/* ── Bottom utility bar ── */}
        <div
          className="shrink-0 border-t border-white/[0.06] px-6 py-5"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1) 500ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) 500ms",
          }}
        >
          <div className="grid grid-cols-4 gap-3">
            <button className="flex flex-col items-center gap-2 py-3 rounded-[12px] bg-white/[0.04] hover:bg-white/[0.07] transition-colors duration-300">
              <Search className="h-[18px] w-[18px] text-white/35" strokeWidth={1.5} />
              <span className="text-[10px] font-medium text-white/25">Search</span>
            </button>
            <button className="flex flex-col items-center gap-2 py-3 rounded-[12px] bg-white/[0.04] hover:bg-white/[0.07] transition-colors duration-300">
              <Globe className="h-[18px] w-[18px] text-white/35" strokeWidth={1.5} />
              <span className="text-[10px] font-medium text-white/25">Region</span>
            </button>
            <button className="flex flex-col items-center gap-2 py-3 rounded-[12px] bg-white/[0.04] hover:bg-white/[0.07] transition-colors duration-300">
              <Sparkles className="h-[18px] w-[18px] text-white/35" strokeWidth={1.5} />
              <span className="text-[10px] font-medium text-white/25">AI</span>
            </button>
            <button className="flex flex-col items-center gap-2 py-3 rounded-[12px] bg-white/[0.04] hover:bg-white/[0.07] transition-colors duration-300">
              <User className="h-[18px] w-[18px] text-white/35" strokeWidth={1.5} />
              <span className="text-[10px] font-medium text-white/25">Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
