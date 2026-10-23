import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Locale, UI_STRINGS } from '../data/content';
import { ASSET_MAP } from '../data/mediaManifest';
import { Flame, ArrowDown, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroIntroProps {
  locale: Locale;
  onNavigateToMenu: () => void;
  onNavigateToLocations: () => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  locale,
  onNavigateToMenu,
  onNavigateToLocations,
}) => {
  const pinSectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const t = UI_STRINGS[locale].hero;
  const headlineLines = t.headlineLines || [
    locale === 'fr' ? 'DES BURGERS.' : 'BURGERS.',
    locale === 'fr' ? 'DU FEU.' : 'FIRE.',
    locale === 'fr' ? 'DU CARACTÈRE.' : 'CHARACTER.',
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!pinSectionRef.current || !haloRef.current || !burgerRef.current) return;

    const mm = gsap.matchMedia();

    // DESKTOP & LARGE TABLET WITH ADEQUATE HEIGHT (>= 992px width & >= 600px height)
    // Cinematic pinned ScrollTrigger scrub
    mm.add('(min-width: 992px) and (min-height: 600px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Halo expands and radiates heat
      tl.to(
        haloRef.current,
        {
          scale: 1.45,
          opacity: 0.95,
          ease: 'power2.out',
        },
        0
      );

      // 2. Burger moves subtly forward with scale and elevation
      tl.to(
        burgerRef.current,
        {
          scale: 1.08,
          yPercent: -4,
          ease: 'power2.out',
        },
        0
      );

      // 3. Title has subtle cinematic parallax depth
      if (titleRef.current) {
        tl.to(
          titleRef.current,
          {
            yPercent: -6,
            ease: 'power1.out',
          },
          0
        );
      }

      // 4. Bottom action bar smoothly dims towards transition
      if (bottomBarRef.current) {
        tl.to(
          bottomBarRef.current,
          {
            opacity: 0.25,
            y: 12,
            ease: 'power1.in',
          },
          0.6
        );
      }
    });

    // MOBILE, COMPACT TABLET & SHORT LANDSCAPE SCREENS (< 992px or < 600px height)
    // Non-pinned fluid scroll sequence: NO scroll trapping or swipe locking on mobile
    mm.add('(max-width: 991px), (max-height: 599px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        haloRef.current,
        {
          scale: 1.3,
          opacity: 0.85,
          ease: 'power1.out',
        },
        0
      );

      tl.to(
        burgerRef.current,
        {
          scale: 1.05,
          yPercent: -3,
          ease: 'power1.out',
        },
        0
      );
    });

    return () => {
      mm.revert();
    };
  }, [locale]);

  return (
    <section
      ref={pinSectionRef}
      id="hero"
      data-background="black"
      className="relative w-full min-h-[100dvh] h-[100dvh] bg-[#0B0B0B] text-[#F3EDE2] overflow-hidden select-none flex flex-col justify-between"
    >
      {/* LAYER 1: Background Noir Charbon & Subtle Ember Grit */}
      <div className="absolute inset-0 bg-[#0B0B0B] pointer-events-none z-0" />
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `radial-gradient(#E57A2E 0.6px, transparent 0.6px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(229,122,46,0.12)_0%,rgba(198,64,28,0.06)_45%,transparent_75%)] z-0" />

      {/* LAYER 2: Marquee Typographique Incliné (Descendu au centre, contraste doux) */}
      <div
        className="absolute top-[48%] sm:top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vw] sm:w-[150vw] z-[2] pointer-events-none opacity-14 sm:opacity-18"
        style={{ transform: 'translate(-50%, -50%) rotate(-5deg)' }}
      >
        <div className="flex flex-col gap-2 sm:gap-3 py-2">
          {/* Track 1: Soft solid ember */}
          <div className="marquee__track to-right flex items-center gap-8 sm:gap-12 whitespace-nowrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black uppercase tracking-wider text-[#E57A2E]"
              >
                {t.marquee1}
              </span>
            ))}
          </div>

          {/* Track 2: Subtle text stroke */}
          <div className="marquee__track to-left flex items-center gap-8 sm:gap-12 whitespace-nowrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black uppercase tracking-wider marquee__text is-text-stroke text-[#F3EDE2]"
              >
                {t.marquee2}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Visual Container */}
      <div
        ref={heroContentRef}
        className="relative z-10 w-full h-full flex flex-col justify-between pt-[calc(var(--size--nav-height-mobile)+0.75rem)] sm:pt-[var(--size--nav-height-desktop)] pb-4 sm:pb-6 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto"
      >
        {/* Central Composition Stage (Halo + Massive Text + Burger in front) */}
        <div className="relative flex-1 w-full mx-auto flex items-center justify-center my-auto min-h-0">
          
          {/* LAYER 3: Halo Circulaire Orange derrière le produit */}
          <div
            ref={haloRef}
            className="absolute w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] lg:w-[580px] lg:h-[580px] rounded-full bg-gradient-to-tr from-[#C6401C]/55 via-[#E57A2E]/35 to-[#F2A34A]/20 blur-2xl sm:blur-3xl pointer-events-none z-[3] will-change-transform"
          />

          {/* LAYER 4: Titre Principal Massif (AU-DESSOUS du burger) */}
          <div
            ref={titleRef}
            className="relative z-10 w-full flex flex-col items-center justify-center text-center select-none pointer-events-none px-2 will-change-transform"
          >
            {headlineLines.map((line, idx) => (
              <h1
                key={idx}
                className="font-display font-black uppercase text-[clamp(1.75rem,8vw,2.75rem)] xs:text-[clamp(2.1rem,8.2vw,3.2rem)] sm:text-6xl md:text-7xl lg:text-[7.2rem] xl:text-[8.5rem] leading-[0.88] tracking-tight text-[#F3EDE2] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
              >
                {line}
              </h1>
            ))}
          </div>

          {/* LAYER 5: Burger Détouré AU-DESSUS du titre (masquant partiellement le texte) */}
          <div
            ref={burgerRef}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none will-change-transform"
          >
            <img
              src={ASSET_MAP.HERO_BURGER}
              alt="Le Wagyu Noire Signature à la braise"
              className="w-[78%] xs:w-[74%] max-w-[270px] xs:max-w-[310px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] max-h-[36vh] sm:max-h-[44vh] md:max-h-[48vh] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_0_35px_rgba(229,122,46,0.3)] transition-transform duration-300"
              loading="eager"
            />
          </div>
        </div>

        {/* LAYER 6: Actions et Indicateur de Scroll */}
        <div
          ref={bottomBarRef}
          className="relative z-30 w-full max-w-md sm:max-w-xl lg:max-w-3xl mx-auto flex flex-col items-center gap-3 sm:gap-4 pt-1 sm:pt-2 will-change-transform"
        >
          {/* Bottom CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full px-2 sm:px-0">
            <button
              onClick={onNavigateToMenu}
              className="btn-primary w-full sm:w-auto py-3.5 px-6 sm:px-8 text-sm sm:text-base tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(229,122,46,0.4)]"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>{t.cta_primary}</span>
            </button>

            <button
              onClick={onNavigateToLocations}
              className="btn-secondary w-full sm:w-auto py-3.5 px-6 sm:px-7 text-sm sm:text-base tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:border-[#E57A2E]"
            >
              <MapPin className="w-4 h-4 text-[#E57A2E]" />
              <span>{t.cta_secondary}</span>
            </button>
          </div>

          {/* Scroll Down Prompt (Hidden on very short landscape phones) */}
          <div className="hidden xs:flex items-center gap-1.5 text-[#A39D93] text-[10px] sm:text-[11px] font-mono-pp uppercase tracking-widest pt-0.5 sm:pt-1 pointer-events-none">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#E57A2E]" />
            <span>SCROLL DOWN</span>
          </div>
        </div>
      </div>
    </section>
  );
};
