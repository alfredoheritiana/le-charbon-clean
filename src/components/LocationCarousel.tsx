import React from 'react';
import { Locale, UI_STRINGS } from '../data/content';
import { RESTAURANT_LOCATIONS, RestaurantLocation } from '../data/locations';
import { MapPin, Clock, ExternalLink, Flame } from 'lucide-react';
import { CharcoalFireBadge } from './CharcoalGraphics';

interface LocationCarouselProps {
  locale: Locale;
  onOpenDeliveryModal: () => void;
}

export const LocationCarousel: React.FC<LocationCarouselProps> = ({ locale, onOpenDeliveryModal }) => {
  const t = UI_STRINGS[locale].locationsSection;

  return (
    <section
      id="locations"
      data-background="black"
      className="w-full bg-[#0B0B0B] pt-20 sm:pt-28 pb-0 overflow-hidden border-b border-[#2A2A2A] relative select-none"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[#E57A2E] text-xs font-mono-pp uppercase tracking-widest mb-3">
            <MapPin className="w-4 h-4 text-[#E57A2E]" />
            <span>ÎLE MAURICE</span>
          </div>
          <h2 className="text-[#F3EDE2] font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
            {t.title}
          </h2>
        </div>

        {/* Location Card Showcase */}
        <div className="w-full max-w-3xl mx-auto mb-16">
          {RESTAURANT_LOCATIONS.map((loc: RestaurantLocation) => (
            <div
              key={loc.id}
              className="relative rounded-3xl border border-[#2A2A2A] bg-[#161616] shadow-2xl overflow-hidden group hover:border-[#E57A2E]/50 transition-all duration-300"
            >
              {/* Image banner with dark fire restaurant ambiance & warm vignette */}
              <div className="relative w-full h-[260px] sm:h-[340px] bg-[#050505] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                  alt="Le Charbon Restaurant Phoenix Maurice"
                  className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/30 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(229,122,46,0.2)_0%,transparent_60%)]" />

                {/* Fire emblem badge in corner */}
                <div className="absolute top-4 right-4 pointer-events-none drop-shadow-2xl">
                  <CharcoalFireBadge size={65} />
                </div>
              </div>

              {/* Bottom Info Card */}
              <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1 flex flex-col gap-3.5">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-wide text-[#F3EDE2]">
                      {loc.name}
                    </h3>
                    {/* Non-button geographic badge */}
                    <span className="text-xs font-mono-pp font-semibold uppercase tracking-wider text-[#F2A34A] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#E57A2E]" />
                      Phoenix, Mauritius
                    </span>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2.5 text-sm text-[#A39D93]">
                    <MapPin className="w-4 h-4 text-[#E57A2E] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#F3EDE2] font-medium mr-1.5">{t.addressLabel}</strong>
                      {loc.address}
                    </span>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-2.5 text-sm text-[#A39D93]">
                    <Clock className="w-4 h-4 text-[#F2A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#F3EDE2] font-medium mr-1.5">{t.hoursLabel}</strong>
                      <div className="font-mono-pp text-xs mt-1 space-y-0.5 text-[#F3EDE2]">
                        {loc.hours[locale].map((h, i) => (
                          <p key={i}>{h}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 pt-2 sm:pt-0">
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs sm:text-sm py-3 px-5 flex items-center justify-center gap-2 w-full sm:w-auto hover:border-[#E57A2E]"
                  >
                    <span>{t.viewMap}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={onOpenDeliveryModal}
                    className="btn-primary text-xs sm:text-sm py-3 px-6 flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(229,122,46,0.3)]"
                  >
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>{t.takeaway}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ember Marquee Ribbon */}
      <div className="marquee-wrap in-location w-full bg-[#C6401C] py-5 sm:py-6 overflow-hidden border-t border-[#E57A2E]/40">
        <div className="marquee__track to-right in-location flex items-center gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-wider text-[#F3EDE2] whitespace-nowrap">
                {t.orderNowMarquee}
              </span>
              <button
                onClick={onOpenDeliveryModal}
                className="btn-secondary bg-[#0B0B0B] text-[#F3EDE2] border-[#2A2A2A] hover:border-[#F2A34A] text-xs py-1.5 px-4 whitespace-nowrap cursor-pointer"
              >
                {t.takeaway}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
