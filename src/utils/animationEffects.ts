import React, { useState, useEffect, useRef } from 'react';

/**
 * Hook: Character Scramble / Decoder Effect (#10)
 * Scrambles characters from random glyphs before settling on target text
 */
export function useScrambleText(targetText: string, duration = 800, trigger = true) {
  const [displayText, setDisplayText] = useState(targetText);
  const glyphs = '𓈎𓅓𓏏𓊖𓋹𓊽𓉐𓇳0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const intervalTime = 35;
    const totalSteps = duration / intervalTime;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < (iteration / totalSteps) * targetText.length) {
              return targetText[index];
            }
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('');
      });

      iteration += 1;
      if (iteration >= totalSteps) {
        clearInterval(interval);
        setDisplayText(targetText);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [targetText, trigger, duration]);

  return displayText;
}

/**
 * Hook: Typewriter Effect (#11)
 */
export function useTypewriter(text: string, speed = 40, active = true) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      return;
    }
    setDisplayed('');
    let idx = 0;
    const timer = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(idx));
      idx += 1;
      if (idx >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, active]);

  return displayed;
}

/**
 * Hook: Magnetic Button Physics (#28)
 * Pulls the element toward the pointer. Writes the transform straight to the DOM
 * (no React state) so hovering never re-renders the parent component.
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);
  const position = { x: 0, y: 0 };

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0px, 0px, 0)';
  };

  return { ref, position, handleMouseMove, handleMouseLeave };
}

/**
 * Hook: 3D Hover Tilt (#30)
 */
export function useHoverTilt(maxTilt = 12) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * maxTilt,
      rotateY: x * maxTilt
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return { ref, tilt, handleMouseMove, handleMouseLeave };
}

/**
 * Interactive Ripple Click Effect (#48)
 */
export interface RippleItem {
  id: number;
  x: number;
  y: number;
}

export function useRipple() {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newRipple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 700);
  };

  return { ripples, addRipple };
}
