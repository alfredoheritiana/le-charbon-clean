import React, { useState, useEffect } from 'react';
import { Locale, UI_STRINGS } from '../data/content';
import { Cookie } from 'lucide-react';

interface CookieBannerProps {
  locale: Locale;
  onNavigateToPolicy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ locale, onNavigateToPolicy }) => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const isConsent = localStorage.getItem('lecharbon_cookie_consent');
    if (!isConsent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lecharbon_cookie_consent', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  const t = UI_STRINGS[locale].cookiesBanner;

  return (
    <div className="fixed bottom-4 left-4 z-[990] max-w-sm sm:max-w-md w-[calc(100%-2rem)] bg-[#161616] border border-[#2A2A2A] rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col gap-3 text-[#F3EDE2]">
      <div className="flex items-start gap-3">
        <Cookie className="w-5 h-5 text-[#E57A2E] shrink-0 mt-0.5" />
        <div>
          <h3 className="font-display font-bold text-sm sm:text-base uppercase tracking-wide text-[#F3EDE2]">
            {t.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#A39D93] mt-1 leading-snug">
            {t.text}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleAccept}
          className="btn-primary text-xs py-2 px-4 flex-1 cursor-pointer"
        >
          {t.accept}
        </button>
        <button
          onClick={onNavigateToPolicy}
          className="btn-secondary text-xs py-2 px-4 cursor-pointer"
        >
          {t.learnMore}
        </button>
      </div>
    </div>
  );
};
