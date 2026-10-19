import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface BoxRevealProps {
  children: React.ReactNode;
  isVisible: boolean;
  delay?: number;
  direction?: 'left-to-right' | 'right-to-left';
  boxColor?: string;
  textOffset?: number; // Subtle sideways drift in pixels
  duration?: number;
  className?: string;
}

export const BoxReveal: React.FC<BoxRevealProps> = ({
  children,
  isVisible,
  delay = 0,
  direction = 'left-to-right',
  boxColor = 'bg-[#111112]',
  textOffset = -22,
  duration = 0.85,
  className = ''
}) => {
  const isLeftToRight = direction === 'left-to-right';
  const wrapRef = useRef<HTMLDivElement>(null);
  // Plays the first time the block scrolls into view (and only if the caller allows it)
  const inView = useInView(wrapRef, { once: true, amount: 0.35 });
  const show = isVisible && inView;

  return (
    <div ref={wrapRef} className={`relative inline-block overflow-hidden ${className}`}>
      {/* Editorial Text with subtle sideways movement and fade */}
      <motion.div
        initial={{
          x: textOffset,
          opacity: 0
        }}
        animate={
          show
            ? {
                x: 0,
                opacity: 1
              }
            : {
                x: textOffset,
                opacity: 0
              }
        }
        transition={{
          duration: duration * 1.05,
          delay: delay + 0.12,
          ease: [0.16, 1, 0.3, 1] // Premium cinematic editorial ease
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Rectangular reveal box / mask */}
      <motion.div
        initial={{
          scaleX: 1,
          originX: isLeftToRight ? 0 : 1
        }}
        animate={
          show
            ? {
                scaleX: 0,
                originX: isLeftToRight ? 1 : 0
              }
            : {
                scaleX: 1,
                originX: isLeftToRight ? 0 : 1
              }
        }
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.16, 1, 0.3, 1]
        }}
        className={`absolute inset-0 z-20 pointer-events-none ${boxColor}`}
      />
    </div>
  );
};
