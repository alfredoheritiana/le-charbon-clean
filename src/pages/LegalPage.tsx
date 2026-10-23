import React from 'react';
import { Locale, PageName } from '../data/content';
import { ShieldCheck, FileText, Cookie } from 'lucide-react';

interface LegalPageProps {
  page: 'terms' | 'privacy' | 'cookies';
  locale: Locale;
  onNavigate: (page: PageName) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ page, locale, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const titles = {
    terms: {
      en: 'Terms & Conditions',
      fr: "Conditions Générales d'Utilisation",
    },
    privacy: {
      en: 'Privacy Policy',
      fr: 'Politique de Confidentialité',
    },
    cookies: {
      en: 'Cookies Policy',
      fr: 'Politique Relative aux Cookies',
    },
  };

  return (
    <main className="w-full bg-[#0B0B0B] text-[#F3EDE2] pt-[calc(var(--size--nav-height-desktop)+2rem)] pb-28 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Navigation Tabs between legal pages */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#2A2A2A] pb-4">
          <button
            onClick={() => onNavigate('terms')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-display font-bold uppercase tracking-wider cursor-pointer transition-colors ${
              page === 'terms'
                ? 'bg-[#E57A2E] text-white'
                : 'bg-[#161616] border border-[#2A2A2A] text-[#A39D93] hover:text-[#F3EDE2]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{titles.terms[locale]}</span>
          </button>

          <button
            onClick={() => onNavigate('privacy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-display font-bold uppercase tracking-wider cursor-pointer transition-colors ${
              page === 'privacy'
                ? 'bg-[#E57A2E] text-white'
                : 'bg-[#161616] border border-[#2A2A2A] text-[#A39D93] hover:text-[#F3EDE2]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{titles.privacy[locale]}</span>
          </button>

          <button
            onClick={() => onNavigate('cookies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-display font-bold uppercase tracking-wider cursor-pointer transition-colors ${
              page === 'cookies'
                ? 'bg-[#E57A2E] text-white'
                : 'bg-[#161616] border border-[#2A2A2A] text-[#A39D93] hover:text-[#F3EDE2]'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>{titles.cookies[locale]}</span>
          </button>
        </div>

        {/* Legal Article Content Box */}
        <div className="bg-[#161616] border border-[#2A2A2A] p-6 sm:p-12 rounded-3xl shadow-2xl flex flex-col gap-8">
          <div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-[#F3EDE2] mb-2">
              {titles[page][locale]}
            </h1>
            <p className="font-mono-pp text-xs text-[#A39D93] uppercase">
              Le Charbon • Phoenix, Mauritius • {currentYear}
            </p>
          </div>

          <div className="text-sm text-[#A39D93] leading-relaxed flex flex-col gap-6">
            {page === 'terms' && (
              <>
                <section>
                  <h2 className="font-display font-bold text-base uppercase text-[#F3EDE2] mb-2">
                    {locale === 'fr' ? '1. Objet et Présentation' : '1. Scope and Information'}
                  </h2>
                  <p>
                    {locale === 'fr'
                      ? 'Les présentes conditions régissent l’utilisation du site web Le Charbon et les commandes passées auprès de notre restaurant situé à Phoenix, Maurice.'
                      : 'These terms govern the use of the Le Charbon website and orders placed with our restaurant in Phoenix, Mauritius.'}
                  </p>
                </section>
                <section>
                  <h2 className="font-display font-bold text-base uppercase text-[#F3EDE2] mb-2">
                    {locale === 'fr' ? '2. Tarification et Commandes' : '2. Pricing and Orders'}
                  </h2>
                  <p>
                    {locale === 'fr'
                      ? 'Tous les prix sont affichés en roupies mauriciennes (Rs / MUR). Les commandes à emporter ou en livraison directe sont préparées à la commande.'
                      : 'All prices are shown in Mauritian rupees (Rs / MUR). Takeaway and direct orders are freshly prepared upon receipt.'}
                  </p>
                </section>
                <section>
                  <h2 className="font-display font-bold text-base uppercase text-[#F3EDE2] mb-2">
                    {locale === 'fr' ? '3. Propriété Intellectuelle' : '3. Intellectual Property'}
                  </h2>
                  <p>
                    {locale === 'fr'
                      ? 'L’identité visuelle, le nom Le Charbon, les photographies de burgers et les éléments graphiques sont la propriété exclusive de Le Charbon.'
                      : 'All brand assets, photography, mascots and visual marks are the exclusive property of Le Charbon.'}
                  </p>
                </section>
              </>
            )}

            {page === 'privacy' && (
              <>
                <section>
                  <h2 className="font-display font-bold text-base uppercase text-[#F3EDE2] mb-2">
                    {locale === 'fr' ? '1. Protection des Données Personnelles' : '1. Personal Data Protection'}
                  </h2>
                  <p>
                    {locale === 'fr'
                      ? 'Le Charbon s’engage à protéger la vie privée de ses clients et visiteurs. Aucune donnée n’est cédée à des tiers.'
                      : 'Le Charbon respects customer privacy. We do not sell or share personal data with unauthorized third parties.'}
                  </p>
                </section>
                <section>
                  <h2 className="font-display font-bold text-base uppercase text-[#F3EDE2] mb-2">
                    {locale === 'fr' ? '2. Formulaire d’Avis' : '2. Customer Feedback Form'}
                  </h2>
                  <p>
                    {locale === 'fr'
                      ? 'Les informations transmises lors de la soumission d’un avis sont uniquement utilisées pour améliorer notre cuisine et nos services.'
                      : 'Information submitted through our feedback form is strictly used to evaluate and elevate our food and hospitality.'}
                  </p>
                </section>
              </>
            )}

            {page === 'cookies' && (
              <>
                <section>
                  <h2 className="font-display font-bold text-base uppercase text-[#F3EDE2] mb-2">
                    {locale === 'fr' ? '1. Cookies Essentiels' : '1. Essential Cookies'}
                  </h2>
                  <p>
                    {locale === 'fr'
                      ? 'Nous utilisons des cookies techniques nécessaires à la navigation et à la mémorisation de votre choix de langue (français ou anglais).'
                      : 'We only use necessary cookies to preserve language choices (French or English) and prevent intrusive duplicate dialogs.'}
                  </p>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
