import React from 'react';
import { RestaurantInfo, OpeningHour, MenuItem, GalleryItem } from '../../../shared/types.js';
import { Hero } from '../components/Hero.js';
import { BananaLeafTransition } from '../components/BananaLeafTransition.js';
import { KonguIntro } from '../components/KonguIntro.js';
import { IngredientJourney } from '../components/IngredientJourney.js';
import { SignatureDishes } from '../components/SignatureDishes.js';
import { BigTypography } from '../components/BigTypography.js';
import { ExperienceSection } from '../components/ExperienceSection.js';
import { HeritageTimeline } from '../components/HeritageTimeline.js';
import { EditorialGalleryPreview } from '../components/EditorialGalleryPreview.js';
import { ReviewsSection } from '../components/ReviewsSection.js';
import { LocationBanner } from '../components/LocationBanner.js';

interface HomePageProps {
  info: RestaurantInfo | null;
  hours: OpeningHour[];
  menuItems: MenuItem[];
  galleryItems: GalleryItem[];
  onNavigate: (route: string) => void;
  onOpenReservation: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  info,
  hours,
  menuItems,
  galleryItems,
  onNavigate,
  onOpenReservation,
}) => {
  return (
    <div className="min-h-screen">
      {/* 1. Cinematic Hero with scroll transform */}
      <Hero
        info={info}
        hours={hours}
        onNavigate={onNavigate}
        onOpenReservation={onOpenReservation}
      />

      {/* 2. Signature Banana Leaf Organic Wipe Transition */}
      <BananaLeafTransition />

      {/* 3. Kongu Introduction (Scroll storytelling & clip-path unmasking) */}
      <KonguIntro />

      {/* 4. The Ingredient Journey: Soil -> Spice -> Fire -> Plate */}
      <IngredientJourney />

      {/* 5. Signature Dishes (Desktop Pinned Horizontal Scroll & Mobile Snap Carousel) */}
      <SignatureDishes
        items={menuItems}
        onViewMenu={() => onNavigate('menu')}
      />

      {/* 6. Big Dramatic Typography Moment */}
      <BigTypography />

      {/* 7. The Mess Culture (Dual-layer photo depth parallax) */}
      <ExperienceSection />

      {/* 8. Heritage Timeline with Giant 1986 Architectural Typography */}
      <HeritageTimeline />

      {/* 9. Editorial Food Gallery with Custom Cursor */}
      <EditorialGalleryPreview
        items={galleryItems}
        onViewAll={() => onNavigate('gallery')}
      />

      {/* 10. Customer Experience (Verified placeholder cards) */}
      <ReviewsSection />

      {/* 11. Destination Climax: "Come Hungry. Leave Happy." */}
      <LocationBanner
        info={info}
        hours={hours}
        onOpenReservation={onOpenReservation}
      />
    </div>
  );
};
