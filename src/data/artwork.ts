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

export interface ArtworkEntry {
  /** Path under /public. Leave empty until the final asset is supplied. */
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

  /* --- service artwork -------------------------------------------------- */
  'create-service-web': {
    decorative: true,
    filename: 'create-service-web-design-development.webp',
    note: 'Web Design & Development service artwork.',
  },
  'create-service-redesign': {
    decorative: true,
    filename: 'create-service-website-redesign.webp',
    note: 'Website Redesign service artwork.',
  },
  'create-service-crm': {
    decorative: true,
    filename: 'create-service-crm-custom-systems.webp',
    note: 'CRM & Custom Systems service artwork.',
  },
  'create-service-seo': {
    decorative: true,
    filename: 'create-service-seo-performance.webp',
    note: 'SEO & Performance service artwork.',
  },
  'create-service-hosting': {
    decorative: true,
    filename: 'create-service-hosting-maintenance.webp',
    note: 'Hosting & Maintenance service artwork.',
  },
  'create-service-branding': {
    decorative: true,
    filename: 'create-service-digital-branding.webp',
    note: 'Digital Branding service artwork.',
  },

  /* --- case-study imagery ------------------------------------------------ */
  // These communicate real project work, so they take meaningful alt text
  // once the client-approved screenshots are supplied.
  'luxury-listings-dr-case-study': {
    decorative: false,
    filename: 'work-luxury-listings-dr-card.webp',
    note: 'Luxury Listings DR — 16:9 card crop, focal centre-right.',
  },
  'luxury-listings-dr-case-study-detail': {
    decorative: false,
    filename: 'work-luxury-listings-dr-detail.webp',
    note: 'Luxury Listings DR — case-study detail image.',
  },
  'joan-leonardo-case-study': {
    decorative: false,
    filename: 'work-joan-leonardo-card.webp',
    note: 'Joan Leonardo — 16:9 card crop.',
  },
  'joan-leonardo-case-study-detail': {
    decorative: false,
    filename: 'work-joan-leonardo-detail.webp',
    note: 'Joan Leonardo — case-study detail image.',
  },
  'custom-real-estate-crm-case-study': {
    decorative: false,
    filename: 'work-custom-real-estate-crm-card.webp',
    note: 'Custom Real Estate CRM — 16:9 card crop.',
  },
  'custom-real-estate-crm-case-study-detail': {
    decorative: false,
    filename: 'work-custom-real-estate-crm-detail.webp',
    note: 'Custom Real Estate CRM — case-study detail image.',
  },
  'create-studio-case-study': {
    decorative: false,
    filename: 'work-create-studio-card.webp',
    note: 'Create Studio — 21:9 card crop.',
  },
  'create-studio-case-study-detail': {
    decorative: false,
    filename: 'work-create-studio-detail.webp',
    note: 'Create Studio — case-study detail image.',
  },
};

/**
 * Resolve a placement id to its registry entry. Repeated placements of the same
 * artwork on one page are suffixed (`-2`, `-3`) and fall back to the base entry.
 */
export function resolveArtwork(id: string): ArtworkEntry | undefined {
  return ARTWORK[id] ?? ARTWORK[id.replace(/-\d+$/, '')];
}
