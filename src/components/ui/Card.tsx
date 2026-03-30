import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps {
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Card({
  image,
  imageAlt = "",
  title,
  description,
  href,
  className,
  children,
}: CardProps) {
  const content = (
    <>
      {image && (
        <div className="aspect-[16/10] overflow-hidden bg-surface-secondary">
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover transition-premium group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        {title && (
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        )}
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {description}
          </p>
        )}
        {children}
      </div>
    </>
  );

  const classes = cn(
    "group overflow-hidden rounded-2xl border border-border-light bg-white transition-premium hover:-translate-y-1 hover:shadow-lg",
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
