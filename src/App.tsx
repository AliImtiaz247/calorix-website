import { useState, useEffect } from 'react';
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
import AppDownload from './components/AppDownload';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'download'>('home');

  useEffect(() => {
    // Check initial hash/path to support direct linking to #download or /download
    const checkHash = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#download' || path === '/download') {
        setCurrentView('download');
      } else {
        setCurrentView('home');
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('popstate', checkHash);

    // Fail-safe timer to guarantee main website renders within 3.5 seconds
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('popstate', checkHash);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const navigateToDownload = () => {
    window.location.hash = '#download';
    setCurrentView('download');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ width: '100%' }}
      >
        {currentView === 'download' ? (
          <>
            <AppDownload onBack={navigateToHome} />
            <Footer onNavigateDownload={navigateToDownload} />
          </>
        ) : (
          <>
            <Navbar onNavigateDownload={navigateToDownload} />
            <main>
              <Hero onNavigateDownload={navigateToDownload} />
              <Features onNavigateDownload={navigateToDownload} />
              <HowItWorks onNavigateDownload={navigateToDownload} />
              <AppShowcase onNavigateDownload={navigateToDownload} />
              <Technology onNavigateDownload={navigateToDownload} />
              <Developer onNavigateDownload={navigateToDownload} />
              <CTA onNavigateDownload={navigateToDownload} />
            </main>
            <Footer onNavigateDownload={navigateToDownload} />
          </>
        )}
      </motion.div>
    </div>
  );
}
