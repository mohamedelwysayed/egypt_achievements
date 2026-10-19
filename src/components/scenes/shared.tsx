import React, { CSSProperties, createContext, useContext, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import chroma from 'chroma-js';
import { reduced } from '../../motion/tokens';

/** 0→1 ramp between scroll-progress a and b, evaluated by the browser from --p (no React re-renders). */
export const k = (a: number, b: number) => `clamp(0,calc((var(--p) - ${a}) / ${+(b - a).toFixed(4)}),1)`;
export const rnd = (seed: number) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
/** ease-out-quart of a 0..1 ramp, evaluated in CSS (motion-design skill: enter/reveal = ease-out family). */
export const ek = (a: number, b: number) => `calc(1 - pow(calc(1 - ${k(a, b)}), 4))`;
const fb = { transformBox: 'fill-box' } as const;
export const rise = (a: number, b: number, o = '50% 100%'): CSSProperties => ({ transform: `scaleY(${ek(a, b)})`, ...fb, transformOrigin: o });
export const sweep = (a: number, b: number, o = '0% 50%'): CSSProperties => ({ transform: `scaleX(${ek(a, b)})`, ...fb, transformOrigin: o });
export const fade = (a: number, b: number): CSSProperties => ({ opacity: ek(a, b) as unknown as number });
export const fadeOut = (a: number, b: number): CSSProperties => ({ opacity: `calc(1 - ${k(a, b)})` as unknown as number });
export const draw = (a: number, b: number): CSSProperties => ({ strokeDasharray: 1, strokeDashoffset: `calc(1 - ${ek(a, b)})` as unknown as number });
export const move = (a: number, b: number, dx: number, dy = 0): CSSProperties => ({ transform: `translate(calc(${k(a, b)} * ${dx}px), calc(${k(a, b)} * ${dy}px))` });
export const pop = (a: number, b: number): CSSProperties => ({ transform: `scale(calc(0.82 + 0.18 * ${ek(a, b)}))`, ...fb, transformOrigin: 'center', opacity: ek(a, b) as unknown as number });
export const spin = (turns: number): CSSProperties => ({ transform: `rotate(calc(var(--p) * ${turns * 360}deg))`, ...fb, transformOrigin: 'center' });
export const both = (...s: CSSProperties[]): CSSProperties => Object.assign({}, ...s);

export type SceneProps = { c: string };

/* ───────── colour / lighting helpers (chroma-js) ───────── */
export const lite = (c: string, n = 0.8) => chroma(c).brighten(n).saturate(0.2).hex();
export const dark = (c: string, n = 1) => chroma(c).darken(n).desaturate(0.2).hex();
/** Three-tone palette for a lit solid: top catches the light, front is mid, side is in shadow. */
export const tones = (c: string) => ({ top: lite(c, 0.9), front: c, side: dark(c, 1.1), edge: lite(c, 1.6) });

/* ───────── procedural textures: rendered once to a canvas, tiled as SVG <pattern> (cheap while scrolling) ───────── */
let TEX: string | null = null;
const texture = () => {
  if (TEX || typeof document === 'undefined') return TEX ?? '';
  const n = 256, cv = document.createElement('canvas'); cv.width = cv.height = n; const g = cv.getContext('2d')!;
  const r = rnd(7), img = g.createImageData(n, n);
  const lat = Array.from({ length: 17 * 17 }, () => r());
  const vn = (x: number, y: number, f: number) => { const fx = (x / n) * f, fy = (y / n) * f, x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
    const at = (a: number, b: number) => lat[((b % f) * 17 + (a % f))]; const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    return (at(x0, y0) * (1 - sx) + at(x0 + 1, y0) * sx) * (1 - sy) + (at(x0, y0 + 1) * (1 - sx) + at(x0 + 1, y0 + 1) * sx) * sy; };
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const v = vn(x, y, 4) * 0.35 + vn(x, y, 8) * 0.3 + vn(x, y, 16) * 0.2 + r() * 0.25, i = (y * n + x) * 4, b = 120 + v * 135;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = b; img.data[i + 3] = 255; }
  g.putImageData(img, 0, 0);
  g.strokeStyle = 'rgba(0,0,0,.28)'; g.lineWidth = 1; for (let i = 0; i < 26; i++) { g.beginPath(); const y = r() * n, x = r() * n; g.moveTo(x, y); g.lineTo(x + r() * 40 - 20, y + r() * 40 - 20); g.stroke(); }
  return (TEX = cv.toDataURL('image/png'));
};

/** Shared paint servers + soft light. Colour-agnostic overlays: the base fill keeps the accent, these add form. */
const Defs: React.FC = () => {
  const tex = useMemo(texture, []);
  return (<defs>
    <pattern id="p-tex" patternUnits="userSpaceOnUse" width="256" height="256">{tex && <image href={tex} width="256" height="256" />}</pattern>
    <linearGradient id="g-cyl" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#000" stopOpacity=".62" /><stop offset=".28" stopColor="#fff" stopOpacity=".34" /><stop offset=".5" stopColor="#fff" stopOpacity=".04" /><stop offset=".78" stopColor="#000" stopOpacity=".28" /><stop offset="1" stopColor="#000" stopOpacity=".7" /></linearGradient>
    <linearGradient id="g-vert" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".32" /><stop offset=".55" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".5" /></linearGradient>
    <linearGradient id="g-gold" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#fff6c2" /><stop offset=".22" stopColor="#f2c94c" /><stop offset=".5" stopColor="#a97c14" /><stop offset=".72" stopColor="#f6d36b" /><stop offset="1" stopColor="#6e4c0c" /></linearGradient>
    <linearGradient id="g-metal" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#f4f7fb" /><stop offset=".35" stopColor="#9aa4b2" /><stop offset=".6" stopColor="#e6ebf2" /><stop offset="1" stopColor="#5b6472" /></linearGradient>
    <linearGradient id="g-glass" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".7" /><stop offset=".4" stopColor="#7cc8ff" stopOpacity=".25" /><stop offset="1" stopColor="#000" stopOpacity=".35" /></linearGradient>
    <linearGradient id="g-water" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7fd0ff" /><stop offset="1" stopColor="#0b3d6b" /></linearGradient>
    <radialGradient id="g-ao" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#000" stopOpacity=".7" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
    <radialGradient id="g-sphere" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fff" stopOpacity=".7" /><stop offset=".45" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".6" /></radialGradient>
    <pattern id="p-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><line x1="0" y1="0" x2="0" y2="7" stroke="#000" strokeOpacity=".34" strokeWidth="1.2" /></pattern>
    <pattern id="p-brick" width="64" height="30" patternUnits="userSpaceOnUse"><path d="M0 .5H64M0 15.5H64M20.5 0V15M52.5 15V30" stroke="#000" strokeOpacity=".4" fill="none" /><path d="M0 1.6H64M0 16.6H64" stroke="#fff" strokeOpacity=".18" fill="none" /></pattern>
    <pattern id="p-hiero" width="46" height="46" patternUnits="userSpaceOnUse"><g stroke="#000" strokeOpacity=".55" fill="none" strokeWidth="1.7" strokeLinecap="round"><ellipse cx="11" cy="11" rx="7" ry="3.6" /><circle cx="11" cy="11" r="1.6" /><path d="M34 4v15M29 8h10" /><ellipse cx="34" cy="4" rx="2.6" ry="3" /><path d="M4 32q4-5 8 0t8 0" /><path d="M30 30l9 9M39 30l-9 9" /><path d="M8 40h12M10 44h8" /></g></pattern>
    <linearGradient id="g-flame" x1="0" x2="0" y1="1" y2="0"><stop offset="0" stopColor="#c8321a" /><stop offset=".5" stopColor="#ff8a1e" /><stop offset="1" stopColor="#fff2a0" /></linearGradient>
    <linearGradient id="g-aob" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".55" /></linearGradient>
    <filter id="f-bevel" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="b" /><feSpecularLighting in="b" surfaceScale="4" specularConstant=".9" specularExponent="22" lightingColor="#fff" result="s"><feDistantLight azimuth="235" elevation="48" /></feSpecularLighting><feComposite in="s" in2="SourceAlpha" operator="in" result="s2" /><feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k1="0" k2="1" k3=".85" k4="0" /></filter>
  </defs>);
};

/* ───────── 3D primitives ───────── */
/** One flat face with texture, masonry joints, hatching and optional shading overlay. */
export const Face: React.FC<{ pts: string; fill: string; shade?: string; tex?: number; bricks?: number; hatch?: number; stroke?: string; style?: CSSProperties }> = ({ pts, fill, shade, tex = 0.4, bricks = 0, hatch = 0, stroke, style }) => (
  <g style={style}><polygon points={pts} fill={fill} stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
    {tex > 0 && <polygon points={pts} fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: tex }} />}
    {bricks > 0 && <polygon points={pts} fill="url(#p-brick)" style={{ opacity: bricks }} />}
    {hatch > 0 && <polygon points={pts} fill="url(#p-hatch)" style={{ opacity: hatch }} />}
    {shade && <polygon points={pts} fill={shade} />}</g>);

/** Lit box in oblique projection: lit top, mid front, hatched shadow side, masonry joints, rim light, ambient-occlusion at the foot and a cast shadow. */
export const Box: React.FC<{ x: number; y: number; w: number; h: number; c: string; d?: number; shadow?: boolean; tex?: number; bricks?: boolean; hiero?: boolean; style?: CSSProperties; children?: React.ReactNode }> = ({ x, y, w, h, c, d = 0.32, shadow = true, tex = 0.4, bricks = true, hiero = false, style, children }) => {
  const t = tones(c), dx = w * d, dy = w * d * 0.5, br = bricks && w > 40 && h > 28 ? 1 : 0, front = `${x},${y} ${x + w},${y} ${x + w},${y + h} ${x},${y + h}`;
  return (<g style={style}>
    {shadow && <polygon points={`${x + w},${y + h} ${x + w + dx},${y + h - dy} ${x + w + dx + h * 0.55},${y + h - dy + 8} ${x + w + h * 0.55},${y + h + 12}`} fill="#000" opacity=".3" />}
    <Face pts={front} fill={t.front} shade="url(#g-vert)" tex={tex} bricks={0.5 * br} />
    {hiero && <polygon points={front} fill="url(#p-hiero)" style={{ mixBlendMode: 'multiply', opacity: 0.5 }} />}
    <Face pts={`${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y + h - dy} ${x + w},${y + h}`} fill={t.side} tex={tex} bricks={0.4 * br} hatch={0.55} />
    <Face pts={`${x},${y} ${x + dx},${y - dy} ${x + w + dx},${y - dy} ${x + w},${y}`} fill={t.top} tex={tex * 0.7} bricks={0.25 * br} />
    <rect x={x} y={y + h * 0.78} width={w} height={h * 0.22} fill="url(#g-aob)" />
    <path d={`M${x} ${y + h}V${y}H${x + w}L${x + w + dx} ${y - dy}`} stroke={t.edge} strokeOpacity=".7" strokeWidth="1.4" fill="none" />
    <path d={`M${x + w} ${y}V${y + h}`} stroke="#000" strokeOpacity=".35" fill="none" />{children}</g>);
};

/** Cylinder / column with rolled gradient, flutes, lit cap, optional papyrus capital + plinth, contact shadow. */
export const Cyl: React.FC<{ x: number; y: number; w: number; h: number; c: string; tex?: number; flutes?: number; cap?: boolean; style?: CSSProperties }> = ({ x, y, w, h, c, tex = 0.4, flutes = 0, cap = false, style }) => {
  const t = tones(c), ry = Math.max(4, w * 0.16), body = `M${x} ${y}V${y + h}A${w / 2} ${ry} 0 0 0 ${x + w} ${y + h}V${y}Z`, cx = x + w / 2;
  return (<g style={style}>
    <ellipse cx={cx + w * 0.45} cy={y + h} rx={w * 0.95} ry={ry * 1.3} fill="#000" opacity=".32" />
    {cap && <ellipse cx={cx} cy={y + h} rx={w * 0.72} ry={ry * 1.5} fill={dark(c, 0.8)} stroke={t.edge} strokeOpacity=".4" />}
    <path d={body} fill={c} /><path d={body} fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: tex }} />
    {flutes > 0 && Array.from({ length: flutes }, (_, i) => { const fx = x + (w * (i + 1)) / (flutes + 1); return <path key={i} d={`M${fx} ${y}V${y + h + ry * 0.4}`} stroke="#000" strokeOpacity=".22" strokeWidth="1.6" fill="none" />; })}
    <path d={body} fill="url(#g-cyl)" /><rect x={x} y={y + h * 0.82} width={w} height={h * 0.18} fill="url(#g-aob)" />
    {cap ? <g>
      <path d={`M${x} ${y}L${x - w * 0.22} ${y - w * 0.55}Q${cx} ${y - w * 1.15} ${x + w * 1.22} ${y - w * 0.55}L${x + w} ${y}Z`} fill={t.front} /><path d={`M${x} ${y}L${x - w * 0.22} ${y - w * 0.55}Q${cx} ${y - w * 1.15} ${x + w * 1.22} ${y - w * 0.55}L${x + w} ${y}Z`} fill="url(#g-cyl)" />
      {[0.3, 0.5, 0.7].map((f) => <path key={f} d={`M${x + w * f} ${y}Q${x + w * f + (f - 0.5) * 14} ${y - w * 0.45} ${x + w * (f * 1.2 - 0.1)} ${y - w * 0.8}`} stroke="#000" strokeOpacity=".3" fill="none" />)}
      <rect x={x - w * 0.12} y={y - w * 0.72} width={w * 1.24} height={w * 0.14} rx="2" fill={t.top} /><rect x={x - w * 0.12} y={y - w * 0.72} width={w * 1.24} height={w * 0.14} rx="2" fill="url(#g-vert)" />
    </g> : <ellipse cx={cx} cy={y} rx={w / 2} ry={ry} fill={t.top} stroke={t.edge} strokeOpacity=".6" />}
  </g>);
};

/** Sphere with a specular highlight. */
export const Orb: React.FC<{ cx: number; cy: number; r: number; fill: string; style?: CSSProperties }> = ({ cx, cy, r, fill, style }) => (
  <g style={style}><circle cx={cx} cy={cy} r={r} fill={fill} /><circle cx={cx} cy={cy} r={r} fill="url(#g-sphere)" /></g>);

/** Ground contact shadow (soft ellipse). */
export const Ground: React.FC<{ cx: number; cy: number; rx: number; ry?: number; o?: number }> = ({ cx, cy, rx, ry = rx * 0.1, o = 1 }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#g-ao)" opacity={o} />);

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .9 0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

/** Scene stage: perspective camera that follows the pointer, long cast shadow, film grain, light shafts, vignette and floating dust. */
/** Gallery thumbnails render in lite mode: no pointer camera, dust, rays or heavy shadow. */
export const LiteCtx = createContext(false);
export const Svg: React.FC<{ children: React.ReactNode; c?: string }> = ({ children, c = '#d4af37' }) => {
  const liteMode = useContext(LiteCtx);
  const root = useRef<HTMLDivElement>(null), tilt = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = tilt.current; if (!el || reduced() || liteMode) return;
    gsap.set(el, { transformPerspective: 1300, transformOrigin: '50% 60%' });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.9, ease: 'power3.out' }), ry = gsap.quickTo(el, 'rotationY', { duration: 0.9, ease: 'power3.out' });
    const mv = (e: PointerEvent) => { ry(((e.clientX / innerWidth) - 0.5) * 9); rx(((e.clientY / innerHeight) - 0.5) * -6); };
    addEventListener('pointermove', mv);
    const rays = root.current?.querySelector('[data-rays]'); const tw = rays ? gsap.to(rays, { rotation: 8, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1 }) : null;
    const dust = gsap.utils.toArray<HTMLElement>(root.current?.querySelectorAll('[data-dust]') ?? []).map((d, i) => gsap.to(d, { y: `-=${60 + (i % 5) * 30}`, x: `+=${(i % 3 - 1) * 40}`, opacity: 0, duration: 6 + (i % 7), repeat: -1, ease: 'none', delay: -i * 0.8 }));
    return () => { removeEventListener('pointermove', mv); tw?.kill(); dust.forEach((t) => t.kill()); gsap.killTweensOf(el); };
  }, []);
  return (
    <div ref={root} className="absolute inset-0 pointer-events-none" aria-hidden>
      <div ref={tilt} className="absolute inset-[-3%]" style={{ willChange: 'transform' }}>
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" style={{ direction: 'ltr', overflow: 'visible' }}>
          <Defs />
          <g style={{ filter: liteMode ? undefined : 'drop-shadow(18px 26px 16px rgba(0,0,0,.5)) drop-shadow(0 0 1px rgba(255,255,255,.25))' }}>{children}</g>
          <rect x="0" y="640" width="1600" height="260" fill="url(#g-aob)" opacity=".55" /><rect x="0" y="560" width="1600" height="140" fill={c} opacity=".07" style={{ mixBlendMode: 'screen' }} />
          <rect x="0" y="0" width="1600" height="900" fill={c} opacity=".05" style={{ mixBlendMode: 'soft-light' }} />
        </svg>
      </div>
      {!liteMode && <><div data-rays className="absolute -top-1/4 left-1/4 w-[140%] h-[150%] origin-top opacity-[.07] mix-blend-screen" style={{ background: `repeating-conic-gradient(from 195deg at 20% 0%, ${c} 0deg 2deg, transparent 2deg 11deg)`, maskImage: 'linear-gradient(to bottom, #000, transparent 75%)', WebkitMaskImage: 'linear-gradient(to bottom, #000, transparent 75%)' }} />
      {Array.from({ length: 28 }, (_, i) => <span key={i} data-dust className="absolute rounded-full" style={{ left: `${(i * 37) % 100}%`, top: `${40 + ((i * 53) % 55)}%`, width: 2 + (i % 3), height: 2 + (i % 3), background: lite(c, 1.5), opacity: 0.55, filter: 'blur(.4px)' }} />)}</>}
      <div className="absolute inset-0 mix-blend-overlay opacity-[.4]" style={{ backgroundImage: GRAIN }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 55%, transparent 45%, rgba(0,0,0,.55) 100%)' }} />
    </div>
  );
};
export const glow = (c: string, r = 14) => ({ filter: `drop-shadow(0 0 ${r}px ${c})` }) as CSSProperties;
