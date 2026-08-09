import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Flame, Cpu, Cloud, Sparkles, Layers } from 'lucide-react';
import InteractiveCard from './InteractiveCard';
import { Canvas } from '@react-three/fiber';
import { Sphere, Icosahedron, Dodecahedron, Torus, Float, Sparkles as R3FSparkles } from '@react-three/drei';

function TechCoreVisual() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[0, 0, 3]} color="#38bdf8" intensity={3} />
        <Float speed={2} rotationIntensity={0.5}>
          <Icosahedron args={[0.8, 0]}>
            <meshPhysicalMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} wireframe />
          </Icosahedron>
          <Sphere args={[0.4, 16, 16]}>
            <meshPhysicalMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.8} />
          </Sphere>
        </Float>
        <R3FSparkles count={20} scale={4} size={2.5} speed={0.6} color="#38bdf8" />
      </Canvas>
    </div>
  );
}

export default function Technology() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleChange);
    return () => motionQuery.removeEventListener('change', handleChange);
  }, []);

  const techCards = [
    {
      title: 'Flutter',
      tagline: 'Cross-Platform Framework',
      description:
        'Cross-platform framework used to build the Calorix mobile application with a consistent and responsive experience.',
      icon: Smartphone,
      color: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.25)',
      badge: 'Mobile App',
      visual3D: (
        <div style={{ position: 'relative', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
            <ambientLight intensity={1.5} />
            <Float speed={2} rotationIntensity={0.4}>
              <Torus args={[0.7, 0.12, 16, 32]} rotation={[0.5, 0.5, 0]}>
                <meshPhysicalMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} />
              </Torus>
            </Float>
          </Canvas>
        </div>
      ),
    },
    {
      title: 'Firebase',
      tagline: 'Backend Infrastructure',
      description:
        'Provides backend services such as authentication, data management, and application infrastructure.',
      icon: Flame,
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.25)',
      badge: 'Cloud Sync',
      visual3D: (
        <div style={{ position: 'relative', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
            <ambientLight intensity={1.5} />
            <Float speed={2} rotationIntensity={0.4}>
              <Dodecahedron args={[0.65, 0]}>
                <meshPhysicalMaterial color="#f59e0b" emissive="#b45309" emissiveIntensity={0.6} />
              </Dodecahedron>
            </Float>
          </Canvas>
        </div>
      ),
    },
    {
      title: 'AI-Powered Food Analysis',
      tagline: 'Intelligent Vision Model',
      description:
        'Intelligent image analysis helps identify food and estimate nutritional information from meal photos.',
      icon: Cpu,
      color: '#10b981',
      glow: 'rgba(16, 185, 129, 0.25)',
      badge: 'Vision AI',
      visual3D: (
        <div style={{ position: 'relative', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
            <ambientLight intensity={1.5} />
            <Float speed={2} rotationIntensity={0.4}>
              <Sphere args={[0.6, 16, 16]}>
                <meshPhysicalMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.7} wireframe />
              </Sphere>
            </Float>
          </Canvas>
        </div>
      ),
    },
    {
      title: 'Modern Cloud Architecture',
      tagline: 'Scalable & Secure Services',
      description:
        'Designed with scalable cloud services and a secure architecture for reliable application experiences.',
      icon: Cloud,
      color: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.25)',
      badge: 'Secure Gateway',
      visual3D: (
        <div style={{ position: 'relative', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
            <ambientLight intensity={1.5} />
            <Float speed={2} rotationIntensity={0.4}>
              <Torus args={[0.7, 0.08, 16, 32]} rotation={[Math.PI / 3, 0, 0]}>
                <meshPhysicalMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={0.7} />
              </Torus>
            </Float>
          </Canvas>
        </div>
      ),
    },
  ];

  return (
    <section id="technology" style={{ position: 'relative', background: '#07090e', padding: '100px 0' }}>
      {/* Background Ambient Glow */}
      <div className="bg-glow-emerald" style={{ top: '20%', left: '-10%', width: '500px', height: '500px' }} />

      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px auto' }}>
          <div className="glass-pill" style={{ marginBottom: '16px', borderColor: 'rgba(56, 189, 248, 0.35)' }}>
            <Sparkles size={14} color="#38bdf8" />
            <span style={{ color: '#38bdf8', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.75rem' }}>
              BUILT WITH MODERN TECHNOLOGY
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
            Technology Behind <span className="text-gradient-cyan">Calorix</span>
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8', lineHeight: 1.7 }}>
            Calorix combines modern mobile development, cloud infrastructure, and AI-powered analysis to create a fast and intelligent health-tracking experience.
          </p>
        </div>

        {/* Central 3D AI Neural Core Scene */}
        {!reducedMotion && (
          <div style={{ marginBottom: '50px' }}>
            <TechCoreVisual />
          </div>
        )}

        {/* 4 Interactive Technology Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '28px',
          }}
        >
          {techCards.map((tech, idx) => {
            const IconComp = tech.icon;
            return (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <InteractiveCard
                  glowColor={tech.glow}
                  borderColor={`${tech.color}40`}
                  style={{
                    padding: '30px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '16px',
                          background: tech.glow,
                          border: `1px solid ${tech.color}40`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 10px 20px ${tech.glow}`,
                        }}
                      >
                        <IconComp size={26} color={tech.color} />
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: tech.color, background: `${tech.color}15`, padding: '4px 10px', borderRadius: '8px', border: `1px solid ${tech.color}30` }}>
                        {tech.badge}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', marginBottom: '4px' }}>
                      {tech.title}
                    </h3>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: tech.color, marginBottom: '12px' }}>
                      {tech.tagline}
                    </div>
                    <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px' }}>
                      {tech.description}
                    </p>
                  </div>

                  <div>
                    {tech.visual3D}
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: '#cbd5e1' }}>
                      <Layers size={14} color={tech.color} /> Reliable Infrastructure
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
