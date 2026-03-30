import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Container — Centered content wrapper with responsive padding.
   Supports multiple width presets for different layout contexts.
   --------------------------------------------------------------------------- */

const widths = {
  sm: "max-w-[640px]",
  md: "max-w-[768px]",
  lg: "max-w-[980px]",
  xl: "max-w-[1200px]",
  "2xl": "max-w-[1440px]",
  full: "max-w-full",
} as const;

interface ContainerProps {
  children: React.ReactNode;
  size?: keyof typeof widths;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  size = "xl",
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", widths[size], className)}
    >
      {children}
    </Component>
  );
}
