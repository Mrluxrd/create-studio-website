# Create Studio — production website

Production implementation of the approved Create Studio prototype from Claude Design.

The prototype (`design-source/Create Studio Full Site.dc.html`) remains the definitive
design reference. Page markup, copy, typography, colour, spacing, pricing, packages,
project order and interactions were carried across as-is; only routing, event binding
and delivery concerns were reimplemented for production.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | [Astro](https://astro.build) 5, `output: 'static'` |
| Rendering | Pre-rendered HTML per route — no client framework, no hydration |
| Styling | The prototype's own stylesheet (`src/styles/prototype.css`), carried over verbatim, plus `src/styles/production.css` |
| Client JS | One vanilla module (`src/scripts/site.js`) — ribbon, reveals, nav, filter, form |
| Sitemap | `@astrojs/sitemap` |

No CSS framework, no UI library, no state manager. Runtime dependencies: none.

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # -> dist/
npm run preview   # serve dist/
```

## Verification

Two Playwright harnesses back the manual review. Both take the base URL of a
running server (`npm run preview` on `http://localhost:4322` is the intended
target — verify the production build, not the dev server).

```bash
node scripts/verify-routes.mjs desktop            # also: tablet | mobile
node scripts/verify-behaviour.mjs http://localhost:4322
```

`verify-routes.mjs` loads every route in both the prototype and the production
build and compares document height, horizontal overflow, ribbon strand count,
heading count and console errors. It needs the prototype served alongside — see
the comment at the top of the file.

`verify-behaviour.mjs` covers the ribbon's scroll response in both directions,
initialisation after refresh at a restored scroll position, reduced motion,
keyboard access, the mobile menu, every contact-form state, contact prefill
parameters, every navigation target, case-study routing, browser back/forward,
anchor offsets and the 404 fallback.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/work` | Selected Work |
| `/work/luxury-listings-dr` | Luxury Listings DR |
| `/work/joan-leonardo` | Joan Leonardo |
| `/work/custom-real-estate-crm` | Custom Real Estate CRM |
| `/work/create-studio` | Create Studio |
| `/services` | Services |
| `/services/web-design-development` | Web Design & Development |
| `/services/website-redesign` | Website Redesign |
| `/services/crm-custom-systems` | CRM & Custom Systems |
| `/services/seo-performance` | SEO & Performance |
| `/services/hosting-maintenance` | Hosting & Maintenance |
| `/services/digital-branding` | Digital Branding |
| `/process` | Process |
| `/pricing` | Pricing |
| `/seo-growth-maintenance` | SEO Growth & Maintenance Plans |
| `/about` | About |
| `/contact` | Contact |
| `/privacy` | Privacy Policy |
| `/404` | Fallback for invalid routes |

Route paths, titles and descriptions live in one place: `src/data/routes.ts`.

## Where things live

```
src/
  data/routes.ts      route table + per-page title/description/og:type
  data/site.ts        production origin, contact details, social image
  data/artwork.ts     central artwork registry — one entry per image placement
  data/forms.ts       contact form delivery endpoint
  layouts/Base.astro  <head>, metadata, structured data, page shell
  components/         Header, MobileMenu, Footer, Artwork
  pages/              one file per route, markup carried from the prototype
  scripts/site.js     ribbon, reveals, navigation, work filter, contact form
  styles/             prototype.css (verbatim) + production.css (additions only)
```

## The ribbon

The blue-and-violet ribbon is generated per route from its own waypoint set and
thickness configuration in `src/scripts/site.js` (`ribbonWaypoints`,
`ribbonCfg`) — the same data the approved prototype used. Every route keeps its
own path, placement, curves, folds, layer arrangement, thickness progression and
scroll timing.

- Scroll-linked: strands reveal further along the path as you scroll down and
  retract as you scroll up, measured against **that page's own length**.
- Wide and layered near the top, progressively thinner and more restrained
  further down, resolving into a single luminous strand at the closing slogan.
- Gradient and illumination keep moving when scrolling pauses.
- A generated mask keeps it clear of text, forms, buttons, navigation and media.
- Decorative: `aria-hidden="true"` and `pointer-events: none`.
- `prefers-reduced-motion: reduce` resolves it to the approved static
  composition and stops the animation frame loop entirely.

## Artwork placements

Every approved placement keeps its page, section, container dimensions, aspect
ratio, position, responsive behaviour and layering. Placements that have no
final asset yet keep their approved temporary presentation.

To supply a final asset:

1. Drop the file in `public/artwork/` using the descriptive filename listed in
   `src/data/artwork.ts`.
2. Fill in `src`, `width`, `height` and — where the image carries meaning —
   `alt` on that entry.

Nothing else changes. The reserved box is already the right size, so adding an
asset cannot shift the layout. Decorative entries render with `alt=""` and
`aria-hidden`; meaningful ones (the case-study imagery) take real alt text.

The homepage hero mockup is already approved and placed inline in the homepage
markup. It is listed in the registry for reference only and is never re-rendered
from it.

Handoff annotations (aspect ratios, "final artwork supplied separately") are
still in the markup but hidden from visitors and assistive technology. To review
them, set `data-art-notes="show"` on the `<html>` element.

## Configuration required before deployment

Copy `.env.example` to `.env` (or set these in the host's environment):

| Variable | Purpose | Status |
| --- | --- | --- |
| `PUBLIC_SITE_ORIGIN` | Confirmed production domain. Drives canonical URLs, Open Graph URLs, `robots.txt` and the sitemap. | **Required** — still the placeholder |
| `PUBLIC_CONTACT_ENDPOINT` | Where the contact form posts. Any service accepting a `multipart/form-data` POST and answering 2xx. | **Required** — not yet connected |

Also outstanding:

- `public/social/create-studio-og.jpg` — 1200×630 social sharing image.
- Social profile URLs. `sameAs` is deliberately omitted from the structured data
  until Instagram and LinkedIn addresses are confirmed.
- Privacy Policy sections marked `[To supply]` in the approved copy.

Nothing in this repository is a secret; every configuration value above ships to
the browser by design. Never add API keys, SMTP credentials or tokens to `.env`
or to any file under `src/`.

## Contact form

Client-side validation (required fields, email format, per-field messages, error
summary, focus management), loading and disabled submit states, an approved
success state and an approved failure state. A hidden honeypot field
(`company_website`) is stripped before submission.

Until `PUBLIC_CONTACT_ENDPOINT` is set the form validates normally and shows its
"That did not send." state — it never reports a delivery that did not happen.

CRM call-to-action links pass `?service=crm-custom-systems`; website and plan
calls to action pass `?package=…`. Both prefill the form on arrival.

## Notes on differences from the prototype preview

- The prototype used hash routes (`#/work-joan-leonardo`) so all nineteen pages
  could be reviewed in one file. Production serves real routes.
- The prototype's preview runtime wrapped the header in an element that stopped
  `position: sticky` from taking effect. Production honours the header's declared
  `position: sticky; top: 0`, which is what the design specifies (translucent
  background + `backdrop-filter`).
