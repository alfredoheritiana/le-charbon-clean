import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Locale } from '../data/content';
import { ASSET_MAP } from '../data/mediaManifest';
import { Flame, Sparkles } from 'lucide-react';
import { CharcoalFireBadge } from './CharcoalGraphics';

gsap.registerPlugin(ScrollTrigger);

interface CharcoalRevealTransitionProps {
  locale: Locale;
}

export const CharcoalRevealTransition: React.FC<CharcoalRevealTransitionProps> = ({ locale }) => {
  const containerRef = useRef<HTMLElement>(null);
  const emberPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const isFr = locale === 'fr';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const mm = gsap.matchMedia();

    // DESKTOP PINNED CINEMATIC REVEAL (>= 992px & >= 600px height)
    mm.add('(min-width: 992px) and (min-height: 600px)', () => {
      if (!containerRef.current || !emberPanelRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // 1. Ember panel unfolds/expands upward from the bottom
      tl.fromTo(
        emberPanelRef.current,
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          opacity: 0.6,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          ease: 'power2.inOut',
        },
        0
      );

      // 2. Heat glow intensifies
      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          { scale: 0.7, opacity: 0.2 },
          { scale: 1.35, opacity: 0.85, ease: 'power2.out' },
          0.1
        );
      }

      // 3. Central visual lifts forward
      if (visualRef.current) {
        tl.fromTo(
          visualRef.current,
          { y: 80, scale: 0.9, opacity: 0.3 },
          { y: 0, scale: 1.05, opacity: 1, ease: 'power2.out' },
          0.2
        );
      }

      // 4. Monumental title reveals and tracks
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { y: 50, letterSpacing: '0.08em', opacity: 0 },
          { y: 0, letterSpacing: '0.02em', opacity: 1, ease: 'power2.out' },
          0.25
        );
      }
    });

    // MOBILE / COMPACT SCREENS: Fluid scroll without pinning
    mm.add('(max-width: 991px)', () => {
      if (!emberPanelRef.current) return;

      gsap.fromTo(
        emberPanelRef.current,
        { opacity: 0.4, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => mm.revert();
  }, [locale]);

  return (
    <section
      ref={containerRef}
      id="charcoal-reveal"
      data-background="black"
      className="relative w-full min-h-[92vh] sm:min-h-screen bg-[#070707] text-[#F3EDE2] flex items-center justify-center overflow-hidden border-b border-[#2A2A2A]"
    >
      {/* Texture fragment backdrop */}
      <div className="absolute inset-0 bg-[#0B0B0B] opacity-90">
        <img
          src={ASSET_MAP.CHARCOAL_BG}
          alt=""
          className="w-full h-full object-cover opacity-15 mix-blend-luminosity filter contrast-125"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-radial from-transparent via-[#070707]/70 to-[#070707]" />
      </div>

      {/* ============================================================ */}
      {/* EXPANDING EMBER PANEL (THE CHARCOAL REVEAL)                  */}
      {/* ============================================================ */}
      <div
        ref={emberPanelRef}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform flex items-center justify-center"
      >
        {/* Core fiery radiant gradient */}
        <div
          ref={glowRef}
          className="absolute w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full bg-[radial-gradient(circle,rgba(229,122,46,0.35)_0%,rgba(198,64,28,0.2)_40%,transparent_70%)] blur-2xl"
        />

        {/* Ambient bottom ember heat rise */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#C6401C]/20 via-[#E57A2E]/10 to-transparent" />
      </div>

      {/* ============================================================ */}
      {/* CONTENT: MONUMENTAL TITLE & EDITORIAL GRILL VISUAL           */}
      {/* ============================================================ */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-[1360px] mx-auto px-6 sm:px-10 py-20 flex flex-col items-center text-center"
      >
        {/* Eyebrow kicker */}
        <div className="inline-flex items-center gap-2.5 text-[#F2A34A] text-xs sm:text-sm font-mono-pp uppercase tracking-widest mb-6 px-4 py-1.5 rounded-full border border-[#E57A2E]/30 bg-[#161616]/80 backdrop-blur-md shadow-lg">
          <Flame className="w-4 h-4 fill-current text-[#E57A2E]" />
          <span>{isFr ? 'SIGNATURE GASTRONOMIQUE' : 'CULINARY SIGNATURE'}</span>
        </div>

        {/* Monumental Headline */}
        <h2
          ref={titleRef}
          className="text-[#F3EDE2] font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.95] max-w-5xl drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
        >
          {isFr ? "L'ART DE LA BRAISE" : 'THE ART OF FIRE'}
        </h2>

        {/* Dynamic Editorial Visual Presentation */}
        <div
          ref={visualRef}
          className="relative mt-8 sm:mt-12 w-full max-w-[560px] aspect-16/10 flex items-center justify-center"
        >
          {/* Circular ember backing */}
          <div className="absolute w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-gradient-to-tr from-[#C6401C]/60 via-[#E57A2E]/70 to-[#F2A34A]/40 blur-xl opacity-90 animate-pulse duration-3000" />

          {/* Sizzling feature burger */}
          <img
            src={ASSET_MAP.BURGER_BLACK_ANGUS}
            alt={isFr ? 'Black Angus à la braise' : 'Charcoal-grilled Black Angus'}
            className="relative z-10 max-h-[95%] w-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
          />

          {/* Badge accent */}
          <div className="absolute -bottom-4 right-4 sm:-right-4 z-20 drop-shadow-2xl">
            <CharcoalFireBadge size={75} />
          </div>
        </div>

        {/* High-conviction manifesto subtext */}
        <p className="mt-8 sm:mt-10 max-w-2xl text-sm sm:text-base md:text-lg text-[#F3EDE2]/85 font-body leading-relaxed font-normal">
          {isFr
            ? 'Une saisie foudroyante au charbon de bois pur. La croûte caramélise instantanément, emprisonnant chaque goutte de jus et exaltant des arômes fumés d’une rare profondeur.'
            : 'Searing heat over pure hardwood charcoal. The crust caramelizes in seconds, locking in rich juices while unlocking exceptional smoky depth.'}
        </p>

        {/* Pillar tags */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono-pp tracking-wider text-[#A39D93]">
          <span className="text-[#F2A34A] font-semibold">
            {isFr ? 'CHARBON NATUREL' : 'NATURAL CHARCOAL'}
          </span>
          <span className="text-[#E57A2E]" aria-hidden="true">·</span>
          <span>{isFr ? 'SAISIE À 350°C' : '350°C SEAR'}</span>
          <span className="text-[#E57A2E]" aria-hidden="true">·</span>
          <span>{isFr ? 'GOÛT FUMÉ INCOMPARABLE' : 'UNRIVALED SMOKY TASTE'}</span>
        </div>
      </div>
    </section>
  );
};
