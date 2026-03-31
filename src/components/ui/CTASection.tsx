import Link from "next/link";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   CTASection — Dark-first CTA section matching brand guidelines.
   --------------------------------------------------------------------------- */

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

export function CTASection({
  eyebrow,
  title,
  subtitle,
  cta,
  secondaryCta,
  className,
}: CTASectionProps) {
  return (
    <section className={cn("bg-black py-24 md:py-36 text-center section-accent-top", className)}>
      <div className="max-w-[680px] mx-auto px-6">
        {eyebrow && (
          <p className="text-overline mb-4">{eyebrow}</p>
        )}
        <h2 className="text-headline text-gradient-hero">{title}</h2>
        {subtitle && (
          <p className="text-subtitle mt-5 !leading-[1.8]">{subtitle}</p>
        )}
        <div className="flex items-center justify-center gap-10 mt-8">
          <Link href={cta.href} className="link-cta link-cta-dark">
            {cta.label} →
          </Link>
          {secondaryCta && (
            <Link href={secondaryCta.href} className="link-cta link-cta-dark">
              {secondaryCta.label} →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
