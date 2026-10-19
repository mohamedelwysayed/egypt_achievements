import { ACHIEVEMENTS_DATA } from '../../data/achievementsData';
import type { Actor, Cue, OrbKey, Spec } from './types';

export const INK = '#111112', CREAM = '#f4f4ed', LIME = '#d2ff00';
const SPH: [number, number, number, number] = [1, 0, 0, 0], PYR: [number, number, number, number] = [0, 1, 0, 0], TOR: [number, number, number, number] = [0, 0, 1, 0], CUB: [number, number, number, number] = [0, 0, 0, 1];
export const WIPES: string[][] = [[LIME, INK, CREAM], [INK, CREAM, LIME], [CREAM, LIME, INK]];
const hero = (id: string) => ACHIEVEMENTS_DATA.find((a) => a.id === id)?.heroImage ?? '';

export const REEL_DUR = 15;
const STR = {
  en: { egypt: 'EGYPT', tag: 'THE ETERNAL CONTINUITY', top: 'SHOWREEL · 2026', years: 'YEARS', unbroken: 'OF UNBROKEN STATEHOOD', a: '3100 BCE', b: '2026 CE', one: 'ONE\nLINE.', one1: 'ONE LINE.', route: 'NILE → SUEZ → NEW CAPITAL', stories: 'STORIES' },
  ar: { egypt: 'مصر', tag: 'الاستمرارية الخالدة', top: 'عرض الأعمال · 2026', years: 'عام', unbroken: 'من الدولة المتصلة', a: '3100 ق.م', b: '2026 م', one: 'خطٌّ\nواحد.', one1: 'خطٌّ واحد.', route: 'النيل ← السويس ← العاصمة الجديدة', stories: 'قصة' },
};

/** 15-second showreel, 128 BPM (8 bars). Cuts land on bars 2/4/6. All motion is generated from code at runtime. */
export function buildReelSpec(W: number, H: number, lang: 'en' | 'ar'): Spec {
  const L = W >= H, S = STR[lang], u = L ? 1 : 0.68, f = (xl: number, yl: number, xp: number, yp: number): [number, number] => (L ? [xl * W, yl * H] : [xp * W, yp * H]);
  const B1 = 3.75, B2 = 7.5, B3 = 11.25;
  const actors: Actor[] = [];
  const R = L ? H : W; // reference radius unit
  // ---------------- scene 1 — EGYPT (ink)
  const [hx, hy] = f(0.54, 0, 0, 0.66), hw = L ? W * 0.46 : W, hh = L ? H : H * 0.34;
  actors.push({ k: 'half', img: hero('great-pyramid'), x: hx, y: hy, w: hw, h: hh, cell: L ? 15 : 14, color: CREAM, mode: 'light', reveal: [0.2, 1.9], t0: 0.1, t1: B1 - 0.45, depth: 0.35, drift: [0.07, 0], gain: 0.95 });
  actors.push({ k: 'brackets', x0: 72, y0: 72, x1: W - 72, y1: H - 72, len: 64, color: LIME, t0: 0.1, t1: B1 - 0.45, d: 1.0 });
  const [o1x, o1y] = f(0.82, 0.5, 0.5, 0.27);
  actors.push({ k: 'rings', x: o1x, y: o1y, r0: R * 0.3, r1: R * 0.5, n: 4, color: LIME, lw: 2, t0: 1.0, t1: B1 - 0.45, d: 1.4 });
  actors.push({ k: 'arc', x: o1x, y: o1y, r: R * 0.42, color: CREAM, lw: 3, t0: 1.2, t1: B1 - 0.45, d: 1.2, spin: 0.7 });
  const [t1x, t1y] = f(0.07, 0.46, 0.08, 0.53);
  actors.push({ k: 'type', text: S.egypt, x: t1x, y: t1y, size: (lang === 'ar' ? 300 : 320) * u * (L ? 1 : 0.9), font: 'display', color: CREAM, t0: 0.35, t1: B1 - 0.5, stagger: 0.07 });
  actors.push({ k: 'type', text: S.tag, x: t1x + 4, y: t1y + (L ? 215 : 150), size: 28 * (L ? 1 : 0.9), font: 'mono', color: LIME, t0: 1.55, t1: B1 - 0.5, stagger: 0.02 });
  actors.push({ k: 'type', text: S.top, x: t1x + 4, y: (L ? 0.11 : 0.06) * H, size: 22, font: 'mono', color: CREAM, t0: 0.5, t1: B1 - 0.5, stagger: 0.02, opacity: 0.8 });
  // ---------------- scene 2 — 7,000 YEARS (cream)
  const [s2x, s2y] = f(0.53, 0.5, 0.08, 0.5);
  const [hx2, hy2] = f(0.53, 0.07, 0.08, 0.76);
  actors.push({ k: 'half', img: hero('great-pyramid'), x: hx2, y: hy2, w: L ? W * 0.41 : W * 0.84, h: L ? H * 0.22 : H * 0.12, cell: 11, color: INK, mode: 'dark', reveal: [B1 + 0.55, B1 + 1.9], t0: B1 + 0.4, t1: B2 - 0.45, depth: 0.4, gain: 1.05 });
  const [o2x, o2y] = f(0.27, 0.5, 0.5, 0.2);
  actors.push({ k: 'rings', x: o2x, y: o2y, r0: R * 0.34, r1: R * 0.52, n: 3, color: INK, lw: 2, t0: B1 + 1.3, t1: B2 - 0.45, d: 1.3 });
  actors.push({ k: 'count', from: 0, to: 7000, dur: 1.9, x: s2x, y: s2y - 10 * u, size: (L ? 250 : 220), font: 'display', color: INK, t0: B1 + 0.85, t1: B2 - 0.5 });
  actors.push({ k: 'type', text: S.years, x: s2x + 6, y: s2y + (L ? 190 : 170), size: (lang === 'ar' ? 120 : 112) * u * (L ? 1 : 1.2), font: 'display', color: INK, mark: LIME, t0: B1 + 1.7, t1: B2 - 0.5, stagger: 0.06 });
  actors.push({ k: 'type', text: S.unbroken, x: s2x + 6, y: s2y + (L ? 290 : 262), size: 26, font: 'mono', color: INK, t0: B1 + 2.1, t1: B2 - 0.5, stagger: 0.015 });
  actors.push({ k: 'ruler', x0: W * 0.07, x1: W * 0.93, y: H * (L ? 0.84 : 0.93), ticks: 50, color: INK, l0: S.a, l1: S.b, size: 22, t0: B1 + 0.5, t1: B2 - 0.5, d: 2.4 });
  // ---------------- scene 3 — ONE LINE (lime)
  const [t3x, t3y] = f(0.07, 0.5, 0.08, 0.52);
  const [hx3, hy3] = f(0.66, 0.46, 0.08, 0.7);
  actors.push({ k: 'half', img: hero('new-suez-canal'), x: hx3, y: hy3, w: L ? W * 0.27 : W * 0.84, h: L ? H * 0.26 : H * 0.12, cell: 10, color: INK, mode: 'dark', reveal: [B2 + 0.7, B2 + 2.0], t0: B2 + 0.5, t1: B3 - 0.45, depth: 0.45, gain: 1.1 });
  actors.push({ k: 'grid', x: L ? W * 0.58 : W * 0.5, y: L ? H * 0.12 : H * 0.3, cols: L ? 12 : 6, rows: L ? 5 : 3, gap: 36, r: 7, color: INK, t0: B2 + 0.9, t1: B3 - 0.45, d: 1.4 });
  actors.push({ k: 'type', text: L ? S.one1 : S.one, x: t3x, y: t3y + (L ? 0 : 140), size: (lang === 'ar' ? 190 : 225) * (L ? 1 : 1.25), font: 'display', color: INK, t0: B2 + 0.55, t1: B3 - 0.5, stagger: 0.06, lh: 0.95 });
  actors.push({ k: 'type', text: S.route, x: t3x + 4, y: H * (L ? 0.7 : 0.8), size: 26, font: 'mono', color: INK, t0: B2 + 1.5, t1: B3 - 0.5, stagger: 0.012 });
  const ry = (a: number) => a * H;
  actors.push({ k: 'route', pts: [[W * 0.07, ry(L ? 0.86 : 0.92)], [W * 0.3, ry(L ? 0.81 : 0.9)], [W * 0.52, ry(L ? 0.87 : 0.91)], [W * 0.75, ry(L ? 0.8 : 0.9)], [W * 0.93, ry(L ? 0.84 : 0.92)]], color: INK, lw: 6, t0: B2 + 0.6, t1: B3 - 0.45, d: 2.6 });
  // ---------------- scene 4 — 23 stories + end card (ink)
  const ids = ACHIEVEMENTS_DATA.map((a) => a.id), cols = L ? 6 : 3, rows = L ? 4 : 8, gap = 14, gw = W * 0.88, tw = (gw - gap * (cols - 1)) / cols, th = L ? 150 : 150, gx = W * 0.06, gy = L ? H * 0.14 : H * 0.07;
  ids.slice(0, 23).forEach((id, i) => {
    const c = i % cols, r = Math.floor(i / cols), t0 = B3 + 0.35 + (c * 0.05 + r * 0.09) + ((i * 7) % 5) * 0.012;
    actors.push({ k: 'half', img: hero(id), x: gx + c * (tw + gap), y: gy + r * (th + gap), w: tw, h: th, cell: 9, color: LIME, mode: 'light', reveal: [t0, t0 + 0.9], t0, t1: 13.15 + ((i * 3) % 7) * 0.03, depth: 0.3 + (r % 3) * 0.2, gain: 1.15 });
  });
  const lastC = 23 % cols, lastR = Math.floor(23 / cols);
  actors.push({ k: 'count', from: 0, to: 23, dur: 1.0, x: gx + lastC * (tw + gap) + 8, y: gy + lastR * (th + gap) + th * 0.42, size: 120, font: 'display', color: LIME, t0: B3 + 1.1, t1: 13.1 });
  actors.push({ k: 'type', text: S.stories, x: gx + lastC * (tw + gap) + 12, y: gy + lastR * (th + gap) + th * 0.86, size: 22, font: 'mono', color: CREAM, t0: B3 + 1.5, t1: 13.1, stagger: 0.02 });
  actors.push({ k: 'brackets', x0: 72, y0: 72, x1: W - 72, y1: H - 72, len: 64, color: LIME, t0: B3 + 0.1, t1: 99, d: 0.9 });
  const [e1x, e1y] = f(0.5, 0.67, 0.5, 0.62);
  actors.push({ k: 'type', text: S.egypt, x: e1x, y: e1y, size: (lang === 'ar' ? 300 : 300) * (L ? 1 : 0.8), font: 'display', color: CREAM, align: 'c', t0: 13.3, t1: 99, stagger: 0.08 });
  actors.push({ k: 'type', text: S.tag, x: e1x, y: e1y + (L ? 178 : 160), size: 30, font: 'mono', color: INK, align: 'c', mark: LIME, t0: 13.9, t1: 99, stagger: 0.018 });
  // ---------------- the traveller
  const [a1x, a1y] = f(0.79, 0.52, 0.5, 0.27), [a2x, a2y] = f(0.27, 0.5, 0.5, 0.2);
  const orb: OrbKey[] = [
    { t: 0, x: a1x, y: H * 1.45, r: R * 0.05, w: SPH, base: LIME, dot: INK, ease: 'expo' },
    { t: 1.45, x: a1x, y: a1y, r: R * 0.27, w: SPH, base: LIME, dot: INK, spin: 0.7, ease: 'quart' },
    { t: B1 - 0.02, x: a1x + 30, y: a1y, r: R * 0.27, w: SPH, base: LIME, dot: INK, spin: 0.7 },
    { t: B1 + 0.02, x: a1x + 30, y: a1y, r: R * 0.27, w: SPH, base: INK, dot: LIME, spin: 0.7, ease: 'inout' },
    { t: B1 + 1.7, x: a2x, y: a2y, r: R * 0.3, w: PYR, base: INK, dot: LIME, spin: 0.8, tilt: 0.18, ease: 'quart' },
    { t: B2 - 0.02, x: a2x, y: a2y, r: R * 0.3, w: PYR, base: INK, dot: LIME, spin: 0.8, tilt: 0.18 },
    { t: B2 + 0.02, x: a2x, y: a2y, r: R * 0.3, w: PYR, base: CREAM, dot: INK, spin: 0.8, tilt: 0.18, ease: 'inout' },
    { t: B2 + 1.0, x: L ? W * 0.22 : W * 0.3, y: L ? H * 0.3 : H * 0.2, r: R * 0.2, w: TOR, base: CREAM, dot: INK, spin: 0.9, tilt: 1.05, roll: 0.3, ease: 'quart' },
    { t: B3 - 0.4, x: L ? W * 0.82 : W * 0.7, y: L ? H * 0.28 : H * 0.17, r: R * 0.2, w: TOR, base: CREAM, dot: INK, spin: 1.3, tilt: 0.8, roll: -0.3, ease: 'inout' },
    { t: B3 + 0.35, x: W * 0.5, y: H * (L ? 0.55 : 0.5), r: R * 0.2, w: CUB, base: CREAM, dot: INK, spin: 0.9, tilt: 0.4, ease: 'quart' },
    { t: 13.0, x: W * 0.5, y: H * (L ? 0.55 : 0.5), r: R * 0.22, w: CUB, base: CREAM, dot: INK, spin: 0.9, tilt: 0.4, ease: 'quart' },
    { t: 13.9, x: e1x, y: L ? H * 0.31 : H * 0.28, r: R * (L ? 0.2 : 0.2), w: SPH, base: LIME, dot: INK, spin: 0.7, tilt: 0.25, ease: 'quart' },
    { t: REEL_DUR, x: e1x, y: L ? H * 0.31 : H * 0.28, r: R * (L ? 0.2 : 0.2), w: SPH, base: LIME, dot: INK, spin: 0.7 },
  ];
  const cues: Cue[] = [
    { t: 1.3, k: 'whoosh' }, { t: B1, k: 'hit' }, { t: 4.9, k: 'whoosh' }, { t: B2, k: 'hit' }, { t: 8.3, k: 'whoosh' }, { t: B3, k: 'hit' }, { t: 11.7, k: 'whoosh' }, { t: 13.2, k: 'whoosh' }, { t: 13.9, k: 'bell' }, { t: 14.35, k: 'bell' },
    ...Array.from({ length: 5 }, (_, i) => ({ t: 0.35 + i * 0.07, k: 'tick' as const })),
    ...Array.from({ length: 16 }, (_, i) => ({ t: B1 + 0.9 + i * 0.075, k: 'tick' as const })),
  ];
  return { dur: REEL_DUR, W, H, scenes: [{ t0: 0, t1: B1, bg: INK }, { t0: B1, t1: B2, bg: CREAM }, { t0: B2, t1: B3, bg: LIME }, { t0: B3, t1: REEL_DUR, bg: INK }], actors, orb, wipes: WIPES, cues, light: [-0.55, 0.65, 0.85] };
}
