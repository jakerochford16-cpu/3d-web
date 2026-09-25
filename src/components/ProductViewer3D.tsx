"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { DoubleSide, type Mesh } from "three";
import { buildTerrainGeometry } from "@/lib/terrain";

interface TerrainProps {
  seed: string;
  hasSnowCap: boolean;
  lowColor: string;
  rockColor: string;
  dramatic?: boolean;
}

function SpinningTerrain({ seed, hasSnowCap, lowColor, rockColor, dramatic }: TerrainProps) {
  const mesh = useRef<Mesh>(null);
  const geometry = useMemo(
    () => buildTerrainGeometry({ seed, hasSnowCap, lowColor, rockColor }),
    [seed, hasSnowCap, lowColor, rockColor]
  );

  // The panel faces the viewer (its height points toward camera, like relief
  // rising off a wall-mounted plaque) — a bounded sway, not a full turntable,
  // since a flat relief panel goes edge-on (and vanishes) past ~90°.
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const amplitude = dramatic ? 0.28 : 0.22;
    const speed = dramatic ? 0.25 : 0.4;
    mesh.current.rotation.y = Math.sin(clock.elapsedTime * speed) * amplitude;
  });

  return (
    <mesh ref={mesh} geometry={geometry} rotation-x={-0.25} castShadow>
      <meshStandardMaterial
        vertexColors
        roughness={0.85}
        metalness={0.02}
        flatShading={false}
        side={DoubleSide}
      />
    </mesh>
  );
}

// A slow warm/cool light sweep for the hero viewer, echoing a
// dawn-breaking-over-a-summit mood rather than flat product lighting.
function DawnLight() {
  const light = useRef<import("three").DirectionalLight>(null);
  useFrame(({ clock }) => {
    if (!light.current) return;
    const t = (Math.sin(clock.elapsedTime * 0.15) + 1) / 2;
    light.current.intensity = 1.6 + t * 1.1;
  });
  return (
    <directionalLight
      ref={light}
      position={[4, 4, 5]}
      intensity={1.6}
      color="#ffb677"
      castShadow
    />
  );
}

interface ProductViewer3DProps {
  seed: string;
  hasSnowCap: boolean;
  lowColor: string;
  rockColor: string;
  interactive?: boolean;
  dramatic?: boolean;
  className?: string;
}

export function ProductViewer3D({
  seed,
  hasSnowCap,
  lowColor,
  rockColor,
  interactive = false,
  dramatic = false,
  className,
}: ProductViewer3DProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0.9, 7], fov: 34 }} shadows>
        <ambientLight intensity={0.7} />
        {dramatic ? (
          <DawnLight />
        ) : (
          <directionalLight position={[4, 4, 6]} intensity={1.8} castShadow />
        )}
        <directionalLight position={[-4, 1, 5]} intensity={0.5} color="#a9c4ff" />
        <SpinningTerrain
          seed={seed}
          hasSnowCap={hasSnowCap}
          lowColor={lowColor}
          rockColor={rockColor}
          dramatic={dramatic}
        />
        {interactive && (
          <OrbitControls enablePan={false} minDistance={4} maxDistance={10} />
        )}
      </Canvas>
    </div>
  );
}
