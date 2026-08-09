import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Icosahedron, Torus, Float, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Cpu, Flame } from 'lucide-react';

interface AICoreProps {
  reducedMotion?: boolean;
}

function CoreNeuralOrb({ reducedMotion = false }: AICoreProps) {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerLatticeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.6;
      innerRef.current.rotation.z = t * 0.4;
    }
    if (outerLatticeRef.current) {
      outerLatticeRef.current.rotation.y = -t * 0.8;
      outerLatticeRef.current.rotation.x = t * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;
      ringRef.current.rotation.y = t * 0.7;
    }
  });

  return (
    <group>
      {/* Central Neural Energy Sphere */}
      <Sphere ref={innerRef} args={[0.85, 32, 32]}>
        <meshPhysicalMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.8}
          transmission={0.4}
          thickness={0.6}
        />
      </Sphere>

      {/* Geometric Outer Lattice */}
      <Icosahedron ref={outerLatticeRef} args={[1.25, 0]}>
        <meshBasicMaterial color="#38bdf8" wireframe opacity={0.6} transparent />
      </Icosahedron>

      {/* Orbiting Energy Ring */}
      <Torus ref={ringRef} args={[1.7, 0.06, 16, 64]} rotation={[Math.PI / 4, 0, 0]}>
        <meshPhysicalMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.8} />
      </Torus>

      {/* Floating Callout 1: Calories */}
      <Html position={[-2.8, 1.4, 0]} transform distanceFactor={5.5} style={{ pointerEvents: 'none' }}>
        <div style={{ background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(245,158,11,0.5)', padding: '10px 16px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', whiteSpace: 'nowrap' }}>
          <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Calories</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flame size={16} /> 642 kcal
          </div>
        </div>
      </Html>

      {/* Floating Callout 2: Protein */}
      <Html position={[2.6, 1.5, 0]} transform distanceFactor={5.5} style={{ pointerEvents: 'none' }}>
        <div style={{ background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(56,189,248,0.5)', padding: '10px 16px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', whiteSpace: 'nowrap' }}>
          <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Protein</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#38bdf8' }}>28 g</div>
        </div>
      </Html>

      {/* Floating Callout 3: Carbs */}
      <Html position={[-2.6, -1.5, 0]} transform distanceFactor={5.5} style={{ pointerEvents: 'none' }}>
        <div style={{ background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(52,211,153,0.5)', padding: '10px 16px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', whiteSpace: 'nowrap' }}>
          <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Carbs</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#34d399' }}>61 g</div>
        </div>
      </Html>

      {/* Floating Callout 4: Fat */}
      <Html position={[2.8, -1.4, 0]} transform distanceFactor={5.5} style={{ pointerEvents: 'none' }}>
        <div style={{ background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(167,139,250,0.5)', padding: '10px 16px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', whiteSpace: 'nowrap' }}>
          <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Fat</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#a78bfa' }}>24 g</div>
        </div>
      </Html>
    </group>
  );
}

export default function AICore({ reducedMotion = false }: AICoreProps) {
  return (
    <div style={{ width: '100%', height: '520px', position: 'relative' }}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[8, 10, 8]} intensity={2.5} />
        <pointLight position={[-6, 6, 4]} color="#38bdf8" intensity={3.5} />
        <pointLight position={[6, -6, 4]} color="#34d399" intensity={3.5} />

        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <CoreNeuralOrb reducedMotion={reducedMotion} />
        </Float>

        <Sparkles count={50} scale={6} size={3.5} speed={0.8} color="#38bdf8" />
      </Canvas>

      {/* Center AI Engine Label */}
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.35)', padding: '6px 16px', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontSize: '11px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
        <Cpu size={14} /> AI Computer Vision Neural Engine
      </div>
    </div>
  );
}
