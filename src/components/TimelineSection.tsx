import React, { useRef, useState, useEffect } from 'react';
import { useLang } from '../i18n';
import { ACH_AR } from '../data/achievementsAr';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Eye, Sparkles, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { ContourBackground } from './ContourBackground';
import { BoxReveal } from './BoxReveal';
import { Magnetic } from './Magnetic';
import { TiltCard } from './TiltCard';
import { img } from '../utils/assets';
import { naturalTop, scrollToY } from '../utils/smoothScroll';

interface TimelineItem {
  id: string;
  achievementId: string;
  location: string;
  year: string;
  title: string;
  epoch: string;
  image: string;
  index: string;
  glyph: string;
  widthClass: string;
  heightClass: string;
  positionClass: string;
  isDominant?: boolean;
}

interface TimelineSectionProps {
  onSelectAchievement: (achievementId: string) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  onSelectAchievement
}) => {
  const { tr, lang } = useLang(); void lang;
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgNileRef = useRef<HTMLDivElement>(null);

  const progressRef = useRef<HTMLDivElement>(null);
  const maxScrollRef = useRef<number>(3400);
  // Only the *active epoch* is React state; scroll progress is written straight to the DOM
  const [activeEpochIndex, setActiveEpochIndex] = useState<number>(0);

  // Complete, intentionally asymmetrical, uneven timeline milestones spanning all 20 achievements
  const timelineMilestones: TimelineItem[] = [
    {
      id: 'narmer-unification',
      achievementId: 'narmer-palette',
      location: 'HIERAKONPOLIS, 3100 BCE',
      year: '3100 BCE',
      title: 'Unification of Upper & Lower Egypt',
      epoch: 'Dynasty I',
      image: img('narmer_palette_1790765008513'),
      index: '01',
      glyph: '𓈎',
      widthClass: 'w-[220px] sm:w-[260px]',
      heightClass: 'h-[280px] sm:h-[340px]',
      positionClass: 'mt-6 mb-auto' // High positioned
    },
    {
      id: 'step-pyramid-saqqara',
      achievementId: 'step-pyramid',
      location: 'SAQQARA, 2670 BCE',
      year: '2670 BCE',
      title: 'Step Pyramid of Djoser & Imhotep',
      epoch: 'Dynasty III',
      image: img('step_pyramid_1790764974602'),
      index: '02',
      glyph: '𓉐',
      widthClass: 'w-[240px] sm:w-[290px]',
      heightClass: 'h-[300px] sm:h-[360px]',
      positionClass: 'my-auto'
    },
    {
      id: 'giza-pyramids',
      achievementId: 'great-pyramid',
      location: 'GIZA, 2560 BCE',
      year: '2560 BCE',
      title: 'The Great Pyramid of Khufu',
      epoch: 'Old Kingdom',
      image: img('pyramids_cinematic_full_1790606922175'),
      index: '03',
      glyph: '𓉐',
      widthClass: 'w-[320px] sm:w-[420px] md:w-[480px]',
      heightClass: 'h-[360px] sm:h-[460px] md:h-[500px]',
      positionClass: 'mt-auto mb-2', // Massive dominant card
      isDominant: true
    },
    {
      id: 'great-sphinx',
      achievementId: 'great-sphinx',
      location: 'GIZA PLATEAU, 2500 BCE',
      year: '2500 BCE',
      title: 'The Great Sphinx of Giza',
      epoch: 'Old Kingdom',
      image: img('great_sphinx_1790764993662'),
      index: '04',
      glyph: '𓃭',
      widthClass: 'w-[260px] sm:w-[320px]',
      heightClass: 'h-[250px] sm:h-[290px]',
      positionClass: 'mt-8 mb-auto'
    },
    {
      id: 'tutankhamun-mask',
      achievementId: 'tutankhamun-mask',
      location: 'VALLEY OF THE KINGS, 1323 BCE',
      year: '1323 BCE',
      title: 'The Golden Nemes of Tutankhamun',
      epoch: 'New Kingdom',
      image: img('tutankhamun_mask_1790764945287'),
      index: '05',
      glyph: '𓋹',
      widthClass: 'w-[290px] sm:w-[360px]',
      heightClass: 'h-[340px] sm:h-[420px]',
      positionClass: 'mt-auto mb-10'
    },
    {
      id: 'kadesh-treaty-milestone',
      achievementId: 'kadesh-peace-treaty',
      location: 'PI-RAMESSES, 1259 BCE',
      year: '1259 BCE',
      title: 'The Silver Treaty of Kadesh',
      epoch: 'New Kingdom',
      image: img('treaty_of_kadesh_1790765243959'),
      index: '06',
      glyph: '𓏛',
      widthClass: 'w-[260px] sm:w-[310px]',
      heightClass: 'h-[290px] sm:h-[350px]',
      positionClass: 'mt-4 mb-auto'
    },
    {
      id: 'abu-simbel',
      achievementId: 'abu-simbel',
      location: 'ASWAN, 1279 BCE',
      year: '1279 BCE',
      title: 'Colossi of Abu Simbel',
      epoch: 'New Kingdom',
      image: img('abu_simbel_1790764959741'),
      index: '07',
      glyph: '𓇳',
      widthClass: 'w-[260px] sm:w-[310px]',
      heightClass: 'h-[320px] sm:h-[390px]',
      positionClass: 'mt-10 mb-auto'
    },
    {
      id: 'karnak-hall',
      achievementId: 'karnak-temple',
      location: 'THEBES, 1290 BCE',
      year: '1290 BCE',
      title: 'Hypostyle Hall of Karnak',
      epoch: 'New Kingdom',
      image: img('karnak_hypostyle_1790765112848'),
      index: '08',
      glyph: '𓏤',
      widthClass: 'w-[280px] sm:w-[340px]',
      heightClass: 'h-[250px] sm:h-[300px]',
      positionClass: 'my-auto'
    },
    {
      id: 'library-alexandria-milestone',
      achievementId: 'library-alexandria',
      location: 'ALEXANDRIA, 283 BCE',
      year: '283 BCE',
      title: 'The Great Library of Alexandria',
      epoch: 'Ptolemaic Golden Age',
      image: img('alexandria_library_1790765096622'),
      index: '09',
      glyph: '𓊖',
      widthClass: 'w-[270px] sm:w-[330px]',
      heightClass: 'h-[310px] sm:h-[370px]',
      positionClass: 'mt-auto mb-8'
    },
    {
      id: 'rosetta-stone-milestone',
      achievementId: 'rosetta-stone',
      location: 'RASHID, 196 BCE',
      year: '196 BCE',
      title: 'The Rosetta Stone Decree',
      epoch: 'Ptolemaic Period',
      image: img('rosetta_stone_1790765022209'),
      index: '10',
      glyph: '𓏛',
      widthClass: 'w-[240px] sm:w-[290px]',
      heightClass: 'h-[290px] sm:h-[350px]',
      positionClass: 'mt-4 mb-auto'
    },
    {
      id: 'fayum-portraits-milestone',
      achievementId: 'fayum-portraits',
      location: 'FAYUM OASIS, 100 CE',
      year: '100 CE',
      title: 'Encaustic Fayum Mummy Portraits',
      epoch: 'Greco-Roman Era',
      image: img('fayum_mummy_portrait_1790765128062'),
      index: '11',
      glyph: '𓁐',
      widthClass: 'w-[240px] sm:w-[290px]',
      heightClass: 'h-[310px] sm:h-[370px]',
      positionClass: 'my-auto'
    },
    {
      id: 'st-catherine-milestone',
      achievementId: 'st-catherine',
      location: 'MOUNT SINAI, 565 CE',
      year: '565 CE',
      title: 'Saint Catherine’s Monastery',
      epoch: 'Byzantine Era',
      image: img('st_catherine_sinai_1790765146001'),
      index: '12',
      glyph: '𓊖',
      widthClass: 'w-[260px] sm:w-[310px]',
      heightClass: 'h-[280px] sm:h-[340px]',
      positionClass: 'mt-6 mb-auto'
    },
    {
      id: 'al-azhar-milestone',
      achievementId: 'al-azhar-university',
      location: 'HISTORIC CAIRO, 970 CE',
      year: '970 CE',
      title: 'Al-Azhar Mosque & University',
      epoch: 'Islamic Golden Age',
      image: img('al_azhar_mosque_1790765036448'),
      index: '13',
      glyph: '𓉐',
      widthClass: 'w-[260px] sm:w-[310px]',
      heightClass: 'h-[280px] sm:h-[340px]',
      positionClass: 'my-auto'
    },
    {
      id: 'saladin-citadel-milestone',
      achievementId: 'saladin-citadel',
      location: 'CAIRO CITADEL, 1176 CE',
      year: '1176 CE',
      title: 'Citadel of Cairo & Ayyubid Fortress',
      epoch: 'Ayyubid & Mamluk',
      image: img('saladin_citadel_1790765050014'),
      index: '14',
      glyph: '𓊖',
      widthClass: 'w-[250px] sm:w-[300px]',
      heightClass: 'h-[300px] sm:h-[360px]',
      positionClass: 'mt-6 mb-auto'
    },
    {
      id: 'suez-canal',
      achievementId: 'suez-canal-opening',
      location: 'ISTHMUS OF SUEZ, 1869 CE',
      year: '1869 CE',
      title: 'Inauguration of the Suez Canal',
      epoch: 'Modern Renaissance',
      image: img('suez_canal_inauguration_1790765258740'),
      index: '15',
      glyph: '𓈗',
      widthClass: 'w-[260px] sm:w-[320px]',
      heightClass: 'h-[280px] sm:h-[340px]',
      positionClass: 'mt-auto mb-6'
    },
    {
      id: 'aswan-dam-milestone',
      achievementId: 'aswan-high-dam',
      location: 'ASWAN, 1970 CE',
      year: '1970 CE',
      title: 'The Aswan High Dam',
      epoch: 'Modern Republic',
      image: img('aswan_high_dam_1790765082792'),
      index: '16',
      glyph: '𓈗',
      widthClass: 'w-[280px] sm:w-[340px]',
      heightClass: 'h-[320px] sm:h-[380px]',
      positionClass: 'my-auto'
    },
    {
      id: 'new-suez-canal-milestone',
      achievementId: 'new-suez-canal',
      location: 'SUEZ CANAL, 2015 CE',
      year: '2015 CE',
      title: 'The New Suez Canal Expansion',
      epoch: 'Contemporary Republic',
      image: img('suez_canal_ships_1790765066192'),
      index: '17',
      glyph: '𓈗',
      widthClass: 'w-[270px] sm:w-[330px]',
      heightClass: 'h-[290px] sm:h-[350px]',
      positionClass: 'mt-auto mb-8'
    },
    {
      id: 'golden-parade',
      achievementId: 'pharaohs-golden-parade',
      location: 'CAIRO, 2021 CE',
      year: '2021 CE',
      title: 'The Pharaohs’ Golden Parade',
      epoch: 'Contemporary Republic',
      image: img('pharaohs_golden_parade_1790765233060'),
      index: '18',
      glyph: '𓋹',
      widthClass: 'w-[260px] sm:w-[320px]',
      heightClass: 'h-[320px] sm:h-[380px]',
      positionClass: 'mt-8 mb-auto'
    },
    {
      id: 'new-capital-milestone',
      achievementId: 'new-administrative-capital',
      location: 'NEW CAPITAL, 2026 CE',
      year: '2026 CE',
      title: 'New Administrative Capital & Iconic Tower',
      epoch: 'Contemporary Republic',
      image: img('iconic_tower_capital_1790765221938'),
      index: '19',
      glyph: '𓉐',
      widthClass: 'w-[280px] sm:w-[350px]',
      heightClass: 'h-[340px] sm:h-[410px]',
      positionClass: 'my-auto'
    },
    {
      id: 'gem-museum',
      achievementId: 'grand-egyptian-museum',
      location: 'GIZA, 2026 CE',
      year: '2026 CE',
      title: 'Grand Egyptian Museum',
      epoch: 'Contemporary Republic',
      image: img('egypt_gem_museum_1790512748235'),
      index: '20',
      glyph: '𓊖',
      widthClass: 'w-[320px] sm:w-[440px] md:w-[500px]',
      heightClass: 'h-[360px] sm:h-[460px]',
      positionClass: 'mt-auto mb-4', // Prominent grand finale anchor
      isDominant: true
    }
  ];

  // Measure full horizontal track scroll distance, then keep the track glued to scroll progress
  useEffect(() => {
    const count = timelineMilestones.length;
    let raf = 0;
    let lastIndex = 0;
    const quickNile = bgNileRef.current
      ? gsap.quickTo(bgNileRef.current, 'x', { duration: 0.5, ease: 'power1.out' })
      : null;

    const update = () => {
      raf = 0;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      // Off-screen: nothing to animate
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;

      const rawProgress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      // The horizontal track completes over the first 78% — the rest is runway so the last cards can be read
      const timelineProg = Math.min(1, rawProgress / 0.78);

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-timelineProg * maxScrollRef.current}px, 0, 0)`;
      }
      if (progressRef.current) {
        progressRef.current.style.width = `${Math.max(5, rawProgress * 100)}%`;
      }
      quickNile?.(-timelineProg * 420);

      const index = Math.min(count - 1, Math.floor(timelineProg * count));
      if (index !== lastIndex) {
        lastIndex = index;
        setActiveEpochIndex(index);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const measure = () => {
      if (trackRef.current) {
        // scrollWidth is unaffected by the transform we apply, so this is always the natural width
        maxScrollRef.current = Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 140);
      }
      schedule();
    };

    measure();
    const t = window.setTimeout(measure, 400);
    const ro = trackRef.current ? new ResizeObserver(measure) : null;
    if (trackRef.current && ro) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('load', measure);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      ro?.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('load', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jumpToMilestone = (index: number) => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const milestoneFraction = index / (timelineMilestones.length - 1);
    const targetProgress = milestoneFraction * 0.78;
    // naturalTop = real document offset (offsetTop alone is relative to the wrapper and would land near the page top)
    scrollToY(naturalTop(containerRef.current) + targetProgress * totalScrollable + 2, 1.1);
    soundManager.playChime(420 + index * 25, 0.2);
  };

  const handleArrow = (dir: 'left' | 'right') => {
    const nextIndex =
      dir === 'left'
        ? Math.max(0, activeEpochIndex - 1)
        : Math.min(timelineMilestones.length - 1, activeEpochIndex + 1);
    jumpToMilestone(nextIndex);
  };

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="relative w-full h-[480vh] bg-[#f4f4ed] text-[#111112] select-none border-t border-[#111112]/10"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 sm:py-10 px-4 sm:px-10 lg:px-12">
        {/* Topographic Background with contour curves matching Reference Image 1 */}
        <ContourBackground dark={false} opacity={0.45} />

        {/* Parallax Nilotic Wave Background with Flowing Water Animation */}
        <div
          ref={bgNileRef}
          className="absolute inset-y-0 left-0 w-[240vw] pointer-events-none opacity-30 will-change-transform flex items-center"
        >
          <svg className="w-full h-56" preserveAspectRatio="none" viewBox="0 0 1200 120">
            {/* Primary flowing river stream */}
            <path
              d="M0,60 Q300,110 600,50 T1200,60"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeDasharray="12 12"
              className="animate-[dashflow_2s_linear_infinite]"
            />
            {/* Secondary golden reflection stream */}
            <path
              d="M0,68 Q300,118 600,58 T1200,68"
              fill="none"
              stroke="#d2ff00"
              strokeWidth="1.2"
              strokeDasharray="8 16"
              className="animate-[dashflow_3s_linear_infinite]"
            />
          </svg>
        </div>

        {/* Top Minimal Editorial Scrubber Bar */}
        <div className="relative z-20 flex items-center justify-between max-w-7xl mx-auto w-full">
          <div>
            <BoxReveal isVisible={true} delay={0.05} boxColor="bg-[#111112]" duration={0.6}>
              <span className="text-eyebrow text-[#535450] block">
                {tr("ACT III · CHRONOLOGY & ASYMMETRIC HORIZON")}
              </span>
            </BoxReveal>
            <BoxReveal isVisible={true} delay={0.15} boxColor="bg-[#d2ff00]" duration={0.6}>
              <span className="text-sm sm:text-base font-syne font-black uppercase tracking-tight text-[#111112]">
                {tr("Seven Millennia Side-Scroll")}
              </span>
            </BoxReveal>
          </div>

          {/* Quick Jump Markers (01, 02, 03... pills) */}
          <div className="hidden md:flex items-center gap-1.5 bg-black/5 p-1 rounded-lg border border-black/10">
            {timelineMilestones.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => jumpToMilestone(idx)}
                className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all cursor-pointer ${
                  activeEpochIndex === idx
                    ? 'bg-[#d2ff00] text-[#111112] font-black shadow-xs scale-105'
                    : 'text-[#535450] hover:text-[#111112]'
                }`}
              >
                {m.index}
              </button>
            ))}
          </div>

          {/* Arrow navigation buttons with Magnetic pull */}
          <div className="flex items-center gap-2">
            <Magnetic strength={0.35}>
              <button
                onClick={() => handleArrow('left')}
                disabled={activeEpochIndex === 0}
                aria-label={tr("Previous milestone")}
                className="w-9 h-9 rounded-lg border border-[#111112]/20 bg-white/70 backdrop-blur-sm flex items-center justify-center text-[#111112] hover:bg-[#d2ff00] disabled:opacity-25 transition-all shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </Magnetic>
            <Magnetic strength={0.35}>
              <button
                onClick={() => handleArrow('right')}
                disabled={activeEpochIndex === timelineMilestones.length - 1}
                aria-label={tr("Next milestone")}
                className="w-9 h-9 rounded-lg border border-[#111112]/20 bg-white/70 backdrop-blur-sm flex items-center justify-center text-[#111112] hover:bg-[#d2ff00] disabled:opacity-25 transition-all shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Main Horizontal Asymmetric Canvas Track (Exact match to Reference Image 1) */}
        <div className="relative z-10 w-full overflow-hidden my-auto py-2">
          <div
            ref={trackRef}
            dir="ltr"
            className="flex items-center gap-8 sm:gap-14 lg:gap-16 transition-transform duration-300 ease-out will-change-transform"
            style={{ transform: 'translate3d(0px, 0, 0)' }}
          >
            {/* Leftmost Editorial Statement & Lime Signature (Matching Reference Image 1 top-left) */}
            <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="shrink-0 w-[260px] sm:w-[320px] md:w-[380px] flex flex-col justify-start pl-2 sm:pl-4 self-start mt-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#535450] font-bold mb-2">
                {tr("FOUNDATIONAL MOTTO")}
              </span>
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#111112] leading-snug mb-4 border-none p-0">
                "{tr("It doesn't matter ")}<span className="font-bold text-[#111112]">{tr("where")}</span>{tr(" you start, it's ")}<span className="font-bold text-[#111112]">{tr("how")}</span>{tr(" you progress from there.")}"
              </blockquote>

              {/* Electric Lime Handwritten Signature (Exact match to Reference Image 1 signature) */}
              <div className="w-32 h-12 text-[#d2ff00]">
                <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 160 50" fill="none">
                  <path
                    d="M10,40 C30,12 60,10 80,14 C95,18 110,28 90,40 C75,49 50,44 60,32 C70,20 120,16 150,24"
                    stroke="#111112"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20,38 C40,15 70,12 90,16"
                    stroke="#d2ff00"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M42,26 L68,23" stroke="#111112" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Asymmetrical Scattered Photo Cards of Varied Sizes & Heights */}
            {timelineMilestones.map((card) => (
              <div
                key={card.id}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                className={`shrink-0 flex flex-col ${card.positionClass}`}
              >
                {/* Location / Date Header (Reference image format: e.g. "MONACO, 2024") */}
                <div className="flex items-center justify-between gap-2 mb-2 px-1">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#535450] font-bold">
                    {tr(card.location)}
                  </span>
                  {card.isDominant && (
                    <span className="px-1.5 py-0.5 rounded bg-[#d2ff00] text-[#111112] font-mono text-[8px] font-black uppercase">
                      {tr("MONUMENTAL")}
                    </span>
                  )}
                </div>

                {/* Photo Frame with 3D Tilt & Specular Sheen */}
                <TiltCard
                  maxTilt={6}
                  onClick={() => {
                    soundManager.playAchievementOpen();
                    onSelectAchievement(card.achievementId);
                  }}
                  className={`${card.widthClass} ${card.heightClass} rounded-xl overflow-hidden border border-[#111112]/15 bg-white shadow-xl group cursor-pointer`}
                >
                  <img loading="lazy" decoding="async"
                    src={card.image}
                    alt={lang === 'ar' ? (ACH_AR[card.achievementId]?.title ?? card.title) : card.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/60 transition-colors" />

                  {/* Top Inspect Pill */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#d2ff00] text-[#111112] px-2.5 py-1 rounded text-[10px] font-mono font-black flex items-center gap-1 shadow-sm z-20">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{tr("DEDICATED STORY")}</span>
                  </div>

                  {/* Card bottom titles */}
                  <div className="absolute bottom-3 left-3 right-3 text-white z-20">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#d2ff00] font-bold block mb-0.5">
                      {tr(card.epoch)} · {tr(card.year)}
                    </span>
                    <h3 className="text-xs sm:text-sm font-syne font-black leading-tight line-clamp-2">
                      {lang === 'ar' ? (ACH_AR[card.achievementId]?.title ?? card.title) : card.title}
                    </h3>
                  </div>
                </TiltCard>

                {/* Bottom Pill Badge: [ 01 | 𓈎 ] (Reference style) */}
                <div className="mt-2.5 flex items-center justify-between px-1">
                  <div className="inline-flex items-center border border-[#111112]/20 rounded-md bg-white/80 backdrop-blur-xs overflow-hidden shadow-xs">
                    <span className="px-2 py-0.5 text-xs font-mono font-bold border-r border-[#111112]/20 text-[#111112]">
                      {card.index}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-bold text-[#111112] bg-[#d2ff00]/40">
                      {card.glyph}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      soundManager.playAchievementOpen();
                      onSelectAchievement(card.achievementId);
                    }}
                    className="text-[10px] font-mono font-bold uppercase text-[#535450] hover:text-[#111112] flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>{tr("EXPLORE")}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Minimal Progress Bar & Milestone Year Ticks */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-mono text-[#535450] pt-3 border-t border-[#111112]/10">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#111112]">{tr("3200 BCE")}</span>
            <span className="hidden sm:inline text-[#535450] text-[10px]">{tr("MEMPHIS UNIFICATION")}</span>
          </div>

          <div className="w-40 sm:w-80 md:w-96 h-[2.5px] bg-[#111112]/15 relative rounded-full overflow-hidden mx-4">
            <div
              ref={progressRef}
              className="h-full bg-[#d2ff00] transition-[width] duration-150"
              style={{ width: '5%' }}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[#535450] text-[10px]">{tr("GRAND MUSEUM & CAPITAL")}</span>
            <span className="font-bold text-[#111112]">{tr("2026 CE")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
