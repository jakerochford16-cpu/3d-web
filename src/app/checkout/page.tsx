"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, useCartLines } from "@/lib/cart-context";

export default function CheckoutPage() {
  const { clear } = useCart();
  const lines = useCartLines();
  const [placed, setPlaced] = useState(false);
  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.priceGBP * line.quantity,
    0
  );

  if (placed) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Order noted
        </h1>
        <p className="max-w-sm text-zinc-600 dark:text-zinc-400">
          This is a placeholder checkout — nothing was charged and no order
          was actually placed. Real payment isn&apos;t wired up yet.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">
          Your cart is empty — nothing to check out.
        </p>
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
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Checkout
      </h1>
      <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
        Placeholder only — no payment provider is connected yet. Submitting
        just clears your cart.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          clear();
          setPlaced(true);
        }}
        className="flex flex-col gap-4"
      >
        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Name
          <input
            required
            type="text"
            className="rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Email
          <input
            required
            type="email"
            className="rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Delivery address
          <textarea
            required
            rows={3}
            className="rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>

        <div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
            Total
          </span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
            £{subtotal.toFixed(2)}
          </span>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-zinc-900 px-5 py-3 font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Place order
        </button>
      </form>
    </div>
  );
}
