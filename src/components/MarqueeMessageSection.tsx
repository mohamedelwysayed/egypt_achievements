import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n';
import gsap from 'gsap';
import { ContourBackground } from './ContourBackground';
import { BoxReveal } from './BoxReveal';
import { img } from '../utils/assets';

export const MarqueeMessageSection: React.FC = () => {
  const { tr, lang } = useLang(); void lang;
  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  const sisiCutout = img('sisi_front_cutout_1790513057768_cut');

  // Scroll parallax: quickTo setters + one rAF per frame, and no work while the section is off screen
  useEffect(() => {
    const opts = { duration: 0.6, ease: 'power1.out' } as const;
    const x1 = marquee1Ref.current ? gsap.quickTo(marquee1Ref.current, 'x', opts) : null;
    const x2 = marquee2Ref.current ? gsap.quickTo(marquee2Ref.current, 'x', opts) : null;
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const c = Math.max(0, Math.min(1, progress));
      x1?.((c - 0.5) * -180);
      x2?.((c - 0.5) * 180);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="relative w-full min-h-[96vh] bg-[#282c20] text-[#f4f4ed] overflow-hidden flex flex-col justify-between items-center py-16 sm:py-20 select-none border-t border-[#3b3c38]"
    >
      {/* Topographic Contour Lines on dark olive */}
      <ContourBackground dark={true} opacity={0.3} />

      {/* Top Center Logo & Eyebrow with BoxReveal */}
      <div className="relative z-20 flex flex-col items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-[#d2ff00] text-[#282c20] flex items-center justify-center font-syne font-black text-sm shadow-md">
          𓈎
        </div>
        <BoxReveal isVisible={true} delay={0.1} boxColor="bg-[#d2ff00]" duration={0.6}>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d2ff00] font-bold">
            {tr("ACT II · MESSAGE FROM THE SACRED NILE")}
          </span>
        </BoxReveal>
      </div>

      {/* Center Layout with Running Dual-Font Marquee + Portrait */}
      <div className="relative w-full flex items-center justify-center my-auto px-4">
        {/* Kinetic Running Marquee (Positioned behind portrait with comfortable vertical spacing) */}
        <div dir="ltr" className="absolute inset-x-0 flex flex-col pointer-events-none opacity-80 z-0">
          {/* Top Marquee Line: Huge Serif in Electric Lime */}
          <div ref={marquee1Ref} className="flex whitespace-nowrap overflow-hidden py-1 will-change-transform">
            <div className="flex animate-[marquee_24s_linear_infinite] gap-12 font-serif uppercase tracking-tight text-[#d2ff00] text-[10vw] sm:text-[8vw] font-bold leading-none">
              <span dir={lang === 'ar' ? 'rtl' : 'ltr'}>{tr("SEVEN MILLENNIA AT HOME · FROM MEMPHIS TO CAIRO ·")} </span>
              <span dir={lang === 'ar' ? 'rtl' : 'ltr'}>{tr("SEVEN MILLENNIA AT HOME · FROM MEMPHIS TO CAIRO ·")} </span>
            </div>
          </div>

          {/* Bottom Marquee Line: Huge Bold Sans in Bone White */}
          <div ref={marquee2Ref} className="flex whitespace-nowrap overflow-hidden py-1 will-change-transform">
            <div className="flex animate-[marquee-reverse_26s_linear_infinite] gap-12 font-syne uppercase tracking-tighter text-[#f4f4ed] text-[10vw] sm:text-[8vw] font-black leading-none">
              <span dir={lang === 'ar' ? 'rtl' : 'ltr'}>{tr("CONTINUITY WILL LIVE FOREVER · THE ETERNAL CROWN ·")} </span>
              <span dir={lang === 'ar' ? 'rtl' : 'ltr'}>{tr("CONTINUITY WILL LIVE FOREVER · THE ETERNAL CROWN ·")} </span>
            </div>
          </div>
        </div>

        {/* Ambient Glowing Green/Gold Radiant Aura */}
        <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#d2ff00]/15 blur-3xl pointer-events-none animate-pulse" />

        {/* Floating Golden Dust Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
          {[
            { top: '20%', left: '15%', size: 4, dur: '7s' },
            { top: '30%', left: '85%', size: 5, dur: '9s' },
            { top: '70%', left: '20%', size: 3, dur: '6s' },
            { top: '80%', left: '80%', size: 6, dur: '8s' }
          ].map((pt, i) => (
            <div
              key={i}
              style={{
                top: pt.top,
                left: pt.left,
                width: `${pt.size}px`,
                height: `${pt.size}px`,
                animationDuration: pt.dur
              }}
              className="absolute rounded-full bg-[#d2ff00]/50 blur-[1px] animate-[floaty_infinite_ease-in-out]"
            />
          ))}
        </div>

        {/* Center Portrait: Cutout Transparent with soft vignette behind & subtle breathing float */}
        <div
          ref={portraitRef}
          className="relative z-10 w-[240px] sm:w-[320px] md:w-[380px] h-[320px] sm:h-[420px] md:h-[480px] flex items-end justify-center transition-transform duration-300 hover:scale-105"
        >
          <img loading="lazy" decoding="async"
            src={sisiCutout}
            alt="President of Egypt Cutout"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-[breathe_6s_ease-in-out_infinite]"
          />
        </div>
      </div>

      {/* Bottom Subtitle Deck with BoxReveal */}
      <div className="relative z-20 text-center max-w-lg mx-auto mt-8 px-6">
        <BoxReveal isVisible={true} delay={0.2} boxColor="bg-[#f4f4ed]" duration={0.7} textOffset={20}>
          <p className="text-xs sm:text-sm font-sans text-[#b9bbad] leading-relaxed">
            "{tr("Since the dawn of civilization along the banks of the Nile, sovereignty has remained continuous, unbroken across the horizons of time.")}"
          </p>
        </BoxReveal>
      </div>
    </section>
  );
};
