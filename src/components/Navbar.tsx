import React, { useState, useEffect, useRef } from 'react';
import { Locale, PageName, UI_STRINGS } from '../data/content';
import { ASSET_MAP } from '../data/mediaManifest';
import { Menu as MenuIcon, X, Flame } from 'lucide-react';

interface NavbarProps {
  locale: Locale;
  currentPage: PageName;
  onNavigate: (page: PageName, loc?: Locale) => void;
  onOpenDeliveryModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  locale,
  currentPage,
  onNavigate,
  onOpenDeliveryModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  const t = UI_STRINGS[locale].nav;

  // Handle mobile menu scroll lock & keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          menuToggleRef.current?.focus();
        }
        if (langDropdownOpen) {
          setLangDropdownOpen(false);
        }
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen, langDropdownOpen]);

  const handleLinkClick = (page: PageName) => {
    onNavigate(page, locale);
    setMobileMenuOpen(false);
    menuToggleRef.current?.focus();
  };

  const handleLangSelect = (targetLoc: Locale) => {
    onNavigate(currentPage, targetLoc);
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[990] bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#2A2A2A] transition-all duration-200 pt-[env(safe-area-inset-top,0px)]">
        <div className="max-w-[1360px] mx-auto h-[var(--size--nav-height-mobile)] md:h-[var(--size--nav-height-desktop)] px-3 sm:px-6 md:px-8 flex items-center justify-between relative">
          
          {/* Desktop Left Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            <button
              onClick={() => handleLinkClick('about')}
              className={`text-sm lg:text-base font-bold font-display uppercase transition-colors tracking-wider cursor-pointer py-2 ${
                currentPage === 'about'
                  ? 'text-[#E57A2E]'
                  : 'text-[#F3EDE2] hover:text-[#F2A34A]'
              }`}
            >
              {t.about}
            </button>
            <button
              onClick={() => handleLinkClick('menu')}
              className={`text-sm lg:text-base font-bold font-display uppercase transition-colors tracking-wider cursor-pointer py-2 ${
                currentPage === 'menu'
                  ? 'text-[#E57A2E]'
                  : 'text-[#F3EDE2] hover:text-[#F2A34A]'
              }`}
            >
              {t.menu}
            </button>
            <button
              onClick={() => handleLinkClick('locations')}
              className={`text-sm lg:text-base font-bold font-display uppercase transition-colors tracking-wider cursor-pointer py-2 ${
                currentPage === 'locations'
                  ? 'text-[#E57A2E]'
                  : 'text-[#F3EDE2] hover:text-[#F2A34A]'
              }`}
            >
              {t.locations}
            </button>
          </nav>

          {/* Centered Wordmark Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            aria-label="Le Charbon Accueil"
            className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center justify-center p-1 cursor-pointer transition-opacity hover:opacity-90 min-h-[44px] min-w-[44px]"
          >
            <img
              src={ASSET_MAP.LOGO}
              alt="Le Charbon"
              className="h-7 sm:h-9 md:h-11 w-auto object-contain"
            />
          </button>

          {/* Desktop Right Controls: Language & Orders */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher (FR / EN only) */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-expanded={langDropdownOpen}
                aria-haspopup="true"
                aria-label={`Choisir la langue (actuelle: ${locale.toUpperCase()})`}
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-[#2A2A2A] flex items-center justify-center font-bold text-xs uppercase bg-[#161616] text-[#F3EDE2] hover:border-[#E57A2E] hover:text-[#E57A2E] transition-all cursor-pointer font-mono-pp"
              >
                {locale.toUpperCase()}
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#161616] border border-[#2A2A2A] rounded-2xl shadow-2xl py-2 flex flex-col gap-1 z-50">
                  <button
                    onClick={() => handleLangSelect('fr')}
                    className={`px-4 py-2.5 text-xs font-bold flex items-center justify-between hover:bg-[#2A2A2A] transition-colors cursor-pointer min-h-[44px] ${
                      locale === 'fr' ? 'text-[#E57A2E]' : 'text-[#F3EDE2]'
                    }`}
                  >
                    <span>Français</span>
                    <span className="font-mono-pp text-[10px] text-[#A39D93]">FR</span>
                  </button>
                  <button
                    onClick={() => handleLangSelect('en')}
                    className={`px-4 py-2.5 text-xs font-bold flex items-center justify-between hover:bg-[#2A2A2A] transition-colors cursor-pointer min-h-[44px] ${
                      locale === 'en' ? 'text-[#E57A2E]' : 'text-[#F3EDE2]'
                    }`}
                  >
                    <span>English</span>
                    <span className="font-mono-pp text-[10px] text-[#A39D93]">EN</span>
                  </button>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onOpenDeliveryModal}
              className="btn-primary text-xs lg:text-sm py-2.5 px-5 flex items-center gap-2 cursor-pointer shadow-md hover:shadow-[0_0_18px_rgba(229,122,46,0.35)]"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>{t.delivery}</span>
            </button>
          </div>

          {/* Mobile Right Controls: 44px Touch-Target Language & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleLangSelect(locale === 'fr' ? 'en' : 'fr')}
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-[#2A2A2A] flex items-center justify-center font-bold text-xs uppercase bg-[#161616] text-[#F3EDE2] cursor-pointer font-mono-pp active:scale-95 transition-transform"
              aria-label={`Passer à l'${locale === 'fr' ? 'anglais' : 'français'}`}
            >
              {locale.toUpperCase()}
            </button>

            <button
              ref={menuToggleRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-[#2A2A2A] bg-[#161616] flex items-center justify-center text-[#F3EDE2] hover:text-[#E57A2E] hover:border-[#E57A2E] transition-colors cursor-pointer active:scale-95"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Accessible, Safe Area compliant) */}
      {mobileMenuOpen && (
        <div
          ref={mobileDrawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="fixed inset-0 top-[var(--size--nav-height-mobile)] z-[985] bg-[#0B0B0B] md:hidden flex flex-col justify-between p-6 overflow-y-auto border-t border-[#2A2A2A]"
          style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <nav className="flex flex-col gap-5 pt-4" aria-label="Mobile Navigation Links">
            <button
              onClick={() => handleLinkClick('home')}
              className={`text-2xl font-bold font-display uppercase tracking-wide text-left cursor-pointer min-h-[44px] flex items-center ${
                currentPage === 'home' ? 'text-[#E57A2E]' : 'text-[#F3EDE2]'
              }`}
            >
              {locale === 'fr' ? 'Accueil' : 'Home'}
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className={`text-2xl font-bold font-display uppercase tracking-wide text-left cursor-pointer min-h-[44px] flex items-center ${
                currentPage === 'about' ? 'text-[#E57A2E]' : 'text-[#F3EDE2]'
              }`}
            >
              {t.about}
            </button>
            <button
              onClick={() => handleLinkClick('menu')}
              className={`text-2xl font-bold font-display uppercase tracking-wide text-left cursor-pointer min-h-[44px] flex items-center ${
                currentPage === 'menu' ? 'text-[#E57A2E]' : 'text-[#F3EDE2]'
              }`}
            >
              {t.menu}
            </button>
            <button
              onClick={() => handleLinkClick('locations')}
              className={`text-2xl font-bold font-display uppercase tracking-wide text-left cursor-pointer min-h-[44px] flex items-center ${
                currentPage === 'locations' ? 'text-[#E57A2E]' : 'text-[#F3EDE2]'
              }`}
            >
              {t.locations}
            </button>
          </nav>

          <div className="flex flex-col gap-4 pt-6 border-t border-[#2A2A2A] mt-auto">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDeliveryModal();
              }}
              className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>{t.delivery}</span>
            </button>

            {/* Language Selection Row */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                onClick={() => handleLangSelect('fr')}
                className={`flex-1 py-2.5 rounded-full border text-xs font-bold uppercase transition-all font-mono-pp cursor-pointer min-h-[44px] ${
                  locale === 'fr'
                    ? 'bg-[#E57A2E] text-white border-[#E57A2E]'
                    : 'bg-[#161616] text-[#F3EDE2] border-[#2A2A2A]'
                }`}
              >
                Français (FR)
              </button>
              <button
                onClick={() => handleLangSelect('en')}
                className={`flex-1 py-2.5 rounded-full border text-xs font-bold uppercase transition-all font-mono-pp cursor-pointer min-h-[44px] ${
                  locale === 'en'
                    ? 'bg-[#E57A2E] text-white border-[#E57A2E]'
                    : 'bg-[#161616] text-[#F3EDE2] border-[#2A2A2A]'
                }`}
              >
                English (EN)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
