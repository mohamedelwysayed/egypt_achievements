import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroAnimationSuiteProps {
  cursorPos: { x: number; y: number };
  curtainOpen: boolean;
  onCurtainComplete?: () => void;
  showSpotlight?: boolean;
  showParticles?: boolean;
}

export const HeroAnimationSuite: React.FC<HeroAnimationSuiteProps> = ({
  cursorPos,
  curtainOpen,
  onCurtainComplete,
  showSpotlight = true,
  showParticles = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 13. Floating particles + 14. Starfield movement + 25. Infinite background drift
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles array (Floating particles & subtle starfield)
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.15,
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulse: Math.random() * Math.PI
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Starfield & Embers Loop
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        // Draw particle with gentle gold/lime tint
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 255, 0, ${currentAlpha * 0.7})`;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* 12. Gradient shift background (#12) */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-soft-light animate-pulse"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(210, 255, 0, 0.08), rgba(212, 175, 55, 0.04) 50%, transparent 80%)',
          animationDuration: '6s'
        }}
      />

      {/* 15. Aurora background (#15) - Organic glowing sweeps */}
      <div 
        className="absolute -top-[30%] -left-[20%] w-[140vw] h-[140vh] opacity-25 filter blur-[90px] animate-spin"
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%, rgba(210, 255, 0, 0.08) 0deg, rgba(212, 175, 55, 0.06) 120deg, transparent 240deg, rgba(210, 255, 0, 0.08) 360deg)',
          animationDuration: '32s'
        }}
      />

      {/* 18. Morphing blob (#18) */}
      <svg className="absolute top-1/4 right-10 w-96 h-96 opacity-15 filter blur-2xl" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d2ff00" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
        </defs>
        <path
          fill="url(#blobGrad)"
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C86.9,14.6,81.2,29.1,72.9,42C64.6,54.9,53.7,66.1,40.7,73.5C27.7,80.9,12.6,84.5,-2.1,87.8C-16.7,91,-33.4,94,-47.1,88C-60.8,82,-71.4,67.1,-78.9,51.8C-86.3,36.5,-90.6,20.8,-89.6,5.8C-88.6,-9.3,-82.3,-23.7,-73.4,-35.8C-64.6,-48,-53.2,-57.9,-40.4,-65.7C-27.7,-73.5,-13.8,-79.3,0.9,-80.8C15.6,-82.4,30.6,-83.6,44.7,-76.4Z"
          transform="translate(100 100)"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C86.9,14.6,81.2,29.1,72.9,42C64.6,54.9,53.7,66.1,40.7,73.5C27.7,80.9,12.6,84.5,-2.1,87.8C-16.7,91,-33.4,94,-47.1,88C-60.8,82,-71.4,67.1,-78.9,51.8C-86.3,36.5,-90.6,20.8,-89.6,5.8C-88.6,-9.3,-82.3,-23.7,-73.4,-35.8C-64.6,-48,-53.2,-57.9,-40.4,-65.7C-27.7,-73.5,-13.8,-79.3,0.9,-80.8C15.6,-82.4,30.6,-83.6,44.7,-76.4Z;
              M41.4,-70.5C54.4,-64.1,66.1,-54.6,73.8,-42.4C81.6,-30.2,85.4,-15.1,84.1,-0.8C82.7,13.6,76.3,27.1,68.4,39.3C60.6,51.5,51.3,62.4,39.6,69.5C28,76.6,14,79.8,0.2,79.5C-13.6,79.1,-27.3,75.2,-39.7,68.5C-52.2,61.8,-63.5,52.3,-71.4,40.5C-79.3,28.7,-83.9,14.3,-83.7,0.1C-83.6,-14.1,-78.7,-28.3,-70.5,-40.2C-62.3,-52.1,-50.8,-61.7,-38,-68.2C-25.2,-74.7,-12.6,-78.1,0.7,-79.2C13.9,-80.4,28.4,-77,41.4,-70.5Z;
              M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C86.9,14.6,81.2,29.1,72.9,42C64.6,54.9,53.7,66.1,40.7,73.5C27.7,80.9,12.6,84.5,-2.1,87.8C-16.7,91,-33.4,94,-47.1,88C-60.8,82,-71.4,67.1,-78.9,51.8C-86.3,36.5,-90.6,20.8,-89.6,5.8C-88.6,-9.3,-82.3,-23.7,-73.4,-35.8C-64.6,-48,-53.2,-57.9,-40.4,-65.7C-27.7,-73.5,-13.8,-79.3,0.9,-80.8C15.6,-82.4,30.6,-83.6,44.7,-76.4Z
            "
          />
        </path>
      </svg>

      {/* 23. Spotlight reveal (#23) */}
      {showSpotlight && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 380px at ${cursorPos.x}px ${cursorPos.y}px, rgba(210, 255, 0, 0.06), transparent 70%)`
          }}
        />
      )}

      {/* 13. Floating particles + 14. Starfield canvas (#13, #14) */}
      {showParticles && (
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      )}

      {/* 21. Split-screen opening (#21) & 22. Curtain reveal (#22) */}
      <AnimatePresence onExitComplete={onCurtainComplete}>
        {!curtainOpen && (
          <div className="absolute inset-0 z-50 flex pointer-events-none">
            {/* Left Curtain / Split panel */}
            <motion.div
              initial={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-1/2 h-full bg-[#111112] border-r border-[#d2ff00]/40 flex items-center justify-end pr-6 shadow-2xl"
            >
              <span className="font-serif text-3xl font-black text-[#d2ff00] tracking-widest uppercase">
                EG
              </span>
            </motion.div>

            {/* Right Curtain / Split panel */}
            <motion.div
              initial={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-1/2 h-full bg-[#111112] border-l border-[#d2ff00]/40 flex items-center justify-start pl-6 shadow-2xl"
            >
              <span className="font-serif text-3xl font-black text-[#f4f4ed] tracking-widest uppercase">
                YPT
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
