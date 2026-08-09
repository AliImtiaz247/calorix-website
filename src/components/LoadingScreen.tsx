import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingScene3D from './3d/LoadingScene3D';
import { Sparkles, Activity } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  // Status message based on current progress
  const getStatusText = (prog: number) => {
    if (prog < 20) return 'Initializing Calorix...';
    if (prog < 45) return 'Preparing AI experience...';
    if (prog < 70) return 'Loading nutrition engine...';
    if (prog < 90) return 'Preparing your dashboard...';
    return 'Almost ready...';
  };

  useEffect(() => {
    // Smooth controlled progress loop targeted at ~2.5 seconds total
    const totalDurationMs = 2400;
    const intervalMs = 30;
    const stepIncrement = (100 / totalDurationMs) * intervalMs;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + stepIncrement + (Math.random() * 0.8);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
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
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
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
      {/* 3D Background Canvas */}
      <LoadingScene3D />

      {/* Radial Ambient Glow behind Brand */}
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

      {/* Central Glassmorphism Branding & Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '40px 48px',
          maxWidth: '520px',
          width: '90%',
          background: 'rgba(11, 15, 25, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.6), 0 0 40px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Top AI Chip Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
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
        </motion.div>

        {/* Brand Logo Title */}
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
            filter: 'drop-shadow(0 4px 20px rgba(16, 185, 129, 0.4))',
          }}
        >
          CALORIX
        </h1>

        {/* Slogan */}
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

        {/* Thin Premium Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '9999px',
            overflow: 'hidden',
            marginBottom: '16px',
            position: 'relative',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)',
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

        {/* Progress Percentage & Dynamic Status Row */}
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
