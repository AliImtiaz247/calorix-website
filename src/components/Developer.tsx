import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Code, Terminal, Sparkles } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Icosahedron, Sphere, Float, Sparkles as R3FSparkles } from '@react-three/drei';

const developerLinks = {
  github: 'YOUR_GITHUB_URL',
  linkedin: 'YOUR_LINKEDIN_URL',
  email: 'ali.imtiaz.chandio@example.com',
};

function DeveloperAvatarVisual() {
  return (
    <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 16px auto' }}>
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />
        <pointLight position={[0, 0, 3]} color="#8b5cf6" intensity={3} />
        <Float speed={2} rotationIntensity={0.5}>
          <Icosahedron args={[0.9, 0]}>
            <meshPhysicalMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={0.7} wireframe />
          </Icosahedron>
          <Sphere args={[0.45, 24, 24]}>
            <meshPhysicalMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.8} />
          </Sphere>
        </Float>
        <R3FSparkles count={25} scale={4} size={3} speed={0.8} color="#a78bfa" />
      </Canvas>
    </div>
  );
}

export default function Developer() {
  const [activeStep, setActiveStep] = useState(4);

  const timelineSteps = [
    { name: 'IDEA', label: 'Conceptualizing AI Vision Health' },
    { name: 'DESIGN', label: 'Crafting Modern 3D UI/UX' },
    { name: 'DEVELOPMENT', label: 'Flutter Mobile & Cloud Backend' },
    { name: 'AI INTEGRATION', label: 'Gemini Computer Vision Pipeline' },
    { name: 'CALORIX', label: 'Complete Health Application' },
  ];

  const hasGithub = developerLinks.github && !developerLinks.github.includes('YOUR_');
  const hasLinkedin = developerLinks.linkedin && !developerLinks.linkedin.includes('YOUR_');
  const hasEmail = developerLinks.email && !developerLinks.email.includes('YOUR_');

  return (
    <section id="developer" style={{ position: 'relative', background: '#07090e', padding: '100px 0' }}>
      {/* Background Ambient Glow */}
      <div className="bg-glow-violet" style={{ top: '20%', left: '10%', width: '500px', height: '500px' }} />

      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px auto' }}>
          <div className="glass-pill" style={{ marginBottom: '16px', borderColor: 'rgba(167, 139, 250, 0.35)' }}>
            <Code size={14} color="#a78bfa" />
            <span style={{ color: '#a78bfa', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem' }}>
              MEET THE DEVELOPER
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
            Built With Passion. <span className="text-gradient-violet">Designed for Better Health.</span>
          </h2>
        </div>

        {/* Developer Profile Card */}
        <div style={{ maxWidth: '940px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel"
            style={{
              padding: '48px',
              borderColor: 'rgba(139, 92, 246, 0.35)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '260px 1fr',
                gap: '40px',
                alignItems: 'center',
              }}
              className="developer-grid"
            >
              {/* Left Column: Abstract 3D Holographic Developer Avatar */}
              <div style={{ textAlign: 'center' }}>
                <DeveloperAvatarVisual />
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Ali Imtiaz Chandio
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                  Developer & Creator
                </div>
              </div>

              {/* Right Column: Bio & Links */}
              <div>
                <h3
                  style={{
                    fontSize: '2.2rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    marginBottom: '6px',
                    letterSpacing: '-0.5px',
                  }}
                >
                  ALI IMTIAZ CHANDIO
                </h3>

                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: '#a78bfa',
                    marginBottom: '18px',
                    letterSpacing: '0.5px',
                  }}
                >
                  Developer & Creator of Calorix
                </div>

                <p
                  style={{
                    fontSize: '1.05rem',
                    color: '#cbd5e1',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                    fontStyle: 'italic',
                  }}
                >
                  “Calorix is designed and developed by Ali Imtiaz Chandio, focused on building practical AI-powered digital experiences that make health and nutrition tracking simpler.”
                </p>

                {/* Categories Badge Pill */}
                <div style={{ display: 'inline-flex', gap: '8px', padding: '6px 14px', background: 'rgba(167, 139, 250, 0.12)', border: '1px solid rgba(167, 139, 250, 0.3)', borderRadius: '9999px', fontSize: '0.825rem', fontWeight: 800, color: '#a78bfa', marginBottom: '28px' }}>
                  <Terminal size={14} /> AI • Mobile Development • Product Design
                </div>

                {/* Action Links */}
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  {hasGithub && (
                    <a
                      href={developerLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-hero-secondary"
                      style={{ padding: '12px 20px', fontSize: '0.9rem' }}
                    >
                      GitHub
                    </a>
                  )}
                  {hasLinkedin && (
                    <a
                      href={developerLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-hero-secondary"
                      style={{ padding: '12px 20px', fontSize: '0.9rem' }}
                    >
                      LinkedIn
                    </a>
                  )}
                  {hasEmail && (
                    <a
                      href={`mailto:${developerLinks.email}`}
                      className="btn-hero-primary"
                      style={{ padding: '12px 20px', fontSize: '0.9rem' }}
                    >
                      <Mail size={18} /> Contact Developer
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Visual Timeline Journey */}
            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#34d399', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} /> Calorix Development Journey
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', flexWrap: 'wrap', gap: '12px' }}>
                {timelineSteps.map((step, idx) => (
                  <div
                    key={step.name}
                    onClick={() => setActiveStep(idx)}
                    style={{
                      flex: 1,
                      minWidth: '120px',
                      background: activeStep === idx ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255,255,255,0.03)',
                      border: activeStep === idx ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '14px',
                      padding: '12px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div style={{ fontSize: '0.9rem', fontWeight: 900, color: activeStep === idx ? '#34d399' : '#ffffff' }}>
                      {step.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                      {step.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .developer-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .developer-grid div[style*="display: flex"] {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
