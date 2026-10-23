import { Locale, PageName, ROUTE_MAP } from '../data/content';

export interface RouteResolution {
  locale: Locale;
  page: PageName;
  path: string;
}

/**
 * Resolves a given pathname into its corresponding Locale and PageName.
 * French is the default language.
 */
export function resolveRoute(rawPath: string): RouteResolution {
  const normalized = rawPath.replace(/\/+$/, '') || '/';

  // Check defined routes
  for (const [localeKey, routes] of Object.entries(ROUTE_MAP) as [Locale, typeof ROUTE_MAP['fr']][]) {
    for (const [pageKey, path] of Object.entries(routes) as [PageName, string][]) {
      const normalizedRoutePath = path.replace(/\/+$/, '') || '/';
      if (normalized === normalizedRoutePath) {
        return {
          locale: localeKey,
          page: pageKey,
          path: normalized,
        };
      }
    }
  }

  // English prefix routes
  if (normalized === '/en' || normalized === '/en/') {
    return { locale: 'en', page: 'home', path: '/en' };
  }
  if (normalized.startsWith('/en/')) {
    const sub = normalized.replace('/en/', '');
    if (sub.includes('menu')) return { locale: 'en', page: 'menu', path: normalized };
    if (sub.includes('about')) return { locale: 'en', page: 'about', path: normalized };
    if (sub.includes('location')) return { locale: 'en', page: 'locations', path: normalized };
    if (sub.includes('term')) return { locale: 'en', page: 'terms', path: normalized };
    if (sub.includes('privacy')) return { locale: 'en', page: 'privacy', path: normalized };
    if (sub.includes('cookie')) return { locale: 'en', page: 'cookies', path: normalized };
    return { locale: 'en', page: 'home', path: normalized };
  }

  // Legacy French routes handling
  if (normalized.includes('a-propos')) {
    return { locale: 'fr', page: 'about', path: normalized };
  }
  if (normalized.includes('lieux') || normalized.includes('adresses')) {
    return { locale: 'fr', page: 'locations', path: normalized };
  }
  if (normalized === '/menu' || normalized === '/fr/menu') {
    return { locale: 'fr', page: 'menu', path: normalized };
  }

  // Legacy English routes without /en prefix
  if (normalized === '/about-us') {
    return { locale: 'en', page: 'about', path: normalized };
  }
  if (normalized === '/locations') {
    return { locale: 'en', page: 'locations', path: normalized };
  }
  if (normalized === '/terms-conditions') {
    return { locale: 'en', page: 'terms', path: normalized };
  }
  if (normalized === '/privacy-policy') {
    return { locale: 'en', page: 'privacy', path: normalized };
  }
  if (normalized === '/cookies-policy') {
    return { locale: 'en', page: 'cookies', path: normalized };
  }

  // Legacy German routes fallback gracefully to French
  if (normalized.startsWith('/de')) {
    if (normalized.includes('speisekarte')) return { locale: 'fr', page: 'menu', path: '/menu' };
    if (normalized.includes('uber-uns')) return { locale: 'fr', page: 'about', path: '/a-propos' };
    if (normalized.includes('standorte')) return { locale: 'fr', page: 'locations', path: '/adresses' };
    return { locale: 'fr', page: 'home', path: '/' };
  }

  // Default is French Home
  return {
    locale: 'fr',
    page: 'home',
    path: normalized,
  };
}

/**
 * Get the target path when switching to another locale for the current page.
 */
export function getLocalizedPath(currentPage: PageName, targetLocale: Locale): string {
  return ROUTE_MAP[targetLocale][currentPage] || ROUTE_MAP[targetLocale].home;
}
