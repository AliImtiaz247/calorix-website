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

// Stable releases automatically use GitHub's latest stable release.
const STABLE_DOWNLOAD_URL = 'https://github.com/AliImtiaz247/calorix-website/releases/latest/download/Calorix.apk';

// Current pre-release. Keep this fixed so the active pre-release remains downloadable
// even after a future stable release is published.
const PRERELEASE_DOWNLOAD_URL = 'https://github.com/AliImtiaz247/calorix-website/releases/download/v1.0.0/Calorix-v1.0.0.apk';

interface AppDownloadProps {
  onBack: () => void;
}

export default function AppDownload({ onBack }: AppDownloadProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDownload = (url: string, message: string) => {
    setToastMessage(message);

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setToastMessage(null), 3000);
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
      <div className="bg-glow-emerald" style={{ top: '10%', left: '5%', width: '600px', height: '600px' }} />
      <div className="bg-glow-violet" style={{ top: '40%', right: '5%', width: '600px', height: '600px' }} />

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
          <button
            onClick={onBack}
            className="btn-hero-secondary"
            style={{ padding: '8px 18px', fontSize: '0.9rem', minHeight: '44px' }}
            aria-label="Back to website"
          >
            <ArrowLeft size={18} /> Back to website
          </button>

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

      <main className="section-container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
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
            Download the official Calorix Android APK and start tracking your nutrition, calories, activity, and progress with AI-powered insights.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            alignItems: 'stretch',
            marginBottom: '80px',
          }}
          className="download-grid"
        >
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
            <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '6px 12px', borderRadius: '999px', background: 'rgba(16,185,129,0.16)', border: '1px solid rgba(16,185,129,0.35)', color: '#34d399', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.5px' }}>
              STABLE RELEASE
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(16,185,129,0.25)', border: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Smartphone size={28} color="#34d399" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>Android APK</h3>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Latest stable version</div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(STABLE_DOWNLOAD_URL, 'Starting latest stable Calorix APK download...')}
              className="btn-hero-primary"
              style={{ width: '100%', minHeight: '52px', marginTop: '6px', fontSize: '1.05rem' }}
              aria-label="Download latest stable Calorix Android APK"
            >
              <Download size={20} /> Download Stable APK
            </button>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: '28px',
              borderColor: 'rgba(139, 92, 246, 0.5)',
              background: 'linear-gradient(135deg, rgba(139,92,246,0.14) 0%, rgba(11,15,25,0.92) 100%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '6px 12px', borderRadius: '999px', background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(139,92,246,0.4)', color: '#c4b5fd', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.5px' }}>
              PRE-RELEASE • v1.0.0
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(139,92,246,0.22)', border: '1px solid rgba(139,92,246,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={28} color="#c4b5fd" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>Test Version</h3>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Early access • ~64.5 MB</div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(PRERELEASE_DOWNLOAD_URL, 'Starting Calorix v1.0.0 pre-release download...')}
              style={{
                width: '100%',
                minHeight: '52px',
                marginTop: '6px',
                fontSize: '1.05rem',
                borderRadius: '14px',
                border: '1px solid rgba(167,139,250,0.55)',
                background: 'rgba(139,92,246,0.16)',
                color: '#ffffff',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
              aria-label="Download Calorix v1.0.0 pre-release APK"
            >
              <Download size={20} /> Download Pre-release APK
            </button>
          </div>
        </div>

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
