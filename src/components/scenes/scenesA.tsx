import React from 'react';
import { Svg, k, rise, sweep, fade, fadeOut, draw, move, pop, spin, both, glow, rnd, SceneProps , Face, Box, Cyl, Orb, Ground, tones, dark, lite } from './shared';
export const A = (n: number) => Array.from({ length: n }, (_, i) => i);
const S = (v: string) => v as unknown as number; // css-calc strings in numeric style slots
const Stars: React.FC<{ n?: number; seed?: number; h?: number }> = ({ n = 46, seed = 3, h = 520 }) => { const r = rnd(seed); return <>{A(n).map((i) => <circle key={i} cx={r() * 1600} cy={r() * h} r={r() * 1.8 + 0.5} fill="#fff" style={{ opacity: S(`calc(${(0.25 + r() * 0.75).toFixed(2)} * ${k(0, 0.12)})`) }} />)}</>; };

/** 01 — The Great Pyramid: courses rise, then the meridian locks onto true north. */
export const Pyramid: React.FC<SceneProps> = ({ c }) => {
  const N = 14, base = 920, H = 520, y0 = 790;
  return (<Svg c={c}><Stars />
    <line x1="0" y1={y0} x2="1600" y2={y0} stroke={c} strokeWidth="2" pathLength={1} style={draw(0, 0.08)} />
    {A(N).map((i) => { const w0 = base * (1 - i / N), w1 = base * (1 - (i + 1) / N), ya = y0 - (i * H) / N, yb = y0 - ((i + 1) * H) / N, t = 0.06 + i * 0.04;
      const tn = tones('#d9b46a');
      return <g key={i} style={rise(t, t + 0.1)}><Face pts={`${800 - w0 / 2},${ya} 800,${ya} 800,${yb} ${800 - w1 / 2},${yb}`} fill={tn.top} shade="url(#g-vert)" stroke={tn.edge} />
        <Face pts={`800,${ya} ${800 + w0 / 2},${ya} ${800 + w1 / 2},${yb} 800,${yb}`} fill={tn.side} stroke={dark(c, 1.5)} /></g>; })}
    <Ground cx={1010} cy={y0 + 14} rx={640} ry={34} />
    <line x1="800" y1={y0 - H - 8} x2="800" y2="60" stroke={c} strokeWidth="2" strokeDasharray="6 10" style={fade(0.66, 0.78)} />
    <g style={both(pop(0.76, 0.88), glow(c, 18))}><circle cx="800" cy="60" r="9" fill="#fff" /><path d="M800 28V92M768 60H832" stroke="#fff" strokeWidth="1.5" /></g>
    <ellipse cx="800" cy={y0 + 4} rx="600" ry="30" fill="none" stroke={c} strokeWidth="1.5" style={fade(0.88, 1)} /></Svg>);
};

/** 02 — Grand Egyptian Museum: sightlines fly from the facade to the three apexes. */
export const Museum: React.FC<SceneProps> = ({ c }) => {
  const apex: [number, number][] = [[1050, 430], [1230, 380], [1410, 470]];
  return (<Svg c={c}><line x1="0" y1="720" x2="1600" y2="720" stroke="#fff" strokeOpacity=".35" />
    {apex.map(([x, y], i) => <polygon key={i} points={`${x - 150 + i * 14},720 ${x},${y} ${x + 150 - i * 14},720`} fill="#fff" fillOpacity=".08" stroke="#fff" strokeOpacity=".45" strokeWidth="1.5" style={rise(0.02 + i * 0.06, 0.22 + i * 0.06)} />)}
    <g style={rise(0.12, 0.4)}><Box x={150} y={540} w={480} h={180} c="#d9cfae" d={0.22} />{A(9).map((i) => <rect key={i} x={166 + i * 52} y={560} width="40" height="140" fill="#14202e" opacity=".75" />)}{A(9).map((i) => <rect key={'g' + i} x={166 + i * 52} y={560} width="40" height="140" fill="url(#g-glass)" />)}<path d="M150 630H630M150 668H630" stroke="#fff" strokeOpacity=".25" />
      {A(9).map((i) => <line key={i} x1={190 + i * 56} y1={720} x2={210 + i * 50} y2={540 + i * 2} stroke={c} strokeOpacity=".5" />)}</g>
    {apex.map(([x, y], i) => <g key={i}><path d={`M560 590L${x} ${y}`} stroke={c} strokeWidth="2.5" fill="none" pathLength={1} style={both(draw(0.42 + i * 0.1, 0.62 + i * 0.1), glow(c, 10))} />
      <circle cx={x} cy={y} r="9" fill="#fff" style={both(pop(0.6 + i * 0.1, 0.7 + i * 0.1), glow(c, 14))} /></g>)}
    <polygon points="130,720 190,520 640,560 700,720" fill="#fff" style={{ opacity: S(`calc(0.22 * ${k(0.84, 1)})`) }} /></Svg>);
};

/** 03 — The golden mask is beaten into being out of candlelight. */
export const Mask: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><g style={fadeOut(0.02, 0.24)}><ellipse cx="800" cy="470" rx="26" ry="64" fill="#ffd27a" style={glow('#ffb347', 36)} /><rect x="797" y="520" width="6" height="90" fill="#fff" fillOpacity=".5" /></g>
    <g style={rise(0.18, 0.62)}><g style={glow(c, 22)}>
      <polygon points="610,200 990,200 1090,520 1040,800 900,760 700,760 560,800 510,520" fill="url(#g-gold)" stroke="#fff2b0" strokeWidth="4" filter="url(#f-bevel)" />
      <ellipse cx="800" cy="500" rx="165" ry="215" fill="url(#g-gold)" stroke="#fff2b0" strokeWidth="3" filter="url(#f-bevel)" /><ellipse cx="800" cy="500" rx="165" ry="215" fill="url(#g-sphere)" /></g></g>
    {A(7).map((i) => <path key={i} d={`M${600 - i * 4} ${250 + i * 70}H${1000 + i * 4}`} stroke="#1e3a8a" strokeWidth="14" fill="none" pathLength={1} style={draw(0.5 + i * 0.03, 0.62 + i * 0.03)} />)}
    {[-70, 70].map((dx, i) => <g key={i} style={pop(0.72, 0.82)}><ellipse cx={800 + dx} cy="470" rx="38" ry="15" fill="#111" /><ellipse cx={800 + dx} cy="470" rx="14" ry="12" fill="#fff" /></g>)}
    <g style={both(pop(0.82, 0.92), glow('#fff', 12))}><path d="M800 230c-14 24-14 46 0 62 14-16 14-38 0-62z" fill="#1e8a5a" /><path d="M740 244l60 30-60 14z M860 244l-60 30 60 14z" fill="#e9e3d0" /></g>
    <rect x="-400" y="0" width="260" height="900" fill="#fff" style={{ transform: `translateX(calc(${k(0.84, 1)} * 2200px)) skewX(-18deg)`, opacity: 0.18 }} /></Svg>);

/** 04 — The new channel is dredged; ships pass in both directions at once. */
export const Canal: React.FC<SceneProps> = ({ c }) => {
  const ship = (y: number, col: string, flip: boolean) => <g transform={`translate(0 ${y}) ${flip ? 'scale(-1 1) translate(-160 0)' : ''}`}><polygon points="0,40 160,40 138,80 20,80" fill="#e9eef5" />{A(5).map((i) => <rect key={i} x={14 + i * 28} y={10 + (i % 2) * 14} width="24" height={30 - (i % 2) * 14} fill={i % 2 ? col : c} />)}</g>;
  return (<Svg c={c}><rect x="0" y="360" width="1600" height="150" fill="#2b8ad0" fillOpacity=".35" style={fadeOut(0, 0)} />
    <path d="M-20 450H1620" stroke="#6ec6ff" strokeOpacity=".7" strokeWidth="46" fill="none" pathLength={1} style={draw(0, 0.12)} />
    <path d="M-20 600H1620" stroke={c} strokeWidth="46" strokeOpacity=".75" fill="none" pathLength={1} style={both(draw(0.1, 0.5), glow(c, 12))} />
    {[395, 505, 545, 655].map((y, i) => <line key={i} x1="0" x2="1600" y1={y} y2={y} stroke="#e8d3a0" strokeOpacity=".5" strokeWidth="3" strokeDasharray="14 10" style={fade(0.05, 0.3)} />)}
    <g style={fadeOut(0.3, 0.5)}><path d="M120 360V250l130-60M120 250l-40 40" stroke="#fff" strokeWidth="6" fill="none" /><rect x="90" y="360" width="120" height="30" fill="#fff" /></g>
    <g style={{ transform: `translateX(calc(${k(0.38, 1)} * 1900px - 300px))` }}>{ship(380, '#e8b04a', false)}</g>
    <g style={{ transform: `translateX(calc(1800px - ${k(0.5, 1)} * 2000px))` }}>{ship(535, '#58c4a4', true)}</g></Svg>);
};

/** 05 — The new capital: a skyline grows with the Iconic Tower on top. */
export const Skyline: React.FC<SceneProps> = ({ c }) => {
  const r = rnd(9);
  return (<Svg c={c}><Stars h={380} seed={5} />
    {A(22).map((i) => { const h = 150 + r() * 260, x = 40 + i * 72, t = 0.04 + (Math.abs(i - 11) * 0.025);
      return <g key={i} style={rise(t, t + 0.25)}><Box x={x} y={800 - h} w={58} h={h} c={i % 5 === 0 ? c : '#9aa6b8'} d={0.3} tex={0.2} />
        {A(Math.floor(h / 40)).map((j) => <rect key={j} x={x + 10 + (j % 2) * 20} y={800 - h + 14 + j * 40} width="10" height="14" fill="#fff" fillOpacity=".5" />)}</g>; })}
    <g style={rise(0.45, 0.8)}><polygon points="770,800 785,170 815,170 830,800" fill={c} fillOpacity=".75" stroke="#fff" strokeWidth="1.5" /><rect x="797" y="90" width="6" height="84" fill="#fff" /></g>
    <circle cx="800" cy="84" r="12" fill="#fff" style={both(pop(0.8, 0.9), glow(c, 26))} />
    <path d="M0 835Q200 805 400 835T800 835T1200 835T1600 835" stroke="#58c4a4" strokeWidth="5" fill="none" pathLength={1} style={draw(0.5, 0.8)} />
    <g style={move(0.7, 1, 1500)}><rect x="30" y="852" width="90" height="14" rx="7" fill="#fff" style={glow(c, 10)} /></g></Svg>);
};

/** 06 — Abu Simbel: the sun climbs, the beam travels 65 m inside, three gods light up. */
export const Sunbeam: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><g style={move(0, 0.45, 0, -420)}><circle cx="170" cy="800" r="60" fill={c} style={glow(c, 60)} /></g>
    <polygon points="560,230 1520,230 1580,800 520,800" fill="#0c0a08" fillOpacity=".8" stroke="#fff" strokeOpacity=".3" />
    {A(4).map((i) => <g key={i} style={rise(0.08 + i * 0.05, 0.3 + i * 0.05)}><rect x={650 + i * 205} y="470" width="96" height="320" fill="#c89a5a" fillOpacity=".55" /><circle cx={698 + i * 205} cy="430" r="40" fill="#d8ae6a" fillOpacity=".7" /><rect x={668 + i * 205} y="372" width="60" height="26" fill={c} fillOpacity=".7" /></g>)}
    <rect x="0" y="600" width="1560" height="46" fill={c} fillOpacity=".5" style={{ ...sweep(0.42, 0.7), ...glow(c, 22) }} />
    {A(4).map((i) => <g key={i} style={i === 0 ? fade(0.3, 0.4) : pop(0.62 + i * 0.04, 0.7 + i * 0.04)}><circle cx={1170 + i * 100} cy="623" r="34" fill={i === 0 ? '#111' : c} stroke="#fff" strokeOpacity=".6" style={i === 0 ? undefined : glow(c, 24)} /></g>)}
    {A(14).map((i) => <rect key={i} x={560 + (i % 7) * 140} y={250 + Math.floor(i / 7) * 280} width="130" height="260" fill="none" stroke="#fff" strokeOpacity=".5" style={fade(0.8 + i * 0.01, 0.82 + i * 0.01)} />)}
    <path d="M1040 240V120M1000 160l40-40 40 40" stroke="#fff" strokeWidth="4" fill="none" pathLength={1} style={draw(0.86, 1)} /></Svg>);

/** 07 — The Golden Parade: twenty-two carriages cross the lit city, cannons fire. */
export const Parade: React.FC<SceneProps> = ({ c }) => {
  const r = rnd(11);
  return (<Svg c={c}><Stars h={300} seed={2} />
    {A(26).map((i) => { const h = 90 + r() * 260, x = i * 64; return <g key={i} style={rise(0.02, 0.2)}><rect x={x} y={760 - h} width="56" height={h} fill="#fff" fillOpacity=".09" />{A(Math.floor(h / 36)).map((j) => <rect key={j} x={x + 10 + (j % 2) * 22} y={770 - h + j * 36} width="8" height="12" fill={c} style={fade(0.2 + j * 0.01, 0.35 + j * 0.01)} />)}</g>; })}
    <line x1="0" y1="790" x2="1600" y2="790" stroke={c} strokeWidth="3" pathLength={1} style={draw(0.05, 0.2)} />
    {A(22).map((i) => <g key={i} style={{ transform: `translateX(calc(${k(0.1 + i * 0.012, 0.62 + i * 0.012)} * ${1500 - i * 62}px - 140px))` }}><g style={glow(c, 12)}><rect x="0" y="756" width="64" height="26" rx="5" fill={c} /><circle cx="14" cy="788" r="8" fill="#111" stroke={c} /><circle cx="50" cy="788" r="8" fill="#111" stroke={c} /></g></g>)}
    {A(21).map((i) => { const a = 0.55 + i * 0.012, x = 80 + (i % 11) * 140, y = 110 + Math.floor(i / 11) * 110;
      return <g key={i}><circle cx={x} cy={y} r="60" fill="none" stroke="#fff" strokeWidth="2" style={{ transform: `scale(${k(a, a + 0.1)})`, transformBox: 'fill-box', transformOrigin: 'center', opacity: S(`calc(${k(a, a + 0.04)} * (1 - ${k(a + 0.06, a + 0.12)}))`) }} /></g>; })}</Svg>);
};

/** 08 — Karnak: 134 columns grow from the centre outward; light shafts and colour return. */
export const Columns: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}>{A(3).map((i) => <polygon key={i} points={`${260 + i * 480},0 ${340 + i * 480},0 ${520 + i * 480 - 80},900 ${300 + i * 480},900`} fill="#fff" fillOpacity=".11" style={fade(0.5 + i * 0.08, 0.7 + i * 0.08)} />)}
    {A(16).map((i) => { const x = 90 + i * 92, d = Math.abs(i - 7.5), h = 560 - d * 18, t = 0.04 + d * 0.04;
      return <g key={i} style={rise(t, t + 0.22)}><Cyl x={x} y={800 - h} w={50} h={h} c="#cdb78a" /><path d={`M${x - 14} ${800 - h}Q${x + 25} ${800 - h - 40} ${x + 64} ${800 - h}Z`} fill={c} fillOpacity=".5" stroke="#fff" strokeOpacity=".5" /><rect x={x - 6} y="790" width="62" height="14" fill="#e8d7b0" fillOpacity=".4" />
        <rect x={x} y={800 - h + 60} width="50" height="26" fill={i % 3 === 0 ? '#2dd4bf' : i % 3 === 1 ? '#e2553d' : c} style={{ opacity: S(`calc(0.55 * ${k(0.8, 0.95)})`) }} /></g>; })}
    <line x1="0" y1="804" x2="1600" y2="804" stroke="#fff" strokeOpacity=".4" /></Svg>);
