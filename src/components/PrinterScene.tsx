"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group, Mesh, PointLight } from "three";

const PRINT_DURATION = 6; // seconds per print cycle, then it resets and starts again
const MAX_HEIGHT = 1.6;

function Printer() {
  const gantry = useRef<Group>(null);
  const nozzle = useRef<Mesh>(null);
  const printedObject = useRef<Mesh>(null);
  const hotEndGlow = useRef<PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime % PRINT_DURATION;
    const progress = t / PRINT_DURATION;
    const height = progress * MAX_HEIGHT;

    if (gantry.current) gantry.current.position.y = height;
    if (printedObject.current) {
      printedObject.current.scale.y = Math.max(0.02, height);
      printedObject.current.position.y = Math.max(0.02, height) / 2;
    }
    if (nozzle.current) {
      nozzle.current.position.x = Math.sin(clock.elapsedTime * 3.2) * 0.85;
    }
    if (hotEndGlow.current) {
      hotEndGlow.current.position.x = Math.sin(clock.elapsedTime * 3.2) * 0.85;
      hotEndGlow.current.position.y = height;
    }
  });

  return (
    <group position={[0, -0.9, 0]}>
      {/* Bed */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[2.4, 0.08, 2]} />
        <meshStandardMaterial color="#2a2724" roughness={0.8} />
      </mesh>

      {/* Frame rails */}
      {[-1.05, 1.05].map((x) => (
        <mesh key={x} position={[x, MAX_HEIGHT / 2 + 0.1, -0.85]}>
          <boxGeometry args={[0.08, MAX_HEIGHT + 0.3, 0.08]} />
          <meshStandardMaterial color="#3a3632" roughness={0.6} metalness={0.3} />
        </mesh>
      ))}

      {/* Gantry (X-axis bar) that rises as the print progresses */}
      <group ref={gantry} position={[0, 0, 0]}>
        <mesh position={[0, 0, -0.85]}>
          <boxGeometry args={[2.1, 0.09, 0.09]} />
          <meshStandardMaterial color="#8c877c" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh ref={nozzle} position={[0, 0, -0.6]} castShadow>
          <boxGeometry args={[0.22, 0.22, 0.35]} />
          <meshStandardMaterial color="#4a4640" roughness={0.5} metalness={0.4} />
        </mesh>
      </group>

      {/* The object being printed, growing in height as the gantry rises */}
      <mesh ref={printedObject} position={[0, 0.02, -0.2]} castShadow>
        <boxGeometry args={[0.6, 1, 0.6]} />
        <meshStandardMaterial
          color="#e8a15c"
          emissive="#e8a15c"
          emissiveIntensity={0.25}
          roughness={0.5}
        />
      </mesh>

      <pointLight ref={hotEndGlow} position={[0, 0, -0.2]} color="#ffb877" intensity={2} distance={1.5} />
    </group>
  );
}

// Fixed full-viewport decorative background — not interactive, purely
// atmospheric (a 3D printer mid-print, visible through the transparent
// header on the home page). Unmounts on navigation away from "/".
export function PrinterScene() {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-full">
      <Canvas camera={{ position: [3, 1.4, 4.2], fov: 42 }} shadows>
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 3]} intensity={1.6} color="#ffcf9a" castShadow />
        <directionalLight position={[-4, 1, -2]} intensity={0.4} color="#8fb3ff" />
        <Printer />
      </Canvas>
    </div>
  );
}
