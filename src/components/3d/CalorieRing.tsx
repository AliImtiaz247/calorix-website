import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Flame } from 'lucide-react';

interface CalorieRingProps {
  position?: [number, number, number];
  reducedMotion?: boolean;
}

export default function CalorieRing({ position = [2.8, 1.6, 0.8], reducedMotion = false }: CalorieRingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    meshRef.current.rotation.y = t * 0.4;
    
    // Smooth lerp scale on hover
    const targetScale = hovered ? 1.15 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group position={position}>
      <Torus
        ref={meshRef}
        args={[1.1, 0.14, 24, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshPhysicalMaterial
          color={hovered ? '#34d399' : '#10b981'}
          emissive={hovered ? '#10b981' : '#059669'}
          emissiveIntensity={hovered ? 0.9 : 0.5}
          roughness={0.15}
          metalness={0.7}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.3}
          thickness={0.4}
        />
      </Torus>

      {/* Floating 3D HTML Metric Badge */}
      <Html
        transform
        distanceFactor={4.5}
        position={[0, 0, 0.2]}
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <div
          style={{
            background: 'rgba(11, 15, 25, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: hovered ? '1px solid rgba(52, 211, 153, 0.6)' : '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: '20px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: hovered
              ? '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(52,211,153,0.4)'
              : '0 15px 35px rgba(0,0,0,0.5), 0 0 20px rgba(16,185,129,0.25)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            transform: hovered ? 'scale(1.05)' : 'scale(1.0)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(6,182,212,0.25))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Flame color="#34d399" size={22} />
          </div>

          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.5px' }}>
              DAILY CALORIES
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff' }}>
                1,240 kcal
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34d399' }}>
                59%
              </span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}
