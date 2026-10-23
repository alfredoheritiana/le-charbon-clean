/**
 * Le Charbon Multilingual Content & Route Dictionaries
 * French (default) and English only
 */

export type Locale = 'fr' | 'en';
export type PageName = 'home' | 'menu' | 'about' | 'locations' | 'terms' | 'privacy' | 'cookies';

export interface LocaleRoutes {
  home: string;
  menu: string;
  about: string;
  locations: string;
  terms: string;
  privacy: string;
  cookies: string;
}

export const ROUTE_MAP: Record<Locale, LocaleRoutes> = {
  fr: {
    home: '/',
    menu: '/menu',
    about: '/a-propos',
    locations: '/adresses',
    terms: '/conditions-generales',
    privacy: '/politique-de-confidentialite',
    cookies: '/politique-cookies',
  },
  en: {
    home: '/en',
    menu: '/en/menu',
    about: '/en/about',
    locations: '/en/locations',
    terms: '/en/terms',
    privacy: '/en/privacy',
    cookies: '/en/cookies',
  },
};

export const UI_STRINGS = {
  fr: {
    nav: {
      about: 'Notre histoire',
      menu: 'Menu',
      locations: 'Adresse',
      delivery: 'COMMANDER',
      takeaway: 'À EMPORTER',
      whatsappBtn: 'WhatsApp',
    },
    hero: {
      eyebrow: 'BURGERS À LA BRAISE',
      headline: 'DES BURGERS. DU FEU. DU CARACTÈRE.',
      headlineLines: ['DES BURGERS.', 'DU FEU.', 'DU CARACTÈRE.'],
      subheadline:
        'La braise fait toute la différence. Des burgers généreux, des saveurs intenses et une seule obsession : le goût.',
      cta_primary: 'VOIR LE MENU',
      cta_secondary: 'NOUS TROUVER',
      marquee1: 'LE CHARBON · CUISSON À LA BRAISE · SAVEURS INTENSES',
      marquee2: 'DES BURGERS · DU FEU · DU CARACTÈRE · PHOENIX MAURITIUS',
    },
    aboutPreview: {
      title: 'LA BRAISE,\nC’EST NOTRE SIGNATURE.',
      body: 'Chez Le Charbon, le burger prend une autre dimension. Une cuisson à la braise, des ingrédients généreux et des associations de saveurs pensées pour ceux qui aiment les burgers avec du caractère.',
      cta: 'Découvrir notre histoire',
    },
    popular: {
      title: 'NOS BURGERS À LA BRAISE',
      subtitle: 'Saisis au feu de bois pour une caramélisation intense et un goût fumé incomparable.',
      cta: 'Découvrir toute la carte',
      ingredientsLabel: 'Ingrédients :',
    },
    community: {
      title: 'LA BRAISE SE PARTAGE.',
      subtitle: 'Rejoignez la communauté des amateurs de burgers intenses et généreux.',
      cta: 'Suivre Le Charbon',
    },
    locationsSection: {
      title: 'NOTRE RESTAURANT',
      orderNowMarquee: 'LE CHARBON · BURGERS À LA BRAISE · PHOENIX MAURITIUS ·',
      addressLabel: 'Adresse :',
      hoursLabel: 'Horaires d’ouverture :',
      takeaway: 'À EMPORTER',
      viewMap: 'Ouvrir dans Google Maps',
    },
    contact: {
      title: 'VOTRE EXPÉRIENCE COMPTE',
      subtitle: 'Partagez vos impressions après votre visite chez Le Charbon.',
      dateLabel: 'Date de la visite',
      ratingLabel: 'Votre appréciation',
      nameLabel: 'Nom',
      namePlaceholder: 'Votre nom complet',
      emailLabel: 'E-mail',
      emailPlaceholder: 'votre.email@exemple.mu',
      messageLabel: 'Votre message',
      messagePlaceholder: 'Partagez votre avis sur nos burgers et notre service...',
      submit: 'Envoyer mon avis',
      successTitle: 'Merci pour votre retour !',
      successText: 'Votre avis a bien été transmis. Toute l’équipe de Le Charbon vous remercie pour votre confiance.',
      errorText: 'Une erreur s’est produite lors de l’envoi. Merci de vérifier vos informations.',
    },
    team: {
      title: 'L’ART DE\nLA BRAISE',
      body: 'La braise exige un savoir-faire précis : maîtriser l’intensité du feu, saisir la viande au bon moment pour en concentrer les sucs, et assembler chaque ingrédient avec générosité.',
      cta: 'Voir notre carte',
    },
    footer: {
      tagline: 'Des burgers d’exception cuits à la braise à Maurice.',
      rights: '© {year} Le Charbon. Tous droits réservés.',
      terms: 'Conditions Générales',
      privacy: 'Politique de Confidentialité',
      cookies: 'Cookies',
      locationLabel: 'Phoenix, Maurice',
    },
    deliveryModal: {
      title: 'COMMANDER CHEZ LE CHARBON',
      subtitle: 'Retrouvez nos burgers saisis à la braise à emporter ou en commande directe.',
      close: 'Fermer',
      action: 'Commander sur WhatsApp',
    },
    whatsappModal: {
      title: 'ENVIE D’UN BURGER À LA BRAISE ?\nÉCRIVEZ-NOUS SUR WHATSAPP !',
      body: 'Commandez votre repas en quelques secondes directement par message. Évitez l’attente, nous préparons vos burgers frais du grill.',
      cta: 'Commander sur WhatsApp',
      dismiss: 'Plus tard',
    },
    cookiesBanner: {
      title: 'COOKIES & EXPÉRIENCE',
      text: 'Nous utilisons des cookies essentiels pour assurer le bon fonctionnement du site et mémoriser votre choix de langue.',
      accept: 'Accepter',
      learnMore: 'En savoir plus',
    },
    aboutPage: {
      heroHeading: 'NOTRE HISTOIRE',
      heroSub:
        'CHEZ LE CHARBON, NOUS AVONS CHOISI LA CUISSON À LA BRAISE POUR REDÉFINIR LE BURGER GOURMET À MAURICE. DES INGRÉDIENTS D’EXCEPTION, DU FEU VIF ET UNE OBSESSION POUR LE GOÛT.',
      craftHeading: 'LA MAÎTRISE DU FEU',
      craftText:
        'Le secret d’un burger mémorable réside dans l’alliance du feu et de la braise. Cette technique ancestrale sublime la qualité des viandes, créant une croûte caramélisée croustillante tout en préservant une jutosité incomparable au cœur.',
      stickersTip: 'DÉPLACEZ LES BADGES & SYMBOLES LE CHARBON',
      missionHeading: 'NOTRE ENGAGEMENT',
      missionText:
        'OFFRIR UNE EXPÉRIENCE CULINAIRE SINCÈRE ET INTENSE. DU BŒUF WAGYU AU POULET MARINÉ, CHAQUE RECETTE EST PENSÉE POUR APPORTER DU PLAISIR BRUT ET DU CARACTÈRE.',
      valuesHeading: 'NOS VALEURS',
      values: [
        {
          title: 'CUISSON À LA BRAISE',
          desc: 'La chaleur de la braise apporte des notes fumées uniques et une caramélisation inimitable.',
        },
        {
          title: 'INGRÉDIENTS SÉLECTIONNÉS',
          desc: 'Bœuf Wagyu, Black Angus, volailles marinées et buns briochés dorés pour un équilibre parfait.',
        },
        {
          title: 'GÉNÉROSITÉ & PASSION',
          desc: 'Des portions satisfaisantes, des sauces signatures maison et un service chaleureux.',
        },
      ],
    },
    locationsPage: {
      title: 'NOUS RENDRE VISITE',
      subtitle: 'RETROUVEZ LE CHARBON À PHOENIX, MAURICE',
    },
  },
  en: {
    nav: {
      about: 'Our Story',
      menu: 'Menu',
      locations: 'Location',
      delivery: 'ORDER',
      takeaway: 'TAKE AWAY',
      whatsappBtn: 'WhatsApp',
    },
    hero: {
      eyebrow: 'CHARCOAL FIRED BURGERS',
      headline: 'BURGERS. FIRE. CHARACTER.',
      headlineLines: ['BURGERS.', 'FIRE.', 'CHARACTER.'],
      subheadline:
        'Fire makes the difference. Generous burgers, bold flavors, and one obsession: great taste.',
      cta_primary: 'VIEW MENU',
      cta_secondary: 'FIND US',
      marquee1: 'LE CHARBON · CHARCOAL GRILLED · SMOKY BOLD FLAVORS',
      marquee2: 'BURGERS · FIRE · CHARACTER · PHOENIX MAURITIUS',
    },
    aboutPreview: {
      title: 'FIRE IS\nOUR SIGNATURE.',
      body: 'At Le Charbon, burgers take on a whole new character. Charcoal-grilled flavors, generous ingredients and combinations created for people who love bold, satisfying food.',
      cta: 'Discover our story',
    },
    popular: {
      title: 'OUR CHARCOAL-GRILLED BURGERS',
      subtitle: 'Flame-seared over glowing embers for a caramelized crust and deep smoky tenderness.',
      cta: 'View full menu',
      ingredientsLabel: 'Ingredients:',
    },
    community: {
      title: 'FIRE IS MEANT TO BE SHARED.',
      subtitle: 'Join the community of flame-grilled burger enthusiasts in Mauritius.',
      cta: 'Follow Le Charbon',
    },
    locationsSection: {
      title: 'OUR RESTAURANT',
      orderNowMarquee: 'LE CHARBON · CHARCOAL FIRED BURGERS · PHOENIX MAURITIUS ·',
      addressLabel: 'Address:',
      hoursLabel: 'Opening Hours:',
      takeaway: 'TAKE AWAY',
      viewMap: 'Open in Google Maps',
    },
    contact: {
      title: 'WE VALUE YOUR FEEDBACK',
      subtitle: 'Tell us about your experience at Le Charbon.',
      dateLabel: 'Visit Date',
      ratingLabel: 'Your Rating',
      nameLabel: 'Name',
      namePlaceholder: 'Your full name',
      emailLabel: 'Email',
      emailPlaceholder: 'your.email@example.mu',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Share your feedback on our burgers and hospitality...',
      submit: 'Submit Feedback',
      successTitle: 'Thank you for your feedback!',
      successText: 'Your review has been received. The team at Le Charbon truly appreciates your support.',
      errorText: 'An error occurred while submitting. Please check your inputs.',
    },
    team: {
      title: 'THE ART OF\nCHARCOAL',
      body: 'Mastering the charcoal fire requires precision and patience: controlling the intense heat, searing at the exact moment to lock in savory juices, and assembling every burger with generous passion.',
      cta: 'Explore our menu',
    },
    footer: {
      tagline: 'Premium charcoal-grilled burgers in Mauritius.',
      rights: '© {year} Le Charbon. All rights reserved.',
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
      cookies: 'Cookies',
      locationLabel: 'Phoenix, Mauritius',
    },
    deliveryModal: {
      title: 'ORDER AT LE CHARBON',
      subtitle: 'Get our charcoal-grilled burgers for takeaway or quick WhatsApp orders.',
      close: 'Close',
      action: 'Order on WhatsApp',
    },
    whatsappModal: {
      title: 'CRAVING A CHARCOAL BURGER?\nCHAT WITH US ON WHATSAPP!',
      body: 'Skip the wait and order your favorite burgers directly on WhatsApp. Freshly flame-seared and packed with flavor.',
      cta: 'Order on WhatsApp',
      dismiss: 'Not now',
    },
    cookiesBanner: {
      title: 'COOKIES & PRIVACY',
      text: 'We use essential cookies to maintain your language preferences and guarantee a smooth browsing experience.',
      accept: 'Accept',
      learnMore: 'Learn more',
    },
    aboutPage: {
      heroHeading: 'OUR STORY',
      heroSub:
        'AT LE CHARBON, WE CHOSE CHARCOAL FIRE TO REDEFINE THE GOURMET BURGER EXPERIENCE IN MAURITIUS. EXCEPTIONAL INGREDIENTS, GLOWING EMBERS AND AN OBSESSION FOR TASTE.',
      craftHeading: 'MASTERING THE FIRE',
      craftText:
        'The secret to a memorable burger lies in the alchemy between meat and embers. Charcoal grilling creates a rich, caramelized crust while locking in juices for an extraordinarily tender center.',
      stickersTip: 'MOVE & ARRANGE LE CHARBON BADGES',
      missionHeading: 'OUR COMMITMENT',
      missionText:
        'DELIVERING HONEST, SATISFYING FOOD WITH UNCOMPROMISING CHARACTER. FROM DELICATELY MARBLED WAGYU TO MARINATED CHICKEN, EVERY RECETTE CELEBRATES BOLD TASTE.',
      valuesHeading: 'OUR VALUES',
      values: [
        {
          title: 'CHARCOAL-GRILLED',
          desc: 'High-heat embers impart signature smoky depths and mouth-watering caramelization.',
        },
        {
          title: 'CURATED INGREDIENTS',
          desc: 'Wagyu beef, Black Angus, tender chicken breasts and golden brioche buns.',
        },
        {
          title: 'GENEROSITY & HEART',
          desc: 'Satisfying portions, crafted house sauces and genuine hospitality.',
        },
      ],
    },
    locationsPage: {
      title: 'VISIT US',
      subtitle: 'FIND LE CHARBON IN PHOENIX, MAURITIUS',
    },
  },
};
