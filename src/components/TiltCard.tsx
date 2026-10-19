import React, { useRef } from 'react';
import { motion, useSpring } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default 5deg)
  onClick?: () => void;
}

const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * 3D tilt + specular glare.
 * Tilt runs on springs; the glare and parallax variables (--mx / --my) are written straight
 * to the DOM, so hovering a card never triggers a React re-render.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 5,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 20, stiffness: 260, mass: 0.1 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || !canHover()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateX.set((py - 0.5) * -2 * maxTilt);
    rotateY.set((px - 0.5) * 2 * maxTilt);
    scale.set(1.015);

    el.style.setProperty('--mx', px.toFixed(3));
    el.style.setProperty('--my', py.toFixed(3));
    const glare = glareRef.current;
    if (glare) {
      glare.style.opacity = '0.18';
      glare.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 65%)`;
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    cardRef.current?.style.setProperty('--mx', '0.5');
    cardRef.current?.style.setProperty('--my', '0.5');
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };

  return (
    <motion.div
      ref={cardRef}
      data-cursor={onClick ? 'OPEN' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d'
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {/* Subtle dynamic specular light sheen */}
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-inherit transition-opacity duration-300 z-30"
        style={{ opacity: 0 }}
      />
    </motion.div>
  );
};
