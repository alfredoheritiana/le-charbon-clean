import React, { useState } from 'react';
import { Locale } from '../data/content';
import { MENU_PRODUCTS, Product } from '../data/menu';
import { Flame, Utensils, Sparkles } from 'lucide-react';
import { WagyuSignatureBadge } from '../components/CharcoalGraphics';

interface MenuPageProps {
  locale: Locale;
  onOpenDeliveryModal: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ locale, onOpenDeliveryModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: { fr: 'TOUS LES PRODUITS', en: 'ALL ITEMS' }, icon: Sparkles },
    { id: 'burgers', label: { fr: 'BURGERS À LA BRAISE', en: 'CHARCOAL BURGERS' }, icon: Flame },
    { id: 'sides', label: { fr: 'ACCOMPAGNEMENTS', en: 'SIDES' }, icon: Utensils },
  ];

  const introText: Record<Locale, string> = {
    fr: "NOS BURGERS SONT SAISIS À LA BRAISE AU FEU DE BOIS, GARNIS D’INGRÉDIENTS D’EXCEPTION ET DE SAUCES MAISON POUR UNE EXPÉRIENCE GOURMANDE UNIQUE À MAURICE.",
    en: "OUR BURGERS ARE FLAME-SEARED OVER GLOWING CHARCOAL, TOPPED WITH EXCEPTIONAL INGREDIENTS AND HOUSE-CRAFTED SAUCES FOR A BOLD GOURMET EXPERIENCE IN MAURITIUS.",
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? MENU_PRODUCTS
      : MENU_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <main className="w-full bg-[#0B0B0B] text-[#F3EDE2] pt-[calc(var(--size--nav-height-desktop)+2rem)] pb-28 min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[radial-gradient(circle,rgba(229,122,46,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-[#2A2A2A] text-[#E57A2E] text-xs font-mono-pp uppercase tracking-widest mb-4">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>LA CARTE OFFICIELLE</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tight text-[#F3EDE2] mb-5">
            LE MENU
          </h1>
          <p className="font-mono-pp text-xs sm:text-sm text-[#A39D93] leading-relaxed uppercase tracking-wider max-w-2xl mx-auto">
            {introText[locale]}
          </p>
        </div>

        {/* Category Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-16 sticky top-[var(--size--nav-height-mobile)] md:top-[var(--size--nav-height-desktop)] z-30 py-3 bg-[#0B0B0B]/95 backdrop-blur-md">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-display font-bold uppercase tracking-wider transition-all cursor-pointer min-h-[44px] ${
                  isSelected
                    ? 'bg-[#E57A2E] text-white shadow-lg shadow-[#E57A2E]/25'
                    : 'bg-[#161616] border border-[#2A2A2A] text-[#A39D93] hover:text-[#F3EDE2] hover:border-[#E57A2E]/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label[locale]}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid (6 confirmed items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((prod: Product) => {
            const isWagyu = prod.id === 'wagyu-noire-signature';
            return (
              <div
                key={prod.id}
                className="group relative bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 shadow-md hover:border-[#E57A2E]/60 hover:shadow-[0_12px_40px_rgba(229,122,46,0.12)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Header / Cutout photo */}
                <div className="relative w-full h-56 sm:h-64 mb-4 flex items-center justify-center bg-[#0B0B0B] rounded-xl overflow-hidden p-3 border border-[#2A2A2A]/50">
                  <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-[#C6401C]/20 to-[#E57A2E]/10 blur-xl group-hover:scale-125 transition-transform duration-500" />
                  <img
                    src={prod.image}
                    alt={prod.name[locale]}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-108 drop-shadow-xl"
                    loading="lazy"
                  />
                  {isWagyu && (
                    <div className="absolute top-2 right-2 pointer-events-none">
                      <WagyuSignatureBadge size={55} />
                    </div>
                  )}
                </div>

                {/* Info Block */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-pp font-bold uppercase tracking-wider bg-[#0B0B0B] border border-[#2A2A2A] text-[#F2A34A]">
                      {prod.badge}
                    </span>
                    <span className="font-mono-pp font-bold text-lg text-[#E57A2E]">
                      Rs {prod.priceMur}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-[#F3EDE2] group-hover:text-[#F2A34A] transition-colors mb-2">
                    {prod.name[locale]}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A39D93] leading-relaxed mb-6">
                    {prod.description[locale]}
                  </p>
                </div>

                {/* Pricing & Order Action */}
                <div className="pt-4 border-t border-[#2A2A2A] mt-auto flex items-center justify-between">
                  <span className="text-xs font-mono-pp uppercase text-[#A39D93]">
                    Prix net en MUR
                  </span>

                  <button
                    onClick={onOpenDeliveryModal}
                    className="btn-primary text-xs py-2 px-4 cursor-pointer"
                  >
                    {locale === 'fr' ? 'Commander →' : 'Order →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
