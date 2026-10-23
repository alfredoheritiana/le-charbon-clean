import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Mousewheel, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Locale, UI_STRINGS } from '../data/content';
import { MENU_PRODUCTS } from '../data/menu';
import { ArrowLeft, ArrowRight, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import { WagyuSignatureBadge } from './CharcoalGraphics';

interface BurgerCarouselProps {
  locale: Locale;
  onNavigateToMenu: () => void;
}

export const BurgerCarousel: React.FC<BurgerCarouselProps> = ({ locale, onNavigateToMenu }) => {
  const t = UI_STRINGS[locale].popular;
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const toggleDetails = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="popular-burgers"
      data-background="black"
      className="w-full bg-[#0B0B0B] py-16 sm:py-24 lg:py-28 overflow-hidden border-b border-[#2A2A2A] relative select-none"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-[radial-gradient(ellipse,rgba(229,122,46,0.09)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-2xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-[#E57A2E] text-xs font-mono-pp uppercase tracking-widest mb-3">
            <Flame className="w-4 h-4 fill-current" />
            <span>SÉLECTION GOURMET · CARTE OFFICIELLE</span>
          </div>
          <h2 className="text-[#F3EDE2] font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A39D93] leading-relaxed max-w-xl mx-auto px-2">
            {t.subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Pagination, Keyboard, Mousewheel, Autoplay]}
            loop={true}
            speed={650}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            watchSlidesProgress={true}
            keyboard={{ enabled: true, onlyInViewport: false }}
            mousewheel={{ forceToAxis: true }}
            navigation={{
              prevEl: '.burger-swiper-prev',
              nextEl: '.burger-swiper-next',
            }}
            pagination={{
              el: '.burger-swiper-pagination',
              clickable: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 18,
              },
              540: {
                slidesPerView: 1.35,
                spaceBetween: 22,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 26,
              },
              1024: {
                slidesPerView: 2.75,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 36,
              },
            }}
            className="pb-16 pt-3 !overflow-visible"
            style={{ touchAction: 'pan-y' }}
          >
            {MENU_PRODUCTS.map((burger) => {
              const isWagyu = burger.id === 'wagyu-noire-signature';
              const isExpanded = expandedCardId === burger.id;

              return (
                <SwiperSlide key={burger.id} className="h-auto">
                  <div
                    onClick={() => setExpandedCardId(isExpanded ? null : burger.id)}
                    className="group bg-[#161616] border border-[#2A2A2A] rounded-2xl p-5 sm:p-7 h-full flex flex-col justify-between transition-all duration-300 hover:border-[#E57A2E]/70 hover:shadow-[0_16px_45px_rgba(229,122,46,0.18)] relative overflow-hidden cursor-pointer"
                  >
                    {/* Top Row: Badge & Price in MUR */}
                    <div className="flex items-center justify-between mb-2 sm:mb-3 z-10 relative">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono-pp font-bold uppercase tracking-wider bg-[#0B0B0B] border border-[#2A2A2A] text-[#F2A34A] group-hover:border-[#E57A2E]/50 transition-colors">
                        {burger.badge}
                      </span>
                      <span className="text-lg sm:text-xl font-mono-pp font-bold text-[#F3EDE2] group-hover:text-[#F2A34A] transition-colors">
                        Rs {burger.priceMur}
                      </span>
                    </div>

                    {/* Burger Image Stage with glowing back-halo */}
                    <div className="relative w-full h-48 sm:h-56 md:h-64 flex items-center justify-center my-2 sm:my-3">
                      <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-[#C6401C]/25 via-[#E57A2E]/15 to-transparent blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                      <img
                        src={burger.image}
                        alt={burger.name[locale]}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-108 drop-shadow-[0_16px_30px_rgba(0,0,0,0.9)]"
                        loading="lazy"
                      />
                      {isWagyu && (
                        <div className="absolute -top-2 -right-2 pointer-events-none drop-shadow-xl">
                          <WagyuSignatureBadge size={60} />
                        </div>
                      )}
                    </div>

                    {/* Details Block: Clean, stable layout with progressive detail reveal */}
                    <div className="w-full flex flex-col pt-3 sm:pt-4 border-t border-[#2A2A2A] mt-auto">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-2xl font-display font-bold uppercase tracking-wide text-[#F3EDE2] group-hover:text-[#F2A34A] transition-colors">
                          {burger.name[locale]}
                        </h3>
                        {/* Touch-accessible detail toggle icon on mobile */}
                        <button
                          type="button"
                          onClick={(e) => toggleDetails(burger.id, e)}
                          aria-label={isExpanded ? 'Réduire la description' : 'Afficher la description complète'}
                          className="sm:hidden text-[#E57A2E] p-1.5 rounded-full bg-[#0B0B0B] border border-[#2A2A2A] shrink-0 mt-0.5"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Progressive Description */}
                      <div className="relative transition-all duration-300">
                        <p
                          className={`text-xs sm:text-sm text-[#A39D93] leading-relaxed transition-all ${
                            isExpanded ? 'line-clamp-none text-[#F3EDE2]' : 'line-clamp-3'
                          }`}
                        >
                          {burger.description[locale]}
                        </p>
                      </div>

                      {/* Subtle badge indicator */}
                      <div className="flex items-center justify-between text-[10px] font-mono-pp uppercase tracking-wider text-[#E57A2E] mt-3 pt-2 border-t border-[#2A2A2A]/40">
                        <span className="flex items-center gap-1.5">
                          <Flame className="w-3 h-3 fill-current" />
                          <span>{locale === 'fr' ? 'Cuisson à la braise' : 'Charcoal flame-seared'}</span>
                        </span>
                        <span className="hidden sm:inline-block text-[#A39D93] text-[9px]">
                          {locale === 'fr' ? 'Cliquer pour détails' : 'Click for details'}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Arrows with min 44x44px touch targets */}
          <button
            aria-label="Burger précédent"
            className="burger-swiper-prev absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-[#2A2A2A] bg-[#161616] text-[#F3EDE2] hover:border-[#E57A2E] hover:text-[#E57A2E] hover:bg-[#0B0B0B] flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="Burger suivant"
            className="burger-swiper-next absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-[#2A2A2A] bg-[#161616] text-[#F3EDE2] hover:border-[#E57A2E] hover:text-[#E57A2E] hover:bg-[#0B0B0B] flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Custom Pagination Container */}
          <div className="burger-swiper-pagination flex justify-center items-center gap-2 mt-4" />
        </div>

        {/* Full Menu CTA Button */}
        <button
          onClick={onNavigateToMenu}
          className="btn-primary mt-6 sm:mt-8 py-3.5 px-8 text-sm sm:text-base cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(229,122,46,0.3)]"
        >
          {t.cta}
        </button>
      </div>
    </section>
  );
};
