import Image from "next/image";
import { Card } from "@/components/ui/Card";
import type { ProductCardData } from "@/lib/product-list";

/* A product in a list — its photo, name and one line, opening its page.
   The photo is served through the site's own image optimizer, so visitors
   never load the Hub's storage directly. */
export function ProductCard({ product, eyebrow }: { product: ProductCardData; eyebrow?: string | null }) {
  return (
    <Card href={`/product/${product.slug}`} variant="dark" className="h-full overflow-hidden">
      <div className="relative aspect-[4/3] w-full bg-white/[0.03]">
        {product.image ? (
          <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-contain p-6" />
        ) : null}
      </div>
      <div className="p-6">
        {eyebrow ? <p className="text-overline">{eyebrow}</p> : null}
        <h3 className="mt-2 text-lg font-semibold text-white">{product.name}</h3>
        {product.tagline || product.excerpt ? (
          <p className="mt-1 line-clamp-2 text-sm text-white/50">{product.tagline ?? product.excerpt}</p>
        ) : null}
      </div>
    </Card>
  );
}

/* No product to show yet — never invented ones. */
export function NoProducts({ text }: { text: string }) {
  return <p className="py-16 text-center text-body-large !text-white/40">{text}</p>;
}
