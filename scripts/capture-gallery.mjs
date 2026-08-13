/**
 * Capture every route at desktop and mobile for visual review.
 * Requires `npm run preview` (http://localhost:4322).
 * Usage: node scripts/capture-gallery.mjs <output-directory>
 */
import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = process.argv[2];
const BASE = process.argv[3] || 'http://localhost:4322';
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
  ['home', '/'],
  ['work', '/work'],
  ['work-luxury-listings-dr', '/work/luxury-listings-dr'],
  ['work-joan-leonardo', '/work/joan-leonardo'],
  ['work-custom-real-estate-crm', '/work/custom-real-estate-crm'],
  ['work-create-studio', '/work/create-studio'],
  ['services', '/services'],
  ['services-web-design-development', '/services/web-design-development'],
  ['services-website-redesign', '/services/website-redesign'],
  ['services-crm-custom-systems', '/services/crm-custom-systems'],
  ['services-seo-performance', '/services/seo-performance'],
  ['services-hosting-maintenance', '/services/hosting-maintenance'],
  ['services-digital-branding', '/services/digital-branding'],
  ['process', '/process'],
  ['pricing', '/pricing'],
  ['seo-growth-maintenance', '/seo-growth-maintenance'],
  ['about', '/about'],
  ['contact', '/contact'],
  ['privacy', '/privacy'],
  ['404', '/does-not-exist'],
];

const SIZES = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

for (const view of ['desktop', 'mobile']) {
  const ctx = await browser.newContext({ viewport: SIZES[view], deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [name, path] of ROUTES) {
    await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2400);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${OUT}/${view}-${name}.png` });
    console.log(view, name);
  }
  await ctx.close();
}

// a few mid-scroll frames so the ribbon's progression is visible
const ctx = await browser.newContext({ viewport: SIZES.desktop, deviceScaleFactor: 1 });
const page = await ctx.newPage();
for (const [name, path, frac] of [
  ['home-scroll-25', '/', 0.25],
  ['home-scroll-55', '/', 0.55],
  ['home-scroll-90', '/', 0.9],
  ['pricing-scroll-40', '/pricing', 0.4],
]) {
  await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2400);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.evaluate((y) => window.scrollTo(0, y), Math.round((h - 900) * frac));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/scroll-${name}.png` });
  console.log('scroll', name);
}
await ctx.close();
await browser.close();
