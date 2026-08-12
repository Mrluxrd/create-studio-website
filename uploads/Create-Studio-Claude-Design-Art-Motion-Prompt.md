# CREATE STUDIO — BRAND CORRECTION, NATIVE ARTWORK & MOTION PASS

Continue working inside the existing completed Create Studio multi-page website project.

This is a refinement and art-direction pass on the current approved prototype. Do not restart the website, replace the design system with a new concept, simplify it into a one-page site, or independently redesign the layouts. Preserve the completed multi-page structure, written content, pricing, routes, forms, responsive layouts, hierarchy, and overall composition unless a change is specifically requested below.

Use the supplied **Create Studio Brand Guide / Brand Book as the primary source of truth** for all brand decisions. When the current prototype conflicts with the brand book, the brand book wins.

## 1. PRIMARY OBJECTIVE

Refine the finished website so it feels unmistakably like Create Studio and introduce a coherent system of native artwork and motion throughout the experience.

The artwork should feel like one visual language evolving across the website—not a collection of unrelated illustrations. The central concept is:

**CREATE STUDIO IN MOTION**

An open, fluid blue-violet form inspired by the curves and negative space of the approved open C+S monogram evolves from idea, to structure, to connection, to identity, to growth, to stability, and finally to a new beginning.

Build the secondary artwork and animation natively in Claude Design using web-friendly SVG, CSS, gradients, masks, paths, blur, grain, layered light, and restrained interactive motion. Do not generate raster artwork, fake images, generic stock imagery, or fake client work.

Higgsfield will be reserved only for a possible final cinematic upgrade of the main homepage hero. Everything else requested below should be designed and animated natively whenever possible.

## 2. LOCKED BRAND SYSTEM

Apply the brand guide consistently across every page and breakpoint.

### Logo and identity

- Use the approved open geometric C+S mark, Concept 2 refinement 2A.
- Use the approved lowercase `create` wordmark with the spaced `STUDIO` treatment exactly as defined in the brand guide.
- Do not redraw, reinterpret, distort, stretch, rotate, crop, or replace the approved logo.
- Do not create a new logo or a new C+S symbol.
- Native artwork may be inspired by the open curves and negative space of the mark, but it must never become an altered logo.

### Color palette

Use only the approved core palette:

- Electric Blue: `#2563FF`
- Vibrant Violet: `#8B5CF6`
- Near Black: `#09090B`
- Soft White: `#F8FAFC`
- Light Gray: `#A1A1AA`
- Signature gradient: `#2563FF → #8B5CF6`

Near Black remains the dominant background. Soft White is the main text color. Light Gray is for supporting copy. Blue and violet are controlled accents, not full-page decoration. Reserve the signature gradient for primary calls to action, signature lines, selective emphasis, and key motion moments.

Do not introduce unrelated accent colors, excessive neon, rainbow gradients, bright cyan, pink, green, orange, or generic SaaS color effects.

### Typography correction — mandatory

The brand book defines a two-font system:

- **Sora Bold / SemiBold** for H1, H2, H3, major statements, pricing figures, and important display text.
- **Inter Regular / Medium** for body copy, navigation, buttons, forms, captions, labels, eyebrow text, metadata, and interface text.

The current prototype introduced JetBrains Mono for eyebrow labels, metadata, artwork labels, and small UI text. Remove JetBrains Mono from the entire project. Replace every use of it with Inter Medium while preserving the intended hierarchy through size, weight, spacing, case, and color.

Do not introduce any third font. Do not replace Sora or Inter. Keep headlines short, confident, spacious, and highly legible. Avoid decorative type, overly condensed treatments, and long all-caps paragraphs.

Recheck every page so the typography is consistent rather than corrected only on the homepage.

## 3. PRESERVE THE CURRENT SITE

Keep the existing complete route structure:

- Home
- Work
- Reusable Case Study
- Services
- Web Design & Development
- Website Redesign
- CRM & Custom Systems
- SEO & Performance
- Hosting & Maintenance
- Digital Branding
- Process
- Pricing
- SEO Growth & Maintenance
- About
- Contact
- Privacy

Preserve the current pricing and package language:

- Essential — US$800
- Business — US$1,000
- Premium — US$1,500
- Custom — Custom Quote
- Essential Care — Starting at US$100/month
- Growth — Starting at US$200/month
- Growth Pro — Starting at US$350/month

Preserve the current contact details, project copy, navigation, filters, package preselection, form fields and states, FAQs, comparison content, and all supplied factual content. Do not invent clients, projects, testimonials, statistics, results, guarantees, team members, prices, or response times.

## 4. ART DIRECTION — ONE CONNECTED VISUAL LANGUAGE

All native art should share these characteristics:

- Fluid open curves inspired by the C+S mark
- Elegant ribbons, sweeping paths, layers, and controlled negative space
- Electric-blue to vibrant-violet light moving through near-black space
- Soft volumetric glow used sparingly
- Fine grain or subtle texture to prevent flat digital gradients
- Strong editorial composition with generous dark space for copy
- Depth created with overlap, masking, transparency, and slow movement
- Crisp enough to feel designed, soft enough to feel cinematic
- Premium, creative, architectural, and human—not cold corporate technology

Avoid all of the following:

- Glassmorphism
- Smoked-glass panels
- Cubes or floating 3D boxes
- Generic spheres and random blobs
- Data-node networks
- Fake dashboards
- Fake browser windows
- Literal charts, arrows, magnifying glasses, shields, locks, clouds, gears, or server icons
- Generic futuristic-tech imagery
- Random particles with no compositional purpose
- Excessive neon glow
- Constant floating of every object
- Bouncy or playful motion
- Aggressive parallax
- Cursor gimmicks
- Visual noise behind important text

## 5. HOMEPAGE ARTWORK AND MOTION

### `create-hero-motion` — signature hero

Keep the approved homepage hero artwork as the visual source of truth. Do not replace or alter the approved composition.

Create a native motion treatment around and within the approved art using masks, light sweeps, subtle depth, and slow movement:

- A controlled blue-violet light should travel through the form.
- Introduce an extremely subtle 3D-feeling shift or perspective drift, not a continuous spin.
- Let one open curve extend slightly into the surrounding negative space to connect the artwork to the page.
- Use a soft reveal on first load, as though the form is emerging from darkness.
- Keep the loop seamless and slow, approximately 12–16 seconds.
- Preserve enough quiet space for the headline and CTA.
- Do not place the art inside a visible rectangular video frame.

This native version should be production-worthy and serve as the fallback. Do not fabricate a cinematic raster/video replacement. Higgsfield may later be used only if we choose to upgrade this one signature moment.

### Hero text entrance

- Reveal the eyebrow first, then the H1 in two or three restrained lines, then supporting copy and CTAs.
- Use opacity plus approximately 18–28px upward movement.
- Stagger gently; total sequence should feel immediate and remain under approximately 900ms.
- Do not use letter-by-letter animation.

### `create-portfolio-accent`

Replace the dashed placeholder with a wide, low-contrast atmospheric artwork behind or around Selected Work.

- Use one sweeping open ribbon moving laterally across the section.
- The ribbon should appear to guide the eye from one authentic project to the next.
- Add a slow gradient-light movement and gentle masked reveal as the section enters.
- Keep opacity low enough that real project screenshots remain dominant.
- No continuous marquee unless the content itself requires it.

### Homepage process preview

Use the same native process artwork described for the full Process page, adapted into a compact preview. It should visually connect all five stages rather than place them in disconnected decorative boxes.

### Homepage About preview

Use a cropped version of the native About gesture described below. Do not create a separate unrelated artwork.

### Homepage final CTA

Use a cropped version of `create-contact-expansion` so the visual story loops back toward a new project beginning.

## 6. SERVICES OVERVIEW ARTWORK

The Services page should present six related transformations of the same visual material. Each service must be distinguishable, but all six pieces must clearly belong to one family.

### `create-service-web` — structure

Use the approved Web Design artwork as the source of truth. Do not replace it.

Native motion direction:

- Fluid curves gently align into an implied grid or layered page structure.
- Use thin framing lines, masks, and measured alignment without drawing a literal website screen.
- A soft highlight can travel across the composition as structure becomes clearer.
- The motion should suggest creativity becoming a usable digital experience.

### `create-service-redesign` — transformation

Replace the placeholder with an abstract transformation sequence:

- Begin with several misaligned, compressed, or interrupted ribbon segments.
- As the artwork enters the viewport, the segments reorganize into a balanced open composition.
- Preserve valuable parts rather than making everything disappear; the meaning is refinement, not destruction.
- After the entrance completes, use only a very slow ambient loop.
- Do not show a literal before-and-after website or fake browser window.

### `create-service-crm` — connection

Use the approved CRM artwork as the source of truth and preserve its composition.

Native motion direction:

- Animate information as light traveling along a small number of coordinated paths.
- Let separate flows converge into one stable center and then continue outward in an organized rhythm.
- Suggest dashboards, contacts, pipelines, calendars, reports, and automation through motion and structure—not through fake UI or data-node diagrams.
- Keep the movement precise and more technical than the Web Design artwork, while maintaining the same fluid blue-violet material.

### `create-service-seo` — visibility and momentum

Replace the placeholder with controlled expanding paths:

- Begin with a focused line or narrow band.
- Let it become clearer, brighter, and more expansive as it travels upward and outward.
- Use layered waves, spacing, and luminosity to suggest visibility, technical improvement, speed, and momentum.
- Do not use literal graphs, arrows, rankings, search bars, or magnifying-glass icons.
- The loop must feel progressive but calm.

### `create-service-hosting` — stability and care

Replace the placeholder with a calm, balanced composition:

- Use a stable illuminated center held by two or three slow protective arcs.
- Add a subtle rhythmic pulse suggesting monitoring and ongoing care.
- Movement should be minimal, dependable, and almost meditative.
- Do not use shields, locks, servers, clouds, status dashboards, or green uptime indicators.

### `create-service-branding` — identity

Replace the placeholder with a visual identity formation:

- Begin with an undefined ribbon or field.
- Gradually establish a consistent rhythm, proportion, color balance, and recognizable open form.
- The result may echo the geometry of the C+S identity, but it must not redraw or mutate the approved logo.
- Use the signature gradient selectively and let typography remain the page’s dominant communication tool.
- Do not invent sample logos, fake clients, packaging, or brand mockups.

### Service-card interactions

- On hover or keyboard focus, use a small 4–8px lift, a controlled border-color change, and a localized light response within the artwork.
- Do not make the whole card glow.
- On touch devices, do not rely on hover to reveal essential information.

## 7. PROCESS ARTWORK

### `create-process-flow`

Replace the dashed placeholder with a native continuous visual journey connecting:

**Discovery → Visual Direction → Design & Development → Review → Launch**

The visual must behave as one path, not five disconnected cards.

- Build a long open curve or ribbon using SVG/path-based techniques.
- As the visitor scrolls through the section, progressively reveal the gradient stroke along the path.
- Each stage should activate as the path reaches it through a subtle increase in clarity, scale, and light.
- Supporting copy should reveal in sync but remain fully readable without animation.
- After Launch, let the path settle rather than continuing into “ongoing growth.”
- Present ongoing SEO and maintenance afterward as a separate optional relationship, preserving the current content distinction.
- Avoid dots connected by straight lines, data nodes, a horizontal progress bar, or five isolated cards.

On mobile, recompose the path vertically and keep the stage order obvious. Do not compress the desktop artwork into an unreadable horizontal strip.

## 8. PRICING ARTWORK AND INTERACTIONS

### `create-pricing-atmosphere`

Replace the placeholder with a very restrained atmospheric corner composition:

- Use one or two broad blue-violet arcs entering and leaving the frame.
- Maximum visual opacity should remain approximately 25–35%.
- It should give the pricing hero depth without competing with package names and prices.
- No floating circles, coins, charts, or pricing-related icons.

### Pricing cards

- Preserve the four website packages and three separate monthly plans.
- Business may retain a restrained “Most Popular” label.
- Growth may retain a restrained “Recommended” label.
- Selection feedback should use a precise border/gradient response and a small internal light movement.
- Do not make recommended cards dramatically larger or brighter.
- Keep website packages and continuing support visibly separate.
- On mobile, stack the plans intentionally and never compress comparison content into a wide table.

## 9. ABOUT ARTWORK

### `create-about-gesture`

Replace the placeholder with an expressive but controlled native composition representing creativity, strategy, and technology working together.

- Use two complementary open gestures that approach, overlap, and find balance without fully closing.
- One movement can feel more organic and expressive; the other more measured and structural.
- Their interaction should create a meaningful negative-space center.
- Use slow breathing movement and subtle light transfer between the two forms.
- Preserve the specified right-bleed composition and clear left-side space for text.
- Do not invent a founder portrait, team members, office photography, or fake studio scenes.

## 10. CONTACT ARTWORK

### `create-contact-expansion`

Create the final chapter of the visual story:

- Begin with a concentrated open form that gradually expands toward the visitor.
- The motion should feel invitational, like making space for a new idea.
- Echo the homepage hero’s material and lighting so Contact completes a visual loop back to the beginning.
- Keep the form open rather than closing into a circle.
- Protect form readability and do not place moving detail directly behind inputs or labels.
- The current homepage-hero crop may remain only as a temporary reference until this native Contact artwork is complete; do not make it permanent.

## 11. GLOBAL MOTION SYSTEM

Create a consistent motion hierarchy across the site.

### Page transitions

- Use a fast, refined fade with 12–20px directional movement.
- Keep transitions approximately 250–450ms.
- Navigation should feel continuous, but content must never wait behind a loader.
- Reset scroll position correctly on route changes.

### Scroll reveals

- Use Intersection Observer-style behavior or the prototype equivalent.
- Reveal section labels, headings, copy, and cards with opacity and a restrained upward shift.
- Stagger related items by approximately 50–90ms.
- Run entrance animation once per visit unless replaying is clearly useful.
- Never hide content permanently when JavaScript or animation is unavailable.

### Navigation

- Preserve the current desktop navigation, Services dropdown, mobile menu, active states, and keyboard behavior.
- Add smooth dropdown opening through opacity and a short vertical movement.
- Use a subtle active-link indicator inspired by the signature gradient.
- Keep the mobile menu fast, readable, and fully keyboard accessible.

### Buttons and links

- Use a restrained 1–2px lift, small gradient-position change, and controlled shadow on primary buttons.
- Secondary buttons should respond through border and background, not glow.
- Provide immediate pressed/active feedback.
- Keep all focus indicators visible and high contrast.

### Portfolio

- Authentic screenshots remain the focal point.
- Add small image-mask reveals, minimal scale from approximately 1.02 to 1.00, and refined card movement.
- Do not recolor, crop destructively, blur, or cover the supplied screenshots.
- Filters should transition without abrupt layout jumps.

### Forms

- Keep all current validation, loading, success, and failure states.
- Use quiet border-color and helper-text transitions.
- Do not animate input labels in a way that harms clarity.
- Package preselection should receive a brief, restrained confirmation highlight.

### Ambient movement

- Not every object should move.
- Limit continuous loops to artwork, and keep most loops between 12 and 20 seconds.
- Use different motion behaviors based on meaning rather than applying the same vertical float everywhere.
- Remove the repeated generic `csDrift` treatment wherever it makes unrelated artwork behave identically.

## 12. RESPONSIVE ART DIRECTION

Design the artwork and motion independently for large desktop, standard desktop, tablet, and mobile.

- Do not merely shrink desktop compositions.
- Recompose hero artwork around the text at each breakpoint.
- Preserve intentional negative space.
- Use simplified path counts and reduced blur on mobile.
- Keep important art within safe crops without stretching or distortion.
- Stack pricing and comparison content for mobile.
- Reorient the Process journey vertically on mobile.
- Maintain comfortable touch targets and prevent horizontal overflow.
- Allow secondary artwork to become static on lower-powered mobile devices when needed.

## 13. ACCESSIBILITY AND PERFORMANCE

- Respect `prefers-reduced-motion` across the entire website.
- For reduced motion, replace continuous loops and scroll-scrubbed movement with static final compositions and short opacity transitions only.
- Do not make meaning depend on animation.
- Preserve one H1 per page and the current semantic heading hierarchy.
- Keep keyboard navigation, visible focus, accessible dropdowns, form labels, status messages, and touch targets intact.
- Prefer transform and opacity animation.
- Avoid layout-shifting properties.
- Keep filters and blur layers modest.
- Pause or minimize offscreen continuous animation.
- Do not use large autoplay video files for secondary visuals.
- Native SVG/CSS artwork should remain crisp at every size.

## 14. IMPLEMENTATION ORDER

Work in this order so the approved website is protected:

1. Audit the current project against the brand guide.
2. Correct the typography globally: Sora + Inter only; remove JetBrains Mono.
3. Confirm colors, logo use, spacing, and visual hierarchy match the brand guide.
4. Build the shared native artwork language and reusable motion tokens.
5. Complete `create-hero-motion` as a native motion treatment around the approved hero.
6. Complete the six service artworks.
7. Complete the scroll-responsive `create-process-flow`.
8. Complete portfolio, pricing, About, and Contact artwork.
9. Apply the global page, section, navigation, card, button, portfolio, pricing, and form interactions.
10. Recompose and test all artwork on tablet and mobile.
11. Test reduced motion, keyboard operation, contrast, and performance.
12. Review every route for brand consistency and remove every visible artwork placeholder label or dashed placeholder frame.

## 15. NON-NEGOTIABLE FINAL CHECK

Before considering the pass complete, verify all of the following:

- The current multi-page design has been refined, not restarted.
- The brand book is visibly governing the website.
- Sora is used for display typography and Inter for all body/UI typography.
- JetBrains Mono is completely removed.
- The exact approved palette is used consistently.
- The approved logo and existing approved artwork are not altered.
- All 12 artwork slots are resolved with approved assets or native web artwork.
- Secondary visuals no longer require Higgsfield.
- The homepage hero remains eligible for a later optional Higgsfield upgrade without blocking the design.
- Artwork feels like one evolving Create Studio visual story.
- No glassmorphism, cubes, fake dashboards, data-node networks, generic tech imagery, or invented client material appears.
- Motion is refined, varied by meaning, responsive, accessible, and never distracting.
- Desktop, tablet, and mobile each feel intentionally composed.
- All routes, buttons, package preselection, filters, forms, pricing, and content continue to work.
- No placeholder labels, dashed artwork frames, temporary production notes, or missing-art instructions remain visible to visitors.

When finished, present the updated complete prototype and summarize:

1. The typography and brand corrections made
2. The native artwork created for each page
3. The motion system implemented
4. The responsive adaptations made
5. Anything intentionally left reserved for the final optional Higgsfield hero upgrade

Do not ask to restart the project. Begin by auditing and correcting the existing completed design in place.
