import Link from "next/link";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Card — Dark-first versatile card component.
   Defaults to dark glass style with semi-transparent borders.
   --------------------------------------------------------------------------- */

const styleVariants = {
  dark: "card-dark",
  image: "card-image",
  premium: "card-premium",
} as const;

interface CardProps {
  children?: React.ReactNode;
  variant?: keyof typeof styleVariants;
  href?: string;
  className?: string;
}

export function Card({
  children,
  variant = "dark",
  href,
  className,
}: CardProps) {
  const classes = cn(styleVariants[variant], "group", className);

  if (href) {
    return (
      <Link href={href} className={cn(classes, "block")}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
