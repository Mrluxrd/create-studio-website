/**
 * Single source of truth for site-wide production configuration.
 *
 * PRODUCTION_ORIGIN must be confirmed before deployment. It is read from the
 * PUBLIC_SITE_ORIGIN environment variable so the domain can be set per
 * environment without touching code; the fallback below is the placeholder
 * carried over from the design handoff and must not ship as-is.
 */
const FALLBACK_ORIGIN = 'https://PRODUCTION-DOMAIN.example';

export const PRODUCTION_ORIGIN: string = (
  import.meta.env.PUBLIC_SITE_ORIGIN || FALLBACK_ORIGIN
).replace(/\/+$/, '');

/** True while the placeholder origin is still in use. */
export const ORIGIN_IS_PLACEHOLDER = PRODUCTION_ORIGIN === FALLBACK_ORIGIN;

export const SITE = {
  name: 'Create Studio',
  locale: 'en',
  /** 1200x630 social card. Supply the final asset at this path. */
  ogImage: '/social/create-studio-og.jpg',
  contact: {
    person: 'Oscar Lauzardo',
    phone: '+1 829.778.6137',
    phoneHref: 'tel:+18297786137',
    email: 'lauzardo1991@gmail.com',
    locality: 'Santo Domingo',
    country: 'DO',
  },
} as const;

export const absoluteUrl = (pathname: string): string =>
  PRODUCTION_ORIGIN + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''));
