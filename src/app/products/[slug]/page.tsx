import { notFound } from "next/navigation";
import { ProductViewer3D } from "@/components/ProductViewer3D";
import { AddToCartButton } from "@/components/AddToCartButton";
import { PRODUCTS, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 p-6 sm:flex-row">
      <ProductViewer3D
        seed={product.slug}
        hasSnowCap={product.hasSnowCap}
        lowColor={product.lowColor}
        rockColor={product.rockColor}
        interactive
        className="h-80 flex-1 rounded-2xl bg-stone-950 sm:h-auto"
      />

      <div className="flex flex-1 flex-col gap-3">
        <p className="text-xs tracking-wide text-stone-500 uppercase">
          {product.region}
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-stone-50">
          {product.name}
        </h1>
        <p className="text-lg font-medium text-amber-400">
          £{product.priceGBP.toFixed(2)}
        </p>
        <p className="text-stone-400">{product.description}</p>
        <dl className="mt-2 grid grid-cols-2 gap-2 text-sm text-stone-500">
          <dt>Elevation</dt>
          <dd>{product.elevationM}m</dd>
          <dt>Material</dt>
          <dd>{product.material}</dd>
          <dt>Print time</dt>
          <dd>~{product.printTimeHours}h</dd>
        </dl>
        <AddToCartButton slug={product.slug} />
        <p className="text-xs text-stone-500">
          Checkout is a placeholder — no real payment is taken.
        </p>
      </div>
    </div>
  );
}
