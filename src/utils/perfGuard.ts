/**
 * Performance monitor and adaptive quality guard.
 * Detects low FPS or constrained hardware and sets data-perf="lite" on <html>,
 * which gracefully reduces heavy GPU filter/transform loops while keeping
 * smooth scrolling and primary interactions fluid.
 */

let isGuardRunning = false;

export function startPerfGuard(): void {
  if (typeof window === 'undefined' || isGuardRunning) return;
  isGuardRunning = true;

  const html = document.documentElement;

  // 1. Initial visibility tracking to pause background animations when tab is backgrounded
  const updateVisibility = () => {
    html.dataset.live = document.visibilityState === 'visible' ? '1' : '0';
  };
  updateVisibility();
  document.addEventListener('visibilitychange', updateVisibility);

  // 2. Initial hardware capability heuristics
  const cores = navigator.hardwareConcurrency || 4;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (cores <= 4 && isMobile) {
    html.dataset.perf = 'lite';
    return;
  }

  // 3. Real-time frame rate watchdog
  let frameCount = 0;
  let lastTime = performance.now();
  let lowFpsCount = 0;

  const checkFps = (now: number) => {
    frameCount++;
    const delta = now - lastTime;

    if (delta >= 1000) {
      const fps = (frameCount * 1000) / delta;
      frameCount = 0;
      lastTime = now;

      // Only evaluate if tab is visible and active
      if (document.visibilityState === 'visible') {
        if (fps < 38) {
          lowFpsCount++;
          if (lowFpsCount >= 3) {
            html.dataset.perf = 'lite';
            return; // Guard has intervened, no need to keep sampling
          }
        } else {
          lowFpsCount = Math.max(0, lowFpsCount - 1);
        }
      }
    }

    requestAnimationFrame(checkFps);
  };

  requestAnimationFrame(checkFps);
}
