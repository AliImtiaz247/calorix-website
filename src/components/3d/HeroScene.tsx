import { useRef, useEffect, useState, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import CalorixPhone from './CalorixPhone';
import FloatingObjects from './FloatingObjects';
import CalorieRing from './CalorieRing';
import { Activity, Camera, Footprints, Target } from 'lucide-react';

interface HeroSceneProps { reducedMotion?: boolean; }
interface FallbackState { hasError: boolean; }

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, FallbackState> {
  state: FallbackState = { hasError: false };
  static getDerivedStateFromError(): FallbackState { return { hasError: true }; }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.warn('WebGL Context Error caught in HeroScene:', error, errorInfo); }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

function StaticPhoneFallback() {
  return (
    <div className="mobile-hero-visual" aria-label="Calorix app preview">
      <div className="mobile-hero-orb" aria-hidden="true" />
      <div className="mobile-phone-card">
        <div className="mobile-phone-status"><span>9:41</span><span>CALORIX AI</span></div>
        <div className="mobile-phone-header"><div><small>Good Morning 👋</small><strong>Alex Morgan</strong></div><span className="mobile-phone-avatar">AI</span></div>
        <div className="mobile-calorie-card"><small>TODAY'S CALORIES</small><strong>1,240 <em>/ 2,100 kcal</em></strong><div className="mobile-progress"><span /></div></div>
        <div className="mobile-macros"><div><small>PROTEIN</small><strong>78g</strong></div><div><small>CARBS</small><strong>142g</strong></div><div><small>FAT</small><strong>42g</strong></div></div>
        <div className="mobile-activity-card"><Activity size={18} /><div><small>STEPS TODAY</small><strong>7,842 / 10,000</strong></div></div>
        <div className="mobile-scan-card"><Camera size={18} /><div><strong>AI Food Scan</strong><small>Ready to analyze your meal</small></div></div>
        <div className="mobile-phone-dock"><span>⌂</span><span>◉</span><span>◌</span><span>◎</span></div>
      </div>
      <div className="mobile-visual-chip mobile-visual-chip-right"><span>DAILY CALORIES</span><strong>1,240 kcal</strong></div>
      <div className="mobile-visual-chip mobile-visual-chip-left"><Footprints size={14} /><strong>7,842 steps</strong></div>
      <div className="mobile-visual-chip mobile-visual-chip-bottom"><Target size={14} /><strong>Goal 78%</strong></div>
    </div>
  );
}

export default function HeroScene({ reducedMotion = false }: HeroSceneProps) {
  const pointerVector = useRef({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    updateViewport();
    if (window.innerWidth < 768) { setWebGlSupported(false); return; }
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGlSupported(false);
    } catch { setWebGlSupported(false); }
    const handlePointerMove = (e: PointerEvent) => { pointerVector.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: -(e.clientY / window.innerHeight) * 2 + 1 }; };
    const handlePointerLeave = () => { pointerVector.current = { x: 0, y: 0 }; };
    const handleScroll = () => setScrollOffset(Math.min(1.5, window.scrollY / window.innerHeight));
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

  // Android/mobile uses a DOM visual instead of WebGL. This removes the canvas
  // rendering path that was producing the white broken-image rectangle.
  if (isMobile || !webGlSupported) return <StaticPhoneFallback />;

  return (
    <WebGLErrorBoundary fallback={<StaticPhoneFallback />}>
      <div style={{ position: 'relative', width: '100%', height: isMobile ? '380px' : '560px', minHeight: isMobile ? '380px' : '560px', overflow: 'hidden', background: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.09) 0%, rgba(7,9,14,0) 62%)' }}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, isMobile ? 9.5 : 8.5], fov: isMobile ? 52 : 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
          onCreated={({ gl }) => gl.setClearColor(0x07090e, 0)}
        >
          <ambientLight intensity={1.4} />
          <directionalLight position={[10, 12, 10]} intensity={2.5} color="#ffffff" />
          <pointLight position={[-10, -8, -5]} color="#10b981" intensity={3} distance={15} />
          <pointLight position={[8, -8, 5]} color="#8b5cf6" intensity={3} distance={15} />
          <pointLight position={[0, 5, 5]} color="#06b6d4" intensity={2} distance={10} />
          <CalorixPhone pointerVector={pointerVector} scrollOffset={scrollOffset} reducedMotion={reducedMotion} isMobile={false} />
          <CalorieRing position={[2.8, 1.6, 0.8]} reducedMotion={reducedMotion} />
          <FloatingObjects pointerVector={pointerVector} scrollOffset={scrollOffset} reducedMotion={reducedMotion} isMobile={false} />
          <Sparkles count={60} scale={8} size={4} speed={reducedMotion ? 0.2 : 0.6} opacity={0.6} color="#34d399" />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
