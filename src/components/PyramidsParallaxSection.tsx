import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import type { MotionValue } from 'motion/react';
import { Layers } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { soundManager } from '../utils/soundEffects';
import { img } from '../utils/assets';

/* ════════════════════════════════════════════════════════════════════
   TUNING — everything you are likely to touch lives in this block.
   ════════════════════════════════════════════════════════════════════ */

/** Icon-only button that explodes the layers into a 3D stack. Set false to remove it. */
const SHOW_EXPLODE_TOGGLE = true;

/** Used only until an image reports its real aspect ratio. */
const DEFAULT_RATIO = 16 / 9;

/** Extra px every layer keeps beyond its parallax travel so no edge ever shows. */
const BLEED_MARGIN = 6;

/**
 * Natural center and ground alignment:
 * x: 0.5 ensures all three Giza pyramids (Khufu, Khafre, Menkaure) are centered in the frame.
 * y: 0.78 anchors the bedrock and desert base naturally without cutting off the bottom.
 */
const FOCUS = { x: 0.5, y: 0.78 };

/* ── Depth cues ───────────────────────────────────────────────────── */

/** Drifting warm fog BEHIND the pyramids, in front of the sky (0 = off, 1 = full). */
const FOG = 1;

/** Soft out-of-focus dust in front of everything, moving fastest (false = off). */
const BOKEH = true;

/** Slight defocus on the sky so the pyramids read as sharper and closer (px, 0 = off). */
const SKY_BLUR = 1.2;

/**
 * Scroll "dolly": each plane subtly expands while the section scrolls through,
 * providing natural optical depth without aggressive edge cropping.
 */
const DOLLY = { sky: 0.02, fog: 0.04, title: 0.05, mid: 0.06, near: 0.16 };

/** Warm ground haze over the base of the pyramids (0 = off). */
const HAZE = 0.18;

/** Edge darkening over the whole scene (0 = off). */
const VIGNETTE = 0.5;

/* ── Layers ───────────────────────────────────────────────────────── */

/** Settings for turning the white background of the generated art into transparency. */

const MOUSE_SPRING = { damping: 26, stiffness: 170, mass: 0.1 };
const SCROLL_SPRING = { damping: 30, stiffness: 120, mass: 0.3 };

/** translateZ (px) per plane when the stack is exploded. Far to near. */
const DEPTH = { sky: -240, fog: -170, title: -100, mid: 0, near: 170 };

const TITLE = {
  text: 'PYRAMIDS',
  /** Share of the section width the word should span. */
  width: 0.92,
  /** Distance from the top of the section, in % of its height. */
  top: 10,
  parallax: { scroll: 20, mouse: { x: 18, y: 12 } } as Parallax,
};

const LAYERS: Record<'sky' | 'mid', LayerCfg> = {
  sky: {
    src: img('sky_sunset_bg_1790629965605'),
    focus: FOCUS,
    parallax: { scroll: 10, mouse: { x: 10, y: 6 } },
  },
  mid: {
    src: img('pyramids_middleground_1790629983765_cut'), // sky already removed at build time
    focus: FOCUS,
    parallax: { scroll: 35, mouse: { x: 30, y: 18 } },
  },
};

/** The fog plane shares the middleground's image space, so its bands stay on the horizon. */
const FOG_LAYER: StageCfg = {
  focus: FOCUS,
  parallax: { scroll: 22, mouse: { x: 16, y: 10 } },
};

/** The bokeh plane is the nearest one, so it travels the most. */
const NEAR_PARALLAX: Parallax = { scroll: 75, mouse: { x: 60, y: 36 } };

/** Fog bands: position is in % of the middleground image. `fx` is the drift distance. */
const FOG_BANDS = [
  { id: 1, top: '36%', height: '28%', opacity: 0.55, dur: '46s', fx: '5%' },
  { id: 2, top: '47%', height: '22%', opacity: 0.4, dur: '64s', fx: '-6%' },
];

const DUST = [
  { id: 1, top: '22%', left: '18%', size: 4, delay: '0s', dur: '7s' },
  { id: 2, top: '35%', left: '42%', size: 6, delay: '1.5s', dur: '9s' },
  { id: 3, top: '28%', left: '76%', size: 3, delay: '3s', dur: '6s' },
  { id: 4, top: '48%', left: '88%', size: 5, delay: '0.8s', dur: '8s' },
  { id: 5, top: '60%', left: '30%', size: 4, delay: '2.2s', dur: '10s' },
  { id: 6, top: '15%', left: '60%', size: 5, delay: '4s', dur: '7.5s' },
];

/** Near dust: bigger and blurrier = closer. `o` is peak opacity. */
const BOKEH_MOTES = [
  { id: 1, left: '8%', top: '62%', size: 34, blur: 5, o: 0.32, dur: '16s', delay: '0s', dx: '70px', dy: '-50px' },
  { id: 2, left: '22%', top: '78%', size: 18, blur: 3, o: 0.45, dur: '12s', delay: '3s', dx: '50px', dy: '-70px' },
  { id: 3, left: '37%', top: '55%', size: 46, blur: 7, o: 0.22, dur: '20s', delay: '6s', dx: '-60px', dy: '-40px' },
  { id: 4, left: '52%', top: '84%', size: 24, blur: 4, o: 0.38, dur: '14s', delay: '1.5s', dx: '80px', dy: '-60px' },
  { id: 5, left: '66%', top: '70%', size: 40, blur: 6, o: 0.26, dur: '18s', delay: '8s', dx: '-70px', dy: '-55px' },
  { id: 6, left: '78%', top: '88%', size: 16, blur: 2.5, o: 0.5, dur: '11s', delay: '4.5s', dx: '40px', dy: '-80px' },
  { id: 7, left: '90%', top: '58%', size: 30, blur: 5, o: 0.3, dur: '17s', delay: '2s', dx: '-50px', dy: '-45px' },
  { id: 8, left: '14%', top: '42%', size: 22, blur: 4, o: 0.28, dur: '15s', delay: '9s', dx: '60px', dy: '-30px' },
];

const RAYS =
  'conic-gradient(from 0deg at 50% 50%, rgba(210,255,0,0.15) 0deg, transparent 30deg, rgba(255,200,100,0.2) 60deg, transparent 90deg, rgba(210,255,0,0.15) 120deg, transparent 150deg, rgba(255,200,100,0.2) 180deg, transparent 210deg, rgba(210,255,0,0.15) 240deg, transparent 270deg, rgba(255,200,100,0.2) 300deg, transparent 330deg)';

const EXPLODED_TRANSFORM = 'rotateX(18deg) rotateY(-14deg) scale(0.82)';

/* ════════════════════════════════════════════════════════════════════
   TYPES
   ════════════════════════════════════════════════════════════════════ */

interface Parallax {
  /** Vertical travel (± px) across the scroll-through of the section. */
  scroll: number;
  /** Cursor travel (± px). */
  mouse: { x: number; y: number };
}

interface StageCfg {
  focus: { x: number; y: number };
  parallax: Parallax;
}

interface LayerCfg extends StageCfg {
  src: string;
  cutout?: { threshold: number; feather: number };
}

interface LayerImage {
  url: string;
  ratio: number;
}

interface LayerMotion {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

interface PyramidsParallaxSectionProps {
  /** Kept so existing parents still type-check. The pins were removed, so it is no longer called. */
  onSelectAchievement?: (id: string) => void;
}

/* ════════════════════════════════════════════════════════════════════
   GEOMETRY
   Every image sits in a "stage" that has the image's own aspect ratio,
   so anything placed inside a stage (sun, dust, fog, haze) is positioned in
   IMAGE space and can never drift when the screen shape changes.
   ════════════════════════════════════════════════════════════════════ */

/** The parallax travel a layer needs as bleed, derived so it can't go out of sync. */
const bleedOf = (p: Parallax) => ({
  x: p.mouse.x + BLEED_MARGIN,
  y: p.scroll + p.mouse.y + BLEED_MARGIN,
});

/** Always covers the screen (plus bleed); `focus` decides what gets cropped. */
function stageStyle(cfg: StageCfg, ratio: number): React.CSSProperties {
  const { x: bx, y: by } = bleedOf(cfg.parallax);
  const { x: fx, y: fy } = cfg.focus;
  const h = `calc(var(--w) / ${ratio})`;
  return {
    '--w': `max(calc(100cqw + ${2 * bx}px), calc((100cqh + ${2 * by}px) * ${ratio}))`,
    width: 'var(--w)',
    aspectRatio: `${ratio}`,
    left: `clamp(calc(100cqw + ${bx}px - var(--w)), calc(50cqw - ${fx} * var(--w)), ${-bx}px)`,
    top: `clamp(calc(100cqh + ${by}px - ${h}), calc(50cqh - ${fy} * ${h}), ${-by}px)`,
  } as React.CSSProperties;
}

/* ════════════════════════════════════════════════════════════════════
   HOOKS
   ════════════════════════════════════════════════════════════════════ */

/**
 * Loads a layer, runs the white-to-transparent cutout when configured, and
 * reads the real aspect ratio. Nothing renders until it's ready, so the raw
 * white-background JPG never flashes over the scene.
 */
function useLayerImage(cfg: LayerCfg): LayerImage | null {
  const [image, setImage] = useState<LayerImage | null>(null);
  const { src } = cfg;

  useEffect(() => {
    let alive = true;

    (async () => {
      const url = src;

      let ratio = DEFAULT_RATIO;
      try {
        const img = new Image();
        img.src = url;
        await img.decode();
        ratio = img.naturalWidth / img.naturalHeight || DEFAULT_RATIO;
      } catch {
        /* keep the default ratio */
      }

      if (alive) setImage({ url, ratio });
    })();

    return () => {
      alive = false;
    };
  }, [src]);

  return image;
}

/** Merges scroll + cursor travel into a single x / y pair for one layer. */
function useLayerMotion(
  progress: MotionValue<number>,
  mouseX: MotionValue<number>,
  mouseY: MotionValue<number>,
  p: Parallax,
  strength: number,
): LayerMotion {
  const s = p.scroll * strength;
  const mx = p.mouse.x * strength;
  const my = p.mouse.y * strength;

  const scrollY = useTransform(progress, [0, 1], [-s, s]);
  const x = useTransform(mouseX, [-0.5, 0.5], [-mx, mx]);
  const mouseOffsetY = useTransform(mouseY, [-0.5, 0.5], [-my, my]);
  const y = useTransform(
    [scrollY, mouseOffsetY] as MotionValue<number>[],
    ([a, b]: number[]) => a + b,
  );
  return { x, y };
}

/**
 * Scroll dolly. Image planes only ever grow (1 → 1 + amount) so they can't
 * expose an edge. The title uses `centered`, so it is exactly 1 when the
 * section fills the screen and can shrink or grow either side of that.
 */
function useDolly(
  progress: MotionValue<number>,
  amount: number,
  strength: number,
  centered = false,
) {
  const a = amount * strength;
  return useTransform(
    progress,
    centered ? [0, 0.5, 1] : [0, 1],
    centered ? [1 - a, 1, 1 + a] : [1, 1 + a],
  );
}

/* ════════════════════════════════════════════════════════════════════
   LAYER
   motion.div  → parallax (x / y) + dolly (scale)
     div       → exploded-mode depth (translateZ), kept separate so it never
                 fights with motion's own transform
       stage   → image-space coordinate system
   ════════════════════════════════════════════════════════════════════ */

interface LayerProps {
  cfg: StageCfg;
  ratio: number;
  m: LayerMotion;
  scale?: MotionValue<number>;
  origin?: { x: number; y: number };
  depth: number;
  z: number;
  exploded: boolean;
  ring: string;
  src?: string;
  imgFilter?: string;
  children?: React.ReactNode;
}

const Layer: React.FC<LayerProps> = ({
  cfg,
  ratio,
  m,
  scale,
  origin,
  depth,
  z,
  exploded,
  ring,
  src,
  imgFilter,
  children,
}) => (
  <motion.div
    style={{
      x: m.x,
      y: m.y,
      scale,
      originX: origin?.x,
      originY: origin?.y,
      zIndex: z,
      transformStyle: 'preserve-3d',
    }}
    className="absolute inset-0 pointer-events-none will-change-transform"
  >
    <div
      className="absolute inset-0 transition-transform duration-700 ease-out"
      style={{
        transform: `translateZ(${exploded ? depth : 0}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="absolute" style={stageStyle(cfg, ratio)}>
        {src && (
          <img
            src={src}
            alt=""
            draggable={false}
            decoding="async"
            referrerPolicy="no-referrer"
            className={`block h-full w-full object-cover transition-[border-radius] duration-700 ${
              exploded ? 'rounded-3xl' : 'rounded-none'
            }`}
            style={{ animation: 'pyr-fade-in 900ms ease-out both', filter: imgFilter }}
          />
        )}
        {exploded && (
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-inset ${ring}`}
          />
        )}
        {children}
      </div>
    </div>
  </motion.div>
);

/* ════════════════════════════════════════════════════════════════════
   STYLES
   ════════════════════════════════════════════════════════════════════ */

const CSS = `
@keyframes pyr-fade-in { from { opacity: 0 } to { opacity: 1 } }
@keyframes pyr-floaty {
  0%, 100% { transform: translate(0, 0); opacity: .5 }
  50%      { transform: translate(8px, -18px); opacity: 1 }
}
@keyframes pyr-pulse {
  0%, 100% { transform: scale(1);    opacity: .6 }
  50%      { transform: scale(1.08); opacity: 1 }
}
@keyframes pyr-spin { to { transform: rotate(360deg) } }
@keyframes pyr-fog {
  from { transform: translateX(calc(var(--fx, 4%) * -1)) }
  to   { transform: translateX(var(--fx, 4%)) }
}
@keyframes pyr-drift {
  0%   { transform: translate(0, 0); opacity: 0 }
  18%  { opacity: var(--o, .4) }
  82%  { opacity: var(--o, .4) }
  100% { transform: translate(var(--dx, 60px), var(--dy, -50px)); opacity: 0 }
}
/* Stop all ambient motion while the section is off-screen. */
.pyr-root[data-paused='true'] .pyr-anim { animation-play-state: paused !important }
/* Respect reduced-motion settings. */
@media (prefers-reduced-motion: reduce) {
  .pyr-root .pyr-anim { animation: none !important }
}
`;

/* ════════════════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════════════════ */

export const PyramidsParallaxSection: React.FC<PyramidsParallaxSectionProps> = () => {
  const { tr, lang } = useLang(); void lang;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [exploded, setExploded] = useState(false);
  const [titleEm, setTitleEm] = useState<number | null>(null);

  const reduceMotion = !!useReducedMotion();
  const inView = useInView(sectionRef);
  const strength = reduceMotion ? 0 : 1;

  const sky = useLayerImage(LAYERS.sky);
  const mid = useLayerImage(LAYERS.mid);

  /* Title: measure the word ONCE in em units (its width scales linearly with
     font size), then size it in pure CSS so it always spans TITLE.width of the
     section, with no resize listeners needed. */
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    let alive = true;

    const measure = () => {
      if (!alive) return;
      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      if (el.offsetWidth && fontSize) setTitleEm(el.offsetWidth / fontSize);
    };

    measure();
    const fonts = document.fonts;
    fonts?.ready.then(measure);
    fonts?.addEventListener?.('loadingdone', measure);
    return () => {
      alive = false;
      fonts?.removeEventListener?.('loadingdone', measure);
    };
  }, []);

  /* Parallax drivers */
  const mouseX = useSpring(0, MOUSE_SPRING);
  const mouseY = useSpring(0, MOUSE_SPRING);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);

  const skyM = useLayerMotion(progress, mouseX, mouseY, LAYERS.sky.parallax, strength);
  const fogM = useLayerMotion(progress, mouseX, mouseY, FOG_LAYER.parallax, strength);
  const titleM = useLayerMotion(progress, mouseX, mouseY, TITLE.parallax, strength);
  const midM = useLayerMotion(progress, mouseX, mouseY, LAYERS.mid.parallax, strength);
  const nearM = useLayerMotion(progress, mouseX, mouseY, NEAR_PARALLAX, strength);

  const skyScale = useDolly(progress, DOLLY.sky, strength);
  const fogScale = useDolly(progress, DOLLY.fog, strength);
  const titleScale = useDolly(progress, DOLLY.title, strength, true);
  const midScale = useDolly(progress, DOLLY.mid, strength);
  const nearScale = useDolly(progress, DOLLY.near, strength);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      aria-label={tr("The Pyramids of Giza")}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-paused={inView ? 'false' : 'true'}
      className="pyr-root relative h-screen w-full select-none overflow-hidden bg-[#0c0d0a] text-white"
      style={{ height: '100svh' }}
    >
      <style>{CSS}</style>

      {/* Size container: gives every layer cqw / cqh units. It sits OUTSIDE the 3D scene on purpose. */}
      <div className="absolute inset-0 [container-type:size]">
        {/* Perspective lives on its own wrapper… */}
        <div className="absolute inset-0" style={{ perspective: 1500 }}>
          {/* …and the explode rotation lives on the scene inside it. */}
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: exploded ? EXPLODED_TRANSFORM : 'none',
            }}
          >
            {/* PLANE 01 · SKY (farthest, slightly defocused) */}
            {sky && (
              <Layer
                cfg={LAYERS.sky}
                ratio={sky.ratio}
                m={skyM}
                scale={skyScale}
                depth={DEPTH.sky}
                z={0}
                exploded={exploded}
                ring="ring-amber-500/50"
                src={sky.url}
                imgFilter={SKY_BLUR > 0 ? `blur(${SKY_BLUR}px)` : undefined}
              >
                {/* Sun glow + rays, placed in image space so they stay on the horizon */}
                <div
                  aria-hidden
                  className="pyr-anim pointer-events-none absolute rounded-full"
                  style={{
                    right: '15%',
                    bottom: '35%',
                    width: '16%',
                    aspectRatio: '1',
                    filter: 'blur(48px)',
                    background:
                      'radial-gradient(circle, rgba(252,211,77,.55), rgba(251,146,60,.28) 50%, transparent 70%)',
                    animation: 'pyr-pulse 5s ease-in-out infinite',
                  }}
                />
                <div
                  aria-hidden
                  className="pyr-anim pointer-events-none absolute opacity-30"
                  style={{
                    right: '10%',
                    bottom: '30%',
                    width: '25%',
                    aspectRatio: '1',
                    background: RAYS,
                    animation: 'pyr-spin 60s linear infinite',
                  }}
                />
                {DUST.map((d) => (
                  <div
                    key={d.id}
                    aria-hidden
                    className="pyr-anim pointer-events-none absolute rounded-full bg-amber-300/60"
                    style={{
                      top: d.top,
                      left: d.left,
                      width: d.size,
                      height: d.size,
                      filter: 'blur(0.5px)',
                      animation: `pyr-floaty ${d.dur} ease-in-out ${d.delay} infinite`,
                    }}
                  />
                ))}
              </Layer>
            )}

            {/* PLANE 02 · FOG — between the sky and the pyramids */}
            {mid && FOG > 0 && (
              <Layer
                cfg={FOG_LAYER}
                ratio={mid.ratio}
                m={fogM}
                scale={fogScale}
                origin={{ x: 0.5, y: 0.6 }}
                depth={DEPTH.fog}
                z={5}
                exploded={exploded}
                ring="ring-orange-300/40"
              >
                {FOG_BANDS.map((f) => (
                  <div
                    key={f.id}
                    aria-hidden
                    className="pyr-anim pointer-events-none absolute"
                    style={
                      {
                        left: '-20%',
                        width: '140%',
                        top: f.top,
                        height: f.height,
                        opacity: f.opacity * FOG,
                        filter: 'blur(22px)',
                        background:
                          'radial-gradient(ellipse at 50% 50%, rgba(255,208,152,.5), rgba(255,172,112,.18) 48%, transparent 72%)',
                        '--fx': f.fx,
                        animation: `pyr-fog ${f.dur} ease-in-out infinite alternate`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </Layer>
            )}

            {/* PLANE 03 · TITLE — placed against the SCREEN, sits behind the pyramids */}
            <motion.div
              style={{
                x: titleM.x,
                y: titleM.y,
                scale: titleScale,
                originX: 0.5,
                originY: 0.2,
                zIndex: 10,
                transformStyle: 'preserve-3d',
              }}
              className="pointer-events-none absolute inset-0 will-change-transform"
            >
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out"
                style={{
                  transform: `translateZ(${exploded ? DEPTH.title : 0}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {exploded && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-inset ring-white/40"
                  />
                )}
                <div
                  className="absolute inset-x-0 flex justify-center"
                  style={{ top: `${TITLE.top}%` }}
                >
                  <h1
                    ref={titleRef}
                    className="inline-block shrink-0 whitespace-nowrap font-syne font-black uppercase leading-none tracking-tight text-white transition-opacity duration-500"
                    style={{
                      fontSize: titleEm
                        ? `calc(${TITLE.width * 100}cqw / ${titleEm})`
                        : '14cqw',
                      opacity: titleEm ? 1 : 0,
                      textShadow:
                        '0 12px 50px rgba(0,0,0,.8), 0 0 80px rgba(255,240,200,.25)',
                    }}
                  >
                    {TITLE.text}
                  </h1>
                </div>
              </div>
            </motion.div>

            {/* PLANE 04 · MIDDLEGROUND */}
            {mid && (
              <Layer
                cfg={LAYERS.mid}
                ratio={mid.ratio}
                m={midM}
                scale={midScale}
                origin={{ x: 0.5, y: 0.7 }}
                depth={DEPTH.mid}
                z={20}
                exploded={exploded}
                ring="ring-[#d2ff00]/60"
                src={mid.url}
              >
                {HAZE > 0 && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
                    style={{
                      background: `linear-gradient(to top, rgba(214,150,86,${HAZE}), transparent)`,
                    }}
                  />
                )}
              </Layer>
            )}

            {/* PLANE 05 · NEAR DUST — nearest plane, out of focus, fastest parallax */}
            {BOKEH && (
              <motion.div
                style={{
                  x: nearM.x,
                  y: nearM.y,
                  scale: nearScale,
                  zIndex: 30,
                  transformStyle: 'preserve-3d',
                }}
                className="pointer-events-none absolute inset-0 will-change-transform"
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateZ(${exploded ? DEPTH.near : 0}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {exploded && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-inset ring-amber-200/40"
                    />
                  )}
                  {BOKEH_MOTES.map((b) => (
                    <div
                      key={b.id}
                      aria-hidden
                      className="pyr-anim pointer-events-none absolute rounded-full"
                      style={
                        {
                          left: b.left,
                          top: b.top,
                          width: b.size,
                          height: b.size,
                          opacity: b.o,
                          filter: `blur(${b.blur}px)`,
                          background:
                            'radial-gradient(circle, rgba(255,222,170,.95), rgba(255,190,120,.5) 55%, transparent 72%)',
                          '--o': b.o,
                          '--dx': b.dx,
                          '--dy': b.dy,
                          animation: `pyr-drift ${b.dur} ease-in-out ${b.delay} infinite both`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Cinematic vignette: sits above the scene, never blocks input */}
      {VIGNETTE > 0 && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            background: `radial-gradient(ellipse at 50% 55%, transparent 55%, rgba(6,7,5,${VIGNETTE}) 100%), linear-gradient(to top, rgba(12,13,10,${VIGNETTE}), transparent 26%)`,
          }}
        />
      )}

      {/* Icon-only explode toggle (no text) */}
      {SHOW_EXPLODE_TOGGLE && (
        <div className="absolute right-6 top-6 z-40">
          <Magnetic strength={0.25}>
            <button
              type="button"
              aria-label={tr(exploded ? 'Unify layers' : 'Explode layers')}
              aria-pressed={exploded}
              onClick={() => {
                soundManager.playHoverTick();
                setExploded((v) => !v);
              }}
              className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border shadow-lg outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#d2ff00] ${
                exploded
                  ? 'border-[#d2ff00] bg-[#d2ff00] text-[#111112] shadow-[0_0_25px_rgba(210,255,0,0.4)]'
                  : 'border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20'
              }`}
            >
              <Layers className="h-5 w-5" />
            </button>
          </Magnetic>
        </div>
      )}
    </section>
  );
};