import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Torus, Sphere, Icosahedron, Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';


function CalorieRing({ reducedMotion }: { reducedMotion: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.4;
      ringRef.current.rotation.y = t * 0.6;
      ringRef.current.rotation.z = Math.sin(t * 0.2) * 0.3;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = -t * 0.3;
      outerRingRef.current.rotation.y = -t * 0.5;
    }
  });

  return (
    <group>
      {/* Primary Calorie/Nutrition Ring */}
      <Torus ref={ringRef} args={[1.8, 0.14, 24, 80]}>
        <meshPhysicalMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.3}
          thickness={0.5}
        />
      </Torus>

      {/* Secondary Cyan Accent Orbit */}
      <Torus ref={outerRingRef} args={[2.4, 0.04, 16, 64]} rotation={[Math.PI / 3, 0, 0]}>
        <meshPhysicalMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </Torus>
    </group>
  );
}

function AICoreCore({ reducedMotion }: { reducedMotion: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5;
      coreRef.current.rotation.z = t * 0.3;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -t * 0.7;
      wireframeRef.current.rotation.x = t * 0.4;
    }
  });

  return (
    <group>
      {/* Inner Glowing AI Energy Sphere */}
      <Sphere ref={coreRef} args={[0.75, 32, 32]}>
        <meshPhysicalMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.5}
          transmission={0.6}
          thickness={0.8}
        />
      </Sphere>

      {/* Outer Geometric AI Lattice */}
      <Icosahedron ref={wireframeRef} args={[1.05, 0]}>
        <meshBasicMaterial color="#34d399" wireframe opacity={0.6} transparent />
      </Icosahedron>
    </group>
  );
}

function OrbitingNutrientNodes({ reducedMotion, isMobile }: { reducedMotion: boolean; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Protein Node (Cyan) */}
      <Sphere args={[0.22, 16, 16]} position={[2.6, 0.8, -0.4]}>
        <meshPhysicalMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} roughness={0.2} metalness={0.7} />
      </Sphere>

      {/* Carb Node (Amber) */}
      <Dodecahedron args={[0.2, 0]} position={[-2.4, -1.0, 0.5]}>
        <meshPhysicalMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.6} roughness={0.3} metalness={0.6} />
      </Dodecahedron>

      {/* Fat/Fiber Node (Violet) */}
      <Icosahedron args={[0.24, 0]} position={[1.8, -1.8, 0.8]}>
        <meshPhysicalMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.6} roughness={0.2} metalness={0.8} />
      </Icosahedron>

      {!isMobile && (
        <>
          {/* Extra AI Data Nodes on desktop */}
          <Sphere args={[0.15, 12, 12]} position={[-1.9, 1.9, -0.8]}>
            <meshPhysicalMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.8} />
          </Sphere>
          <Sphere args={[0.16, 12, 12]} position={[2.2, 1.9, 0.6]}>
            <meshPhysicalMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={0.8} />
          </Sphere>
        </>
      )}
    </group>
  );
}

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  useFrame((state) => {
    if (reducedMotion) return;
    const { x, y } = state.pointer;
    // Smooth camera mouse parallax
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 0.6, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 0.6, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function LoadingScene3D() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-8, 6, 5]} color="#10b981" intensity={3.5} distance={15} />
        <pointLight position={[8, -6, 5]} color="#8b5cf6" intensity={3.5} distance={15} />
        <pointLight position={[0, 0, 4]} color="#06b6d4" intensity={2.0} distance={10} />

        <CameraRig reducedMotion={reducedMotion} />

        <CalorieRing reducedMotion={reducedMotion} />
        <AICoreCore reducedMotion={reducedMotion} />
        <OrbitingNutrientNodes reducedMotion={reducedMotion} isMobile={isMobile} />

        {/* Floating Glowing Particle Field */}
        <Sparkles
          count={isMobile ? 35 : 80}
          scale={7}
          size={isMobile ? 2.5 : 4}
          speed={reducedMotion ? 0.2 : 0.8}
          opacity={0.7}
          color="#34d399"
        />
        <Sparkles
          count={isMobile ? 20 : 45}
          scale={8}
          size={isMobile ? 2.0 : 3.5}
          speed={reducedMotion ? 0.1 : 0.6}
          opacity={0.5}
          color="#38bdf8"
        />
      </Canvas>
    </div>
  );
}
