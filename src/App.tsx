import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Locale, PageName } from './data/content';
import { resolveRoute, getLocalizedPath } from './utils/router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DeliveryLocationModal } from './components/DeliveryLocationModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { CookieBanner } from './components/CookieBanner';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { LocationsPage } from './pages/LocationsPage';
import { LegalPage } from './pages/LegalPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Routing state — defaults to French
  const [currentRoute, setCurrentRoute] = useState(() =>
    resolveRoute(window.location.pathname)
  );

  // Modals state
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Listen to browser popstate (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const resolved = resolveRoute(window.location.pathname);
      setCurrentRoute(resolved);
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    };

    let resizeTimer: number;
    const handleResizeOrRotate = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('resize', handleResizeOrRotate, { passive: true });
    window.addEventListener('orientationchange', handleResizeOrRotate, { passive: true });

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('resize', handleResizeOrRotate);
      window.removeEventListener('orientationchange', handleResizeOrRotate);
    };
  }, []);

  // WhatsApp popup timer: 2000ms after load if not in sessionStorage
  useEffect(() => {
    const sessionKey = 'lecharbon_whatsapp_modal_shown';
    const wasShown = sessionStorage.getItem(sessionKey);

    if (!wasShown) {
      const timer = setTimeout(() => {
        setWhatsappModalOpen(true);
        sessionStorage.setItem(sessionKey, 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Internal navigation handler
  const handleNavigate = (targetPage: PageName, targetLocale?: Locale) => {
    const loc = targetLocale || currentRoute.locale;
    const targetPath = getLocalizedPath(targetPage, loc);

    window.history.pushState({}, '', targetPath);
    setCurrentRoute({
      locale: loc,
      page: targetPage,
      path: targetPath,
    });

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  const { locale, page } = currentRoute;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-[#F3EDE2] antialiased selection:bg-[#E57A2E] selection:text-[#0B0B0B]">
      {/* Persistent Navigation */}
      <Navbar
        locale={locale}
        currentPage={page}
        onNavigate={handleNavigate}
        onOpenDeliveryModal={() => setDeliveryModalOpen(true)}
      />

      {/* Main View Router */}
      <div className="flex-1 w-full">
        {page === 'home' && (
          <HomePage
            locale={locale}
            onNavigateToAbout={() => handleNavigate('about')}
            onNavigateToMenu={() => handleNavigate('menu')}
            onNavigateToLocations={() => handleNavigate('locations')}
            onOpenDeliveryModal={() => setDeliveryModalOpen(true)}
          />
        )}

        {page === 'menu' && (
          <MenuPage
            locale={locale}
            onOpenDeliveryModal={() => setDeliveryModalOpen(true)}
          />
        )}

        {page === 'about' && (
          <AboutPage
            locale={locale}
            onNavigateToMenu={() => handleNavigate('menu')}
          />
        )}

        {page === 'locations' && (
          <LocationsPage
            locale={locale}
            onOpenDeliveryModal={() => setDeliveryModalOpen(true)}
          />
        )}

        {(page === 'terms' || page === 'privacy' || page === 'cookies') && (
          <LegalPage
            page={page}
            locale={locale}
            onNavigate={handleNavigate}
          />
        )}
      </div>

      {/* Persistent Footer */}
      <Footer
        locale={locale}
        currentPage={page}
        onNavigate={handleNavigate}
        onOpenDeliveryModal={() => setDeliveryModalOpen(true)}
      />

      {/* Floating Action Button */}
      <FloatingWhatsAppButton onClick={() => setWhatsappModalOpen(true)} />

      {/* Modals & Popups */}
      <DeliveryLocationModal
        isOpen={deliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
        locale={locale}
      />

      <WhatsAppModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        locale={locale}
      />

      <CookieBanner
        locale={locale}
        onNavigateToPolicy={() => handleNavigate('cookies')}
      />
    </div>
  );
}
