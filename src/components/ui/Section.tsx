import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Section — Full-width section wrapper.
   Dark-first: defaults to black background.
   --------------------------------------------------------------------------- */

const backgrounds = {
  black: "bg-black",
  dark: "bg-[#0a0a0a]",
  white: "bg-white",
  light: "bg-[#f5f5f7]",
} as const;

const spacings = {
  none: "",
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-36",
  xl: "py-32 md:py-44",
} as const;

interface SectionProps {
  children: React.ReactNode;
  background?: keyof typeof backgrounds;
  spacing?: keyof typeof spacings;
  id?: string;
  className?: string;
}

export function Section({
  children,
  background = "black",
  spacing = "lg",
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        backgrounds[background],
        spacings[spacing],
        "section-accent-top",
        className
      )}
    >
      {children}
    </section>
  );
}
