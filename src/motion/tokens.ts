/** Motion tokens from the motion-design skill (easing-tokens.md). Same values exist as CSS variables in index.css. */
export type Bez = [number, number, number, number];
export const EASE = {
  outCubic: [0.215, 0.61, 0.355, 1] as Bez,
  outQuart: [0.165, 0.84, 0.44, 1] as Bez,   // default for enter / reveal
  outExpo: [0.19, 1, 0.22, 1] as Bez,        // marketing hero, illustrative
  inOutCubic: [0.645, 0.045, 0.355, 1] as Bez, // on-screen morph
  inOutQuart: [0.77, 0, 0.175, 1] as Bez,    // large surfaces (wipes, curtains)
};
/** seconds */
export const DUR = { d1: 0.12, d2: 0.18, d3: 0.24, d4: 0.3, d5: 0.5, illustrative: 0.9 };
export const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
