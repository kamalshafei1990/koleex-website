import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href: string }[];
}

export function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="bg-surface-dark py-24 md:py-32">
      <Container>
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="mb-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-text-tertiary">
                {breadcrumb.map((item, index) => {
                  const isLast = index === breadcrumb.length - 1;
                  return (
                    <li key={item.href} className="flex items-center gap-1.5">
                      {index > 0 && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="shrink-0 text-text-tertiary/50"
                        >
                          <path
                            d="M6 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {isLast ? (
                        <span className="font-medium text-text-inverse">
                          {item.label}
                        </span>
                      ) : (
                        <a
                          href={item.href}
                          className="transition-premium hover:text-text-inverse/80 text-text-inverse/60"
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        )}
        <h1 className="text-display text-text-inverse">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-subtitle text-text-inverse/70">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
