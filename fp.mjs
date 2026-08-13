/**
 * Full-page capture of every public route at 1440px and 390px.
 *
 * Two things have to be forced before the shutter, or a full-page still
 * misrepresents the page:
 *
 *  1. The ribbon is scroll-linked, so at scroll 0 it is only partly drawn.
 *     Emulating prefers-reduced-motion drives it to full progress (p = 1) and
 *     holds it there as the approved static composition — the whole path,
 *     top to bottom, in one frame.
 *  2. Scroll-reveal blocks ([data-rv]) sit at opacity 0 until they intersect
 *     the viewport. Reduced motion forces them all visible.
 *
 * Both are verified per page before capturing, and the capture is retried if
 * either check fails.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = process.argv[2];
const BASE = process.argv[3] || 'http://localhost:4322';
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

fs.mkdirSync(path.join(OUT, 'desktop'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'mobile'), { recursive: true });

const ROUTES = [
  ['/seo-growth-maintenance', 'seo-growth-maintenance'],
];
const _ALL = [
  ['/', 'home'],
  ['/work', 'work'],
  ['/work/luxury-listings-dr', 'work-luxury-listings-dr'],
  ['/work/joan-leonardo', 'work-joan-leonardo'],
  ['/work/custom-real-estate-crm', 'work-custom-real-estate-crm'],
  ['/work/create-studio', 'work-create-studio'],
  ['/services', 'services'],
  ['/services/web-design-development', 'services-web-design-development'],
  ['/services/website-redesign', 'services-website-redesign'],
  ['/services/crm-custom-systems', 'services-crm-custom-systems'],
  ['/services/seo-performance', 'services-seo-performance'],
  ['/services/hosting-maintenance', 'services-hosting-maintenance'],
  ['/services/digital-branding', 'services-digital-branding'],
  ['/process', 'process'],
  ['/pricing', 'pricing'],
  ['/seo-growth-maintenance', 'seo-growth-maintenance'],
  ['/about', 'about'],
  ['/contact', 'contact'],
  ['/privacy', 'privacy'],
];

const VIEWS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const browser = await chromium.launch({ executablePath: EXEC });
const results = [];

async function capture(view, routePath, slug, attempt) {
  const ctx = await browser.newContext({
    viewport: VIEWS[view],
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message.slice(0, 120)));

  await page.goto(BASE + routePath, { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  // every image eager + fully decoded, so nothing below the fold is blank
  await page.evaluate(() => {
    document.querySelectorAll('img').forEach((i) => {
      i.loading = 'eager';
      i.removeAttribute('loading');
    });
  });
  await page
    .waitForFunction(
      () => Array.prototype.every.call(document.images, (i) => i.complete && i.naturalWidth > 0),
      { timeout: 15000 },
    )
    .catch(() => errors.push('images did not all finish loading'));

  // walk the page so any intersection-driven work settles, then return to top
  // (the sticky header must render at the top of the capture)
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);

  // the ribbon must be fully drawn and the reveals all visible
  const state = await page.evaluate(() => {
    // The core and mid strands must be fully drawn. The haze/wide/comp layers
    // deliberately trail the core, so their final segment stops a little short
    // at full progress — that is the approved end state, not an unfinished draw.
    const strands = Array.prototype.slice.call(
      document.querySelectorAll('[data-ribbon] path[data-strand]'),
    );
    const pct = (p) => {
      const L = parseFloat(p.style.strokeDasharray) || 0;
      const off = Math.abs(parseFloat(p.style.strokeDashoffset) || 0);
      return L ? 1 - off / L : 1;
    };
    const lead = strands.filter((p) => /^(core|mid)$/.test(p.getAttribute('data-strand')));
    const leadDrawn = lead.filter((p) => pct(p) > 0.995);
    const trail = strands.filter((p) => /^(haze|wide|comp)$/.test(p.getAttribute('data-strand')));
    const trailMin = trail.length ? Math.min.apply(null, trail.map(pct)) : 1;
    const rv = Array.prototype.slice.call(document.querySelectorAll('[data-rv]'));
    return {
      strands: strands.length,
      lead: lead.length,
      leadDrawn: leadDrawn.length,
      trailMin: +trailMin.toFixed(3),
      hiddenReveals: rv.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99).length,
      docHeight: document.documentElement.scrollHeight,
      scrollY: window.scrollY,
      hasFooter: !!document.querySelector('footer'),
      hasSlogan: !!document.querySelector('[data-slogan]'),
      hScroll: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  const file = path.join(OUT, view, `${slug}-${view}.png`);
  await page.screenshot({ path: file, fullPage: true });
  await ctx.close();

  const ok =
    state.strands > 0 &&
    state.lead > 0 &&
    state.leadDrawn === state.lead &&
    state.trailMin > 0.6 &&
    state.hiddenReveals === 0 &&
    state.hasFooter &&
    state.hasSlogan &&
    errors.length === 0;

  return { file, state, errors, ok, attempt };
}

for (const view of ['desktop', 'mobile']) {
  for (const [routePath, slug] of ROUTES) {
    let r = await capture(view, routePath, slug, 1);
    if (!r.ok) {
      console.log(`RETRY ${view} ${routePath} — ${JSON.stringify(r.state)} ${r.errors.join('|')}`);
      r = await capture(view, routePath, slug, 2);
    }
    results.push({ route: routePath, slug, view, ...r });
    console.log(
      `${r.ok ? 'OK  ' : 'WARN'} ${view.padEnd(7)} ${routePath.padEnd(34)} ` +
        `${String(r.state.docHeight).padStart(6)}px  core+mid ${r.state.leadDrawn}/${r.state.lead}  ` +
        `trail ${(r.state.trailMin * 100).toFixed(0)}%  ` +
        `hiddenReveals ${r.state.hiddenReveals}  attempt ${r.attempt}`,
    );
  }
}

await browser.close();
fs.writeFileSync(path.join(OUT, 'capture-report.json'), JSON.stringify(results, null, 2));
const bad = results.filter((r) => !r.ok);
console.log(`\ncaptured ${results.length} files; ${bad.length} still flagged after retry`);
