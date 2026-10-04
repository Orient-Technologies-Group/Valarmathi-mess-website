import React from 'react';
import { useLocation } from 'wouter';
import { Hero } from '../components/Hero';
import { BrandStrip } from '../components/BrandStrip';
import { ChaiJourney } from '../components/ChaiJourney';
import { OurStory } from '../components/OurStory';
import { SignatureFavourites } from '../components/SignatureFavourites';
import { ChaiCompanion } from '../components/ChaiCompanion';
import { TapriExperience } from '../components/TapriExperience';
import { FindYourTapri } from '../components/FindYourTapri';
import { ReviewsSection } from '../components/ReviewsSection';

export const HomePage: React.FC = () => {
  const [, setLocation] = useLocation();

  const handleExploreMenu = () => {
    setLocation('/menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFindOutlets = () => {
    setLocation('/outlets');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHighlightMenu = (_itemIds: string[]) => {
    setLocation('/menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Editorial Hero */}
      <Hero
        onExploreMenu={handleExploreMenu}
        onFindOutlets={handleFindOutlets}
      />

      {/* Brand Strip */}
      <BrandStrip />

      {/* Signature “Journey of a Chai” Sticky Scroll Sequence */}
      <ChaiJourney onExploreMenu={handleExploreMenu} />

      {/* Story Introduction */}
      <OurStory />

      {/* Signature Items Showcase */}
      <SignatureFavourites onViewFullMenu={handleExploreMenu} />

      {/* Interactive Chai Pairing Companion */}
      <ChaiCompanion onHighlightMenu={handleHighlightMenu} />

      {/* Flagship Ambiance & Board Games */}
      <TapriExperience />

      {/* Customer Voices: Real Google Reviews */}
      <ReviewsSection />

      {/* Outlets Locator */}
      <FindYourTapri />
    </div>
  );
};
