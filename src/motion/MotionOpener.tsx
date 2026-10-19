import React, { useEffect, useRef } from 'react';
import { useMotionValueEvent, MotionValue } from 'motion/react';
import { MotionStage } from './engine/stage';
import { buildEpisodeSpec, EP_DUR, type EpisodeIn } from './engine/episodeSpec';
import { reduced } from './tokens';

/** Scroll-scrubbed procedural title sequence. On open it plays the first ~2 s by itself, then scroll takes over. */
const MotionOpener: React.FC<{ p: MotionValue<number>; input: Omit<EpisodeIn, 'W' | 'H' | 'lang'>; lang: 'en' | 'ar' }> = ({ p, input, lang }) => {
  const host = useRef<HTMLDivElement>(null), st = useRef<MotionStage | null>(null), s = useRef({ intro: 0, t0: performance.now(), raf: 0, visible: true, dirty: true });
  const key = JSON.stringify(input) + lang;

  useEffect(() => {
    const el = host.current; if (!el) return; let dead = false;
    const land = el.clientWidth / el.clientHeight >= 1, W = land ? 1920 : 1080, H = land ? 1080 : 1920;
    const stage = new MotionStage(el, buildEpisodeSpec({ ...input, W, H, lang }), { dprCap: 1.25 }); st.current = stage;
    stage.onBg = (c) => { el.style.background = c; };
    const fit = () => stage.resize(el.clientWidth, el.clientHeight, 'contain'); fit(); window.addEventListener('resize', fit);
    const pm = (e: PointerEvent) => { const r = el.getBoundingClientRect(); stage.setPointer(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2); s.current.dirty = true; };
    el.addEventListener('pointermove', pm);
    const io = new IntersectionObserver(([e]) => { s.current.visible = e.isIntersecting; s.current.dirty = true; }, { threshold: 0 }); io.observe(el);
    s.current.t0 = performance.now(); let last = performance.now();
    const loop = (now: number) => {
      const c = s.current, dt = Math.min(0.05, (now - last) / 1000); last = now;
      const introT = reduced() ? 0 : Math.min(1.9, (now - c.t0) / 1000 - 0.35);
      const needs = c.visible && (c.dirty || introT < 1.9 || Math.abs(stage.ptr.x - stage.sm.x) > 0.002 || Math.abs(stage.ptr.y - stage.sm.y) > 0.002);
      if (needs) { stage.render(Math.max(p.get() * EP_DUR, Math.max(0, introT)), dt); c.dirty = false; }
      c.raf = requestAnimationFrame(loop);
    };
    stage.init().then(() => { if (dead) return; s.current.raf = requestAnimationFrame(loop); });
    return () => { dead = true; cancelAnimationFrame(s.current.raf); window.removeEventListener('resize', fit); el.removeEventListener('pointermove', pm); io.disconnect(); stage.dispose(); st.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useMotionValueEvent(p, 'change', () => { s.current.dirty = true; });
  return <div ref={host} className="absolute inset-0 overflow-hidden" dir="ltr" />;
};
export default MotionOpener;
