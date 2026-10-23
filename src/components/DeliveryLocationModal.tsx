import React, { useEffect } from 'react';
import { Locale, UI_STRINGS } from '../data/content';
import { RESTAURANT_LOCATIONS } from '../data/locations';
import { ASSET_MAP } from '../data/mediaManifest';
import { X, MessageCircle, MapPin, Clock, Flame } from 'lucide-react';
import { CharcoalFireBadge } from './CharcoalGraphics';

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export const DeliveryLocationModal: React.FC<DeliveryModalProps> = ({ isOpen, onClose, locale }) => {
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

  const t = UI_STRINGS[locale].deliveryModal;
  const whatsappUrl = 'https://wa.me/?text=Bonjour%20Le%20Charbon%2C%20je%20souhaite%20passer%20une%20commande%20!';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delivery-modal-title"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0B0B]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl bg-[#161616] border border-[#2A2A2A] p-5 sm:p-8 rounded-3xl shadow-2xl flex flex-col text-[#F3EDE2] max-h-[92dvh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 sm:pb-6 border-b border-[#2A2A2A]">
          <img src={ASSET_MAP.LOGO} alt="Le Charbon" className="h-7 sm:h-8 w-auto object-contain" />
          <button
            onClick={onClose}
            aria-label="Fermer la boîte de dialogue"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#A39D93] hover:text-[#E57A2E] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-6 flex flex-col items-center text-center">
          <div className="mb-4">
            <CharcoalFireBadge size={75} />
          </div>

          <h2
            id="delivery-modal-title"
            className="text-2xl sm:text-4xl font-display font-bold uppercase tracking-tight text-[#F3EDE2] mb-3"
          >
            {t.title}
          </h2>

          <p className="text-sm text-[#A39D93] max-w-md leading-relaxed mb-8">
            {t.subtitle}
          </p>

          {/* Location Details Card */}
          <div className="w-full bg-[#0B0B0B] border border-[#2A2A2A] rounded-2xl p-6 text-left flex flex-col gap-4 mb-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl uppercase text-[#F3EDE2]">
                Le Charbon — Phoenix
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-pp font-bold uppercase tracking-wider bg-[#161616] text-[#F2A34A] border border-[#2A2A2A]">
                Ouvert
              </span>
            </div>

            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A39D93]">
              <MapPin className="w-4 h-4 text-[#E57A2E] shrink-0 mt-0.5" />
              <span>Phoenix, Mauritius</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A39D93]">
              <Clock className="w-4 h-4 text-[#F2A34A] shrink-0 mt-0.5" />
              <div className="font-mono-pp text-xs space-y-0.5">
                {RESTAURANT_LOCATIONS[0].hours[locale].map((h, i) => (
                  <p key={i}>{h}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full py-4 text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>{t.action}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
