/**
 * Capture review screenshots of the production build across breakpoints.
 *
 * Requires `npm run preview` (http://localhost:4322).
 * Usage: node scripts/capture-preview.mjs <output-directory>
 */
import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = process.argv[2];
const BASE = 'http://localhost:4322';
fs.mkdirSync(OUT, { recursive: true });

const SHOTS = [
  ['home-desktop', '/', 'desktop', 0],
  ['home-desktop-scrolled', '/', 'desktop', 0.42],
  ['work-desktop', '/work', 'desktop', 0.18],
  ['pricing-desktop', '/pricing', 'desktop', 0.3],
  ['contact-desktop', '/contact', 'desktop', 0.22],
  ['case-study-desktop', '/work/joan-leonardo', 'desktop', 0.2],
  ['home-tablet', '/', 'tablet', 0],
  ['home-mobile', '/', 'mobile', 0],
  ['pricing-mobile', '/pricing', 'mobile', 0.24],
  ['contact-mobile', '/contact', 'mobile', 0.2],
];

const SIZES = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 834, height: 1112 },
  mobile: { width: 390, height: 844 },
};

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [name, path, view, frac] of SHOTS) {
  const ctx = await browser.newContext({ viewport: SIZES[view], deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2600);
  if (frac) {
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.evaluate((y) => window.scrollTo(0, y), Math.round((h - SIZES[view].height) * frac));
    await page.waitForTimeout(1400);
  }
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log('shot', name);
  await ctx.close();
}
await browser.close();
