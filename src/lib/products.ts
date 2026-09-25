export interface Product {
  slug: string;
  name: string;
  region: string;
  elevationM: number;
  priceGBP: number;
  material: string;
  printTimeHours: number;
  description: string;
  hasSnowCap: boolean;
  lowColor: string;
  rockColor: string;
}

// Real UK peaks, real elevations — the terrain shape itself is a stylised
// relief (see lib/terrain.ts), not a real heightmap. Swap in a proper DEM
// export per peak once one exists.
export const PRODUCTS: Product[] = [
  {
    slug: "ben-nevis",
    name: "Ben Nevis",
    region: "Scottish Highlands",
    elevationM: 1345,
    priceGBP: 85,
    material: "Dual-tone PLA relief, 20×20cm, oak frame",
    printTimeHours: 14,
    description:
      "The UK's highest summit, cast in relief straight off its own contour lines — dark basalt shoulders rising to a wind-scoured cap.",
    hasSnowCap: true,
    lowColor: "#6b5f45",
    rockColor: "#7c7871",
  },
  {
    slug: "snowdon",
    name: "Snowdon — Yr Wyddfa",
    region: "Eryri (Snowdonia), Wales",
    elevationM: 1085,
    priceGBP: 75,
    material: "Dual-tone PLA relief, 20×20cm, oak frame",
    printTimeHours: 12,
    description:
      "Wales' highest peak, with the ridgelines of the Snowdon Horseshoe rendered in slate-grey relief.",
    hasSnowCap: true,
    lowColor: "#5c6b4a",
    rockColor: "#6f7570",
  },
  {
    slug: "cairn-gorm",
    name: "Cairn Gorm",
    region: "Cairngorms, Scotland",
    elevationM: 1245,
    priceGBP: 78,
    material: "Dual-tone PLA relief, 20×20cm, oak frame",
    printTimeHours: 13,
    description:
      "A broad granite giant on the Cairngorms plateau, its rounded shoulders a contrast to the sharper western peaks.",
    hasSnowCap: true,
    lowColor: "#736354",
    rockColor: "#948b7e",
  },
  {
    slug: "scafell-pike",
    name: "Scafell Pike",
    region: "Lake District, England",
    elevationM: 978,
    priceGBP: 65,
    material: "Dual-tone PLA relief, 18×18cm, oak frame",
    printTimeHours: 10,
    description:
      "England's highest fell — rugged and compact, with the boulder-strewn summit plateau picked out in relief.",
    hasSnowCap: false,
    lowColor: "#786d47",
    rockColor: "#867d68",
  },
  {
    slug: "helvellyn",
    name: "Helvellyn",
    region: "Lake District, England",
    elevationM: 950,
    priceGBP: 60,
    material: "Dual-tone PLA relief, 18×18cm, oak frame",
    printTimeHours: 9,
    description:
      "Famous for Striding Edge — a narrower, more knife-backed relief than its Lakeland neighbours.",
    hasSnowCap: false,
    lowColor: "#67714f",
    rockColor: "#7a7e6f",
  },
  {
    slug: "slieve-donard",
    name: "Slieve Donard",
    region: "Mourne Mountains, Northern Ireland",
    elevationM: 850,
    priceGBP: 58,
    material: "Dual-tone PLA relief, 18×18cm, oak frame",
    printTimeHours: 8,
    description:
      "The highest of the Mournes, rising almost straight from the sea — a steep, dramatic profile in relief.",
    hasSnowCap: false,
    lowColor: "#59705c",
    rockColor: "#7d8579",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
