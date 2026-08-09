import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import CalorixPhone from './CalorixPhone';
import CalorieRing from './CalorieRing';

interface CTAVisualProps {
  reducedMotion?: boolean;
}

function StaticCTAFallback() {
  return (
    <div style={{ width: '100%', height: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: '260px',
          height: '500px',
          borderRadius: '32px',
          background: '#07090e',
          border: '8px solid #1e293b',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(16,185,129,0.3)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          transform: 'perspective(1000px) rotateY(-10deg) rotateX(5deg)',
        }}
      >
        <div style={{ fontSize: '11px', color: '#34d399', fontWeight: 800 }}>CALORIX AI APP</div>
        <div style={{ fontSize: '20px', fontWeight: 900, color: '#fff' }}>Start Your Journey</div>
        <div style={{ background: 'rgba(16,185,129,0.15)', padding: '14px', borderRadius: '16px', border: '1px solid rgba(16,185,129,0.3)' }}>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>DAILY GOAL</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#fff' }}>1,240 / 2,100 kcal</div>
        </div>
      </div>
    </div>
  );
}

export default function CTAVisual({ reducedMotion = false }: CTAVisualProps) {
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGlSupported(false);
    } catch {
      setWebGlSupported(false);
    }
  }, []);

  if (!webGlSupported) {
    return <StaticCTAFallback />;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '460px' }}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8.0], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 12, 10]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-8, -6, 4]} color="#10b981" intensity={3.5} />
        <pointLight position={[8, 6, 4]} color="#8b5cf6" intensity={3.5} />

        <CalorixPhone activeTab="scanner" reducedMotion={reducedMotion} />
        <CalorieRing position={[2.4, 1.4, 0.6]} reducedMotion={reducedMotion} />
        <Sparkles count={40} scale={7} size={3} speed={0.6} color="#34d399" />
      </Canvas>
    </div>
  );
}
