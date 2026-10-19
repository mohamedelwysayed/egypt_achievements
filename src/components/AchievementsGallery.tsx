import React, { memo, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../data/achievementsData';
import { SCENES } from './scenes';
import { LiteCtx } from './scenes/shared';
import { useLang, AR_TITLES } from '../i18n';
import { soundManager } from '../utils/soundEffects';
import { TiltCard } from './TiltCard';

/** Scenes mount only while on screen, so 23 illustrations cost nothing until scrolled to. */
const Thumb: React.FC<{ id: string; c: string }> = ({ id, c }) => {
  const ref = useRef<HTMLDivElement>(null), [on, setOn] = useState(false), S = SCENES[id];
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: '200px' }); io.observe(el); return () => io.disconnect(); }, []);
  return (<div ref={ref} style={{ ['--p' as string]: 1 }} className="absolute inset-0 bg-gradient-to-b from-[#1a1410] to-[#0a0907]">{on && S && <LiteCtx.Provider value={true}><S c={c} /></LiteCtx.Provider>}</div>);
};

export const AchievementsGallery: React.FC<{ onSelectAchievement: (id: string) => void }> = memo(({ onSelectAchievement }) => {
  const { lang, t } = useLang();
  return (
    <section id="scenes" className="relative w-full bg-[#0c0d0f] text-[#f4f4ed] py-24 px-6 sm:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d2ff00] font-bold">{t('THE ILLUSTRATED ARCHIVE', 'الأرشيف المصوَّر')}</span>
        <h2 className="mt-3 font-syne font-black uppercase tracking-tight text-4xl sm:text-6xl leading-[0.95]">{t('23 achievements, drawn in light', '٢٣ إنجازًا مرسومة بالضوء')}</h2>
        <p className="mt-4 max-w-2xl text-white/65 text-base sm:text-lg">{t('Every story has its own illustrated scene. Tap a card to open the full episode.', 'لكل قصة مشهدها المرسوم. اضغط على البطاقة لفتح الحلقة كاملة.')}</p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS_DATA.map((a, i) => (
            <TiltCard key={a.id} maxTilt={6} onClick={() => { soundManager.playAchievementOpen(); onSelectAchievement(a.id); }} className="group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,.8)]">
                <Thumb id={a.id} c={a.accentColor} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-3">
                  <div><span className="text-[10px] font-mono tracking-[0.25em] font-bold" style={{ color: a.accentColor }}>{String(i + 1).padStart(2, '0')} · {a.year}</span>
                    <h3 className="mt-1 font-syne font-black text-lg sm:text-xl leading-tight">{lang === 'ar' && AR_TITLES[a.id] ? AR_TITLES[a.id] : a.title}</h3></div>
                  <span className="w-9 h-9 rounded-full bg-[#d2ff00] text-black flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform"><ArrowUpRight className="w-4 h-4" /></span>
                </div>
              </div>
            </TiltCard>))}
        </div>
      </div>
    </section>);
});
