import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:4321';
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const browser = await chromium.launch({ executablePath: EXEC });
const out = [];
const LOG = process.env.VERIFY_LOG || '';
const ok = (label, pass, detail = '') => {
  const line = `${pass ? 'PASS' : 'FAIL'}  ${label}${detail ? ' \u2014 ' + detail : ''}`;
  out.push(line);
  if (LOG) fs.appendFileSync(LOG, line + '\n');
};

const newPage = async (opts = {}) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => ok('pageerror: ' + e.message.slice(0, 120), false));
  return p;
};

/* ---------- 1. ribbon reveals on scroll down and retracts on scroll up ---------- */
{
  const p = await newPage();
  await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(3000);
  const read = () =>
    p.evaluate(() => {
      const paths = [...document.querySelectorAll('[data-ribbon] path[data-strand="core"]')];
      return paths.reduce((s, el) => s + Math.abs(parseFloat(el.style.strokeDashoffset) || 0), 0);
    });
  const top = await read();
  await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.55));
  await p.waitForTimeout(1600);
  const mid = await read();
  await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.95));
  await p.waitForTimeout(1600);
  const bottom = await read();
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(1800);
  const back = await read();
  ok('ribbon reveals further on scroll down', bottom < mid && mid < top, `offset ${Math.round(top)} → ${Math.round(mid)} → ${Math.round(bottom)}`);
  ok('ribbon retracts on scroll up', back > bottom, `returned to ${Math.round(back)}`);

  const deco = await p.evaluate(() => {
    const l = document.querySelector('[data-ribbon]');
    return { aria: l.getAttribute('aria-hidden'), pe: getComputedStyle(l).pointerEvents, z: getComputedStyle(l).zIndex };
  });
  ok('ribbon is decorative', deco.aria === 'true' && deco.pe === 'none', `aria-hidden=${deco.aria} pointer-events=${deco.pe} z-index=${deco.z}`);

  // per-page path data differs
  const homeD = await p.evaluate(() => document.querySelector('[data-ribbon] path[data-strand="core"]').getAttribute('d'));
  await p.goto(BASE + '/contact', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2500);
  const contactD = await p.evaluate(() => document.querySelector('[data-ribbon] path[data-strand="core"]').getAttribute('d'));
  ok('ribbon path differs per route', homeD !== contactD);
  await p.context().close();
}

/* ---------- 2. ribbon initialises at a restored scroll position ---------- */
{
  const p = await newPage();
  await p.goto(BASE + '/pricing', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2000);
  await p.evaluate(() => window.scrollTo(0, 3000));
  await p.waitForTimeout(800);
  await p.reload({ waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2800);
  const st = await p.evaluate(() => ({
    y: window.scrollY,
    paths: document.querySelectorAll('[data-ribbon] path[data-strand]').length,
    drawn: [...document.querySelectorAll('[data-ribbon] path[data-strand="core"]')].some(
      (el) => parseFloat(el.style.strokeDashoffset) < parseFloat(el.style.strokeDasharray) * 0.98,
    ),
  }));
  ok('ribbon initialises after refresh at scroll position', st.paths > 0 && st.drawn, `scrollY=${Math.round(st.y)} paths=${st.paths}`);
  await p.context().close();
}

/* ---------- 3. reduced motion ---------- */
{
  const p = await newPage({ reducedMotion: 'reduce' });
  await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2500);
  const a = await p.evaluate(() =>
    [...document.querySelectorAll('[data-ribbon] path[data-strand]')].map((e) => e.getAttribute('stroke-opacity')).join(','),
  );
  await p.waitForTimeout(1500);
  const b = await p.evaluate(() =>
    [...document.querySelectorAll('[data-ribbon] path[data-strand]')].map((e) => e.getAttribute('stroke-opacity')).join(','),
  );
  const revealed = await p.evaluate(() => {
    const els = [...document.querySelectorAll('[data-rv]')];
    return els.length && els.every((e) => getComputedStyle(e).opacity === '1');
  });
  ok('reduced motion: ribbon holds a static composition', a === b);
  ok('reduced motion: all revealed content visible', revealed);
  await p.context().close();
}

/* ---------- 4. keyboard: skip link, services dropdown, mobile menu ---------- */
{
  const p = await newPage();
  await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2200);
  await p.keyboard.press('Tab');
  const first = await p.evaluate(() => {
    const el = document.activeElement;
    return { text: el.textContent.trim(), visible: el.getBoundingClientRect().top >= 0 };
  });
  ok('skip link is the first tab stop and becomes visible', /skip/i.test(first.text) && first.visible, first.text);

  await p.evaluate(() => document.querySelector('[data-svc-trigger]').focus());
  await p.keyboard.press('Enter');
  await p.waitForTimeout(500);
  const openState = await p.evaluate(() => {
    const w = document.querySelector('[data-svc-wrap]');
    const dd = w.querySelector('[data-dropdown]');
    return { open: w.getAttribute('data-open'), expanded: w.querySelector('[data-svc-trigger]').getAttribute('aria-expanded'), vis: getComputedStyle(dd).visibility };
  });
  ok('services dropdown opens from the keyboard', openState.open === 'true' && openState.expanded === 'true' && openState.vis === 'visible');
  await p.keyboard.press('Escape');
  await p.waitForTimeout(400);
  const closed = await p.evaluate(() => document.querySelector('[data-svc-wrap]').getAttribute('data-open'));
  ok('services dropdown closes on Escape', closed === 'false');
  await p.context().close();
}

{
  const p = await newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2200);
  await p.click('button[aria-label="Open menu"]');
  await p.waitForTimeout(500);
  const menu = await p.evaluate(() => {
    const m = document.querySelector('[data-menu]');
    return {
      display: getComputedStyle(m).display,
      role: m.getAttribute('role'),
      modal: m.getAttribute('aria-modal'),
      expanded: document.querySelector('button[aria-label="Open menu"]').getAttribute('aria-expanded'),
      bodyLocked: getComputedStyle(document.body).overflow,
      focusInside: m.contains(document.activeElement),
    };
  });
  ok('mobile menu opens with dialog semantics', menu.display === 'flex' && menu.role === 'dialog' && menu.modal === 'true' && menu.expanded === 'true');
  ok('mobile menu moves focus inside and locks the page', menu.focusInside && /hidden/.test(menu.bodyLocked));
  // services sub-list is reachable on touch
  await p.click('[data-sub-toggle]');
  await p.waitForTimeout(400);
  const sub = await p.evaluate(() => ({
    display: getComputedStyle(document.querySelector('[data-sub]')).display,
    expanded: document.querySelector('[data-sub-toggle]').getAttribute('aria-expanded'),
  }));
  ok('services sub-list opens on touch', sub.display === 'flex' && sub.expanded === 'true');
  await p.keyboard.press('Escape');
  await p.waitForTimeout(400);
  const after = await p.evaluate(() => getComputedStyle(document.querySelector('[data-menu]')).display);
  ok('mobile menu closes on Escape', after === 'none');
  await p.context().close();
}

/* ---------- 5. contact form states ---------- */
{
  const p = await newPage();
  await p.goto(BASE + '/contact', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2200);
  await p.click('[data-submit]');
  await p.waitForTimeout(500);
  const invalid = await p.evaluate(() => ({
    summary: document.querySelector('[data-summary]').style.display,
    nameErr: document.querySelector('[data-error-for="name"]').textContent.trim(),
    aria: document.querySelector('#name').getAttribute('aria-invalid'),
    focused: document.activeElement.id,
  }));
  ok('empty submit blocked with field errors', invalid.summary === 'block' && !!invalid.nameErr && invalid.aria === 'true' && invalid.focused === 'name', invalid.nameErr);

  await p.fill('#name', 'Test Person');
  await p.fill('#email', 'not-an-email');
  await p.selectOption('#projectType', { index: 1 });
  await p.fill('#description', 'A short description of the project that is long enough to pass.');
  await p.click('[data-submit]');
  await p.waitForTimeout(400);
  const emailErr = await p.evaluate(() => document.querySelector('[data-error-for="email"]').textContent.trim());
  ok('email format validated', /does not look complete/.test(emailErr), emailErr);

  await p.fill('#email', 'test@example.com');
  await p.click('[data-submit]');
  await p.waitForTimeout(2500);
  const result = await p.evaluate(() => ({
    form: getComputedStyle(document.querySelector('[data-form]')).display,
    success: getComputedStyle(document.querySelector('[data-success]')).display,
    failure: getComputedStyle(document.querySelector('[data-failure]')).display,
    btnDisabled: document.querySelector('[data-submit]').disabled,
  }));
  ok(
    'valid submit with no endpoint configured shows the failure state, not a false success',
    result.success === 'none' && result.failure !== 'none',
    `success=${result.success} failure=${result.failure}`,
  );
  await p.click('[data-on-click="retry"]');
  await p.waitForTimeout(400);
  const retried = await p.evaluate(() => getComputedStyle(document.querySelector('[data-form]')).display);
  ok('retry returns to the form', retried === 'flex');

  // CRM prefill from a call to action
  await p.goto(BASE + '/contact?service=crm-custom-systems', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2200);
  const crm = await p.evaluate(() => ({
    type: document.querySelector('#projectType').value,
    pkg: document.querySelector('#package').value,
    panel: getComputedStyle(document.querySelector('[data-crm-fields]')).display,
    budgetDisabled: document.querySelector('#budget').disabled,
  }));
  ok('?service=crm-custom-systems prefills and reveals the CRM question set',
    /CRM/.test(crm.type) && crm.pkg === 'crm-custom-quote' && crm.panel === 'flex' && crm.budgetDisabled === true);

  await p.goto(BASE + '/contact?package=growth-pro', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2200);
  const pkg = await p.evaluate(() => ({ pkg: document.querySelector('#package').value, type: document.querySelector('#projectType').value }));
  ok('?package=growth-pro prefills the plan', pkg.pkg === 'growth-pro' && /SEO/.test(pkg.type), `${pkg.pkg} / ${pkg.type}`);
  await p.context().close();
}

/* ---------- 6. routing: every nav item, browser back/forward, case-study order ---------- */
{
  const p = await newPage();
  await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(1500);
  const navTargets = await p.evaluate(() =>
    [...document.querySelectorAll('nav[aria-label="Primary"] a')].map((a) => [a.textContent.trim(), a.getAttribute('href')]),
  );
  for (const [label, href] of navTargets) {
    const r = await p.goto(BASE + href, { waitUntil: 'domcontentloaded' });
    const key = await p.evaluate(() => document.querySelector('[data-page]').getAttribute('data-page'));
    ok(`nav "${label}" → ${href}`, r.status() === 200, `page=${key}`);
  }

  // case-study routing: each project card opens its own case study
  await p.goto(BASE + '/work', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(1500);
  const cards = await p.evaluate(() =>
    [...document.querySelectorAll('a[href^="/work/"]')].map((a) => [a.getAttribute('href')]),
  );
  const seen = new Set();
  for (const [href] of cards) {
    if (seen.has(href)) continue;
    seen.add(href);
    await p.goto(BASE + href, { waitUntil: 'domcontentloaded' });
    const h1 = await p.evaluate(() => document.querySelector('[data-page] h1').textContent.trim());
    const key = await p.evaluate(() => document.querySelector('[data-page]').getAttribute('data-page'));
    ok(`project card ${href} opens its own case study`, key === 'work' + href.replace('/work', '').replace('/', '-'), `h1="${h1}" key=${key}`);
  }

  // browser back / forward
  await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await p.click('a[href="/pricing"]');
  await p.waitForTimeout(900);
  await p.goBack({ waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(900);
  const backKey = await p.evaluate(() => document.querySelector('[data-page]').getAttribute('data-page'));
  await p.goForward({ waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(900);
  const fwdKey = await p.evaluate(() => document.querySelector('[data-page]').getAttribute('data-page'));
  ok('browser back / forward navigate correctly', backKey === 'home' && fwdKey === 'pricing', `${backKey} → ${fwdKey}`);

  // anchor deep link clears the sticky header
  await p.goto(BASE + '/seo-growth-maintenance#growth-pro', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(1800);
  const anchor = await p.evaluate(() => {
    const t = document.getElementById('growth-pro');
    const h = document.querySelector('header').getBoundingClientRect();
    return { top: Math.round(t.getBoundingClientRect().top), header: Math.round(h.bottom) };
  });
  ok('anchor deep link lands below the sticky header', anchor.top >= anchor.header - 2, `target top=${anchor.top} header bottom=${anchor.header}`);

  // invalid route
  const r404 = await p.goto(BASE + '/does-not-exist', { waitUntil: 'domcontentloaded' });
  const h404 = await p.evaluate(() => (document.querySelector('h1') || {}).textContent || '');
  ok('invalid route serves the 404 fallback', /does not exist/i.test(h404), `status=${r404.status()}`);
  await p.context().close();
}

const summary = out.filter((l) => l.startsWith('FAIL')).length + ' failure(s) of ' + out.length + ' checks';
console.log(out.join('\n'));
console.log('\n' + summary);
if (LOG) fs.appendFileSync(LOG, '\n' + summary + '\n');
await browser.close();
