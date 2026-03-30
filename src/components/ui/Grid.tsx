import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Grid — Responsive CSS grid with preset column configurations.
   Usage:
     <Grid cols={3}>…items…</Grid>
     <Grid cols={4} gap="lg">…items…</Grid>
   --------------------------------------------------------------------------- */

const colVariants = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
} as const;

const gapVariants = {
  none: "gap-0",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
  "2xl": "gap-12",
} as const;

interface GridProps {
  children: React.ReactNode;
  cols?: keyof typeof colVariants;
  gap?: keyof typeof gapVariants;
  className?: string;
  as?: React.ElementType;
}

export function Grid({
  children,
  cols = 3,
  gap = "lg",
  className,
  as: Component = "div",
}: GridProps) {
  return (
    <Component
      className={cn("grid", colVariants[cols], gapVariants[gap], className)}
    >
      {children}
    </Component>
  );
}
