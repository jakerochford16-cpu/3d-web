import { ProductCard } from "@/components/ProductCard";
import { ProductViewer3D } from "@/components/ProductViewer3D";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  const flagship = PRODUCTS[0];

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-stone-800">
        <ProductViewer3D
          seed={flagship.slug}
          hasSnowCap={flagship.hasSnowCap}
          lowColor={flagship.lowColor}
          rockColor={flagship.rockColor}
          dramatic
          className="absolute inset-0 h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14120f] via-[#14120f]/30 to-transparent" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-medium italic tracking-tight text-stone-50 sm:text-6xl">
            Every summit,
            <br />
            cast in relief.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-stone-300">
            Real UK mountains — Ben Nevis, Snowdon, Scafell Pike and more —
            3D printed to order as framed relief maps for the wall.
          </p>
        </div>
      </section>

      <section className="grid flex-1 grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </section>
    </div>
  );
}
