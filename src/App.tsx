import { lazy, Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';

// Keep the initial bundle small: the 3D-heavy sections are loaded only when needed.
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const Features = lazy(() => import('./components/Features'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const AppShowcase = lazy(() => import('./components/AppShowcase'));
const Technology = lazy(() => import('./components/Technology'));
const Developer = lazy(() => import('./components/Developer'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));

function SectionFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        minHeight: '24px',
        background: '#07090e',
      }}
    />
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{
        background: '#07090e',
        color: '#f8fafc',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Suspense fallback={<SectionFallback />}>
          <Navbar />
          <main>
            <Hero />
            <Features />
            <HowItWorks />
            <AppShowcase />
            <Technology />
            <Developer />
            <CTA />
          </main>
          <Footer />
        </Suspense>
      </motion.div>
    </div>
  );
}
