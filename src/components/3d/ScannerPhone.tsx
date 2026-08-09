import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Camera, Sparkles, Scan, Zap } from 'lucide-react';

interface ScannerPhoneProps {
  reducedMotion?: boolean;
}

function PhoneCameraModel({ reducedMotion = false }: ScannerPhoneProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      -0.2 + x * 0.35 + (hovered ? 0.1 : 0),
      0.06
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      0.1 - y * 0.25 + Math.sin(t * 0.8) * 0.03,
      0.06
    );
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      rotation={[0.1, -0.2, 0]}
    >
      {/* Outer Metallic Chassis */}
      <RoundedBox args={[2.7, 5.4, 0.28]} radius={0.25} smoothness={8}>
        <meshPhysicalMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.15}
          clearcoat={0.8}
        />
      </RoundedBox>

      {/* Glass Bezel */}
      <RoundedBox args={[2.55, 5.25, 0.29]} radius={0.22} smoothness={8} position={[0, 0, 0.01]}>
        <meshBasicMaterial color="#030712" />
      </RoundedBox>

      {/* Screen HTML Content Overlay */}
      <Html
        transform
        distanceFactor={2.7}
        position={[0, 0, 0.16]}
        style={{
          width: '320px',
          height: '660px',
          borderRadius: '36px',
          overflow: 'hidden',
          backgroundColor: '#07090e',
          color: '#ffffff',
          fontFamily: 'var(--font-sans)',
          boxShadow: '0 0 35px rgba(16, 185, 129, 0.25)',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, #0b0f19 0%, #07090e 100%)',
            boxSizing: 'border-box',
          }}
        >
          {/* Top Camera Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#34d399', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1px' }}>
                AI VISION CAMERA
              </div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff' }}>
                Scan Your Meal
              </div>
            </div>
            <div style={{ background: 'rgba(16,185,129,0.2)', padding: '6px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px', color: '#34d399', fontSize: '10px', fontWeight: 800 }}>
              <Sparkles size={12} /> LIVE
            </div>
          </div>

          {/* Camera Viewfinder with Corner Brackets & Laser */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '360px',
              borderRadius: '24px',
              border: '1px solid rgba(16,185,129,0.3)',
              background: 'radial-gradient(circle at center, rgba(16,185,129,0.08) 0%, rgba(0,0,0,0.6) 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Viewfinder Corner Brackets */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', width: '20px', height: '20px', borderTop: '3px solid #34d399', borderLeft: '3px solid #34d399', borderRadius: '4px 0 0 0' }} />
            <div style={{ position: 'absolute', top: '16px', right: '16px', width: '20px', height: '20px', borderTop: '3px solid #34d399', borderRight: '3px solid #34d399', borderRadius: '0 4px 0 0' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', width: '20px', height: '20px', borderBottom: '3px solid #34d399', borderLeft: '3px solid #34d399', borderRadius: '0 0 0 4px' }} />
            <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '20px', height: '20px', borderBottom: '3px solid #34d399', borderRight: '3px solid #34d399', borderRadius: '0 0 4px 0' }} />

            {/* Scanning Laser Beam */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #34d399, #06b6d4, transparent)',
                boxShadow: '0 0 15px #34d399',
                animation: 'scanLaser 2.2s infinite ease-in-out',
              }}
            />

            {/* Food Placeholder & Target Frame */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(52,211,153,0.12)', border: '2px dashed #34d399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Camera size={36} color="#34d399" />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#f8fafc', marginTop: '6px' }}>
                Position your meal
              </span>
              <span style={{ fontSize: '9px', color: '#94a3b8' }}>
                inside the frame
              </span>
            </div>

            {/* Target Detection Tag */}
            <div style={{ position: 'absolute', bottom: '24px', background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '10px', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#34d399', fontWeight: 800 }}>
              <Scan size={12} /> Auto-Detect Active
            </div>
          </div>

          {/* Bottom Capture Button */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <button
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(16,185,129,0.4)',
                cursor: 'pointer',
              }}
            >
              <Zap size={16} /> Scan Food
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function ScannerPhone({ reducedMotion = false }: ScannerPhoneProps) {
  return (
    <div style={{ width: '100%', height: '520px', position: 'relative' }}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} />
        <pointLight position={[-8, -8, -5]} color="#10b981" intensity={3} />
        <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
          <PhoneCameraModel reducedMotion={reducedMotion} />
        </Float>
      </Canvas>
      <style>{`
        @keyframes scanLaser {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 92%; opacity: 1; }
          100% { top: 0%; opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
