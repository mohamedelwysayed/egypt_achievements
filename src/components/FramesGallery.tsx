import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { ContourBackground } from './ContourBackground';
import { ACHIEVEMENTS_DATA } from '../data/achievementsData';
import { ACH_AR } from '../data/achievementsAr';
import { Split } from './Split';
import { soundManager } from '../utils/soundEffects';
import { useLang } from '../i18n';

const FRAMES: { id: string; box: string }[] = [
  { id: 'great-pyramid', box: 'w-[72vw] md:w-[26vw] h-[54vh]' }, { id: 'abu-simbel', box: 'w-[78vw] md:w-[34vw] h-[40vh] mt-[16vh]' },
  { id: 'tutankhamun-mask', box: 'w-[64vw] md:w-[22vw] h-[62vh] -mt-[6vh]' }, { id: 'rosetta-stone', box: 'w-[72vw] md:w-[30vw] h-[44vh] mt-[10vh]' },
  { id: 'saladin-citadel', box: 'w-[78vw] md:w-[28vw] h-[56vh]' }, { id: 'suez-canal-opening', box: 'w-[78vw] md:w-[36vw] h-[38vh] mt-[18vh]' },
  { id: 'aswan-high-dam', box: 'w-[64vw] md:w-[24vw] h-[60vh] -mt-[4vh]' }, { id: 'new-suez-canal', box: 'w-[78vw] md:w-[32vw] h-[42vh] mt-[12vh]' },
  { id: 'pharaohs-golden-parade', box: 'w-[72vw] md:w-[26vw] h-[58vh]' }, { id: 'benban-solar', box: 'w-[78vw] md:w-[34vw] h-[40vh] mt-[14vh]' },
  { id: 'grand-egyptian-museum', box: 'w-[64vw] md:w-[24vw] h-[60vh] -mt-[6vh]' }, { id: 'new-administrative-capital', box: 'w-[78vw] md:w-[30vw] h-[46vh] mt-[8vh]' },
];

const Frame: React.FC<{ id: string; box: string; i: number; p: MotionValue<number>; onOpen: (id: string) => void }> = ({ id, box, i, p, onOpen }) => {
  const { lang } = useLang();
  const a = ACHIEVEMENTS_DATA.find((x) => x.id === id)!, ar = ACH_AR[id];
  const x = useTransform(p, [0, 1], [i % 2 ? 40 : -40, i % 2 ? -40 : 40]);
  return (
    <figure className="shrink-0 flex flex-col gap-3 vel-skew" data-cursor="OPEN" onClick={() => { soundManager.playAchievementOpen(); onOpen(id); }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <figcaption className="flex items-baseline justify-between gap-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold">
        <span className="text-[#d2ff00]">{lang === 'ar' ? ar?.year ?? a.year : a.year}</span>
        <span className="text-[#f4f4ed]/50">{String(i + 1).padStart(2, '0')}</span>
      </figcaption>
      <div className={`${box} relative overflow-hidden rounded-2xl border border-white/15 group cursor-pointer`}>
        <motion.img src={a.heroImage} alt={lang === 'ar' ? ar?.title ?? a.title : a.title} loading="lazy" decoding="async" style={{ x, scale: 1.25 }}
          className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-700 group-hover:brightness-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
      </div>
      <p className="font-syne font-extrabold text-sm sm:text-base max-w-[22rem]">{lang === 'ar' ? ar?.title ?? a.title : a.title}</p>
    </figure>
  );
};

/** Pinned horizontal gallery: the page scrolls vertically, the frames travel sideways (landonorris.com home). */
export const FramesGallery: React.FC<{ onSelectAchievement: (id: string) => void }> = ({ onSelectAchievement }) => {
  const { lang, t } = useLang();
  const wrap = useRef<HTMLElement>(null), track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(2600);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  useLayoutEffect(() => {
    const m = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    m(); const t1 = window.setTimeout(m, 600); window.addEventListener('resize', m); window.addEventListener('load', m);
    return () => { clearTimeout(t1); window.removeEventListener('resize', m); window.removeEventListener('load', m); };
  }, [lang]);
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <section ref={wrap} className="relative bg-[#282c20] text-[#f4f4ed] border-t border-[#3b3c38]" style={{ height: `${Math.max(380, (dist / Math.max(1, typeof window === 'undefined' ? 1440 : window.innerWidth)) * 130 + 120)}vh` }} data-frames>
      <div dir="ltr" className="sticky top-0 h-screen overflow-hidden flex items-center">
        <ContourBackground dark opacity={0.28} />
        <motion.div ref={track} style={{ x, transform: undefined }} className="relative flex items-center gap-[7vw] ps-[8vw] pe-[18vw] will-change-transform" dir="ltr">
          <div className="shrink-0 w-[82vw] md:w-[34vw]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <span className="font-mono text-[11px] tracking-[0.3em] text-[#d2ff00] font-bold block mb-4">{t('ACT III½ · FRAMES', 'الفصل الثالث ونصف · لقطات')}</span>
            <Split key={lang} text={t('FRAMES FROM SEVEN MILLENNIA', 'لقطات من سبعة آلاف عام')} className="text-4xl sm:text-6xl font-syne font-black leading-[1.08] uppercase" />
            <p className="mt-5 text-sm text-[#f4f4ed]/70 max-w-sm leading-relaxed">{t('Scroll down, the archive travels sideways. Open any frame to watch its episode.', 'مرّر للأسفل فيتحرك الأرشيف جانبًا. افتح أي لقطة لتشاهد حلقتها.')}</p>
          </div>
          {FRAMES.map((f, i) => (
            <React.Fragment key={f.id}>
              <Frame {...f} i={i} p={scrollYProgress} onOpen={onSelectAchievement} />
              {i === 5 && <div className="shrink-0 w-[80vw] md:w-[32vw]" dir={lang === 'ar' ? 'rtl' : 'ltr'}><p className="text-3xl sm:text-5xl font-serif italic leading-[1.2] text-[#f4f4ed]">{t('Seven thousand years, ', 'سبعة آلاف عام، ')}<span className="not-italic font-syne font-black bg-[#d2ff00] text-[#111112] px-2">{t('one unbroken line.', 'خطٌّ واحد لا ينقطع.')}</span></p></div>}
            </React.Fragment>
          ))}
          <div className="shrink-0 w-[70vw] md:w-[24vw]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <span className="font-mono text-[11px] tracking-[0.3em] text-[#d2ff00] font-bold">{t('KEEP SCROLLING', 'واصل التمرير')} {lang === 'ar' ? '↓' : '↓'}</span>
            <p className="mt-3 text-2xl sm:text-4xl font-syne font-black leading-tight">{t('Now look beyond the horizon.', 'والآن انظر خلف الأفق.')}</p>
          </div>
        </motion.div>
        <div className="absolute bottom-8 inset-x-[8vw] h-[2px] bg-white/10" dir="ltr"><motion.div style={{ width: bar }} className="h-full bg-[#d2ff00]" /></div>
      </div>
    </section>
  );
};
