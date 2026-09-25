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
        <p className="text-zinc-600 dark:text-zinc-400">Your cart is empty.</p>
        <Link
          href="/"
          className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Your cart
      </h1>

      <ul className="flex flex-col gap-4">
        {lines.map(({ product, quantity }) => (
          <li
            key={product.slug}
            className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
          >
            <div className="flex flex-col gap-1">
              <Link
                href={`/products/${product.slug}`}
                className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
              >
                {product.name}
              </Link>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
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
                className="w-16 rounded-lg border border-zinc-300 px-2 py-1 text-center dark:border-zinc-700 dark:bg-zinc-900"
              />
              <span className="w-20 text-right font-medium text-zinc-900 dark:text-zinc-50">
                £{(product.priceGBP * quantity).toFixed(2)}
              </span>
              <button
                type="button"
                onClick={() => remove(product.slug)}
                className="text-sm text-zinc-400 hover:text-red-600"
                aria-label={`Remove ${product.name}`}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Subtotal
        </span>
        <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          £{subtotal.toFixed(2)}
        </span>
      </div>

      <Link
        href="/checkout"
        className="w-full rounded-full bg-zinc-900 px-5 py-3 text-center font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Checkout
      </Link>
    </div>
  );
}
