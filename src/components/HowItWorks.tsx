import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Cpu, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';
import ScannerPhone from './3d/ScannerPhone';
import AICore from './3d/AICore';
import ProgressDashboard from './3d/ProgressDashboard';
import JourneyPath from './3d/JourneyPath';

interface HowItWorksProps {
  onNavigateDownload?: () => void;
}

export default function HowItWorks({ onNavigateDownload: _onNavigateDownload }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleChange);
    return () => motionQuery.removeEventListener('change', handleChange);
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Snap',
      subtitle: 'Take a photo of your meal',
      icon: Camera,
      color: '#10b981',
      glow: 'rgba(16, 185, 129, 0.3)',
      description:
        'Take a photo of your meal and let Calorix capture the information you need.',
      highlights: [
        'Instant Camera Viewfinder',
        'Auto-Detect Food Frame',
        'Lighting & Angle Auto-Correction',
      ],
      render3D: <ScannerPhone reducedMotion={reducedMotion} />,
    },
    {
      num: '02',
      title: 'Analyze',
      subtitle: 'AI estimates calories and nutrition',
      icon: Cpu,
      color: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.3)',
      description:
        'Calorix AI analyzes the meal and estimates calories and nutritional information.',
      highlights: [
        'Neural Computer Vision Model',
        'Macro & Micronutrient Estimation',
        'Sub-second Inference Speed',
      ],
      render3D: <AICore reducedMotion={reducedMotion} />,
    },
    {
      num: '03',
      title: 'Thrive',
      subtitle: 'Track nutrition, activity, and goals',
      icon: Trophy,
      color: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.3)',
      description:
        'Track your nutrition, activity, and progress as you work toward your goals.',
      highlights: [
        'Real-time Calorie Budget Ring',
        'Step Counter Syncing',
        'Goal Completion Analytics',
      ],
      render3D: <ProgressDashboard reducedMotion={reducedMotion} />,
    },
  ];

  return (
    <section id="how-it-works" style={{ position: 'relative', background: '#07090e', padding: '100px 0' }}>
      {/* Ambient Background Glows */}
      <div className="bg-glow-emerald" style={{ top: '25%', left: '5%', width: '500px', height: '500px' }} />
      <div className="bg-glow-violet" style={{ bottom: '15%', right: '5%', width: '500px', height: '500px' }} />

      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px auto' }}>
          <div className="glass-pill" style={{ marginBottom: '16px', borderColor: 'rgba(56, 189, 248, 0.35)' }}>
            <Sparkles size={14} color="#38bdf8" />
            <span style={{ color: '#38bdf8', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem' }}>
              AI-POWERED NUTRITION
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
            How <span className="text-gradient-cyan">Calorix</span> Works
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8', lineHeight: 1.7 }}>
            From a simple food photo to actionable nutrition insights in seconds.
          </p>
        </div>

        {/* Journey Path Connecting Beam */}
        <JourneyPath activeStep={activeStep} />

        {/* Step Navigation Controls (01, 02, 03 Selector Tabs) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          {steps.map((st, i) => (
            <button
              key={st.num}
              onClick={() => setActiveStep(i)}
              style={{
                background: activeStep === i ? st.glow : 'rgba(255, 255, 255, 0.05)',
                border: activeStep === i ? `1px solid ${st.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                color: activeStep === i ? '#ffffff' : '#94a3b8',
                padding: '10px 24px',
                borderRadius: '16px',
                cursor: 'pointer',
                fontWeight: 900,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                boxShadow: activeStep === i ? `0 10px 25px ${st.glow}` : 'none',
              }}
            >
              <span style={{ color: st.color, fontSize: '1.1rem' }}>{st.num}</span>
              {st.title}
            </button>
          ))}
        </div>

        {/* 3-Step Interactive Process Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '50px',
            alignItems: 'center',
          }}
          className="steps-grid"
        >
          {/* Left Column: Step Details List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              const IconComp = step.icon;
              return (
                <motion.div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  whileHover={reducedMotion ? {} : { scale: 1.015 }}
                  className="glass-panel"
                  style={{
                    padding: '26px 30px',
                    cursor: 'pointer',
                    borderColor: isSelected ? step.color : 'rgba(255, 255, 255, 0.08)',
                    background: isSelected ? 'rgba(18, 24, 38, 0.95)' : 'rgba(18, 24, 38, 0.4)',
                    boxShadow: isSelected ? `0 18px 45px rgba(0,0,0,0.6), 0 0 30px ${step.glow}` : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    {/* Number Badge */}
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: isSelected ? '2.4rem' : '1.8rem',
                        fontWeight: 900,
                        color: isSelected ? step.color : '#475569',
                        lineHeight: 1,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {step.num}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <IconComp size={22} color={isSelected ? step.color : '#94a3b8'} />
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff' }}>
                          {step.title}
                        </h3>
                      </div>
                      <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.5 }}>
                        {step.subtitle}
                      </p>

                      {/* Expanded View for Active Step */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}
                          >
                            <p style={{ fontSize: '1rem', color: '#f8fafc', fontWeight: 700, marginBottom: '14px', lineHeight: 1.6 }}>
                              {step.description}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {step.highlights.map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: step.color, fontWeight: 700 }}>
                                  <CheckCircle2 size={16} color={step.color} /> {item}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: 3D Interactive Stage for Active Step */}
          <div style={{ position: 'relative', minHeight: '520px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{ width: '100%', height: '100%' }}
              >
                {steps[activeStep].render3D}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Grid Layout CSS */}
      <style>{`
        @media (max-width: 900px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
          .journey-path-bar {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
