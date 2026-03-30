import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Badge — Small pill labels for tags, categories, and status indicators.
   --------------------------------------------------------------------------- */

const variants = {
  default: "bg-surface-secondary text-text-secondary",
  accent: "bg-accent-light text-accent-dark",
  dark: "bg-gray-800 text-gray-200",
  outline: "border border-border text-text-secondary",
  success: "bg-green-50 text-green-700",
  warning: "bg-yellow-50 text-yellow-700",
} as const;

const sizes = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-xs",
  lg: "px-4 py-1.5 text-sm",
} as const;

interface BadgeProps {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
