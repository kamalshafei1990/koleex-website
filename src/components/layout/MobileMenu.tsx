"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronRight, Search, Globe, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, productsMegaMenu } from "@/data/navigation";
import { KoleexLogo } from "@/components/ui/KoleexLogo";

/* ---------------------------------------------------------------------------
   MobileMenu — Apple.com-style dark full-screen mobile navigation.
   --------------------------------------------------------------------------- */

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
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        "transition-opacity duration-400",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Dark overlay background */}
      <div
        className="absolute inset-0 nav-glass"
        style={{ background: "rgba(22, 22, 23, 0.97)" }}
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-10 h-full overflow-y-auto",
          "transition-transform duration-400 ease-out",
          isOpen ? "translate-y-0" : "-translate-y-4"
        )}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 h-[44px]">
          <KoleexLogo color="white" height={10} />
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-opacity duration-300"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="px-5 mt-2">
          <div className="border-t border-white/[0.08]">
            {mainNav.map((item) => {
              if (item.label === "Products") {
                return (
                  <div key={item.href} className="border-b border-white/[0.08]">
                    <button
                      onClick={() => setProductsExpanded(!productsExpanded)}
                      className="flex items-center justify-between w-full py-3 text-[17px] font-semibold text-white/90"
                    >
                      {item.label}
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 text-white/40 transition-transform duration-300",
                          productsExpanded && "rotate-90"
                        )}
                        strokeWidth={1.5}
                      />
                    </button>

                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-400",
                        productsExpanded ? "max-h-[800px] pb-3" : "max-h-0"
                      )}
                    >
                      <div className="pl-4 space-y-4">
                        {productsMegaMenu.map((division) => (
                          <div key={division.slug}>
                            <Link
                              href={`/products/${division.slug}`}
                              className="text-[12px] font-medium uppercase tracking-wider text-white/30"
                              onClick={onClose}
                            >
                              {division.division}
                            </Link>
                            <ul className="mt-1.5 space-y-1">
                              {division.categories.map((cat) => (
                                <li key={cat.slug}>
                                  <Link
                                    href={cat.href}
                                    className="block text-[15px] text-white/70 hover:text-white transition-opacity duration-300 py-0.5"
                                    onClick={onClose}
                                  >
                                    {cat.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between py-3 text-[17px] font-semibold text-white/90 border-b border-white/[0.08]"
                  onClick={onClose}
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-white/30" strokeWidth={1.5} />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Utility links */}
        <div className="px-5 mt-6 space-y-4">
          <button className="flex items-center gap-3 text-[14px] text-white/50 hover:text-white/80 transition-opacity duration-300">
            <Search className="h-4 w-4" strokeWidth={1.5} />
            Search koleex.com
          </button>
          <button className="flex items-center gap-3 text-[14px] text-white/50 hover:text-white/80 transition-opacity duration-300">
            <Globe className="h-4 w-4" strokeWidth={1.5} />
            English
          </button>
          <button className="flex items-center gap-3 text-[14px] text-white/50 hover:text-white/80 transition-opacity duration-300">
            <MapPin className="h-4 w-4" strokeWidth={1.5} />
            Global
          </button>
          <button className="flex items-center gap-3 text-[14px] text-[#2997ff] hover:text-[#2997ff]/80 transition-opacity duration-300">
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
}
