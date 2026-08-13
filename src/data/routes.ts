// Centralised route + metadata table. Generated from the approved Claude Design
// prototype; edit here rather than in individual pages.

export type PageKey =
  | 'home'
  | 'work'
  | 'work-luxury-listings-dr'
  | 'work-joan-leonardo'
  | 'work-custom-real-estate-crm'
  | 'work-create-studio'
  | 'services'
  | 'service-web-design-development'
  | 'service-website-redesign'
  | 'service-crm-custom-systems'
  | 'service-seo-performance'
  | 'service-hosting-maintenance'
  | 'service-digital-branding'
  | 'process'
  | 'pricing'
  | 'seo-growth-maintenance'
  | 'about'
  | 'contact'
  | 'privacy';

export interface RouteMeta {
  key: PageKey;
  /** Production path. */
  route: string;
  /** Which primary-nav item is highlighted for this route. */
  navActive: string;
  title: string;
  description: string;
  /** og:type — case studies are articles, everything else is a website page. */
  ogType: 'website' | 'article';
}

export const ROUTES: RouteMeta[] = [
  {
    key: 'home',
    route: '/',
    navActive: 'home',
    title: 'Create Studio — Ideas, designed to move business forward',
    description: 'Create Studio designs creative, strategic and custom websites for businesses in the Dominican Republic. Website packages from US$800, plus SEO growth and maintenance plans from US$100/month.',
    ogType: 'website',
  },
  {
    key: 'work',
    route: '/work',
    navActive: 'work',
    title: 'Selected Work — Create Studio',
    description: 'Four projects, four different problems. What connects them is the same insistence on clarity — in how a business is presented, and in how the thing actually works.',
    ogType: 'website',
  },
  {
    key: 'work-luxury-listings-dr',
    route: '/work/luxury-listings-dr',
    navActive: 'work',
    title: 'Luxury Listings DR — Luxury Real Estate Platform — Create Studio',
    description: 'Luxury property discovery, made visual and unhurried. In development. Web design, user experience and property-discovery structure by Create Studio.',
    ogType: 'article',
  },
  {
    key: 'work-joan-leonardo',
    route: '/work/joan-leonardo',
    navActive: 'work',
    title: 'Joan Leonardo — Legal Website — Create Studio',
    description: 'A legal practice presented with the composure its clients expect. Currently in development. Website redesign, content hierarchy and inquiry-flow refinement by Create Studio.',
    ogType: 'article',
  },
  {
    key: 'work-custom-real-estate-crm',
    route: '/work/custom-real-estate-crm',
    navActive: 'work',
    title: 'Custom Real Estate CRM — Custom Digital System — Create Studio',
    description: 'A purpose-built system designed around how a luxury real estate advisor manages relationships, properties, opportunities and follow-ups. Custom product design by Create Studio.',
    ogType: 'article',
  },
  {
    key: 'work-create-studio',
    route: '/work/create-studio',
    navActive: 'work',
    title: 'Create Studio — Studio Website and Digital Brand — Create Studio',
    description: 'Our own brand and website, built as one system — the clearest statement of how we think about design, technology and commercial intent. An internal studio project in development.',
    ogType: 'article',
  },
  {
    key: 'services',
    route: '/services',
    navActive: 'services',
    title: 'Services — Create Studio',
    description: 'Web design and development, website redesign, CRM and custom systems, SEO and performance, hosting and maintenance, and digital branding — from a studio in the Dominican Republic.',
    ogType: 'website',
  },
  {
    key: 'service-web-design-development',
    route: '/services/web-design-development',
    navActive: 'services',
    title: 'Web Design & Development — Create Studio',
    description: 'Custom web design and development for Dominican businesses: strategy-led design, responsive build, performance, accessibility and scalable foundations. Packages from US$800.',
    ogType: 'website',
  },
  {
    key: 'service-website-redesign',
    route: '/services/website-redesign',
    navActive: 'services',
    title: 'Website Redesign — Create Studio',
    description: 'Website redesign for Dominican businesses: clearer positioning, modernised design, reorganised content, better mobile experience and stronger conversion paths.',
    ogType: 'website',
  },
  {
    key: 'service-crm-custom-systems',
    route: '/services/crm-custom-systems',
    navActive: 'services',
    title: 'CRM & Custom Systems — Create Studio',
    description: 'Custom CRM and business systems: dashboards, contact databases, pipelines, calendars, commissions, reporting, automations, integrations and role-based access.',
    ogType: 'website',
  },
  {
    key: 'service-seo-performance',
    route: '/services/seo-performance',
    navActive: 'services',
    title: 'SEO & Performance — Create Studio',
    description: 'Technical and on-page SEO, site structure, indexing, metadata, schema, speed optimization, Core Web Vitals, analytics and ongoing reporting.',
    ogType: 'website',
  },
  {
    key: 'service-hosting-maintenance',
    route: '/services/hosting-maintenance',
    navActive: 'services',
    title: 'Hosting & Maintenance — Create Studio',
    description: 'Managed hosting, SSL, backups, uptime monitoring, security checks, technical maintenance, minor content changes and support. Plans from US$100/month.',
    ogType: 'website',
  },
  {
    key: 'service-digital-branding',
    route: '/services/digital-branding',
    navActive: 'services',
    title: 'Digital Branding — Create Studio',
    description: 'Brand strategy, positioning, visual direction, logo systems, colour palettes, typography, digital brand guidelines and social-media direction.',
    ogType: 'website',
  },
  {
    key: 'process',
    route: '/process',
    navActive: 'process',
    title: 'Process — Create Studio',
    description: 'How a Create Studio project runs: Discovery, Visual Direction, Design & Development, Review and Launch. Timeline confirmed after discovery and scope approval.',
    ogType: 'website',
  },
  {
    key: 'pricing',
    route: '/pricing',
    navActive: 'pricing',
    title: 'Pricing — Create Studio',
    description: 'Website packages from US$800 to US$1,500, custom quotes for advanced projects, and monthly SEO growth and maintenance plans from US$100/month.',
    ogType: 'website',
  },
  {
    key: 'seo-growth-maintenance',
    route: '/seo-growth-maintenance',
    navActive: 'pricing',
    title: 'SEO Growth & Maintenance Plans — Create Studio',
    description: 'Three monthly plans for technical care, SEO improvement and strategic support: Essential Care from US$100, Growth from US$200 and Growth Pro from US$350 per month.',
    ogType: 'website',
  },
  {
    key: 'about',
    route: '/about',
    navActive: 'about',
    title: 'About — Create Studio',
    description: 'Create Studio is a digital studio in the Dominican Republic designing creative, strategic and custom websites. Design with intention. Technology with purpose.',
    ogType: 'website',
  },
  {
    key: 'contact',
    route: '/contact',
    navActive: 'contact',
    title: 'Contact — Create Studio',
    description: 'Tell Create Studio what you want to achieve and receive a personalized proposal with scope, timeline and investment. Oscar Lauzardo, +1 829.778.6137.',
    ogType: 'website',
  },
  {
    key: 'privacy',
    route: '/privacy',
    navActive: '',
    title: 'Privacy Policy — Create Studio',
    description: 'How Create Studio collects, uses and protects information submitted through this website.',
    ogType: 'website',
  },
];

export const ROUTE_BY_KEY: Record<PageKey, RouteMeta> = Object.fromEntries(
  ROUTES.map((r) => [r.key, r]),
) as Record<PageKey, RouteMeta>;

/** Fixed case-study order — drives previous / next navigation. */
export const CASE_STUDY_ORDER: PageKey[] = [
  'work-luxury-listings-dr',
  'work-joan-leonardo',
  'work-custom-real-estate-crm',
  'work-create-studio',
];
