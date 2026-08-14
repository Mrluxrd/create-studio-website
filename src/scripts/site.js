/**
 * Create Studio — production runtime.
 *
 * A direct port of the approved prototype's behaviour, with the preview-only
 * hash router removed. Every route now serves one real page, so the ribbon,
 * reveal, motion-tagging and form systems each initialise once per document
 * load and clean up on unload.
 *
 * The ribbon is decorative: it is aria-hidden, never receives pointer events,
 * and honours prefers-reduced-motion by resolving straight to its approved
 * static composition.
 */
import { CONTACT_ENDPOINT, isContactEndpointConfigured } from '../data/forms';

const root = document.body;
const $ = (sel, ctx = root) => ctx.querySelector(sel);
const $$ = (sel, ctx = root) => Array.prototype.slice.call(ctx.querySelectorAll(sel));

const reduceMotion = !!(
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

/* ======================================================================== */
/* Ribbon — page-specific path data, scroll-linked reveal                    */
/* ======================================================================== */

/**
 * Per-route waypoints. Every route keeps its own path, placement, curves and
 * folds exactly as approved; nothing here is shared between pages.
 */
function ribbonWaypoints(key) {
  const P = {
    home: [[0.86, -0.03], [0.6, 0.022], [0.8, 0.058], [0.9, 0.105], [0.56, 0.175], [0.26, 0.245], [0.6, 0.325], [0.34, 0.425], [0.66, 0.525], [0.38, 0.635], [0.62, 0.735], [0.3, 0.85], [0.44, 0.96]],
    services: [[0.16, -0.03], [0.42, 0.028], [0.2, 0.1], [0.08, 0.19], [0.34, 0.28], [0.66, 0.37], [0.3, 0.47], [0.7, 0.575], [0.32, 0.67], [0.68, 0.775], [0.4, 0.87], [0.56, 0.98]],
    work: [[0.88, -0.03], [0.66, 0.04], [0.9, 0.12], [0.96, 0.22], [0.78, 0.32], [0.3, 0.41], [0.08, 0.52], [0.16, 0.64], [0.44, 0.74], [0.74, 0.84], [0.6, 0.93], [0.5, 0.99]],
    process: [[0.24, -0.03], [0.46, 0.04], [0.22, 0.12], [0.12, 0.22], [0.32, 0.31], [0.2, 0.41], [0.38, 0.5], [0.26, 0.6], [0.44, 0.69], [0.32, 0.79], [0.48, 0.89], [0.5, 0.99]],
    pricing: [[0.82, -0.03], [0.94, 0.06], [0.72, 0.14], [0.88, 0.24], [0.9, 0.36], [0.76, 0.47], [0.86, 0.58], [0.78, 0.7], [0.84, 0.81], [0.72, 0.9], [0.6, 0.99]],
    about: [[0.18, -0.03], [0.52, 0.02], [0.78, 0.08], [0.56, 0.16], [0.18, 0.24], [0.34, 0.34], [0.66, 0.43], [0.44, 0.54], [0.24, 0.65], [0.46, 0.76], [0.62, 0.87], [0.52, 0.98]],
    contact: [[0.8, -0.03], [0.52, 0.03], [0.74, 0.1], [0.9, 0.2], [0.94, 0.32], [0.8, 0.44], [0.9, 0.56], [0.94, 0.68], [0.78, 0.8], [0.62, 0.9], [0.5, 0.99]],
    privacy: [[0.92, -0.03], [0.84, 0.12], [0.9, 0.3], [0.82, 0.5], [0.88, 0.7], [0.84, 0.88], [0.8, 0.99]],
    'seo-growth-maintenance': [[0.86, -0.03], [0.7, 0.06], [0.88, 0.16], [0.94, 0.28], [0.8, 0.4], [0.9, 0.52], [0.84, 0.66], [0.9, 0.78], [0.82, 0.9], [0.74, 0.99]],
    'service-web-design-development': [[0.22, -0.03], [0.56, 0.03], [0.3, 0.11], [0.1, 0.2], [0.38, 0.3], [0.72, 0.4], [0.42, 0.51], [0.74, 0.62], [0.46, 0.73], [0.66, 0.84], [0.54, 0.94]],
    'service-website-redesign': [[0.24, -0.03], [0.58, 0.04], [0.34, 0.13], [0.14, 0.23], [0.42, 0.34], [0.2, 0.45], [0.48, 0.56], [0.26, 0.67], [0.52, 0.78], [0.34, 0.88], [0.46, 0.97]],
    'service-crm-custom-systems': [[0.88, -0.03], [0.68, 0.05], [0.84, 0.14], [0.92, 0.25], [0.74, 0.35], [0.86, 0.46], [0.72, 0.57], [0.84, 0.68], [0.74, 0.79], [0.82, 0.89], [0.78, 0.98]],
    'service-seo-performance': [[0.84, -0.03], [0.94, 0.07], [0.78, 0.17], [0.9, 0.29], [0.82, 0.41], [0.92, 0.53], [0.8, 0.65], [0.88, 0.77], [0.8, 0.88], [0.76, 0.98]],
    'service-hosting-maintenance': [[0.2, -0.03], [0.34, 0.06], [0.16, 0.16], [0.26, 0.28], [0.14, 0.4], [0.24, 0.52], [0.16, 0.64], [0.26, 0.76], [0.18, 0.87], [0.28, 0.97]],
    'service-digital-branding': [[0.78, -0.03], [0.46, 0.04], [0.66, 0.12], [0.86, 0.22], [0.6, 0.32], [0.34, 0.42], [0.56, 0.53], [0.78, 0.64], [0.56, 0.75], [0.4, 0.86], [0.5, 0.96]],
    'work-luxury-listings-dr': [[0.9, -0.03], [0.64, 0.05], [0.88, 0.14], [0.96, 0.26], [0.78, 0.37], [0.9, 0.49], [0.8, 0.62], [0.88, 0.75], [0.78, 0.87], [0.7, 0.98]],
    'work-joan-leonardo': [[0.16, -0.03], [0.44, 0.04], [0.2, 0.13], [0.08, 0.25], [0.3, 0.36], [0.14, 0.48], [0.28, 0.61], [0.16, 0.74], [0.26, 0.86], [0.34, 0.97]],
    'work-custom-real-estate-crm': [[0.86, -0.03], [0.58, 0.04], [0.8, 0.13], [0.92, 0.25], [0.7, 0.36], [0.84, 0.48], [0.66, 0.6], [0.82, 0.72], [0.72, 0.85], [0.64, 0.97]],
    'work-create-studio': [[0.22, -0.03], [0.52, 0.03], [0.28, 0.12], [0.12, 0.23], [0.36, 0.34], [0.62, 0.45], [0.34, 0.57], [0.58, 0.69], [0.3, 0.81], [0.44, 0.92], [0.5, 0.99]],
  };
  if (P[key]) return P[key];
  if (key.indexOf('work-') === 0) return [[0.9, -0.03], [0.62, 0.05], [0.86, 0.15], [0.94, 0.28], [0.76, 0.4], [0.88, 0.54], [0.78, 0.68], [0.86, 0.82], [0.76, 0.94]];
  if (key.indexOf('service-') === 0) return [[0.2, -0.03], [0.5, 0.04], [0.26, 0.14], [0.12, 0.26], [0.4, 0.38], [0.22, 0.5], [0.44, 0.63], [0.28, 0.76], [0.42, 0.9]];
  return [[0.9, -0.03], [0.8, 0.12], [0.9, 0.3], [0.8, 0.5], [0.9, 0.7], [0.84, 0.9]];
}

/** Per-route thickness progression: wide and layered at the top, refined at the foot. */
function ribbonCfg(key) {
  const C = {
    home: { top: 2.05, end: 0.3, seg: 8 },
    services: { top: 1.72, end: 0.34, seg: 7 },
    work: { top: 1.58, end: 0.28, seg: 7 },
    process: { top: 1.5, end: 0.32, seg: 7 },
    pricing: { top: 1.16, end: 0.26, seg: 6 },
    about: { top: 1.82, end: 0.32, seg: 7 },
    contact: { top: 1.4, end: 0.28, seg: 6 },
    privacy: { top: 1.0, end: 0.3, seg: 5 },
    'seo-growth-maintenance': { top: 1.24, end: 0.3, seg: 6 },
  };
  if (C[key]) return C[key];
  if (key.indexOf('work-') === 0) return { top: 1.3, end: 0.26, seg: 6 };
  if (key === 'service-web-design-development') return { top: 1.66, end: 0.32, seg: 7 };
  if (key === 'service-digital-branding') return { top: 1.54, end: 0.34, seg: 7 };
  if (key === 'service-crm-custom-systems') return { top: 1.34, end: 0.28, seg: 6 };
  if (key.indexOf('service-') === 0) return { top: 1.28, end: 0.28, seg: 6 };
  return { top: 1.1, end: 0.3, seg: 5 };
}

function ribbonD(xs, W, H, dx, ph, cfg, i0, i1) {
  const n = xs.length;
  const pts = [];
  const tp = cfg || { top: 1, end: 1 };
  const vh = window.innerHeight || 800;
  const HB = 0.12;
  const heroH = Math.min(H * 0.45, Math.max(vh * 1.15, H * 0.1));
  const endY = Math.max(heroH + vh * 0.5, tp.endY || H);
  const mapY = (by) => (by <= HB ? (by / HB) * heroH : heroH + ((by - HB) / (1 - HB)) * (endY - heroH));
  for (let i = 0; i < n; i++) {
    const w = xs[i];
    const bx = typeof w === 'number' ? w : w[0];
    const by = typeof w === 'number' ? -0.06 + (i / (n - 1)) * 1.02 : w[1];
    const yf = Math.max(0, Math.min(1, by));
    const narrowing = (tp.top + (tp.end - tp.top) * Math.pow(yf, 0.8)) / (tp.top || 1);
    pts.push([(bx + (dx || 0) * narrowing * Math.sin(i * 1.65 + (ph || 0))) * W, mapY(by)]);
  }
  const a0 = i0 == null ? 0 : i0;
  const b0 = i1 == null ? n - 1 : i1;
  let d = 'M' + pts[a0][0].toFixed(1) + ',' + pts[a0][1].toFixed(1);
  for (let i = a0; i < b0; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || pts[i + 1];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ' C' + c1x.toFixed(1) + ',' + c1y.toFixed(1) + ' ' + c2x.toFixed(1) + ',' + c2y.toFixed(1) + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1);
  }
  return d;
}

/** Bands of real content the ribbon must not cross — text, media, forms, cards. */
function quietBands(page, H) {
  const bands = [];
  const pTop = page.getBoundingClientRect().top + window.scrollY;
  $$('[style*="border-radius"], form, input, textarea, img, h1, h2, p, dl, li', page).forEach((el) => {
    const st = el.getAttribute('style') || '';
    const tag = el.tagName;
    const isText = tag === 'H1' || tag === 'H2' || tag === 'P' || tag === 'DL' || tag === 'LI';
    if (!isText && tag !== 'FORM' && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'IMG' && !/border:\s*1px/.test(st) && !/background/.test(st)) return;
    const r = el.getBoundingClientRect();
    if (isText ? r.height < 34 || r.width < 200 : r.height < 90 || r.width < 170) return;
    const pad = isText ? 40 : 70;
    const a = r.top + window.scrollY - pTop - pad;
    const b = r.bottom + window.scrollY - pTop + pad;
    bands.push([Math.max(0, a), Math.min(H, b)]);
  });
  bands.sort((x, y) => x[0] - y[0]);
  const out = [];
  bands.forEach((bd) => {
    const last = out[out.length - 1];
    if (last && bd[0] <= last[1] + 40) last[1] = Math.max(last[1], bd[1]);
    else out.push([bd[0], bd[1]]);
  });
  return out.filter((bd) => bd[1] - bd[0] > 120).slice(0, 14);
}

function sloganY(page, H) {
  const el = $('[data-slogan]', page);
  if (!el) return null;
  const pTop = page.getBoundingClientRect().top + window.scrollY;
  const r = el.getBoundingClientRect();
  const y = r.top + window.scrollY - pTop + r.height * 0.62;
  return y > H * 0.3 && y < H ? y : null;
}

function maskStops(page, H) {
  const q = quietBands(page, H);
  let s = '<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.045" stop-color="#fff" stop-opacity="1"/>';
  let prev = 0.05;
  q.forEach((bd) => {
    const a = Math.min(0.75, Math.max(0.06, bd[0] / H));
    const b = Math.min(0.76, Math.max(0.07, bd[1] / H));
    if (b - a < 0.008 || a < prev + 0.006) return;
    prev = b;
    const heroLift = Math.max(0, 1 - a / 0.17);
    const fl = (0.26 + 0.4 * heroLift).toFixed(3);
    s +=
      '<stop offset="' + a.toFixed(4) + '" stop-color="#fff" stop-opacity="1"/>' +
      '<stop offset="' + Math.min(0.755, a + 0.012).toFixed(4) + '" stop-color="#fff" stop-opacity="' + fl + '"/>' +
      '<stop offset="' + Math.max(a + 0.013, b - 0.012).toFixed(4) + '" stop-color="#fff" stop-opacity="' + fl + '"/>' +
      '<stop offset="' + b.toFixed(4) + '" stop-color="#fff" stop-opacity="1"/>';
  });
  const sy = sloganY(page, H);
  const hold = sy ? Math.max(prev + 0.01, Math.min(0.985, (sy - 30) / H)) : 0.79;
  const fade = sy ? Math.min(0.999, (sy + 26) / H) : 0.94;
  return s + '<stop offset="' + hold.toFixed(4) + '" stop-color="#fff" stop-opacity="1"/><stop offset="' + fade.toFixed(4) + '" stop-color="#fff" stop-opacity="0"/>';
}

function ribbonSvg(page, key, W, H) {
  const xs = ribbonWaypoints(key);
  const cfg = Object.assign({}, ribbonCfg(key), { endY: sloganY(page, H) || H * 0.9 });
  const narrow = W < 900;
  const s = narrow ? 0.5 : W < 1200 ? 0.76 : 1;
  const STR = [
    { k: 'haze', dx: 0.04, ph: 0.4, w: 62, o: 0.115, blur: 1 },
    { k: 'wide', dx: 0.022, ph: 1.25, w: 32, o: 0.27 },
    { k: 'mid', dx: 0.009, ph: 2.1, w: 11, o: 0.34 },
    { k: 'core', dx: 0, ph: 0, w: 2.4, o: 0.78 },
    { k: 'comp', dx: -0.03, ph: 2.9, w: 3.6, o: 0.26 },
  ];
  const g = 'csg-' + key;
  const m = 'csm-' + key;
  const b = 'csb-' + key;
  const n = xs.length;
  const SEG = Math.max(4, Math.min(cfg.seg || 6, n - 1));
  let inner = '';
  STR.forEach((st) => {
    let segs = '';
    for (let j = 0; j < SEG; j++) {
      const i0 = Math.round((j * (n - 1)) / SEG);
      const i1 = Math.round(((j + 1) * (n - 1)) / SEG);
      if (i1 <= i0) continue;
      const mid = Math.pow((j + 0.5) / SEG, 0.8);
      const f = cfg.top + (cfg.end - cfg.top) * mid;
      const fn = Math.max(0, Math.min(1, (f - cfg.end) / Math.max(0.01, cfg.top - cfg.end)));
      const w = Math.max(0.9, st.w * s * f);
      const o = st.o * (st.k === 'core' ? 0.74 + 0.34 * fn : 0.3 + 0.86 * fn);
      segs += '<path data-strand="' + st.k + '" d="' + ribbonD(xs, W, H, st.dx, st.ph, cfg, i0, i1) + '" fill="none" stroke="url(#' + g + ')" stroke-width="' + w.toFixed(1) + '" stroke-linecap="round" stroke-opacity="' + o.toFixed(3) + '"></path>';
    }
    inner += st.blur ? '<g data-parallax="" filter="url(#' + b + ')">' + segs + '</g>' : segs;
  });
  const coreD = ribbonD(xs, W, H, 0, 0, cfg);
  inner += '<path data-strand="spark" d="' + coreD + '" fill="none" stroke="#E9F0FF" stroke-width="' + Math.max(1.4, 3.1 * s).toFixed(1) + '" stroke-linecap="round" stroke-opacity="0"></path>';
  return (
    '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" focusable="false" aria-hidden="true">' +
    '<defs>' +
    '<linearGradient id="' + g + '" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="' + H + '"><stop offset="0" stop-color="#2563FF"/><stop offset="0.42" stop-color="#5A63FA"/><stop offset="0.76" stop-color="#8B5CF6"/><stop offset="1" stop-color="#6746DC"/></linearGradient>' +
    '<linearGradient id="' + m + '-g" x1="0" y1="0" x2="0" y2="1">' + maskStops(page, H) + '</linearGradient>' +
    '<mask id="' + m + '"><rect x="0" y="0" width="' + W + '" height="' + H + '" fill="url(#' + m + '-g)"/></mask>' +
    '<filter id="' + b + '" x="-30%" y="-5%" width="160%" height="110%"><feGaussianBlur stdDeviation="' + (narrow ? 12 : 26) + '"/></filter>' +
    '</defs><g mask="url(#' + m + ')">' + inner + '</g></svg>'
  );
}

const ribbon = {
  page: null,
  layer: null,
  cur: 0,
  target: 0,
  raf: 0,
  syncTimer: 0,
  ro: null,
};

function clearBaseBg(page) {
  if (page.__bgClean) return;
  page.__bgClean = 1;
  $$('main, main section, main > div', page).forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.backgroundImage === 'none' && /^rgb\(11, 11, 14\)$/.test(cs.backgroundColor)) {
      el.style.backgroundColor = 'transparent';
    }
  });
}

function syncRibbon() {
  const page = ribbon.page;
  const layer = ribbon.layer;
  if (!page || !layer) return;
  clearBaseBg(page);
  const W = Math.round(page.clientWidth);
  const H = Math.round(page.offsetHeight);
  if (!W || !H) return;
  if (layer.__w !== W || layer.__h !== H) {
    layer.__w = W;
    layer.__h = H;
    layer.innerHTML = ribbonSvg(page, page.getAttribute('data-page') || 'home', W, H);
    const LAG = { haze: 0.055, wide: 0.034, mid: 0.016, core: 0, comp: 0.045 };
    const PAR = { haze: -46, wide: -28, mid: -14, core: 0, comp: 22 };
    const SI = { haze: 0, wide: 1, mid: 2, core: 3, comp: 4 };
    const byK = {};
    layer.__spark = null;
    $$('path[data-strand]', layer).forEach((p) => {
      let L = 0;
      try {
        L = p.getTotalLength();
      } catch (e) {
        L = H * 1.4;
      }
      const k = p.getAttribute('data-strand');
      if (k === 'spark') {
        const seg = Math.max(70, Math.min(260, L * 0.055));
        p.style.strokeDasharray = seg + ' ' + (L * 2).toFixed(0);
        layer.__spark = { p: p, L: L, seg: seg };
        return;
      }
      p.style.strokeDasharray = L;
      p.style.strokeDashoffset = L;
      (byK[k] = byK[k] || []).push({
        p: p,
        L: L,
        k: k,
        lag: LAG[k] || 0,
        par: PAR[k] || 0,
        si: SI[k] || 0,
        o: parseFloat(p.getAttribute('stroke-opacity')) || 0.3,
      });
    });
    const list = [];
    Object.keys(byK).forEach((k) => {
      const segs = byK[k];
      const tot = segs.reduce((sum, o) => sum + o.L, 0) || 1;
      let acc = 0;
      segs.forEach((o) => {
        o.c0 = acc / tot;
        acc += o.L;
        o.c1 = acc / tot;
        list.push(o);
      });
    });
    layer.__paths = list;
    const core = byK.core || [];
    const ctot = core.reduce((sum, o) => sum + o.L, 0) || 1;
    const vhRef = (window.innerHeight || 800) * 1.15;
    let cum = 0;
    let base = 0.14;
    for (let i = 0; i < core.length; i++) {
      cum += core[i].L;
      let bb = null;
      try {
        bb = core[i].p.getBBox();
      } catch (e) {
        bb = null;
      }
      if (bb && bb.y + bb.height > vhRef) {
        base = cum / ctot;
        break;
      }
      base = cum / ctot;
    }
    layer.__base = Math.max(0.12, Math.min(0.46, base + 0.085));
    let cy = 0;
    layer.__yc = core.map((o) => {
      let bb = null;
      try {
        bb = o.p.getBBox();
      } catch (e) {
        bb = null;
      }
      const c0 = cy / ctot;
      cy += o.L;
      return { y0: bb ? bb.y : 0, y1: bb ? bb.y + bb.height : H, c0: c0, c1: cy / ctot };
    });
    layer.__grad = layer.querySelector('linearGradient[id^="csg-"]');
    layer.__par = layer.querySelector('[data-parallax]');
  }
  updateRibbon(true);
}

/**
 * Progress is measured against this page's own scrollable length, so a short
 * route and a long route both resolve at their own slogan.
 */
function updateRibbon(jump) {
  const layer = ribbon.layer;
  const page = ribbon.page;
  if (!layer || !page || !layer.__paths) return;
  const H = layer.__h || 1;
  const vh = window.innerHeight || 800;
  const top = page.getBoundingClientRect().top + window.scrollY;
  const span = Math.max(vh * 0.9, H - vh);
  const frac = Math.max(0, Math.min(1, (window.scrollY - top) / span));
  const base = layer.__base != null ? layer.__base : 0.16;
  let p = base + (1 - base) * frac;
  const yc = layer.__yc;
  if (yc && yc.length) {
    const yT = window.scrollY - top + vh * 1.06;
    let f = null;
    if (yT <= yc[0].y0) f = 0;
    else
      for (let i = 0; i < yc.length; i++) {
        if (yT <= yc[i].y1 || i === yc.length - 1) {
          const s = yc[i];
          const t = Math.max(0, Math.min(1, (yT - s.y0) / Math.max(1, s.y1 - s.y0)));
          f = s.c0 + t * (s.c1 - s.c0);
          break;
        }
      }
    if (f != null) p = Math.max(0.04, Math.min(1, f + 0.02));
  }
  if (reduceMotion) p = 1;
  ribbon.target = p;
  if (jump || reduceMotion) ribbon.cur = p;
  if (!ribbon.raf) ribbon.raf = requestAnimationFrame(tickRibbon);
}

function tickRibbon() {
  ribbon.raf = 0;
  const layer = ribbon.layer;
  if (!layer || !layer.__paths) return;
  const rm = reduceMotion;
  const t = (performance.now ? performance.now() : Date.now()) / 1000;
  const diff = ribbon.target - ribbon.cur;
  ribbon.cur += diff * 0.14;
  if (Math.abs(diff) < 0.0004) ribbon.cur = ribbon.target;
  const c = ribbon.cur;
  const H = layer.__h || 1;
  layer.__paths.forEach((o) => {
    const amb = rm ? 0 : Math.sin(t * 0.29 + o.si * 1.7) * 0.005;
    const gp = Math.max(0, Math.min(1, (c - o.lag + amb) * 1.03));
    const span = Math.max(0.0001, o.c1 - o.c0);
    const pi = Math.max(0, Math.min(1, (gp - o.c0) / span));
    o.p.style.strokeDashoffset = (o.L * (1 - pi)).toFixed(1);
    if (!rm) {
      const breathe = 1 + Math.sin(t * 0.38 + o.si * 2.1 + o.c0 * 3.4) * (o.k === 'core' ? 0.09 : 0.16);
      o.p.setAttribute('stroke-opacity', Math.max(0.015, o.o * breathe).toFixed(3));
      const dy = c * o.par * (1 - o.c0 * 0.55) + Math.sin(t * 0.21 + o.si) * (o.k === 'core' ? 0.6 : 2.4);
      o.p.setAttribute('transform', 'translate(0,' + dy.toFixed(2) + ')');
    }
  });
  if (layer.__grad) {
    const shift = rm ? 0 : (c * 0.18 + Math.sin(t * 0.16) * 0.045) * H;
    layer.__grad.setAttribute('gradientTransform', 'translate(0,' + (-shift).toFixed(1) + ')');
  }
  const sp = layer.__spark;
  if (sp) {
    if (rm) sp.p.setAttribute('stroke-opacity', '0');
    else {
      const front = sp.L * Math.min(1, c * 1.03);
      const cycle = (t * 0.052) % 1;
      const pos = Math.max(sp.seg * 0.5, front - sp.seg - cycle * Math.min(sp.L * 0.55, front));
      sp.p.style.strokeDashoffset = (-pos).toFixed(1);
      const fade = Math.min(1, c * 6) * (0.32 + 0.26 * (0.5 + 0.5 * Math.sin(t * 0.9)));
      sp.p.setAttribute('stroke-opacity', fade.toFixed(3));
    }
  }
  if (layer.__par) layer.__par.setAttribute('transform', 'translate(0,' + (rm ? 0 : c * -34).toFixed(1) + ')');
  // Reduced motion resolves to the approved static composition and stops here.
  if (!rm) ribbon.raf = requestAnimationFrame(tickRibbon);
}

const onRibbonScroll = () => updateRibbon(false);
const syncRibbonSoon = () => {
  clearTimeout(ribbon.syncTimer);
  ribbon.syncTimer = setTimeout(syncRibbon, 90);
};

function initRibbon() {
  const page = $('[data-page]');
  if (!page) return;
  ribbon.page = page;
  let layer = page.querySelector('[data-ribbon]');
  if (!layer || layer.parentElement !== page) {
    layer = document.createElement('div');
    layer.setAttribute('data-ribbon', '');
    layer.setAttribute('aria-hidden', 'true');
    page.insertBefore(layer, page.firstChild);
  }
  ribbon.layer = layer;

  window.addEventListener('scroll', onRibbonScroll, { passive: true });
  window.addEventListener('resize', syncRibbonSoon, { passive: true });
  if ('ResizeObserver' in window) {
    ribbon.ro = new ResizeObserver(syncRibbonSoon);
    ribbon.ro.observe(document.body);
  }
  syncRibbon();
  // Late reflows (web fonts, lazily loaded artwork) re-measure the page length.
  setTimeout(syncRibbon, 600);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncRibbonSoon);
  window.addEventListener('load', syncRibbonSoon, { once: true });
  // Restored scroll positions on back/forward need a fresh measurement.
  window.addEventListener('pageshow', () => {
    syncRibbon();
    updateRibbon(true);
  });
}

function teardownRibbon() {
  if (ribbon.ro) ribbon.ro.disconnect();
  if (ribbon.raf) cancelAnimationFrame(ribbon.raf);
  clearTimeout(ribbon.syncTimer);
  window.removeEventListener('scroll', onRibbonScroll);
  window.removeEventListener('resize', syncRibbonSoon);
}

/* ======================================================================== */
/* Artwork placement notes                                                   */
/* ======================================================================== */

/**
 * Keeps handoff annotations inside their placement box when they are switched
 * on for review. Returns immediately in production, where they are hidden.
 */
let artPos = null;
let artObs = null;
function placeArtLabels() {
  $$('[data-art-slot]').forEach((art) => {
    const label = art.querySelector('[data-art-label]');
    if (!label || getComputedStyle(art).position !== 'absolute') return;
    if (getComputedStyle(art).display === 'none' || getComputedStyle(label).display === 'none') return;
    label.style.padding = '14px 18px';
    label.style.gap = '6px';
    label.style.maxWidth = '420px';
    const sect = art.parentElement;
    if (!sect) return;
    const ar = art.getBoundingClientRect();
    const sr = sect.getBoundingClientRect();
    if (!ar.width || !sr.width) return;
    let top = Infinity;
    let bottom = -Infinity;
    let right = -Infinity;
    $$('h1,h2,h3,p,a,button,div[data-row]', sect).forEach((e) => {
      if (art.contains(e) || !e.textContent.trim()) return;
      const r = e.getBoundingClientRect();
      if (!r.width || !r.height) return;
      top = Math.min(top, r.top);
      bottom = Math.max(bottom, r.bottom);
      right = Math.max(right, r.right);
    });
    const pad = 20;
    let lw = label.offsetWidth || 320;
    let lh = label.offsetHeight || 96;
    const artTop = Math.max(ar.top, sr.top);
    const artBot = Math.min(ar.bottom, sr.bottom);
    const roomBelow = bottom === -Infinity ? artBot - artTop : artBot - bottom;
    const roomAbove = top === Infinity ? artBot - artTop : top - artTop;
    let y;
    let corner = false;
    let cornerW = 280;
    if (roomBelow >= lh + 16) y = artBot - lh - 14;
    else if (roomAbove >= lh + 16) y = artTop + 14;
    else {
      corner = true;
      const edge = right === -Infinity ? sr.left : right;
      cornerW = Math.max(180, Math.min(280, sr.right - 26 - edge - 10));
      label.style.padding = '8px 14px';
      label.style.gap = '2px';
      label.style.maxWidth = cornerW + 'px';
      lh = label.offsetHeight || lh;
      lw = label.offsetWidth || lw;
      y = sr.bottom - lh - 10;
    }
    y = Math.min(Math.max(y, sr.top + 8), sr.bottom - lh - 8);
    const artLeft = Math.max(ar.left, 0);
    const artRight = Math.min(ar.right, sr.right);
    let x;
    if (corner) x = sr.right - lw - 26;
    else
      x =
        right !== -Infinity && artRight - right >= lw + pad * 2
          ? artRight - lw - pad
          : artLeft + Math.max(pad, (artRight - artLeft - lw) / 2);
    x = Math.min(Math.max(x, Math.max(artLeft, sr.left) + 12), sr.right - lw - 12);
    const nx = Math.round(x - ar.left) + 'px';
    const ny = Math.round(y - ar.top) + 'px';
    const nw = corner ? cornerW + 'px' : Math.min(420, Math.max(220, artRight - artLeft - pad * 2)) + 'px';
    if (label.style.left !== nx) label.style.left = nx;
    if (label.style.top !== ny) label.style.top = ny;
    if (label.style.maxWidth !== nw) label.style.maxWidth = nw;
    if (!artPos) artPos = new WeakMap();
    artPos.set(label, { nx, ny, nw, pd: label.style.padding, gp: label.style.gap });
    if (!artObs) {
      artObs = new MutationObserver((muts) => {
        if (placeArtLabels.applying) return;
        placeArtLabels.applying = true;
        muts.forEach((m) => {
          const el = m.target;
          const v = artPos && artPos.get(el);
          if (!v || el.style.left === v.nx) return;
          el.style.left = v.nx;
          el.style.top = v.ny;
          el.style.maxWidth = v.nw;
          el.style.padding = v.pd;
          el.style.gap = v.gp;
        });
        placeArtLabels.applying = false;
      });
    }
    artObs.observe(label, { attributes: true, attributeFilter: ['style'] });
  });
}

/* ======================================================================== */
/* Reveals and motion tagging                                                */
/* ======================================================================== */

let io = null;
function observeReveals() {
  const els = $$('[data-page] [data-rv]:not(.csv-in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach((e) => e.classList.add('csv-in'));
    return;
  }
  if (io) io.disconnect();
  io = new IntersectionObserver(
    (entries) => {
      entries
        .filter((e) => e.isIntersecting)
        .forEach((e, i) => {
          e.target.style.animationDelay = Math.min(i * 55, 350) + 'ms';
          e.target.classList.add('csv-in');
          io.unobserve(e.target);
        });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  );
  els.forEach((e) => io.observe(e));
}

function tagMotion(page) {
  if (!page || page.dataset.mDone) return;
  page.dataset.mDone = '1';
  const R = /border-radius:\s*(1[6-9]|2\d|3\d)px/;
  const B = /border:\s*1px solid/;
  const st = (el) => el.getAttribute('style') || '';
  $$('a[data-route]', page).forEach((a) => {
    const s = st(a);
    if (R.test(s) && B.test(s)) a.setAttribute('data-m', 'card');
  });
  $$('div,article,li', page).forEach((d) => {
    if (d.hasAttribute('data-m') || d.closest('a[data-m]')) return;
    const s = st(d);
    const txt = (d.textContent || '').trim();
    if (!R.test(s) || /pointer-events:\s*none/.test(s)) return;
    if (!B.test(s) && !/background/.test(s)) return;
    if (txt.length < 12 || txt.length > 1400) return;
    if (d.querySelector('h1')) return;
    const big =
      d.tagName !== 'ARTICLE' &&
      $$('h2,h3', d).some((x) => parseFloat((x.getAttribute('style') || '').replace(/.*font-size:\s*/, '')) >= 48);
    if (big) return;
    d.setAttribute('data-m', 'box');
  });
  $$('[data-m]', page).forEach((el) => {
    if (el.parentElement && el.parentElement.closest('[data-m]')) el.removeAttribute('data-m');
  });
  $$('[data-m]', page).forEach((el) => {
    const txt = el.textContent || '';
    if (!(/US\$\s?[\d,]{3,}/.test(txt) || /custom quote/i.test(txt)) || txt.length > 1600 || !el.querySelector('h2,h3')) return;
    el.setAttribute('data-m', 'pkg');
    const price = $$('div,span,strong', el)
      .reverse()
      .find((n) => n.children.length <= 1 && /^((from\s+)?US\$\s?[\d,]+|custom quote)/i.test((n.textContent || '').trim()));
    if (price) price.setAttribute('data-m-price', '');
    $$('div', el)
      .filter((n) => {
        const s = st(n);
        return /display:\s*flex/.test(s) && /align-items:\s*flex-start/.test(s) && (n.textContent || '').length < 220;
      })
      .slice(0, 8)
      .forEach((n) => n.setAttribute('data-m-feat', ''));
  });
  $$('a[data-route]', page).forEach((a) => {
    const s = st(a);
    if (a.hasAttribute('data-m') || a.hasAttribute('data-btn-primary') || a.hasAttribute('data-btn-ghost')) return;
    if (/border-bottom/.test(s)) a.setAttribute('data-m', 'link');
  });
  $$('span[aria-hidden="true"]', page).forEach((s) => {
    if (/[→›]/.test(s.textContent || '')) s.setAttribute('data-m-arrow', '');
  });
}

/* ======================================================================== */
/* Navigation                                                                */
/* ======================================================================== */

const openMenu = () => {
  const m = $('[data-menu]');
  if (!m) return;
  m.style.display = 'flex';
  m.classList.remove('csv-menu-in');
  void m.offsetWidth;
  m.classList.add('csv-menu-in');
  document.body.style.overflow = 'hidden';
  const b = $('button[aria-label="Open menu"]');
  if (b) b.setAttribute('aria-expanded', 'true');
  const first = m.querySelector('a, button');
  if (first) setTimeout(() => first.focus(), 60);
};

const closeMenu = () => {
  const m = $('[data-menu]');
  if (!m) return;
  const wasOpen = m.style.display === 'flex';
  m.style.display = 'none';
  m.classList.remove('csv-menu-in');
  document.body.style.overflow = '';
  const b = $('button[aria-label="Open menu"]');
  if (b) {
    b.setAttribute('aria-expanded', 'false');
    if (wasOpen) b.focus();
  }
};

const toggleSub = () => {
  const s = $('[data-sub]');
  const t = $('[data-sub-toggle]');
  const i = $('[data-sub-icon]');
  if (!s) return;
  const open = s.style.display === 'flex';
  s.style.display = open ? 'none' : 'flex';
  s.classList.toggle('csv-exp', !open);
  if (!open) void s.offsetWidth;
  if (t) t.setAttribute('aria-expanded', String(!open));
  if (i) i.style.transform = open ? 'rotate(0deg)' : 'rotate(45deg)';
};

let kbdOpen = false;
let svcTimer = 0;

const setDropdown = (open) => {
  const w = $('[data-svc-wrap]');
  if (!w) return;
  const t = w.querySelector('[data-svc-trigger]');
  const c = w.querySelector('[data-svc-caret]');
  w.setAttribute('data-open', String(open));
  if (t) t.setAttribute('aria-expanded', String(open));
  if (c) c.style.transform = open ? 'rotate(225deg) translateY(2px)' : 'rotate(45deg) translateY(-1px)';
  if (open && kbdOpen) {
    const first = w.querySelector('[data-dropdown] a');
    if (first) setTimeout(() => first.focus(), 40);
  }
};

const toggleDropdown = (e) => {
  const w = $('[data-svc-wrap]');
  if (!w) return;
  kbdOpen = !!(e && e.detail === 0);
  setDropdown(w.getAttribute('data-open') !== 'true');
};

const dropdownKeys = (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    kbdOpen = true;
    setDropdown(true);
  }
};

function initNav() {
  const w = $('[data-svc-wrap]');
  if (!w) return;
  const cancelClose = () => clearTimeout(svcTimer);
  const scheduleClose = () => {
    if (kbdOpen) return;
    clearTimeout(svcTimer);
    svcTimer = setTimeout(() => {
      if (!w.matches(':hover')) setDropdown(false);
    }, 320);
  };
  w.addEventListener('mouseleave', () => {
    if (w.getAttribute('data-open') !== 'true' || kbdOpen) return;
    scheduleClose();
  });
  w.addEventListener('mouseenter', cancelClose);
  const dd = w.querySelector('[data-dropdown]');
  if (dd) {
    dd.addEventListener('mouseenter', cancelClose);
    dd.addEventListener('mouseleave', scheduleClose);
  }
  w.addEventListener('focusout', (e) => {
    if (!w.contains(e.relatedTarget)) setDropdown(false);
  });
  w.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setDropdown(false);
      const t = w.querySelector('[data-svc-trigger]');
      if (t) t.focus();
    }
  });
}

/* ======================================================================== */
/* Work filter                                                               */
/* ======================================================================== */

const setFilter = (e) => {
  const f = e.currentTarget.getAttribute('data-filter');
  $$('[data-filter]').forEach((b) => {
    const on = b.getAttribute('data-filter') === f;
    b.setAttribute('aria-pressed', String(on));
    b.style.borderColor = on ? 'rgba(139,92,246,.55)' : 'rgba(248,250,252,.14)';
    b.style.background = on ? 'rgba(139,92,246,.12)' : 'transparent';
    b.style.color = on ? '#F8FAFC' : '#A1A1AA';
    const dot = b.querySelector('[data-dot]');
    if (dot) dot.style.background = on ? '#8B5CF6' : 'transparent';
  });
  $$('[data-card]').forEach((c) => {
    c.style.display = f === 'All' || c.getAttribute('data-card') === f ? 'flex' : 'none';
  });
  syncRibbonSoon();
};

/* ======================================================================== */
/* Contact form                                                              */
/* ======================================================================== */

let syncCrm = null;

function preselectCrm() {
  const type = $('#projectType');
  const pkg = $('#package');
  if (type) type.value = 'CRM or Custom System';
  if (pkg) {
    pkg.value = 'crm-custom-quote';
    pkg.style.borderColor = 'rgba(139,92,246,.6)';
    pkg.style.boxShadow = '0 0 0 3px rgba(139,92,246,.14)';
    setTimeout(() => {
      pkg.style.boxShadow = 'none';
    }, 1600);
  }
  if (syncCrm) syncCrm();
}

function preselect(p) {
  if (!p) return;
  const sel = $('#package');
  if (sel && Array.prototype.some.call(sel.options, (o) => o.value === p)) {
    sel.value = p;
    sel.style.borderColor = 'rgba(139,92,246,.6)';
    sel.style.boxShadow = '0 0 0 3px rgba(139,92,246,.14)';
    setTimeout(() => {
      sel.style.boxShadow = 'none';
    }, 1600);
    const type = $('#projectType');
    const map = {
      'crm-custom-quote': 'CRM or Custom System',
      essential: 'New Website',
      business: 'New Website',
      premium: 'New Website',
      'custom-website': 'Other',
      'essential-care': 'Hosting & Maintenance',
      growth: 'SEO & Performance',
      'growth-pro': 'SEO & Performance',
    };
    if (type && map[p]) {
      const m = Array.prototype.find.call(type.options, (o) => o.value === map[p]);
      if (m) type.value = m.value;
    }
  }
  if (syncCrm) syncCrm();
}

function bindCrm() {
  const type = $('#projectType');
  const pkg = $('#package');
  const panel = $('[data-crm-fields]');
  const budget = $('#budget');
  if (!type || !panel) return;
  const isCrm = () => /CRM or Custom System/i.test(type.value) || (pkg && /crm-custom-quote/.test(pkg.value));
  let crmWas = null;
  syncCrm = () => {
    const on = isCrm();
    panel.style.display = on ? 'flex' : 'none';
    if (on && !panel.classList.contains('csv-exp')) {
      panel.classList.add('csv-exp');
      void panel.offsetWidth;
    }
    if (!on) panel.classList.remove('csv-exp');
    if (on) {
      if (pkg && pkg.value !== 'crm-custom-quote') pkg.value = 'crm-custom-quote';
      if (budget) {
        budget.value = '';
        budget.disabled = true;
        budget.style.opacity = '.5';
      }
    } else if (budget) {
      budget.disabled = false;
      budget.style.opacity = '1';
    }
    const note = $('[data-budget-note]');
    if (note) note.style.display = on ? 'block' : 'none';
    const live = $('[data-crm-live]');
    if (live && crmWas !== on) {
      live.textContent = on
        ? 'CRM and custom system questions added below. This inquiry is quoted individually — no package subtotal is applied.'
        : 'CRM and custom system questions hidden.';
    }
    crmWas = on;
    syncRibbonSoon();
  };
  type.addEventListener('change', syncCrm);
  if (pkg) pkg.addEventListener('change', syncCrm);
  const pair = (selId, boxSel) => {
    const el = $(selId);
    const box = $(boxSel);
    if (!el || !box) return;
    const upd = () => {
      box.style.display = el.value === 'Yes' ? 'block' : 'none';
    };
    el.addEventListener('change', upd);
    upd();
  };
  pair('#crmExisting', '[data-crm-existing]');
  pair('#crmIntegrations', '[data-crm-integrations]');
  syncCrm();
}

function showError(id, msg) {
  const box = $('[data-error-for="' + id + '"]');
  const input = $('#' + id);
  if (box) {
    box.textContent = msg;
    box.style.display = 'block';
  }
  if (input) {
    input.style.borderColor = 'rgba(248,113,113,.7)';
    input.setAttribute('aria-invalid', 'true');
    if (box && box.id) input.setAttribute('aria-describedby', box.id);
  }
}

function clearError(id) {
  const box = $('[data-error-for="' + id + '"]');
  const input = $('#' + id);
  if (box) {
    box.textContent = '';
    box.style.display = 'none';
  }
  if (input) {
    input.style.borderColor = 'rgba(248,250,252,.12)';
    input.removeAttribute('aria-invalid');
  }
}

function validate() {
  const v = (id) => ($('#' + id) || {}).value || '';
  const errors = [];
  ['name', 'email', 'projectType', 'description'].forEach(clearError);
  if (!v('name').trim()) {
    showError('name', 'Please tell us your name.');
    errors.push('name');
  }
  const email = v('email').trim();
  if (!email) {
    showError('email', 'We need an email to send the proposal.');
    errors.push('email');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    showError('email', 'That email address does not look complete.');
    errors.push('email');
  }
  if (!v('projectType')) {
    showError('projectType', 'Choose the type of project.');
    errors.push('projectType');
  }
  if (v('description').trim().length < 20) {
    showError('description', 'A sentence or two about the project helps us quote it properly.');
    errors.push('description');
  }
  return errors;
}

function setSubmitting(on) {
  const btn = $('[data-submit]');
  const spin = $('[data-spinner]');
  const label = $('[data-submit-label]');
  if (btn) {
    btn.disabled = on;
    btn.setAttribute('aria-busy', String(on));
    btn.style.opacity = on ? '.75' : '1';
    btn.style.cursor = on ? 'wait' : 'pointer';
  }
  if (spin) spin.style.display = on ? 'block' : 'none';
  if (label) label.textContent = on ? 'Sending…' : 'Send project inquiry';
}

const submit = async (e) => {
  e.preventDefault();
  const form = $('[data-form]');
  const summary = $('[data-summary]');
  const errors = validate();
  if (errors.length) {
    if (summary) {
      summary.textContent =
        errors.length + ' field' + (errors.length > 1 ? 's need' : ' needs') + ' attention before this can be sent.';
      summary.style.display = 'block';
    }
    const first = $('#' + errors[0]);
    if (first) first.focus();
    return;
  }
  if (summary) summary.style.display = 'none';

  // Honeypot: a bot that fills the hidden field is silently accepted and dropped.
  const trap = form && form.querySelector('input[name="company_website"]');
  const trapped = !!(trap && trap.value);

  setSubmitting(true);
  let ok = false;
  try {
    if (trapped) {
      ok = true;
    } else if (isContactEndpointConfigured()) {
      const data = new FormData(form);
      data.delete('company_website');
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      ok = res.ok;
    } else {
      // No delivery destination configured yet — never report a false success.
      ok = false;
      if (import.meta.env.DEV) {
        console.warn(
          '[contact form] PUBLIC_CONTACT_ENDPOINT is not set. See .env.example — the form cannot deliver until it is configured.',
        );
      }
    }
  } catch (err) {
    ok = false;
  }
  setSubmitting(false);

  const success = $('[data-success]');
  const failure = $('[data-failure]');
  if (ok) {
    if (form) form.style.display = 'none';
    if (failure) failure.style.display = 'none';
    if (success) {
      success.style.display = 'flex';
      success.setAttribute('tabindex', '-1');
      success.focus({ preventScroll: false });
    }
  } else {
    if (form) form.style.display = 'none';
    if (failure) {
      failure.style.display = 'flex';
      failure.setAttribute('tabindex', '-1');
      failure.focus({ preventScroll: false });
    }
  }
  syncRibbonSoon();
};

const retry = () => {
  const failure = $('[data-failure]');
  const form = $('[data-form]');
  if (failure) failure.style.display = 'none';
  if (form) form.style.display = 'flex';
  const first = $('#name');
  if (first) first.focus();
  syncRibbonSoon();
};

const reset = () => {
  const form = $('[data-form]');
  const success = $('[data-success]');
  if (success) success.style.display = 'none';
  if (form) {
    form.reset();
    form.style.display = 'flex';
  }
  if (syncCrm) syncCrm();
  const first = $('#name');
  if (first) first.focus();
  syncRibbonSoon();
};

/** Contact prefill from ?service= / ?package= call-to-action parameters. */
function applyPrefill() {
  if (!$('[data-form]')) return;
  const qp = new URLSearchParams(window.location.search);
  if (qp.get('service') === 'crm-custom-systems') preselectCrm();
  else preselect(qp.get('package'));
}

/* ======================================================================== */
/* Boot                                                                      */
/* ======================================================================== */

const HANDLERS = {
  openMenu,
  closeMenu,
  toggleSub,
  toggleDropdown,
  dropdownKeys,
  setFilter,
  submit,
  retry,
  reset,
};

function bindDeclaredHandlers() {
  ['click', 'keydown', 'submit'].forEach((evt) => {
    $$('[data-on-' + evt + ']').forEach((el) => {
      const fn = HANDLERS[el.getAttribute('data-on-' + evt)];
      if (fn) el.addEventListener(evt, fn);
    });
  });
}

function init() {
  const page = $('[data-page]');

  bindDeclaredHandlers();
  initNav();
  bindCrm();
  applyPrefill();
  tagMotion(page);
  observeReveals();
  initRibbon();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  let lastW = window.innerWidth;
  let artTimer = 0;
  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      clearTimeout(artTimer);
      artTimer = setTimeout(placeArtLabels, 150);
    },
    { passive: true },
  );
  requestAnimationFrame(() => {
    placeArtLabels();
    setTimeout(placeArtLabels, 400);
  });

  // Decorative motion must never gate access to content.
  setTimeout(() => $$('[data-rv]').forEach((e) => e.classList.add('csv-in')), 2200);

  window.addEventListener('pagehide', teardownRibbon, { once: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
