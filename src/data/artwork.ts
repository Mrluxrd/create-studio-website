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

import servicesHeroDeviceCluster from '../assets/hero/services-hero-device-cluster-1600x1200.png';

import serviceWebDesignDevelopment from '../assets/services/service-web-design-development-1030x663.png';
import serviceWebsiteRedesign from '../assets/services/service-website-redesign-1050x524.png';
import serviceCrmCustomSystems from '../assets/services/service-crm-custom-systems-1050x524.png';
import serviceSeoPerformance from '../assets/services/service-seo-performance-1050x524.png';
import serviceHostingMaintenance from '../assets/services/service-hosting-maintenance-1050x524.png';
import serviceDigitalBranding from '../assets/services/service-digital-branding-1050x524.png';

import homepageLuxuryListings from '../assets/work/homepage-luxury-listings-dr-990x303.png';
import homepageJoanLeonardo from '../assets/work/homepage-joan-leonardo-990x303.png';
import homepageCustomCrm from '../assets/work/homepage-custom-real-estate-crm-990x303.png';
import homepageCreateStudioFeatured from '../assets/work/homepage-create-studio-featured-1420x1523.png';

import workLuxuryListings from '../assets/work/work-luxury-listings-dr-830x469.png';
import workJoanLeonardo from '../assets/work/work-joan-leonardo-830x469.png';
import workCustomCrm from '../assets/work/work-custom-real-estate-crm-830x469.png';
import workCreateStudioFeatured from '../assets/work/work-create-studio-featured-2590x1112.png';

import luxuryListingsPrimary from '../assets/work/case-study-luxury-listings-dr-primary-2590x1043.png';
import luxuryListingsDetail from '../assets/work/case-study-luxury-listings-dr-detail-1240x1128.png';
import joanLeonardoPrimary from '../assets/work/case-study-joan-leonardo-primary-2590x1043.png';
import joanLeonardoDetail from '../assets/work/case-study-joan-leonardo-detail-1240x1128.png';
import customCrmPrimary from '../assets/work/case-study-custom-real-estate-crm-primary-2590x1043.png';
import customCrmDetail from '../assets/work/case-study-custom-real-estate-crm-detail-1240x1128.png';
import createStudioPrimary from '../assets/work/case-study-create-studio-primary-2590x1043.png';
import createStudioDetail from '../assets/work/case-study-create-studio-detail-1240x1128.png';

/**
 * Variant widths per placement family. Each family now has its own master cut
 * to the measured box, so the `sizes` hint describes that one box rather than
 * trying to cover several placements at once.
 */
const PRIMARY_WIDTHS = [400, 700, 1100, 1440];
const PRIMARY_SIZES = '(max-width: 900px) 92vw, 1300px';
const DETAIL_WIDTHS = [360, 620, 900];
const DETAIL_SIZES = '(max-width: 900px) 92vw, 620px';
/** Homepage portfolio cards: 496px standard, 708px featured, full width below 900px. */
const HOME_CARD_WIDTHS = [320, 520, 760, 1000];
const HOME_CARD_SIZES = '(max-width: 900px) 92vw, 500px';
const HOME_FEATURED_WIDTHS = [360, 620, 900, 1420];
const HOME_FEATURED_SIZES = '(max-width: 900px) 92vw, 710px';
/** /work grid cards top out at 880px wide; the featured band at 1296px. */
const WORK_CARD_WIDTHS = [320, 520, 830];
const WORK_CARD_SIZES = '(max-width: 900px) 92vw, 480px';

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
  // The /services hero device cluster, top-right, desktop only. The approved
  // markup reserves this box with an outlined SVG placeholder; the stylesheet
  // hides that placeholder once a real asset renders, so the two never stack.
  'create-service-web': {
    image: servicesHeroDeviceCluster,
    decorative: true,
    routes: ['/services'],
    fit: 'contain',
    widths: [320, 520, 800, 1600],
    sizes: '(max-width: 900px) 38vw, 520px',
    filename: 'services-hero-device-cluster-1600x1200.png',
    note: 'Services hero device cluster — monitor, tablet and phone. Transparent 1600x1200 master.',
  },
  // The Web Design & Development *card* on /services.
  'create-service-web-2': {
    image: serviceWebDesignDevelopment,
    decorative: true,
    routes: ['/services'],
    fit: 'contain',
    filename: 'service-web-design-development-1030x663.png',
    note: 'Web Design & Development card on /services. Cut to the 516x332 box at 2x.',
  },
  'create-service-redesign': {
    image: serviceWebsiteRedesign,
    decorative: true,
    routes: ['/services'],
    fit: 'contain',
    filename: 'service-website-redesign-1050x524.png',
    note: 'Website Redesign card on /services. Cut to the 525x262 box at 2x.',
  },
  'create-service-crm': {
    image: serviceCrmCustomSystems,
    decorative: true,
    routes: ['/services'],
    fit: 'contain',
    filename: 'service-crm-custom-systems-1050x524.png',
    note: 'CRM & Custom Systems card on /services. Cut to the 525x262 box at 2x.',
  },
  'create-service-seo': {
    image: serviceSeoPerformance,
    decorative: true,
    routes: ['/services'],
    fit: 'contain',
    filename: 'service-seo-performance-1050x524.png',
    note: 'SEO & Performance card on /services. Cut to the 525x262 box at 2x.',
  },
  'create-service-hosting': {
    image: serviceHostingMaintenance,
    decorative: true,
    routes: ['/services'],
    fit: 'contain',
    filename: 'service-hosting-maintenance-1050x524.png',
    note: 'Hosting & Maintenance card on /services. Cut to the 525x262 box at 2x.',
  },
  // The master carries an intentional near-black background rather than an
  // alpha channel, matching the card's own #0B0B0E so the artwork reads as
  // part of the card. No transparency is required or expected here.
  'create-service-branding': {
    image: serviceDigitalBranding,
    decorative: true,
    routes: ['/services'],
    fit: 'contain',
    filename: 'service-digital-branding-1050x524.png',
    note: 'Digital Branding card on /services. Cut to the 525x262 box at 2x, designed background by intent.',
  },

  /* --- homepage portfolio preview ----------------------------------------
   * Each project now has a master cut to the homepage box rather than sharing
   * the wide case-study asset, because the three boxes a project appears in
   * are shaped very differently: 3.27:1 on the homepage standard cards, 0.93:1
   * on the homepage featured card, 1.77:1 in the /work grid and 2.48:1 on the
   * case-study lead band. One file cannot fill all of them.
   */
  'homepage-create-studio-featured': {
    image: homepageCreateStudioFeatured,
    alt: 'The Create Studio pricing page on a laptop and phone, showing the written-scope packages.',
    decorative: false,
    fit: 'contain',
    widths: HOME_FEATURED_WIDTHS,
    sizes: HOME_FEATURED_SIZES,
    filename: 'homepage-create-studio-featured-1420x1523.png',
    note: 'Create Studio featured card on the homepage. Cut to the 708x760 box at 2x.',
  },
  'homepage-luxury-listings-dr': {
    image: homepageLuxuryListings,
    alt: 'The Luxury Listings DR homepage on a laptop and phone, showing the luxury real estate hero and property search.',
    decorative: false,
    fit: 'contain',
    widths: HOME_CARD_WIDTHS,
    sizes: HOME_CARD_SIZES,
    filename: 'homepage-luxury-listings-dr-990x303.png',
    note: 'Luxury Listings DR standard card on the homepage. Cut to the 496x152 box at 2x.',
  },
  'homepage-joan-leonardo': {
    image: homepageJoanLeonardo,
    alt: 'The Joan Leonardo & Asociados homepage on a laptop and phone, with the practice headline and introduction.',
    decorative: false,
    fit: 'contain',
    widths: HOME_CARD_WIDTHS,
    sizes: HOME_CARD_SIZES,
    filename: 'homepage-joan-leonardo-990x303.png',
    note: 'Joan Leonardo standard card on the homepage. Cut to the 496x152 box at 2x.',
  },
  'homepage-custom-real-estate-crm': {
    image: homepageCustomCrm,
    alt: 'The Custom Real Estate CRM dashboard and reporting views shown on two laptops.',
    decorative: false,
    fit: 'contain',
    widths: HOME_CARD_WIDTHS,
    sizes: HOME_CARD_SIZES,
    filename: 'homepage-custom-real-estate-crm-990x303.png',
    note: 'Custom Real Estate CRM standard card on the homepage. Cut to the 496x152 box at 2x.',
  },

  /* --- /work grid --------------------------------------------------------- */
  'work-create-studio-featured': {
    image: workCreateStudioFeatured,
    alt: 'The Create Studio pricing page on a laptop and phone, showing the written-scope packages.',
    decorative: false,
    fit: 'contain',
    widths: PRIMARY_WIDTHS,
    sizes: PRIMARY_SIZES,
    filename: 'work-create-studio-featured-2590x1112.png',
    note: 'Create Studio featured band on /work. Cut to the 1296x557 box at 2x.',
  },
  'work-luxury-listings-dr': {
    image: workLuxuryListings,
    alt: 'The Luxury Listings DR homepage on a laptop and phone, showing the luxury real estate hero and property search.',
    decorative: false,
    fit: 'contain',
    widths: WORK_CARD_WIDTHS,
    sizes: WORK_CARD_SIZES,
    filename: 'work-luxury-listings-dr-830x469.png',
    note: 'Luxury Listings DR grid card on /work. Cut to the 415x234 box at 2x.',
  },
  'work-joan-leonardo': {
    image: workJoanLeonardo,
    alt: 'The Joan Leonardo & Asociados homepage on a laptop and phone, with the practice headline and introduction.',
    decorative: false,
    fit: 'contain',
    widths: WORK_CARD_WIDTHS,
    sizes: WORK_CARD_SIZES,
    filename: 'work-joan-leonardo-830x469.png',
    note: 'Joan Leonardo grid card on /work. Cut to the 415x234 box at 2x.',
  },
  'work-custom-real-estate-crm': {
    image: workCustomCrm,
    alt: 'The Custom Real Estate CRM dashboard and reporting views shown on two laptops.',
    decorative: false,
    fit: 'contain',
    widths: WORK_CARD_WIDTHS,
    sizes: WORK_CARD_SIZES,
    filename: 'work-custom-real-estate-crm-830x469.png',
    note: 'Custom Real Estate CRM grid card on /work. Cut to the 415x234 box at 2x.',
  },

  /* --- case-study imagery ------------------------------------------------
   * These communicate real client work, so each carries meaningful alt text
   * describing what is actually on screen.
   *
   * These ids now serve the case-study routes only — the homepage and /work
   * placements have their own masters above, cut to their own boxes.
   *
   * `fit: 'contain'` throughout, and every master is a transparent PNG whose
   * canvas matches its box, so the placement's own dark background reads as
   * the surround rather than a second panel.
   */
  'luxury-listings-dr-case-study': {
    image: luxuryListingsPrimary,
    alt: 'The Luxury Listings DR homepage on a laptop and phone, showing the luxury real estate hero and property search.',
    decorative: false,
    fit: 'contain',
    widths: PRIMARY_WIDTHS,
    sizes: PRIMARY_SIZES,
    filename: 'case-study-luxury-listings-dr-primary-2590x1043.png',
    note: 'Luxury Listings DR lead band on /work/luxury-listings-dr. Cut to the 1296x522 box at 2x.',
  },
  'luxury-listings-dr-case-study-detail': {
    image: luxuryListingsDetail,
    alt: 'Luxury Listings DR property search and market insight pages across laptop and phone screens.',
    decorative: false,
    fit: 'contain',
    widths: DETAIL_WIDTHS,
    sizes: DETAIL_SIZES,
    filename: 'case-study-luxury-listings-dr-detail-1240x1128.png',
    note: 'Luxury Listings DR detail — case-study secondary media. Cut to the 618x562 box at 2x.',
  },
  'joan-leonardo-case-study': {
    image: joanLeonardoPrimary,
    alt: 'The Joan Leonardo & Asociados homepage on a laptop and phone, with the practice headline and introduction.',
    decorative: false,
    fit: 'contain',
    widths: PRIMARY_WIDTHS,
    sizes: PRIMARY_SIZES,
    filename: 'case-study-joan-leonardo-primary-2590x1043.png',
    note: 'Joan Leonardo lead band on /work/joan-leonardo. Cut to the 1296x522 box at 2x.',
  },
  'joan-leonardo-case-study-detail': {
    image: joanLeonardoDetail,
    alt: 'Joan Leonardo & Asociados services and legal news pages shown on laptop and phone screens.',
    decorative: false,
    fit: 'contain',
    widths: DETAIL_WIDTHS,
    sizes: DETAIL_SIZES,
    filename: 'case-study-joan-leonardo-detail-1240x1128.png',
    note: 'Joan Leonardo detail — case-study secondary media. Cut to the 618x562 box at 2x.',
  },
  'custom-real-estate-crm-case-study': {
    image: customCrmPrimary,
    alt: 'The Custom Real Estate CRM dashboard and reporting views shown on two laptops.',
    decorative: false,
    fit: 'contain',
    widths: PRIMARY_WIDTHS,
    sizes: PRIMARY_SIZES,
    filename: 'case-study-custom-real-estate-crm-primary-2590x1043.png',
    note: 'Custom Real Estate CRM lead band on /work/custom-real-estate-crm. Cut to the 1296x522 box at 2x.',
  },
  'custom-real-estate-crm-case-study-detail': {
    image: customCrmDetail,
    alt: 'Custom Real Estate CRM calendar and commission tracking views on laptop screens.',
    decorative: false,
    fit: 'contain',
    widths: DETAIL_WIDTHS,
    sizes: DETAIL_SIZES,
    filename: 'case-study-custom-real-estate-crm-detail-1240x1128.png',
    note: 'Custom Real Estate CRM detail — case-study secondary media. Cut to the 618x562 box at 2x.',
  },
  'create-studio-case-study': {
    image: createStudioPrimary,
    alt: 'The Create Studio pricing page on a laptop and phone, showing the written-scope packages.',
    decorative: false,
    fit: 'contain',
    widths: PRIMARY_WIDTHS,
    sizes: PRIMARY_SIZES,
    filename: 'case-study-create-studio-primary-2590x1043.png',
    note: 'Create Studio lead band on /work/create-studio. Cut to the 1296x522 box at 2x.',
  },
  'create-studio-case-study-detail': {
    image: createStudioDetail,
    alt: 'Create Studio service and package pages shown across a laptop, tablet and phone.',
    decorative: false,
    fit: 'contain',
    widths: DETAIL_WIDTHS,
    sizes: DETAIL_SIZES,
    filename: 'case-study-create-studio-detail-1240x1128.png',
    note: 'Create Studio detail — case-study secondary media. Cut to the 618x562 box at 2x.',
  },
};

/**
 * Resolve a placement id to its registry entry. Repeated placements of the same
 * artwork on one page are suffixed (`-2`, `-3`) and fall back to the base entry.
 */
export function resolveArtwork(id: string): ArtworkEntry | undefined {
  return ARTWORK[id] ?? ARTWORK[id.replace(/-\d+$/, '')];
}
