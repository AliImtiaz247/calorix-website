import { useRef, useEffect, useState, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import CalorixPhone from './CalorixPhone';
import FloatingObjects from './FloatingObjects';
import CalorieRing from './CalorieRing';
import { Activity } from 'lucide-react';

interface HeroSceneProps {
  reducedMotion?: boolean;
}

interface FallbackState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, FallbackState> {
  state: FallbackState = { hasError: false };

  static getDerivedStateFromError(): FallbackState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL Context Error caught in HeroScene:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function StaticPhoneFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.24) 0%, rgba(6,182,212,0.10) 35%, transparent 72%)',
          filter: 'blur(18px)',
        }}
      />
      <div
        style={{
          width: 'min(280px, 72vw)',
          height: 'min(560px, 125vw)',
          maxHeight: '520px',
          borderRadius: '36px',
          background: 'linear-gradient(180deg, #0d1322 0%, #07090e 100%)',
          border: '10px solid #1e293b',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(16,185,129,0.3)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          transform: 'perspective(1000px) rotateY(-12deg) rotateX(6deg)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', fontWeight: 800 }}>
          <span>9:41</span>
          <span style={{ color: '#34d399' }}>Calorix AI</span>
        </div>
        <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.1))', padding: '14px', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.4)' }}>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>TODAY'S CALORIES</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#fff', marginTop: '2px' }}>
            1,240 <span style={{ fontSize: '12px', color: '#34d399' }}>/ 2,100 kcal</span>
          </div>
          <div style={{ marginTop: '10px', width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
            <div style={{ width: '59%', height: '100%', background: '#10b981', borderRadius: '3px' }} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '8px', color: '#94a3b8' }}>PRO</div><div style={{ fontSize: '13px', fontWeight: 900, color: '#38bdf8' }}>78g</div></div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '8px', color: '#94a3b8' }}>CARB</div><div style={{ fontSize: '13px', fontWeight: 900, color: '#f59e0b' }}>142g</div></div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '10px', textAlign: 'center' }}><div style={{ fontSize: '8px', color: '#94a3b8' }}>FAT</div><div style={{ fontSize: '13px', fontWeight: 900, color: '#a78bfa' }}>42g</div></div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={16} color="#f59e0b" />
          <div style={{ fontSize: '12px', fontWeight: 800 }}>Steps: 7,842 / 10,000</div>
        </div>
      </div>
    </div>
  );
}

export default function HeroScene({ reducedMotion = false }: HeroSceneProps) {
  const pointerVector = useRef({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    updateViewport();

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGlSupported(false);
    } catch {
      setWebGlSupported(false);
    }

    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerVector.current = { x, y };
    };
    const handlePointerLeave = () => {
      pointerVector.current = { x: 0, y: 0 };
    };
    const handleScroll = () => {
      const offset = window.scrollY / window.innerHeight;
      setScrollOffset(Math.min(1.5, offset));
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateViewport, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  if (!webGlSupported) {
    return <StaticPhoneFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<StaticPhoneFallback />}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '460px' : '560px',
          minHeight: isMobile ? '420px' : '560px',
          overflow: 'hidden',
          background: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.09) 0%, rgba(7,9,14,0) 62%)',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: isMobile ? 48 : 45 }}
          dpr={isMobile ? [1, 1.35] : [1, 2]}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: isMobile ? 'default' : 'high-performance' }}
          style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x07090e, 0);
          }}
        >
          <ambientLight intensity={1.4} />
          <directionalLight position={[10, 12, 10]} intensity={2.5} color="#ffffff" />
          <pointLight position={[-10, -8, -5]} color="#10b981" intensity={3} distance={15} />
          <pointLight position={[8, -8, 5]} color="#8b5cf6" intensity={3} distance={15} />
          <pointLight position={[0, 5, 5]} color="#06b6d4" intensity={2} distance={10} />

          <CalorixPhone
            pointerVector={pointerVector}
            scrollOffset={scrollOffset}
            reducedMotion={reducedMotion}
            isMobile={isMobile}
          />

          <CalorieRing
            position={isMobile ? [1.8, 1.8, 0.5] : [2.8, 1.6, 0.8]}
            reducedMotion={reducedMotion}
          />

          <FloatingObjects
            pointerVector={pointerVector}
            scrollOffset={scrollOffset}
            reducedMotion={reducedMotion}
            isMobile={isMobile}
          />

          <Sparkles
            count={isMobile ? 25 : 60}
            scale={8}
            size={isMobile ? 2.5 : 4}
            speed={reducedMotion ? 0.2 : 0.6}
            opacity={0.6}
            color="#34d399"
          />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
