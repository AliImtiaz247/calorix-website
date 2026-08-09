import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, ArrowRight, Flame, ShieldCheck } from 'lucide-react';
import CTAVisual from './3d/CTAVisual';

interface CTAProps {
  onNavigateDownload?: () => void;
}

export default function CTA({ onNavigateDownload }: CTAProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleChange);
    return () => motionQuery.removeEventListener('change', handleChange);
  }, []);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateDownload) {
      onNavigateDownload();
    } else {
      window.location.hash = '#download';
    }
  };

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="cta" style={{ position: 'relative', background: '#07090e', overflow: 'hidden', padding: '100px 0' }}>
      {/* Radial Atmospheric Glow */}
      <div className="bg-glow-emerald" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px' }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="glass-panel"
          style={{
            padding: '60px 48px',
            borderColor: 'rgba(16, 185, 129, 0.4)',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.14) 0%, rgba(11, 15, 25, 0.92) 100%)',
            boxShadow: '0 30px 80px rgba(16, 185, 129, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '48px',
              alignItems: 'center',
            }}
            className="cta-grid"
          >
            {/* Left Column: Copy & Buttons */}
            <div>
              <div className="glass-pill" style={{ marginBottom: '20px', borderColor: 'rgba(16, 185, 129, 0.4)' }}>
                <Flame size={16} color="#34d399" />
                <span style={{ color: '#34d399', fontWeight: 800 }}>Ready to Transform Your Health?</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                  fontWeight: 900,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '20px',
                  letterSpacing: '-1px',
                }}
              >
                Start Your Health Journey With <span className="text-gradient-emerald">Calorix</span>
              </h2>

              <p
                style={{
                  fontSize: '1.2rem',
                  color: '#cbd5e1',
                  lineHeight: 1.7,
                  marginBottom: '36px',
                  fontWeight: 500,
                }}
              >
                Snap your meals. Understand your nutrition. Track your progress. Thrive every day.
              </p>

              <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <a href="#download" onClick={handleDownloadClick} className="btn-hero-primary" tabIndex={0} aria-label="Get Started with Calorix App">
                  <Camera size={20} /> Get Started
                </a>
                <a href="#features" onClick={handleExploreClick} className="btn-hero-secondary" tabIndex={0} aria-label="Explore Calorix Features">
                  Explore Calorix <ArrowRight size={18} />
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.9rem', color: '#94a3b8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontWeight: 700 }}>
                  <ShieldCheck size={18} color="#34d399" /> Free Experience
                </div>
                <div>•</div>
                <div>Instant AI Setup</div>
                <div>•</div>
                <div>Zero Setup Fee</div>
              </div>
            </div>

            {/* Right Column: Floating 3D Phone & Orbiting Objects Stage */}
            <div>
              <CTAVisual reducedMotion={reducedMotion} />
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .cta-grid div[style*="display: flex"] {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
