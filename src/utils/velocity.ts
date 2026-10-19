import { getLenis } from './smoothScroll';

let vel = 0;
/** Smoothed signed scroll velocity, roughly -1..1 (positive = scrolling down). */
export const getVel = () => vel;

export function startVelocity(): () => void {
  const root = document.documentElement;
  let raf = 0, last = window.scrollY, lastT = performance.now();
  const loop = (now: number) => {
    const dt = Math.max(1, now - lastT), y = getLenis()?.scroll ?? window.scrollY;
    const raw = ((y - last) / dt) * 16; // px per frame
    last = y; lastT = now;
    vel += (Math.max(-1, Math.min(1, raw / 60)) - vel) * 0.12;
    if (Math.abs(vel) < 0.002) vel = 0;
    root.style.setProperty('--vel', vel.toFixed(3));
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(raf);
}
