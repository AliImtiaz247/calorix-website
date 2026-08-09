import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Camera, Sparkles, ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';
import HeroScene from './3d/HeroScene';

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleChange);
    return () => motionQuery.removeEventListener('change', handleChange);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: '130px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
      className="bg-grid-pattern"
    >
      <div className="bg-glow-emerald" style={{ top: '8%', left: '-10%', width: '550px', height: '550px' }} />
      <div className="bg-glow-violet" style={{ bottom: '5%', right: '-10%', width: '550px', height: '550px' }} />

      <div className="section-container" style={{ width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '50px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          <motion.div
            variants={reducedMotion ? {} : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="glass-pill" style={{ marginBottom: '20px', borderColor: 'rgba(16, 185, 129, 0.35)' }}>
              <Sparkles size={16} color="#34d399" />
              <span style={{ color: '#34d399', fontWeight: 800, letterSpacing: '0.5px' }}>AI-Powered Nutrition</span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 1.0,
                marginBottom: '10px',
                letterSpacing: '-1.5px',
              }}
            >
              <span className="text-gradient-emerald">CALORIX</span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
                fontWeight: 800,
                color: '#34d399',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Snap. Track. Thrive.
            </motion.div>

            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: 'clamp(1.9rem, 3.2vw, 2.9rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.18,
                marginBottom: '20px',
                letterSpacing: '-0.5px',
              }}
            >
              Your AI-Powered <span className="text-gradient-cyan">Nutrition & Health</span> Companion
            </motion.h1>

            <motion.p
              variants={itemVariants}
              style={{
                fontSize: '1.125rem',
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: '36px',
                maxWidth: '560px',
              }}
            >
              Snap a photo of your food, understand your nutrition, track your activity, and stay on top of your health goals with Calorix.
            </motion.p>

            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '18px',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: '48px',
              }}
            >
              <a href="#features" className="btn-hero-primary" tabIndex={0} aria-label="Explore Calorix features">
                <Camera size={20} /> Explore Calorix
              </a>
              <a href="#cta" className="btn-hero-secondary" tabIndex={0} aria-label="Get started with Calorix">
                Get Started <ArrowRight size={18} />
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                  <ShieldCheck size={20} color="#34d399" /> Privacy-first
                </div>
                <div style={{ fontSize: '0.825rem', color: '#94a3b8', marginTop: '2px' }}>Health-focused experience</div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                  <Zap size={20} color="#38bdf8" /> AI-powered
                </div>
                <div style={{ fontSize: '0.825rem', color: '#94a3b8', marginTop: '2px' }}>Food analysis workflow</div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                  <Award size={20} color="#a78bfa" /> All-in-one
                </div>
                <div style={{ fontSize: '0.825rem', color: '#94a3b8', marginTop: '2px' }}>Nutrition & activity tracking</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            style={{ position: 'relative', width: '100%' }}
          >
            <HeroScene reducedMotion={reducedMotion} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .hero-grid p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid div[style*="display: flex"] {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
