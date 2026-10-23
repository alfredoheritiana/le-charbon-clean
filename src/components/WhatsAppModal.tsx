import React, { useEffect } from 'react';
import { Locale, UI_STRINGS } from '../data/content';
import { ASSET_MAP } from '../data/mediaManifest';
import { X, MessageCircle } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose, locale }) => {
  const t = UI_STRINGS[locale].whatsappModal;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const whatsappHref = 'https://wa.me/?text=Bonjour%20Le%20Charbon%2C%20je%20souhaite%20commander%20!';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
      className="fixed inset-0 z-[1010] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0B0B]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-lg max-h-[92dvh] overflow-y-auto bg-[#161616] border border-[#2A2A2A] rounded-3xl shadow-2xl flex flex-col text-[#F3EDE2]">
        {/* Header with Logo and Close */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-5 border-b border-[#2A2A2A] bg-[#0B0B0B]/95 backdrop-blur-md">
          <img src={ASSET_MAP.LOGO} alt="Le Charbon" className="h-6 sm:h-7 w-auto object-contain" />
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#A39D93] hover:text-[#E57A2E] transition-colors cursor-pointer rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Image */}
        <div className="w-full h-48 sm:h-56 bg-[#0B0B0B] overflow-hidden relative flex items-center justify-center p-4">
          <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-[#C6401C]/25 to-[#E57A2E]/15 blur-xl pointer-events-none" />
          <img
            src={ASSET_MAP.BURGER_BLACK_ANGUS}
            alt="Burger à la braise"
            className="max-h-full w-auto object-contain drop-shadow-xl"
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 text-center flex flex-col items-center">
          <h2
            id="whatsapp-modal-title"
            className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-[#F3EDE2] leading-tight mb-3 whitespace-pre-line"
          >
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#A39D93] leading-relaxed mb-6 max-w-md">
            {t.body}
          </p>

          <div className="flex flex-col gap-3 w-full sm:w-auto min-w-[240px]">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{t.cta}</span>
            </a>

            <button
              onClick={onClose}
              type="button"
              className="text-xs uppercase font-mono-pp tracking-wider text-[#A39D93] hover:text-[#F3EDE2] transition-colors py-2 cursor-pointer"
            >
              {t.dismiss}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
