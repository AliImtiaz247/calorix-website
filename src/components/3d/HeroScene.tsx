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

// WebGL Fallback Error Boundary
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

// Static HTML/CSS Fallback for the 3D phone stage
function StaticPhoneFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '520px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          width: '280px',
          height: '560px',
          borderRadius: '36px',
          background: '#07090e',
          border: '10px solid #1e293b',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(16,185,129,0.3)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          transform: 'perspective(1000px) rotateY(-12deg) rotateX(6deg)',
          transition: 'transform 0.3s ease',
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
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '8px', color: '#94a3b8' }}>PRO</div>
            <div style={{ fontSize: '13px', fontWeight: 900, color: '#38bdf8' }}>78g</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '8px', color: '#94a3b8' }}>CARB</div>
            <div style={{ fontSize: '13px', fontWeight: 900, color: '#f59e0b' }}>142g</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '8px', color: '#94a3b8' }}>FAT</div>
            <div style={{ fontSize: '13px', fontWeight: 900, color: '#a78bfa' }}>42g</div>
          </div>
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
    // WebGL capability check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGlSupported(false);
    } catch {
      setWebGlSupported(false);
    }

    // Pointer move listener
    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerVector.current = { x, y };
    };

    // Reset pointer vector on pointer leave
    const handlePointerLeave = () => {
      pointerVector.current = { x: 0, y: 0 };
    };

    // Scroll listener
    const handleScroll = () => {
      const offset = window.scrollY / window.innerHeight;
      setScrollOffset(Math.min(1.5, offset));
    };

    // Window resize check
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!webGlSupported) {
    return <StaticPhoneFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<StaticPhoneFallback />}>
      <div style={{ position: 'relative', width: '100%', height: isMobile ? '460px' : '560px' }}>
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={1.4} />
          <directionalLight position={[10, 12, 10]} intensity={2.5} color="#ffffff" />
          <pointLight position={[-10, -8, -5]} color="#10b981" intensity={3} distance={15} />
          <pointLight position={[8, -8, 5]} color="#8b5cf6" intensity={3} distance={15} />
          <pointLight position={[0, 5, 5]} color="#06b6d4" intensity={2} distance={10} />

          {/* 3D Smartphone with live dashboard */}
          <CalorixPhone
            pointerVector={pointerVector}
            scrollOffset={scrollOffset}
            reducedMotion={reducedMotion}
            isMobile={isMobile}
          />

          {/* Floating 3D Calorie Ring */}
          <CalorieRing
            position={isMobile ? [1.8, 1.8, 0.5] : [2.8, 1.6, 0.8]}
            reducedMotion={reducedMotion}
          />

          {/* Floating 3D Health Objects */}
          <FloatingObjects
            pointerVector={pointerVector}
            scrollOffset={scrollOffset}
            reducedMotion={reducedMotion}
            isMobile={isMobile}
          />

          {/* Background Ambient Sparkles */}
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
