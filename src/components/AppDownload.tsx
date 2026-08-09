import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Smartphone,
  Sparkles,
  Flame,
  Camera,
  PieChart,
  Activity,
  Target,
  TrendingUp,
  Download,
  CheckCircle2,
} from 'lucide-react';
import CTAVisual from './3d/CTAVisual';

// Configurable Download URL: Set to your GitHub Release, Cloudflare R2, Google Drive, or hosted APK link
const ANDROID_DOWNLOAD_URL: string = 'https://github.com/AliImtiaz247/calorix-website/releases/latest/download/app-release.apk';

interface AppDownloadProps {
  onBack: () => void;
}

export default function AppDownload({ onBack }: AppDownloadProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const handleDownload = () => {
    const url = ANDROID_DOWNLOAD_URL;

    if (url && url.trim() !== '') {
      setToastMessage('Starting Calorix APK download...');
      
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = 'Calorix.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setToastMessage(null), 3000);
    } else {
      setToastMessage('Calorix for Android is coming soon!');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const featureCards = [
    { title: 'AI Food Scanning', icon: Camera, color: '#10b981', desc: 'Snap meal photos for instant AI identification and calorie estimates.' },
    { title: 'Calorie Tracking', icon: Flame, color: '#f59e0b', desc: 'Real-time daily calorie balance ring synchronized with your targets.' },
    { title: 'Macro Tracking', icon: PieChart, color: '#38bdf8', desc: 'Protein, carbohydrate, and fat breakdown for balanced nutrition.' },
    { title: 'Activity & Steps', icon: Activity, color: '#06b6d4', desc: 'Pedometer and workout tracking integrated with mobile sensors.' },
    { title: 'Goal Tracking', icon: Target, color: '#ec4899', desc: 'Personalized weight management and daily caloric budget goals.' },
    { title: 'Progress Insights', icon: TrendingUp, color: '#8b5cf6', desc: 'Weekly analytics, health trendlines, and milestone badges.' },
  ];

  return (
    <div style={{ background: '#07090e', color: '#f8fafc', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Background Ambient Glows */}
      <div className="bg-glow-emerald" style={{ top: '10%', left: '5%', width: '600px', height: '600px' }} />
      <div className="bg-glow-violet" style={{ top: '40%', right: '5%', width: '600px', height: '600px' }} />

      {/* Header Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(7, 9, 14, 0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '16px 24px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Back Button */}
          <button
            onClick={onBack}
            className="btn-hero-secondary"
            style={{ padding: '8px 18px', fontSize: '0.9rem', minHeight: '44px' }}
            aria-label="Back to website"
          >
            <ArrowLeft size={18} /> Back to website
          </button>

          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={20} color="#ffffff" />
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, color: '#ffffff' }}>
              CALORIX
            </span>
          </div>
        </div>
      </header>

      {/* Main Download Content */}
      <main className="section-container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        {/* Toast Alert Banner */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: 'fixed',
                top: '90px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9999,
                background: 'rgba(11, 15, 25, 0.95)',
                border: '1px solid #34d399',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.35)',
                borderRadius: '16px',
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.95rem',
              }}
            >
              <CheckCircle2 size={18} color="#34d399" />
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Copy */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 60px auto' }}>
          <div className="glass-pill" style={{ marginBottom: '20px', borderColor: 'rgba(16, 185, 129, 0.35)' }}>
            <Sparkles size={14} color="#34d399" />
            <span style={{ color: '#34d399', fontWeight: 800 }}>OFFICIAL APPLICATION DOWNLOAD</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '16px',
              letterSpacing: '-1px',
            }}
          >
            Your health. <br />
            <span className="text-gradient-emerald">Your progress.</span> <br />
            Your Calorix.
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7 }}>
            Download the official Calorix Android APK (v1.0) and start tracking your nutrition, calories, activity, and progress with AI-powered insights.
          </p>
        </div>

        {/* Grid Layout: Download Cards + 3D Preview */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '80px',
          }}
          className="download-grid"
        >
          {/* Left Side: Platform Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Android Option */}
            <div
              className="glass-panel"
              style={{
                padding: '28px',
                borderColor: 'rgba(16, 185, 129, 0.4)',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(11,15,25,0.92) 100%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(16,185,129,0.25)', border: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Smartphone size={28} color="#34d399" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>Android APK</h3>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Official Release Package (~64.5 MB)</div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="btn-hero-primary"
                style={{ width: '100%', minHeight: '52px', marginTop: '6px', fontSize: '1.1rem' }}
                aria-label="Download Calorix Android APK"
              >
                <Download size={20} /> Download Calorix APK
              </button>
            </div>
          </div>

          {/* Right Side: 3D Smartphone Stage */}
          <div style={{ position: 'relative' }}>
            <CTAVisual reducedMotion={reducedMotion} />
          </div>
        </div>

        {/* Features Summary Section */}
        <div style={{ marginTop: '40px' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 40px auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', marginBottom: '10px' }}>
              Everything you need to stay on track
            </h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8' }}>
              Calorix combines camera food recognition, calorie budgets, and activity tracking in one intuitive app.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {featureCards.map((feat) => {
              const IconC = feat.icon;
              return (
                <div key={feat.title} className="glass-panel" style={{ padding: '24px', borderColor: `${feat.color}35` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${feat.color}20`, border: `1px solid ${feat.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconC size={20} color={feat.color} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>{feat.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5 }}>{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .download-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
