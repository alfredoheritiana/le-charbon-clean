import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { Locale, UI_STRINGS } from '../data/content';
import { CharcoalFireBadge } from './CharcoalGraphics';
import { Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AboutPreviewProps {
  locale: Locale;
  onNavigateToAbout: () => void;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({ locale, onNavigateToAbout }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const t = UI_STRINGS[locale].aboutPreview;

  // Realistic editorial photographic gallery: charcoal, grill, preparation, buns, dining room, presentation, craft packaging
  const photos = [
    {
      src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      title: locale === 'fr' ? 'La Chaleur Vive' : 'The Radiant Heat',
      tag: locale === 'fr' ? 'Charbon Naturel' : 'Natural Charcoal',
    },
    {
      src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      title: locale === 'fr' ? 'Le Geste du Grillardin' : 'The Grillmaster’s Craft',
      tag: locale === 'fr' ? 'Maîtrise du Feu' : 'Fire Mastery',
    },
    {
      src: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
      title: locale === 'fr' ? 'La Précision du Goût' : 'Precision & Taste',
      tag: locale === 'fr' ? 'Préparation Minute' : 'Made to Order',
    },
    {
      src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      title: locale === 'fr' ? 'Buns Dorés & Moelleux' : 'Golden Toasted Brioche',
      tag: locale === 'fr' ? 'Sélection Gourmande' : 'Curated Buns',
    },
    {
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      title: locale === 'fr' ? 'L’Atmosphère Le Charbon' : 'The Le Charbon Room',
      tag: locale === 'fr' ? 'Cadre Chaleureux' : 'Dining Ambience',
    },
    {
      src: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
      title: locale === 'fr' ? 'Le Plaisir à Table' : 'At the Table',
      tag: locale === 'fr' ? 'Dégustation Chaude' : 'Freshly Served',
    },
    {
      src: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80',
      title: locale === 'fr' ? 'Emballé avec Soin' : 'Crafted Takeaway',
      tag: locale === 'fr' ? 'Service à Emporter' : 'Craft Packaging',
    },
  ];

  const titleLinesRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mm = gsap.matchMedia();

    // Title reveal animation with vertical mask
    if (!prefersReducedMotion && titleLinesRef.current && sectionRef.current) {
      gsap.fromTo(
        titleLinesRef.current,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // DESKTOP HORIZONTAL GALLERY WITH INTERNAL PARALLAX
    mm.add('(min-width: 1280px) and (min-height: 600px)', () => {
      if (!trackRef.current || !triggerRef.current) return;

      const track = trackRef.current;
      const totalWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      const distance = totalWidth - windowWidth + 180;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${distance + 350}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Horizontal track travel
      tl.to(track, {
        x: () => -distance,
        ease: 'none',
      }, 0);

      // Subtle internal parallax on photos (gentle 6-10% shift, no distortion)
      const photoImgs = track.querySelectorAll<HTMLImageElement>('.about-photo-img');
      photoImgs.forEach((img, i) => {
        tl.to(
          img,
          {
            xPercent: i % 2 === 0 ? 8 : -8,
            scale: 1.05,
            ease: 'none',
          },
          0
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      id="section-about"
      data-background="black"
      className="relative w-full bg-[#161616] text-[#F3EDE2] pt-24 sm:pt-32 pb-16 overflow-hidden border-b border-[#2A2A2A]"
    >
      {/* Background radial warmth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(229,122,46,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div ref={triggerRef} className="about__sticky w-full">
        {/* Top Header & Copy */}
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Headline with vertical mask reveal */}
            <div>
              <div className="inline-flex items-center gap-2 text-[#E57A2E] text-xs font-mono-pp uppercase tracking-wider mb-3">
                <Flame className="w-4 h-4 fill-current" />
                <span>SAVOIR-FAIRE & PASSION</span>
              </div>
              <div className="overflow-hidden py-1">
                <h2
                  ref={titleLinesRef}
                  className="text-[#F3EDE2] font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-none whitespace-pre-line will-change-transform"
                >
                  {t.title}
                </h2>
              </div>
            </div>

            {/* Right Body Story & CTA */}
            <div className="flex flex-col items-start gap-6 lg:pl-10">
              <p className="text-base sm:text-lg text-[#A39D93] leading-relaxed">
                {t.body}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={onNavigateToAbout}
                  className="btn-secondary py-3 px-6 text-sm cursor-pointer hover:border-[#E57A2E]"
                >
                  {t.cta}
                </button>
                <CharcoalFireBadge size={62} className="hidden sm:inline-block" />
              </div>
            </div>
          </div>
        </div>

        {/* 7 Photographs Editorial Rail */}
        {/* Desktop View (>= 1280px) Horizontal Pinned Track */}
        <div className="hidden xl:block w-full overflow-hidden mt-6 pb-6">
          <div
            ref={trackRef}
            className="flex items-center gap-6 pl-10 w-max will-change-transform"
          >
            {photos.map((item, idx) => {
              const isOdd = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`group relative shrink-0 w-[24vw] max-w-[390px] min-w-[290px] h-[500px] overflow-hidden bg-[#0B0B0B] border border-[#2A2A2A] transition-all duration-300 hover:border-[#E57A2E] shadow-xl ${
                    isOdd ? 'rounded-[2.8rem] h-[460px] my-auto' : 'rounded-2xl'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="about-photo-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 will-change-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/95 via-[#0B0B0B]/25 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[11px] font-mono-pp uppercase tracking-wider text-[#F2A34A] mb-1 font-semibold">
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-display font-bold uppercase text-[#F3EDE2] tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablet & Mobile View (< 1280px) Swiper Carousel */}
        <div className="block xl:hidden w-full px-4 sm:px-6 mt-6">
          <Swiper
            modules={[Pagination]}
            slidesPerView="auto"
            spaceBetween={16}
            pagination={{ clickable: true }}
            className="pb-12 !overflow-visible"
            style={{ touchAction: 'pan-y' }}
          >
            {photos.map((item, idx) => (
              <SwiperSlide
                key={idx}
                className="!w-[260px] xs:!w-[290px] sm:!w-[340px] h-[380px] xs:h-[420px] overflow-hidden rounded-2xl bg-[#0B0B0B] border border-[#2A2A2A] relative shadow-lg"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/95 via-[#0B0B0B]/20 to-transparent flex flex-col justify-end p-4 xs:p-5">
                  <span className="text-[10px] font-mono-pp uppercase tracking-wider text-[#F2A34A] mb-1 font-semibold">
                    {item.tag}
                  </span>
                  <h3 className="text-base xs:text-lg font-display font-bold uppercase text-[#F3EDE2] tracking-wide">
                    {item.title}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
