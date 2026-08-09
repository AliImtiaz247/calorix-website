import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Camera, Activity, Zap, Scale } from 'lucide-react';

interface ShowcasePhoneProps {
  activeScreenIndex: number;
  reducedMotion?: boolean;
}

function PhoneShowcaseModel({ activeScreenIndex, reducedMotion = false }: ShowcasePhoneProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetRotationY = useRef(-0.25);

  useEffect(() => {
    // Add subtle rotation nudge when changing screen tab
    targetRotationY.current = -0.25 + (activeScreenIndex % 2 === 0 ? 0.08 : -0.08);
  }, [activeScreenIndex]);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotationY.current + x * 0.35 + (hovered ? 0.1 : 0),
      0.06
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      0.1 - y * 0.25 + Math.sin(t * 0.8) * 0.03,
      0.06
    );
  });

  const renderScreenContent = () => {
    switch (activeScreenIndex) {
      case 0:
        // Dashboard
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800 }}>Good Morning 👋</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff' }}>Alex Morgan</div>
            <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(6,182,212,0.1))', padding: '14px', borderRadius: '18px', border: '1px solid rgba(16,185,129,0.35)' }}>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>TODAY'S CALORIES</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', marginTop: '2px' }}>
                1,240 <span style={{ fontSize: '13px', color: '#34d399' }}>/ 2,100 kcal</span>
              </div>
              <div style={{ marginTop: '10px', width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                <div style={{ width: '59%', height: '100%', background: '#10b981', borderRadius: '3px' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '8px', color: '#38bdf8', fontWeight: 800 }}>PROTEIN</div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>78g</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '8px', color: '#f59e0b', fontWeight: 800 }}>CARBS</div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>142g</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '8px', color: '#a78bfa', fontWeight: 800 }}>FAT</div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>42g</div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={18} color="#06b6d4" />
              <div>
                <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800 }}>STEPS TODAY</div>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff' }}>7,842 / 10,000</div>
              </div>
            </div>
          </div>
        );

      case 1:
        // Food Scanner
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff' }}>Scan Your Food</div>
            <div style={{ flex: 1, position: 'relative', background: 'rgba(16,185,129,0.08)', borderRadius: '20px', border: '2px dashed #34d399', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#34d399', animation: 'scanLaser 2s infinite' }} />
              <Camera size={36} color="#34d399" />
              <span style={{ fontSize: '11px', fontWeight: 800, marginTop: '8px', color: '#fff' }}>Position your food</span>
              <span style={{ fontSize: '9px', color: '#94a3b8' }}>inside the frame</span>
            </div>
            <button style={{ width: '100%', padding: '12px', background: '#10b981', border: 'none', borderRadius: '14px', color: '#fff', fontWeight: 900, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Zap size={14} /> Scan Food
            </button>
          </div>
        );

      case 2:
        // Meal Analysis
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '12px', color: '#34d399', fontWeight: 800, textTransform: 'uppercase' }}>ANALYSIS RESULT</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff' }}>Chicken Rice Bowl</div>
            <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', padding: '14px', borderRadius: '18px' }}>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#34d399' }}>642 kcal</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>AI Confidence 92%</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>Protein</span><span style={{ fontWeight: 900, color: '#38bdf8' }}>28g</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>Carbs</span><span style={{ fontWeight: 900, color: '#f59e0b' }}>61g</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>Fat</span><span style={{ fontWeight: 900, color: '#a78bfa' }}>24g</span></div>
            </div>
          </div>
        );

      case 3:
        // Progress
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff' }}>Your Progress</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '14px' }}>
                <div style={{ fontSize: '9px', color: '#94a3b8' }}>WEIGHT</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#fff' }}>94 kg</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '14px' }}>
                <div style={{ fontSize: '9px', color: '#94a3b8' }}>GOAL</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#34d399' }}>78%</div>
              </div>
            </div>
            <div style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', padding: '12px', borderRadius: '16px' }}>
              <div style={{ fontSize: '10px', color: '#a78bfa', fontWeight: 800, marginBottom: '6px' }}>WEEKLY CALORIES</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '60px' }}>
                {[60, 75, 65, 85, 70, 90, 80].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: '#8b5cf6', borderRadius: '3px' }} />
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        // Health Calculator
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Scale size={18} color="#ec4899" /> Health Calculator
            </div>
            <div style={{ background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.3)', padding: '14px', borderRadius: '18px' }}>
              <div style={{ fontSize: '10px', color: '#ec4899', fontWeight: 800 }}>BMI CALCULATOR</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#fff', marginTop: '2px' }}>26.5 <span style={{ fontSize: '11px', color: '#ec4899' }}>Normal Range</span></div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Daily Calories</span><span style={{ fontWeight: 900, color: '#fff' }}>2,100 kcal</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Goal Strategy</span><span style={{ fontWeight: 900, color: '#34d399' }}>Weight Management</span></div>
            </div>
          </div>
        );

      case 5:
        // Steps Tracker
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff' }}>Today's Activity</div>
            <div style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)', padding: '16px', borderRadius: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#06b6d4' }}>7,842</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800 }}>STEPS TAKEN</div>
              <div style={{ marginTop: '8px', fontSize: '10px', color: '#38bdf8' }}>Goal: 10,000 steps</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px' }}>
                <div style={{ fontSize: '9px', color: '#94a3b8' }}>DISTANCE</div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff' }}>5.6 km</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px' }}>
                <div style={{ fontSize: '9px', color: '#94a3b8' }}>ACTIVITY</div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff' }}>68 min</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      rotation={[0.1, targetRotationY.current, 0]}
    >
      {/* Outer Metallic Chassis */}
      <RoundedBox args={[2.7, 5.4, 0.28]} radius={0.25} smoothness={8}>
        <meshPhysicalMaterial color="#0f172a" metalness={0.92} roughness={0.12} clearcoat={0.9} />
      </RoundedBox>

      {/* Screen Glass Bezel */}
      <RoundedBox args={[2.55, 5.25, 0.29]} radius={0.22} smoothness={8} position={[0, 0, 0.01]}>
        <meshBasicMaterial color="#030712" />
      </RoundedBox>

      {/* Dynamic Screen HTML Overlay */}
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
          boxShadow: '0 0 40px rgba(16, 185, 129, 0.25)',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, #0b0f19 0%, #07090e 100%)',
            boxSizing: 'border-box',
          }}
        >
          {/* Status Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2px 8px 2px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8' }}>9:41</span>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#34d399' }}>Calorix v2.4</span>
          </div>

          {/* Active Screen Layout */}
          {renderScreenContent()}

          {/* Bottom Dock Navigation */}
          <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.08)', borderRadius: '18px', padding: '8px 14px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: activeScreenIndex === 0 ? '#10b981' : '#94a3b8' }}>
              <Activity size={16} />
              <span style={{ fontSize: '8px', marginTop: '2px', fontWeight: 700 }}>App</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function ShowcasePhone(props: ShowcasePhoneProps) {
  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <PhoneShowcaseModel {...props} />
    </Float>
  );
}
