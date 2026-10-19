import React, { useEffect, useRef } from 'react';
import { getVel } from '../utils/velocity';

/** Ticker whose speed and direction follow the page's scroll velocity. */
export const VelocityMarquee: React.FC<{ items: string[]; speed?: number; className?: string }> = ({ items, speed = 60, className = '' }) => {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = track.current; if (!el) return;
    let x = 0, dir = -1, raf = 0, last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(64, now - last) / 1000; last = now;
      const v = getVel(); if (Math.abs(v) > 0.04) dir = v > 0 ? -1 : 1;
      x += (dir * speed + v * -900) * dt;
      const half = el.scrollWidth / 2; if (half > 0) { if (x <= -half) x += half; if (x >= 0) x -= half; }
      el.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [speed]);
  const row = items.map((s, i) => <span key={i} className="shrink-0">{s}<span className="mx-6 opacity-50">·</span></span>);
  return <div className={`overflow-hidden whitespace-nowrap ${className}`} dir="ltr"><div ref={track} className="inline-flex will-change-transform">{row}{row}{row}{row}</div></div>;
};
