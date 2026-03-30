import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

/* ---------------------------------------------------------------------------
   Card — Versatile card component with multiple visual styles.
   Supports image, icon, title, description, tags, and optional link.
   --------------------------------------------------------------------------- */

const styleVariants = {
  elevated: "bg-white border border-border-light shadow-sm hover:shadow-lg hover:-translate-y-1",
  flat: "bg-surface-secondary hover:bg-gray-200",
  outline: "bg-white border border-border-light hover:border-gray-400",
  dark: "bg-gray-900 text-white border border-gray-800 hover:border-gray-700",
  glass: "glass border border-border-light hover:shadow-lg",
} as const;

const paddingVariants = {
  none: "",
  sm: "p-5",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-10",
} as const;

interface CardProps {
  // Content
  image?: string;
  imageAlt?: string;
  imageAspect?: string;
  icon?: React.ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  // Style
  variant?: keyof typeof styleVariants;
  padding?: keyof typeof paddingVariants;
  rounded?: string;
  // Behavior
  href?: string;
  showArrow?: boolean;
  className?: string;
}

export function Card({
  image,
  imageAlt = "",
  imageAspect = "aspect-[16/10]",
  icon,
  eyebrow,
  title,
  description,
  children,
  variant = "elevated",
  padding = "md",
  rounded = "rounded-2xl",
  href,
  showArrow = false,
  className,
}: CardProps) {
  const content = (
    <>
      {/* Image */}
      {image && (
        <div className={cn(imageAspect, "overflow-hidden bg-surface-secondary")}>
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover transition-premium group-hover:scale-105"
          />
        </div>
      )}

      {/* Body */}
      <div className={cn(!image && paddingVariants[padding], image && "p-6")}>
        {/* Icon */}
        {icon && <div className="mb-4">{icon}</div>}

        {/* Eyebrow */}
        {eyebrow && (
          <p className="text-overline mb-2">{eyebrow}</p>
        )}

        {/* Title */}
        {title && (
          <h3
            className={cn(
              "text-title-sm",
              variant === "dark" ? "text-white" : "text-text-primary"
            )}
          >
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p
            className={cn(
              "mt-2 text-body-sm leading-relaxed",
              variant === "dark" ? "text-white/60" : "text-text-secondary"
            )}
          >
            {description}
          </p>
        )}

        {/* Arrow link indicator */}
        {showArrow && href && (
          <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent group-hover:gap-2.5 transition-all">
            Learn more <ArrowRight className="h-4 w-4" />
          </div>
        )}

        {/* Custom children */}
        {children}
      </div>
    </>
  );

  const classes = cn(
    "group overflow-hidden transition-premium",
    rounded,
    styleVariants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, "block")}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
