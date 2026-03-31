import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

/* ---------------------------------------------------------------------------
   Button — Dark-first polymorphic button/link.
   Default: silver outline style matching brand guidelines.
   --------------------------------------------------------------------------- */

const variants = {
  primary:
    "bg-white text-black hover:bg-white/90 active:scale-[0.97]",
  secondary:
    "border border-white/15 text-white/70 hover:border-white/25 hover:text-white active:scale-[0.97]",
  outline:
    "border border-white/10 text-white/50 hover:border-white/20 hover:text-white/80 active:scale-[0.97]",
  ghost:
    "text-white/60 hover:text-white hover:bg-white/[0.05] active:scale-[0.97]",
  dark:
    "bg-white/[0.06] text-white/70 hover:bg-white/[0.10] hover:text-white active:scale-[0.97]",
  link:
    "text-white/50 hover:text-white/80 hover:underline underline-offset-4 p-0 h-auto",
} as const;

const sizes = {
  xs: "h-8 px-3.5 text-[12px] rounded-full gap-1.5",
  sm: "h-9 px-4 text-[13px] rounded-full gap-2",
  md: "h-11 px-6 text-[13px] rounded-full gap-2",
  lg: "h-[48px] px-8 text-[14px] rounded-full gap-2.5",
  xl: "h-[52px] px-10 text-[15px] rounded-full gap-3",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium cursor-pointer select-none whitespace-nowrap focus-ring",
    "transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
    variants[variant],
    variant !== "link" && sizes[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return <Link href={href} className={classes} {...rest}>{children}</Link>;
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return <button type={type} className={classes} {...rest}>{children}</button>;
}
