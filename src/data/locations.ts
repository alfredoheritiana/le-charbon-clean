/**
 * Le Charbon Restaurant Location Data (Mauritius)
 * Ground truth from DATA__LE_CHARBON__CONTENT_AND_MAPPING.json
 */

import { ASSET_MAP } from './mediaManifest';

export interface RestaurantLocation {
  id: string;
  name: string;
  region: string;
  address: string;
  phone?: string;
  hours: {
    en: string[];
    fr: string[];
  };
  mapUrl: string;
  orderUrl?: string;
  desktopImage: string;
  mobileImage: string;
}

export const RESTAURANT_LOCATIONS: RestaurantLocation[] = [
  {
    id: 'phoenix',
    name: 'Le Charbon — Phoenix',
    region: 'Phoenix, Mauritius',
    address: 'Phoenix, Mauritius',
    hours: {
      fr: ['LUN – DIM : 11:30 - 22:00', 'Service continu midi & soir'],
      en: ['MON – SUN: 11:30 - 22:00', 'Continuous lunch & dinner service'],
    },
    mapUrl: 'https://maps.google.com/?q=Phoenix,+Mauritius',
    desktopImage: ASSET_MAP.CHARCOAL_BG,
    mobileImage: ASSET_MAP.CHARCOAL_BG,
  },
];
