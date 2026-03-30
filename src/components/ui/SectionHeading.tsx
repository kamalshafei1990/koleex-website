import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   SectionHeading — Eyebrow + Title + Subtitle pattern used across sections.
   Consistent vertical rhythm and alignment.
   --------------------------------------------------------------------------- */

interface SectionHeadingProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "center" | "left";
  size?: "sm" | "md" | "lg";
  dark?: boolean;
  className?: string;
}

const titleSizes = {
  sm: "text-headline-sm",
  md: "text-headline",
  lg: "text-display-sm",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  size = "md",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto text-center max-w-3xl",
        align === "left" && "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-overline mb-3 md:mb-4",
            dark ? "text-accent-light" : "text-accent"
          )}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className={cn(
            titleSizes[size],
            dark ? "text-text-inverse" : "text-text-primary"
          )}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={cn(
            "text-subtitle mt-4 md:mt-5",
            dark ? "text-text-inverse/70" : "text-text-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
