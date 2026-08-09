import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Torus, Sphere, Icosahedron, Cylinder, Float, Sparkles } from '@react-three/drei';
import { Sparkles as SparklesIcon, CheckCircle2, TrendingUp, Bell, Globe } from 'lucide-react';

// 1. AI Food Scanner Visual
export function FeatureScannerVisual() {
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setScanning((prev) => !prev);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '20px', overflow: 'hidden', background: 'rgba(7, 9, 14, 0.7)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
      {/* 3D Canvas with Stylized Plate & Food Node */}
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[0, 0, 3]} color="#10b981" intensity={3} />

        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          {/* Stylized Plate */}
          <Cylinder args={[1.5, 1.4, 0.1, 32]} rotation={[0.4, 0, 0]}>
            <meshPhysicalMaterial color="#1e293b" roughness={0.2} metalness={0.8} clearcoat={0.8} />
          </Cylinder>

          {/* Stylized Food Node (Avocado Salmon Bowl shape) */}
          <Sphere args={[0.55, 24, 24]} position={[0, 0.25, 0.1]}>
            <meshPhysicalMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.4} roughness={0.3} />
          </Sphere>
          <Icosahedron args={[0.3, 0]} position={[0.4, 0.35, 0.3]}>
            <meshPhysicalMaterial color="#f97316" emissive="#c2410c" emissiveIntensity={0.5} />
          </Icosahedron>
        </Float>

        <Sparkles count={25} scale={4} size={3} speed={0.8} color="#34d399" />
      </Canvas>

      {/* Laser Scanning Beam Line */}
      {scanning && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #34d399, #06b6d4, transparent)',
            boxShadow: '0 0 15px #34d399, 0 0 30px #06b6d4',
            animation: 'scanBeam 2s infinite ease-in-out',
          }}
        />
      )}

      {/* Live AI Overlay UI */}
      <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px', background: 'rgba(11, 15, 25, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '14px', padding: '10px 14px' }}>
        {scanning ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '12px', fontWeight: 800 }}>
              <SparklesIcon size={14} className="animate-spin" /> SCANNING MEAL...
            </div>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>AI Analyzing...</span>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '12px', fontWeight: 800 }}>
                <CheckCircle2 size={14} color="#34d399" /> ANALYSIS COMPLETE
              </div>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#ffffff' }}>642 kcal</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', fontSize: '10px' }}>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>PRO: 28g</span>
              <span style={{ color: '#f59e0b', fontWeight: 700 }}>CARB: 61g</span>
              <span style={{ color: '#a78bfa', fontWeight: 700 }}>FAT: 24g</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scanBeam {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 90%; opacity: 1; }
          100% { top: 0%; opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

// 2. Calorie Tracking Ring Visual
export function CalorieRingVisual() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', width: '100%', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[2, 2, 2]} color="#f59e0b" intensity={3} />
        <Float speed={2} rotationIntensity={0.4}>
          <Torus args={[1.0, 0.12, 20, 50]} rotation={[0.4, 0.4, 0]}>
            <meshPhysicalMaterial color="#f59e0b" emissive="#b45309" emissiveIntensity={0.6} roughness={0.2} metalness={0.7} />
          </Torus>
        </Float>
      </Canvas>

      <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>1,240 <span style={{ fontSize: '0.8rem', color: '#f59e0b' }}>kcal</span></div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: hovered ? '#34d399' : '#94a3b8' }}>
          {hovered ? '860 kcal remaining' : '59% of 2,100'}
        </div>
      </div>
    </div>
  );
}

// 3. Nutrition Analysis Visual
export function NutritionChartVisual() {
  return (
    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, marginBottom: '4px' }}>
          <span style={{ color: '#38bdf8' }}>PROTEIN</span>
          <span style={{ color: '#ffffff' }}>78g / 120g</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: '65%', height: '100%', background: '#38bdf8', borderRadius: '3px' }} />
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, marginBottom: '4px' }}>
          <span style={{ color: '#f59e0b' }}>CARBOHYDRATES</span>
          <span style={{ color: '#ffffff' }}>142g / 210g</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: '68%', height: '100%', background: '#f59e0b', borderRadius: '3px' }} />
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, marginBottom: '4px' }}>
          <span style={{ color: '#a78bfa' }}>FATS</span>
          <span style={{ color: '#ffffff' }}>42g / 65g</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: '64%', height: '100%', background: '#a78bfa', borderRadius: '3px' }} />
        </div>
      </div>
    </div>
  );
}

// 4. Goal Target Visual
export function GoalTargetVisual() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[2, 2, 2]} color="#ec4899" intensity={3} />
        <Float speed={2.2} rotationIntensity={0.5}>
          <Torus args={[0.9, 0.08, 16, 40]} rotation={[0.3, 0.3, 0]}>
            <meshPhysicalMaterial color="#ec4899" emissive="#be185d" emissiveIntensity={0.7} />
          </Torus>
          <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
            <meshPhysicalMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.8} />
          </Sphere>
        </Float>
      </Canvas>
      <div style={{ position: 'absolute', bottom: '8px', background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)', padding: '4px 10px', borderRadius: '10px', fontSize: '10px', fontWeight: 800, color: '#ec4899' }}>
        🎯 Target: 2,100 kcal
      </div>
    </div>
  );
}

// 5. Progress Graph Visual
export function ProgressGraphVisual() {
  const days = [
    { day: 'Mon', val: 55 },
    { day: 'Tue', val: 75 },
    { day: 'Wed', val: 65 },
    { day: 'Thu', val: 90 },
    { day: 'Fri', val: 80 },
    { day: 'Sat', val: 95 },
    { day: 'Sun', val: 88 },
  ];

  return (
    <div style={{ padding: '16px', background: 'rgba(11, 15, 25, 0.6)', borderRadius: '18px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TrendingUp size={14} color="#8b5cf6" /> WEEKLY AI HEALTH TREND
        </span>
        <span style={{ fontSize: '11px', fontWeight: 900, color: '#34d399' }}>Score: 94/100</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '90px', gap: '8px' }}>
        {days.map((item, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '100%', height: `${item.val}%`, background: 'linear-gradient(180deg, #8b5cf6, rgba(139, 92, 246, 0.2))', borderRadius: '6px', boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)' }} />
            <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700 }}>{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 6. Step Tracker Visual
export function StepTrackerVisual() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'conic-gradient(#06b6d4 78%, rgba(255,255,255,0.1) 0%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#07090e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900, color: '#06b6d4' }}>
          78%
        </div>
      </div>
      <div>
        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>DAILY STEPS</div>
        <div style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff' }}>
          7,842 <span style={{ fontSize: '10px', color: '#06b6d4' }}>/ 10,000</span>
        </div>
      </div>
    </div>
  );
}

// 7. Notification Visual
export function NotificationVisual() {
  return (
    <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '14px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Bell size={18} color="#34d399" />
      </div>
      <div>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#ffffff' }}>🎯 Goal Hit!</div>
        <div style={{ fontSize: '9px', color: '#94a3b8' }}>Protein target completed</div>
      </div>
    </div>
  );
}

// 8. Language & Themes Visual
export function LanguageGlobeVisual() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6366f1', fontSize: '11px', fontWeight: 800 }}>
        <Globe size={16} /> EN | UR | ES | AR
      </div>
      <div style={{ background: '#1e293b', padding: '2px 8px', borderRadius: '8px', fontSize: '10px', color: '#34d399', fontWeight: 700 }}>
        Dark Theme
      </div>
    </div>
  );
}
