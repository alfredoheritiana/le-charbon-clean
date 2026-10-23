import React from 'react';
import { Locale } from '../data/content';
import { HeroIntro } from '../components/HeroIntro';
import { AboutPreview } from '../components/AboutPreview';
import { BurgerCarousel } from '../components/BurgerCarousel';
import { InstagramCommunity } from '../components/InstagramCommunity';
import { LocationCarousel } from '../components/LocationCarousel';
import { ReviewForm } from '../components/ReviewForm';
import { CharcoalRevealTransition } from '../components/CharcoalRevealTransition';
import { TeamSection } from '../components/TeamSection';

interface HomePageProps {
  locale: Locale;
  onNavigateToAbout: () => void;
  onNavigateToMenu: () => void;
  onNavigateToLocations: () => void;
  onOpenDeliveryModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  locale,
  onNavigateToAbout,
  onNavigateToMenu,
  onNavigateToLocations,
  onOpenDeliveryModal,
}) => {
  return (
    <main className="w-full bg-[#0B0B0B]">
      {/* 1. Hero Section */}
      <HeroIntro
        locale={locale}
        onNavigateToMenu={onNavigateToMenu}
        onNavigateToLocations={onNavigateToLocations}
      />

      {/* 2. About Preview + Photo Rail */}
      <AboutPreview
        locale={locale}
        onNavigateToAbout={onNavigateToAbout}
      />

      {/* 3. Popular Burgers Swiper */}
      <BurgerCarousel
        locale={locale}
        onNavigateToMenu={onNavigateToMenu}
      />

      {/* 4. Instagram Community */}
      <InstagramCommunity
        locale={locale}
      />

      {/* 5. Review / Feedback Form with Slanted Marquee */}
      <ReviewForm
        locale={locale}
      />

      {/* 6. Signature Transition — The Charcoal Reveal */}
      <CharcoalRevealTransition
        locale={locale}
      />

      {/* 7. Location Section */}
      <LocationCarousel
        locale={locale}
        onOpenDeliveryModal={onOpenDeliveryModal}
      />

      {/* 8. Craft & Fire Section */}
      <TeamSection
        locale={locale}
        onNavigateToMenu={onNavigateToMenu}
      />
    </main>
  );
};
