import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Badge — Dark-first pill labels for tags, categories, status.
   --------------------------------------------------------------------------- */

const variants = {
  default: "bg-white/[0.06] text-white/60 border border-white/[0.08]",
  accent: "bg-white/[0.10] text-white/80 border border-white/[0.12]",
  outline: "border border-white/[0.10] text-white/50",
  success: "bg-green-500/10 text-green-400 border border-green-500/20",
  warning: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
} as const;

const sizes = {
  sm: "px-2.5 py-0.5 text-[10px]",
  md: "px-3 py-1 text-[11px]",
  lg: "px-4 py-1.5 text-[12px]",
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
