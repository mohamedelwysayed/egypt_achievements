import React, { useEffect, useRef } from 'react';
import { useLang } from '../i18n';

const CLICKABLE = 'button, a, input, textarea, select, summary, [role="button"], .clickable, [data-interactive="true"]';

/**
 * Precision difference-blend cursor, with a lime labelled bubble over anything marked data-cursor="…"
 * (landonorris.com style). Position is lerped in rAF; state lives in data attributes so nothing re-renders.
 */
export const MicroCursor: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null), label = useRef<HTMLSpanElement>(null);
  const { tr } = useLang(), trRef = useRef(tr); trRef.current = tr;

  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) { el.style.display = 'none'; return; }
    const pos = { x: -100, y: -100, tx: -100, ty: -100 };
    let raf = 0, running = false;
    const tick = () => {
      pos.x += (pos.tx - pos.x) * 0.28; pos.y += (pos.ty - pos.y) * 0.28;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(pos.tx - pos.x) > 0.1 || Math.abs(pos.ty - pos.y) > 0.1) raf = requestAnimationFrame(tick); else running = false;
    };
    const evalTarget = (target: Element | null) => {
      const lab = target?.closest?.('[data-cursor]')?.getAttribute('data-cursor') ?? '';
      if (lab && label.current && label.current.dataset.k !== lab) { label.current.dataset.k = lab; label.current.textContent = trRef.current(lab); }
      const hasLab = lab ? '1' : '0'; if (el.dataset.label !== hasLab) el.dataset.label = hasLab;
      const hover = target?.closest?.(CLICKABLE) ? '1' : '0'; if (el.dataset.hover !== hover) el.dataset.hover = hover;
    };
    const refresh = () => { if (el.dataset.visible === '1') evalTarget(document.elementFromPoint(pos.tx, pos.ty)); };
    let sraf = 0; const onScroll = () => { if (!sraf) sraf = requestAnimationFrame(() => { sraf = 0; refresh(); }); };
    const onClick = () => { window.setTimeout(refresh, 80); window.setTimeout(refresh, 1100); };
    const onMove = (e: MouseEvent) => {
      if (el.dataset.visible !== '1') { pos.x = e.clientX; pos.y = e.clientY; el.dataset.visible = '1'; }
      pos.tx = e.clientX; pos.ty = e.clientY;
      evalTarget(e.target as Element | null);
      if (!running) { running = true; raf = requestAnimationFrame(tick); }
    };
    const onDown = () => (el.dataset.down = '1'), onUp = () => (el.dataset.down = '0'), onLeave = () => (el.dataset.visible = '0');
    window.addEventListener('mousemove', onMove, { passive: true }); window.addEventListener('scroll', onScroll, { passive: true, capture: true }); window.addEventListener('click', onClick); window.addEventListener('mousedown', onDown); window.addEventListener('mouseup', onUp); document.addEventListener('mouseleave', onLeave);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); window.removeEventListener('scroll', onScroll, true); window.removeEventListener('click', onClick); window.removeEventListener('mousedown', onDown); window.removeEventListener('mouseup', onUp); document.removeEventListener('mouseleave', onLeave); };
  }, []);

  return <div ref={ref} className="micro-cursor" aria-hidden="true" data-visible="0" data-hover="0" data-down="0" data-label="0"><span ref={label} className="micro-cursor-label" /></div>;
};
