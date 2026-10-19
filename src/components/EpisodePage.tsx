import React, { useEffect, useMemo, useRef, RefObject } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, animate, MotionValue } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { ACHIEVEMENTS_DATA, type AchievementStory } from '../data/achievementsData';
import { ACH_AR } from '../data/achievementsAr';
import { BEATS } from '../data/beats';
import { soundManager } from '../utils/soundEffects';
import { ContourBackground } from './ContourBackground';
import { Split, ClipImg } from './Split';
import { SCENES } from './scenes';
import { k, ek } from './scenes/shared';
import { EASE, DUR, reduced } from '../motion/tokens';
import { useLang, LangToggle } from '../i18n';
import MotionOpener from '../motion/MotionOpener';

const PANS: [number, number][] = [[-8, 8], [8, -8], [-6, 0], [0, 6]];
const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7) >>> 0;

type View = { title: string; subtitle: string; era: string; year: string; leader: string; overview: string; quote: { text: string; source: string };
  stats: { value: string; unit: string; label: string; description: string }[]; sections: { heading: string; body: string; tag: string }[]; sig: string; beats: string[] };

/** Merge the Arabic edition over the English story when the interface is Arabic. */
function useView(a: AchievementStory | undefined, lang: 'en' | 'ar'): View | null {
  return useMemo(() => {
    if (!a) return null;
    const beats = BEATS[a.id]?.[lang] ?? BEATS[a.id]?.en ?? [];
    const ar = ACH_AR[a.id];
    if (lang !== 'ar' || !ar) return { title: a.title, subtitle: a.subtitle, era: a.era, year: a.year, leader: a.dynastyOrLeader, overview: a.overview, quote: a.editorialQuote,
      stats: a.stats.map((s) => ({ value: s.value, unit: s.unit ?? '', label: s.label, description: s.description })), sections: a.sections.map((s) => ({ heading: s.heading, body: s.body, tag: s.tag ?? '' })), sig: a.modernSignificance, beats };
    return { title: ar.title, subtitle: ar.subtitle, era: ar.era, year: ar.year, leader: ar.leader, overview: ar.overview, quote: { text: ar.quote[0], source: ar.quote[1] },
      stats: a.stats.map((s, i) => { const t = ar.stats[i]; return { value: t?.[3] ?? s.value, unit: t?.[2] ?? '', label: t?.[0] ?? s.label, description: t?.[1] ?? s.description }; }),
      sections: a.sections.map((s, i) => ({ heading: ar.sections[i]?.[0] ?? s.heading, body: ar.sections[i]?.[1] ?? s.body, tag: ar.sections[i]?.[2] ?? s.tag ?? '' })), sig: ar.sig, beats };
  }, [a, lang]);
}

/** Sticky pin whose scroll progress is written to a CSS variable (--p) — scenes animate in pure CSS, no re-renders.
 *  On fine pointers, layers marked data-depth drift with the cursor (depth parallax). */
const Pinned: React.FC<{ cont: RefObject<HTMLDivElement | null>; h: string; children: (p: MotionValue<number>) => React.ReactNode }> = ({ cont, h, children }) => {
  const ref = useRef<HTMLDivElement>(null), stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, container: cont, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => stage.current?.style.setProperty('--p', v.toFixed(4)));
  useEffect(() => { stage.current?.style.setProperty('--p', String(scrollYProgress.get().toFixed(4))); }, [scrollYProgress]);
  useEffect(() => {
    const el = stage.current; if (!el || reduced() || window.matchMedia('(pointer: coarse)').matches) return;
    const layers = [...el.querySelectorAll<HTMLElement>('[data-depth]')]; if (!layers.length) return;
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0;
    const loop = () => {
      x += (tx - x) * 0.07; y += (ty - y) * 0.07;
      layers.forEach((l) => { const d = +(l.dataset.depth ?? 0); l.style.transform = `translate3d(${(-x * d).toFixed(2)}px, ${(-y * d * 0.6).toFixed(2)}px, 0)`; });
      raf = Math.abs(tx - x) > 0.002 || Math.abs(ty - y) > 0.002 ? requestAnimationFrame(loop) : 0;
    };
    const mv = (e: PointerEvent) => { const r = el.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ty = ((e.clientY - r.top) / r.height - 0.5) * 2; if (!raf) raf = requestAnimationFrame(loop); };
    el.addEventListener('pointermove', mv);
    return () => { el.removeEventListener('pointermove', mv); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} style={{ height: h }} className="relative"><div ref={stage} style={{ ['--p' as string]: 0 }} className="sticky top-0 h-screen overflow-hidden bg-black text-white">{children(scrollYProgress)}</div></div>;
};

const Depth: React.FC<{ d: number; children: React.ReactNode; className?: string }> = ({ d, children, className = '' }) => <div data-depth={d} className={`absolute inset-0 ${className}`}>{children}</div>;

const Count: React.FC<{ value: string }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null), seen = useInView(ref, { once: true });
  const num = /^[\d,.]+\+?$/.test(value) ? parseFloat(value.replace(/,/g, '')) : NaN;
  useEffect(() => {
    if (!seen || isNaN(num) || !ref.current) return;
    const dec = (value.split('.')[1] || '').replace(/\D.*/, '').length, plus = value.endsWith('+') ? '+' : '';
    const a = animate(0, num, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => { if (ref.current) ref.current.textContent = v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + plus; } });
    return () => a.stop();
  }, [seen, num, value]);
  return <span ref={ref}>{isNaN(num) ? value : '0'}</span>;
};

const Beat: React.FC<{ p: MotionValue<number>; i: number; n: number; text: string; c: string; rtl: boolean }> = ({ p, i, n, text, c, rtl }) => {
  const a = i / n, b = (i + 1) / n, w = 0.04;
  const o = useTransform(p, [a, a + w, b - w, b], [0, 1, 1, i === n - 1 ? 1 : 0]);
  return (
    <motion.p style={{ opacity: o }} className="absolute bottom-0 start-0 max-w-3xl rounded-2xl bg-black/60 backdrop-blur-md px-5 py-4 text-xl sm:text-3xl font-syne font-extrabold leading-snug">
      <span className="text-[11px] font-mono tracking-[0.3em] block mb-2" style={{ color: c }}>{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
      <span aria-hidden className="block h-[2px] w-24 mb-3" style={{ background: c, transform: `scaleX(${k(a, b)})`, transformOrigin: rtl ? '100% 50%' : '0% 50%' }} />
      {text.split(' ').map((wd, j) => { const s0 = a + 0.003 + j * 0.0045, e = ek(s0, s0 + 0.04);
        return <span key={j} className="inline-block me-[0.28em]" style={{ opacity: e as unknown as number, transform: `translateY(calc((1 - ${e}) * 0.6em))` }}>{wd}</span>; })}
    </motion.p>
  );
};

export const EpisodePage: React.FC<{ achievementId: string | null; onClose: () => void; onSelectAchievement: (id: string) => void }> = ({ achievementId, onClose, onSelectAchievement }) => {
  const { lang, t } = useLang();
  const box = useRef<HTMLDivElement>(null);
  const idx = ACHIEVEMENTS_DATA.findIndex((x) => x.id === achievementId), a = ACHIEVEMENTS_DATA[idx];
  const next = ACHIEVEMENTS_DATA[(idx + 1) % ACHIEVEMENTS_DATA.length];
  const v = useView(a, lang), nv = useView(next, lang);

  useEffect(() => { box.current?.focus({ preventScroll: true }); const kd = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', kd); return () => window.removeEventListener('keydown', kd); }, [onClose]);
  useEffect(() => { box.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [achievementId]);
  if (!a || !v || !nv) return null;

  const seed = hash(a.id), Scene = SCENES[a.id], ep = String(idx + 1).padStart(2, '0'), N = ACHIEVEMENTS_DATA.length;

  return (
    <motion.div ref={box} role="dialog" aria-modal="true" aria-label={v.title} tabIndex={-1} data-lenis-prevent data-lenis-prevent-wheel data-lenis-prevent-touch data-episode={a.id}
      initial={{ clipPath: 'circle(0% at 50% 100%)' }} animate={{ clipPath: 'circle(150% at 50% 100%)' }} exit={{ clipPath: 'circle(0% at 50% 100%)', transition: { duration: 0.5, ease: EASE.inOutQuart } }}
      transition={{ duration: 0.9, ease: EASE.inOutQuart }}
      className="fixed inset-0 z-[200] bg-[#0e0e11] text-white overflow-y-auto overscroll-contain outline-none">
      <header className="fixed top-0 inset-x-0 z-50 px-5 sm:px-10 py-4 flex items-center justify-between mix-blend-difference text-white">
        <button onClick={() => { soundManager.playChime(320, 0.2); onClose(); }} className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"><ArrowLeft className="w-4 h-4 rtl-flip" />{t('Return to Archive', 'العودة إلى الأرشيف')}</button>
        <span className="hidden md:block text-[10px] font-mono tracking-[0.2em]">{t('EPISODE', 'الحلقة')} {ep} / {N}</span>
        <div className="flex items-center gap-2"><LangToggle /><button onClick={onClose} aria-label="Close" className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center cursor-pointer"><X className="w-4 h-4" /></button></div>
      </header>

      {/* OPENER — procedural motion-graphics title sequence (3D halftone orb, kinetic type, parallax), scrubbed by scroll */}
      <Pinned cont={box} h="340vh">{(p) => (
        <MotionOpener p={p} lang={lang} input={{
          title: v.title, ep, total: N, year: v.year, era: v.era, leader: v.leader, subtitle: v.subtitle, hero: a.heroImage, second: a.secondaryImage, composition: a.composition,
          stat: v.stats[0] ? { value: v.stats[0].value, unit: v.stats[0].unit, label: v.stats[0].label } : undefined, epWord: t('EPISODE', 'الحلقة'), scrollWord: t('SCROLL TO PLAY', 'مرّر للتشغيل'),
        }} />
      )}</Pinned>

      {/* THE ANIMATED SCENE — hand-built per story, narrated by four beats */}
      <Pinned cont={box} h="520vh">{(p) => {
        const s = useTransform(p, [0, 1], [1.08, 1.22]), n = v.beats.length;
        return (<>
          <Depth d={6}><motion.img src={a.secondaryImage} alt="" style={{ scale: s }} className="absolute inset-0 w-full h-full object-cover opacity-50" /></Depth>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/85" />
          <Depth d={14}>{Scene && <Scene c={a.accentColor} />}</Depth>
          <div className="absolute inset-x-6 sm:inset-x-16 bottom-[9vh] h-[24vh]">{v.beats.map((b, i) => <Beat key={i} p={p} i={i} n={n} text={b} c={a.accentColor} rtl={lang === 'ar'} />)}</div>
          <div className="absolute top-20 end-6 sm:end-10 flex flex-col gap-1.5">{v.beats.map((_, i) => <ProgressDot key={i} p={p} i={i} n={n} c={a.accentColor} />)}</div>
        </>);
      }}</Pinned>

      {/* CHAPTERS */}
      {v.sections.map((sec, i) => (
        <Pinned key={sec.heading} cont={box} h="210vh">{(p) => {
          const [f0, f1] = PANS[(seed + i) % 4], x = useTransform(p, [0, 1], [`${f0}%`, `${f1}%`]), s = useTransform(p, [0, 1], [1.2, 1.55]);
          const o = useTransform(p, [0.12, 0.3, 0.85, 1], [0, 1, 1, 0]), ty = useTransform(p, [0.12, 0.3], [60, 0]), num = useTransform(p, [0, 1], ['20%', '-30%']);
          return (<>
            <motion.img src={i % 2 ? a.secondaryImage : a.heroImage} alt="" style={{ x, scale: s }} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(${(i % 2 === 1) === (lang === 'ar') ? 'to right' : 'to left'},rgba(0,0,0,.88),rgba(0,0,0,.15) 70%)` }} />
            <motion.span style={{ y: num, WebkitTextStroke: `1px ${a.accentColor}55` }} className="absolute top-[12vh] end-8 text-[28vw] font-syne font-black leading-none text-transparent pointer-events-none" aria-hidden>{String(i + 1).padStart(2, '0')}</motion.span>
            <motion.div style={{ opacity: o, y: ty }} className={`absolute bottom-[14vh] max-w-2xl px-6 sm:px-16 ${i % 2 ? 'end-0' : 'start-0'}`}>
              {sec.tag && <span className="text-sm font-mono font-bold tracking-[0.3em]" style={{ color: a.accentColor }}>{sec.tag}</span>}
              <h2 className="mt-2 text-3xl sm:text-5xl font-syne font-black leading-[1.1]">{sec.heading}</h2>
              <motion.div style={{ scaleX: p, background: a.accentColor, transformOrigin: lang === 'ar' ? '100% 50%' : '0% 50%' }} className="h-[2px] w-24 my-5" />
              <p className="text-lg sm:text-2xl leading-relaxed text-white/90">{sec.body}</p>
            </motion.div>
          </>);
        }}</Pinned>
      ))}

      {/* BY THE NUMBERS */}
      <section className="relative bg-[#f4f4ed] text-[#111112] px-6 sm:px-16 py-28 overflow-hidden">
        <ContourBackground dark={false} opacity={0.3} />
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div><Split key={lang} text={t('By the numbers', 'بالأرقام')} className="text-4xl sm:text-6xl font-syne font-black uppercase leading-[1.1]" /><p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#3d3e3a]">{v.overview}</p></div>
          <ClipImg src={a.secondaryImage} alt="" className="aspect-[4/3] rounded-[2rem]" />
        </div>
        <div className="relative max-w-6xl mx-auto mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {v.stats.map((st, i) => (
            <motion.div key={st.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }} className="border-t-2 border-[#111112] pt-4">
              <div className="flex flex-wrap items-baseline gap-x-1 text-4xl sm:text-5xl font-syne font-black"><span><Count value={st.value} /></span>{st.unit && <span className="text-xl ms-1 text-[#535450]">{st.unit}</span>}</div>
              <div className="mt-2 text-sm sm:text-base font-mono uppercase tracking-wider font-bold">{st.label}</div>
              <p className="mt-2 text-base text-[#3d3e3a] leading-snug">{st.description}</p>
            </motion.div>))}
        </div>
      </section>

      {/* AT A GLANCE — facts, key takeaways and why it matters, all drawn from the story data */}
      <section className="relative bg-[#16161a] text-white px-6 sm:px-16 py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <span className="text-sm font-mono font-bold tracking-[0.3em]" style={{ color: a.accentColor }}>{t('AT A GLANCE', 'نظرة سريعة')}</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-syne font-black leading-[1.1]">{v.title}</h2>
            <p className="mt-4 text-lg sm:text-xl text-white/75 leading-relaxed">{v.subtitle}</p>
            <dl className="mt-8 divide-y divide-white/15 border-y border-white/15 text-base sm:text-lg">
              {[[t('Era', 'العصر'), v.era], [t('Date', 'التاريخ'), v.year], [t('Led by', 'بقيادة'), v.leader], ...(a.coordinates ? [[t('Location', 'الموقع'), a.coordinates]] : []), [t('Episode', 'الحلقة'), `${ep} / ${N}`]].map(([k2, val]) => (
                <div key={k2} className="flex justify-between gap-6 py-3"><dt className="text-white/55">{k2}</dt><dd className="font-bold text-end">{val}</dd></div>))}
            </dl>
          </div>
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h3 className="text-2xl sm:text-3xl font-syne font-black">{t('Key takeaways', 'أهم النقاط')}</h3>
              <ul className="mt-5 space-y-4 text-lg sm:text-xl leading-relaxed text-white/85">
                {v.stats.map((st) => (<li key={st.label} className="flex gap-3"><span aria-hidden className="mt-3 h-2 w-2 shrink-0 rounded-full" style={{ background: a.accentColor }} /><span><b>{st.label}: {st.value}{st.unit ? ` ${st.unit}` : ''}.</b> {st.description}</span></li>))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-syne font-black">{t('The story in brief', 'القصة باختصار')}</h3>
              <div className="mt-5 space-y-4 text-lg sm:text-xl leading-relaxed text-white/80">
                <p>{v.overview}</p>
                {v.sections.map((sec) => (<p key={sec.heading}><b style={{ color: a.accentColor }}>{sec.heading}.</b> {sec.body}</p>))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-syne font-black">{t('Why it matters today', 'لماذا يهمنا اليوم')}</h3>
              <p className="mt-5 text-lg sm:text-xl leading-relaxed text-white/80">{v.sig}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINALE + NEXT EPISODE */}
      <section className="relative bg-[#0e0e11] px-6 sm:px-16 py-32 text-center overflow-hidden">
        <Split key={lang + 'q'} as="p" text={`“${v.quote.text}”`} className="max-w-4xl mx-auto text-2xl sm:text-4xl font-serif italic leading-snug" stagger={0.035} />
        <p className="mt-6 text-sm sm:text-base font-mono tracking-[0.25em]" style={{ color: a.accentColor }}>— {v.quote.source}</p>
        <p className="mt-14 max-w-3xl mx-auto text-lg sm:text-xl text-white/80 leading-relaxed">{v.sig}</p>
        <button onClick={() => { soundManager.playChime(580, 0.25); onSelectAchievement(next.id); }} className="group mt-16 inline-flex items-center gap-4 text-start cursor-pointer">
          <span><span className="block text-xs font-mono tracking-[0.3em] text-white/60">{t('NEXT EPISODE', 'الحلقة التالية')}</span><span className="block text-xl sm:text-3xl font-syne font-black group-hover:text-[#d2ff00] transition-colors">{nv.title}</span></span>
          <span className="w-12 h-12 rounded-full bg-[#d2ff00] text-black flex items-center justify-center group-hover:translate-x-1 transition-transform"><ArrowRight className="w-5 h-5 rtl-flip" /></span>
        </button>
      </section>
    </motion.div>
  );
};

const ProgressDot: React.FC<{ p: MotionValue<number>; i: number; n: number; c: string }> = ({ p, i, n, c }) => {
  const o = useTransform(p, [i / n, i / n + 0.02], [0.3, 1]);
  return <motion.span style={{ opacity: o, background: c }} className="block w-1.5 h-6 rounded-full" />;
};
