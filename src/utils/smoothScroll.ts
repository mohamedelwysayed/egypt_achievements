import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;
  if (prefersReducedMotion()) return null;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Sync with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  const raf = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToY(targetY: number, duration: number = 1.2): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(targetY, { duration });
  } else if (typeof window !== 'undefined') {
    window.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  }
}

/**
 * Scroll locking with independent owners (achievement page, nav drawer, ...).
 * The page only resumes scrolling once *every* owner has released its lock.
 */
const scrollLocks = new Set<string>();

function applyScrollLock(): void {
  const locked = scrollLocks.size > 0;
  if (lenisInstance) {
    if (locked) lenisInstance.stop();
    else lenisInstance.start();
  }
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('scroll-locked', locked);
  }
}

export function stopScroll(owner: string = 'default'): void {
  scrollLocks.add(owner);
  applyScrollLock();
}

export function startScroll(owner: string = 'default'): void {
  scrollLocks.delete(owner);
  applyScrollLock();
}

/**
 * Calculates the natural, untransformed absolute top offset of an element
 * from the top of the document by summing offsetParent positions.
 */
export function naturalTop(el: HTMLElement | null): number {
  if (!el) return Infinity;
  let top = 0;
  let curr: HTMLElement | null = el;
  while (curr && curr !== document.body) {
    top += curr.offsetTop;
    curr = curr.offsetParent as HTMLElement | null;
  }
  return top;
}
