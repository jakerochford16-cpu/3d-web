"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="relative z-20 flex items-center justify-between border-b border-stone-800/60 bg-[var(--background)]/40 px-6 py-5 backdrop-blur-md">
      <Link
        href="/"
        className="font-[family-name:var(--font-display)] text-xl font-medium tracking-wide text-stone-50 italic"
      >
        Contour
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          href="/"
          className="text-sm text-stone-400 hover:text-stone-50"
        >
          All peaks
        </Link>
        <Link
          href="/cart"
          className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-50"
        >
          Cart
          {totalItems > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-xs font-medium text-stone-950">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
