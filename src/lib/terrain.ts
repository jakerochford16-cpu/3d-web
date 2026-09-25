import * as THREE from "three";

// Deterministic PRNG (mulberry32) so the same seed always produces the
// same terrain — no external noise library needed for this stylised look.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

// Value noise on a fixed grid, bilinearly interpolated with smoothstep easing.
function makeValueNoise2D(seed: number, gridSize: number) {
  const rand = mulberry32(seed);
  const size = gridSize + 1;
  const grid = new Float32Array(size * size);
  for (let i = 0; i < grid.length; i++) grid[i] = rand();

  return (x: number, y: number) => {
    const gx = ((x % gridSize) + gridSize) % gridSize;
    const gy = ((y % gridSize) + gridSize) % gridSize;
    const x0 = Math.floor(gx);
    const y0 = Math.floor(gy);
    const x1 = (x0 + 1) % size;
    const y1 = (y0 + 1) % size;
    const tx = smoothstep(gx - x0);
    const ty = smoothstep(gy - y0);

    const v00 = grid[y0 * size + x0];
    const v10 = grid[y0 * size + x1];
    const v01 = grid[y1 * size + x0];
    const v11 = grid[y1 * size + x1];

    const a = v00 + (v10 - v00) * tx;
    const b = v01 + (v11 - v01) * tx;
    return a + (b - a) * ty;
  };
}

interface TerrainOptions {
  seed: string;
  resolution?: number;
  size?: number;
  peakHeight?: number;
  ruggedness?: number;
  hasSnowCap?: boolean;
  lowColor?: string;
  rockColor?: string;
  snowColor?: string;
}

// Builds a stylised mountain-relief mesh: a radial peak shape roughened by
// ridged noise, coloured low→rock→(optional snow) by height. Not real
// elevation data — swap for a heightmap from actual DEM/OS terrain data
// per peak when that's available.
export function buildTerrainGeometry({
  seed,
  resolution = 64,
  size = 3.4,
  peakHeight = 1.5,
  ruggedness = 0.45,
  hasSnowCap = false,
  lowColor = "#4b4630",
  rockColor = "#8c877c",
  snowColor = "#f4f1ea",
}: TerrainOptions): THREE.BufferGeometry {
  const baseSeed = hashSeed(seed);
  const detailNoise = makeValueNoise2D(baseSeed, 6);
  const ridgeNoise = makeValueNoise2D(baseSeed + 101, 3);
  const angle = mulberry32(baseSeed + 7)() * Math.PI;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const verts = resolution + 1;
  const positions = new Float32Array(verts * verts * 3);
  const colors = new Float32Array(verts * verts * 3);
  const half = size / 2;

  const low = new THREE.Color(lowColor);
  const rock = new THREE.Color(rockColor);
  const snow = new THREE.Color(snowColor);
  const tmp = new THREE.Color();

  for (let j = 0; j < verts; j++) {
    for (let i = 0; i < verts; i++) {
      const u = i / resolution;
      const v = j / resolution;
      const x = (u - 0.5) * size;
      const y = (v - 0.5) * size;

      const radial = Math.min(1, Math.sqrt(x * x + y * y) / (half * 1.5));
      const peakShape = Math.pow(Math.max(0, 1 - radial), 1.15);

      // Ridge lines: sample rotated coords, fold noise around 0.5 so
      // valleys read as sharp creases rather than smooth bumps.
      const rx = x * cos - y * sin;
      const ry = x * sin + y * cos;
      const ridged = 1 - Math.abs(2 * ridgeNoise(rx * 0.7 + 3, ry * 0.7 + 3) - 1);
      const detail = detailNoise(x * 1.6 + 9, y * 1.6 + 9);

      const height =
        peakShape * peakHeight * (0.5 + 0.5 * ridged) * (1 - ruggedness * 0.3) +
        peakShape * ruggedness * detail * peakHeight * 0.35;

      const idx = j * verts + i;
      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = height;

      const t = peakHeight > 0 ? height / peakHeight : 0;
      if (hasSnowCap && t > 0.62) {
        tmp.copy(rock).lerp(snow, Math.min(1, (t - 0.62) / 0.38));
      } else {
        tmp.copy(low).lerp(rock, Math.min(1, t / 0.65));
      }
      colors[idx * 3] = tmp.r;
      colors[idx * 3 + 1] = tmp.g;
      colors[idx * 3 + 2] = tmp.b;
    }
  }

  const indices: number[] = [];
  for (let j = 0; j < resolution; j++) {
    for (let i = 0; i < resolution; i++) {
      const a = j * verts + i;
      const b = a + 1;
      const c = a + verts;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
