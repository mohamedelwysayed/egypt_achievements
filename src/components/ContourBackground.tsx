import React from 'react';

interface ContourBackgroundProps {
  dark?: boolean;
  theme?: 'light' | 'dark';
  opacity?: number;
  className?: string;
}

export const ContourBackground: React.FC<ContourBackgroundProps> = ({
  dark,
  theme,
  opacity = 0.5,
  className = ''
}) => {
  const isDark = dark ?? (theme === 'dark');
  const strokeColor = isDark ? 'rgba(210,255,0,0.12)' : 'rgba(40,44,32,0.1)';

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M-100 200 C300 150 500 450 900 300 C1200 180 1400 400 1600 250"
          stroke={strokeColor}
          strokeWidth="1.2"
        />
        <path
          d="M-50 400 C250 320 600 600 1000 450 C1300 350 1500 600 1650 450"
          stroke={strokeColor}
          strokeWidth="1"
        />
        <path
          d="M-120 650 C200 580 450 800 850 650 C1200 520 1450 800 1600 700"
          stroke={strokeColor}
          strokeWidth="1.2"
        />
        <path
          d="M-80 100 C350 50 650 250 1050 120 C1350 20 1550 220 1620 150"
          stroke={strokeColor}
          strokeWidth="0.8"
        />
        <path
          d="M200 800 C450 720 700 890 1100 820 C1350 770 1500 900 1600 850"
          stroke={strokeColor}
          strokeWidth="1"
        />
        {/* Subtle topographical rings */}
        <ellipse cx="280" cy="480" rx="90" ry="50" stroke={strokeColor} strokeWidth="0.8" />
        <ellipse cx="280" cy="480" rx="140" ry="80" stroke={strokeColor} strokeWidth="0.7" />
        <ellipse cx="1120" cy="280" rx="120" ry="70" stroke={strokeColor} strokeWidth="0.8" />
        <ellipse cx="1120" cy="280" rx="180" ry="110" stroke={strokeColor} strokeWidth="0.7" />
      </svg>
    </div>
  );
};
