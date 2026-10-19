/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroLensSection } from './components/HeroLensSection';
import { MarqueeMessageSection } from './components/MarqueeMessageSection';
import { DualProfileSection } from './components/DualProfileSection';
import { TimelineSection } from './components/TimelineSection';
import { HorizonInitiatives } from './components/HorizonInitiatives';
import { LangToggle } from './i18n';
import { Preloader } from './components/Preloader';
import { Play } from 'lucide-react';
import { FramesGallery } from './components/FramesGallery';
import { startVelocity } from './utils/velocity';
import { PyramidsParallaxSection } from './components/PyramidsParallaxSection';
import { MonumentsShowcase } from './components/MonumentsShowcase';
import { MicroCursor } from './components/MicroCursor';
import { Footer } from './components/Footer';
import { soundManager } from './utils/soundEffects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { AchievementsGallery } from './components/AchievementsGallery';
import { startPerfGuard } from './utils/perfGuard';
import { ScrollProgress } from './components/ScrollProgress';
import { initSmoothScroll, scrollToY, naturalTop, prefersReducedMotion, stopScroll, startScroll } from './utils/smoothScroll';

// Story pages are only needed once a card is opened — keep them out of the first paint bundle
const ShowreelOverlay = lazy(() => import('./motion/ShowreelOverlay'));
const AchievementPage = lazy(() =>
  import('./components/EpisodePage').then((m) => ({ default: m.EpisodePage }))
);

// Sections don't depend on scroll state — memoising stops them re-rendering while the hero animates
const MemoMarquee = memo(MarqueeMessageSection);
const MemoDual = memo(DualProfileSection);
const MemoTimeline = memo(TimelineSection);
const MemoArc = memo(HorizonInitiatives);
const MemoPyramids = memo(PyramidsParallaxSection);
const MemoShowcase = memo(MonumentsShowcase);
const MemoFooter = memo(Footer);

export default function App() {
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [showreel, setShowreel] = useState(false);
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  useEffect(() => { if (params?.has('showreel')) setShowreel(true); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [heroScrollProgress, setHeroScrollProgress] = useState<number>(0);
  const [activeAchievementId, setActiveAchievementId] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const dialogueRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const pyramidsRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        measureScroll();
      });
    };
    const measureScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // 1. Hero Awakening Progress (0 at top, 1 at 95% windowHeight scroll)
      const heroAwakenDist = windowHeight * 0.95;
      const progress = Math.min(1, Math.max(0, scrollY / heroAwakenDist));
      setHeroScrollProgress(progress);

      // 2. Active section tracker based on scroll positions
      const getSectionTop = (el: HTMLElement | null) => (el ? naturalTop(el) : Infinity);

      const marqueeTop = getSectionTop(marqueeRef.current);
      const dialogueTop = getSectionTop(dialogueRef.current);
      const timelineTop = getSectionTop(timelineRef.current);
      const arcTop = getSectionTop(arcRef.current);
      const pyramidsTop = getSectionTop(pyramidsRef.current);
      const showcaseTop = getSectionTop(showcaseRef.current);

      const checkThreshold = scrollY + windowHeight * 0.4;

      if (checkThreshold < marqueeTop) {
        setCurrentSection('hero');
      } else if (checkThreshold < dialogueTop) {
        setCurrentSection('marquee');
      } else if (checkThreshold < timelineTop) {
        setCurrentSection('dialogue');
      } else if (checkThreshold < arcTop) {
        setCurrentSection('timeline');
      } else if (checkThreshold < pyramidsTop) {
        setCurrentSection('arc');
      } else if (checkThreshold < showcaseTop) {
        setCurrentSection('pyramids');
      } else {
        setCurrentSection('showcase');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    measureScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Inertia scroll + depth: each layer that gets covered recedes, each incoming layer's corners square off
  useEffect(() => {
    initSmoothScroll();
    startPerfGuard();
    const stopVel = startVelocity();
    if (prefersReducedMotion()) return;
    const pairs = [
      [heroRef, marqueeRef], [marqueeRef, dialogueRef], [dialogueRef, timelineRef],
      [arcRef, pyramidsRef], [pyramidsRef, showcaseRef]
    ] as const;
    const ctx = gsap.context(() => {
      pairs.forEach(([under, over]) => {
        const u = under.current?.firstElementChild as HTMLElement | null;
        const o = over.current;
        if (!u || !o) return;
        const st = { start: () => naturalTop(o) - window.innerHeight, end: () => naturalTop(o), scrub: true, invalidateOnRefresh: true };
        gsap.to(u, { scale: 0.93, yPercent: -3, opacity: 0.45, ease: 'none', scrollTrigger: st });
        gsap.fromTo(o, { borderTopLeftRadius: 40, borderTopRightRadius: 40 }, { borderTopLeftRadius: 0, borderTopRightRadius: 0, ease: 'none', scrollTrigger: st });
      });
      [marqueeRef, dialogueRef, arcRef, pyramidsRef, showcaseRef].forEach((r) => { if (r.current) r.current.style.overflow = 'hidden'; });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => { stopVel(); ctx.revert(); window.removeEventListener('load', refresh); };
  }, []);

  // Mark each stacked layer idle while it is covered by the next one (or still far below the viewport)
  useEffect(() => {
    const layers = [heroRef, marqueeRef, dialogueRef, timelineRef, arcRef, pyramidsRef, showcaseRef];
    layers.forEach((r) => r.current?.setAttribute('data-layer', ''));
    let tops: number[] = [];
    const measure = () => { tops = layers.map((r) => (r.current ? naturalTop(r.current) : Infinity)); apply(); };
    const apply = () => {
      const y = window.scrollY, vh = window.innerHeight;
      layers.forEach((r, i) => {
        const el = r.current;
        if (!el || !tops.length) return;
        const idle = y < tops[i] - vh * 1.05 || (i < layers.length - 1 && y >= tops[i + 1] - 1);
        const v = idle ? '1' : '0';
        if (el.dataset.idle !== v) el.dataset.idle = v;
      });
    };
    measure();
    window.addEventListener('scroll', apply, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    const t = window.setTimeout(measure, 1500); // after images/fonts settle
    return () => {
      window.removeEventListener('scroll', apply);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
      window.clearTimeout(t);
    };
  }, []);

  // Freeze the page behind an open achievement so only the overlay scrolls
  useEffect(() => {
    if (activeAchievementId) stopScroll('achievement');
    else startScroll('achievement');
    return () => startScroll('achievement');
  }, [activeAchievementId]);

  const handleToggleAudio = () => {
    const newState = soundManager.toggleMute();
    setIsAudioActive(newState);
  };

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      scrollToY(0);
      return;
    }

    let targetEl: HTMLElement | null = null;
    if (sectionId === 'marquee') targetEl = marqueeRef.current;
    if (sectionId === 'dialogue') targetEl = dialogueRef.current;
    if (sectionId === 'timeline') targetEl = timelineRef.current;
    if (sectionId === 'arc') targetEl = arcRef.current;
    if (sectionId === 'pyramids') targetEl = pyramidsRef.current;
    if (sectionId === 'showcase' || sectionId === 'monuments') targetEl = showcaseRef.current;

    if (targetEl) scrollToY(naturalTop(targetEl));
  }, []);

  const handleSelectAchievement = useCallback((achievementId: string) => {
    setActiveAchievementId(achievementId);
  }, []);
  const handleCloseAchievement = useCallback(() => setActiveAchievementId(null), []);
  const goTimeline = useCallback(() => scrollToSection('timeline'), [scrollToSection]);
  const goTop = useCallback(() => scrollToSection('hero'), [scrollToSection]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-[#f4f4ed] text-[#111112] font-sans selection:bg-[#d2ff00] selection:text-black">
      <Preloader />
      <ScrollProgress />
      <div className="fixed bottom-5 end-5 z-[150]"><LangToggle className="shadow-lg" /></div>
      <button onClick={() => setShowreel(true)} aria-label="Play the 15 second showreel" className="fixed bottom-5 start-5 z-[150] inline-flex items-center gap-2 rounded-full bg-[#111112] text-[#d2ff00] pl-3 pr-4 py-2 text-[11px] font-mono font-bold tracking-[0.18em] shadow-lg cursor-pointer hover:scale-105 transition-transform"><Play className="w-3.5 h-3.5 fill-current" />SHOWREEL · 0:15</button>
      {showreel && <Suspense fallback={null}><ShowreelOverlay onClose={() => setShowreel(false)} /></Suspense>}

      {/* Universal Top Navigation */}
      <Navigation
        currentSection={currentSection}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
        onNavigateSection={scrollToSection}
        onSelectAchievement={handleSelectAchievement}
        scrollProgress={heroScrollProgress}
      />

      {/* Main Experience Flow with Pure Direct Sticky Stacking Curtain Physics */}
      <main className="relative w-full">
        {/* ACT 1: Minimalist Awakening: Void -> Spark -> Tiny "EGYPT" -> Scroll Scale -> Sisi & Lens Reveal */}
        <div
          ref={heroRef}
          className="sticky top-0 z-10 w-full h-screen overflow-hidden bg-black"
        >
          <HeroLensSection scrollProgress={heroScrollProgress} />
        </div>
        {/* Scroll runway for Act 1 awakening */}
        <div className="h-[95vh] pointer-events-none" />

        {/* ACT 2: Kinetic Dual-Font Marquee (Slides UP directly over the pinned Hero) */}
        <div
          ref={marqueeRef}
          className="sticky top-0 z-20 w-full min-h-screen bg-[#282c20] shadow-[0_-35px_80px_rgba(0,0,0,0.65)] flex items-center justify-center border-t border-[#3b3c38]"
        >
          <MemoMarquee />
        </div>
        {/* Scroll runway for Act 2 */}
        <div className="h-[80vh] pointer-events-none" />

        {/* ACT 3: Facing Profiles Split — Ancient Kemet vs Modern Republic (Slides UP directly over pinned Act 2) */}
        <div
          ref={dialogueRef}
          className="sticky top-0 z-30 w-full min-h-screen bg-[#f4f4ed] shadow-[0_-35px_80px_rgba(0,0,0,0.35)] flex items-center justify-center border-t border-[#111112]/10"
        >
          <MemoDual onScrollToTimeline={goTimeline} />
        </div>
        {/* Scroll runway for Act 3 */}
        <div className="h-[80vh] pointer-events-none" />

        {/* ACT 4: Asymmetrical Uneven Editorial Timeline Track (Slides UP directly over pinned Act 3) */}
        <div
          ref={timelineRef}
          className="relative z-40 w-full shadow-[0_-35px_80px_rgba(0,0,0,0.35)]"
        >
          <MemoTimeline onSelectAchievement={handleSelectAchievement} />
        </div>

        {/* INTERLUDE: pinned horizontal frames gallery (page scrolls down, frames travel sideways) */}
        <div className="relative z-[45] w-full">
          <FramesGallery onSelectAchievement={handleSelectAchievement} />
        </div>

        {/* ACT 5: 3D Fanned Arc Perspective Gallery (Slides UP directly over pinned Act 4) */}
        <div
          ref={arcRef}
          className="sticky top-0 z-50 w-full min-h-screen bg-[#f4f4ed] shadow-[0_-35px_80px_rgba(0,0,0,0.35)] flex items-center justify-center border-t border-[#111112]/10"
        >
          <MemoArc onSelectAchievement={handleSelectAchievement} />
        </div>
        {/* Scroll runway for Act 5 */}
        <div className="h-[80vh] pointer-events-none" />

        {/* ACT 6: The Three Pyramids Multi-Plane Parallax Chamber (Replaces Defying Time section) */}
        <div
          ref={pyramidsRef}
          className="sticky top-0 z-60 w-full min-h-screen bg-[#0c0d0a] shadow-[0_-35px_80px_rgba(0,0,0,0.5)] border-t border-white/10"
        >
          <MemoPyramids onSelectAchievement={handleSelectAchievement} />
        </div>
        {/* Scroll runway for Act 6 */}
        <div className="h-[80vh] pointer-events-none" />

        {/* ACT 7: Seven Millennia Sovereign Archive Showcase (Slides UP directly over pinned Act 6) */}
        <div
          ref={showcaseRef}
          className="relative z-70 w-full min-h-screen bg-[#f4f4ed] shadow-[0_-35px_80px_rgba(0,0,0,0.4)] border-t border-[#111112]/10"
        >
          <MemoShowcase onSelectAchievement={handleSelectAchievement} />
        </div>
        <div className="relative z-[75] w-full"><AchievementsGallery onSelectAchievement={handleSelectAchievement} /></div>
      </main>

      {/* Colophon & Institutional Minimal Footer (Slides UP directly over Act 8) */}
      <footer className="relative z-90 w-full bg-[#111112] shadow-[0_-35px_80px_rgba(0,0,0,0.5)] border-t border-white/10">
        <MemoFooter onScrollToTop={goTop} />
      </footer>

      {/* Dedicated Full-Screen Editorial Achievement Page (Story for every major milestone) */}
      <AnimatePresence>
        {activeAchievementId && (
          <Suspense fallback={null}>
            <AchievementPage
              key="achievement-page"
              achievementId={activeAchievementId}
              onClose={handleCloseAchievement}
              onSelectAchievement={handleSelectAchievement}
            />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Sleek Minimal Precision Difference-Blend Cursor */}
      <MicroCursor />
    </div>
    </MotionConfig>
  );
}
