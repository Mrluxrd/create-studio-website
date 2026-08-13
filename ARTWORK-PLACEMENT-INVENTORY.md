# Artwork & media placement inventory

Branch `claude/create-studio-production-99p5hf`. Generated from the built production
output and measured in a real browser at **1440×900** and **390×844** — geometry and
visibility below are observed, not inferred from the stylesheet.

**46 placements across 18 routes. 45 are empty; 1 carries a supplied asset.**

## How to fill a placement

Every placement is wired to one central registry entry in `src/data/artwork.ts`.
Drop the file into `public/artwork/`, then set `src`, `width`, `height` and — for
anything that carries meaning rather than decoration — `alt` on that entry. The
reserved box already has the right dimensions, so nothing shifts. Nothing else needs
editing: `src/components/Artwork.astro` renders the image into every slot that shares
the id, on every route at once.

Placements marked **retired in the approved design** are present in the markup and
reserved, but the approved stylesheet hides them (`[data-art-slot][data-art]:not([data-art=""]) { display: none }`).
Supplying an asset for one of those will not make it appear without a separate design
decision to un-hide it — flagged here so nothing is commissioned by mistake.

## Summary by asset

| Asset id | Placements | Routes | Reused | Expects | Registry filename |
| --- | --- | --- | --- | --- | --- |
| `create-contact-expansion` | 13 | 13 | Yes — 13 routes | Decorative artwork | `create-contact-expansion.webp` |
| `create-service-seo` | 3 | 3 | Yes — 3 routes | Decorative artwork | `create-service-seo-performance.webp` |
| `create-service-web` | 3 | 2 | Yes — 2 routes | Decorative artwork | `create-service-web-design-development.webp` |
| `create-about-gesture` | 2 | 2 | Yes — 2 routes | Decorative artwork | `create-about-gesture.webp` |
| `create-process-flow` | 2 | 2 | Yes — 2 routes | Decorative artwork | `create-process-flow.webp` |
| `create-service-branding` | 2 | 2 | Yes — 2 routes | Decorative artwork | `create-service-digital-branding.webp` |
| `create-service-crm` | 2 | 2 | Yes — 2 routes | Decorative artwork | `create-service-crm-custom-systems.webp` |
| `create-service-hosting` | 2 | 2 | Yes — 2 routes | Decorative artwork | `create-service-hosting-maintenance.webp` |
| `create-service-redesign` | 2 | 2 | Yes — 2 routes | Decorative artwork | `create-service-website-redesign.webp` |
| `create-studio-case-study` | 2 | 2 | Yes — 2 routes | Project screenshot / client work imagery | `work-create-studio-card.webp` |
| `custom-real-estate-crm-case-study` | 2 | 2 | Yes — 2 routes | Project screenshot / client work imagery | `work-custom-real-estate-crm-card.webp` |
| `joan-leonardo-case-study` | 2 | 2 | Yes — 2 routes | Project screenshot / client work imagery | `work-joan-leonardo-card.webp` |
| `luxury-listings-dr-case-study` | 2 | 2 | Yes — 2 routes | Project screenshot / client work imagery | `work-luxury-listings-dr-card.webp` |
| `create-hero-motion` | 1 | 1 | No — single route | Device mockup (supplied and placed) | `hero-mockup-luxury-listings.png` |
| `create-portfolio-accent` | 1 | 1 | No — single route | Decorative artwork | `create-portfolio-accent.webp` |
| `create-pricing-atmosphere` | 1 | 1 | No — single route | Decorative artwork | `create-pricing-atmosphere.webp` |
| `create-studio-case-study-detail` | 1 | 1 | No — single route | Project screenshot / client work imagery | `work-create-studio-detail.webp` |
| `custom-real-estate-crm-case-study-detail` | 1 | 1 | No — single route | Project screenshot / client work imagery | `work-custom-real-estate-crm-detail.webp` |
| `joan-leonardo-case-study-detail` | 1 | 1 | No — single route | Project screenshot / client work imagery | `work-joan-leonardo-detail.webp` |
| `luxury-listings-dr-case-study-detail` | 1 | 1 | No — single route | Project screenshot / client work imagery | `work-luxury-listings-dr-detail.webp` |

## By route

### `/`

Controlling file: `src/pages/index.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-hero-motion`

| Field | Value |
| --- | --- |
| Section | — |
| Belongs to | Ideas that movebusiness forward. |
| Status | **Filled** — approved asset in place |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Device mockup (supplied and placed) |
| Recommended ratio | matches the reserved box below |
| Desktop placement | 700×467px rendered (ratio 1.5:1), `position: absolute`, radius 0px |
| Mobile placement | 346×260px rendered (ratio 1.33:1), `position: relative` |
| Reused elsewhere | No — this route only |
| Fitting behaviour | `fill` (image present) |
| Alt-text handling | Meaningful — needs real alt text when the asset is supplied |
| Registry filename | `hero-mockup-luxury-listings.png` |

#### 2. `create-portfolio-accent`

| Field | Value |
| --- | --- |
| Section | Ideas that move business forward. |
| Belongs to | Different work. One standard. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | 21:9 desktop · 16:9 tablet · 3:2 mobile · low band · upper 55% reserved for heading Final artwork supplied separately |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:50px;transform:translateX(-50%);width:1180px;height:470px;b |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | No — this route only |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-portfolio-accent.webp` |
| Handoff note (hidden from visitors) | ARTWORK — SELECTED WORK Artwork Placeholder 21:9 desktop · 16:9 tablet · 3:2 mobile · low band · upper 55% reserved for heading Final artwork supplied separately |

#### 3. `create-process-flow`

| Field | Value |
| --- | --- |
| Section | Our process |
| Belongs to | Room to explore. A process that keeps things moving. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | 32:5 desktop · 21:9 tablet · 3:4 vertical mobile render required |
| Desktop placement | not rendered at 1440px — position:relative;height:210px;border-radius:24px;margin-bottom:-28px;overflow:hidden;back |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/process` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-process-flow.webp` |
| Handoff note (hidden from visitors) | ARTWORK — PROCESS FLOW 32:5 desktop · 21:9 tablet · 3:4 vertical mobile render required |

#### 4. `create-about-gesture`

| Field | Value |
| --- | --- |
| Section | About Create Studio |
| Belongs to | Your business has substance. Its digital presence should sho |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | 4:5 desktop right-bleed · 16:9 tablet · 4:3 mobile · left 30% must fall to #09090B |
| Desktop placement | not rendered at 1440px — position:relative;height:520px;border-radius:28px;overflow:hidden;background:#0B0B0E;borde |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-about-gesture.webp` |
| Handoff note (hidden from visitors) | ARTWORK — ABOUT 4:5 desktop right-bleed · 16:9 tablet · 4:3 mobile · left 30% must fall to #09090B |

#### 5. `create-contact-expansion`

| Field | Value |
| --- | --- |
| Section | About Create Studio |
| Belongs to | Tell us what you’re building. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:860px;height:860px |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about`, `/contact`, `/pricing`, `/process`, `/seo-growth-maintenance`, `/services`, `/services/crm-custom-systems`, `/services/digital-branding`, `/services/hosting-maintenance`, `/services/seo-performance`, `/services/web-design-development`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-contact-expansion.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CONTACT Artwork Placeholder 1:1 centred · core 40% reserved for headline · no internal shape animation Final artwork supplied separately |

### `/work`

Controlling file: `src/pages/work/index.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `luxury-listings-dr-case-study`

| Field | Value |
| --- | --- |
| Section | Portfolio |
| Belongs to | Luxury Listings DR |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Project screenshot / client work imagery |
| Recommended ratio | aspect-ratio 16/9 |
| Desktop placement | 415×234px rendered (ratio 1.77:1), `position: relative`, radius 0px |
| Mobile placement | 346×262px rendered (ratio 1.32:1), `position: relative` |
| Reused elsewhere | Yes — `/work`, `/work/luxury-listings-dr` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Meaningful — needs real alt text when the asset is supplied |
| Registry filename | `work-luxury-listings-dr-card.webp` |
| Handoff note (hidden from visitors) | ARTWORK — LUXURY LISTINGS DR CASE STUDY 16:9 card crop · focal centre-right |

#### 2. `joan-leonardo-case-study`

| Field | Value |
| --- | --- |
| Section | Portfolio |
| Belongs to | Joan Leonardo |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Project screenshot / client work imagery |
| Recommended ratio | aspect-ratio 16/9 |
| Desktop placement | 415×234px rendered (ratio 1.77:1), `position: relative`, radius 0px |
| Mobile placement | 346×262px rendered (ratio 1.32:1), `position: relative` |
| Reused elsewhere | Yes — `/work`, `/work/joan-leonardo` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Meaningful — needs real alt text when the asset is supplied |
| Registry filename | `work-joan-leonardo-card.webp` |
| Handoff note (hidden from visitors) | ARTWORK — JOAN LEONARDO CASE STUDY 16:9 card crop · focal left of centre |

#### 3. `custom-real-estate-crm-case-study`

| Field | Value |
| --- | --- |
| Section | Portfolio |
| Belongs to | Custom Real Estate CRM |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Project screenshot / client work imagery |
| Recommended ratio | aspect-ratio 16/9 |
| Desktop placement | 415×234px rendered (ratio 1.77:1), `position: relative`, radius 0px |
| Mobile placement | 346×262px rendered (ratio 1.32:1), `position: relative` |
| Reused elsewhere | Yes — `/work`, `/work/custom-real-estate-crm` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Meaningful — needs real alt text when the asset is supplied |
| Registry filename | `work-custom-real-estate-crm-card.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CUSTOM REAL ESTATE CRM CASE STUDY 16:9 card crop · convergence focal point |

#### 4. `create-studio-case-study`

| Field | Value |
| --- | --- |
| Section | Portfolio |
| Belongs to | Create Studio |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Project screenshot / client work imagery |
| Recommended ratio | aspect-ratio 21/9 |
| Desktop placement | 1296×557px rendered (ratio 2.33:1), `position: relative`, radius 0px |
| Mobile placement | 346×262px rendered (ratio 1.32:1), `position: relative` |
| Reused elsewhere | Yes — `/work`, `/work/create-studio` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Meaningful — needs real alt text when the asset is supplied |
| Registry filename | `work-create-studio-card.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CREATE STUDIO CASE STUDY 21:9 feature crop · focal centre |

### `/work/luxury-listings-dr`

Controlling file: `src/pages/work/luxury-listings-dr.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `luxury-listings-dr-case-study`

| Field | Value |
| --- | --- |
| Section | Case study · Luxury Real Estate Platform |
| Belongs to | Luxury Listings DR |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Project screenshot / client work imagery |
| Recommended ratio | 21:9 desktop · 16:9 tablet · 4:3 mobile · focal centre-right · lower third reserved · separate mobile render required |
| Desktop placement | 1296×522px rendered (ratio 2.48:1), `position: relative`, radius 26px |
| Mobile placement | 346×262px rendered (ratio 1.32:1), `position: relative` |
| Reused elsewhere | Yes — `/work`, `/work/luxury-listings-dr` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Meaningful — needs real alt text when the asset is supplied |
| Registry filename | `work-luxury-listings-dr-card.webp` |
| Handoff note (hidden from visitors) | ARTWORK — LUXURY LISTINGS DR CASE STUDY 21:9 desktop · 16:9 tablet · 4:3 mobile · focal centre-right · lower third reserved · separate mobile render required |

#### 2. `luxury-listings-dr-case-study-detail`

| Field | Value |
| --- | --- |
| Section | The solution |
| Belongs to | Built for discovery, aimed at enquiry. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Project screenshot / client work imagery |
| Recommended ratio | 4:5 desktop · 3:2 mobile · no text overlap |
| Desktop placement | 618×562px rendered (ratio 1.1:1), `position: relative`, radius 24px |
| Mobile placement | 346×262px rendered (ratio 1.32:1), `position: relative` |
| Reused elsewhere | No — this route only |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Meaningful — needs real alt text when the asset is supplied |
| Registry filename | `work-luxury-listings-dr-detail.webp` |
| Handoff note (hidden from visitors) | ARTWORK — LUXURY LISTINGS DR CASE STUDY — DETAIL Secondary crop of the same asset · 4:5 desktop · 3:2 mobile · no text overlap |

### `/work/joan-leonardo`

Controlling file: `src/pages/work/joan-leonardo.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `joan-leonardo-case-study`

| Field | Value |
| --- | --- |
| Section | Case study · Legal Website |
| Belongs to | Joan Leonardo |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Project screenshot / client work imagery |
| Recommended ratio | 21:9 desktop · 16:9 tablet · 4:3 mobile · focal left of centre · restrained composition |
| Desktop placement | 1296×522px rendered (ratio 2.48:1), `position: relative`, radius 26px |
| Mobile placement | 346×262px rendered (ratio 1.32:1), `position: relative` |
| Reused elsewhere | Yes — `/work`, `/work/joan-leonardo` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Meaningful — needs real alt text when the asset is supplied |
| Registry filename | `work-joan-leonardo-card.webp` |
| Handoff note (hidden from visitors) | ARTWORK — JOAN LEONARDO CASE STUDY 21:9 desktop · 16:9 tablet · 4:3 mobile · focal left of centre · restrained composition |

#### 2. `joan-leonardo-case-study-detail`

| Field | Value |
| --- | --- |
| Section | The solution |
| Belongs to | Fewer decisions for the visitor. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Project screenshot / client work imagery |
| Recommended ratio | 4:5 desktop · 3:2 mobile · no text overlap |
| Desktop placement | 618×562px rendered (ratio 1.1:1), `position: relative`, radius 24px |
| Mobile placement | 346×262px rendered (ratio 1.32:1), `position: relative` |
| Reused elsewhere | No — this route only |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Meaningful — needs real alt text when the asset is supplied |
| Registry filename | `work-joan-leonardo-detail.webp` |
| Handoff note (hidden from visitors) | ARTWORK — JOAN LEONARDO CASE STUDY — DETAIL Secondary crop of the same asset · 4:5 desktop · 3:2 mobile · no text overlap |

### `/work/custom-real-estate-crm`

Controlling file: `src/pages/work/custom-real-estate-crm.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `custom-real-estate-crm-case-study`

| Field | Value |
| --- | --- |
| Section | Case study · CRM & Custom Systems |
| Belongs to | Custom Real Estate CRM |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Project screenshot / client work imagery |
| Recommended ratio | 21:9 desktop · 4:5 tablet · 1:1 mobile · focal convergence point off-centre · separate mobile render required |
| Desktop placement | 1296×522px rendered (ratio 2.48:1), `position: relative`, radius 26px |
| Mobile placement | 346×262px rendered (ratio 1.32:1), `position: relative` |
| Reused elsewhere | Yes — `/work`, `/work/custom-real-estate-crm` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Meaningful — needs real alt text when the asset is supplied |
| Registry filename | `work-custom-real-estate-crm-card.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CUSTOM REAL ESTATE CRM CASE STUDY 21:9 desktop · 4:5 tablet · 1:1 mobile · focal convergence point off-centre · separate mobile render required |

#### 2. `custom-real-estate-crm-case-study-detail`

| Field | Value |
| --- | --- |
| Section | The solution |
| Belongs to | One place where the day makes sense. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Project screenshot / client work imagery |
| Recommended ratio | 4:5 desktop · 3:2 mobile · no text overlap |
| Desktop placement | 618×562px rendered (ratio 1.1:1), `position: relative`, radius 24px |
| Mobile placement | 346×262px rendered (ratio 1.32:1), `position: relative` |
| Reused elsewhere | No — this route only |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Meaningful — needs real alt text when the asset is supplied |
| Registry filename | `work-custom-real-estate-crm-detail.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CUSTOM REAL ESTATE CRM CASE STUDY — DETAIL Secondary crop of the same asset · 4:5 desktop · 3:2 mobile · no text overlap |

### `/work/create-studio`

Controlling file: `src/pages/work/create-studio.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-studio-case-study`

| Field | Value |
| --- | --- |
| Section | Case study · Brand & Digital Experience |
| Belongs to | Create Studio |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Project screenshot / client work imagery |
| Recommended ratio | 21:9 desktop · 16:9 tablet · 4:3 mobile · focal centre · separate mobile render required |
| Desktop placement | 1296×522px rendered (ratio 2.48:1), `position: relative`, radius 26px |
| Mobile placement | 346×262px rendered (ratio 1.32:1), `position: relative` |
| Reused elsewhere | Yes — `/work`, `/work/create-studio` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Meaningful — needs real alt text when the asset is supplied |
| Registry filename | `work-create-studio-card.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CREATE STUDIO CASE STUDY 21:9 desktop · 16:9 tablet · 4:3 mobile · focal centre · separate mobile render required |

#### 2. `create-studio-case-study-detail`

| Field | Value |
| --- | --- |
| Section | The solution |
| Belongs to | Every service in one continuous story. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Project screenshot / client work imagery |
| Recommended ratio | 4:5 desktop · 3:2 mobile · no text overlap |
| Desktop placement | 618×562px rendered (ratio 1.1:1), `position: relative`, radius 24px |
| Mobile placement | 346×262px rendered (ratio 1.32:1), `position: relative` |
| Reused elsewhere | No — this route only |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Meaningful — needs real alt text when the asset is supplied |
| Registry filename | `work-create-studio-detail.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CREATE STUDIO CASE STUDY — DETAIL Secondary crop of the same asset · 4:5 desktop · 3:2 mobile · no text overlap |

### `/services`

Controlling file: `src/pages/services/index.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-service-web`

| Field | Value |
| --- | --- |
| Section | — |
| Belongs to | Creative thinking. Clear business purpose. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | 520×325px rendered (ratio 1.6:1), `position: absolute`, radius 0px |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/services`, `/services/web-design-development` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-web-design-development.webp` |

#### 2. `create-service-web-2`

| Field | Value |
| --- | --- |
| Section | Services |
| Belongs to | Web Design & Development |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | 516×332px rendered (ratio 1.55:1), `position: relative`, radius 20px |
| Mobile placement | 256×262px rendered (ratio 0.98:1), `position: relative` |
| Reused elsewhere | Yes — `/services`, `/services/web-design-development` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-web-design-development.webp` |
| Handoff note (hidden from visitors) | ARTWORK — WEB DESIGN 1:1 · focal upper-right · lower-left reserved for copy |

#### 3. `create-service-redesign`

| Field | Value |
| --- | --- |
| Section | Services |
| Belongs to | Website Redesign |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Decorative artwork |
| Recommended ratio | 16:9 desktop · 3:2 tablet · 4:3 mobile · centred band |
| Desktop placement | 525×262px rendered (ratio 2.01:1), `position: relative`, radius 20px |
| Mobile placement | 272×262px rendered (ratio 1.04:1), `position: relative` |
| Reused elsewhere | Yes — `/services`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-website-redesign.webp` |
| Handoff note (hidden from visitors) | ARTWORK — WEBSITE REDESIGN 16:9 desktop · 3:2 tablet · 4:3 mobile · centred band |

#### 4. `create-service-crm`

| Field | Value |
| --- | --- |
| Section | Services |
| Belongs to | CRM & Custom Systems |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Decorative artwork |
| Recommended ratio | 4:5 desktop · 1:1 tablet · 1:1 mobile · separate mobile render required |
| Desktop placement | 525×262px rendered (ratio 2.01:1), `position: relative`, radius 20px |
| Mobile placement | 272×262px rendered (ratio 1.04:1), `position: relative` |
| Reused elsewhere | Yes — `/services`, `/services/crm-custom-systems` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-crm-custom-systems.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CRM & CUSTOM SYSTEMS 4:5 desktop · 1:1 tablet · 1:1 mobile · separate mobile render required |

#### 5. `create-service-seo`

| Field | Value |
| --- | --- |
| Section | Services |
| Belongs to | SEO & Performance |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Decorative artwork |
| Recommended ratio | 16:6 desktop · 16:9 tablet · 3:2 mobile · focal left of centre |
| Desktop placement | 525×262px rendered (ratio 2.01:1), `position: relative`, radius 20px |
| Mobile placement | 272×262px rendered (ratio 1.04:1), `position: relative` |
| Reused elsewhere | Yes — `/seo-growth-maintenance`, `/services`, `/services/seo-performance` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-seo-performance.webp` |
| Handoff note (hidden from visitors) | ARTWORK — SEO & PERFORMANCE 16:6 desktop · 16:9 tablet · 3:2 mobile · focal left of centre |

#### 6. `create-service-hosting`

| Field | Value |
| --- | --- |
| Section | Services |
| Belongs to | Hosting & Maintenance |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Decorative artwork |
| Recommended ratio | 4:3 desktop · 4:3 tablet · 1:1 mobile · centred focal point |
| Desktop placement | 525×262px rendered (ratio 2.01:1), `position: relative`, radius 20px |
| Mobile placement | 272×262px rendered (ratio 1.04:1), `position: relative` |
| Reused elsewhere | Yes — `/services`, `/services/hosting-maintenance` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-hosting-maintenance.webp` |
| Handoff note (hidden from visitors) | ARTWORK — HOSTING & MAINTENANCE 4:3 desktop · 4:3 tablet · 1:1 mobile · centred focal point |

#### 7. `create-service-branding`

| Field | Value |
| --- | --- |
| Section | Services |
| Belongs to | Digital Branding |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: yes · mobile: yes |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | 525×262px rendered (ratio 2.01:1), `position: relative`, radius 20px |
| Mobile placement | 272×262px rendered (ratio 1.04:1), `position: relative` |
| Reused elsewhere | Yes — `/services`, `/services/digital-branding` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-digital-branding.webp` |
| Handoff note (hidden from visitors) | ARTWORK — DIGITAL BRANDING 1:1 · centred · transparency required · 15% clear margin |

#### 8. `create-contact-expansion`

| Field | Value |
| --- | --- |
| Section | How costs are separated |
| Belongs to | Not sure which of these you actually need? |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:860px;height:860px |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about`, `/contact`, `/pricing`, `/process`, `/seo-growth-maintenance`, `/services`, `/services/crm-custom-systems`, `/services/digital-branding`, `/services/hosting-maintenance`, `/services/seo-performance`, `/services/web-design-development`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-contact-expansion.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CONTACT Artwork Placeholder 1:1 centred · core 40% reserved for headline · no internal shape animation Final artwork supplied separately |

### `/services/web-design-development`

Controlling file: `src/pages/services/web-design-development.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-service-web`

| Field | Value |
| --- | --- |
| Section | — |
| Belongs to | A website should do more than look ready. It should make you |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;top:-150px;right:-170px;width:780px;height:780px;border-radius:40px;over |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/services`, `/services/web-design-development` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-web-design-development.webp` |
| Handoff note (hidden from visitors) | ARTWORK — WEB DESIGN Artwork Placeholder 1:1 · focal upper-right · lower-left reserved for copy Final artwork supplied separately |

#### 2. `create-contact-expansion`

| Field | Value |
| --- | --- |
| Section | Related services |
| Belongs to | Ready for a site that carries its weight? |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:860px;height:860px |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about`, `/contact`, `/pricing`, `/process`, `/seo-growth-maintenance`, `/services`, `/services/crm-custom-systems`, `/services/digital-branding`, `/services/hosting-maintenance`, `/services/seo-performance`, `/services/web-design-development`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-contact-expansion.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CONTACT Artwork Placeholder 1:1 centred · core 40% reserved for headline · no internal shape animation Final artwork supplied separately |

### `/services/website-redesign`

Controlling file: `src/pages/services/website-redesign.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-service-redesign`

| Field | Value |
| --- | --- |
| Section | — |
| Belongs to | Keep what works. Rethink what doesn’t. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | 16:9 desktop · 3:2 tablet · 4:3 mobile · centred band Final artwork supplied separately |
| Desktop placement | not rendered at 1440px — position:absolute;left:-60px;right:-60px;top:120px;height:420px;border-radius:0;overflow:h |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/services`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-website-redesign.webp` |
| Handoff note (hidden from visitors) | ARTWORK — WEBSITE REDESIGN Artwork Placeholder 16:9 desktop · 3:2 tablet · 4:3 mobile · centred band Final artwork supplied separately |

#### 2. `create-contact-expansion`

| Field | Value |
| --- | --- |
| Section | Redesign inclusions by package |
| Belongs to | Has your site kept up with the business? |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:860px;height:860px |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about`, `/contact`, `/pricing`, `/process`, `/seo-growth-maintenance`, `/services`, `/services/crm-custom-systems`, `/services/digital-branding`, `/services/hosting-maintenance`, `/services/seo-performance`, `/services/web-design-development`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-contact-expansion.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CONTACT Artwork Placeholder 1:1 centred · core 40% reserved for headline · no internal shape animation Final artwork supplied separately |

### `/services/crm-custom-systems`

Controlling file: `src/pages/services/crm-custom-systems.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-service-crm`

| Field | Value |
| --- | --- |
| Section | — |
| Belongs to | When off-the-shelf software stops fitting, we design around  |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | 4:5 desktop · 1:1 tablet · 1:1 mobile · separate mobile render required Final artwork supplied separately |
| Desktop placement | not rendered at 1440px — position:absolute;top:-120px;left:-200px;width:760px;height:760px;border-radius:40px;overf |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/services`, `/services/crm-custom-systems` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-crm-custom-systems.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CRM & CUSTOM SYSTEMS Artwork Placeholder 4:5 desktop · 1:1 tablet · 1:1 mobile · separate mobile render required Final artwork supplied separately |

#### 2. `create-contact-expansion`

| Field | Value |
| --- | --- |
| Section | Related services |
| Belongs to | Ready to stop working around your software? |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:860px;height:860px |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about`, `/contact`, `/pricing`, `/process`, `/seo-growth-maintenance`, `/services`, `/services/crm-custom-systems`, `/services/digital-branding`, `/services/hosting-maintenance`, `/services/seo-performance`, `/services/web-design-development`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-contact-expansion.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CONTACT Artwork Placeholder 1:1 centred · core 40% reserved for headline · no internal shape animation Final artwork supplied separately |

### `/services/seo-performance`

Controlling file: `src/pages/services/seo-performance.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-service-seo`

| Field | Value |
| --- | --- |
| Section | — |
| Belongs to | Visibility is built through structure, relevance and consist |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | 16:6 desktop · 16:9 tablet · 3:2 mobile · focal left of centre Final artwork supplied separately |
| Desktop placement | not rendered at 1440px — position:absolute;left:-60px;right:-60px;top:120px;height:420px;border-radius:0;overflow:h |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/seo-growth-maintenance`, `/services`, `/services/seo-performance` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-seo-performance.webp` |
| Handoff note (hidden from visitors) | ARTWORK — SEO & PERFORMANCE Artwork Placeholder 16:6 desktop · 16:9 tablet · 3:2 mobile · focal left of centre Final artwork supplied separately |

#### 2. `create-contact-expansion`

| Field | Value |
| --- | --- |
| Section | Related services |
| Belongs to | Worth being found for. Hard to find. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:860px;height:860px |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about`, `/contact`, `/pricing`, `/process`, `/seo-growth-maintenance`, `/services`, `/services/crm-custom-systems`, `/services/digital-branding`, `/services/hosting-maintenance`, `/services/seo-performance`, `/services/web-design-development`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-contact-expansion.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CONTACT Artwork Placeholder 1:1 centred · core 40% reserved for headline · no internal shape animation Final artwork supplied separately |

### `/services/hosting-maintenance`

Controlling file: `src/pages/services/hosting-maintenance.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-service-hosting`

| Field | Value |
| --- | --- |
| Section | — |
| Belongs to | A strong website needs attention after launch. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | 4:3 desktop · 4:3 tablet · 1:1 mobile · centred focal point Final artwork supplied separately |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:-180px;transform:translateX(-50%);width:820px;height:820px; |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/services`, `/services/hosting-maintenance` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-hosting-maintenance.webp` |
| Handoff note (hidden from visitors) | ARTWORK — HOSTING & MAINTENANCE Artwork Placeholder 4:3 desktop · 4:3 tablet · 1:1 mobile · centred focal point Final artwork supplied separately |

#### 2. `create-contact-expansion`

| Field | Value |
| --- | --- |
| Section | Related services |
| Belongs to | Launched. Now it needs looking after. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:860px;height:860px |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about`, `/contact`, `/pricing`, `/process`, `/seo-growth-maintenance`, `/services`, `/services/crm-custom-systems`, `/services/digital-branding`, `/services/hosting-maintenance`, `/services/seo-performance`, `/services/web-design-development`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-contact-expansion.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CONTACT Artwork Placeholder 1:1 centred · core 40% reserved for headline · no internal shape animation Final artwork supplied separately |

### `/services/digital-branding`

Controlling file: `src/pages/services/digital-branding.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-service-branding`

| Field | Value |
| --- | --- |
| Section | — |
| Belongs to | A brand is more than how a business looks. It is how it beco |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:-180px;transform:translateX(-50%);width:820px;height:820px; |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/services`, `/services/digital-branding` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-digital-branding.webp` |
| Handoff note (hidden from visitors) | ARTWORK — DIGITAL BRANDING Artwork Placeholder 1:1 · centred · transparency required · 15% clear margin Final artwork supplied separately |

#### 2. `create-contact-expansion`

| Field | Value |
| --- | --- |
| Section | Related services |
| Belongs to | Recognisable, everywhere it appears. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:860px;height:860px |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about`, `/contact`, `/pricing`, `/process`, `/seo-growth-maintenance`, `/services`, `/services/crm-custom-systems`, `/services/digital-branding`, `/services/hosting-maintenance`, `/services/seo-performance`, `/services/web-design-development`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-contact-expansion.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CONTACT Artwork Placeholder 1:1 centred · core 40% reserved for headline · no internal shape animation Final artwork supplied separately |

### `/process`

Controlling file: `src/pages/process.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-process-flow`

| Field | Value |
| --- | --- |
| Section | Our process |
| Belongs to | Good creative work needs room to explore — and a process tha |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | 32:5 desktop · 21:9 tablet · 3:4 vertical mobile render required |
| Desktop placement | not rendered at 1440px — position:relative;height:240px;border-radius:26px;overflow:hidden;background:#0B0B0E;borde |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/process` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-process-flow.webp` |
| Handoff note (hidden from visitors) | ARTWORK — PROCESS FLOW 32:5 desktop · 21:9 tablet · 3:4 vertical mobile render required |

#### 2. `create-contact-expansion`

| Field | Value |
| --- | --- |
| Section | After launch — optional |
| Belongs to | That is how we work. What are you building? |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:860px;height:860px |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about`, `/contact`, `/pricing`, `/process`, `/seo-growth-maintenance`, `/services`, `/services/crm-custom-systems`, `/services/digital-branding`, `/services/hosting-maintenance`, `/services/seo-performance`, `/services/web-design-development`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-contact-expansion.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CONTACT Artwork Placeholder 1:1 centred · core 40% reserved for headline · no internal shape animation Final artwork supplied separately |

### `/pricing`

Controlling file: `src/pages/pricing.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-pricing-atmosphere`

| Field | Value |
| --- | --- |
| Section | — |
| Belongs to | Clear prices. Written scope. No surprises. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;right:-200px;bottom:-240px;width:620px;height:620px;border-radius:50%;ov |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | No — this route only |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-pricing-atmosphere.webp` |
| Handoff note (hidden from visitors) | ARTWORK — PRICING ATMOSPHERE Artwork Placeholder 1:1 corner crop · max 35% presence · suppressed below 640px Final artwork supplied separately |

#### 2. `create-contact-expansion`

| Field | Value |
| --- | --- |
| Section | Frequently asked questions |
| Belongs to | Still weighing up which one fits? |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:860px;height:860px |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about`, `/contact`, `/pricing`, `/process`, `/seo-growth-maintenance`, `/services`, `/services/crm-custom-systems`, `/services/digital-branding`, `/services/hosting-maintenance`, `/services/seo-performance`, `/services/web-design-development`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-contact-expansion.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CONTACT Artwork Placeholder 1:1 centred · core 40% reserved for headline · no internal shape animation Final artwork supplied separately |

### `/seo-growth-maintenance`

Controlling file: `src/pages/seo-growth-maintenance.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-service-seo`

| Field | Value |
| --- | --- |
| Section | — |
| Belongs to | Launch is a milestone, not a finish line. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | 16:6 desktop · 16:9 tablet · 3:2 mobile · focal left of centre Final artwork supplied separately |
| Desktop placement | not rendered at 1440px — position:absolute;left:-60px;right:-60px;top:150px;height:380px;border-radius:0;overflow:h |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/seo-growth-maintenance`, `/services`, `/services/seo-performance` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-service-seo-performance.webp` |
| Handoff note (hidden from visitors) | ARTWORK — SEO & PERFORMANCE Artwork Placeholder 16:6 desktop · 16:9 tablet · 3:2 mobile · focal left of centre Final artwork supplied separately |

#### 2. `create-contact-expansion`

| Field | Value |
| --- | --- |
| Section | Full comparison |
| Belongs to | Unsure which level applies? |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:860px;height:860px |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about`, `/contact`, `/pricing`, `/process`, `/seo-growth-maintenance`, `/services`, `/services/crm-custom-systems`, `/services/digital-branding`, `/services/hosting-maintenance`, `/services/seo-performance`, `/services/web-design-development`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-contact-expansion.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CONTACT Artwork Placeholder 1:1 centred · core 40% reserved for headline · no internal shape animation Final artwork supplied separately |

### `/about`

Controlling file: `src/pages/about.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-about-gesture`

| Field | Value |
| --- | --- |
| Section | — |
| Belongs to | Creative enough to see what could be.Practical enough to mak |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | 4:5 desktop right-bleed · 16:9 tablet · 4:3 mobile · left 30% must fall to #09090B Final artwork supplied separately |
| Desktop placement | not rendered at 1440px — position:absolute;top:0;right:0;width:620px;height:620px;border-radius:28px 0 0 28px;overf |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-about-gesture.webp` |
| Handoff note (hidden from visitors) | ARTWORK — ABOUT Artwork Placeholder 4:5 desktop right-bleed · 16:9 tablet · 4:3 mobile · left 30% must fall to #09090B Final artwork supplied separately |

#### 2. `create-contact-expansion`

| Field | Value |
| --- | --- |
| Section | Studio details |
| Belongs to | Now tell us about your business. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | matches the reserved box below |
| Desktop placement | not rendered at 1440px — position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:860px;height:860px |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about`, `/contact`, `/pricing`, `/process`, `/seo-growth-maintenance`, `/services`, `/services/crm-custom-systems`, `/services/digital-branding`, `/services/hosting-maintenance`, `/services/seo-performance`, `/services/web-design-development`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-contact-expansion.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CONTACT Artwork Placeholder 1:1 centred · core 40% reserved for headline · no internal shape animation Final artwork supplied separately |

### `/contact`

Controlling file: `src/pages/contact.astro` · registry: `src/data/artwork.ts` · renderer: `src/components/Artwork.astro`

#### 1. `create-contact-expansion`

| Field | Value |
| --- | --- |
| Section | — |
| Belongs to | Tell us what you’re building. |
| Status | **Empty** — awaiting artwork |
| Rendered in approved design | desktop: no — retired/hidden · mobile: no — retired/hidden |
| Expects | Decorative artwork |
| Recommended ratio | 1:1 desktop corner crop · 16:9 mobile band · no moving detail behind form fields Final artwork supplied separately |
| Desktop placement | not rendered at 1440px — position:absolute;top:-160px;right:-160px;width:700px;height:700px;border-radius:36px;over |
| Mobile placement | not rendered at 390px |
| Reused elsewhere | Yes — `/`, `/about`, `/contact`, `/pricing`, `/process`, `/seo-growth-maintenance`, `/services`, `/services/crm-custom-systems`, `/services/digital-branding`, `/services/hosting-maintenance`, `/services/seo-performance`, `/services/web-design-development`, `/services/website-redesign` |
| Fitting behaviour | `cover` — applied to `[data-art-slot] > img[data-art-img]` in `src/styles/production.css` when an asset is registered |
| Alt-text handling | Decorative — renders empty `alt` plus `aria-hidden="true"` |
| Registry filename | `create-contact-expansion.webp` |
| Handoff note (hidden from visitors) | ARTWORK — CONTACT Artwork Placeholder 1:1 desktop corner crop · 16:9 mobile band · no moving detail behind form fields Final artwork supplied separately |

---

No placement was filled, resized, removed or redesigned in producing this inventory.
