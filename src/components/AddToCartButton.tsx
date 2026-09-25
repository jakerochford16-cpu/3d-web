"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export function AddToCartButton({ slug }: { slug: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add(slug);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className="mt-4 w-full rounded-full bg-amber-500 px-5 py-3 font-medium text-stone-950 transition-colors hover:bg-amber-400"
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
