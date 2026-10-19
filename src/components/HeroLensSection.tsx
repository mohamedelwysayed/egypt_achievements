import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../i18n';
import gsap from 'gsap';
import { soundManager } from '../utils/soundEffects';
import { RiveSleekBackground } from './RiveSleekBackground';
import { img } from '../utils/assets';

interface HeroLensSectionProps {
  scrollProgress: number; // 0 (top, pitch-black genesis) to 1 (full size, Sisi revealed)
  onScrollToNext?: () => void;
}

export const HeroLensSection: React.FC<HeroLensSectionProps> = ({
  scrollProgress = 0
}) => {
  const { tr, lang } = useLang(); void lang;
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);

  // Pre-cut transparent portraits (generated at build time — no runtime canvas work)
  const sisiPngUrl = img('sisi_front_cutout_1790513057768_cut');
  const ramsesPngUrl = img('ramses_front_cutout_1790513072024_cut');

  // Lens cursor — positioned via refs (no React re-render per mouse move)
  const lensMaskRef = useRef<HTMLDivElement>(null);
  const lensRingRef = useRef<HTMLDivElement>(null);
  const lensRadius = 145;

  // Spark animation state
  const [sparkIgnited, setSparkIgnited] = useState<boolean>(false);

  // Genesis Spark Animation sequence on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setSparkIgnited(true);
      soundManager.playSistrum();

      if (sparkRef.current) {
        gsap.fromTo(
          sparkRef.current,
          { scale: 0, opacity: 0, rotation: 0 },
          {
            scale: 1.5,
            opacity: 1,
            rotation: 180,
            duration: 0.9,
            ease: 'expo.out',
            onComplete: () => {
              gsap.to(sparkRef.current, {
                scale: 0.2,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in'
              });
            }
          }
        );
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Pointer / touch interaction for the lens: eased with a rAF lerp, written straight to the DOM.
  // On touch screens the lens follows the finger and, until first touched, drifts on its own
  // so the effect is discoverable without a mouse.
  const lensUnlockedRef = useRef(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const p = { x: -1000, y: -1000, tx: -1000, ty: -1000 };
    let raf = 0;
    let touched = false;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    const apply = () => {
      const clip = `circle(${lensRadius}px at ${p.x}px ${p.y}px)`;
      if (lensMaskRef.current) {
        lensMaskRef.current.style.clipPath = clip;
        lensMaskRef.current.style.setProperty('-webkit-clip-path', clip);
      }
      if (lensRingRef.current) {
        lensRingRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!lensUnlockedRef.current) return;
      if (coarse && !touched) {
        const r = el.getBoundingClientRect();
        p.tx = r.width * (0.5 + Math.sin(t / 1900) * 0.28);
        p.ty = r.height * (0.42 + Math.cos(t / 1500) * 0.2);
      }
      if (p.x < -500) { p.x = p.tx; p.y = p.ty; }
      p.x += (p.tx - p.x) * 0.22;
      p.y += (p.ty - p.y) * 0.22;
      apply();
    };
    raf = requestAnimationFrame(loop);

    const setTarget = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      p.tx = e.clientX - r.left;
      p.ty = e.clientY - r.top;
      if (e.pointerType !== 'mouse') touched = true;
    };
    window.addEventListener('pointermove', setTarget, { passive: true });
    window.addEventListener('pointerdown', setTarget, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', setTarget);
      window.removeEventListener('pointerdown', setTarget);
    };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // SCROLL-DRIVEN TRANSFORMATION MATH
  // ─────────────────────────────────────────────────────────────────────────────
  // Phase 1 (0 -> 0.75): "EGYPT" scales from 0.11 up to 1.0; background turns black -> warm #f4f4ed
  const growthT = Math.min(1, Math.max(0, scrollProgress / 0.75));
  const textScale = 0.11 + Math.pow(growthT, 1.4) * 0.89; // 0.11 -> 1.0

  // Background color interpolation: #000000 -> #f4f4ed
  const bgR = Math.round(growthT * 244);
  const bgG = Math.round(growthT * 244);
  const bgB = Math.round(growthT * 237);
  const backgroundColor = `rgb(${bgR}, ${bgG}, ${bgB})`;

  // Text color interpolation: glowing gold/bone -> deep solid black #111112
  const textR = Math.round((1 - growthT) * 235 + growthT * 17);
  const textG = Math.round((1 - growthT) * 225 + growthT * 17);
  const textB = Math.round((1 - growthT) * 195 + growthT * 18);
  const textColor = `rgb(${textR}, ${textG}, ${textB})`;

  // Phase 2 (0.75 -> 1.0): Sisi portrait slides up from bottom
  const arrivalT = Math.min(1, Math.max(0, (scrollProgress - 0.75) / 0.25));
  const sisiTranslateY = (1 - Math.pow(arrivalT, 1.3)) * 105; // 105% down -> 0%
  const sisiOpacity = Math.min(1, arrivalT * 1.5);

  const isLensUnlocked = scrollProgress >= 0.72;
  lensUnlockedRef.current = isLensUnlocked;

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center select-none"
      style={{
        backgroundColor,
        transition: 'background-color 0.1s linear'
      }}
    >
      {/* Sleek Rive-style background animation */}
      <RiveSleekBackground
        theme={growthT > 0.5 ? 'light' : 'dark'}
        opacity={Math.max(0.2, growthT * 0.5)}
      />

      {/* ─────────────────────────────────────────────────────────────
          1. GENESIS INITIAL SPARK (Ignites at start in black void)
          ───────────────────────────────────────────────────────────── */}
      <div
        ref={sparkRef}
        className="absolute z-20 pointer-events-none flex items-center justify-center"
      >
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#d2ff00]/40 blur-xl animate-pulse" />
          <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#d2ff00]" />
          <div className="absolute w-20 h-[1.5px] bg-[#d2ff00] rotate-45" />
          <div className="absolute w-20 h-[1.5px] bg-[#d2ff00] -rotate-45" />
          <div className="absolute w-28 h-[1.5px] bg-white" />
          <div className="absolute h-28 w-[1.5px] bg-white" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MINIMAL MONUMENTAL "EGYPT" TYPOGRAPHY & SOLAR RADIANCE
          Starts tiny in the dark, expands to full monumental scale as you scroll
          ───────────────────────────────────────────────────────────── */}
      {/* Floating Celestial Dust Motes in Void */}
      <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
        {[
          { top: '25%', left: '20%', size: 4, dur: '6s', delay: '0s' },
          { top: '35%', left: '80%', size: 5, dur: '8s', delay: '1s' },
          { top: '65%', left: '15%', size: 3, dur: '7s', delay: '2s' },
          { top: '75%', left: '75%', size: 6, dur: '9s', delay: '0.5s' },
          { top: '50%', left: '50%', size: 4, dur: '10s', delay: '3s' }
        ].map((pt, i) => (
          <div
            key={i}
            style={{
              top: pt.top,
              left: pt.left,
              width: `${pt.size}px`,
              height: `${pt.size}px`,
              animationDuration: pt.dur,
              animationDelay: pt.delay
            }}
            className="absolute rounded-full bg-[#d2ff00]/40 blur-[1px] animate-[floaty_infinite_ease-in-out]"
          />
        ))}
      </div>

      <div
        ref={textRef}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          transform: `scale(${textScale})`,
          transition: 'transform 0.05s ease-out'
        }}
      >
        {/* Pulsing Solar Flare Halo behind EGYPT */}
        {growthT > 0.4 && (
          <div className="absolute w-[45vw] h-[45vw] rounded-full bg-gradient-radial from-[#d2ff00]/25 via-amber-400/10 to-transparent blur-3xl pointer-events-none animate-pulse" />
        )}

        <div
          className="text-center font-serif tracking-tight select-none leading-none font-bold relative"
          style={{
            color: textColor,
            textShadow:
              growthT < 0.35
                ? '0 0 40px rgba(210,255,0,0.5), 0 0 80px rgba(212,175,55,0.3)'
                : 'none'
          }}
        >
          <span className="text-[17vw] sm:text-[18vw] block font-black">
            {tr("EGYPT")}
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SISI PRESIDENT PORTRAIT (Slides up when EGYPT reaches full size)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 inset-x-0 z-20 flex flex-col items-center pointer-events-none max-h-[78vh] will-change-transform"
        style={{
          transform: `translateY(${sisiTranslateY}%)`,
          opacity: sisiOpacity
        }}
      >
        <div className="relative w-[300px] sm:w-[420px] md:w-[500px] lg:w-[580px] h-[52vh] sm:h-[62vh] md:h-[70vh] lg:h-[74vh]">
          {sisiPngUrl ? (
            <img decoding="async"
              src={sisiPngUrl}
              alt={tr("President of Egypt")}
              className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.22)]"
            />
          ) : (
            <img decoding="async"
              src={img('sisi_front_cutout_1790513057768_cut')}
              alt={tr("President of Egypt")}
              className="w-full h-full object-cover object-top"
              style={{
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
              }}
            />
          )}

          {/* Golden Vector Horizon Halo */}
          <div className="absolute inset-x-0 bottom-6 flex justify-center pointer-events-none -z-10 opacity-70">
            <div className="w-[300px] sm:w-[400px] md:w-[460px] h-[220px] relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-black/15 rotate-12 scale-90" />
              <div className="absolute inset-0 rounded-full border border-black/10 -rotate-12 scale-95" />
              <svg className="w-full h-full opacity-60 drop-shadow-xs" viewBox="0 0 300 220" fill="none">
                <path d="M150 20 C100 20, 50 60, 40 120 C35 150, 45 190, 70 210 C85 200, 95 180, 100 150 C120 155, 180 155, 200 150 C205 180, 215 200, 230 210 C255 190, 265 150, 260 120 C250 60, 200 20, 150 20 Z" stroke="#111112" strokeWidth="1.2" strokeDasharray="3 3" />
                <line x1="150" y1="20" x2="150" y2="80" stroke="#111112" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="150" cy="22" r="5" fill="#111112" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. CIRCULAR PHARAONIC PORTAL INSIDE CURSOR (1:1 GEOMETRY MATCH)
          ───────────────────────────────────────────────────────────── */}
      {isLensUnlocked && (
        <div
          ref={lensMaskRef}
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            clipPath: `circle(${lensRadius}px at -1000px -1000px)`,
            WebkitClipPath: `circle(${lensRadius}px at -1000px -1000px)`
          }}
        >
          {/* Pharaonic Dark Reality Canvas */}
          <div className="absolute inset-0 bg-[#0e0e11]" />
          <RiveSleekBackground theme="dark" opacity={0.5} />

          {/* Ancient Hieroglyphics for "EGYPT" (Kemet: 𓈎𓅓𓏏𓊖) in 1:1 scale match */}
          <div className="absolute inset-0 flex items-center justify-center font-serif text-center text-[#d4af37] select-none">
            <div
              className="leading-none drop-shadow-[0_0_50px_rgba(212,175,55,0.7)]"
              style={{
                fontFamily: '"Noto Sans Egyptian Hieroglyphs", serif'
              }}
            >
              <div className="text-[17vw] sm:text-[18vw] tracking-widest text-[#d4af37] font-black">
                𓈎𓅓𓏏𓊖
              </div>
            </div>
          </div>

          {/* Pharaoh Ramesses II Portrait Cutout (Identically proportioned) */}
          <div className="absolute bottom-0 inset-x-0 flex flex-col items-center pointer-events-none max-h-[78vh]">
            <div className="relative w-[300px] sm:w-[420px] md:w-[500px] lg:w-[580px] h-[52vh] sm:h-[62vh] md:h-[70vh] lg:h-[74vh]">
              {ramsesPngUrl ? (
                <img decoding="async"
                  src={ramsesPngUrl}
                  alt={tr("Pharaoh Ramesses II")}
                  className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(212,175,55,0.4)]"
                />
              ) : (
                <img decoding="async"
                  src={img('ramses_front_cutout_1790513072024_cut')}
                  alt={tr("Pharaoh of Egypt")}
                  className="w-full h-full object-cover object-top"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Circular Cursor Follower Ring */}
      {isLensUnlocked && (
        <div
          ref={lensRingRef}
          className="absolute left-0 top-0 pointer-events-none z-40 will-change-transform"
          style={{ transform: 'translate3d(-1000px, -1000px, 0)' }}
        >
          <div
            className="rounded-full border border-[#d2ff00] shadow-[0_0_35px_rgba(210,255,0,0.5),inset_0_0_20px_rgba(210,255,0,0.2)] flex items-center justify-center animate-spin"
            style={{
              width: `${lensRadius * 2}px`,
              height: `${lensRadius * 2}px`,
              animationDuration: '24s'
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#d2ff00] shadow-[0_0_10px_#d2ff00]" />
          </div>
        </div>
      )}
    </section>
  );
};
