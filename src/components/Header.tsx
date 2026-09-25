"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
      >
        3D Web
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          href="/"
          className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          All products
        </Link>
        <Link
          href="/cart"
          className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Cart
          {totalItems > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1.5 text-xs font-medium text-white dark:bg-zinc-50 dark:text-zinc-900">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
