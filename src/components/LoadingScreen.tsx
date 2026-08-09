import { useState, useEffect, Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { motion } from 'framer-motion';
import LoadingScene3D from './3d/LoadingScene3D';
import { Sparkles, Activity } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

class LoadingSceneErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('LoadingScene3D error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  const getStatusText = (prog: number) => {
    if (prog < 20) return 'Initializing Calorix...';
    if (prog < 45) return 'Preparing AI experience...';
    if (prog < 70) return 'Loading nutrition engine...';
    if (prog < 90) return 'Preparing your dashboard...';
    return 'Almost ready...';
  };

  useEffect(() => {
    let completed = false;

    const finishLoading = () => {
      if (completed) return;
      completed = true;
      if (onComplete) onComplete();
    };

    // Main smooth controlled progress loop (~2.4s)
    const totalDurationMs = 2400;
    const intervalMs = 30;
    const stepIncrement = (100 / totalDurationMs) * intervalMs;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + stepIncrement + (Math.random() * 0.8);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(finishLoading, 200);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    // Guaranteed safety timeout (3.5s max)
    const safetyTimeout = setTimeout(finishLoading, 3500);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  const roundedProgress = Math.min(100, Math.floor(progress));

  return (
    <motion.div
      key="loading-screen"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(12px)',
        transition: { duration: 0.6, ease: 'easeOut' },
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#07090e',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* 3D Background Canvas with Error Boundary */}
      <LoadingSceneErrorBoundary>
        <LoadingScene3D />
      </LoadingSceneErrorBoundary>

      {/* Radial Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(6, 182, 212, 0.08) 40%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Central Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: 'clamp(24px, 5vw, 48px)',
          maxWidth: '520px',
          width: '92%',
          background: 'rgba(11, 15, 25, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.7), 0 0 40px rgba(16, 185, 129, 0.15)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            marginBottom: '20px',
          }}
        >
          <Sparkles size={14} color="#34d399" />
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            AI Health Intelligence
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.8rem, 6vw, 4.2rem)',
            fontWeight: 900,
            letterSpacing: '2px',
            lineHeight: 1.0,
            marginBottom: '8px',
            background: 'linear-gradient(135deg, #ffffff 0%, #34d399 50%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          CALORIX
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            fontWeight: 700,
            color: '#34d399',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '36px',
            opacity: 0.95,
          }}
        >
          Snap. Track. Thrive.
        </p>

        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '9999px',
            overflow: 'hidden',
            marginBottom: '16px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: `${roundedProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 50%, #8b5cf6 100%)',
              borderRadius: '9999px',
              transition: 'width 0.1s linear',
              boxShadow: '0 0 15px rgba(52, 211, 153, 0.8)',
            }}
          />
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.875rem',
            color: '#94a3b8',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.8rem' }}>
            <Activity size={14} color="#34d399" />
            {getStatusText(roundedProgress)}
          </span>
          <span style={{ fontWeight: 800, color: '#f8fafc', fontSize: '1rem' }}>
            {roundedProgress}%
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
