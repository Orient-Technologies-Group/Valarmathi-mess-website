import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStrip } from './components/BrandStrip';
import { OurStory } from './components/OurStory';
import { SignatureFavourites } from './components/SignatureFavourites';
import { InteractiveMenu } from './components/InteractiveMenu';
import { ChaiCompanion } from './components/ChaiCompanion';
import { TapriExperience } from './components/TapriExperience';
import { FindYourTapri } from './components/FindYourTapri';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';

export function App() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleHighlightMenu = (_itemIds: string[]) => {
    scrollToSection('#menu');
  };

  return (
    <div className="min-h-screen bg-[#F7F1E7] text-[#302019] flex flex-col pb-16 sm:pb-0">
      {/* Refined Sticky Header */}
      <Navbar onNavigateToMenu={() => scrollToSection('#menu')} />

      {/* Main Page Flow */}
      <main id="main-content" className="flex-1">
        {/* Editorial Asymmetric Hero */}
        <Hero
          onExploreMenu={() => scrollToSection('#menu')}
          onFindOutlets={() => scrollToSection('#outlets')}
        />

        {/* Philosophy Brand Strip */}
        <BrandStrip />

        {/* Our Story & 4 Kitchen Promises */}
        <OurStory />

        {/* Signature Favourites ("First visit? Start here.") */}
        <SignatureFavourites onViewFullMenu={() => scrollToSection('#menu')} />

        {/* Interactive Menu with Filters & Search */}
        <InteractiveMenu />

        {/* Chai Companion Pairing Interaction */}
        <ChaiCompanion onHighlightMenu={handleHighlightMenu} />

        {/* The Tapri Experience (Espresso Contrast Section with Board Games) */}
        <TapriExperience />

        {/* Coimbatore Outlets Selector */}
        <FindYourTapri />
      </main>

      {/* Warm Closing Invitation & Footer Directory */}
      <Footer />

      {/* Compact Mobile Action Bar */}
      <MobileActionBar />
    </div>
  );
}

export default App;
