import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n';
import gsap from 'gsap';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { ContourBackground } from './ContourBackground';
import { BoxReveal } from './BoxReveal';
import { Magnetic } from './Magnetic';
import { img } from '../utils/assets';

interface DualProfileSectionProps {
  onScrollToTimeline: () => void;
}

export const DualProfileSection: React.FC<DualProfileSectionProps> = ({
  onScrollToTimeline
}) => {
  const { tr, lang } = useLang(); void lang;
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftHeadParallaxRef = useRef<HTMLDivElement>(null);
  const rightHeadParallaxRef = useRef<HTMLDivElement>(null);

  const [isInView, setIsInView] = useState<boolean>(false);
  const sisiSideCutout = img('sisi_side_cutout_1790513084500_cut');
  const ramsesSideCutout = img('ramses_side_cutout_1790513098192_cut');

  // IntersectionObserver to trigger scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Subtle pointer parallax on the two portraits (quickTo = no tween allocation per mouse move)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const o = { duration: 0.7, ease: 'power1.out' } as const;
    const lx = leftHeadParallaxRef.current ? gsap.quickTo(leftHeadParallaxRef.current, 'x', o) : null;
    const ly = leftHeadParallaxRef.current ? gsap.quickTo(leftHeadParallaxRef.current, 'y', o) : null;
    const rx = rightHeadParallaxRef.current ? gsap.quickTo(rightHeadParallaxRef.current, 'x', o) : null;
    const ry = rightHeadParallaxRef.current ? gsap.quickTo(rightHeadParallaxRef.current, 'y', o) : null;
    let raf = 0;
    let ev: MouseEvent | null = null;

    const flush = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el || !ev) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const nx = (ev.clientX - rect.left) / rect.width - 0.5;
      const ny = (ev.clientY - rect.top) / rect.height - 0.5;
      lx?.(nx * 22); ly?.(ny * 12);
      rx?.(-nx * 22); ry?.(-ny * 12);
    };
    const onMove = (e: MouseEvent) => { ev = e; if (!raf) raf = requestAnimationFrame(flush); };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dialogue"
      className="relative w-full min-h-screen bg-[#f4f4ed] text-[#111112] flex items-center justify-between px-3 sm:px-6 md:px-8 lg:px-14 overflow-hidden select-none"
    >
      {/* Background Topographic Contours */}
      <ContourBackground theme="light" />

      {/* ─────────────────────────────────────────────────────────────
          LEFT: SISI SIDE PROFILE (TRANSPARENT PNG CUTOUT)
          Offset toward the left screen edge at start, sliding smoothly sideways
          into original position with a layered delay relative to text.
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ x: -140, opacity: 0 }}
        animate={
          isInView
            ? { x: 0, opacity: 1 }
            : { x: -140, opacity: 0 }
        }
        transition={{
          duration: 1.25,
          delay: 0.42, // Layered sequence: enters after the text box-reveal begins
          ease: [0.16, 1, 0.3, 1] // Clean cinematic ease
        }}
        className="relative z-10 w-[200px] sm:w-[280px] md:w-[350px] lg:w-[440px] h-[50vh] sm:h-[68vh] lg:h-[82vh] pointer-events-none flex items-center shrink-0 will-change-transform"
      >
        <div ref={leftHeadParallaxRef} className="w-full h-full will-change-transform">
          <img loading="lazy" decoding="async"
            src={sisiSideCutout}
            alt="President Sisi Profile Cutout"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-left drop-shadow-[0_20px_50px_rgba(0,0,0,0.14)]"
          />
        </div>
      </motion.div>

      {/* Floating Sacred Hieroglyphs Rising in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
        {[
          { glyph: '𓇳', left: '22%', dur: '9s', delay: '0s' },
          { glyph: '𓋹', left: '38%', dur: '11s', delay: '2s' },
          { glyph: '𓈎', left: '50%', dur: '8s', delay: '4s' },
          { glyph: '𓊖', left: '62%', dur: '10s', delay: '1.5s' },
          { glyph: '𓉐', left: '78%', dur: '12s', delay: '3s' }
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              left: item.left,
              animationDuration: item.dur,
              animationDelay: item.delay
            }}
            className="absolute bottom-0 text-xl sm:text-2xl text-[#111112]/20 font-serif animate-[floaty_infinite_ease-in-out] select-none"
          >
            {item.glyph}
          </div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CENTER: DUAL TYPOGRAPHY COLUMNS & CONTINUITY BEAM
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 flex-1 max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-16 py-8 sm:py-12">
        {/* Animated Central Energy Beam */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#d2ff00] to-transparent pointer-events-none z-0 opacity-70 animate-pulse" />

        {/* Left Column: ANCIENT KEMET */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 flex flex-col items-center">
            {/* Box Reveal 1: ANCIENT */}
            <BoxReveal
              isVisible={isInView}
              delay={0.12}
              direction="left-to-right"
              boxColor="bg-[#111112]"
              textOffset={-24}
              duration={0.8}
            >
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-syne font-black uppercase tracking-tight text-[#111112] leading-none block">
                {tr("ANCIENT")}
              </h2>
            </BoxReveal>

            {/* Box Reveal 2: KEMET */}
            <BoxReveal
              isVisible={isInView}
              delay={0.24}
              direction="left-to-right"
              boxColor="bg-[#d2ff00]"
              textOffset={-20}
              duration={0.8}
              className="mt-1"
            >
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-syne font-black uppercase tracking-tight text-[#111112] leading-none block">
                {tr("KEMET")}
              </h2>
            </BoxReveal>

            {/* Neon lime cursive calligraphy overlay (English only — in Arabic it duplicates the heading) */}
            {lang !== 'ar' && <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -18 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, rotate: -12 }
                  : { opacity: 0, scale: 0.85, rotate: -18 }
              }
              transition={{
                duration: 0.9,
                delay: 0.38,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute -top-6 -left-3 sm:-left-5 pointer-events-none select-none text-[#d2ff00] font-bold text-5xl sm:text-7xl font-serif italic drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
            >
              {tr("Kemet")}
            </motion.div>}
          </div>

          <div className="mb-6 max-w-xs">
            <BoxReveal
              isVisible={isInView}
              delay={0.45}
              direction="left-to-right"
              boxColor="bg-[#111112]"
              textOffset={-14}
              duration={0.75}
            >
              <p className="text-xs sm:text-sm text-[#111112]/70 font-sans leading-relaxed">
                {tr("The foundation of statehood, architectural mastery, and imperial diplomacy along the sacred Nile.")}
              </p>
            </BoxReveal>
          </div>

          <Magnetic strength={0.35}>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                soundManager.playChime(520, 0.2);
                onScrollToTimeline();
              }}
              className="w-11 h-11 rounded-full bg-[#d2ff00] hover:bg-[#111112] text-[#111112] hover:text-[#d2ff00] transition-colors flex items-center justify-center shadow-md cursor-pointer group"
            >
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </Magnetic>
        </div>

        {/* Right Column: MODERN STATE */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 flex flex-col items-center">
            {/* Box Reveal 1: MODERN */}
            <BoxReveal
              isVisible={isInView}
              delay={0.2}
              direction="right-to-left"
              boxColor="bg-[#111112]"
              textOffset={24}
              duration={0.8}
            >
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light uppercase tracking-tight text-[#111112] leading-none block">
                {tr("MODERN")}
              </h2>
            </BoxReveal>

            {/* Box Reveal 2: STATE */}
            <BoxReveal
              isVisible={isInView}
              delay={0.32}
              direction="right-to-left"
              boxColor="bg-[#d2ff00]"
              textOffset={20}
              duration={0.8}
              className="mt-1"
            >
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-syne font-black uppercase tracking-tight text-[#111112] leading-none block">
                {tr("STATE")}
              </h2>
            </BoxReveal>
          </div>

          <div className="mb-6 max-w-xs">
            <BoxReveal
              isVisible={isInView}
              delay={0.5}
              direction="right-to-left"
              boxColor="bg-[#111112]"
              textOffset={14}
              duration={0.75}
            >
              <p className="text-xs sm:text-sm text-[#111112]/70 font-sans leading-relaxed">
                {tr("The contemporary sovereign republic, mega-infrastructure, the Grand Museum, and regional stability.")}
              </p>
            </BoxReveal>
          </div>

          <Magnetic strength={0.35}>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                soundManager.playChime(620, 0.2);
                onScrollToTimeline();
              }}
              className="w-11 h-11 rounded-full bg-[#d2ff00] hover:bg-[#111112] text-[#111112] hover:text-[#d2ff00] transition-colors flex items-center justify-center shadow-md cursor-pointer group"
            >
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </Magnetic>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RIGHT: RAMSES PHARAOH SIDE PROFILE (TRANSPARENT PNG CUTOUT)
          Offset toward the right screen edge at start, sliding smoothly sideways
          into original position with a layered delay relative to text.
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ x: 140, opacity: 0 }}
        animate={
          isInView
            ? { x: 0, opacity: 1 }
            : { x: 140, opacity: 0 }
        }
        transition={{
          duration: 1.25,
          delay: 0.42, // Layered sequence: enters after the text box-reveal begins
          ease: [0.16, 1, 0.3, 1] // Clean cinematic ease
        }}
        className="relative z-10 w-[200px] sm:w-[280px] md:w-[350px] lg:w-[440px] h-[50vh] sm:h-[68vh] lg:h-[82vh] pointer-events-none flex items-center shrink-0 will-change-transform"
      >
        <div ref={rightHeadParallaxRef} className="w-full h-full will-change-transform">
          <img loading="lazy" decoding="async"
            src={ramsesSideCutout}
            alt="Pharaoh Ramesses II Profile Cutout"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-right drop-shadow-[0_20px_50px_rgba(212,175,55,0.25)]"
          />
        </div>
      </motion.div>
    </section>
  );
};
