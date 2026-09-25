"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { getProduct, type Product } from "@/lib/products";

const STORAGE_KEY = "3d-web-cart";

type CartQuantities = Record<string, number>;

const listeners = new Set<() => void>();
let cache: CartQuantities = {};
let cacheRaw: string | null = null;

function parse(raw: string | null): CartQuantities {
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function getSnapshot(): CartQuantities {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cacheRaw) return cache;
  cacheRaw = raw;
  cache = parse(raw);
  return cache;
}

// SSR/initial-render snapshot — always empty since localStorage isn't
// available on the server; the client re-syncs via getSnapshot on mount.
function getServerSnapshot(): CartQuantities {
  return {};
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function write(next: CartQuantities) {
  cache = next;
  cacheRaw = JSON.stringify(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, cacheRaw);
  } catch {
    // localStorage unavailable (private mode, etc.) — cart just won't persist.
  }
  listeners.forEach((listener) => listener());
}

export function useCart() {
  const quantities = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const add = useCallback((slug: string, qty = 1) => {
    write({ ...cache, [slug]: (cache[slug] ?? 0) + qty });
  }, []);

  const setQuantity = useCallback((slug: string, qty: number) => {
    const next = { ...cache };
    if (qty <= 0) delete next[slug];
    else next[slug] = qty;
    write(next);
  }, []);

  const remove = useCallback((slug: string) => {
    const next = { ...cache };
    delete next[slug];
    write(next);
  }, []);

  const clear = useCallback(() => write({}), []);

  const totalItems = useMemo(
    () => Object.values(quantities).reduce((sum, qty) => sum + qty, 0),
    [quantities]
  );

  return { quantities, add, setQuantity, remove, clear, totalItems };
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export function useCartLines(): CartLine[] {
  const { quantities } = useCart();
  const lines: CartLine[] = [];
  for (const [slug, quantity] of Object.entries(quantities)) {
    const product = getProduct(slug);
    if (product) lines.push({ product, quantity });
  }
  return lines;
}
