import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight, X, Compass, Share2, Layers } from 'lucide-react';
import { AchievementStory, ACHIEVEMENTS_DATA } from '../data/achievementsData';
import { soundManager } from '../utils/soundEffects';
import { BoxReveal } from './BoxReveal';
import { ContourBackground } from './ContourBackground';

interface AchievementPageProps {
  achievementId: string | null;
  onClose: () => void;
  onSelectAchievement: (id: string) => void;
}

export const AchievementPage: React.FC<AchievementPageProps> = ({
  achievementId,
  onClose,
  onSelectAchievement
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const currentIndex = ACHIEVEMENTS_DATA.findIndex((a) => a.id === achievementId);
  const achievement: AchievementStory | undefined = ACHIEVEMENTS_DATA[currentIndex];

  const prevAchievement = currentIndex > 0 ? ACHIEVEMENTS_DATA[currentIndex - 1] : ACHIEVEMENTS_DATA[ACHIEVEMENTS_DATA.length - 1];
  const nextAchievement = currentIndex < ACHIEVEMENTS_DATA.length - 1 ? ACHIEVEMENTS_DATA[currentIndex + 1] : ACHIEVEMENTS_DATA[0];

  // Scroll-linked depth for the primary exhibit image (scroll container is this overlay, not the window)
  const { scrollY: overlayScroll } = useScroll({ container: containerRef });
  const heroImgY = useTransform(overlayScroll, [0, 700], [0, 70]);

  // Escape closes, focus moves into the dialog and returns to the trigger afterwards
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    containerRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (achievementId) {
      // Scroll to top of modal container
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, [achievementId]);

  if (!achievement) return null;

  const handleNext = () => {
    soundManager.playChime(580, 0.25);
    onSelectAchievement(nextAchievement.id);
  };

  const handlePrev = () => {
    soundManager.playChime(480, 0.25);
    onSelectAchievement(prevAchievement.id);
  };

  return (
      <motion.div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={achievement.title}
        tabIndex={-1}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: '0%' }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[200] bg-[#f4f4ed] text-[#111112] overflow-y-auto overscroll-contain outline-none select-none"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Topographic Background */}
        <ContourBackground dark={false} opacity={0.35} />

        {/* Floating Fixed Top Header */}
        <header className="sticky top-0 z-40 w-full px-6 sm:px-12 py-5 flex items-center justify-between bg-[#f4f4ed]/85 backdrop-blur-md border-b border-[#111112]/10 transition-all">
          <button
            onClick={() => {
              soundManager.playChime(320, 0.2);
              onClose();
            }}
            className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#111112] hover:text-black group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-[#d2ff00] transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>Return to Archive</span>
          </button>

          {/* Center Indicator */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#535450]">
              ACHIEVEMENT {String(currentIndex + 1).padStart(2, '0')} / {String(ACHIEVEMENTS_DATA.length).padStart(2, '0')}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d2ff00]" />
            <span className="text-xs font-mono font-bold uppercase text-[#111112]">
              {achievement.era}
            </span>
          </div>

          {/* Close & Action Cluster */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: achievement.title, text: achievement.overview, url: window.location.href });
                }
              }}
              title="Share Archive"
              className="w-9 h-9 rounded-lg border border-[#111112]/15 bg-white/70 flex items-center justify-center text-[#111112] hover:bg-[#d2ff00] transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundManager.playChime(320, 0.2);
                onClose();
              }}
              aria-label="Close page"
              className="w-9 h-9 rounded-lg border border-[#111112]/15 bg-white/70 flex items-center justify-center text-[#111112] hover:bg-[#111112] hover:text-[#d2ff00] transition-colors cursor-pointer shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* HERO SECTION: Tailored composition */}
        <section className="relative w-full min-h-[82vh] px-6 sm:px-12 pt-8 pb-16 flex flex-col justify-between max-w-7xl mx-auto">
          {/* Top Eyebrow & Year Datum */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#111112]/15 pb-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#d2ff00] text-[#111112] font-mono text-xs font-extrabold tracking-wider uppercase">
                {achievement.year}
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#535450] font-semibold">
                {achievement.dynastyOrLeader}
              </span>
            </div>

            {achievement.coordinates && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#535450]">
                <Compass className="w-3.5 h-3.5 text-[#111112]" />
                <span>{achievement.coordinates}</span>
              </div>
            )}
          </div>

          {/* Monumental Editorial Headline */}
          <div className="my-auto py-6">
            <BoxReveal
              isVisible={true}
              delay={0.1}
              boxColor="bg-[#111112]"
              duration={0.7}
              textOffset={-24}
            >
              <h1 className="font-syne font-black uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#111112] leading-[0.9]">
                {achievement.title}
              </h1>
            </BoxReveal>

            <BoxReveal
              isVisible={true}
              delay={0.25}
              boxColor="bg-[#d2ff00]"
              duration={0.7}
              textOffset={20}
              className="mt-3 block"
            >
              <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#535450] max-w-3xl leading-snug">
                {achievement.subtitle}
              </p>
            </BoxReveal>
          </div>

          {/* Asymmetrical Hero Imagery Composition */}
          <div className="relative mt-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Primary Large Image */}
            <div className="lg:col-span-8 relative h-[360px] sm:h-[480px] md:h-[560px] rounded-2xl overflow-hidden border border-[#111112]/20 shadow-2xl bg-[#111112] group">
              <motion.img
                src={achievement.heroImage}
                alt={achievement.title}
                referrerPolicy="no-referrer"
                decoding="async"
                style={{ y: heroImgY, scale: 1.12 }}
                className="w-full h-full object-cover object-center transition-[filter] duration-700 group-hover:brightness-110 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d2ff00] font-bold block mb-1">
                    PRIMARY EXHIBIT
                  </span>
                  <span className="font-syne font-bold text-base sm:text-xl">
                    {achievement.title}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-white">
                  𓈎
                </div>
              </div>
            </div>

            {/* Secondary Layered Asymmetric Card */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="relative h-[220px] sm:h-[280px] rounded-xl overflow-hidden border border-[#111112]/20 shadow-xl bg-[#282c20]">
                <img
                  src={achievement.secondaryImage}
                  alt={`${achievement.title} detail`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex items-end">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#d2ff00] font-bold">
                    ARCHIVAL CONTEXT DETAIL
                  </span>
                </div>
              </div>

              {/* Editorial Quote Card */}
              <div className="p-5 sm:p-6 rounded-xl bg-white/80 border border-[#111112]/15 shadow-sm">
                <blockquote className="font-serif italic text-sm sm:text-base text-[#111112] leading-relaxed mb-3">
                  "{achievement.editorialQuote.text}"
                </blockquote>
                <cite className="font-mono text-[10px] uppercase tracking-wider text-[#535450] font-bold block">
                  — {achievement.editorialQuote.source}
                </cite>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Large Key Numbers & Statistics */}
        <section className="relative w-full py-16 px-6 sm:px-12 bg-[#111112] text-[#f4f4ed]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d2ff00]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d2ff00] font-bold">
                METRICS OF IMMORTALITY
              </span>
            </div>

            {/* Dynamic Asymmetric Grid of Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {achievement.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d2ff00]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="font-syne font-black text-4xl sm:text-5xl lg:text-6xl text-[#d2ff00] tracking-tight leading-none">
                        {stat.value}
                      </span>
                      {stat.unit && (
                        <span className="font-mono text-sm sm:text-base font-bold text-white/70">
                          {stat.unit}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-white font-bold block mb-2">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 font-sans leading-relaxed mt-4 pt-3 border-t border-white/10">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: Deep Storytelling & Analysis */}
        <section className="relative w-full py-20 px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Narrative Sections */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#535450] font-bold block mb-2">
                  HISTORICAL COMPENDIUM
                </span>
                <h2 className="font-syne font-black uppercase text-3xl sm:text-4xl text-[#111112] tracking-tight mb-6">
                  Architecture, Genius & Destiny
                </h2>
                <p className="text-base sm:text-lg text-[#111112]/80 font-sans leading-relaxed">
                  {achievement.overview}
                </p>
              </div>

              {/* Sub-articles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#111112]/15">
                {achievement.sections.map((sec, idx) => (
                  <div key={idx} className="flex flex-col">
                    {sec.tag && (
                      <span className="inline-block px-2 py-0.5 rounded bg-black/5 text-[#111112] font-mono text-[9px] uppercase tracking-wider font-bold mb-2 w-max">
                        {sec.tag}
                      </span>
                    )}
                    <h3 className="font-syne font-bold text-lg text-[#111112] mb-2">
                      {sec.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#535450] leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Sovereign Continuity Breakdown */}
            <div className="lg:col-span-4 p-8 rounded-2xl bg-[#111112] text-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-4 h-4 text-[#d2ff00]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d2ff00] font-bold">
                    MODERN PARALLEL
                  </span>
                </div>
                <h4 className="font-syne font-bold text-xl uppercase mb-3">
                  Unbroken Statehood
                </h4>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                  {achievement.modernSignificance}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                  NATIONAL HERITAGE INDEX
                </span>
                <span className="text-xs font-mono font-bold text-[#d2ff00]">
                  VERIFIED RECORD
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM PAGINATION: Next / Previous Journey Flow */}
        <footer className="w-full bg-[#efefe5] border-t border-[#111112]/15 py-12 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Previous Achievement Button */}
            <button
              onClick={handlePrev}
              className="flex items-center gap-3 p-4 rounded-xl border border-[#111112]/15 bg-white/70 hover:bg-white hover:border-[#111112] transition-all cursor-pointer group text-left w-full sm:w-auto"
            >
              <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center group-hover:bg-[#d2ff00] transition-colors">
                <ArrowLeft className="w-5 h-5 text-[#111112] group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#535450] block">
                  PREVIOUS STORY
                </span>
                <span className="text-sm font-syne font-bold text-[#111112]">
                  {prevAchievement.title}
                </span>
              </div>
            </button>

            {/* Next Achievement Button */}
            <button
              onClick={handleNext}
              className="flex items-center gap-3 p-4 rounded-xl border border-[#111112]/15 bg-[#d2ff00] hover:bg-[#111112] hover:text-[#d2ff00] transition-all cursor-pointer group text-right w-full sm:w-auto"
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#111112]/70 group-hover:text-[#d2ff00]/70 block">
                  NEXT STORY
                </span>
                <span className="text-sm font-syne font-bold text-[#111112] group-hover:text-[#d2ff00]">
                  {nextAchievement.title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-black/10 group-hover:bg-[#d2ff00]/20 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-current group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </footer>
      </motion.div>
  );
};
