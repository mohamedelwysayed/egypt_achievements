import React, { useEffect, useRef } from 'react';

interface RiveSleekBackgroundProps {
  theme?: 'dark' | 'light';
  opacity?: number;
}

/**
 * Flowing ribbon + telemetry-ring canvas.
 * - The render loop is created ONCE; theme/opacity are read from refs so scroll-driven
 *   prop changes never tear the loop down.
 * - It only draws while on screen, the tab is visible and the layer is not "idle"
 *   (covered by the next curtain — see data-idle in App).
 */
export const RiveSleekBackground: React.FC<RiveSleekBackgroundProps> = ({
  theme = 'light',
  opacity = 0.45
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);
  const opacityRef = useRef(opacity);
  themeRef.current = theme;
  opacityRef.current = opacity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let raf = 0;
    let time = 0;
    let onScreen = true;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.tx = (e.clientX - rect.left) / rect.width;
      mouse.ty = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    io.observe(canvas);

    const render = () => {
      raf = requestAnimationFrame(render);
      const lite = document.documentElement.dataset.perf === 'lite';
      if (
        !onScreen ||
        document.visibilityState !== 'visible' ||
        (canvas.closest('[data-idle="1"]') !== null)
      ) {
        return;
      }

      const opacity = opacityRef.current;
      const dark = themeRef.current === 'dark';
      const strokeColor = dark ? 'rgba(210, 255, 0, ' : 'rgba(17, 17, 18, ';
      const secondaryColor = dark ? 'rgba(244, 244, 237, ' : 'rgba(83, 84, 80, ';

      time += 0.007;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      ctx.clearRect(0, 0, w, h);
      const mx = mouse.x;
      const my = mouse.y;

      // 1. Flowing geometric sine ribbons
      const ribbonCount = lite ? 4 : 7;
      const steps = lite ? 28 : 48;
      for (let r = 0; r < ribbonCount; r++) {
        ctx.beginPath();
        const yOffset = h * 0.2 + (r * (h * 0.7)) / ribbonCount;
        const alpha = Math.max(0.04, (1 - Math.abs(r - ribbonCount / 2) / (ribbonCount / 2)) * 0.18);
        ctx.strokeStyle = `${strokeColor}${alpha * opacity * 1.5})`;
        ctx.lineWidth = r % 2 === 0 ? 1.2 : 0.8;
        ctx.setLineDash(r % 3 === 0 ? [6, 8] : []);
        ctx.moveTo(0, yOffset);
        for (let s = 0; s <= steps; s++) {
          const x = (s / steps) * w;
          const distToMouse = Math.hypot(x - mx * w, yOffset - my * h);
          const mouseDeflect = Math.max(0, 1 - distToMouse / (w * 0.35)) * 38;
          const k = 48 / steps; // keep the wave shape identical regardless of step count
          const wave1 = Math.sin(s * k * 0.22 + time * 1.4 + r * 0.45) * 32;
          const wave2 = Math.cos(s * k * 0.12 - time * 0.8 + r) * 18;
          ctx.lineTo(x, yOffset + wave1 + wave2 - mouseDeflect * (my > 0.5 ? -1 : 1));
        }
        ctx.stroke();
      }

      // 2. Concentric telemetry rings
      const cx = w * 0.78 + (mx - 0.5) * 60;
      const cy = h * 0.45 + (my - 0.5) * 60;
      [60, 120, 200, 310, 440].forEach((radius, idx) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${secondaryColor}${0.05 * opacity})`;
        ctx.lineWidth = 0.9;
        ctx.setLineDash(idx % 2 === 0 ? [3, 9] : []);
        ctx.stroke();
      });

      // Rotating compass ticks along the outer ring (batched into one path)
      const outerR = 310;
      const tickCount = 24;
      ctx.beginPath();
      for (let t = 0; t < tickCount; t++) {
        const angle = (t / tickCount) * Math.PI * 2 + time * 0.2;
        const len = t % 4 === 0 ? 10 : 4;
        ctx.moveTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
        ctx.lineTo(cx + Math.cos(angle) * (outerR + len), cy + Math.sin(angle) * (outerR + len));
      }
      ctx.strokeStyle = `${strokeColor}${0.12 * opacity})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.stroke();
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
