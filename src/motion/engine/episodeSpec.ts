import type { Actor, Cue, OrbKey, Spec } from './types';
import { CREAM, INK, LIME, WIPES } from './reelSpec';

const SPH: [number, number, number, number] = [1, 0, 0, 0], PYR: [number, number, number, number] = [0, 1, 0, 0], TOR: [number, number, number, number] = [0, 0, 1, 0], CUB: [number, number, number, number] = [0, 0, 0, 1];
export const EP_DUR = 6.6;
const SHAPE: Record<string, [number, number, number, number]> = {
  'monumental-apex': PYR, 'architectural-megastructure': CUB, 'gold-relic-depth': SPH, 'maritime-artery': TOR, 'rock-cut-colossal': CUB, 'futuristic-skyline': PYR,
  'ceremonial-pageant': TOR, 'classical-scholarship': SPH, 'solar-field': SPH, 'high-speed-rail': TOR, 'rural-renewal': SPH,
};

export interface EpisodeIn { W: number; H: number; lang: 'en' | 'ar'; title: string; ep: string; total: number; year: string; era: string; leader: string; subtitle: string; hero: string; second: string; composition: string; stat?: { value: string; unit: string; label: string }; epWord: string; scrollWord: string }

/** Greedy word-wrap + largest font size that keeps every line inside maxW. */
function fitTitle(text: string, maxW: number, sizes: number[], maxLines: number, k: number) {
  for (const size of sizes) {
    const per = Math.max(4, Math.floor(maxW / (k * size))), lines: string[] = []; let cur = '';
    for (const w of text.split(' ')) { if ((cur + ' ' + w).trim().length > per && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }
    if (cur) lines.push(cur);
    if (lines.length <= maxLines && lines.every((l) => l.length <= per + 2)) return { size, text: lines.join('\n'), n: lines.length };
  }
  const size = sizes[sizes.length - 1], per = Math.max(4, Math.floor(maxW / (k * size))), words = text.split(' '), lines: string[] = []; let cur = '';
  for (const w of words) { if ((cur + ' ' + w).trim().length > per && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }
  if (cur) lines.push(cur); return { size, text: lines.slice(0, maxLines).join('\n'), n: Math.min(lines.length, maxLines) };
}

/** Six-second procedural title sequence for an achievement; scrub t with scroll. Same engine as the showreel. */
export function buildEpisodeSpec(o: EpisodeIn): Spec {
  const { W, H, lang } = o, L = W >= H, R = L ? H : W, B1 = 2.5, B2 = 4.9, ar = lang === 'ar';
  const f = (xl: number, yl: number, xp: number, yp: number): [number, number] => (L ? [xl * W, yl * H] : [xp * W, yp * H]);
  const shape = SHAPE[o.composition] ?? SPH, actors: Actor[] = [];
  // ---- scene 1: title (ink)
  const tfit = fitTitle(o.title, (L ? 0.46 : 0.84) * W, L ? [150, 128, 108, 90, 76, 64] : [128, 108, 92, 78, 64], 4, ar ? 0.5 : 0.6);
  const [tx, ty] = f(0.07, 0.5, 0.08, 0.55), lh = 1.0;
  const [hx, hy] = f(0.54, 0, 0, 0.68);
  actors.push({ k: 'half', img: o.hero, x: hx, y: hy, w: L ? W * 0.46 : W, h: L ? H : H * 0.32, cell: L ? 15 : 14, color: CREAM, mode: 'light', reveal: [0.15, 1.6], t0: 0.05, t1: B1 - 0.45, depth: 0.35, drift: [0.06, 0], gain: 0.95 });
  actors.push({ k: 'brackets', x0: 72, y0: 72, x1: W - 72, y1: H - 72, len: 60, color: LIME, t0: 0.05, t1: B1 - 0.45, d: 0.9 });
  const [o1x, o1y] = f(0.8, 0.5, 0.5, 0.26);
  actors.push({ k: 'rings', x: o1x, y: o1y, r0: R * 0.3, r1: R * 0.48, n: 3, color: LIME, lw: 2, t0: 0.9, t1: B1 - 0.45, d: 1.2 });
  actors.push({ k: 'type', text: `${o.epWord} ${o.ep} / ${o.total}  ·  ${o.year}`, x: tx + 4, y: ty - (tfit.n * tfit.size * lh) / 2 - 56, size: 24, font: 'mono', color: LIME, t0: 0.25, t1: B1 - 0.5, stagger: 0.015 });
  actors.push({ k: 'type', text: tfit.text, x: tx, y: ty, size: tfit.size, font: 'display', color: CREAM, t0: 0.35, t1: B1 - 0.5, stagger: 0.04, lh });
  // ---- scene 2: the number (cream)
  const [s2x, s2y] = f(0.53, 0.5, 0.08, 0.56), [h2x, h2y] = f(0.53, 0.07, 0.08, 0.1);
  actors.push({ k: 'half', img: o.second, x: h2x, y: h2y, w: L ? W * 0.41 : W * 0.84, h: L ? H * 0.22 : H * 0.14, cell: 11, color: INK, mode: 'dark', reveal: [B1 + 0.5, B1 + 1.7], t0: B1 + 0.35, t1: B2 - 0.45, depth: 0.4, gain: 1.05 });
  const [o2x, o2y] = f(0.25, 0.5, 0.5, 0.32);
  actors.push({ k: 'rings', x: o2x, y: o2y, r0: R * 0.33, r1: R * 0.5, n: 3, color: INK, lw: 2, t0: B1 + 1.0, t1: B2 - 0.45, d: 1.2 });
  const st = o.stat;
  if (st) {
    const raw = st.value.replace(/,/g, ''), numeric = /^[\d.]+\+?$/.test(raw), dec = numeric ? (raw.split('.')[1] ?? '').replace(/\D.*/, '').length : 0;
    if (numeric) {
      const to = parseFloat(raw), digits = Math.round(to).toLocaleString('en-US').length + (dec ? dec + 1 : 0) + (raw.endsWith('+') ? 1 : 0), size = Math.min(L ? 240 : 230, ((L ? 0.42 : 0.84) * W) / (digits * 0.6));
      actors.push({ k: 'count', from: 0, to, dec, dur: 1.7, x: s2x, y: s2y - 20, size, font: 'display', color: INK, suffix: raw.endsWith('+') ? '+' : '', t0: B1 + 0.8, t1: B2 - 0.5 });
      if (st.unit) actors.push({ k: 'type', text: st.unit, x: s2x + 6, y: s2y + size * 0.55 + 40, size: Math.min(110, size * 0.5), font: 'display', color: INK, mark: LIME, t0: B1 + 1.5, t1: B2 - 0.5, stagger: 0.05 });
      actors.push({ k: 'type', text: st.label, x: s2x + 6, y: s2y + size * 0.55 + (st.unit ? 40 + Math.min(110, size * 0.5) + 36 : 50), size: 24, font: 'mono', color: INK, t0: B1 + 1.9, t1: B2 - 0.5, stagger: 0.012 });
    } else {
      const fit = fitTitle(st.value, (L ? 0.4 : 0.84) * W, [120, 100, 84, 70], 3, ar ? 0.5 : 0.6);
      actors.push({ k: 'type', text: fit.text, x: s2x, y: s2y - 30, size: fit.size, font: 'display', color: INK, mark: LIME, t0: B1 + 0.8, t1: B2 - 0.5, stagger: 0.05 });
      actors.push({ k: 'type', text: st.label, x: s2x + 6, y: s2y + (fit.n * fit.size) / 2 + 40, size: 24, font: 'mono', color: INK, t0: B1 + 1.6, t1: B2 - 0.5, stagger: 0.012 });
    }
  }
  actors.push({ k: 'grid', x: W * 0.07, y: H * (L ? 0.88 : 0.92), cols: 23, rows: 1, gap: (W * 0.86) / 22, r: 7, color: INK, t0: B1 + 0.6, t1: B2 - 0.45, d: 1.5 });
  // ---- scene 3: era + subtitle (lime)
  const [t3x, t3y] = f(0.07, 0.36, 0.08, 0.42), era = fitTitle(o.era, (L ? 0.6 : 0.84) * W, [110, 92, 76, 64], 2, ar ? 0.5 : 0.52);
  actors.push({ k: 'type', text: o.era, x: t3x, y: t3y, size: era.size, font: 'serif', color: INK, t0: B2 + 0.2, t1: 99, stagger: 0.03 });
  const sub = fitTitle(o.subtitle, (L ? 0.62 : 0.84) * W, L ? [44, 38, 32] : [42, 36, 30], 3, ar ? 0.52 : 0.58);
  actors.push({ k: 'type', text: sub.text, x: t3x + 4, y: t3y + era.size * 0.5 + 40 + (sub.n * sub.size) / 2, size: sub.size, font: 'display', color: INK, t0: B2 + 0.55, t1: 99, stagger: 0.012, lh: 1.15, weight: 700 });
  actors.push({ k: 'type', text: o.leader, x: t3x + 4, y: H * (L ? 0.8 : 0.82), size: 22, font: 'mono', color: INK, t0: B2 + 0.9, t1: 99, stagger: 0.008, opacity: 0.85 });
  actors.push({ k: 'type', text: `${o.scrollWord} ↓`, x: W * 0.5, y: H * (L ? 0.92 : 0.94), size: 20, font: 'mono', color: INK, align: 'c', t0: B2 + 1.2, t1: 99, stagger: 0.01, opacity: 0.7 });
  actors.push({ k: 'brackets', x0: 72, y0: 72, x1: W - 72, y1: H - 72, len: 60, color: INK, t0: B2 + 0.1, t1: 99, d: 0.9 });
  // ---- the traveller
  const [p3x, p3y] = f(0.86, 0.22, 0.82, 0.14);
  const orb: OrbKey[] = [
    { t: 0, x: o1x, y: H * 1.45, r: R * 0.05, w: SPH, base: LIME, dot: INK, ease: 'expo' },
    { t: 1.25, x: o1x, y: o1y, r: R * 0.26, w: SPH, base: LIME, dot: INK, spin: 0.7, ease: 'quart' },
    { t: B1 - 0.02, x: o1x + 20, y: o1y, r: R * 0.26, w: SPH, base: LIME, dot: INK, spin: 0.7 },
    { t: B1 + 0.02, x: o1x + 20, y: o1y, r: R * 0.26, w: SPH, base: INK, dot: LIME, spin: 0.7, ease: 'inout' },
    { t: B1 + 1.6, x: o2x, y: o2y, r: R * 0.3, w: shape, base: INK, dot: LIME, spin: 0.8, tilt: shape === TOR ? 0.9 : 0.2, ease: 'quart' },
    { t: B2 - 0.02, x: o2x, y: o2y, r: R * 0.3, w: shape, base: INK, dot: LIME, spin: 0.8, tilt: shape === TOR ? 0.9 : 0.2 },
    { t: B2 + 0.02, x: o2x, y: o2y, r: R * 0.3, w: shape, base: CREAM, dot: INK, spin: 0.8, tilt: shape === TOR ? 0.9 : 0.2, ease: 'inout' },
    { t: B2 + 1.2, x: p3x, y: p3y, r: R * 0.13, w: shape, base: CREAM, dot: INK, spin: 1.0, tilt: shape === TOR ? 0.9 : 0.3, ease: 'quart' },
    { t: EP_DUR, x: p3x, y: p3y, r: R * 0.13, w: shape, base: CREAM, dot: INK, spin: 1.0, tilt: shape === TOR ? 0.9 : 0.3 },
  ];
  const cues: Cue[] = [];
  return { dur: EP_DUR, W, H, scenes: [{ t0: 0, t1: B1, bg: INK }, { t0: B1, t1: B2, bg: CREAM }, { t0: B2, t1: EP_DUR, bg: LIME }], actors, orb, wipes: [WIPES[0], WIPES[1]], cues, light: [-0.55, 0.65, 0.85] };
}
