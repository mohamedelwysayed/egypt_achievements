import React, { useRef } from 'react';
import { motion, useSpring } from 'motion/react';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Distance multiplier (default 0.28)
  className?: string;
  active?: boolean;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.28,
  className = '',
  active = true
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 18, stiffness: 220, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * strength);
    y.set(middleY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
