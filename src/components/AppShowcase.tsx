import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Camera,
  Utensils,
  LineChart,
  Calculator,
  Footprints,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import ShowcaseScene from './3d/ShowcaseScene';

export default function AppShowcase() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleChange);
    return () => motionQuery.removeEventListener('change', handleChange);
  }, []);

  const screens = [
    {
      num: '01',
      id: 'dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
      subtitle: 'Real-time Daily Calorie & Macro Hub',
      color: '#10b981',
      description:
        'Comprehensive overview of your daily intake, calorie balance ring, step counters, and macro breakdown at a glance.',
    },
    {
      num: '02',
      id: 'food-scanner',
      name: 'Food Scanner',
      icon: Camera,
      subtitle: 'AI Camera Food Recognition',
      color: '#34d399',
      description:
        'Point your camera at any meal or beverage. AI instantly detects food items and calculates calories.',
    },
    {
      num: '03',
      id: 'meal-analysis',
      name: 'Meal Analysis',
      icon: Utensils,
      subtitle: 'Instant Ingredient & Macro Insights',
      color: '#f59e0b',
      description:
        'Detailed breakdown of detected meal ingredients, protein, carbs, fat, and AI confidence scoring.',
    },
    {
      num: '04',
      id: 'progress',
      name: 'Progress',
      icon: LineChart,
      subtitle: 'Long-term Health & Weight Analytics',
      color: '#8b5cf6',
      description:
        'Track weekly and monthly weight loss, calorie balance trends, and active goal completion streaks.',
    },
    {
      num: '05',
      id: 'health-calculator',
      name: 'Health',
      icon: Calculator,
      subtitle: 'BMI & Macro Target Estimator',
      color: '#ec4899',
      description:
        'Calculate your Basal Metabolic Rate (BMR), TDEE, and optimal weight management target calories.',
    },
    {
      num: '06',
      id: 'steps-tracker',
      name: 'Steps',
      icon: Footprints,
      subtitle: 'Pedometer & Activity Tracking',
      color: '#06b6d4',
      description:
        'Integrates with your phone sensors to track active steps, distance covered, and exercise duration.',
    },
  ];

  const currentScreen = screens[activeScreenIndex];

  return (
    <section id="app-showcase" style={{ position: 'relative', background: '#07090e', padding: '100px 0' }}>
      {/* Background Ambient Glows */}
      <div className="bg-glow-violet" style={{ top: '20%', right: '5%', width: '500px', height: '500px' }} />
      <div className="bg-glow-emerald" style={{ bottom: '15%', left: '5%', width: '500px', height: '500px' }} />

      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px auto' }}>
          <div className="glass-pill" style={{ marginBottom: '16px', borderColor: 'rgba(139, 92, 246, 0.35)' }}>
            <Sparkles size={14} color="#a78bfa" />
            <span style={{ color: '#a78bfa', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem' }}>
              THE CALORIX EXPERIENCE
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '16px',
              letterSpacing: '-1px',
            }}
          >
            Your Health. <span className="text-gradient-violet">One Intelligent App.</span>
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8', lineHeight: 1.7 }}>
            Everything you need to understand your nutrition, track your activity, and stay focused on your goals—beautifully organized in one place.
          </p>
        </div>

        {/* 6 Screen Selector Navigation Bar */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '40px',
            justifyContent: 'center',
          }}
          className="no-scrollbar"
        >
          {screens.map((scr, idx) => {
            const IconComp = scr.icon;
            const isSelected = activeScreenIndex === idx;
            return (
              <button
                key={scr.id}
                onClick={() => setActiveScreenIndex(idx)}
                style={{
                  background: isSelected ? `${scr.color}25` : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${isSelected ? scr.color : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '16px',
                  padding: '12px 20px',
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  fontSize: '0.925rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                  boxShadow: isSelected ? `0 10px 25px ${scr.color}35` : 'none',
                }}
              >
                <span style={{ color: scr.color, fontSize: '0.85rem' }}>{scr.num}</span>
                <IconComp size={16} color={isSelected ? scr.color : '#94a3b8'} />
                {scr.name}
              </button>
            );
          })}
        </div>

        {/* Showcase Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '50px',
            alignItems: 'center',
          }}
          className="showcase-grid"
        >
          {/* Left Column: Screen Details & Controls */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen.id}
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="glass-panel"
                style={{ padding: '40px', borderColor: `${currentScreen.color}40` }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: `${currentScreen.color}20`,
                    color: currentScreen.color,
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    marginBottom: '20px',
                    letterSpacing: '0.5px',
                  }}
                >
                  SCREEN {activeScreenIndex + 1} OF 6
                </div>

                <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', marginBottom: '8px' }}>
                  {currentScreen.name}
                </h3>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: currentScreen.color, marginBottom: '16px' }}>
                  {currentScreen.subtitle}
                </div>
                <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '32px' }}>
                  {currentScreen.description}
                </p>

                {/* Prev/Next Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    onClick={() => setActiveScreenIndex((prev) => (prev > 0 ? prev - 1 : screens.length - 1))}
                    className="btn-hero-secondary"
                    style={{ padding: '12px 24px', fontSize: '0.9rem' }}
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>
                  <button
                    onClick={() => setActiveScreenIndex((prev) => (prev < screens.length - 1 ? prev + 1 : 0))}
                    className="btn-hero-primary"
                    style={{ padding: '12px 24px', fontSize: '0.9rem', background: currentScreen.color }}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive 3D Phone Stage */}
          <div>
            <ShowcaseScene activeScreenIndex={activeScreenIndex} reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .showcase-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
