import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Float, Html } from '@react-three/drei';
import ShowcasePhone from './ShowcasePhone';
import { Flame, Activity, Target, ShieldCheck, Zap } from 'lucide-react';

interface ShowcaseSceneProps { activeScreenIndex: number; reducedMotion?: boolean; }

function MobileShowcaseVisual({ activeScreenIndex }: { activeScreenIndex: number }) {
  const names = ['Dashboard', 'Food Scanner', 'Meal Analysis', 'Progress', 'Health', 'Steps'];
  const colors = ['#10b981', '#34d399', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
  const color = colors[activeScreenIndex] ?? colors[0];
  return (
    <div className="mobile-showcase-visual" style={{ '--showcase-accent': color } as React.CSSProperties}>
      <div className="mobile-showcase-glow" />
      <div className="mobile-showcase-phone">
        <div className="mobile-showcase-top"><span>9:41</span><strong>CALORIX</strong></div>
        <div className="mobile-showcase-title">{names[activeScreenIndex]}</div>
        <div className="mobile-showcase-main-card">
          <small>{activeScreenIndex === 0 ? "TODAY'S CALORIES" : activeScreenIndex === 1 ? 'AI FOOD SCANNER' : 'CALORIX INSIGHT'}</small>
          <strong>{activeScreenIndex === 0 ? '1,240 kcal' : activeScreenIndex === 1 ? 'Ready to scan' : activeScreenIndex === 2 ? '642 kcal' : activeScreenIndex === 3 ? '78% progress' : activeScreenIndex === 4 ? 'BMI 26.5' : '7,842 steps'}</strong>
          <div className="mobile-showcase-bar"><span style={{ width: `${45 + activeScreenIndex * 7}%` }} /></div>
        </div>
        <div className="mobile-showcase-grid">
          <span>PROTEIN<strong>78g</strong></span><span>CARBS<strong>142g</strong></span><span>FAT<strong>42g</strong></span>
        </div>
        <div className="mobile-showcase-row"><Activity size={17} /><span>Activity tracking<strong>7,842 steps</strong></span></div>
        <div className="mobile-showcase-row"><ShieldCheck size={17} /><span>AI-powered insights<strong>Personalized for you</strong></span></div>
        <div className="mobile-showcase-dock"><span>⌂</span><span>◉</span><span>✦</span><span>◎</span></div>
      </div>
      <div className="mobile-showcase-chip"><Zap size={14} /><strong>Interactive {names[activeScreenIndex]}</strong></div>
    </div>
  );
}

export default function ShowcaseScene({ activeScreenIndex, reducedMotion = false }: ShowcaseSceneProps) {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 768);
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  if (isMobile) return <MobileShowcaseVisual activeScreenIndex={activeScreenIndex} />;

  const featureLabels = [
    { id: 'recognition', label: 'AI Food Recognition', pos: [-3.2, 1.8, 0] as [number, number, number], icon: Zap, color: '#10b981' },
    { id: 'nutrition', label: 'Smart Nutrition Tracking', pos: [3.0, 1.6, 0] as [number, number, number], icon: Flame, color: '#f59e0b' },
    { id: 'goals', label: 'Personalized Goals', pos: [-3.0, -0.2, 0] as [number, number, number], icon: Target, color: '#ec4899' },
    { id: 'activity', label: 'Activity Tracking', pos: [3.2, -0.4, 0] as [number, number, number], icon: Activity, color: '#06b6d4' },
    { id: 'insights', label: 'Progress Insights', pos: [0, -2.4, 0] as [number, number, number], icon: ShieldCheck, color: '#8b5cf6' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '560px', minHeight: '560px', overflow: 'hidden', background: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.10) 0%, rgba(139,92,246,0.05) 32%, rgba(7,9,14,0) 70%)' }}>
      <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }} onCreated={({ gl }) => gl.setClearColor(0x07090e, 0)}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} />
        <pointLight position={[-8, 6, 5]} color="#10b981" intensity={3} />
        <pointLight position={[8, -6, 5]} color="#8b5cf6" intensity={3} />
        <ShowcasePhone activeScreenIndex={activeScreenIndex} reducedMotion={reducedMotion} />
        <Float speed={2.2} rotationIntensity={0.3} position={[-2.8, 1.0, 0.6]}>
          <Html transform distanceFactor={4.8} style={{ pointerEvents: 'none' }}>
            <div style={{ background: 'rgba(11,15,25,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(16,185,129,0.35)', padding: '10px 16px', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}><Flame color="#34d399" size={18} /><div><div style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 800 }}>CALORIES</div><div style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>1,240 kcal</div></div></div>
          </Html>
        </Float>
        <Float speed={2.5} rotationIntensity={0.3} position={[2.8, 0.8, 0.6]}>
          <Html transform distanceFactor={4.8} style={{ pointerEvents: 'none' }}><div style={{ background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(56,189,248,0.35)', padding: '10px 16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}><Zap color="#38bdf8" size={18} /><div><div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800 }}>PROTEIN</div><div style={{ fontSize: '14px', fontWeight: 900, color: '#38bdf8' }}>78g</div></div></div></Html>
        </Float>
        {featureLabels.map((lbl) => { const IconC = lbl.icon; const isHovered = hoveredLabel === lbl.id; return <Html key={lbl.id} position={lbl.pos} transform distanceFactor={5.5}><div onMouseEnter={() => setHoveredLabel(lbl.id)} onMouseLeave={() => setHoveredLabel(null)} style={{ background: isHovered ? 'rgba(18,24,38,.96)' : 'rgba(11,15,25,.78)', border: isHovered ? `1px solid ${lbl.color}` : '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '8px 14px', color: isHovered ? '#fff' : '#cbd5e1', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}><IconC size={14} color={lbl.color} />{lbl.label}</div></Html>; })}
        <Sparkles count={40} scale={7} size={3} speed={reducedMotion ? 0.2 : 0.6} color="#34d399" />
      </Canvas>
    </div>
  );
}
