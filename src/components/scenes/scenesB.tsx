import React from 'react';
import { Svg, k, rise, sweep, fade, fadeOut, draw, move, pop, spin, both, glow, rnd, SceneProps , Face, Box, Cyl, Orb, Ground, tones, dark, lite } from './shared';
import { A } from './scenesA';
const S = (v: string) => v as unknown as number;

/** 09 — Narmer: two crowns slide together and become one; Memphis rises at the delta. */
export const Crowns: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><path d="M520 150H1080Q1130 150 1130 220V600Q1130 760 800 820Q470 760 470 600V220Q470 150 520 150Z" fill="#7d8a6a" fillOpacity=".25" stroke="#d8d2b8" strokeWidth="3" pathLength={1} style={draw(0, 0.22)} />
    <path d="M-20 860C300 840 600 880 900 850S1400 830 1620 860" stroke="#6ec6ff" strokeWidth="6" fill="none" pathLength={1} style={draw(0.08, 0.3)} />
    {A(5).map((i) => <path key={i} d={`M1280 852L${1360 + i * 40} ${760 + i * 20}`} stroke="#6ec6ff" strokeWidth="4" fill="none" pathLength={1} style={draw(0.2, 0.34)} />)}
    <g style={{ transform: `translateX(calc(${k(0.28, 0.66)} * 480px - 330px)) translateY(80px)`, opacity: S(`calc(1 - ${k(0.7, 0.76)})`) }}><path d="M700 420L670 220Q700 150 730 220L760 420Z" fill="#f4f1e6" stroke="#fff" strokeWidth="2" style={glow('#fff', 14)} /></g>
    <g style={{ transform: `translateX(calc(${k(0.28, 0.66)} * -480px + 330px)) translateY(80px)`, opacity: S(`calc(1 - ${k(0.7, 0.76)})`) }}><path d="M800 420L808 330H870L862 220H874V170H886V420Z" fill="#c8402c" stroke="#ffb4a0" strokeWidth="2" style={glow('#e2553d', 14)} /><circle cx="830" cy="338" r="14" fill="none" stroke="#ffb4a0" strokeWidth="3" /></g>
    <g style={both(pop(0.72, 0.86), glow(c, 26))}><path d="M740 560L758 340H842L860 560Z" fill="#c8402c" /><circle cx="800" cy="340" r="0" /><path d="M772 340L760 190Q800 130 840 190L828 340Z" fill="#f4f1e6" stroke="#fff" strokeWidth="2" /><path d="M800 190V130q22 -20 8 -44" stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" /></g>
    <g style={rise(0.84, 1)}><rect x="1340" y="700" width="180" height="60" fill="#f4f1e6" />{A(6).map((i) => <rect key={i} x={1340 + i * 32} y="684" width="18" height="18" fill="#f4f1e6" />)}</g></Svg>);

/** 10 — Djoser: six tiers climb under circling stars, a turquoise labyrinth glows below. */
export const Tiers: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><g style={{ ...spin(0.12), transformOrigin: '800px 130px', transformBox: 'view-box' as never }}>{A(28).map((i) => { const a = (i / 28) * Math.PI * 2, rr = 120 + (i % 4) * 90; return <circle key={i} cx={800 + Math.cos(a) * rr * 2.2} cy={130 + Math.sin(a) * rr * 0.9} r={i % 7 === 0 ? 3.5 : 1.8} fill="#fff" fillOpacity=".8" style={fade(0, 0.1)} />; })}</g>
    <circle cx="800" cy="130" r="5" fill="#fff" style={glow('#fff', 12)} />
    <line x1="0" y1="740" x2="1600" y2="740" stroke="#fff" strokeOpacity=".4" />
    {A(6).map((i) => { const w = 760 - i * 112, t = 0.06 + i * 0.08; return <Box key={i} x={800 - w / 2} y={740 - (i + 1) * 78} w={w} h={78} c={i % 2 ? '#d7b97a' : '#c9a762'} d={0.14} style={rise(t, t + 0.12)} />; })}
    <path d="M800 740V860H500V810H1100V860" stroke="#2dd4bf" strokeWidth="5" fill="none" pathLength={1} style={both(draw(0.6, 0.9), glow('#2dd4bf', 12))} />
    {A(18).map((i) => <rect key={i} x={520 + i * 32} y="822" width="14" height="14" fill="#2dd4bf" style={pop(0.7 + i * 0.012, 0.76 + i * 0.012)} />)}</Svg>);

/** 11 — The Sphinx: dunes slide away, the sun rises due east, the dream stele appears. */
export const SphinxScene: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><g style={move(0, 0.55, 0, -360)}><circle cx="1330" cy="760" r="90" fill={c} style={glow(c, 70)} /></g>
    <g style={rise(0.1, 0.5)}><g fill="#d8b878" fillOpacity=".5" stroke="#f1d8a0" strokeWidth="2.5">
      <rect x="220" y="600" width="720" height="170" rx="30" fill="url(#g-cyl)" fillOpacity=".5" /><ellipse cx="300" cy="640" rx="130" ry="90" /><rect x="880" y="480" width="150" height="300" rx="20" />
      <circle cx="960" cy="400" r="86" /><polygon points="860,360 1060,360 1120,640 1000,520 920,520 800,640" fill={c} fillOpacity=".4" /><rect x="900" y="740" width="290" height="40" rx="14" /></g></g>
    <path d="M-20 720Q300 660 600 730T1200 700T1620 740V900H-20Z" fill="#c2965c" style={{ transform: `translateY(calc(${k(0.08, 0.5)} * 340px))` }} />
    <ellipse cx="560" cy="770" rx="60" ry="14" fill="#fff" fillOpacity=".5" style={{ opacity: S(`calc(${k(0.12, 0.3)} * (1 - ${k(0.34, 0.46)}))`) }} />
    <g style={fade(0.62, 0.78)}><rect x="1220" y="620" width="110" height="160" fill="#8a8a82" stroke="#fff" strokeOpacity=".6" />{A(5).map((i) => <line key={i} x1="1236" x2="1314" y1={645 + i * 26} y2={645 + i * 26} stroke="#fff" strokeOpacity=".6" />)}</g>
    <path d="M0 800H1600" stroke="#fff" strokeOpacity=".4" /></Svg>);

/** 12 — Rosetta: three scripts, a cartouche, and the name decoded letter by letter. */
export const Scripts: React.FC<SceneProps> = ({ c }) => {
  const L = ['P', 'T', 'O', 'L', 'M', 'Y', 'S'];
  return (<Svg c={c}><path d="M420 120H1060L1180 220V740H420Z" fill="#6b7075" stroke="#ddd" strokeWidth="2.5" style={fade(0, 0.14)} filter="url(#f-bevel)" /><path d="M420 120H1060L1180 220V740H420Z" fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.55 }} />
    <g style={{ transform: 'translateX(0)' }}>{A(5).map((i) => <g key={i} style={pop(0.12 + i * 0.05, 0.2 + i * 0.05)}>{i % 3 === 0 && <><ellipse cx={500 + i * 120} cy="230" rx="38" ry="18" fill="none" stroke="#fff" strokeWidth="3" /><circle cx={500 + i * 120} cy="230" r="8" fill="#fff" /></>}
      {i % 3 === 1 && <><circle cx={500 + i * 120} cy="212" r="18" fill="none" stroke="#fff" strokeWidth="4" /><path d={`M${500 + i * 120} 230V290M${474 + i * 120} 252H${526 + i * 120}`} stroke="#fff" strokeWidth="4" /></>}
      {i % 3 === 2 && <path d={`M${460 + i * 120} 220q20 -26 40 0t40 0M${460 + i * 120} 252q20 -26 40 0t40 0`} stroke="#fff" strokeWidth="4" fill="none" />}</g>)}</g>
    {A(4).map((i) => <path key={i} d={`M460 ${400 + i * 36}q40 -26 80 0t80 0t80 0t80 0t80 0t80 0t80 0`} stroke="#d8d2b8" strokeWidth="2.5" fill="none" pathLength={1} style={draw(0.34 + i * 0.04, 0.5 + i * 0.04)} />)}
    {['ΒΑΣΙΛΕΥΟΝΤΟΣ ΤΟΥ ΝΕΟΥ', 'ΠΤΟΛΕΜΑΙΟΥ ΑΙΩΝΟΒΙΟΥ', 'ΗΓΑΠΗΜΕΝΟΥ ΥΠΟ ΤΟΥ'].map((t, i) => <text key={i} x="470" y={620 + i * 38} fill="#fff" fillOpacity=".8" fontSize="26" fontFamily="serif" style={fade(0.5 + i * 0.05, 0.6 + i * 0.05)}>{t}</text>)}
    <rect x="450" y="170" width="640" height="150" rx="75" fill="none" stroke={c} strokeWidth="5" pathLength={1} style={both(draw(0.58, 0.72), glow(c, 14))} />
    {L.map((l, i) => <g key={i} style={pop(0.72 + i * 0.035, 0.8 + i * 0.035)}><rect x={1230 + (i % 2) * 120 - 20} y={150 + Math.floor(i / 2) * 130} width="100" height="100" rx="14" fill={c} fillOpacity=".9" /><text x={1280 + (i % 2) * 120 - 20} y={218 + Math.floor(i / 2) * 130} textAnchor="middle" fontSize="60" fontWeight="800" fill="#111" fontFamily="sans-serif">{l}</text></g>)}</Svg>);
};

/** 13 — Alexandria: shelves fill with scrolls, go dark, and a sun disc rises on the same shore. */
export const Scrolls: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><g style={fadeOut(0.52, 0.66)}>{A(4).map((row) => <g key={row}><line x1="160" x2="1440" y1={260 + row * 150} y2={260 + row * 150} stroke="#c8a870" strokeWidth="4" />{A(16).map((i) => <rect key={i} x={170 + i * 78} y={190 + row * 150} width="56" height="64" rx="20" fill="#e8d3a0" fillOpacity=".75" stroke="#fff" strokeOpacity=".4" style={pop(0.04 + (row * 16 + i) * 0.0065, 0.1 + (row * 16 + i) * 0.0065)} />)}</g>)}</g>
    <g style={{ transform: `translateY(calc((1 - ${k(0.62, 0.92)}) * 520px))` }}><g style={{ transformOrigin: '800px 450px' }}><ellipse cx="800" cy="450" rx="330" ry="330" fill={c} fillOpacity=".25" stroke={c} strokeWidth="5" style={{ ...glow(c, 30), transform: 'rotate(-16deg)', transformOrigin: '800px 450px' }} />
      <circle cx="800" cy="450" r="270" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="4 12" style={{ ...spin(0.25), transformOrigin: '800px 450px', transformBox: 'view-box' as never }} /></g></g>
    {A(3).map((i) => <path key={i} d={`M0 ${820 + i * 24}q100 -26 200 0t200 0t200 0t200 0t200 0t200 0t200 0t200 0`} stroke="#6ec6ff" strokeOpacity={0.6 - i * 0.15} strokeWidth="3" fill="none" style={{ transform: `translateX(calc(var(--p) * ${-160 - i * 60}px))` }} />)}</Svg>);

/** 14 — Al-Azhar: learners gather under keel arches while minarets rise through the centuries. */
export const Arches: React.FC<SceneProps> = ({ c }) => {
  const r = rnd(4);
  return (<Svg c={c}><circle cx="800" cy="500" r="320" fill={c} fillOpacity=".12" style={fade(0, 0.2)} />
    {[300, 520, 800, 1080, 1300].map((x, i) => { const h = 300 + (i % 3) * 60, t = 0.4 + i * 0.07; return <g key={i} style={rise(t, t + 0.18)}><Cyl x={x - 22} y={760 - h} w={44} h={h} c="#e0cfa6" /><circle cx={x} cy={754 - h} r="20" fill={c} fillOpacity=".7" /><path d={`M${x - 8} ${700 - h}a14 14 0 1 0 14 -20a10 10 0 1 1 -14 20z`} fill="#fff" style={fade(t + 0.17, t + 0.2)} /></g>; })}
    {A(7).map((i) => <path key={i} d={`M${130 + i * 205} 840V700Q${130 + i * 205 + 100} 560 ${130 + i * 205 + 200} 700V840`} stroke={c} strokeWidth="5" fill="none" pathLength={1} style={draw(0.02 + i * 0.06, 0.22 + i * 0.06)} />)}
    {A(7).map((i) => { const d = `M${130 + i * 205} 840V700Q${130 + i * 205 + 100} 560 ${130 + i * 205 + 200} 700V840`; return <g key={'s' + i} style={rise(0.02 + i * 0.06, 0.22 + i * 0.06)}><path d={d} stroke="#d9c6a0" strokeWidth="30" fill="none" /><path d={d} stroke="url(#p-brick)" strokeWidth="30" fill="none" opacity=".6" /><path d={d} stroke="#fff" strokeOpacity=".3" strokeWidth="3" fill="none" transform="translate(-11 0)" /><path d={d} stroke="#000" strokeOpacity=".35" strokeWidth="3" fill="none" transform="translate(12 0)" /></g>; })}
    {A(26).map((i) => { const a = r() * 6.28, d = 520 + r() * 300, fx = 800 + Math.cos((i / 26) * 6.28) * 150, fy = 700 + Math.sin((i / 26) * 6.28) * 28; const sx = 800 + Math.cos(a) * d, sy = 640 + Math.sin(a) * 160;
      return <circle key={i} cx="0" cy="0" r="7" fill="#fff" style={{ transform: `translate(calc(${sx}px + (${fx - sx}px * ${k(0.14, 0.62)})), calc(${sy}px + (${fy - sy}px * ${k(0.14, 0.62)})))`, ...glow('#fff', 6) }} />; })}</Svg>);
};

/** 15 — The Citadel: walls and bastions rise, a spiral well drills 85 m, the alabaster mosque crowns it. */
export const Fortress: React.FC<SceneProps> = ({ c }) => {
  const sp = Array.from({ length: 90 }, (_, i) => { const t = i / 89 * Math.PI * 7, rr = 28 + t * 9; return `${i ? 'L' : 'M'}${1310 + Math.cos(t) * rr} ${250 + Math.sin(t) * rr * 0.3 + t * 18}`; }).join('');
  return (<Svg c={c}><g style={rise(0.04, 0.46)}>{A(4).map((row) => <g key={row}>{A(14).map((i) => <Box key={i} x={60 + i * 62 + (row % 2) * 31} y={640 - row * 46} w={58} h={42} c="#cdb88e" d={0.12} shadow={false} tex={0.5} />)}</g>)}
    {[140, 430, 720].map((x) => <g key={x}><Box x={x} y={380} w={120} h={260} c="#d4bf93" d={0.3} />{A(5).map((i) => <rect key={i} x={x + i * 26} y="360" width="16" height="22" fill="#d9c6a0" fillOpacity=".5" />)}</g>)}</g>
    <path d={sp} stroke={c} strokeWidth="5" fill="none" pathLength={1} style={both(draw(0.46, 0.82), glow(c, 8))} />
    <circle cx="1310" cy="660" r="26" fill="#6ec6ff" style={pop(0.8, 0.9)} />
    <g style={rise(0.82, 1)}><path d="M960 640Q1030 480 1100 640Z" fill="#f4f1e6" /><path d="M960 640Q1030 480 1100 640Z" fill="url(#g-sphere)" /><rect x="935" y="480" width="22" height="160" fill="#f4f1e6" /><rect x="1103" y="480" width="22" height="160" fill="#f4f1e6" /><path d="M946 480l0-40 M1114 480l0-40" stroke="#f4f1e6" strokeWidth="6" /></g></Svg>);
};

/** 16 — Suez 1869: the 7,000 km detour fades, the straight cut lights up, fireworks close the night. */
export const Isthmus: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><g><path d="M300 250Q420 200 600 260Q700 360 660 560Q600 760 480 820Q380 780 340 600Q260 420 300 250Z" fill="#b89458" stroke="#e8d7b0" strokeWidth="2" /><path d="M300 250Q420 200 600 260Q700 360 660 560Q600 760 480 820Q380 780 340 600Q260 420 300 250Z" fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.55 }} /><path d="M300 250Q420 200 600 260Q700 360 660 560Q600 760 480 820Q380 780 340 600Q260 420 300 250Z" fill="url(#p-hatch)" opacity=".18" /><path d="M300 250Q420 200 600 260Q700 360 660 560Q600 760 480 820Q380 780 340 600Q260 420 300 250Z" fill="url(#g-vert)" /></g>
    <g><path d="M820 220Q1100 150 1400 260Q1520 380 1400 560Q1250 620 1100 560Q900 520 820 400Z" fill="#b89458" stroke="#e8d7b0" strokeWidth="2" /><path d="M820 220Q1100 150 1400 260Q1520 380 1400 560Q1250 620 1100 560Q900 520 820 400Z" fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.55 }} /><path d="M820 220Q1100 150 1400 260Q1520 380 1400 560Q1250 620 1100 560Q900 520 820 400Z" fill="url(#p-hatch)" opacity=".18" /><path d="M820 220Q1100 150 1400 260Q1520 380 1400 560Q1250 620 1100 560Q900 520 820 400Z" fill="url(#g-vert)" /></g>
    <path d="M640 200C140 60 80 700 470 860C900 960 1060 700 870 440" stroke="#ff8a5c" strokeWidth="5" strokeDasharray="14 12" fill="none" pathLength={1} style={{ ...draw(0.02, 0.32), opacity: S(`calc(1 - ${k(0.44, 0.58)})`) }} />
    <path d="M700 290L830 320" stroke={c} strokeWidth="9" fill="none" pathLength={1} style={both(draw(0.5, 0.68), glow(c, 20))} />
    <g style={pop(0.68, 0.8)}><text x="780" y="170" textAnchor="middle" fontSize="64" fontWeight="800" fill="#fff" fontFamily="sans-serif">−7,000 KM</text></g>
    {[[1050, 700], [1230, 640], [1390, 720], [420, 600], [1190, 780]].map(([x, y], b) => <g key={b}>{A(14).map((i) => { const a = (i / 14) * 6.28; const t = 0.78 + b * 0.04; return <line key={i} x1={x} y1={y} x2={x + Math.cos(a) * 90} y2={y + Math.sin(a) * 90} stroke={i % 2 ? c : '#fff'} strokeWidth="3" strokeLinecap="round" pathLength={1} style={{ ...draw(t, t + 0.08), opacity: S(`calc(1 - ${k(t + 0.1, t + 0.2)})`) }} />; })}</g>)}</Svg>);
