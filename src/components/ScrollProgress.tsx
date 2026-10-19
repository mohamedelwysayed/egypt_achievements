import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(1, Math.max(0, scrollY / docHeight)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[110] pointer-events-none bg-black/20">
      <div
        className="h-full bg-[#d2ff00] shadow-[0_0_10px_#d2ff00] origin-left transition-transform duration-75 ease-out"
        style={{
          transform: `scaleX(${progress})`,
          willChange: 'transform'
        }}
      />
    </div>
  );
};
