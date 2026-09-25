# 3D Web

A storefront for products made on a 3D printer, built with Next.js (App
Router, TypeScript, Tailwind) and [React Three Fiber](https://r3f.docs.pmnd.rs/)
for live, spinning 3D previews of each product.

## Running it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `src/lib/products.ts` — the product catalogue. Each entry has a
  placeholder `shape`/`color` rendered in 3D by `ProductViewer3D` — swap
  these for a real `modelUrl` (`.glb`) once actual scans/exports of the
  printed pieces exist.
- `src/lib/cart-context.tsx` — a `localStorage`-backed cart, synced across
  components with `useSyncExternalStore` (no React Context/provider
  needed — it's a small global store).
- `src/app/` — home page (product grid), `/products/[slug]` (detail page
  with an interactive 3D viewer), `/cart`, and `/checkout`.

## Checkout

`/checkout` is a placeholder: submitting the form clears the cart and shows
a confirmation, but no payment provider is connected and no order is
actually placed. Wire up a real payment processor (e.g. Stripe) before
taking this live.

## Commands

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm start` — run the production build
- `npm run lint` — eslint
