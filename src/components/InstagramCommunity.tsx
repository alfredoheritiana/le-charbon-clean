import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Locale, UI_STRINGS } from '../data/content';
import { ASSET_MAP } from '../data/mediaManifest';
import { InstagramPreviewCard, InstagramPostData } from './InstagramPreviewCard';
import { Instagram, Flame, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface InstagramCommunityProps {
  locale: Locale;
}

export const InstagramCommunity: React.FC<InstagramCommunityProps> = ({ locale }) => {
  const t = UI_STRINGS[locale].community;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const isFr = locale === 'fr';

  // 4 Distinct Editorial Post Concepts as specified in Master Prompt
  const posts: InstagramPostData[] = [
    {
      id: 'post-01-grill',
      conceptName: isFr ? 'POST 01 · LE GRILL' : 'POST 01 · THE GRILL',
      displayName: 'LE CHARBON',
      handle: 'lecharbon.mu',
      avatarUrl: ASSET_MAP.LOGO_WITH_BG,
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=85',
      hasPlayableVideo: false,
      location: {
        fr: 'Atelier de cuisson · Phoenix',
        en: 'Flame Grill House · Phoenix',
      },
      caption: {
        fr: '350°C sur lit de braise vive. C’est ici que naît la croûte caramélisée inimitable de nos viandes.',
        en: '350°C over natural hardwood coals. Where the signature caramelized crust of our patties is born.',
      },
      hashtags: ['#LeCharbon', '#BraisePure', '#Grillmaster', '#Maurice'],
      isPreview: true,
    },
    {
      id: 'post-02-burger',
      conceptName: isFr ? 'POST 02 · LE BURGER' : 'POST 02 · THE BURGER',
      displayName: 'LE CHARBON',
      handle: 'lecharbon.mu',
      avatarUrl: ASSET_MAP.LOGO_WITH_BG,
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85',
      hasPlayableVideo: false,
      location: {
        fr: 'Le Charbon · Phoenix, Maurice',
        en: 'Le Charbon · Phoenix, Mauritius',
      },
      caption: {
        fr: 'Le Wagyu Noire Signature dans son élément : bun brioché toasté au beurre, double cheddar affiné fondant.',
        en: 'The Wagyu Noire Signature in its element: butter-toasted brioche, melted aged cheddar, smoky finish.',
      },
      hashtags: ['#WagyuNoire', '#BurgersALaBraise', '#GourmetBurger'],
      isPreview: true,
    },
    {
      id: 'post-03-bts',
      conceptName: isFr ? 'POST 03 · COULISSES' : 'POST 03 · BEHIND THE SCENES',
      displayName: 'LE CHARBON',
      handle: 'lecharbon.mu',
      avatarUrl: ASSET_MAP.LOGO_WITH_BG,
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=85',
      hasPlayableVideo: false,
      location: {
        fr: 'Cuisine & Assemblage · Phoenix',
        en: 'Kitchen & Assembly · Phoenix',
      },
      caption: {
        fr: 'Chaque commande montée minute au passe. Sauces signatures faites maison et pickles croquants.',
        en: 'Every burger assembled to order on the pass. Signature house relish and crunchy pickles.',
      },
      hashtags: ['#Coulisses', '#CuisineArtisanale', '#MinuteParMinute'],
      isPreview: true,
    },
    {
      id: 'post-04-experience',
      conceptName: isFr ? 'POST 04 · L’EXPÉRIENCE' : 'POST 04 · EXPERIENCE',
      displayName: 'LE CHARBON',
      handle: 'lecharbon.mu',
      avatarUrl: ASSET_MAP.LOGO_WITH_BG,
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85',
      hasPlayableVideo: false,
      location: {
        fr: 'Restaurant & Comptoir · Phoenix',
        en: 'Restaurant & Counter · Phoenix',
      },
      caption: {
        fr: 'L’ambiance chaleureuse du soir chez Le Charbon. Burgers fumants, frites Crispers et feu de caractère.',
        en: 'The warm evening ambiance at Le Charbon. Hot burgers, crispy fries, and bold fire.',
      },
      hashtags: ['#LeCharbonExperience', '#FoodiesMaurice', '#Phoenix'],
      isPreview: true,
    },
  ];

  // GSAP Entrance ScrollTrigger Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !cardsContainerRef.current || !sectionRef.current) return;

    const cards = cardsContainerRef.current.querySelectorAll('.insta-preview-item');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [locale]);

  // Track scroll position on mobile for slide indicators
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const scrollPos = el.scrollLeft;
    const cardWidth = el.offsetWidth * 0.75;
    const index = Math.round(scrollPos / cardWidth);
    setActiveSlide(Math.min(Math.max(index, 0), posts.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!scrollTrackRef.current) return;
    const track = scrollTrackRef.current;
    const cards = track.querySelectorAll('.insta-preview-item');
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="section-community"
      data-background="black"
      className="w-full bg-[#161616] py-20 sm:py-28 border-b border-[#2A2A2A] overflow-hidden relative"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* ============================================================ */}
        {/* SECTION HEADING                                              */}
        {/* ============================================================ */}
        <div className="text-center max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[#E57A2E] text-xs font-mono-pp uppercase tracking-widest mb-3">
            <Flame className="w-4 h-4 fill-current" />
            <span>COMMUNAUTÉ</span>
          </div>
          <h2 className="text-[#F3EDE2] font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#A39D93] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP & TABLET STAGGERED GRID (>= 768px)                   */}
        {/* ============================================================ */}
        <div
          ref={cardsContainerRef}
          className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 w-full max-w-[1360px] items-start mb-8 xl:mb-12"
        >
          {posts.map((post, idx) => {
            // Asymmetrical staggered offsets matching Pretty Patty reference:
            // Card 1: normal alignment (0px)
            // Card 2: downward offset (5rem / translate-y-20)
            // Card 3: normal alignment (0px)
            // Card 4: moderate downward offset (2.9rem / translate-y-12)
            const staggerClasses =
              idx === 1
                ? 'xl:translate-y-16'
                : idx === 3
                ? 'xl:translate-y-8'
                : 'xl:translate-y-0';

            return (
              <div
                key={post.id}
                className={`insta-preview-item w-full flex justify-center transition-transform duration-500 ${staggerClasses}`}
              >
                <InstagramPreviewCard
                  post={post}
                  locale={locale}
                />
              </div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* MOBILE HORIZONTAL SWIPE WITH SCROLL SNAP (< 768px)           */}
        {/* ============================================================ */}
        <div className="block md:hidden w-full relative">
          <div
            ref={scrollTrackRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-6 pt-2 no-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {posts.map((post) => (
              <div
                key={post.id}
                className="insta-preview-item shrink-0 w-[84vw] max-w-[320px] snap-center"
              >
                <InstagramPreviewCard
                  post={post}
                  locale={locale}
                />
              </div>
            ))}
          </div>

          {/* Mobile slide indicators */}
          <div className="flex items-center justify-center gap-2 mt-4" aria-hidden="true">
            {posts.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 transition-all rounded-full ${
                  activeSlide === i
                    ? 'w-6 bg-[#E57A2E]'
                    : 'w-2 bg-[#333333]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* FOOTER ACTION BUTTON & DISCLOSURE                            */}
        {/* ============================================================ */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2A2A2A] bg-[#0B0B0B] text-xs font-mono-pp text-[#A39D93]">
            <Instagram className="w-3.5 h-3.5 text-[#E57A2E]" />
            <span>@lecharbon.mu · Phoenix, Maurice</span>
          </div>

          <p className="text-[11px] text-[#5A554E] font-mono-pp text-center max-w-md">
            {isFr
              ? 'Aperçu éditorial de nos publications. Rejoignez notre communauté lors de votre prochaine visite.'
              : 'Editorial preview of our publications. Join our flame-grilled community on your next visit.'}
          </p>
        </div>
      </div>
    </section>
  );
};
