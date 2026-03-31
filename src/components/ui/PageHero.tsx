"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   PageHero — Dark-first page header with breadcrumbs.
   Used on all inner pages (Products, About, Careers, etc.).
   Always black background with silver gradient text.
   --------------------------------------------------------------------------- */

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "pt-12 pb-12 md:pt-16 md:pb-16",
  md: "pt-16 pb-16 md:pt-24 md:pb-24",
  lg: "pt-20 pb-20 md:pt-32 md:pb-32",
};

export function PageHero({
  title,
  subtitle,
  breadcrumb,
  size = "md",
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative bg-black overflow-hidden hero-gradient-alt", sizes[size], className)}>
      {/* Ambient orb */}
      <div className="orb orb-silver w-[500px] h-[500px] -top-32 left-1/2 -translate-x-1/2 opacity-50" />

      <Container className="relative z-10">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px]">
              {breadcrumb.map((item, index) => {
                const isLast = index === breadcrumb.length - 1;
                return (
                  <li key={item.href} className="flex items-center gap-1.5">
                    {index > 0 && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20" />
                      </svg>
                    )}
                    {isLast ? (
                      <span className="font-medium text-white/80">{item.label}</span>
                    ) : (
                      <Link href={item.href} className="text-white/35 hover:text-white/60 transition-colors duration-300">
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <h1 className="text-display text-gradient-hero">{title}</h1>

        {subtitle && (
          <p className="mt-6 max-w-2xl text-subtitle !leading-[1.75]">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
