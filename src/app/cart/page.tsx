"use client";

import Link from "next/link";
import { useCart, useCartLines } from "@/lib/cart-context";

export default function CartPage() {
  const { setQuantity, remove } = useCart();
  const lines = useCartLines();
  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.priceGBP * line.quantity,
    0
  );

  if (lines.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-stone-400">Your cart is empty.</p>
        <Link
          href="/"
          className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-medium text-stone-950 hover:bg-amber-400"
        >
          Browse peaks
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-6">
      <h1 className="font-[family-name:var(--font-display)] text-2xl text-stone-50">
        Your cart
      </h1>

      <ul className="flex flex-col gap-4">
        {lines.map(({ product, quantity }) => (
          <li
            key={product.slug}
            className="flex items-center justify-between gap-4 rounded-xl border border-stone-800 p-4"
          >
            <div className="flex flex-col gap-1">
              <Link
                href={`/products/${product.slug}`}
                className="font-medium text-stone-50 hover:underline"
              >
                {product.name}
              </Link>
              <span className="text-sm text-stone-500">
                £{product.priceGBP.toFixed(2)} each
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) =>
                  setQuantity(product.slug, Number(e.target.value))
                }
                className="w-16 rounded-lg border border-stone-700 bg-stone-900 px-2 py-1 text-center text-stone-50"
              />
              <span className="w-20 text-right font-medium text-stone-50">
                £{(product.priceGBP * quantity).toFixed(2)}
              </span>
              <button
                type="button"
                onClick={() => remove(product.slug)}
                className="text-sm text-stone-500 hover:text-red-400"
                aria-label={`Remove ${product.name}`}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-stone-800 pt-4">
        <span className="text-lg font-semibold text-stone-50">Subtotal</span>
        <span className="text-lg font-semibold text-stone-50">
          £{subtotal.toFixed(2)}
        </span>
      </div>

      <Link
        href="/checkout"
        className="w-full rounded-full bg-amber-500 px-5 py-3 text-center font-medium text-stone-950 hover:bg-amber-400"
      >
        Checkout
      </Link>
    </div>
  );
}
