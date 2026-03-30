import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Section — Full-width page section with background & spacing variants.
   Wraps content in a semantic <section> element with generous vertical
   padding that collapses gracefully on smaller screens.
   --------------------------------------------------------------------------- */

const backgrounds = {
  white: "bg-white",
  light: "bg-surface-secondary",
  dark: "bg-surface-dark text-text-inverse",
  black: "bg-black text-text-inverse",
  accent: "bg-accent text-white",
} as const;

const spacings = {
  none: "",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
  xl: "py-24 md:py-40",
  hero: "py-28 md:py-44",
} as const;

interface SectionProps {
  children: React.ReactNode;
  background?: keyof typeof backgrounds;
  spacing?: keyof typeof spacings;
  id?: string;
  className?: string;
  as?: React.ElementType;
}

export function Section({
  children,
  background = "white",
  spacing = "lg",
  id,
  className,
  as: Component = "section",
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(backgrounds[background], spacings[spacing], className)}
    >
      {children}
    </Component>
  );
}
