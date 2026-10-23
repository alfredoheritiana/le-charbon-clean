/**
 * Le Charbon Menu Products (Confirmed Catalog)
 * Ground truth from DATA__LE_CHARBON__CONTENT_AND_MAPPING.json & COMPANION__LE_CHARBON__ESSENTIAL.txt
 */

import { ASSET_MAP } from './mediaManifest';

export interface Product {
  id: string;
  category: 'burgers' | 'sides';
  name: {
    fr: string;
    en: string;
  };
  priceMur: number;
  badge: 'Signature' | 'Premium' | 'Classic' | 'Charcoal' | 'Side';
  description: {
    fr: string;
    en: string;
  };
  image: string;
}

export const MENU_PRODUCTS: Product[] = [
  {
    id: 'wagyu-noire-signature',
    category: 'burgers',
    name: {
      fr: 'Le Wagyu Noire Signature',
      en: 'The Wagyu Noire Signature',
    },
    priceMur: 835,
    badge: 'Signature',
    description: {
      fr: "Un pavé de bœuf Wagyu haché à la marbrure délicate, saisi à la braise puis relevé d'oignons lentement caramélisés, d'une garniture bœuf premium, de cheddar fondant et d'une sauce signature au caractère prononcé.",
      en: 'A richly marbled Wagyu beef patty, flame-seared and layered with slowly caramelized onions, premium beef topping, melted cheddar and a bold signature sauce.',
    },
    image: ASSET_MAP.BURGER_WAGYU,
  },
  {
    id: 'black-angus-braise',
    category: 'burgers',
    name: {
      fr: 'Le Black Angus à la Braise',
      en: 'The Black Angus Charcoal Burger',
    },
    priceMur: 675,
    badge: 'Premium',
    description: {
      fr: "Un bœuf Black Angus grillé à la flamme, accompagné de cheddar fondant, de bœuf premium, d'oignons caramélisés et de sauce maison pour une bouchée fumée et intense.",
      en: 'Flame-grilled Black Angus beef with melted cheddar, premium beef topping, caramelized onions and house sauce for a deep smoky bite.',
    },
    image: ASSET_MAP.BURGER_BLACK_ANGUS,
  },
  {
    id: 'boeuf-prime-classique',
    category: 'burgers',
    name: {
      fr: 'Le Bœuf Prime Classique',
      en: 'The Prime Classic Beef',
    },
    priceMur: 350,
    badge: 'Classic',
    description: {
      fr: 'Un burger classique généreux avec bœuf grillé, cheddar fondant, laitue, tomate, cornichons, oignons caramélisés et sauce maison dans un pain brioché délicatement toasté.',
      en: 'A generous classic burger with grilled beef, melted cheddar, lettuce, tomato, pickles, caramelized onions and house sauce in a toasted brioche bun.',
    },
    image: ASSET_MAP.BURGER_BOEUF_PRIME,
  },
  {
    id: 'poulet-grille-braise',
    category: 'burgers',
    name: {
      fr: 'Le Poulet Grillé à la Braise',
      en: 'The Charcoal Grilled Chicken',
    },
    priceMur: 480,
    badge: 'Charcoal',
    description: {
      fr: "Un tendre filet de poulet grillé à la braise, accompagné de fromage fondant, de tomates grillées, d'oignons caramélisés, de laitue et d'une sauce aux herbes pour une finale fumée et généreuse.",
      en: 'A tender charcoal-grilled chicken fillet with melted cheese, roasted tomatoes, caramelized onions, lettuce and a herbed sauce for a smoky, generous finish.',
    },
    image: ASSET_MAP.BURGER_POULET_GRILLE,
  },
  {
    id: 'poulet-classique',
    category: 'burgers',
    name: {
      fr: 'Le Poulet Classique',
      en: 'The Classic Chicken',
    },
    priceMur: 310,
    badge: 'Classic',
    description: {
      fr: 'Un pavé de poulet assaisonné, garni de cheddar, laitue, tomate, cornichons, oignons caramélisés et sauce maison dans un bun moelleux et toasté.',
      en: 'A seasoned chicken patty layered with cheddar, lettuce, tomato, pickles, caramelized onions and house sauce in a soft toasted bun.',
    },
    image: ASSET_MAP.BURGER_POULET_CLASSIQUE,
  },
  {
    id: 'frites-crispers',
    category: 'sides',
    name: {
      fr: 'Frites Crispers',
      en: 'Crispers Fries',
    },
    priceMur: 100,
    badge: 'Side',
    description: {
      fr: 'Des frites croustillantes en forme de vague, dorées et assaisonnées, parfaites pour accompagner les burgers de la maison.',
      en: 'Golden crispy v-cut fries, perfectly seasoned and made to pair with our charcoal-grilled burgers.',
    },
    image: ASSET_MAP.FRITES_CRISPERS,
  },
];
