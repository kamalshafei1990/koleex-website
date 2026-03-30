"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   PageHero — Full-width hero banner used at the top of every page.
   Supports breadcrumbs, title, subtitle, CTA buttons, and background variants.
   --------------------------------------------------------------------------- */

const bgVariants = {
  dark: "bg-surface-dark",
  black: "bg-black",
  light: "bg-surface-secondary",
  accent: "bg-accent",
} as const;

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  background?: keyof typeof bgVariants;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "center";
  cta?: { label: string; href: string; variant?: "primary" | "dark-outline" };
  secondaryCta?: { label: string; href: string };
  children?: React.ReactNode;
  className?: string;
}

const sizes = {
  sm: "pt-28 pb-12 md:pt-32 md:pb-16",
  md: "pt-28 pb-16 md:pt-36 md:pb-24",
  lg: "pt-32 pb-20 md:pt-40 md:pb-32",
  xl: "pt-36 pb-24 md:pt-48 md:pb-40",
} as const;

export function PageHero({
  title,
  subtitle,
  breadcrumb,
  background = "dark",
  size = "md",
  align = "left",
  cta,
  secondaryCta,
  children,
  className,
}: PageHeroProps) {
  const isDark = background === "dark" || background === "black" || background === "accent";

  return (
    <section className={cn(bgVariants[background], sizes[size], className)}>
      <Container>
        <div className={cn(align === "center" && "text-center mx-auto max-w-4xl")}>
          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm">
                {breadcrumb.map((item, index) => {
                  const isLast = index === breadcrumb.length - 1;
                  return (
                    <li key={item.href} className="flex items-center gap-1.5">
                      {index > 0 && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="shrink-0"
                        >
                          <path
                            d="M6 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={isDark ? "text-white/30" : "text-gray-400"}
                          />
                        </svg>
                      )}
                      {isLast ? (
                        <span className={cn("font-medium", isDark ? "text-white" : "text-text-primary")}>
                          {item.label}
                        </span>
                      ) : (
                        <a
                          href={item.href}
                          className={cn(
                            "transition-premium",
                            isDark
                              ? "text-white/50 hover:text-white/80"
                              : "text-text-tertiary hover:text-text-primary"
                          )}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          {/* Title */}
          <h1
            className={cn(
              "text-display",
              isDark ? "text-white" : "text-text-primary"
            )}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              className={cn(
                "mt-5 md:mt-6 text-subtitle max-w-2xl",
                isDark ? "text-white/60" : "text-text-secondary",
                align === "center" && "mx-auto"
              )}
            >
              {subtitle}
            </p>
          )}

          {/* CTA Buttons */}
          {(cta || secondaryCta) && (
            <div className={cn("mt-8 md:mt-10 flex flex-wrap gap-4", align === "center" && "justify-center")}>
              {cta && (
                <Button
                  href={cta.href}
                  variant={cta.variant || (isDark ? "primary" : "primary")}
                  size="lg"
                  arrow
                >
                  {cta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  variant={isDark ? "dark-outline" : "outline"}
                  size="lg"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}

          {/* Custom content slot */}
          {children}
        </div>
      </Container>
    </section>
  );
}
