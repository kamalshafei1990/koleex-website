import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center bg-surface-dark">
      {/* Subtle radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" />

      <Container className="relative z-10 py-32 text-center">
        <h1 className="text-display mx-auto max-w-4xl text-white">
          Engineering the Future
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          Koleex International Group delivers cutting-edge solutions across
          industries, powering innovation for a sustainable world.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/products" size="lg">
            Explore Products
          </Button>
          <Button
            href="/about"
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10"
          >
            Our Story
          </Button>
        </div>
      </Container>
    </section>
  );
}
