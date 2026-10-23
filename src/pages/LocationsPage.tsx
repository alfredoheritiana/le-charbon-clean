import React from 'react';
import { Locale, UI_STRINGS } from '../data/content';
import { RESTAURANT_LOCATIONS, RestaurantLocation } from '../data/locations';
import { MapPin, Clock, ExternalLink, Flame } from 'lucide-react';
import { CharcoalFireBadge } from '../components/CharcoalGraphics';

interface LocationsPageProps {
  locale: Locale;
  onOpenDeliveryModal: () => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({ locale, onOpenDeliveryModal }) => {
  const t = UI_STRINGS[locale].locationsPage;
  const sectionT = UI_STRINGS[locale].locationsSection;

  return (
    <main className="w-full bg-[#0B0B0B] text-[#F3EDE2] pt-[calc(var(--size--nav-height-desktop)+2rem)] pb-28 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col gap-12">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-[#2A2A2A] text-[#E57A2E] text-xs font-mono-pp uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>LOCALISATION OFFICIELLE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tight text-[#F3EDE2] mb-4">
            {t.title}
          </h1>
          <p className="font-mono-pp text-xs sm:text-sm text-[#A39D93] tracking-wider uppercase">
            {t.subtitle}
          </p>
        </div>

        {/* Confirmed Mauritius Location Card */}
        <div className="w-full max-w-3xl mx-auto">
          {RESTAURANT_LOCATIONS.map((loc: RestaurantLocation) => (
            <div
              key={loc.id}
              className="bg-[#161616] border border-[#2A2A2A] rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col gap-8"
            >
              {/* Photo Banner with texture */}
              <div className="relative w-full h-[280px] sm:h-[360px] rounded-2xl bg-[#050505] overflow-hidden border border-[#2A2A2A]">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                  alt={loc.address}
                  className="w-full h-full object-cover opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
                <div className="absolute top-4 right-4 drop-shadow-xl pointer-events-none">
                  <CharcoalFireBadge size={65} />
                </div>
              </div>

              {/* Information */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-4">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-wide text-[#F3EDE2]">
                      {loc.name}
                    </h2>
                    <span className="text-xs font-mono-pp text-[#F2A34A] uppercase tracking-wider">
                      {loc.region}
                    </span>
                  </div>
                  <CharcoalFireBadge size={60} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#A39D93]">
                  {/* Address */}
                  <div className="flex items-start gap-3 bg-[#0B0B0B] border border-[#2A2A2A] rounded-2xl p-5">
                    <MapPin className="w-5 h-5 text-[#E57A2E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-xs uppercase text-[#F3EDE2] font-mono-pp tracking-wider mb-1">
                        {sectionT.addressLabel}
                      </strong>
                      <span className="text-sm text-[#F3EDE2] font-medium">
                        {loc.address}
                      </span>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3 bg-[#0B0B0B] border border-[#2A2A2A] rounded-2xl p-5">
                    <Clock className="w-5 h-5 text-[#F2A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-xs uppercase text-[#F3EDE2] font-mono-pp tracking-wider mb-1">
                        {sectionT.hoursLabel}
                      </strong>
                      <div className="text-xs font-mono-pp text-[#A39D93] space-y-1">
                        {loc.hours[locale].map((h, i) => (
                          <p key={i}>{h}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#2A2A2A]">
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full sm:w-auto text-xs sm:text-sm py-3 px-6 flex items-center justify-center gap-2"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={onOpenDeliveryModal}
                    className="btn-primary w-full sm:w-auto text-xs sm:text-sm py-3 px-6 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Flame className="w-4 h-4 fill-current" />
                    <span>{sectionT.takeaway}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
