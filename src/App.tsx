import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import AppShowcase from './components/AppShowcase';
import Technology from './components/Technology';
import Developer from './components/Developer';
import CTA from './components/CTA';
import Footer from './components/Footer';

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
        style={{ width: '100%' }}
      >
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
      </motion.div>
    </div>
  );
}
