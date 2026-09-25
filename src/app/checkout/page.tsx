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
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-stone-50">
          Order noted
        </h1>
        <p className="max-w-sm text-stone-400">
          This is a placeholder checkout — nothing was charged and no order
          was actually placed. Real payment isn&apos;t wired up yet.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-medium text-stone-950 hover:bg-amber-400"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-stone-400">Your cart is empty — nothing to check out.</p>
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
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 p-6">
      <h1 className="font-[family-name:var(--font-display)] text-2xl text-stone-50">
        Checkout
      </h1>
      <p className="rounded-lg bg-amber-900/20 px-4 py-3 text-sm text-amber-300">
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
        <label className="flex flex-col gap-1 text-sm text-stone-300">
          Name
          <input
            required
            type="text"
            className="rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-stone-50"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-stone-300">
          Email
          <input
            required
            type="email"
            className="rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-stone-50"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-stone-300">
          Delivery address
          <textarea
            required
            rows={3}
            className="rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-stone-50"
          />
        </label>

        <div className="flex items-center justify-between border-t border-stone-800 pt-4">
          <span className="font-semibold text-stone-50">Total</span>
          <span className="font-semibold text-stone-50">
            £{subtotal.toFixed(2)}
          </span>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-amber-500 px-5 py-3 font-medium text-stone-950 hover:bg-amber-400"
        >
          Place order
        </button>
      </form>
    </div>
  );
}
