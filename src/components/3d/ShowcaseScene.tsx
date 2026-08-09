import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Float, Html } from '@react-three/drei';
import ShowcasePhone from './ShowcasePhone';
import { Flame, Activity, Target, ShieldCheck, Zap } from 'lucide-react';

interface ShowcaseSceneProps {
  activeScreenIndex: number;
  reducedMotion?: boolean;
}

export default function ShowcaseScene({ activeScreenIndex, reducedMotion = false }: ShowcaseSceneProps) {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const featureLabels = [
    { id: 'recognition', label: 'AI Food Recognition', pos: [-3.2, 1.8, 0], icon: Zap, color: '#10b981' },
    { id: 'nutrition', label: 'Smart Nutrition Tracking', pos: [3.0, 1.6, 0], icon: Flame, color: '#f59e0b' },
    { id: 'goals', label: 'Personalized Goals', pos: [-3.0, -0.2, 0], icon: Target, color: '#ec4899' },
    { id: 'activity', label: 'Activity Tracking', pos: [3.2, -0.4, 0], icon: Activity, color: '#06b6d4' },
    { id: 'insights', label: 'Progress Insights', pos: [0, -2.4, 0], icon: ShieldCheck, color: '#8b5cf6' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '560px' }}>
      <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} />
        <pointLight position={[-8, 6, 5]} color="#10b981" intensity={3} />
        <pointLight position={[8, -6, 5]} color="#8b5cf6" intensity={3} />

        {/* Central 3D Phone Mockup */}
        <ShowcasePhone activeScreenIndex={activeScreenIndex} reducedMotion={reducedMotion} />

        {/* Floating Glass Metric Badge 1: Calories */}
        <Float speed={2.2} rotationIntensity={0.3} position={[-2.8, 1.0, 0.6]}>
          <Html transform distanceFactor={4.8} style={{ pointerEvents: 'none' }}>
            <div style={{ background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(16,185,129,0.35)', padding: '10px 16px', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
              <Flame color="#34d399" size={18} />
              <div>
                <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800 }}>CALORIES</div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>1,240 kcal</div>
              </div>
            </div>
          </Html>
        </Float>

        {/* Floating Glass Metric Badge 2: Protein */}
        <Float speed={2.5} rotationIntensity={0.3} position={[2.8, 0.8, 0.6]}>
          <Html transform distanceFactor={4.8} style={{ pointerEvents: 'none' }}>
            <div style={{ background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(56,189,248,0.35)', padding: '10px 16px', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
              <Zap color="#38bdf8" size={18} />
              <div>
                <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800 }}>PROTEIN</div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#38bdf8' }}>78g</div>
              </div>
            </div>
          </Html>
        </Float>

        {/* Floating Glass Metric Badge 3: Steps */}
        <Float speed={2.0} rotationIntensity={0.3} position={[-2.6, -1.6, 0.5]}>
          <Html transform distanceFactor={4.8} style={{ pointerEvents: 'none' }}>
            <div style={{ background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(6,182,212,0.35)', padding: '10px 16px', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
              <Activity color="#06b6d4" size={18} />
              <div>
                <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800 }}>STEPS</div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>7,842 steps</div>
              </div>
            </div>
          </Html>
        </Float>

        {/* Floating Glass Metric Badge 4: Goal */}
        <Float speed={2.4} rotationIntensity={0.3} position={[2.6, -1.5, 0.5]}>
          <Html transform distanceFactor={4.8} style={{ pointerEvents: 'none' }}>
            <div style={{ background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(139,92,246,0.35)', padding: '10px 16px', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
              <Target color="#a78bfa" size={18} />
              <div>
                <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800 }}>GOAL</div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#a78bfa' }}>78% Hit</div>
              </div>
            </div>
          </Html>
        </Float>

        {/* Interactive Feature Callout Labels with Connecting Lines */}
        {featureLabels.map((lbl) => {
          const IconC = lbl.icon;
          const isHovered = hoveredLabel === lbl.id;
          return (
            <Html key={lbl.id} position={lbl.pos as [number, number, number]} transform distanceFactor={5.5}>
              <div
                onMouseEnter={() => setHoveredLabel(lbl.id)}
                onMouseLeave={() => setHoveredLabel(null)}
                style={{
                  background: isHovered ? 'rgba(18, 24, 38, 0.95)' : 'rgba(11, 15, 25, 0.75)',
                  backdropFilter: 'blur(12px)',
                  border: isHovered ? `1px solid ${lbl.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  color: isHovered ? '#ffffff' : '#cbd5e1',
                  fontSize: '11px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: isHovered ? `0 0 20px ${lbl.color}50` : 'none',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                  transform: isHovered ? 'scale(1.08)' : 'scale(1.0)',
                }}
              >
                <IconC size={14} color={lbl.color} />
                {lbl.label}
              </div>
            </Html>
          );
        })}

        <Sparkles count={40} scale={7} size={3} speed={0.6} color="#34d399" />
      </Canvas>
    </div>
  );
}
