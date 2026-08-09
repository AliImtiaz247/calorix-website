import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, X, ShieldCheck, FileText } from 'lucide-react';

interface FooterProps {
  onNavigateDownload?: () => void;
}

export default function Footer({ onNavigateDownload }: FooterProps) {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateDownload) {
      onNavigateDownload();
    } else {
      window.location.hash = '#download';
    }
  };

  return (
    <footer
      style={{
        background: '#04060a',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '60px',
        paddingBottom: '40px',
        color: '#94a3b8',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="section-container" style={{ paddingBottom: '30px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: '40px',
            marginBottom: '50px',
          }}
          className="footer-grid"
        >
          {/* Brand Column */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Flame size={20} color="#ffffff" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#ffffff',
                }}
              >
                CALORIX
              </span>
            </a>

            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                color: '#34d399',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              Snap. Track. Thrive.
            </div>

            <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6, maxWidth: '320px' }}>
              Your AI-powered nutrition and health companion.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '18px' }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li><a href="#download" onClick={handleDownloadClick} style={{ color: '#34d399', fontWeight: 700, textDecoration: 'none' }}>Get Started / Download App</a></li>
              <li><a href="#features" style={{ color: '#94a3b8', textDecoration: 'none' }}>Features</a></li>
              <li><a href="#how-it-works" style={{ color: '#94a3b8', textDecoration: 'none' }}>How It Works</a></li>
              <li><a href="#app-showcase" style={{ color: '#94a3b8', textDecoration: 'none' }}>App Showcase</a></li>
              <li><a href="#technology" style={{ color: '#94a3b8', textDecoration: 'none' }}>Technology</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '18px' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li><a href="#developer" style={{ color: '#94a3b8', textDecoration: 'none' }}>Developer</a></li>
              <li><a href="mailto:ali.imtiazchandio0123@gmail.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '18px' }}>
              Legal
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }}
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.85rem',
            color: '#64748b',
          }}
        >
          <div>© 2026 Calorix. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Designed & Developed by Ali Imtiaz Chandio
          </div>
        </div>
      </div>

      {/* Privacy Policy & Terms Modal Overlays */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(7, 9, 14, 0.85)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '560px',
                background: '#0d1322',
                borderRadius: '24px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '36px',
                boxShadow: '0 30px 70px rgba(0,0,0,0.8)',
                position: 'relative',
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={20} />
              </button>

              {activeModal === 'privacy' ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#34d399', fontSize: '1.4rem', fontWeight: 900, marginBottom: '16px' }}>
                    <ShieldCheck size={24} /> Privacy Policy
                  </div>
                  <p style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '14px' }}>
                    Calorix respects user privacy. Image data processed during food scanning is evaluated in-memory to provide nutrition estimates and is never sold to third parties.
                  </p>
                  <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.875rem' }}>
                    All local metrics and health goal data remain under user control with optional account synchronization.
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', fontSize: '1.4rem', fontWeight: 900, marginBottom: '16px' }}>
                    <FileText size={24} /> Terms of Service
                  </div>
                  <p style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '14px' }}>
                    Calorix provides nutritional estimation and health tracking for informational and personal fitness purposes.
                  </p>
                  <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.875rem' }}>
                    Nutritional values and AI image recognition estimates should not be construed as professional medical advice.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
