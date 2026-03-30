import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   CTASection — Call-to-action section with dark/light variants.
   Used as a conversion block between or at the end of page sections.
   --------------------------------------------------------------------------- */

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  background?: "dark" | "black" | "accent" | "light";
  align?: "center" | "left";
  className?: string;
}

export function CTASection({
  eyebrow,
  title,
  subtitle,
  cta,
  secondaryCta,
  background = "dark",
  align = "center",
  className,
}: CTASectionProps) {
  const isDark = background === "dark" || background === "black" || background === "accent";

  const bgMap = {
    dark: "bg-surface-dark",
    black: "bg-black",
    accent: "bg-accent",
    light: "bg-surface-secondary",
  };

  return (
    <section className={cn(bgMap[background], "py-20 md:py-32", className)}>
      <Container>
        <div
          className={cn(
            align === "center" && "text-center mx-auto max-w-3xl",
            align === "left" && "max-w-2xl"
          )}
        >
          {eyebrow && (
            <p className={cn("text-overline mb-4", isDark ? "text-accent-light" : "text-accent")}>
              {eyebrow}
            </p>
          )}

          <h2 className={cn("text-headline", isDark ? "text-white" : "text-text-primary")}>
            {title}
          </h2>

          {subtitle && (
            <p className={cn("text-subtitle mt-4", isDark ? "text-white/60" : "text-text-secondary")}>
              {subtitle}
            </p>
          )}

          <div
            className={cn(
              "mt-8 md:mt-10 flex flex-wrap gap-4",
              align === "center" && "justify-center"
            )}
          >
            <Button
              href={cta.href}
              variant={isDark ? "primary" : "primary"}
              size="lg"
              arrow
            >
              {cta.label}
            </Button>
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
        </div>
      </Container>
    </section>
  );
}
