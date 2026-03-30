import { cn } from "@/lib/utils";

const backgrounds = {
  white: "bg-white",
  light: "bg-surface-secondary",
  dark: "bg-surface-dark text-text-inverse",
} as const;

interface SectionProps {
  children: React.ReactNode;
  background?: keyof typeof backgrounds;
  id?: string;
  className?: string;
}

export function Section({
  children,
  background = "white",
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-32", backgrounds[background], className)}
    >
      {children}
    </section>
  );
}
