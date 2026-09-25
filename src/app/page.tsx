import { ProductCard } from "@/components/ProductCard";
import { PrinterScene } from "@/components/PrinterScene";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <PrinterScene />

      <section className="relative flex min-h-[70vh] items-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14120f] via-[#14120f]/40 to-transparent" />
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

      <section className="relative z-10 grid flex-1 grid-cols-1 gap-6 bg-[var(--background)] p-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </section>
    </div>
  );
}
