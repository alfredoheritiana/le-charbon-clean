/**
 * Media Asset Manifest for Le Charbon — Dark Fire Premium
 * Lightweight AI Studio branch: media stays on GitHub's main branch so binary
 * files do not consume the Build agent's import context.
 */

const ASSET_BASE =
  'https://raw.githubusercontent.com/alfredoheritiana/le-charbon-clean/main/public/assets/aistudio';

export const ASSET_MAP = {
  // Global Logos
  LOGO: `${ASSET_BASE}/ASSET__LOGO__LE_CHARBON_TRANSPARENT_WHITE_ab5e3ff6.png`,
  LOGO_WITH_BG: `${ASSET_BASE}/ASSET__LOGO__LE_CHARBON_SOURCE_BG_8a6013a9.png`,

  // Hero & Feature visuals
  HERO_BURGER: `${ASSET_BASE}/ASSET__MENU__01_WAGYU_NOIRE_SIGNATURE_6a8476fe.webp`,
  HERO_IMAGE: `${ASSET_BASE}/ASSET__MENU__01_WAGYU_NOIRE_SIGNATURE_6a8476fe.webp`,
  CHARCOAL_BG: `${ASSET_BASE}/ASSET__LOGO__LE_CHARBON_SOURCE_BG_8a6013a9.png`,

  // Confirmed Menu Items
  BURGER_WAGYU: `${ASSET_BASE}/ASSET__MENU__01_WAGYU_NOIRE_SIGNATURE_6a8476fe.webp`,
  BURGER_BLACK_ANGUS: `${ASSET_BASE}/ASSET__MENU__02_BLACK_ANGUS_A_LA_BRAISE_f29fb4b4.webp`,
  BURGER_BOEUF_PRIME: `${ASSET_BASE}/ASSET__MENU__03_BOEUF_PRIME_CLASSIQUE_1f266fa7.webp`,
  FRITES_CRISPERS: `${ASSET_BASE}/ASSET__MENU__04_FRITES_CRISPERS_6dd05f65.webp`,
  BURGER_POULET_CLASSIQUE: `${ASSET_BASE}/ASSET__MENU__05_POULET_CLASSIQUE_899ecd77.webp`,
  BURGER_POULET_GRILLE: `${ASSET_BASE}/ASSET__MENU__06_POULET_GRILLE_A_LA_BRAISE_be9e6de7.webp`,

  // Modal and auxiliary
  MODAL_BURGER: `${ASSET_BASE}/ASSET__MENU__02_BLACK_ANGUS_A_LA_BRAISE_f29fb4b4.webp`,
} as const;
