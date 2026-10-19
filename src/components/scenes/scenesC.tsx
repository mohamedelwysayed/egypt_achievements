import React from 'react';
import { Svg, k, rise, sweep, fade, fadeOut, draw, move, pop, spin, both, glow, rnd, SceneProps , Face, Box, Cyl, Orb, Ground, tones, dark, lite } from './shared';
import { A } from './scenesA';
const S = (v: string) => v as unknown as number;

/** 17 — Aswan High Dam: wall rises, Lake Nasser fills, temples lift, turbines spin, villages light up. */
export const Dam: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><g style={rise(0.04, 0.34)}><Face pts="560,800 640,420 1000,420 1090,800" fill="#9aa0a6" shade="url(#g-vert)" stroke="#fff" tex={0.6} /><Face pts="1000,420 1090,800 1190,780 1100,430" fill="#5c6168" tex={0.5} /><Face pts="640,420 1000,420 1100,430 740,432" fill="#c4c9cf" /></g>
    <g style={{ transform: `scaleY(${k(0.3, 0.72)})`, transformOrigin: '0 800px', transformBox: 'view-box' as never }}><rect x="0" y="470" width="640" height="330" fill="#2b8ad0" fillOpacity=".6" /><path d="M0 470q40 -16 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0" stroke="#bfe6ff" strokeWidth="4" fill="none" /></g>
    <g style={move(0.5, 0.82, 0, -90)}><Box x={250} y={400} w={90} h={70} c="#d8b878" d={0.3} /><Face pts="240,400 295,350 350,400" fill="#e6c98e" shade="url(#g-vert)" /></g>
    {A(4).map((i) => <g key={i} style={fade(0.34 + i * 0.03, 0.44 + i * 0.03)}><circle cx={720 + i * 80} cy="720" r="30" fill="#111" stroke={c} strokeWidth="3" /><g style={{ ...spin(10 + i * 2), transformOrigin: `${720 + i * 80}px 720px`, transformBox: 'view-box' as never }}>{A(3).map((j) => <line key={j} x1={720 + i * 80} y1="720" x2={720 + i * 80} y2="694" stroke={c} strokeWidth="5" strokeLinecap="round" transform={`rotate(${j * 120} ${720 + i * 80} 720)`} />)}</g></g>)}
    {A(18).map((i) => <circle key={i} cx={1180 + (i % 6) * 70} cy={740 + Math.floor(i / 6) * 40} r="7" fill="#ffd166" style={both(pop(0.7 + i * 0.015, 0.76 + i * 0.015), glow('#ffb400', 14))} />)}
    <path d="M1090 520H1560" stroke={c} strokeWidth="3" strokeDasharray="10 12" fill="none" style={fade(0.62, 0.72)} /></Svg>);

/** 18 — Kadesh: chariots meet, the war fades, two silver tablets close the seam. */
export const Tablets: React.FC<SceneProps> = ({ c }) => {
  const ch = (x: number, flip: boolean) => <g transform={`translate(${x} 0) ${flip ? 'scale(-1 1)' : ''}`}><rect x="0" y="620" width="140" height="50" rx="8" fill="#d8b878" /><circle cx="30" cy="688" r="26" fill="none" stroke="#fff" strokeWidth="5" /><circle cx="110" cy="688" r="26" fill="none" stroke="#fff" strokeWidth="5" /><path d="M140 640L240 610" stroke="#fff" strokeWidth="4" /></g>;
  return (<Svg c={c}><g style={{ ...fadeOut(0.36, 0.5) }}><g style={{ transform: `translateX(calc(${k(0.02, 0.36)} * 480px))` }}>{ch(60, false)}</g><g style={{ transform: `translateX(calc(${k(0.02, 0.36)} * -480px))` }}>{ch(1540, true)}</g>
    {A(10).map((i) => <circle key={i} cx={300 + i * 110} cy="710" r={16 + (i % 3) * 8} fill="#d8b878" fillOpacity=".3" style={fade(0.1, 0.2)} />)}</g>
    <g style={{ transform: `translateX(calc(${k(0.5, 0.76)} * 190px))` }}><Box x={380} y={180} w={230} h={520} c="#cfd4da" d={0.12} tex={0.35} />{A(8).map((i) => <path key={i} d={`M405 ${230 + i * 56}H585`} stroke="#555" strokeWidth="6" pathLength={1} style={draw(0.58 + i * 0.015, 0.7 + i * 0.015)} />)}</g>
    <g style={{ transform: `translateX(calc(${k(0.5, 0.76)} * -190px))` }}><Box x={990} y={180} w={230} h={520} c="#cfd4da" d={0.12} tex={0.35} />{A(8).map((i) => <path key={i} d={`M1015 ${230 + i * 56}H1195`} stroke="#555" strokeWidth="6" pathLength={1} style={draw(0.58 + i * 0.015, 0.7 + i * 0.015)} />)}</g>
    <line x1="800" y1="160" x2="800" y2="720" stroke={c} strokeWidth="6" style={both(fade(0.76, 0.86), glow(c, 24))} />
    <path d="M620 140Q800 40 980 140M700 110l-30 -30M800 80V30M900 110l30 -30" stroke="#8fd14f" strokeWidth="5" fill="none" strokeLinecap="round" pathLength={1} style={draw(0.86, 1)} /></Svg>);
};

/** 19 — Fayum: a portrait is painted in wax, the wreath is gilded, the eyes open. */
export const Portrait: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><circle cx="800" cy="440" r="380" fill={c} fillOpacity=".12" style={fade(0, 0.2)} />
    <rect x="540" y="110" width="520" height="680" rx="16" fill="#6b4a2a" fillOpacity=".6" stroke="#d8b878" strokeWidth="5" pathLength={1} style={draw(0, 0.16)} />
    {A(6).map((i) => <ellipse key={i} cx="800" cy="400" rx={150 - i * 10} ry={190 - i * 12} fill="none" stroke="#e8c49a" strokeWidth="3.5" strokeOpacity={0.35 + i * 0.1} pathLength={1} style={draw(0.14 + i * 0.05, 0.3 + i * 0.05)} />)}
    <path d="M610 790Q640 600 800 580Q960 600 990 790" fill="#e8c49a" fillOpacity=".35" stroke="#e8c49a" strokeWidth="3" pathLength={1} style={draw(0.34, 0.56)} />
    {A(20).map((i) => { const a = Math.PI + (i / 19) * Math.PI; return <ellipse key={i} cx={800 + Math.cos(a) * 190} cy={380 + Math.sin(a) * 230} rx="16" ry="8" fill={c} transform={`rotate(${(a * 180) / Math.PI + 90} ${800 + Math.cos(a) * 190} ${380 + Math.sin(a) * 230})`} style={both(pop(0.56 + i * 0.01, 0.62 + i * 0.01), glow(c, 8))} />; })}
    {[-62, 62].map((dx, i) => <g key={i} style={{ transform: `scaleY(${k(0.78, 0.9)})`, transformOrigin: `${800 + dx}px 400px`, transformBox: 'view-box' as never }}><ellipse cx={800 + dx} cy="400" rx="34" ry="16" fill="#fff" /><circle cx={800 + dx} cy="400" r="12" fill="#2a1a10" /></g>)}</Svg>);

/** 20 — Saint Catherine: the bush burns without being consumed; walls and a covenant protect the monks. */
export const Bush: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><polygon points="400,780 780,260 960,380 1180,160 1560,780" fill="#6a5a48" fillOpacity=".55" stroke="#fff" strokeOpacity=".3" style={rise(0, 0.2)} />
    <g style={rise(0.18, 0.46)}><rect x="760" y="560" width="640" height="220" fill="#d9c6a0" fillOpacity=".4" stroke="#fff" strokeOpacity=".5" />{A(12).map((i) => <rect key={i} x={760 + i * 54} y="540" width="30" height="24" fill="#d9c6a0" fillOpacity=".5" />)}<path d="M1000 560Q1080 440 1160 560Z" fill="#f4f1e6" /></g>
    {A(7).map((i) => <path key={i} d={`M${240 + i * 26} 780Q${230 + i * 26} ${660 - (i % 3) * 40} ${250 + i * 26} ${560 - (i % 4) * 30}`} stroke="#4a7a2a" strokeWidth="6" fill="none" />)}
    {A(9).map((i) => <path key={i} d="M0 0c-26 -30 -26 -70 0 -110c26 40 26 80 0 110z" fill={i % 2 ? '#ffb02e' : c} style={{ transform: `translate(${230 + i * 22}px, ${670 - (i % 3) * 34}px) scale(calc(0.9 + 0.2 * sin(calc(var(--p) * 90 + ${i * 1.7}))), calc(0.9 + 0.3 * sin(calc(var(--p) * 110 + ${i * 2.3}))))`, opacity: S(`calc(${k(0.02 + i * 0.012, 0.1 + i * 0.012)})`), ...glow('#ff8a1e', 14) }} />)}
    <g style={both(pop(0.62, 0.78), glow(c, 18))}><ellipse cx="1480" cy="300" rx="52" ry="62" fill="#f1d8a0" />{A(5).map((i) => <rect key={i} x={1432 + i * 20} y={170 - (i % 4 === 0 ? 0 : i === 2 ? 20 : 0)} width="16" height="90" rx="8" fill="#f1d8a0" />)}</g>
    <g style={fade(0.84, 1)}>{A(4).map((i) => <rect key={i} x={620 + i * 6} y={300 - i * 14} width="170" height="22" rx="4" fill="#e8d3a0" stroke="#fff" strokeOpacity=".4" />)}</g></Svg>);

/** 21 — Benban: panels unfold in perspective, the sun arcs overhead, power runs north. */
export const Solar: React.FC<SceneProps> = ({ c }) => {
  const rows = 6, cols = 12, panels: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) { const t = r / (rows - 1), y = 520 + t * 330, h = 36 + t * 70, wTop = 640 + t * 760, wBot = 640 + (t + 0.2) * 760, step = (wBot / cols);
    for (let i = 0; i < cols; i++) { const xa = 800 - wTop / 2 + i * (wTop / cols), xb = 800 - wBot / 2 + i * (wBot / cols), w1 = (wTop / cols) * 0.84, w2 = (wBot / cols) * 0.84; const d = 0.04 + r * 0.05 + Math.abs(i - 5.5) * 0.012;
      panels.push(<polygon key={`${r}-${i}`} points={`${xa},${y} ${xa + w1},${y} ${xb + w2},${y + h} ${xb},${y + h}`} fill="#2f6fd0" stroke="#9fc4ff" strokeWidth={0.8 + t} style={pop(d, d + 0.1)} />); panels.push(<polygon key={`g${r}-${i}`} points={`${xa},${y} ${xa + w1},${y} ${xb + w2},${y + h} ${xb},${y + h}`} fill="url(#g-glass)" style={pop(d, d + 0.1)} />); void step; } }
  return (<Svg c={c}><path d="M-20 520H1620" stroke="#fff" strokeOpacity=".4" />
    <g style={{ transform: `translate(calc(${k(0, 1)} * 1300px - 200px), calc(sin(calc(var(--p) * 3.14159)) * -330px + 340px))` }}><circle r="62" fill={c} style={glow(c, 60)} /></g>
    {panels}
    <rect x="-300" y="500" width="240" height="420" fill="#fff" style={{ transform: `translateX(calc(${k(0.62, 0.92)} * 2100px)) skewX(-22deg)`, opacity: 0.2 }} />
    <path d="M1480 520V340M1400 380H1560M1480 340L1300 440M1480 340L1600 440" stroke="#fff" strokeWidth="4" fill="none" pathLength={1} style={draw(0.7, 0.86)} />
    <path d="M1300 440Q1100 500 900 460" stroke={c} strokeWidth="3" strokeDasharray="10 10" fill="none" style={{ strokeDashoffset: S(`calc(var(--p) * -420)`), ...fade(0.72, 0.84), ...glow(c, 10) }} /></Svg>);
};

/** 22 — High-speed rail: stations light along the corridor and a train crosses it. */
export const Rail: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><path d="M-20 700H1620M-20 724H1620" stroke="#cfd6e4" strokeWidth="4" fill="none" pathLength={1} style={draw(0, 0.16)} />
    {A(40).map((i) => <line key={i} x1={i * 42} x2={i * 42 + 12} y1="696" y2="728" stroke="#cfd6e4" strokeOpacity=".4" strokeWidth="4" style={fade(0.04 + i * 0.002, 0.14 + i * 0.002)} />)}
    {A(8).map((i) => <g key={i} style={rise(0.02, 0.22)}><line x1={110 + i * 210} x2={110 + i * 210} y1="540" y2="700" stroke="#fff" strokeOpacity=".6" strokeWidth="5" /><line x1={80 + i * 210} x2={220 + i * 210} y1="548" y2="548" stroke="#fff" strokeOpacity=".6" strokeWidth="4" /></g>)}
    {A(20).map((i) => <g key={i}><circle cx={60 + i * 78} cy="780" r="12" fill={c} style={both(pop(0.2 + i * 0.03, 0.26 + i * 0.03), glow(c, 16))} /><circle cx={60 + i * 78} cy="780" r="22" fill="none" stroke={c} strokeOpacity=".5" style={pop(0.24 + i * 0.03, 0.3 + i * 0.03)} /></g>)}
    <g style={{ transform: `translateX(calc(${k(0.3, 0.95)} * 1400px - 800px))` }}><path d="M0 700V620Q10 560 80 548H640Q760 560 800 640V700Z" fill="url(#g-metal)" /><rect x="0" y="650" width="800" height="12" fill={c} /><path d="M0 700V620Q10 560 80 548H640Q760 560 800 640V700Z" fill="url(#g-vert)" />{A(11).map((i) => <rect key={i} x={50 + i * 56} y="580" width="38" height="34" rx="8" fill="#0d1530" />)}
      {A(6).map((i) => <rect key={i} x={-20 - i * 70} y={600 + i * 16} width="110" height="3" fill="#fff" fillOpacity=".5" />)}</g></Svg>);

/** 23 — Decent Life: villages appear, water runs through them, lights come on, services arrive. */
export const Village: React.FC<SceneProps> = ({ c }) => {
  const r = rnd(21);
  return (<Svg c={c}><path d="M-20 780Q400 740 800 780T1620 770" stroke="#6ec6ff" strokeWidth="14" fill="none" pathLength={1} style={draw(0.28, 0.58)} />
    {A(18).map((i) => { const x = 90 + (i % 9) * 168, y = 520 + Math.floor(i / 9) * 150 + r() * 24, w = 90 + r() * 30, t = 0.04 + i * 0.02;
      return <g key={i} style={pop(t, t + 0.1)}><Box x={x} y={y} w={w} h={80} c="#ecd9b4" d={0.28} /><Face pts={`${x - 8},${y} ${x + w / 2},${y - 40} ${x + w + 8},${y}`} fill="#b8794a" shade="url(#g-vert)" /><rect x={x + 16} y={y + 24} width="22" height="22" fill="#ffd166" style={{ ...fade(0.58 + i * 0.012, 0.66 + i * 0.012), ...glow('#ffb400', 10) }} /></g>; })}
    <g style={both(pop(0.7, 0.82), glow(c, 14))}><rect x="1260" y="190" width="150" height="130" fill="#fff" /><rect x="1318" y="212" width="34" height="86" fill="#e23b3b" /><rect x="1292" y="238" width="86" height="34" fill="#e23b3b" /></g>
    <g style={both(pop(0.76, 0.88), glow(c, 14))}><rect x="1010" y="220" width="190" height="100" fill="#f1e2c4" /><polygon points="1000,220 1105,150 1210,220" fill={c} /></g>
    {A(40).map((i) => <circle key={i} cx={90 + (i % 20) * 72} cy={100 + Math.floor(i / 20) * 44} r="6" fill={c} style={both(pop(0.5 + i * 0.01, 0.56 + i * 0.01), glow(c, 8))} />)}</Svg>);
};
