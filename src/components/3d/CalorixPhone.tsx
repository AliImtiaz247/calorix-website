import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Flame, Activity, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

interface CalorixPhoneProps {
  pointerVector?: React.MutableRefObject<{ x: number; y: number }>;
  scrollOffset?: number;
  reducedMotion?: boolean;
  isMobile?: boolean;
  activeTab?: string;
}

export function PhoneModel({
  pointerVector,
  scrollOffset = 0,
  reducedMotion = false,
  isMobile = false,
}: CalorixPhoneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Default baseline rotation
  const defaultRotX = 0.1;
  const defaultRotY = -0.22;
  const defaultRotZ = 0;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (reducedMotion) {
      groupRef.current.rotation.set(defaultRotX, defaultRotY, defaultRotZ);
      return;
    }

    // 1. Mouse pointer target calculation
    const mouseX = pointerVector ? pointerVector.current.x : 0;
    const mouseY = pointerVector ? pointerVector.current.y : 0;

    const targetRotY = defaultRotY + mouseX * 0.45 + (hovered ? 0.1 : 0);
    const targetRotX = defaultRotX - mouseY * 0.35 + Math.sin(t * 0.8) * 0.04;
    const targetRotZ = defaultRotZ + Math.cos(t * 0.6) * 0.02;

    // 2. Scroll interaction calculation
    const scrollRotY = scrollOffset * 0.8;
    const scrollPosY = -scrollOffset * 0.6;
    const scrollScale = 1 + scrollOffset * 0.05;

    // 3. Smooth Damping (Lerp)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY + scrollRotY, 0.06);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.06);

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      Math.sin(t * 1.2) * 0.08 + scrollPosY,
      0.06
    );

    const baseScale = isMobile ? 0.85 : 1.0;
    const finalScale = baseScale * scrollScale;
    groupRef.current.scale.lerp(new THREE.Vector3(finalScale, finalScale, finalScale), 0.08);
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      rotation={[defaultRotX, defaultRotY, defaultRotZ]}
    >
      {/* Outer Metallic Titanium Chassis */}
      <RoundedBox args={[2.75, 5.5, 0.28]} radius={0.26} smoothness={8}>
        <meshPhysicalMaterial
          color="#0f172a"
          metalness={0.92}
          roughness={0.12}
          clearcoat={0.9}
          clearcoatRoughness={0.08}
          reflectivity={1}
        />
      </RoundedBox>

      {/* Side Metallic Volume/Power Buttons */}
      <RoundedBox args={[0.06, 0.5, 0.12]} position={[1.4, 1.2, 0]} radius={0.02}>
        <meshPhysicalMaterial color="#334155" metalness={0.9} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[0.06, 0.5, 0.12]} position={[1.4, 0.5, 0]} radius={0.02}>
        <meshPhysicalMaterial color="#334155" metalness={0.9} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[0.06, 0.7, 0.12]} position={[-1.4, 0.8, 0]} radius={0.02}>
        <meshPhysicalMaterial color="#334155" metalness={0.9} roughness={0.2} />
      </RoundedBox>

      {/* Screen Glass Bezel */}
      <RoundedBox args={[2.6, 5.34, 0.29]} radius={0.23} smoothness={8} position={[0, 0, 0.01]}>
        <meshBasicMaterial color="#030712" />
      </RoundedBox>

      {/* Screen HTML Content Overlay */}
      <Html
        transform
        wrapperClass="phone-screen-wrapper"
        distanceFactor={2.7}
        position={[0, 0, 0.16]}
        style={{
          width: '330px',
          height: '675px',
          borderRadius: '38px',
          overflow: 'hidden',
          backgroundColor: '#07090e',
          color: '#ffffff',
          fontFamily: 'var(--font-sans)',
          boxShadow: '0 0 40px rgba(16, 185, 129, 0.25)',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: 'linear-gradient(180deg, #0d1322 0%, #07090e 100%)',
            boxSizing: 'border-box',
          }}
        >
          {/* Dynamic Island Notch & Status Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8' }}>9:41</span>
            <div
              style={{
                width: '84px',
                height: '18px',
                background: '#000000',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#06b6d4' }} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#34d399' }}>5G 100%</span>
          </div>

          {/* App Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>Good Morning 👋</div>
              <div style={{ fontSize: '17px', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                Alex Morgan
              </div>
            </div>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '13px',
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(16,185,129,0.4)',
              }}
            >
              AI
            </div>
          </div>

          {/* Today's Calories Main Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.08))',
              borderRadius: '20px',
              border: '1px solid rgba(16,185,129,0.35)',
              padding: '14px',
              position: 'relative',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 800 }}>
                  TODAY'S CALORIES
                </div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', marginTop: '2px' }}>
                  1,240 <span style={{ fontSize: '13px', fontWeight: 700, color: '#34d399' }}>/ 2,100 kcal</span>
                </div>
              </div>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'conic-gradient(#10b981 59%, rgba(255,255,255,0.1) 0%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: '#07090e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 900,
                    color: '#34d399',
                  }}
                >
                  59%
                </div>
              </div>
            </div>

            {/* Today's Progress Bar */}
            <div style={{ marginTop: '12px', width: '100%', height: '7px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '59%', height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: '4px' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>
              <span>Burned: 580 kcal</span>
              <span>Remaining: 860 kcal</span>
            </div>
          </div>

          {/* Macro Breakdown Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', border: '1px solid rgba(56,189,248,0.2)', padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Protein</div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#38bdf8', marginTop: '2px' }}>78g</div>
              <div style={{ fontSize: '8px', color: '#94a3b8' }}>Target: 120g</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', border: '1px solid rgba(245,158,11,0.2)', padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Carbs</div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#f59e0b', marginTop: '2px' }}>142g</div>
              <div style={{ fontSize: '8px', color: '#94a3b8' }}>Target: 210g</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', border: '1px solid rgba(167,139,250,0.2)', padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Fat</div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#a78bfa', marginTop: '2px' }}>42g</div>
              <div style={{ fontSize: '8px', color: '#94a3b8' }}>Target: 65g</div>
            </div>
          </div>

          {/* Steps Activity Card */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={18} color="#f59e0b" />
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>STEPS TODAY</div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>
                  7,842 <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 600 }}>/ 10,000</span>
                </div>
              </div>
            </div>
            <ChevronRight size={16} color="#64748b" />
          </div>

          {/* AI Scan Recent Item */}
          <div
            style={{
              background: 'rgba(16,185,129,0.08)',
              borderRadius: '16px',
              border: '1px solid rgba(16,185,129,0.2)',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} color="#34d399" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#ffffff' }}>Avocado Quinoa Salad</div>
              <div style={{ fontSize: '9px', color: '#34d399', fontWeight: 600 }}>AI Vision Logged • 480 kcal</div>
            </div>
            <Zap size={14} color="#f59e0b" />
          </div>

          {/* Bottom Dock */}
          <div
            style={{
              marginTop: 'auto',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '8px 16px',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#10b981' }}>
              <Flame size={16} />
              <span style={{ fontSize: '8px', marginTop: '2px', fontWeight: 800 }}>Home</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94a3b8' }}>
              <Zap size={16} />
              <span style={{ fontSize: '8px', marginTop: '2px', fontWeight: 600 }}>AI Scan</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94a3b8' }}>
              <Activity size={16} />
              <span style={{ fontSize: '8px', marginTop: '2px', fontWeight: 600 }}>Stats</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function CalorixPhone(props: CalorixPhoneProps) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <PhoneModel {...props} />
    </Float>
  );
}
