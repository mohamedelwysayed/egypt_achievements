import React from 'react';
import { motion } from 'motion/react';
import { EASE } from '../motion/tokens';

/** Webflow-style masked word reveal (words, not letters, so Arabic letters stay joined). */
export const Split: React.FC<{ text: string; className?: string; delay?: number; stagger?: number; as?: 'h1' | 'h2' | 'h3' | 'p' }> = ({
  text, className = '', delay = 0, stagger = 0.06, as = 'h2',
}) => {
  const Tag = motion[as] as typeof motion.h2;
  return (
    <Tag className={className} aria-label={text}
      initial="h" whileInView="v" viewport={{ once: true, margin: '-10% 0px' }} transition={{ staggerChildren: stagger, delayChildren: delay }}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] me-[0.25em]">
          <motion.span className="inline-block"
            variants={{ h: { y: '110%', rotate: 6 }, v: { y: '0%', rotate: 0 } }}
            transition={{ duration: 0.9, ease: EASE.outExpo }}>{w}</motion.span>
        </span>
      ))}
    </Tag>
  );
};

/** Clip-path unmask + de-zoom, the classic Webflow image reveal. */
export const ClipImg: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => (
  <motion.div className={`overflow-hidden ${className}`}
    initial={{ clipPath: 'inset(100% 0 0 0)' }} whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
    viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 1.1, ease: EASE.outExpo }}>
    <motion.img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-cover"
      initial={{ scale: 1.35 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE.outExpo }} />
  </motion.div>
);
