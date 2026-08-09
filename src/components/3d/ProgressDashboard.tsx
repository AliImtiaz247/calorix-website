import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Sphere, Float, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Flame, Activity, Trophy, TrendingUp } from 'lucide-react';

interface ProgressDashboardProps {
  reducedMotion?: boolean;
}

function DashboardStage({ reducedMotion = false }: ProgressDashboardProps) {
  const torusRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
      torusRef.current.rotation.y = t * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -Math.cos(t * 0.4) * 0.2;
      ring2Ref.current.rotation.y = -t * 0.6;
    }
  });

  return (
    <group>
      {/* Primary Goal Progress Ring */}
      <Torus ref={torusRef} args={[1.5, 0.1, 20, 60]}>
        <meshPhysicalMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={0.6} roughness={0.15} metalness={0.8} />
      </Torus>

      {/* Secondary Cyan Accent Ring */}
      <Torus ref={ring2Ref} args={[2.0, 0.04, 16, 50]} rotation={[Math.PI / 3, 0, 0]}>
        <meshPhysicalMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={0.8} />
      </Torus>

      {/* Central Floating Sphere */}
      <Sphere args={[0.5, 24, 24]}>
        <meshPhysicalMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.6} />
      </Sphere>

      {/* Main 3D Dashboard HTML Overlay */}
      <Html position={[0, 0, 0.2]} transform distanceFactor={4.8} style={{ pointerEvents: 'none' }}>
        <div style={{ width: '310px', background: 'rgba(11, 15, 25, 0.88)', backdropFilter: 'blur(16px)', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '24px', padding: '20px', boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(139,92,246,0.25)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              TODAY'S PROGRESS
            </div>
            <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '4px 10px', borderRadius: '10px', color: '#a78bfa', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Trophy size={14} /> 78% Goal
            </div>
          </div>

          {/* Calorie Progress */}
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', color: '#34d399', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={14} /> Calories Intake
              </span>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#ffffff' }}>
                1,240 <span style={{ fontSize: '10px', color: '#94a3b8' }}>/ 2,100</span>
              </span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '59%', height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: '3px' }} />
            </div>
          </div>

          {/* Steps Progress */}
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', color: '#06b6d4', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Activity size={14} /> Daily Steps
              </span>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#ffffff' }}>
                7,842 <span style={{ fontSize: '10px', color: '#94a3b8' }}>/ 10,000</span>
              </span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '78%', height: '100%', background: 'linear-gradient(90deg, #06b6d4, #38bdf8)', borderRadius: '3px' }} />
            </div>
          </div>

          {/* Trendline Preview */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: '#34d399', fontWeight: 800, paddingTop: '4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={14} /> +14% vs last week
            </span>
            <span style={{ color: '#a78bfa' }}>Optimal Track</span>
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function ProgressDashboard({ reducedMotion = false }: ProgressDashboardProps) {
  return (
    <div style={{ width: '100%', height: '520px', position: 'relative' }}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} />
        <pointLight position={[-6, 6, 4]} color="#8b5cf6" intensity={3.5} />
        <pointLight position={[6, -6, 4]} color="#06b6d4" intensity={3.5} />

        <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
          <DashboardStage reducedMotion={reducedMotion} />
        </Float>

        <Sparkles count={45} scale={6} size={3.5} speed={0.7} color="#a78bfa" />
      </Canvas>
    </div>
  );
}
