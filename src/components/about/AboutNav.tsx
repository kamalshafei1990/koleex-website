"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { aboutPages } from "@/data/about";

/* ---------------------------------------------------------------------------
   AboutNav — Horizontal sub-navigation for the About section.
   Scrollable on mobile, fixed categories on desktop.
   --------------------------------------------------------------------------- */

export function AboutNav() {
  const pathname = usePathname();

  return (
    <div className="bg-black border-b border-white/[0.06] sticky top-[var(--header-height)] z-30">
      <div className="max-w-[1120px] mx-auto px-6">
        <nav className="flex items-center gap-0 overflow-x-auto scrollbar-hide py-0 -mx-2">
          {/* Main About link */}
          <Link
            href="/about"
            className={cn(
              "shrink-0 px-3 py-3 text-[11.5px] font-medium tracking-[0.01em] border-b-[2px] transition-colors duration-300",
              pathname === "/about"
                ? "text-white border-white/50"
                : "text-white/35 border-transparent hover:text-white/65"
            )}
          >
            Overview
          </Link>
          {aboutPages.slice(1).map((page) => (
            <Link
              key={page.slug}
              href={`/about/${page.slug}`}
              className={cn(
                "shrink-0 px-3 py-3 text-[11.5px] font-medium tracking-[0.01em] border-b-[2px] transition-colors duration-300 whitespace-nowrap",
                pathname === `/about/${page.slug}`
                  ? "text-white border-white/50"
                  : "text-white/35 border-transparent hover:text-white/65"
              )}
            >
              {page.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
