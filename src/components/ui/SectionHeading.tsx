import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   SectionHeading — Eyebrow + Title + Subtitle.
   Dark-first: defaults to white/silver text on dark backgrounds.
   --------------------------------------------------------------------------- */

interface SectionHeadingProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "center" | "left";
  size?: "sm" | "md" | "lg";
  light?: boolean;
  className?: string;
}

const titleSizes = {
  sm: "text-headline-sm",
  md: "text-headline",
  lg: "text-display-sm",
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  size = "md",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14 md:mb-18",
        align === "center" && "mx-auto text-center max-w-3xl",
        align === "left" && "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p className={cn("text-overline mb-4", light ? "!text-[#6e6e73]" : "")}>
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className={cn(
          titleSizes[size],
          light ? "text-[#1d1d1f]" : "text-gradient-silver"
        )}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={cn(
          "text-subtitle mt-5 !leading-[1.75]",
          light ? "!text-[#6e6e73]" : ""
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
