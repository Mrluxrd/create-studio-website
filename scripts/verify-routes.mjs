/**
 * Route parity check: loads every route in the approved prototype and in the
 * production build and compares them.
 *
 * Requires two servers:
 *   1. the production build          — `npm run preview`  (http://localhost:4322)
 *   2. the approved prototype        — serve a directory containing
 *      `design-source/Create Studio Full Site.dc.html` (renamed `proto.html`),
 *      `support.js` and `assets/` on http://localhost:4399
 *
 * The prototype's preview runtime pulls React from a CDN; on a restricted
 * network, drop `react.js` / `react-dom.js` next to `proto.html` and repoint the
 * two CDN URLs inside `support.js` at them.
 *
 * Usage: node scripts/verify-routes.mjs [desktop|tablet|mobile] [logfile]
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
const LOG = process.argv[3] || 'audit.log';
const say = (m) => { console.log(m); fs.appendFileSync(LOG, m + '\n'); };

const ROUTES = [
  ['home', '/', '#/home'],
  ['work', '/work', '#/work'],
  ['work-luxury-listings-dr', '/work/luxury-listings-dr', '#/work-luxury-listings-dr'],
  ['work-joan-leonardo', '/work/joan-leonardo', '#/work-joan-leonardo'],
  ['work-custom-real-estate-crm', '/work/custom-real-estate-crm', '#/work-custom-real-estate-crm'],
  ['work-create-studio', '/work/create-studio', '#/work-create-studio'],
  ['services', '/services', '#/services'],
  ['service-web-design-development', '/services/web-design-development', '#/service-web-design-development'],
  ['service-website-redesign', '/services/website-redesign', '#/service-website-redesign'],
  ['service-crm-custom-systems', '/services/crm-custom-systems', '#/service-crm-custom-systems'],
  ['service-seo-performance', '/services/seo-performance', '#/service-seo-performance'],
  ['service-hosting-maintenance', '/services/hosting-maintenance', '#/service-hosting-maintenance'],
  ['service-digital-branding', '/services/digital-branding', '#/service-digital-branding'],
  ['process', '/process', '#/process'],
  ['pricing', '/pricing', '#/pricing'],
  ['seo-growth-maintenance', '/seo-growth-maintenance', '#/seo-growth-maintenance'],
  ['about', '/about', '#/about'],
  ['contact', '/contact', '#/contact'],
  ['privacy', '/privacy', '#/privacy'],
];

const SIZES = {
  desktop: { width: 1440, height: 1000 },
  tablet: { width: 834, height: 1112 },
  mobile: { width: 390, height: 844 },
};

const VIEW = process.argv[2] || 'desktop';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

async function measure(mode, path, hash) {
  const ctx = await browser.newContext({ viewport: SIZES[VIEW] });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e.message).slice(0, 140)));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/ERR_(CONNECTION|TUNNEL|NAME)/.test(m.text()) && !/status of 404/.test(m.text()))
      errs.push(m.text().slice(0, 140));
  });
  const url = mode === 'prod' ? 'http://localhost:4322' + path : 'http://localhost:4399/proto.html' + hash;
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2200);
  const m = await page.evaluate(() => {
    const de = document.documentElement;
    // widest offender for horizontal overflow
    let worst = 0;
    let worstSel = '';
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0) return;
      const over = Math.round(r.right - de.clientWidth);
      if (over > worst) {
        worst = over;
        worstSel = el.tagName + (el.getAttribute('data-art') ? '[data-art=' + el.getAttribute('data-art') + ']' : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : '');
      }
    });
    const ribbon = document.querySelector('[data-ribbon]');
    return {
      height: de.scrollHeight,
      hScroll: de.scrollWidth - de.clientWidth,
      overflowPx: worst,
      overflowSel: worstSel,
      ribbonPaths: ribbon ? ribbon.querySelectorAll('path[data-strand]').length : 0,
      ribbonAria: ribbon ? ribbon.getAttribute('aria-hidden') : null,
      h1: document.querySelectorAll('[data-page] h1').length,
      slogan: !!document.querySelector('[data-slogan]'),
    };
  });
  await ctx.close();
  return { ...m, errs };
}

say(`\n=== ${VIEW} ===`);
say(['route'.padEnd(32), 'protoH'.padEnd(8), 'prodH'.padEnd(8), 'delta'.padEnd(6), 'paths', 'h1', 'ovf', 'errors'].join(' '));
let fails = 0;
for (const [key, path, hash] of ROUTES) {
  const a = await measure('proto', path, hash);
  const b = await measure('prod', path, hash);
  const d = b.height - a.height;
  const flag = Math.abs(d) > 24 || b.hScroll > 0 || b.ribbonPaths === 0 || b.h1 !== 1 || b.errs.length ? ' <<<' : '';
  if (flag) fails++;
  say([
    key.padEnd(32),
    String(a.height).padEnd(8),
    String(b.height).padEnd(8),
    String(d).padEnd(6),
    String(b.ribbonPaths).padEnd(5),
    String(b.h1).padEnd(2),
    String(b.hScroll).padEnd(3),
    b.errs.length ? b.errs.join(' | ') : '-',
    flag,
  ].join(' '));
}
say(fails ? `${fails} route(s) flagged` : 'all routes match');
await browser.close();
