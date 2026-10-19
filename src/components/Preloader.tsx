import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { stopScroll, startScroll } from '../utils/smoothScroll';
import { useLang } from '../i18n';
import { EASE, reduced } from '../motion/tokens';

/** Counter + split-curtain intro, in the spirit of landonorris.com's loader. */
export const Preloader: React.FC = () => {
  const { t } = useLang();
  const [n, setN] = useState(0), [leaving, setLeaving] = useState(false), [gone, setGone] = useState(false);
  useEffect(() => {
    stopScroll('preload');
    const t0 = performance.now(), D = reduced() ? 250 : 1500; let raf = 0, timer = 0;
    const loop = (now: number) => {
      const p = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(e * 100));
      if (p < 1 || document.readyState !== 'complete') { raf = requestAnimationFrame(loop); return; }
      setLeaving(true);
      timer = window.setTimeout(() => { setGone(true); startScroll('preload'); }, 1200);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); startScroll('preload'); };
  }, []);
  if (gone) return null;
  const ease = EASE.inOutQuart;
  return (
    <div className="fixed inset-0 z-[400] pointer-events-auto text-[#d2ff00]" data-preloader dir="ltr" aria-hidden>
      <motion.div className="absolute inset-x-0 top-0 h-1/2 bg-[#111112]" animate={{ y: leaving ? '-100%' : 0 }} transition={{ duration: 1, ease }} />
      <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#111112]" animate={{ y: leaving ? '100%' : 0 }} transition={{ duration: 1, ease }} />
      <motion.div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10" animate={{ opacity: leaving ? 0 : 1 }} transition={{ duration: 0.35 }}>
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.3em] font-bold">
          <span>{t('LOAD EGYPT', 'تحميل مصر')}</span><span className="glyph text-2xl">𓈎𓅓𓏏𓊖</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="font-syne font-black leading-none tabular-nums text-[28vw] sm:text-[18vw]">{String(n).padStart(2, '0')}</span>
          <span className="font-mono text-[11px] tracking-[0.3em] pb-4 text-white/60">{t('SEVEN MILLENNIA · ONE LINE', 'سبعة آلاف عام · خط واحد')}</span>
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-white/10"><div className="h-full bg-[#d2ff00]" style={{ width: `${n}%` }} /></div>
      </motion.div>
    </div>
  );
};
