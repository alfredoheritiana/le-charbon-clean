import React from 'react';
import { Locale, PageName, UI_STRINGS } from '../data/content';
import { ASSET_MAP } from '../data/mediaManifest';
import { Instagram, MessageCircle, MapPin } from 'lucide-react';

interface FooterProps {
  locale: Locale;
  currentPage: PageName;
  onNavigate: (page: PageName, loc?: Locale) => void;
  onOpenDeliveryModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  locale,
  currentPage,
  onNavigate,
  onOpenDeliveryModal,
}) => {
  const t = UI_STRINGS[locale].footer;
  const navT = UI_STRINGS[locale].nav;

  const currentYear = new Date().getFullYear();

  const handleLinkClick = (page: PageName) => {
    onNavigate(page, locale);
  };

  const handleLangChange = (loc: Locale) => {
    onNavigate(currentPage, loc);
  };

  return (
    <footer
      data-background="black"
      className="w-full bg-[#0B0B0B] text-[#F3EDE2] pt-16 pb-10 overflow-hidden relative border-t border-[#2A2A2A]"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start pb-12">
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col items-start gap-4">
            <button
              onClick={() => handleLinkClick('home')}
              aria-label="Le Charbon Accueil"
              className="p-0 cursor-pointer"
            >
              <img
                src={ASSET_MAP.LOGO}
                alt="Le Charbon Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </button>
            <p className="text-xs sm:text-sm text-[#A39D93] leading-relaxed max-w-xs">
              {t.tagline}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#F2A34A] font-mono-pp">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.locationLabel}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <nav className="flex flex-col gap-3" aria-label="Footer Navigation">
            <span className="text-xs font-mono-pp uppercase tracking-widest text-[#A39D93] mb-1">
              Navigation
            </span>
            <button
              onClick={() => handleLinkClick('about')}
              className="text-left font-display font-bold uppercase tracking-wider text-[#F3EDE2] hover:text-[#E57A2E] transition-colors cursor-pointer text-base"
            >
              {navT.about}
            </button>
            <button
              onClick={() => handleLinkClick('menu')}
              className="text-left font-display font-bold uppercase tracking-wider text-[#F3EDE2] hover:text-[#E57A2E] transition-colors cursor-pointer text-base"
            >
              {navT.menu}
            </button>
            <button
              onClick={() => handleLinkClick('locations')}
              className="text-left font-display font-bold uppercase tracking-wider text-[#F3EDE2] hover:text-[#E57A2E] transition-colors cursor-pointer text-base"
            >
              {navT.locations}
            </button>
            <button
              onClick={onOpenDeliveryModal}
              className="text-left font-display font-bold uppercase tracking-wider text-[#E57A2E] hover:text-[#F2A34A] transition-colors cursor-pointer text-base"
            >
              {navT.delivery}
            </button>
          </nav>

          {/* Column 3: Hours & Service */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono-pp uppercase tracking-widest text-[#A39D93] mb-1">
              Service
            </span>
            <p className="text-sm font-display font-bold text-[#F3EDE2] uppercase tracking-wide">
              {locale === 'fr' ? 'Tous les jours' : 'Every day'}
            </p>
            <p className="text-xs font-mono-pp text-[#A39D93]">
              11:30 — 22:00
            </p>
            <p className="text-xs text-[#A39D93] mt-2">
              {locale === 'fr' ? 'À emporter & dégustation sur place à Phoenix.' : 'Takeaway & dine-in in Phoenix.'}
            </p>
          </div>

          {/* Column 4: WhatsApp, Languages & Mascot */}
          <div className="flex flex-col gap-4 items-start lg:items-end">
            <span className="text-xs font-mono-pp uppercase tracking-widest text-[#A39D93]">
              Contact & Réseaux
            </span>

            {/* Social & WhatsApp Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Le Charbon sur Instagram"
                className="w-10 h-10 rounded-full border border-[#2A2A2A] bg-[#161616] text-[#F3EDE2] flex items-center justify-center hover:border-[#E57A2E] hover:text-[#E57A2E] transition-colors shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenDeliveryModal}
                className="btn-whatsapp text-xs py-2 px-4 flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Language Switcher Pill (FR / EN only) */}
            <div className="flex items-center bg-[#161616] border border-[#2A2A2A] rounded-full p-1 gap-1">
              {(['fr', 'en'] as Locale[]).map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLangChange(loc)}
                  className={`px-3 py-1 rounded-full text-xs font-mono-pp font-bold uppercase transition-colors cursor-pointer ${
                    locale === loc
                      ? 'bg-[#E57A2E] text-white'
                      : 'text-[#A39D93] hover:text-[#F3EDE2]'
                  }`}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Clean branding mark */}
            <div className="text-[10px] font-mono-pp text-[#A39D93] uppercase tracking-widest pt-1">
              Le Charbon · Maurice
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-[#2A2A2A] my-6" />

        {/* Bottom Legal Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-pp text-xs text-[#A39D93]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => handleLinkClick('terms')}
              className="hover:text-[#F3EDE2] hover:underline cursor-pointer"
            >
              {t.terms}
            </button>
            <button
              onClick={() => handleLinkClick('privacy')}
              className="hover:text-[#F3EDE2] hover:underline cursor-pointer"
            >
              {t.privacy}
            </button>
            <button
              onClick={() => handleLinkClick('cookies')}
              className="hover:text-[#F3EDE2] hover:underline cursor-pointer"
            >
              {t.cookies}
            </button>
          </div>

          <p className="text-center sm:text-right">
            {t.rights.replace('{year}', currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};
