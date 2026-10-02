import React, { useState, useEffect } from 'react';
import {
  RestaurantInfo,
  OpeningHour,
  MenuCategory,
  MenuItem,
  GalleryItem,
} from '../../shared/types.js';
import {
  getRestaurantInfo,
  getOpeningHours,
  getCategories,
  getMenuItems,
  getGallery,
} from './api.js';

import { ScrollProgress } from './components/ScrollProgress.js';
import { CustomCursor } from './components/CustomCursor.js';
import { PageLoader } from './components/PageLoader.js';

import { Navbar } from './components/Navbar.js';
import { MobileActionFooter } from './components/MobileActionFooter.js';
import { Footer } from './components/Footer.js';
import { ReservationModal } from './components/ReservationModal.js';

import { HomePage } from './pages/HomePage.js';
import { MenuPage } from './pages/MenuPage.js';
import { StoryPage } from './pages/StoryPage.js';
import { GalleryPage } from './pages/GalleryPage.js';
import { VisitPage } from './pages/VisitPage.js';
import { AdminPage } from './pages/AdminPage.js';
import { Loader2 } from 'lucide-react';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);

  // App Data
  const [info, setInfo] = useState<RestaurantInfo | null>(null);
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Parse route from hash or pathname
  const getInitialRoute = (): string => {
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    if (['menu', 'story', 'gallery', 'visit', 'admin'].includes(hash)) {
      return hash;
    }
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    if (['menu', 'story', 'gallery', 'visit', 'admin'].includes(path)) {
      return path;
    }
    return 'home';
  };

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.location.hash = route === 'home' ? '' : `#${route}`;
  };

  const loadData = async () => {
    try {
      const [infoData, hoursData, catData, itemsData, galleryData] = await Promise.all([
        getRestaurantInfo(),
        getOpeningHours(),
        getCategories(),
        getMenuItems(),
        getGallery(),
      ]);

      setInfo(infoData);
      setHours(hoursData);
      setCategories(catData);
      setMenuItems(itemsData);
      setGalleryItems(galleryData);
    } catch (err) {
      console.error('Failed to load initial restaurant data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentRoute(getInitialRoute());
    loadData();

    const handleHashChange = () => {
      const route = getInitialRoute();
      setCurrentRoute(route);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <span className="font-serif text-3xl font-bold tracking-tight text-[#4F131C] block">
            VALARMATHI MESS
          </span>
          <div className="font-tamil text-sm text-[#C8861B] font-semibold">
            வளர்மதி மெஸ் • கோவை (1986)
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs text-[#6B6661] pt-4">
            <Loader2 className="w-5 h-5 animate-spin text-[#4F131C]" />
            <span>Loading authentic regional kitchen data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#242220] selection:bg-[#4F131C] selection:text-[#FAF7F2]">
      {/* 1. Fast Initial Cinematic Splash Loader */}
      <PageLoader />

      {/* 2. Thin Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 3. Desktop Interactive Custom Cursor */}
      <CustomCursor />

      {/* 4. Scroll-Aware Navbar */}
      <Navbar
        info={info}
        hours={hours}
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* 5. Main Route View */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            info={info}
            hours={hours}
            menuItems={menuItems}
            galleryItems={galleryItems}
            onNavigate={navigateTo}
            onOpenReservation={() => setIsReservationOpen(true)}
          />
        )}

        {currentRoute === 'menu' && (
          <MenuPage
            categories={categories}
            items={menuItems}
            onOpenReservation={() => setIsReservationOpen(true)}
          />
        )}

        {currentRoute === 'story' && (
          <StoryPage
            info={info}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'gallery' && (
          <GalleryPage
            items={galleryItems}
          />
        )}

        {currentRoute === 'visit' && (
          <VisitPage
            info={info}
            hours={hours}
            onOpenReservation={() => setIsReservationOpen(true)}
          />
        )}

        {currentRoute === 'admin' && (
          <AdminPage
            onRefreshData={loadData}
          />
        )}
      </main>

      {/* 6. Footer */}
      <Footer
        info={info}
        onNavigate={navigateTo}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* 7. Ergonomic Mobile Action Bar */}
      <MobileActionFooter
        onNavigate={navigateTo}
        onOpenReservation={() => setIsReservationOpen(true)}
        googleMapsUrl={info?.google_maps_url}
        phone={info?.phone}
      />

      {/* 8. Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}

export default App;
