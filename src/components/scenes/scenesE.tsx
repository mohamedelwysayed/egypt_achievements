import React from 'react';
import { Svg, k, rise, sweep, fade, fadeOut, draw, move, pop, both, glow, rnd, Face, Box, Cyl, Orb, Ground, tones, dark, lite, SceneProps } from './shared';
const A = (n: number) => Array.from({ length: n }, (_, i) => i);
const S = (v: string) => v as unknown as number;
const Stars: React.FC<{ n?: number; seed?: number; h?: number }> = ({ n = 46, seed = 3, h = 520 }) => { const r = rnd(seed); return <>{A(n).map((i) => <circle key={i} cx={r() * 1600} cy={r() * h} r={r() * 1.8 + 0.5} fill="#fff" style={{ opacity: S(`calc(${(0.25 + r() * 0.75).toFixed(2)} * ${k(0, 0.12)})`) }} />)}</>; };

/** 02 — Grand Egyptian Museum: translucent triangulated facade, glass atrium, stair plinth, three lit pyramid apexes and sightlines. */
export const Museum: React.FC<SceneProps> = ({ c }) => {
  const apex: [number, number][] = [[1050, 430], [1230, 380], [1410, 470]];
  return (<Svg c={c}><Stars n={30} h={380} /><rect x="0" y="720" width="1600" height="180" fill="#2a261e" /><rect x="0" y="720" width="1600" height="180" fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.5 }} /><rect x="0" y="720" width="1600" height="180" fill="url(#g-vert)" />
    {apex.map(([x, y], i) => { const l = x - 150 + i * 14, r = x + 150 - i * 14; return <g key={i} style={rise(0.02 + i * 0.06, 0.22 + i * 0.06)}><Face pts={`${l},720 ${x},${y} ${x},720`} fill="#cfc7ad" shade="url(#g-vert)" stroke="#fff" tex={0.5} bricks={0.3} /><Face pts={`${x},${y} ${r},720 ${x},720`} fill="#8a8168" hatch={0.5} tex={0.5} /></g>; })}
    <g style={rise(0.12, 0.4)}>{A(4).map((i) => <Box key={i} x={120 - i * 14} y={700 + i * 5 - 0} w={600 + i * 28} h={6} c="#d9cfae" d={0.02} bricks={false} shadow={false} />)}
      <Box x={150} y={520} w={480} h={180} c="#d9cfae" d={0.22} />
      {A(8).map((i) => <g key={i}><polygon points={`${160 + i * 59},690 ${190 + i * 59},530 ${220 + i * 59},690`} fill="#16222f" opacity=".8" /><polygon points={`${160 + i * 59},690 ${190 + i * 59},530 ${220 + i * 59},690`} fill="url(#g-glass)" /><polygon points={`${190 + i * 59},530 ${220 + i * 59},690 ${250 + i * 59},530`} fill="#fff" opacity=".1" /></g>)}
      <path d="M150 600H630M150 650H630" stroke="#fff" strokeOpacity=".3" /></g>
    {apex.map(([x, y], i) => <g key={i}><path d={`M560 590L${x} ${y}`} stroke={c} strokeWidth="2.5" fill="none" pathLength={1} style={both(draw(0.42 + i * 0.1, 0.62 + i * 0.1), glow(c, 10))} /><Orb cx={x} cy={y} r={9} fill="#fff" style={both(pop(0.6 + i * 0.1, 0.7 + i * 0.1), glow(c, 14))} /></g>)}
    <rect x="130" y="520" width="580" height="200" fill="#fff" style={{ opacity: S(`calc(0.2 * ${k(0.84, 1)})`) }} /></Svg>);
};

/** 07 — Golden Parade: stone avenue, lit windows, gilded carriages with spoked wheels, cannon smoke rings. */
export const Parade: React.FC<SceneProps> = ({ c }) => {
  const r = rnd(11);
  return (<Svg c={c}><Stars h={300} seed={2} />
    {A(24).map((i) => { const h = 90 + r() * 260, x = i * 68; return <g key={i} style={rise(0.02, 0.2)}><Box x={x} y={760 - h} w={56} h={h} c="#7a7364" d={0.3} tex={0.5} />{A(Math.floor(h / 36)).map((j) => <rect key={j} x={x + 10 + (j % 2) * 22} y={772 - h + j * 36} width="8" height="12" fill={c} style={fade(0.2 + j * 0.01, 0.35 + j * 0.01)} />)}</g>; })}
    <rect x="0" y="760" width="1600" height="140" fill="#3a3226" /><rect x="0" y="760" width="1600" height="140" fill="url(#p-brick)" opacity=".5" /><rect x="0" y="760" width="1600" height="140" fill="url(#g-vert)" />
    <line x1="0" y1="790" x2="1600" y2="790" stroke={c} strokeWidth="3" pathLength={1} style={draw(0.05, 0.2)} />
    {A(22).map((i) => <g key={i} style={{ transform: `translateX(calc(${k(0.1 + i * 0.012, 0.62 + i * 0.012)} * ${1500 - i * 62}px - 140px))` }}><ellipse cx="34" cy="800" rx="46" ry="7" fill="#000" opacity=".45" /><g style={glow(c, 10)}><Box x={0} y={752} w={64} h={30} c={c} d={0.25} bricks={false} /><rect x="6" y="740" width="52" height="12" rx="3" fill="url(#g-gold)" />{[14, 50].map((cx) => <g key={cx}><circle cx={cx} cy="788" r="10" fill="#1a1510" stroke="url(#g-gold)" strokeWidth="3" />{A(4).map((q) => <line key={q} x1={cx} y1="788" x2={cx + Math.cos(q * 0.785) * 9} y2={788 + Math.sin(q * 0.785) * 9} stroke="#f2c94c" /> )}</g>)}</g></g>)}
    {A(21).map((i) => { const a = 0.55 + i * 0.012, x = 80 + (i % 11) * 140, y = 110 + Math.floor(i / 11) * 110; return <g key={i}><circle cx={x} cy={y} r="60" fill="none" stroke="#fff" strokeWidth="2" style={{ transform: `scale(${k(a, a + 0.1)})`, transformBox: 'fill-box', transformOrigin: 'center', opacity: S(`calc(${k(a, a + 0.04)} * (1 - ${k(a + 0.06, a + 0.12)}))`) }} /><circle cx={x} cy={y} r="34" fill="url(#g-sphere)" style={{ transform: `scale(${k(a, a + 0.1)})`, transformBox: 'fill-box', transformOrigin: 'center', opacity: S(`calc(0.5 * ${k(a, a + 0.04)} * (1 - ${k(a + 0.06, a + 0.12)}))`) }} /></g>; })}</Svg>);
};

/** 10 — Djoser: six-tier stone pyramid with a stair ramp, colonnade court, turquoise labyrinth. */
export const Tiers: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><g style={{ transformOrigin: '800px 130px' }}>{A(28).map((i) => { const a = (i / 28) * Math.PI * 2, rr = 120 + (i % 4) * 90; return <circle key={i} cx={800 + Math.cos(a) * rr * 2.2} cy={130 + Math.sin(a) * rr * 0.9} r={i % 7 === 0 ? 3.5 : 1.8} fill="#fff" fillOpacity=".8" style={fade(0, 0.1)} />; })}</g>
    <rect x="0" y="740" width="1600" height="160" fill="#8a6c3e" /><rect x="0" y="740" width="1600" height="160" fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.55 }} /><rect x="0" y="740" width="1600" height="160" fill="url(#g-vert)" />
    <g style={fade(0.05, 0.3)}>{A(10).map((i) => <Cyl key={i} x={120 + i * 46} y={640} w={26} h={100} c="#d9c28f" flutes={2} />)}<Box x={100} y={612} w={500} h={22} c="#d4bf93" d={0.05} bricks={false} /></g>
    <Ground cx={880} cy={744} rx={560} ry={30} />
    {A(6).map((i) => { const w = 760 - i * 112, t = 0.06 + i * 0.08; return <Box key={i} x={800 - w / 2} y={740 - (i + 1) * 78} w={w} h={78} c={i % 2 ? '#d7b97a' : '#c9a762'} d={0.14} style={rise(t, t + 0.12)} />; })}
    <g style={rise(0.3, 0.5)}>{A(10).map((i) => <Face key={i} pts={`${1020 - i * 6},${740 - i * 8} ${1060 - i * 6},${740 - i * 8} ${1060 - i * 6},${732 - i * 8} ${1020 - i * 6},${732 - i * 8}`} fill={i % 2 ? '#e8d3a0' : '#bda26a'} tex={0.3} />)}</g>
    <path d="M800 740V860H500V810H1100V860" stroke="#2dd4bf" strokeWidth="5" fill="none" pathLength={1} style={both(draw(0.6, 0.9), glow('#2dd4bf', 12))} />
    {A(18).map((i) => <Box key={i} x={520 + i * 32} y={822} w={14} h={14} c="#2dd4bf" d={0.3} shadow={false} bricks={false} style={pop(0.7 + i * 0.012, 0.76 + i * 0.012)} />)}</Svg>);

/** 05 — New Capital: glass towers with lit window grids, the Iconic Tower with faceted crown, a reflective Nile promenade. */
export const Skyline: React.FC<SceneProps> = ({ c }) => {
  const r = rnd(9);
  return (<Svg c={c}><Stars h={380} seed={5} />
    <rect x="0" y="800" width="1600" height="100" fill="url(#g-water)" opacity=".8" />
    {A(22).map((i) => { const h = 150 + r() * 260, x = 40 + i * 72, t = 0.04 + Math.abs(i - 11) * 0.025, tone = i % 5 === 0 ? c : ['#8d9bb0', '#a7b3c4', '#7a889c'][i % 3];
      return <g key={i} style={rise(t, t + 0.25)}><Box x={x} y={800 - h} w={58} h={h} c={tone} d={0.3} tex={0.18} bricks={false} /><rect x={x} y={800 - h} width="58" height={h} fill="url(#g-glass)" opacity=".5" />
        {A(Math.floor(h / 26)).map((j) => A(3).map((q) => (r() > 0.45) && <rect key={`${j}${q}`} x={x + 7 + q * 16} y={800 - h + 10 + j * 26} width="9" height="13" fill="#ffe9a8" opacity=".75" />))}</g>; })}
    <g style={rise(0.45, 0.8)}><Face pts="770,800 785,170 815,170 830,800" fill={c} shade="url(#g-vert)" stroke="#fff" tex={0.2} /><Face pts="800,170 815,170 830,800 800,800" fill={dark(c, 1)} hatch={0.35} />{A(14).map((i) => <path key={i} d={`M${787 - i * 0.9} ${190 + i * 42}H${813 + i * 0.9}`} stroke="#fff" strokeOpacity=".5" />)}<rect x="797" y="90" width="6" height="84" fill="url(#g-metal)" /></g>
    <circle cx="800" cy="84" r="12" fill="#fff" style={both(pop(0.8, 0.9), glow(c, 26))} />
    <path d="M0 835Q200 805 400 835T800 835T1200 835T1600 835" stroke="#58c4a4" strokeWidth="5" fill="none" pathLength={1} style={draw(0.5, 0.8)} />
    <g style={move(0.7, 1, 1500)}><rect x="30" y="852" width="90" height="14" rx="7" fill="#fff" style={glow(c, 10)} /></g></Svg>);
};
