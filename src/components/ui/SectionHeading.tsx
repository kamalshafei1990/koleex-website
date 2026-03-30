import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      {title && <h2 className="text-headline">{title}</h2>}
      {subtitle && <p className="text-subtitle mt-4">{subtitle}</p>}
    </div>
  );
}
