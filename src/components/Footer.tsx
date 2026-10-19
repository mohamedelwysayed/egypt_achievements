import React, { useRef } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { Magnetic } from './Magnetic';
import { VelocityMarquee } from './VelocityMarquee';
import { useLang } from '../i18n';

interface FooterProps { onScrollToTop: () => void }

/** Giant wordmark: letters rise and glow as the cursor passes (landonorris.com closing line). */
const Wordmark: React.FC<{ word: string }> = ({ word }) => {
  const box = useRef<HTMLDivElement>(null), { lang } = useLang();
  const letters = lang === 'ar' ? [word] : [...word];
  const move = (e: React.MouseEvent) => {
    box.current?.querySelectorAll<HTMLElement>('[data-l]').forEach((l) => {
      const r = l.getBoundingClientRect(), d = Math.abs(e.clientX - (r.left + r.width / 2)), k = Math.max(0, 1 - d / 260);
      l.style.transform = `translateY(${(-k * 7).toFixed(2)}vw) scale(${(1 + k * 0.12).toFixed(3)})`; l.style.color = k > 0.55 ? '#d2ff00' : '';
    });
  };
  const reset = () => box.current?.querySelectorAll<HTMLElement>('[data-l]').forEach((l) => { l.style.transform = ''; l.style.color = ''; });
  return (
    <div ref={box} onMouseMove={move} onMouseLeave={reset} className="flex justify-center select-none leading-[0.82] font-syne font-black text-[#f4f4ed] text-[34vw] sm:text-[26vw] pt-6" dir="ltr" aria-label={word}>
      {letters.map((l, i) => <span key={i} data-l className="inline-block transition-[transform,color] duration-300 ease-out will-change-transform">{l}</span>)}
    </div>
  );
};

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  const { t, tr, lang } = useLang();
  const items = ['KEMET · 3100 BCE', 'MEMPHIS · WHITE WALLS', 'THEBES · KARNAK', 'ALEXANDRIA · SEAT OF SCHOLARS', 'HISTORIC CAIRO · AL-AZHAR', 'NEW ADMINISTRATIVE CAPITAL · 2026 CE'].map(tr);
  return (
    <footer className="relative w-full bg-[#111112] border-t border-white/10 text-[#b9bbad] overflow-hidden select-none">
      <div className="w-full bg-[#17181c] border-b border-white/5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#d2ff00]"><VelocityMarquee items={items} speed={55} /></div>
      <div className="relative z-10 max-w-7xl mx-auto pt-16 px-6 md:px-12">
        <p className="text-center font-serif italic text-2xl sm:text-4xl text-[#f4f4ed] leading-snug">{t('Always ', 'دائمًا ')}<span className="not-italic font-syne font-black bg-[#d2ff00] text-[#111112] px-2">{t('continuing.', 'مستمرة.')}</span></p>
      </div>
      <Wordmark word={tr('EGYPT')} />
      <div className="relative z-10 max-w-7xl mx-auto py-10 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-start">
          <div className="text-xl font-syne font-black text-[#f4f4ed] tracking-wider flex items-center gap-2"><span>{tr('EGYPT')}</span><span className="text-xs text-[#d2ff00] font-mono tracking-widest font-normal animate-pulse">· {t('7,000 YRS', '7000 عام')}</span></div>
          <p className="text-xs text-[#535450] mt-1 max-w-sm">{t('An interactive editorial experience honoring the continuous statehood and monumental achievements of Egypt.', 'تجربة تحريرية تفاعلية تحتفي باستمرارية الدولة المصرية وإنجازاتها العظيمة.')}</p>
        </div>
        <div className="text-center font-mono text-[11px] text-[#535450]">
          <div className="flex items-center justify-center gap-1.5 text-[#d2ff00] mb-1"><Sparkles className="w-3.5 h-3.5" /><span className="font-bold tracking-wider">{t('SOVEREIGNTY UNBROKEN', 'سيادة لا تنقطع')}</span></div>
          <div className="text-[#b9bbad]">{t('Predynastic (3200 BCE) unto the 21st-Century Horizon', 'من عصر ما قبل الأسرات (3200 ق.م) إلى أفق القرن الحادي والعشرين')}</div>
        </div>
        <Magnetic strength={0.3}>
          <button onClick={() => { soundManager.playChime(660, 0.2); onScrollToTop(); }} className="btn-ln btn-ln-outline text-xs text-[#f4f4ed] hover:text-[#d2ff00] hover:border-[#d2ff00] shadow-sm cursor-pointer group">
            <span>{t('Return to Top', 'العودة للأعلى')}</span><ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </Magnetic>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto pb-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#535450] gap-4 px-6 md:px-12">
        <span>© {new Date().getFullYear()} {t('EGYPT: The Eternal Horizon.', 'مصر: الأفق الخالد.')}</span>
        <span>{t('Dedicated to the unbroken spirit of the Nile.', 'إهداء إلى روح النيل التي لا تنكسر.')}</span>
      </div>
      <span className="sr-only">{lang}</span>
    </footer>
  );
};
