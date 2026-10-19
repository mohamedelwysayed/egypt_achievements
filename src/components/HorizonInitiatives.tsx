import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { ContourBackground } from './ContourBackground';
import { Split } from './Split';
import { INITIATIVES } from '../data/initiatives';
import { useLang } from '../i18n';
import { ACHIEVEMENTS_DATA } from '../data/achievementsData';

export const HorizonInitiatives: React.FC<{ onSelectAchievement: (id: string) => void }> = ({ onSelectAchievement }) => {
  const { lang, t } = useLang();
  const [hovered, setHovered] = useState<string | null>(null);
  const mid = (INITIATIVES.length - 1) / 2;
  const rtl = lang === 'ar' ? -1 : 1;

  return (
    <section className="relative w-full min-h-screen bg-[#f4f4ed] text-[#111112] py-24 px-4 sm:px-8 overflow-hidden select-none border-t border-[#111112]/10 flex flex-col justify-between">
      <ContourBackground dark={false} opacity={0.35} />
      <div className="max-w-7xl mx-auto w-full text-center relative z-20 mb-8">
        <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#535450] font-bold block mb-3">
          {t('ACT IV · THE NEW REPUBLIC', 'الفصل الرابع · الجمهورية الجديدة')}
        </motion.span>
        <Split key={lang} text={t("WHAT'S BEYOND", 'ماذا يوجد خلف')} className="text-4xl sm:text-6xl md:text-7xl font-syne font-black uppercase tracking-tight leading-[1.05]" />
        <Split key={lang + 'b'} delay={0.25} text={t('THE HORIZON', 'الأفق؟')} className="text-4xl sm:text-6xl md:text-7xl font-serif italic leading-[1.05] mt-1 bg-[#d2ff00] inline-block px-3" />
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
          className="mt-5 text-xs sm:text-sm text-[#535450] max-w-md mx-auto leading-relaxed">
          {t('Egypt’s modern initiatives — the projects carrying seven millennia of continuity into the next century. Hover to fan out, click to watch the episode.',
             'مبادرات مصر الحديثة — مشروعات تحمل سبعة آلاف عام من الاستمرارية إلى القرن القادم. مرّر للاستعراض، وانقر لمشاهدة الحلقة.')}
        </motion.p>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto h-[440px] sm:h-[520px] md:h-[580px] flex items-center justify-center my-auto" dir="ltr">
        {INITIATIVES.map((c, i) => {
          const d = i - mid, on = hovered === c.id, center = d === 0, L = c[lang];
          const r = d * 9 * rtl, x = d * 120 * rtl, y = Math.abs(d) * Math.abs(d) * 14;
          return (
            <motion.div key={c.id} role="button" tabIndex={0} data-cursor="WATCH"
              onMouseEnter={() => { soundManager.playHoverTick(); setHovered(c.id); }} onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(c.id)} onBlur={() => setHovered(null)}
              onClick={() => { soundManager.playAchievementOpen(); onSelectAchievement(c.achievementId); }}
              onKeyDown={(e) => e.key === 'Enter' && onSelectAchievement(c.achievementId)}
              initial={{ opacity: 0, y: 160, rotateZ: r * 2, x: 0 }}
              whileInView={{ opacity: 1, rotateZ: on ? 0 : r, y: on ? -35 : y, x: on ? x * 0.75 : x, scale: on ? 1.16 : center ? 1.05 : 0.95 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ type: 'spring', stiffness: 170, damping: 22, delay: on ? 0 : Math.abs(d) * 0.08 }}
              style={{ zIndex: on ? 40 : 20 - Math.abs(Math.round(d)) }}
              className={`absolute w-[180px] sm:w-[230px] md:w-[270px] h-[290px] sm:h-[370px] md:h-[440px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-2 cursor-pointer group bg-[#111112] transition-[border-color,box-shadow] duration-300 ${on ? 'border-[#d2ff00] shadow-[0_30px_60px_rgba(210,255,0,0.35)]' : 'border-white/60 shadow-[0_20px_45px_rgba(0,0,0,0.18)]'}`}>
              <img loading="lazy" decoding="async" src={c.image} alt={L.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]" />
              <motion.img loading="lazy" decoding="async" src={ACHIEVEMENTS_DATA.find((x) => x.id === c.achievementId)?.secondaryImage} alt="" aria-hidden
                animate={{ clipPath: on ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[9px] font-mono uppercase font-bold tracking-wider">{L.tag}</span>
                <span className="glyph w-6 h-6 rounded-full bg-[#d2ff00] text-[#111112] flex items-center justify-center text-[10px]">𓈎</span>
              </div>
              <div className="absolute bottom-4 inset-x-4 text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <span className="text-[10px] font-mono tracking-widest text-[#d2ff00] font-bold block mb-1">{L.year}</span>
                <h3 className="font-syne font-black text-sm sm:text-base leading-tight">{L.title}</h3>
                <motion.p animate={{ height: on ? 'auto' : 0, opacity: on ? 1 : 0 }} className="overflow-hidden text-[11px] leading-snug text-white/80 mt-1">{L.blurb}</motion.p>
                <div className="mt-2.5 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider font-bold text-white/80 group-hover:text-[#d2ff00] transition-colors">
                  <span>{t('WATCH EPISODE', 'شاهد الحلقة')}</span><ArrowUpRight className="w-3 h-3 rtl-flip" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="relative z-20 text-center py-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[#535450]">
        {t('EACH INITIATIVE OPENS ITS OWN ANIMATED STORY', 'كل مبادرة تفتح قصتها المتحركة الخاصة')}
      </div>
    </section>
  );
};
