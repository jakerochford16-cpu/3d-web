import Link from "next/link";
import { ProductViewer3D } from "@/components/ProductViewer3D";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60 transition-colors hover:border-stone-700"
    >
      <ProductViewer3D
        seed={product.slug}
        hasSnowCap={product.hasSnowCap}
        lowColor={product.lowColor}
        rockColor={product.rockColor}
        className="h-56 w-full bg-stone-950"
      />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg text-stone-50">
          {product.name}
        </h3>
        <p className="text-xs tracking-wide text-stone-500 uppercase">
          {product.region} · {product.elevationM}m
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-stone-400">
          {product.description}
        </p>
        <p className="mt-2 font-medium text-amber-400">
          £{product.priceGBP.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
