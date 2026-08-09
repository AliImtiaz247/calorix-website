import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Camera,
  Flame,
  PieChart,
  Target,
  TrendingUp,
  Footprints,
  BellRing,
  Globe2,
  Sparkles,
  X,
  ArrowRight,
} from 'lucide-react';
import InteractiveCard from './InteractiveCard';
import {
  FeatureScannerVisual,
  CalorieRingVisual,
  NutritionChartVisual,
  GoalTargetVisual,
  ProgressGraphVisual,
  StepTrackerVisual,
  NotificationVisual,
  LanguageGlobeVisual,
} from './3d/FeatureVisuals';

interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Camera;
  color: string;
  glow: string;
  gridClass: string;
  visual: React.ReactNode;
  extendedInfo: string[];
}

interface FeaturesProps {
  onNavigateDownload?: () => void;
}

export default function Features({ onNavigateDownload: _onNavigateDownload }: FeaturesProps) {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  const featuresList: FeatureItem[] = [
    {
      id: 'ai-scanner',
      title: 'AI Food Scanner',
      tagline: 'Snap your meal and let AI analyze it.',
      description:
        'Take a photo of your food and Calorix identifies the meal and provides estimated calories and nutritional information.',
      icon: Camera,
      color: '#10b981',
      glow: 'rgba(16, 185, 129, 0.25)',
      gridClass: 'col-span-2-desktop',
      visual: <FeatureScannerVisual />,
      extendedInfo: [
        'Advanced computer vision model trained on over 100,000 global food items.',
        'Instant multi-item meal detection from a single camera photo.',
        'Automatic portion estimation and macro nutrient breakdown.',
      ],
    },
    {
      id: 'calorie-tracking',
      title: 'Calorie Tracking',
      tagline: 'Know what you eat.',
      description:
        'Track daily calories and instantly see your consumed, remaining, and target calories.',
      icon: Flame,
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.25)',
      gridClass: 'col-span-1-desktop',
      visual: <CalorieRingVisual />,
      extendedInfo: [
        'Real-time remaining calorie counter based on your daily energy budget.',
        'Dynamic calorie burn calculations synchronized with activity tracking.',
        'Customizable meal timing and calorie logging history.',
      ],
    },
    {
      id: 'nutrition-analysis',
      title: 'Nutrition Analysis',
      tagline: 'Understand your nutrition.',
      description:
        'Track important nutritional values such as Protein, Carbohydrates, Fat, and Calories.',
      icon: PieChart,
      color: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.25)',
      gridClass: 'col-span-1-desktop',
      visual: <NutritionChartVisual />,
      extendedInfo: [
        'Detailed breakdown of macro-nutrients and key micro-nutrients.',
        'Custom macro split targets (e.g. Keto, High-Protein, Balanced).',
        'Nutritional quality scoring for every logged meal.',
      ],
    },
    {
      id: 'personalized-goals',
      title: 'Personalized Goals',
      tagline: 'Built around your goals.',
      description:
        'Calorix uses your profile and activity information to help you work toward personalized health goals.',
      icon: Target,
      color: '#ec4899',
      glow: 'rgba(236, 72, 153, 0.25)',
      gridClass: 'col-span-1-desktop',
      visual: <GoalTargetVisual />,
      extendedInfo: [
        'Adaptive caloric recommendations based on weekly weight trends.',
        'Personalized goals for weight loss, maintenance, or muscle gain.',
        'Intelligent adjustments when your activity levels change.',
      ],
    },
    {
      id: 'progress-tracking',
      title: 'Progress Tracking',
      tagline: 'See your progress clearly.',
      description:
        'Visualize changes in calories, weight, activity, steps, and goal completion with clear interactive graphs.',
      icon: TrendingUp,
      color: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.25)',
      gridClass: 'col-span-2-desktop',
      visual: <ProgressGraphVisual />,
      extendedInfo: [
        'Weekly, monthly, and yearly health progression analytics.',
        'Correlate nutrition logging with body composition changes.',
        'Exportable progress summary reports for your health coach or doctor.',
      ],
    },
    {
      id: 'step-tracking',
      title: 'Step Tracking',
      tagline: 'Keep moving.',
      description:
        'Track daily steps and activity progress toward your movement goals.',
      icon: Footprints,
      color: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.25)',
      gridClass: 'col-span-1-desktop',
      visual: <StepTrackerVisual />,
      extendedInfo: [
        'Seamless integration with Apple Health, Google Health Connect, and fitness wearables.',
        'Active step calorie burn estimation algorithm.',
        'Inactivity alerts to keep you moving throughout the day.',
      ],
    },
    {
      id: 'smart-notifications',
      title: 'Smart Notifications',
      tagline: 'Stay motivated automatically.',
      description:
        'Receive useful notifications when you reach goals, complete milestones, or need a reminder.',
      icon: BellRing,
      color: '#10b981',
      glow: 'rgba(16, 185, 129, 0.25)',
      gridClass: 'col-span-1-desktop',
      visual: <NotificationVisual />,
      extendedInfo: [
        'Intelligent mealtime reminders based on your daily schedule.',
        'Goal completion celebration alerts and streak counters.',
        'Custom notification frequencies to prevent alert fatigue.',
      ],
    },
    {
      id: 'multi-language',
      title: 'Multi-Language & Themes',
      tagline: 'Calorix adapts to you.',
      description:
        'Support multiple languages and both light and dark themes for a personalized experience.',
      icon: Globe2,
      color: '#6366f1',
      glow: 'rgba(99, 102, 241, 0.25)',
      gridClass: 'col-span-1-desktop',
      visual: <LanguageGlobeVisual />,
      extendedInfo: [
        'Multi-lingual support including English, Urdu, Spanish, Arabic, and French.',
        'Sleek dark futuristic UI theme and high-contrast light mode.',
        'Automatic device preference synchronization.',
      ],
    },
  ];

  // Stagger variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="features" style={{ position: 'relative', background: '#07090e', padding: '100px 0' }}>
      {/* Background Ambient Glows */}
      <div className="bg-glow-emerald" style={{ top: '15%', right: '-10%', width: '500px', height: '500px' }} />
      <div className="bg-glow-violet" style={{ bottom: '10%', left: '-10%', width: '500px', height: '500px' }} />

      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
          <div className="glass-pill" style={{ marginBottom: '18px', borderColor: 'rgba(52, 211, 153, 0.35)' }}>
            <Sparkles size={14} color="#34d399" />
            <span style={{ color: '#34d399', fontWeight: 800 }}>Core Features Overview</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '18px',
              letterSpacing: '-1px',
            }}
          >
            Everything You Need to <span className="text-gradient-emerald">Reach Your Goals</span>
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8', lineHeight: 1.7 }}>
            Calorix combines AI-powered food analysis, calorie tracking, nutrition insights, activity tracking, and personalized goals in one intelligent health companion.
          </p>
        </div>

        {/* Asymmetric 3D Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="features-asymmetric-grid"
        >
          {featuresList.map((feat) => {
            const IconComp = feat.icon;
            return (
              <motion.div key={feat.id} variants={cardVariants} className={feat.gridClass}>
                <InteractiveCard
                  glowColor={feat.glow}
                  borderColor={`${feat.color}50`}
                  onClick={() => setSelectedFeature(feat)}
                  ariaLabel={`View details for ${feat.title}`}
                  style={{
                    padding: '30px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Header Row: Icon Badge & Action Arrow */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '16px',
                          background: feat.glow,
                          border: `1px solid ${feat.color}50`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 10px 25px ${feat.glow}`,
                        }}
                      >
                        <IconComp size={26} color={feat.color} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: feat.color, fontWeight: 800 }}>
                        Learn More <ArrowRight size={14} />
                      </div>
                    </div>

                    {/* Feature Title */}
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', marginBottom: '6px' }}>
                      {feat.title}
                    </h3>

                    {/* Tagline */}
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: feat.color, marginBottom: '10px' }}>
                      {feat.tagline}
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
                      {feat.description}
                    </p>
                  </div>

                  {/* Interactive 3D Visual Container */}
                  <div style={{ marginTop: 'auto' }}>
                    {feat.visual}
                  </div>
                </InteractiveCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Feature Detail Modal Overlay */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFeature(null)}
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
                maxWidth: '600px',
                background: '#0d1322',
                borderRadius: '28px',
                border: `1px solid ${selectedFeature.color}50`,
                padding: '36px',
                boxShadow: `0 30px 70px rgba(0,0,0,0.8), 0 0 50px ${selectedFeature.glow}`,
                position: 'relative',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFeature(null)}
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: selectedFeature.glow, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {<selectedFeature.icon size={26} color={selectedFeature.color} />}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>{selectedFeature.title}</h3>
                  <div style={{ fontSize: '0.85rem', color: selectedFeature.color, fontWeight: 800 }}>{selectedFeature.tagline}</div>
                </div>
              </div>

              <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
                {selectedFeature.description}
              </p>

              <div style={{ marginBottom: '24px' }}>
                {selectedFeature.visual}
              </div>

              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Key Technical Highlights:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedFeature.extendedInfo.map((info, i) => (
                  <li key={i} style={{ fontSize: '0.925rem', color: '#94a3b8', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: selectedFeature.color, fontWeight: 900 }}>✓</span>
                    {info}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Layout CSS */}
      <style>{`
        .features-asymmetric-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .col-span-2-desktop {
          grid-column: span 2;
        }

        .col-span-1-desktop {
          grid-column: span 1;
        }

        @media (max-width: 992px) {
          .features-asymmetric-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .col-span-2-desktop {
            grid-column: span 2 !important;
          }
        }

        @media (max-width: 768px) {
          .features-asymmetric-grid {
            grid-template-columns: 1fr !important;
          }
          .col-span-2-desktop, .col-span-1-desktop {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
