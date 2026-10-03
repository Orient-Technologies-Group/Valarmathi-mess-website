import { useEffect } from 'react';
import { Switch, Route, useLocation } from 'wouter';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { ScrollProgress } from './components/ScrollProgress';
import { PageLoader } from './components/PageLoader';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { StoryPage } from './pages/StoryPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { OutletsPage } from './pages/OutletsPage';

export function App() {
  const [location] = useLocation();

  useEffect(() => {
    // Ultra-luxurious momentum smooth scrolling
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Scroll to top on route change
    lenis.scrollTo(0, { immediate: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [location]);

  return (
    <div className="min-h-screen bg-[#F7F1E7] text-[#302019] flex flex-col pb-16 sm:pb-0 selection:bg-[#B95032] selection:text-[#F7F1E7]">
      {/* Visual Scroll Progress Bar */}
      <ScrollProgress />

      {/* Atmospheric Page Opening Loader */}
      <PageLoader />

      {/* Refined Multi-Page Header */}
      <Navbar />

      {/* Multi-Page Routes */}
      <main id="main-content" className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/menu" component={MenuPage} />
          <Route path="/story" component={StoryPage} />
          <Route path="/experience" component={ExperiencePage} />
          <Route path="/outlets" component={OutletsPage} />
          <Route>{() => <HomePage />}</Route>
        </Switch>
      </main>

      {/* Footer Directory */}
      <Footer />

      {/* Sticky Mobile Bottom Bar */}
      <MobileActionBar />
    </div>
  );
}

export default App;
