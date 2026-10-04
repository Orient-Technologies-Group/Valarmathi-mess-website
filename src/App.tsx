import { useEffect } from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollToTop } from './components/ScrollToTop';
import { PageLoader } from './components/PageLoader';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { StoryPage } from './pages/StoryPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { OutletsPage } from './pages/OutletsPage';

export function App() {
  const [location] = useLocation();

  useEffect(() => {
    // Instant scroll restoration on route navigation
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#302019] flex flex-col pb-16 sm:pb-0 selection:bg-[#B95032] selection:text-[#FAF6EF]">
      {/* Initial Welcome Loading Screen */}
      <PageLoader />

      {/* Visual Scroll Progress Bar */}
      <ScrollProgress />

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

      {/* Floating Back to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default App;
