import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  onClick: () => void;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({ onClick }) => {
  return (
    <button
      id="floating-whatsapp-btn"
      onClick={onClick}
      aria-label="Commander sur WhatsApp"
      className="fixed z-[980] w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer text-[#F3EDE2]"
      style={{
        bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1rem + env(safe-area-inset-right, 0px))',
      }}
    >
      {/* Rotating SVG circular text around badge */}
      <svg
        className="w-full h-full contact-us-text-rotating fill-current text-[#F2A34A] pointer-events-none"
        viewBox="0 0 100 100"
      >
        <path
          id="textPath-circle"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text className="text-[8.5px] uppercase font-bold tracking-[2.6px]">
          <textPath href="#textPath-circle" startOffset="0%">
            • LE CHARBON • BURGERS À LA BRAISE
          </textPath>
        </text>
      </svg>

      {/* Center green button with WhatsApp icon (min 44x44px touch target) */}
      <div className="absolute min-w-[44px] min-h-[44px] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white border-2 border-[#0B0B0B] flex items-center justify-center shadow-2xl">
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
      </div>
    </button>
  );
};
