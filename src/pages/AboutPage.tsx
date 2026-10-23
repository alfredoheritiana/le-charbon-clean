import React, { useState, useRef } from 'react';
import { Locale, UI_STRINGS } from '../data/content';
import { ASSET_MAP } from '../data/mediaManifest';
import { Flame, Sparkles, Heart, Move, ArrowRight } from 'lucide-react';
import {
  WagyuSignatureBadge,
  CharcoalFireBadge,
  CrispersBadge,
} from '../components/CharcoalGraphics';

interface AboutPageProps {
  locale: Locale;
  onNavigateToMenu: () => void;
}

interface InteractiveSticker {
  id: string;
  type: 'wagyu' | 'fire' | 'crispers' | 'burger' | 'angus';
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export const AboutPage: React.FC<AboutPageProps> = ({ locale, onNavigateToMenu }) => {
  const t = UI_STRINGS[locale].aboutPage;

  // Interactive Draggable Stickers playground with Le Charbon themed items
  const playgroundRef = useRef<HTMLDivElement>(null);
  const [stickers, setStickers] = useState<InteractiveSticker[]>([
    { id: '1', type: 'angus', x: 20, y: 35, rotation: -6, scale: 1.1 },
    { id: '2', type: 'wagyu', x: 75, y: 25, rotation: 8, scale: 1 },
    { id: '3', type: 'fire', x: 48, y: 45, rotation: 4, scale: 1.05 },
    { id: '4', type: 'crispers', x: 80, y: 70, rotation: -10, scale: 0.95 },
    { id: '5', type: 'burger', x: 22, y: 75, rotation: 12, scale: 1.1 },
  ]);

  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const dragOffsetRef = useRef<{ offsetX: number; offsetY: number }>({ offsetX: 0, offsetY: 0 });

  const handlePointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!playgroundRef.current) return;
    const rect = playgroundRef.current.getBoundingClientRect();
    const sticker = stickers.find((s) => s.id === id);
    if (!sticker) return;

    const currentPxX = (sticker.x / 100) * rect.width;
    const currentPxY = (sticker.y / 100) * rect.height;

    dragOffsetRef.current = {
      offsetX: e.clientX - rect.left - currentPxX,
      offsetY: e.clientY - rect.top - currentPxY,
    };

    setActiveDragId(id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeDragId || !playgroundRef.current) return;
    const rect = playgroundRef.current.getBoundingClientRect();

    const newXpx = e.clientX - rect.left - dragOffsetRef.current.offsetX;
    const newYpx = e.clientY - rect.top - dragOffsetRef.current.offsetY;

    // Convert to percentage and clamp between 10% and 90%
    const clampedX = Math.max(8, Math.min(92, (newXpx / rect.width) * 100));
    const clampedY = Math.max(12, Math.min(88, (newYpx / rect.height) * 100));

    setStickers((prev) =>
      prev.map((s) => (s.id === activeDragId ? { ...s, x: clampedX, y: clampedY } : s))
    );
  };

  const handlePointerUp = () => {
    setActiveDragId(null);
  };

  return (
    <main className="w-full bg-[#0B0B0B] text-[#F3EDE2] pt-[calc(var(--size--nav-height-desktop)+2rem)] pb-28 min-h-screen">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col gap-20">
        
        {/* Section 1: Hero & Story */}
        <section className="text-center max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-[#2A2A2A] text-[#E57A2E] text-xs font-mono-pp uppercase tracking-widest mb-4">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>AUTHENTICITÉ & CARACTÈRE</span>
          </div>

          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tight text-[#F3EDE2] mb-6">
            {t.heroHeading}
          </h1>

          <p className="font-mono-pp text-xs sm:text-base text-[#A39D93] leading-relaxed uppercase tracking-wider mb-10 max-w-2xl">
            {t.heroSub}
          </p>

          <div className="w-full h-80 sm:h-[460px] bg-[#161616] border border-[#2A2A2A] rounded-3xl p-3 shadow-2xl overflow-hidden relative">
            <img
              src={ASSET_MAP.CHARCOAL_BG}
              alt="Le Charbon — Texture et braise"
              className="w-full h-full object-cover rounded-2xl opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-left">
              <span className="text-xs font-mono-pp text-[#F2A34A] uppercase tracking-wider">
                Phoenix, Maurice
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold uppercase text-[#F3EDE2]">
                La Flamme & La Matière
              </h2>
            </div>
          </div>
        </section>

        {/* Section 2: The Craft of Charcoal */}
        <section className="bg-[#161616] border border-[#2A2A2A] rounded-3xl p-8 sm:p-14 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 text-[#E57A2E] text-xs font-mono-pp uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#F2A34A]" />
              <span>LE GESTE & LA BRAISE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-wide text-[#F3EDE2]">
              {t.craftHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#A39D93] leading-relaxed">
              {t.craftText}
            </p>
            <div className="font-mono-pp text-xs sm:text-sm text-[#F2A34A] border-l-2 border-[#E57A2E] pl-4 italic bg-[#0B0B0B]/40 py-2 rounded-r-lg">
              « La braise ne pardonne pas l’approximation. Elle récompense la générosité et l’amour du goût brut. »
            </div>
          </div>

          <div className="relative border border-[#2A2A2A] rounded-2xl p-4 bg-[#0B0B0B] flex items-center justify-center">
            <img
              src={ASSET_MAP.BURGER_WAGYU}
              alt="Le Wagyu Noire Signature"
              className="w-full max-h-[380px] object-contain drop-shadow-2xl"
            />
          </div>
        </section>

        {/* Section 3: Interactive Draggable Badges Playground */}
        <section className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4 text-[#E57A2E] font-bold text-xs uppercase tracking-widest font-mono-pp">
            <Move className="w-4 h-4 animate-bounce" />
            <span>{t.stickersTip}</span>
          </div>

          <div
            ref={playgroundRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative w-full h-[320px] sm:h-[440px] bg-[#161616] border border-[#2A2A2A] rounded-3xl shadow-inner overflow-hidden select-none"
            style={{ touchAction: activeDragId ? 'none' : 'pan-y' }}
          >
            {/* Background branding text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <span className="text-6xl sm:text-9xl font-display font-bold text-white uppercase tracking-widest text-center">
                LE CHARBON
              </span>
            </div>

            {/* Render Draggable Badges & Mascot */}
            {stickers.map((stk) => (
              <div
                key={stk.id}
                onPointerDown={(e) => handlePointerDown(stk.id, e)}
                style={{
                  left: `${stk.x}%`,
                  top: `${stk.y}%`,
                  transform: `translate(-50%, -50%) rotate(${stk.rotation}deg) scale(${stk.scale})`,
                }}
                className={`absolute cursor-grab active:cursor-grabbing transition-shadow ${
                  activeDragId === stk.id ? 'z-50 scale-125 drop-shadow-[0_20px_35px_rgba(229,122,46,0.35)]' : 'z-20'
                }`}
              >
                {stk.type === 'angus' && (
                  <img
                    src={ASSET_MAP.BURGER_BLACK_ANGUS}
                    alt="Black Angus"
                    className="w-28 h-28 object-contain pointer-events-none drop-shadow-xl"
                  />
                )}
                {stk.type === 'wagyu' && <WagyuSignatureBadge size={105} />}
                {stk.type === 'fire' && <CharcoalFireBadge size={105} />}
                {stk.type === 'crispers' && <CrispersBadge size={105} />}
                {stk.type === 'burger' && (
                  <img
                    src={ASSET_MAP.BURGER_BOEUF_PRIME}
                    alt="Bœuf Prime"
                    className="w-24 h-24 object-contain pointer-events-none drop-shadow-xl"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Values & Commitment */}
        <section className="bg-[#161616] border border-[#2A2A2A] rounded-3xl p-8 sm:p-14 shadow-2xl flex flex-col gap-10">
          <div>
            <div className="inline-flex items-center gap-2 text-[#E57A2E] text-xs font-mono-pp uppercase tracking-widest mb-3">
              <Heart className="w-4 h-4 fill-current text-[#E57A2E]" />
              <span>ENGAGEMENT CULINAIRE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-[#F3EDE2] mb-4">
              {t.valuesHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#A39D93] max-w-2xl leading-relaxed">
              {t.missionText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#2A2A2A]">
            {t.values.map((val, idx) => (
              <div
                key={idx}
                className="bg-[#0B0B0B] border border-[#2A2A2A] rounded-2xl p-6 flex flex-col items-start gap-4 hover:border-[#E57A2E]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#161616] border border-[#E57A2E]/30 flex items-center justify-center text-[#E57A2E]">
                  <Flame className="w-5 h-5 fill-current" />
                </div>
                <h3 className="text-lg font-display font-bold uppercase tracking-wide text-[#F3EDE2]">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A39D93] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Menu Call to Action */}
        <section className="bg-[#161616] border border-[#2A2A2A] rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl sm:text-4xl font-display font-bold uppercase tracking-wide text-[#F3EDE2]">
            {locale === 'fr' ? 'Prêt à goûter la différence ?' : 'Ready to taste the fire?'}
          </h2>
          <p className="text-sm sm:text-base text-[#A39D93] max-w-lg leading-relaxed">
            {locale === 'fr'
              ? 'Découvrez nos 5 créations signature au bœuf Wagyu, Black Angus et volailles marinées.'
              : 'Explore our 5 signature creations featuring Wagyu beef, Black Angus and marinated poultry.'}
          </p>
          <button
            onClick={onNavigateToMenu}
            className="btn-primary mt-3 flex items-center gap-2 py-3.5 px-8 text-sm cursor-pointer"
          >
            <span>{locale === 'fr' ? 'Découvrir le menu' : 'View the menu'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </div>
    </main>
  );
};
