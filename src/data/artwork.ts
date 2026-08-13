/**
 * Central artwork registry.
 *
 * Every approved image placement on the site is listed here. The reserved box,
 * aspect ratio and position live in the page markup exactly as approved; this
 * file only decides *which file* fills each reserved box.
 *
 * To supply a final asset:
 *   1. Drop the file in `public/artwork/` using the descriptive filename below.
 *   2. Fill in `src`, `width`, `height` and — for meaningful images — `alt`.
 *   3. Nothing else changes. The reserved box is already the right size, so no
 *      layout shift occurs.
 *
 * `decorative: true` placements are hidden from assistive technology
 * (alt="" + aria-hidden). Placements that carry meaning must be given real
 * alt text when the final asset arrives; a decorative placement that gains
 * meaning should have `decorative` flipped to false at the same time.
 */

import type { ImageMetadata } from 'astro';

import serviceWebDesignDevelopment from '../assets/services/service-web-design-development.png';
import serviceWebsiteRedesign from '../assets/services/service-website-redesign.png';
import serviceCrmCustomSystems from '../assets/services/service-crm-custom-systems.png';
import serviceSeoPerformance from '../assets/services/service-seo-performance.png';
import serviceHostingMaintenance from '../assets/services/service-hosting-maintenance.png';
import serviceDigitalBranding from '../assets/services/service-digital-branding.png';

import luxuryListingsPrimary from '../assets/work/case-study-luxury-listings-dr-primary.png';
import luxuryListingsDetail from '../assets/work/case-study-luxury-listings-dr-detail.png';
import joanLeonardoPrimary from '../assets/work/case-study-joan-leonardo-primary.png';
import joanLeonardoDetail from '../assets/work/case-study-joan-leonardo-detail.png';
import customCrmPrimary from '../assets/work/case-study-custom-real-estate-crm-primary.png';
import customCrmDetail from '../assets/work/case-study-custom-real-estate-crm-detail.png';
import createStudioPrimary from '../assets/work/case-study-create-studio-primary.png';
import createStudioDetail from '../assets/work/case-study-create-studio-detail.png';

/**
 * Case-study placements render at very different sizes for the same asset —
 * a 415px card in the /work grid and a 1296px band on the case-study page —
 * so they carry their own variant widths rather than the service-card defaults.
 */
const PRIMARY_WIDTHS = [400, 700, 1100, 1440];
const PRIMARY_SIZES = '(max-width: 900px) 92vw, 1300px';
const DETAIL_WIDTHS = [360, 620, 900];
const DETAIL_SIZES = '(max-width: 900px) 92vw, 620px';

export interface ArtworkEntry {
  /**
   * Imported asset, processed by Astro's image pipeline (optimised, intrinsic
   * dimensions carried through so nothing shifts). Preferred over `src`.
   */
  image?: ImageMetadata;
  /** Path under /public. Alternative to `image` for unprocessed assets. */
  src?: string;
  /** Intrinsic pixel dimensions — required with `src` to prevent layout shift. */
  width?: number;
  height?: number;
  /** Meaningful alternative text. Ignored when `decorative` is true. */
  alt?: string;
  /** Purely decorative artwork is hidden from assistive technology. */
  decorative: boolean;
  /** Hero-critical artwork loads eagerly; everything else is lazy. */
  eager?: boolean;
  /**
   * Restrict rendering to these routes. An asset id can be shared by several
   * placements across the site; this keeps a supplied asset to the placements
   * it was approved for, leaving the others exactly as they are.
   */
  routes?: string[];
  /**
   * How the asset sits in its reserved box. `contain` keeps a whole composition
   * visible and lets the card's existing background fill the remaining space;
   * `cover` fills the box and crops. Defaults to `cover`.
   */
  fit?: 'cover' | 'contain';
  /**
   * Responsive variants to generate, and the `sizes` hint describing how wide
   * the placement renders. Defaults suit the small service cards; larger
   * placements (the case-study bands) set their own.
   */
  widths?: number[];
  sizes?: string;
  /** Suggested filename for the final asset, kept descriptive on purpose. */
  filename: string;
  /** What the placement is for — kept out of the rendered page. */
  note: string;
}

export const ARTWORK: Record<string, ArtworkEntry> = {
  /* --- homepage --------------------------------------------------------- */
  // Approved and already placed inline in the homepage hero markup.
  // Listed for reference only; the hero markup is never re-rendered from here.
  'create-hero-motion': {
    src: 'src/assets/hero-mockup-luxury-listings.png',
    alt: 'Luxury Listings DR, a Create Studio project, shown on a laptop and phone',
    decorative: false,
    eager: true,
    filename: 'hero-mockup-luxury-listings.png',
    note:
      'Homepage hero computer mockup — approved, placed inline in src/pages/index.astro and served through the image pipeline as WebP with a PNG fallback. Reference only: never re-rendered from this registry, never regenerated.',
  },
  'create-portfolio-accent': {
    decorative: true,
    filename: 'create-portfolio-accent.webp',
    note: 'Selected Work band, 21:9 desktop / 16:9 tablet / 3:2 mobile, low band.',
  },
  'create-process-flow': {
    decorative: true,
    filename: 'create-process-flow.webp',
    note: 'Process flow artwork, homepage and process page.',
  },
  'create-about-gesture': {
    decorative: true,
    filename: 'create-about-gesture.webp',
    note: 'About / studio gesture artwork.',
  },
  'create-contact-expansion': {
    decorative: true,
    filename: 'create-contact-expansion.webp',
    note: 'Closing contact band, present on most routes.',
  },
  'create-pricing-atmosphere': {
    decorative: true,
    filename: 'create-pricing-atmosphere.webp',
    note: 'Pricing page atmosphere band.',
  },

  /* --- service artwork ---------------------------------------------------
   * The approved square masters are placed in the six service cards on
   * /services only. Every entry below is scoped with `routes: ['/services']`
   * because these ids are shared with the hero bands on the individual service
   * routes, which the approved stylesheet retires — scoping leaves those
   * exactly as they are rather than relying on them staying hidden.
   *
   * `fit: 'contain'` because the masters are 1:1 and the cards are landscape;
   * `cover` would crop through the device mockups and dashboard content that
   * carry the meaning. The card's own #0B0B0E background fills the remainder.
   */
  // The /services hero band (id `create-service-web`, top-right, desktop only)
  // is NOT one of the six cards, so it is deliberately left unfilled.
  'create-service-web': {
    decorative: true,
    filename: 'create-service-web-design-development.webp',
    note: 'Web Design & Development service artwork — hero band placement, no asset approved for it.',
  },
  // The Web Design & Development *card* on /services.
  'create-service-web-2': {
    image: serviceWebDesignDevelopment,
    decorative: true,
    routes: ['/services'],
    fit: 'contain',
    filename: 'service-web-design-development.png',
    note: 'Web Design & Development card on /services. Square master, 1254x1254.',
  },
  'create-service-redesign': {
    image: serviceWebsiteRedesign,
    decorative: true,
    routes: ['/services'],
    fit: 'contain',
    filename: 'service-website-redesign.png',
    note: 'Website Redesign card on /services. Square master, 1254x1254.',
  },
  'create-service-crm': {
    image: serviceCrmCustomSystems,
    decorative: true,
    routes: ['/services'],
    fit: 'contain',
    filename: 'service-crm-custom-systems.png',
    note: 'CRM & Custom Systems card on /services. Square master, 1254x1254.',
  },
  'create-service-seo': {
    image: serviceSeoPerformance,
    decorative: true,
    routes: ['/services'],
    fit: 'contain',
    filename: 'service-seo-performance.png',
    note: 'SEO & Performance card on /services. Square master, 1254x1254.',
  },
  'create-service-hosting': {
    image: serviceHostingMaintenance,
    decorative: true,
    routes: ['/services'],
    fit: 'contain',
    filename: 'service-hosting-maintenance.png',
    note: 'Hosting & Maintenance card on /services. Square master, 1254x1254.',
  },
  // The master carries an intentional near-black background rather than an
  // alpha channel, matching the card's own #0B0B0E so the artwork reads as
  // part of the card. No transparency is required or expected here.
  'create-service-branding': {
    image: serviceDigitalBranding,
    decorative: true,
    routes: ['/services'],
    fit: 'contain',
    filename: 'service-digital-branding.png',
    note: 'Digital Branding card on /services. Square master, 1254x1254, near-black background by design.',
  },

  /* --- case-study imagery ------------------------------------------------
   * These communicate real client work, so each carries meaningful alt text
   * describing what is actually on screen.
   *
   * A project's primary asset is intentionally shared between its card in the
   * /work grid and the lead band on its own case-study page, so no `routes`
   * scoping is applied — both placements are approved and visible. The detail
   * asset appears only on the case-study page.
   *
   * `fit: 'contain'` throughout: the masters range from 2.39:1 to 0.80:1 while
   * the boxes range from 2.48:1 to 1.10:1, so `cover` would crop through
   * devices and screens. The placement's own dark background fills the rest.
   */
  'luxury-listings-dr-case-study': {
    image: luxuryListingsPrimary,
    alt: 'The Luxury Listings DR homepage on a laptop and phone, showing the luxury real estate hero and property search.',
    decorative: false,
    fit: 'contain',
    widths: PRIMARY_WIDTHS,
    sizes: PRIMARY_SIZES,
    filename: 'case-study-luxury-listings-dr-primary.png',
    note: 'Luxury Listings DR primary — /work card and case-study lead band. 1915x821.',
  },
  'luxury-listings-dr-case-study-detail': {
    image: luxuryListingsDetail,
    alt: 'Luxury Listings DR property search and market insight pages across laptop and phone screens.',
    decorative: false,
    fit: 'contain',
    widths: DETAIL_WIDTHS,
    sizes: DETAIL_SIZES,
    filename: 'case-study-luxury-listings-dr-detail.png',
    note: 'Luxury Listings DR detail — case-study secondary media. 1122x1402.',
  },
  'joan-leonardo-case-study': {
    image: joanLeonardoPrimary,
    alt: 'The Joan Leonardo & Asociados homepage on a laptop and phone, with the practice headline and introduction.',
    decorative: false,
    fit: 'contain',
    widths: PRIMARY_WIDTHS,
    sizes: PRIMARY_SIZES,
    filename: 'case-study-joan-leonardo-primary.png',
    note: 'Joan Leonardo primary — /work card and case-study lead band. 1915x821.',
  },
  'joan-leonardo-case-study-detail': {
    image: joanLeonardoDetail,
    alt: 'Joan Leonardo & Asociados services and legal news pages shown on laptop and phone screens.',
    decorative: false,
    fit: 'contain',
    widths: DETAIL_WIDTHS,
    sizes: DETAIL_SIZES,
    filename: 'case-study-joan-leonardo-detail.png',
    note: 'Joan Leonardo detail — case-study secondary media. 1254x1254.',
  },
  'custom-real-estate-crm-case-study': {
    image: customCrmPrimary,
    alt: 'The Custom Real Estate CRM dashboard and reporting views shown on two laptops.',
    decorative: false,
    fit: 'contain',
    widths: PRIMARY_WIDTHS,
    sizes: PRIMARY_SIZES,
    filename: 'case-study-custom-real-estate-crm-primary.png',
    note: 'Custom Real Estate CRM primary — /work card and case-study lead band. 1915x821.',
  },
  'custom-real-estate-crm-case-study-detail': {
    image: customCrmDetail,
    alt: 'Custom Real Estate CRM calendar and commission tracking views on laptop screens.',
    decorative: false,
    fit: 'contain',
    widths: DETAIL_WIDTHS,
    sizes: DETAIL_SIZES,
    filename: 'case-study-custom-real-estate-crm-detail.png',
    note: 'Custom Real Estate CRM detail — case-study secondary media. 1122x1402.',
  },
  'create-studio-case-study': {
    image: createStudioPrimary,
    alt: 'The Create Studio homepage on a laptop and phone, showing the Ideas that move business forward hero.',
    decorative: false,
    fit: 'contain',
    widths: PRIMARY_WIDTHS,
    sizes: PRIMARY_SIZES,
    filename: 'case-study-create-studio-primary.png',
    note: 'Create Studio primary — /work card and case-study lead band. 1939x811.',
  },
  'create-studio-case-study-detail': {
    image: createStudioDetail,
    alt: 'The Create Studio pricing and process pages on a laptop and phone.',
    decorative: false,
    fit: 'contain',
    widths: DETAIL_WIDTHS,
    sizes: DETAIL_SIZES,
    filename: 'case-study-create-studio-detail.png',
    note: 'Create Studio detail — case-study secondary media. 1448x1086.',
  },
};

/**
 * Resolve a placement id to its registry entry. Repeated placements of the same
 * artwork on one page are suffixed (`-2`, `-3`) and fall back to the base entry.
 */
export function resolveArtwork(id: string): ArtworkEntry | undefined {
  return ARTWORK[id] ?? ARTWORK[id.replace(/-\d+$/, '')];
}
