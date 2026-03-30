import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

/* ---------------------------------------------------------------------------
   Button — Polymorphic button / link component with variants and sizes.
   Renders <button> by default; pass `href` to render a Next.js <Link>.
   --------------------------------------------------------------------------- */

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover active:scale-[0.97] shadow-sm hover:shadow-md",
  secondary:
    "bg-white border border-border text-text-primary hover:bg-surface-secondary active:scale-[0.97]",
  outline:
    "border border-border text-text-primary hover:bg-surface-secondary active:scale-[0.97]",
  ghost:
    "text-text-primary hover:bg-surface-secondary active:scale-[0.97]",
  dark:
    "bg-surface-dark text-white hover:bg-gray-800 active:scale-[0.97]",
  "dark-outline":
    "border border-white/20 text-white hover:bg-white/10 active:scale-[0.97]",
  link:
    "text-accent hover:text-accent-hover underline-offset-4 hover:underline p-0 h-auto",
} as const;

const sizes = {
  xs: "h-8 px-3 text-xs rounded-full gap-1.5",
  sm: "h-9 px-4 text-sm rounded-full gap-2",
  md: "h-11 px-6 text-sm rounded-full gap-2",
  lg: "h-[52px] px-8 text-base rounded-full gap-2.5",
  xl: "h-14 px-10 text-base rounded-full gap-3",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-premium cursor-pointer select-none whitespace-nowrap focus-ring",
    variants[variant],
    variant !== "link" && sizes[size],
    className
  );

  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="h-4 w-4 shrink-0" />}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
