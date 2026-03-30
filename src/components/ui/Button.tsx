import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover active:scale-[0.98] shadow-sm",
  secondary:
    "border border-border text-text-primary hover:bg-surface-secondary active:scale-[0.98]",
  ghost:
    "text-text-primary hover:bg-surface-secondary active:scale-[0.98]",
  link: "text-accent hover:text-accent-hover underline-offset-4 hover:underline p-0 h-auto",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm rounded-full",
  md: "h-11 px-6 text-sm rounded-full",
  lg: "h-13 px-8 text-base rounded-full",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
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
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-premium cursor-pointer select-none whitespace-nowrap",
    variants[variant],
    variant !== "link" && sizes[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest} />
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest} />
  );
}
