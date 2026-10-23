import React from 'react';
import { Locale, UI_STRINGS } from '../data/content';
import { ASSET_MAP } from '../data/mediaManifest';
import { Flame, ArrowRight } from 'lucide-react';
import { WagyuSignatureBadge } from './CharcoalGraphics';

interface TeamSectionProps {
  locale: Locale;
  onNavigateToMenu?: () => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ locale, onNavigateToMenu }) => {
  const t = UI_STRINGS[locale].team;

  return (
    <section
      id="section-team"
      data-background="black"
      className="w-full bg-[#161616] text-[#F3EDE2] py-20 sm:py-28 border-b border-[#2A2A2A] overflow-hidden relative"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Top Header & Copy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[#E57A2E] text-xs font-mono-pp uppercase tracking-widest mb-3">
              <Flame className="w-4 h-4 fill-current" />
              <span>SAVOIR-FAIRE & EXIGENCE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-bold uppercase tracking-tight leading-none text-[#F3EDE2]">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-[#A39D93] max-w-xl mt-4 leading-relaxed">
              {t.body}
            </p>
          </div>

          {onNavigateToMenu && (
            <button
              onClick={onNavigateToMenu}
              className="btn-primary py-3 px-7 text-sm shrink-0 self-start flex items-center gap-2 cursor-pointer"
            >
              <span>{t.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Feature Photography Frame */}
        <div className="relative rounded-3xl border border-[#2A2A2A] bg-[#0B0B0B] p-3 sm:p-5 shadow-2xl overflow-hidden group">
          <div className="relative w-full h-[360px] lg:h-[500px] rounded-2xl overflow-hidden bg-[#050505]">
            <img
              src={ASSET_MAP.CHARCOAL_BG}
              alt="Le Charbon — Texture et braise"
              className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/80 via-transparent to-[#0B0B0B]/80" />

            {/* Overlaid burger & signature badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
              <img
                src={ASSET_MAP.BURGER_BLACK_ANGUS}
                alt="Black Angus à la braise"
                className="max-h-[85%] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="absolute bottom-6 right-6 hidden sm:block pointer-events-none drop-shadow-2xl">
              <WagyuSignatureBadge size={90} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
