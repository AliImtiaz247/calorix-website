import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Icosahedron, Dodecahedron, Cone } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingObjectsProps {
  pointerVector?: React.MutableRefObject<{ x: number; y: number }>;
  scrollOffset?: number;
  reducedMotion?: boolean;
  isMobile?: boolean;
}

// 1. Procedural 3D Apple Model
function ProceduralApple({ position = [-3.2, 1.8, -0.5], reducedMotion }: { position?: [number, number, number]; reducedMotion?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.1;
    groupRef.current.position.y = position[1] + Math.sin(t * 1.1) * 0.12;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Apple Body */}
      <Sphere args={[0.42, 24, 24]} scale={[1, 0.92, 1]}>
        <meshPhysicalMaterial
          color="#ef4444"
          emissive="#991b1b"
          emissiveIntensity={0.25}
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </Sphere>
      {/* Apple Stem */}
      <Cone args={[0.03, 0.18, 8]} position={[0, 0.42, 0]} rotation={[0, 0, -0.2]}>
        <meshStandardMaterial color="#78350f" roughness={0.7} />
      </Cone>
    </group>
  );
}

// 2. Procedural 3D Orange / Citrus Sphere
function ProceduralOrange({ position = [3.3, -1.8, 0.2], reducedMotion }: { position?: [number, number, number]; reducedMotion?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = -t * 0.4;
    meshRef.current.rotation.z = Math.cos(t * 0.5) * 0.15;
    meshRef.current.position.y = position[1] + Math.sin(t * 1.3 + 1) * 0.14;
  });

  return (
    <Sphere ref={meshRef} args={[0.38, 24, 24]} position={position}>
      <meshPhysicalMaterial
        color="#f97316"
        emissive="#c2410c"
        emissiveIntensity={0.3}
        roughness={0.35}
        metalness={0.1}
      />
    </Sphere>
  );
}

// 3. Procedural 3D Water Droplet
function ProceduralWaterDrop({ position = [-2.8, -1.6, 0.4], reducedMotion }: { position?: [number, number, number]; reducedMotion?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.5;
    groupRef.current.position.y = position[1] + Math.sin(t * 1.4 + 2) * 0.15;
  });

  return (
    <group ref={groupRef} position={position}>
      <Sphere args={[0.3, 24, 24]} scale={[0.9, 1.3, 0.9]}>
        <meshPhysicalMaterial
          color="#38bdf8"
          transmission={0.8}
          thickness={0.8}
          roughness={0.05}
          ior={1.33}
          transparent
          opacity={0.9}
        />
      </Sphere>
      <Cone args={[0.3, 0.4, 24]} position={[0, 0.28, 0]}>
        <meshPhysicalMaterial
          color="#06b6d4"
          transmission={0.8}
          thickness={0.8}
          roughness={0.05}
          ior={1.33}
          transparent
          opacity={0.9}
        />
      </Cone>
    </group>
  );
}

// 4. Procedural Avocado / Nutrient Gem
function ProceduralAvocadoNode({ position = [-3.0, 0.2, 0.6], reducedMotion }: { position?: [number, number, number]; reducedMotion?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.position.y = position[1] + Math.cos(t * 1.2) * 0.1;
  });

  return (
    <Icosahedron ref={meshRef} args={[0.34, 0]} position={position}>
      <meshPhysicalMaterial
        color="#10b981"
        emissive="#047857"
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.7}
      />
    </Icosahedron>
  );
}

// 5. Floating Geometric Energy Particles
function GeometricParticleField({ reducedMotion, isMobile }: { reducedMotion?: boolean; isMobile?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.15;
  });

  return (
    <group ref={groupRef}>
      <Dodecahedron args={[0.18, 0]} position={[2.6, 2.4, -1]}>
        <meshPhysicalMaterial color="#a78bfa" emissive="#6d28d9" emissiveIntensity={0.6} roughness={0.1} />
      </Dodecahedron>

      <Sphere args={[0.14, 16, 16]} position={[-2.2, -2.4, -0.6]}>
        <meshPhysicalMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.8} />
      </Sphere>

      {!isMobile && (
        <>
          <Icosahedron args={[0.15, 0]} position={[3.1, -0.5, -0.8]}>
            <meshPhysicalMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={0.7} />
          </Icosahedron>
          <Sphere args={[0.12, 12, 12]} position={[-3.5, 0.8, -1.2]}>
            <meshPhysicalMaterial color="#f59e0b" emissive="#b45309" emissiveIntensity={0.7} />
          </Sphere>
        </>
      )}
    </group>
  );
}

export default function FloatingObjects({
  pointerVector,
  scrollOffset = 0,
  reducedMotion = false,
  isMobile = false,
}: FloatingObjectsProps) {
  const mainGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!mainGroupRef.current || reducedMotion) return;

    // Apply scroll parallax depth shift
    const scrollTargetY = -scrollOffset * 1.5;
    mainGroupRef.current.position.y = THREE.MathUtils.lerp(mainGroupRef.current.position.y, scrollTargetY, 0.05);

    // Apply pointer movement parallax
    if (pointerVector) {
      const targetX = pointerVector.current.x * 0.4;
      const targetZ = pointerVector.current.y * 0.3;
      mainGroupRef.current.position.x = THREE.MathUtils.lerp(mainGroupRef.current.position.x, targetX, 0.05);
      mainGroupRef.current.position.z = THREE.MathUtils.lerp(mainGroupRef.current.position.z, targetZ, 0.05);
    }
  });

  return (
    <group ref={mainGroupRef}>
      <ProceduralApple position={isMobile ? [-1.8, 2.2, -0.5] : [-3.2, 1.8, -0.5]} reducedMotion={reducedMotion} />
      <ProceduralOrange position={isMobile ? [1.8, -2.2, 0.2] : [3.3, -1.8, 0.2]} reducedMotion={reducedMotion} />
      <ProceduralWaterDrop position={isMobile ? [-1.6, -2.0, 0.4] : [-2.8, -1.6, 0.4]} reducedMotion={reducedMotion} />
      <ProceduralAvocadoNode position={isMobile ? [1.6, 2.0, 0.6] : [-3.0, 0.2, 0.6]} reducedMotion={reducedMotion} />
      <GeometricParticleField reducedMotion={reducedMotion} isMobile={isMobile} />
    </group>
  );
}
