import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Locale, UI_STRINGS } from '../data/content';
import { validateReviewForm, ReviewFormData } from '../utils/validation';
import { Star, ArrowRight, CheckCircle2, Flame, MessageSquareHeart } from 'lucide-react';
import { CharcoalFireBadge } from './CharcoalGraphics';

gsap.registerPlugin(ScrollTrigger);

interface ReviewFormProps {
  locale: Locale;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ locale }) => {
  const t = UI_STRINGS[locale].contact;

  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const track3Ref = useRef<HTMLDivElement>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReviewFormData>({
    date: todayStr,
    rating: 5,
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Marquee texts in FR and EN
  const ribbon1 = locale === 'fr' ? 'VOTRE AVIS COMPTE' : 'YOUR VOICE COUNTS';
  const ribbon2 = locale === 'fr' ? 'LA BRAISE SE PARTAGE' : 'SHARE THE FIRE';
  const ribbon3 = locale === 'fr' ? 'DU FEU. DU CARACTÈRE.' : 'BURGERS. FIRE. CHARACTER.';

  // Parallax scrub animation for diagonal ribbons
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      if (track1Ref.current) {
        tl.to(track1Ref.current, { xPercent: -15, ease: 'none' }, 0);
      }
      if (track2Ref.current) {
        tl.to(track2Ref.current, { xPercent: 15, ease: 'none' }, 0);
      }
      if (track3Ref.current) {
        tl.to(track3Ref.current, { xPercent: -18, ease: 'none' }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [locale]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateReviewForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact-us"
      data-background="black"
      className="relative w-full bg-[#0B0B0B] py-24 sm:py-32 border-b border-[#2A2A2A] overflow-hidden"
    >
      {/* ============================================================ */}
      {/* GIANT SLANTED TYPOGRAPHY MARQUEE (BACKGROUND LAYER)          */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden flex flex-col justify-center items-center opacity-45 sm:opacity-55"
      >
        <div className="w-[200vw] -rotate-6 flex flex-col gap-6 sm:gap-10 -my-24">
          {/* Ribbon 1: Solid Fire Orange / Amber */}
          <div
            ref={track1Ref}
            className="flex items-center gap-8 whitespace-nowrap will-change-transform -translate-x-12"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase text-[#E57A2E]/25 transition-colors"
              >
                {ribbon1} <span className="text-[#C6401C]/40 mx-4">✦</span>
              </span>
            ))}
          </div>

          {/* Ribbon 2: Stroked Transparent Outline */}
          <div
            ref={track2Ref}
            className="flex items-center gap-8 whitespace-nowrap will-change-transform -translate-x-64"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase marquee__text is-text-stroke opacity-30"
              >
                {ribbon2} <span className="text-[#F2A34A]/30 mx-4">✦</span>
              </span>
            ))}
          </div>

          {/* Ribbon 3: Warm Amber / Ember Red */}
          <div
            ref={track3Ref}
            className="flex items-center gap-8 whitespace-nowrap will-change-transform -translate-x-20"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase text-[#F2A34A]/20"
              >
                {ribbon3} <span className="text-[#E57A2E]/30 mx-4">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Radial warmth glow focused behind the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(229,122,46,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* ============================================================ */}
      {/* FOREGROUND FORM CARD (STABLE OPAQUE #161616 - NO PARALLAX)   */}
      {/* ============================================================ */}
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="relative border border-[#2A2A2A] bg-[#161616] p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-sm">
          {/* Decorative Fire Badge */}
          <div className="absolute -top-10 -right-4 pointer-events-none drop-shadow-2xl hidden sm:block">
            <CharcoalFireBadge size={75} />
          </div>

          {submitted ? (
            /* Success Feedback Box */
            <div className="border border-[#2A2A2A] bg-[#0B0B0B] text-[#F3EDE2] p-8 sm:p-12 text-center flex flex-col items-center rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-[#161616] border border-[#E57A2E]/50 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#E57A2E]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-wide mb-3 text-[#F3EDE2]">
                {t.successTitle}
              </h3>
              <p className="text-sm sm:text-base text-[#A39D93] max-w-md leading-relaxed mb-6">
                {t.successText}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    date: todayStr,
                    rating: 5,
                    name: '',
                    email: '',
                    message: '',
                  });
                }}
                className="btn-secondary py-2.5 px-6 text-sm cursor-pointer"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            /* Form Box */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 text-[#E57A2E] text-xs font-mono-pp uppercase tracking-widest mb-2">
                  <Flame className="w-4 h-4 fill-current" />
                  <span>AVIS & SUGGESTIONS</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-display font-bold uppercase tracking-tight text-[#F3EDE2]">
                  {t.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A39D93] mt-1">
                  {t.subtitle}
                </p>
              </div>

              {/* Visit Date & Rating Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Date Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="visit-date" className="text-xs uppercase font-mono-pp tracking-wider text-[#A39D93]">
                    {t.dateLabel}
                  </label>
                  <input
                    type="date"
                    id="visit-date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full h-11 px-4 bg-[#0B0B0B] text-[#F3EDE2] border border-[#2A2A2A] rounded-xl font-mono-pp text-base sm:text-sm focus:outline-none focus:border-[#E57A2E] transition-colors"
                    required
                  />
                  {errors.date && <p className="text-xs text-[#E57A2E]">{errors.date}</p>}
                </div>

                {/* Rating Input with 44px touch targets */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase font-mono-pp tracking-wider text-[#A39D93]">
                    {t.ratingLabel}
                  </span>
                  <div
                    role="radiogroup"
                    aria-label="Appréciation par étoiles"
                    className="flex items-center gap-1 h-11"
                  >
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = (hoverRating ?? formData.rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          role="radio"
                          aria-checked={formData.rating === star}
                          aria-label={`${star} étoile`}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center cursor-pointer transition-transform hover:scale-115 active:scale-95 focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              active
                                ? 'text-[#F2A34A] fill-[#F2A34A]'
                                : 'text-[#2A2A2A]'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  {errors.rating && <p className="text-xs text-[#E57A2E]">{errors.rating}</p>}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="user-name" className="text-xs uppercase font-mono-pp tracking-wider text-[#A39D93]">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="user-name"
                    placeholder={t.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 px-4 bg-[#0B0B0B] text-[#F3EDE2] placeholder-[#5A554E] border border-[#2A2A2A] rounded-xl font-body text-base sm:text-sm focus:outline-none focus:border-[#E57A2E] transition-colors"
                    required
                  />
                  {errors.name && <p className="text-xs text-[#E57A2E]">{errors.name}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="user-email" className="text-xs uppercase font-mono-pp tracking-wider text-[#A39D93]">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="user-email"
                    placeholder={t.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-4 bg-[#0B0B0B] text-[#F3EDE2] placeholder-[#5A554E] border border-[#2A2A2A] rounded-xl font-body text-base sm:text-sm focus:outline-none focus:border-[#E57A2E] transition-colors"
                    required
                  />
                  {errors.email && <p className="text-xs text-[#E57A2E]">{errors.email}</p>}
                </div>
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="user-message" className="text-xs uppercase font-mono-pp tracking-wider text-[#A39D93]">
                  {t.messageLabel}
                </label>
                <textarea
                  id="user-message"
                  placeholder={t.messagePlaceholder}
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-[#0B0B0B] text-[#F3EDE2] placeholder-[#5A554E] border border-[#2A2A2A] rounded-2xl font-body text-base sm:text-sm focus:outline-none focus:border-[#E57A2E] transition-colors resize-none"
                  required
                />
                {errors.message && <p className="text-xs text-[#E57A2E]">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto py-3.5 px-8 text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>{t.submit}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
