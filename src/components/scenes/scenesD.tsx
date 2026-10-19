import React from 'react';
import { Svg, k, rise, sweep, fade, fadeOut, draw, move, pop, both, glow, rnd, Face, Box, Cyl, Orb, Ground, tones, dark, lite, SceneProps } from './shared';
const A = (n: number) => Array.from({ length: n }, (_, i) => i);
const S = (v: string) => v as unknown as number;
const Stars: React.FC<{ n?: number; seed?: number; h?: number }> = ({ n = 46, seed = 3, h = 520 }) => { const r = rnd(seed); return <>{A(n).map((i) => <circle key={i} cx={r() * 1600} cy={r() * h} r={r() * 1.8 + 0.5} fill="#fff" style={{ opacity: S(`calc(${(0.25 + r() * 0.75).toFixed(2)} * ${k(0, 0.12)})`) }} />)}</>; };
const Tex: React.FC<{ d: string; o?: number }> = ({ d, o = 0.4 }) => <path d={d} fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: o }} />;

/** 01 — Great Pyramid, drawn with masonry courses, joints, lit/shaded faces, pyramidion, far pyramids and dunes. */
export const Pyramid: React.FC<SceneProps> = ({ c }) => {
  const N = 14, base = 920, H = 520, y0 = 790, tn = tones('#dcb86f');
  const joints = (i: number, ya: number, yb: number, w0: number, w1: number) => { let d = ''; const n = Math.max(1, Math.floor(w0 / 2 / 46));
    for (let j = 1; j < n; j++) { const f = j / n + ((i % 2) * 0.5) / n; d += `M${800 - (w0 / 2) * f} ${ya}L${800 - (w1 / 2) * f} ${yb}M${800 + (w0 / 2) * f} ${ya}L${800 + (w1 / 2) * f} ${yb}`; } return d; };
  return (<Svg c={c}><Stars />
    <g style={fade(0, 0.1)}><Face pts="170,790 330,610 490,790" fill="#8b7653" shade="url(#g-vert)" tex={0.4} /><Face pts="330,610 490,790 330,790" fill="#54452e" hatch={0.5} />
      <Face pts="1150,790 1290,650 1430,790" fill="#8b7653" shade="url(#g-vert)" tex={0.4} /><Face pts="1290,650 1430,790 1290,790" fill="#54452e" hatch={0.5} /></g>
    {A(N).map((i) => { const w0 = base * (1 - i / N), w1 = base * (1 - (i + 1) / N), ya = y0 - (i * H) / N, yb = y0 - ((i + 1) * H) / N, t = 0.06 + i * 0.04;
      return <g key={i} style={rise(t, t + 0.1)}><Face pts={`${800 - w0 / 2},${ya} 800,${ya} 800,${yb} ${800 - w1 / 2},${yb}`} fill={tn.top} shade="url(#g-vert)" stroke={tn.edge} tex={0.5} />
        <Face pts={`800,${ya} ${800 + w0 / 2},${ya} ${800 + w1 / 2},${yb} 800,${yb}`} fill={tn.side} stroke={dark(c, 1.5)} tex={0.5} hatch={0.55} />
        <path d={joints(i, ya, yb, w0, w1)} stroke="#000" strokeOpacity=".3" fill="none" /><path d={`M${800 - w0 / 2} ${ya}H${800 + w0 / 2}`} stroke="#fff" strokeOpacity=".28" /></g>; })}
    <path d="M800 270L772 540L800 790" stroke="#fff" strokeOpacity=".18" fill="none" />
    <polygon points="800,262 788,286 812,286" fill="url(#g-gold)" style={fade(0.6, 0.7)} />
    <g style={fade(0, 0.1)}><path d="M-20 790Q260 764 560 800T1160 792T1620 804V900H-20Z" fill="#9a7a45" /><Tex d="M-20 790Q260 764 560 800T1160 792T1620 804V900H-20Z" o={0.5} /><path d="M-20 790Q260 764 560 800T1160 792T1620 804V900H-20Z" fill="url(#g-vert)" />
      <path d="M-20 850Q380 810 820 856T1620 836V900H-20Z" fill="#4f3a20" /><Tex d="M-20 850Q380 810 820 856T1620 836V900H-20Z" o={0.5} /><path d="M120 800q80 -14 160 0M900 818q100 -16 200 0" stroke="#fff" strokeOpacity=".2" fill="none" /></g>
    <line x1="800" y1={y0 - H - 8} x2="800" y2="60" stroke={c} strokeWidth="2" strokeDasharray="6 10" style={fade(0.66, 0.78)} />
    <g style={both(pop(0.76, 0.88), glow(c, 18))}><circle cx="800" cy="60" r="9" fill="#fff" /><path d="M800 28V92M768 60H832" stroke="#fff" strokeWidth="1.5" /></g>
    <ellipse cx="800" cy={y0 + 4} rx="600" ry="30" fill="none" stroke={c} strokeWidth="1.5" style={fade(0.88, 1)} /></Svg>);
};

/** 03 — The mask: lapis-striped nemes, kohl-lined eyes, modelled nose and lips, braided beard, beaded collar. */
export const Mask: React.FC<SceneProps> = ({ c }) => {
  const N = 'M610 200H990L1090 520L1040 800L900 760H700L560 800L510 520Z', blue = '#1d3f9a';
  const eye = (m: number) => <g transform={`translate(${m < 0 ? 0 : 1600}) scale(${m} 1)`}><path d="M672 470Q730 430 790 466Q730 494 672 470Z" fill="#f4efe0" stroke="#111" strokeWidth="7" strokeLinejoin="round" /><circle cx="738" cy="466" r="13" fill="#171210" /><circle cx="742" cy="461" r="4" fill="#fff" /><path d="M672 470L636 488" stroke="#111" strokeWidth="7" strokeLinecap="round" /><path d="M690 432Q740 398 786 424" stroke={blue} strokeWidth="16" fill="none" strokeLinecap="round" /></g>;
  return (<Svg c={c}><g style={fadeOut(0.02, 0.24)}><ellipse cx="800" cy="470" rx="26" ry="64" fill="#ffd27a" style={glow('#ffb347', 36)} /><rect x="797" y="520" width="6" height="90" fill="#fff" fillOpacity=".5" /></g>
    <g style={rise(0.18, 0.62)}><g style={glow(c, 22)}>
      {[300, 262, 224, 186].map((rx, i) => <path key={i} d={`M${800 - rx} 744A${rx} ${rx * 0.46} 0 0 0 ${800 + rx} 744`} stroke={['#f2c94c', '#2dd4bf', '#d9532f', blue][i]} strokeWidth="26" fill="none" />)}
      {A(26).map((i) => { const a = (i / 25) * Math.PI; return <ellipse key={i} cx={800 - Math.cos(a) * 312} cy={744 + Math.sin(a) * 144} rx="7" ry="13" fill="url(#g-gold)" transform={`rotate(${(a * 180) / Math.PI - 90} ${800 - Math.cos(a) * 312} ${744 + Math.sin(a) * 144})`} />; })}
      <path d="M488 744A312 143 0 0 0 1112 744" stroke="#000" strokeOpacity=".3" strokeWidth="26" fill="none" /><path d="M488 744A312 143 0 0 0 1112 744" stroke="url(#g-cyl)" strokeWidth="1" fill="none" />
      <g filter="url(#f-bevel)"><path d={N} fill="url(#g-gold)" /></g>
      <clipPath id="nm"><path d={N} /></clipPath>
      <g clipPath="url(#nm)">{A(15).map((i) => <rect key={i} x="500" y={190 + i * 42} width="600" height="19" fill={blue} opacity=".92" />)}<path d={N} fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.35 }} /><path d={N} fill="url(#g-cyl)" /></g>
      <path d={N} fill="none" stroke="#fff2b0" strokeWidth="3" />
      <path d="M700 700H900L920 800H680Z" fill="none" /><path d="M778 690H822L832 830H768Z" fill={blue} stroke="url(#g-gold)" strokeWidth="3" />{A(8).map((i) => <path key={i} d={`M770 ${706 + i * 15}H830`} stroke="#f2c94c" strokeOpacity=".8" />)}
      <ellipse cx="800" cy="500" rx="165" ry="215" fill="url(#g-gold)" stroke="#fff2b0" strokeWidth="3" /><ellipse cx="800" cy="500" rx="165" ry="215" fill="url(#g-sphere)" /><ellipse cx="800" cy="500" rx="165" ry="215" fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.3 }} />
      <g style={pop(0.72, 0.82)}>{eye(1)}{eye(-1)}</g>
      <path d="M800 468L782 590Q800 604 818 590Z" fill="#000" opacity=".14" /><path d="M800 468L782 590Q800 604 818 590" stroke="#fff" strokeOpacity=".5" fill="none" strokeWidth="3" /><path d="M772 590q6 8 14 2M814 592q8 6 14 -2" stroke="#6e4c0c" strokeWidth="3" fill="none" />
      <path d="M752 648Q800 630 848 648Q800 666 752 648Z" fill="#8a5a14" /><path d="M754 650Q800 684 846 650Q800 664 754 650Z" fill="#d7a436" /><path d="M752 648Q800 630 848 648" stroke="#fff2b0" strokeOpacity=".6" fill="none" />
      <ellipse cx="710" cy="560" rx="34" ry="22" fill="#fff" opacity=".12" /><ellipse cx="890" cy="560" rx="34" ry="22" fill="#000" opacity=".1" /></g></g>
    <g style={both(pop(0.82, 0.92), glow('#fff', 12))}><path d="M800 206c-16 22-16 48 0 66 16-18 16-44 0-66z" fill="url(#g-gold)" stroke="#fff2b0" /><circle cx="800" cy="238" r="5" fill={blue} /><path d="M722 236l78 34-78 18z M878 236l-78 34 78 18z" fill="url(#g-gold)" stroke="#fff2b0" /></g>
    <rect x="-400" y="0" width="260" height="900" fill="#fff" style={{ transform: `translateX(calc(${k(0.84, 1)} * 2200px)) skewX(-18deg)`, opacity: 0.18 }} /></Svg>);
};

/** 08 — Karnak: fluted columns with papyrus capitals, carved hieroglyph bands, painted bands, a darker back row and light shafts. */
export const Columns: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}>{A(3).map((i) => <polygon key={i} points={`${260 + i * 480},0 ${340 + i * 480},0 ${520 + i * 480 - 80},900 ${300 + i * 480},900`} fill="#fff" fillOpacity=".11" style={fade(0.5 + i * 0.08, 0.7 + i * 0.08)} />)}
    {A(15).map((i) => { const x = 130 + i * 92, d = Math.abs(i - 7), h = 380 - d * 10, t = 0.02 + d * 0.03; return <g key={'b' + i} style={rise(t, t + 0.22)} opacity=".55"><Cyl x={x} y={720 - h} w={34} h={h} c="#9c8a68" tex={0.5} /></g>; })}
    <rect x="0" y="740" width="1600" height="160" fill="url(#g-aob)" opacity=".5" />
    {A(16).map((i) => { const x = 90 + i * 92, d = Math.abs(i - 7.5), h = 540 - d * 18, t = 0.04 + d * 0.04, y = 800 - h, col = i % 3 === 0 ? '#2dd4bf' : i % 3 === 1 ? '#e2553d' : c;
      return <g key={i} style={rise(t, t + 0.22)}><Box x={x - 10} y={788} w={70} h={14} c="#c2ad82" d={0.2} bricks={false} /><Cyl x={x} y={y} w={50} h={h} c="#d4bf93" flutes={5} cap />
        <rect x={x} y={y + 70} width="50" height="150" fill="url(#p-hiero)" style={{ mixBlendMode: 'multiply', opacity: 0.55 }} /><rect x={x} y={y + 70} width="50" height="150" fill="url(#g-cyl)" opacity=".6" />
        <rect x={x} y={y + 30} width="50" height="20" fill={col} style={{ opacity: S(`calc(0.85 * ${k(0.8, 0.95)})`) }} /><rect x={x} y={y + 30} width="50" height="20" fill="url(#g-cyl)" /></g>; })}
    <line x1="0" y1="804" x2="1600" y2="804" stroke="#fff" strokeOpacity=".4" /></Svg>);

/** 11 — Great Sphinx: lit/shadow planes, block courses, haunch, paws, nemes, eroded nose, stele with relief. */
export const SphinxScene: React.FC<SceneProps> = ({ c }) => {
  const body = 'M200 780V660Q210 604 300 592H770Q880 588 900 520V780Z', head = 'M868 372Q900 300 965 298Q1032 300 1056 372L1110 650L1008 540H922L812 650Z';
  return (<Svg c={c}><g style={move(0, 0.55, 0, -360)}><circle cx="1330" cy="760" r="90" fill={c} style={glow(c, 70)} /><circle cx="1330" cy="760" r="60" fill="#fff" opacity=".6" /></g>
    <g style={fade(0, 0.1)}><Face pts="1060,790 1250,560 1440,790" fill="#8b7653" shade="url(#g-vert)" /><Face pts="1250,560 1440,790 1250,790" fill="#54452e" hatch={0.5} /></g>
    <g style={rise(0.1, 0.5)}>
      <ellipse cx="760" cy="786" rx="620" ry="20" fill="#000" opacity=".4" />
      <path d={body} fill="#d3ad70" /><Tex d={body} o={0.5} /><path d={body} fill="url(#p-brick)" opacity=".4" /><path d={body} fill="url(#g-vert)" />
      <path d="M200 700Q500 760 900 700V780H200Z" fill="#000" opacity=".3" /><path d="M200 700Q500 760 900 700V780H200Z" fill="url(#p-hatch)" opacity=".5" />
      <ellipse cx="340" cy="690" rx="140" ry="88" fill="#dcb67a" /><ellipse cx="340" cy="690" rx="140" ry="88" fill="url(#g-sphere)" /><path d="M215 690Q340 790 465 690" stroke="#000" strokeOpacity=".3" fill="none" strokeWidth="3" />
      <path d="M300 596Q560 570 880 590" stroke="#fff" strokeOpacity=".4" strokeWidth="3" fill="none" />
      <path d="M880 470H1034V780H880Z" fill="#d3ad70" /><Tex d="M880 470H1034V780H880Z" o={0.5} /><path d="M880 470H1034V780H880Z" fill="url(#g-cyl)" />
      <Box x={1006} y={742} w={190} h={38} c="#d3ad70" d={0.28} /><path d="M1060 742V780M1110 742V780M1160 742V780" stroke="#000" strokeOpacity=".35" />
      <path d={head} fill="#cba264" /><Tex d={head} o={0.45} /><path d={head} fill="url(#p-hatch)" opacity=".28" />
      {A(9).map((i) => <path key={i} d={`M${930 - i * 6} ${340 + i * 34}H${1000 + i * 8}`} stroke="#000" strokeOpacity=".2" />)}
      <path d="M968 300Q1032 300 1056 372L1110 650L1008 540H968Z" fill="#000" opacity=".28" />
      <ellipse cx="962" cy="410" rx="62" ry="78" fill="#dcb67a" /><ellipse cx="962" cy="410" rx="62" ry="78" fill="url(#g-sphere)" /><Tex d="M900 410a62 78 0 1 0 124 0a62 78 0 1 0 -124 0" o={0.4} />
      <path d="M962 400L944 462Q962 474 976 462Z" fill="#5a3f1c" opacity=".55" /><path d="M920 392Q938 382 954 392M976 392Q992 382 1008 392" stroke="#3a2a14" strokeWidth="4" fill="none" /><path d="M930 486Q962 498 996 486" stroke="#6a4a22" strokeWidth="4" fill="none" />
      <path d="M850 430Q900 300 965 298" stroke="#fff" strokeOpacity=".35" strokeWidth="3" fill="none" /></g>
    <path d="M-20 720Q300 660 600 730T1200 700T1620 740V900H-20Z" fill="#b98a4e" style={{ transform: `translateY(calc(${k(0.08, 0.5)} * 340px))` }} />
    <ellipse cx="560" cy="770" rx="60" ry="14" fill="#fff" fillOpacity=".5" style={{ opacity: S(`calc(${k(0.12, 0.3)} * (1 - ${k(0.34, 0.46)}))`) }} />
    <g style={fade(0.62, 0.78)}><Box x={1220} y={620} w={110} h={160} c="#9a9a8e" d={0.2} tex={0.6} hiero /><path d="M1234 650H1316M1234 676H1316" stroke="#fff" strokeOpacity=".4" /></g></Svg>);
};

/** 04 — Canal: lit water with ripples, sand banks, container ships with lit decks, hulls and bridges. */
export const Canal: React.FC<SceneProps> = ({ c }) => {
  const ship = (y: number, col: string, flip: boolean) => <g transform={`translate(0 ${y}) ${flip ? 'scale(-1 1) translate(-170 0)' : ''}`}>
    <ellipse cx="90" cy="92" rx="110" ry="12" fill="#000" opacity=".35" /><Face pts="0,46 170,46 148,88 22,88" fill="#cfd6e0" shade="url(#g-vert)" tex={0.2} /><Face pts="22,88 148,88 144,98 26,98" fill="#a8322a" tex={0.1} />
    <Box x={16} y={8} w={36} h={38} c="#f2f4f8" d={0.25} bricks={false} />{[0, 1].map((r) => A(5).map((i) => <Box key={`${r}${i}`} x={64 + i * 20} y={28 - r * 18} w={18} h={17} c={(i + r) % 2 ? col : c} d={0.3} shadow={false} bricks={false} tex={0.15} />))}
    <path d="M0 96q-40 6 -80 0M0 100q-60 8 -110 2" stroke="#fff" strokeOpacity=".5" fill="none" strokeWidth="2" /></g>;
  return (<Svg c={c}><rect x="0" y="300" width="1600" height="100" fill="#b99660" style={fade(0, 0.1)} /><rect x="0" y="300" width="1600" height="100" fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.5 }} /><rect x="0" y="300" width="1600" height="100" fill="url(#g-aob)" />
    <rect x="0" y="400" width="1600" height="340" fill="url(#g-water)" style={sweep(0, 0.15)} />
    {A(9).map((i) => <path key={i} d={`M0 ${430 + i * 36}q50 -14 100 0t100 0t100 0t100 0t100 0t100 0t100 0t100 0t100 0t100 0t100 0t100 0t100 0t100 0t100 0t100 0t100 0`} stroke="#bfe6ff" strokeOpacity={0.12 + (i % 3) * 0.08} strokeWidth="2.5" fill="none" style={{ transform: `translateX(calc(var(--p) * ${-90 - i * 25}px))` }} />)}
    <rect x="0" y="740" width="1600" height="160" fill="#a8844f" /><rect x="0" y="740" width="1600" height="160" fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.55 }} /><rect x="0" y="740" width="1600" height="160" fill="url(#g-vert)" />
    {[395, 505, 545, 655].map((y, i) => <line key={i} x1="0" x2="1600" y1={y} y2={y} stroke="#e8d3a0" strokeOpacity=".4" strokeWidth="3" strokeDasharray="14 10" style={fade(0.05, 0.3)} />)}
    <g style={fadeOut(0.3, 0.5)}><Box x={90} y={330} w={120} h={32} c="#e9eef5" d={0.2} /><path d="M120 330V230l130-50" stroke="#fff" strokeWidth="7" fill="none" /></g>
    <g style={{ transform: `translateX(calc(${k(0.38, 1)} * 1900px - 300px))` }}>{ship(372, '#e8b04a', false)}</g>
    <g style={{ transform: `translateX(calc(1800px - ${k(0.5, 1)} * 2000px))` }}>{ship(545, '#58c4a4', true)}</g></Svg>);
};

/** 13 — Library: timber shelves, rolled papyrus with end caps, then a modelled sun disc. */
export const Scrolls: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><g style={fadeOut(0.52, 0.66)}><Box x={140} y={160} w={1320} h={660} c="#5c3f22" d={0.03} bricks={false} tex={0.7} />
    {A(4).map((row) => <g key={row}><Box x={160} y={262 + row * 150} w={1280} h={12} c="#8a6a3a" d={0.02} bricks={false} shadow={false} />{A(16).map((i) => { const x = 172 + i * 78, y = 206 + row * 150, t = 0.04 + (row * 16 + i) * 0.0065; return <g key={i} style={pop(t, t + 0.06)}>
      <rect x={x} y={y} width="58" height="54" rx="6" fill="#e8d3a0" /><rect x={x} y={y} width="58" height="54" rx="6" fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.4 }} /><rect x={x} y={y} width="58" height="54" rx="6" fill="url(#g-vert)" /><path d={`M${x + 8} ${y + 14}h42M${x + 8} ${y + 26}h42M${x + 8} ${y + 38}h30`} stroke="#6a4a22" strokeOpacity=".55" /><ellipse cx={x + 2} cy={y + 27} rx="6" ry="27" fill="#c9ab70" /><ellipse cx={x + 56} cy={y + 27} rx="6" ry="27" fill="#a98a52" /></g>; })}</g>)}</g>
    <g style={{ transform: `translateY(calc((1 - ${k(0.62, 0.92)}) * 520px))` }}>{A(24).map((i) => <path key={i} d={`M800 450L${800 + Math.cos(i * 0.2618) * 480} ${450 + Math.sin(i * 0.2618) * 480}`} stroke={c} strokeOpacity=".22" strokeWidth="6" />)}
      <circle cx="800" cy="450" r="300" fill={c} style={glow(c, 30)} /><circle cx="800" cy="450" r="300" fill="url(#g-sphere)" /><circle cx="800" cy="450" r="300" fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.3 }} /><circle cx="800" cy="450" r="246" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeDasharray="4 12" /></g>
    <rect x="0" y="800" width="1600" height="100" fill="url(#g-water)" opacity=".7" />{A(3).map((i) => <path key={i} d={`M0 ${820 + i * 24}q100 -26 200 0t200 0t200 0t200 0t200 0t200 0t200 0t200 0t200 0`} stroke="#bfe6ff" strokeOpacity={0.6 - i * 0.15} strokeWidth="3" fill="none" style={{ transform: `translateX(calc(var(--p) * ${-160 - i * 60}px))` }} />)}</Svg>);

/** 19 — Fayum portrait: panel frame, modelled face, hair curls, gilded wreath, folded garment. */
export const Portrait: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><circle cx="800" cy="440" r="380" fill={c} fillOpacity=".12" style={fade(0, 0.2)} />
    <g style={fade(0, 0.16)}><Box x={530} y={100} w={540} h={700} c="#6b4a2a" d={0.05} bricks={false} tex={0.7} /><rect x="560" y="130" width="480" height="640" fill="#c49a68" /><rect x="560" y="130" width="480" height="640" fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.6 }} /><rect x="560" y="130" width="480" height="640" fill="url(#g-vert)" /></g>
    <g style={both(rise(0.34, 0.56))}><path d="M610 770Q640 600 800 584Q960 600 990 770Z" fill="#ebe4d2" /><path d="M610 770Q640 600 800 584Q960 600 990 770Z" fill="url(#g-cyl)" /><path d="M740 590L720 770M860 590L880 770" stroke="#5b2a5e" strokeWidth="22" /><path d="M690 640Q760 700 700 770M910 640Q840 700 900 770" stroke="#000" strokeOpacity=".25" fill="none" strokeWidth="3" /></g>
    <path d="M758 520H842V600Q800 624 758 600Z" fill="#c98f60" style={fade(0.3, 0.45)} />
    {A(6).map((i) => <ellipse key={i} cx="800" cy="400" rx={150 - i * 10} ry={190 - i * 12} fill={i === 5 ? '#d9a77a' : 'none'} stroke="#e8c49a" strokeWidth="3.5" strokeOpacity={0.35 + i * 0.1} pathLength={1} style={draw(0.14 + i * 0.05, 0.3 + i * 0.05)} />)}
    <g style={fade(0.3, 0.5)}><ellipse cx="800" cy="400" rx="94" ry="130" fill="#d9a77a" /><ellipse cx="800" cy="400" rx="94" ry="130" fill="url(#g-sphere)" /><ellipse cx="800" cy="400" rx="94" ry="130" fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.25 }} />
      <path d="M706 330Q800 230 894 330Q860 270 800 266Q740 270 706 330Z" fill="#241610" />{A(10).map((i) => <circle key={i} cx={720 + i * 18} cy={296 - Math.sin((i / 9) * Math.PI) * 30} r="14" fill="#2c1b12" />)}
      <path d="M800 400L788 462Q800 472 812 462Z" fill="#000" opacity=".18" /><path d="M772 506Q800 518 828 506Q800 500 772 506Z" fill="#8a3a2a" /><path d="M740 372Q760 362 780 372M820 372Q840 362 860 372" stroke="#2a1a10" strokeWidth="5" fill="none" /></g>
    {A(20).map((i) => { const a = Math.PI + (i / 19) * Math.PI, X = 800 + Math.cos(a) * 190, Y = 380 + Math.sin(a) * 230; return <g key={i} transform={`rotate(${(a * 180) / Math.PI + 90} ${X} ${Y})`} style={both(pop(0.56 + i * 0.01, 0.62 + i * 0.01), glow(c, 8))}><ellipse cx={X} cy={Y} rx="17" ry="8" fill="url(#g-gold)" /><path d={`M${X - 12} ${Y}H${X + 12}`} stroke="#6e4c0c" strokeOpacity=".6" /></g>; })}
    {[-48, 48].map((dx, i) => <g key={i} style={{ transform: `scaleY(${k(0.78, 0.9)})`, transformOrigin: `${800 + dx}px 400px`, transformBox: 'view-box' as never }}><ellipse cx={800 + dx} cy="400" rx="28" ry="13" fill="#fff" stroke="#2a1a10" strokeWidth="3" /><circle cx={800 + dx} cy="400" r="10" fill="#2a1a10" /><circle cx={803 + dx} cy="397" r="3" fill="#fff" /></g>)}</Svg>);

/** 20 — Saint Catherine: faceted granite peaks, fortified walls with towers and dome, burning bush with gradient flames. */
export const Bush: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><g style={rise(0, 0.2)}><Face pts="400,780 780,260 860,780" fill="#a28b6c" shade="url(#g-vert)" tex={0.6} /><Face pts="780,260 960,380 1050,780 860,780" fill="#5e4e3c" tex={0.6} hatch={0.5} /><Face pts="960,380 1180,160 1560,780 1050,780" fill="#80694f" shade="url(#g-vert)" tex={0.6} hatch={0.25} />
      <path d="M780 260L820 400L780 560M1180 160L1230 360L1180 560" stroke="#fff" strokeOpacity=".3" fill="none" /></g>
    <g style={rise(0.18, 0.46)}><Box x={760} y={560} w={640} h={220} c="#d4bf93" d={0.1} />{A(12).map((i) => <Box key={i} x={760 + i * 54} y={538} w={30} h={24} c="#d4bf93" d={0.3} shadow={false} bricks={false} />)}<Cyl x={1330} y={450} w={64} h={110} c="#cdb88e" /><Cyl x={780} y={470} w={56} h={90} c="#cdb88e" />
      <path d="M1000 560Q1080 430 1160 560Z" fill="#f4f1e6" /><path d="M1000 560Q1080 430 1160 560Z" fill="url(#g-cyl)" /><path d="M1080 430V396M1066 410H1094" stroke="#fff" strokeWidth="4" /></g>
    <rect x="0" y="780" width="1600" height="120" fill="#4a3a28" /><rect x="0" y="780" width="1600" height="120" fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.6 }} /><rect x="0" y="780" width="1600" height="120" fill="url(#g-vert)" />
    {A(7).map((i) => <path key={i} d={`M${240 + i * 26} 780Q${230 + i * 26} ${660 - (i % 3) * 40} ${250 + i * 26} ${560 - (i % 4) * 30}`} stroke="#3e5f22" strokeWidth="7" fill="none" strokeLinecap="round" />)}
    {A(9).map((i) => <path key={i} d="M0 0c-26 -30 -26 -70 0 -110c26 40 26 80 0 110z" fill="url(#g-flame)" style={{ transform: `translate(${230 + i * 22}px, ${670 - (i % 3) * 34}px) scale(calc(0.9 + 0.2 * sin(calc(var(--p) * 90 + ${i * 1.7}))), calc(0.9 + 0.3 * sin(calc(var(--p) * 110 + ${i * 2.3}))))`, opacity: S(`calc(${k(0.02 + i * 0.012, 0.1 + i * 0.012)})`), ...glow('#ff8a1e', 16) }} />)}
    <g style={both(pop(0.62, 0.78), glow(c, 18))}><ellipse cx="1480" cy="300" rx="52" ry="62" fill="url(#g-gold)" />{A(5).map((i) => <rect key={i} x={1432 + i * 20} y={170 - (i === 2 ? 20 : 0)} width="16" height="90" rx="8" fill="url(#g-gold)" />)}</g>
    <g style={fade(0.84, 1)}>{A(4).map((i) => <Box key={i} x={620 + i * 6} y={296 - i * 14} w={170} h={22} c="#e8d3a0" d={0.15} bricks={false} />)}</g></Svg>);

/** 09 — Narmer Palette: bevelled greywacke slab with carved relief, shaded crowns that merge into one. */
export const Crowns: React.FC<SceneProps> = ({ c }) => {
  const slab = 'M520 150H1080Q1130 150 1130 220V600Q1130 760 800 820Q470 760 470 600V220Q470 150 520 150Z', white = 'M700 420L670 220Q700 150 730 220L760 420Z', red = 'M800 420L808 330H870L862 220H874V170H886V420Z';
  return (<Svg c={c}><g style={fade(0, 0.22)}><g filter="url(#f-bevel)"><path d={slab} fill="#6f7c5c" stroke="#d8d2b8" strokeWidth="3" /></g><Tex d={slab} o={0.7} /><path d={slab} fill="url(#p-hiero)" style={{ mixBlendMode: 'multiply', opacity: 0.4 }} /><path d={slab} fill="url(#g-vert)" /><path d="M520 150H1080" stroke="#fff" strokeOpacity=".5" strokeWidth="3" />
      <circle cx="800" cy="250" r="64" fill="none" stroke="#000" strokeOpacity=".35" strokeWidth="6" /><circle cx="800" cy="250" r="64" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="2" /><path d="M740 250Q700 330 770 380Q830 420 840 340M860 250Q900 330 830 380" stroke="#000" strokeOpacity=".4" fill="none" strokeWidth="9" /></g>
    <path d="M-20 860C300 840 600 880 900 850S1400 830 1620 860V900H-20Z" fill="url(#g-water)" opacity=".8" style={fade(0.08, 0.3)} />
    <g style={{ transform: `translateX(calc(${k(0.28, 0.66)} * 480px - 330px)) translateY(80px)`, opacity: S(`calc(1 - ${k(0.7, 0.76)})`) }}><path d={white} fill="#f4f1e6" style={glow('#fff', 14)} /><path d={white} fill="url(#g-cyl)" /><path d={white} fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.3 }} /></g>
    <g style={{ transform: `translateX(calc(${k(0.28, 0.66)} * -480px + 330px)) translateY(80px)`, opacity: S(`calc(1 - ${k(0.7, 0.76)})`) }}><path d={red} fill="#c8402c" style={glow('#e2553d', 14)} /><path d={red} fill="url(#g-cyl)" /><path d={red} fill="url(#p-tex)" style={{ mixBlendMode: 'multiply', opacity: 0.4 }} /><path d="M830 338a14 14 0 1 1 -1 0" stroke="#ffb4a0" strokeWidth="3" fill="none" /></g>
    <g style={both(pop(0.72, 0.86), glow(c, 26))}><path d="M740 560L758 340H842L860 560Z" fill="#c8402c" /><path d="M740 560L758 340H842L860 560Z" fill="url(#g-cyl)" /><path d="M772 340L760 190Q800 130 840 190L828 340Z" fill="#f4f1e6" /><path d="M772 340L760 190Q800 130 840 190L828 340Z" fill="url(#g-cyl)" /><path d="M800 190V130q22 -20 8 -44" stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" /></g>
    <g style={rise(0.84, 1)}><Box x={1340} y={700} w={180} h={60} c="#f4f1e6" d={0.2} />{A(6).map((i) => <Box key={i} x={1340 + i * 32} y={680} w={18} h={20} c="#f4f1e6" d={0.3} shadow={false} bricks={false} />)}</g></Svg>);
};

/** 06 — Abu Simbel: rock-cut facade with four seated colossi (nemes, crowns, carved bands), inner sanctuary and the sun beam. */
export const Sunbeam: React.FC<SceneProps> = ({ c }) => (
  <Svg c={c}><g style={move(0, 0.45, 0, -420)}><circle cx="170" cy="800" r="60" fill={c} style={glow(c, 60)} /><circle cx="170" cy="800" r="60" fill="url(#g-sphere)" /></g>
    <Face pts="520,230 1540,230 1590,800 480,800" fill="#a58455" tex={0.6} bricks={0.3} shade="url(#g-vert)" />
    <polygon points="560,250 1500,250 1540,800 520,800" fill="#0c0a08" fillOpacity=".55" />
    {A(4).map((i) => { const x = 650 + i * 205; return <g key={i} style={rise(0.08 + i * 0.05, 0.3 + i * 0.05)}><Box x={x} y={470} w={96} h={320} c="#c89a5a" d={0.28} hiero tex={0.5} /><Orb cx={x + 48} cy={430} r={42} fill="#d8ae6a" /><path d={`M${x + 6} 420L${x - 12} 520H${x + 108}L${x + 90} 420Z`} fill="#c89a5a" /><path d={`M${x + 6} 420L${x - 12} 520H${x + 108}L${x + 90} 420Z`} fill="url(#g-cyl)" />{A(5).map((j) => <path key={j} d={`M${x + 8} ${430 + j * 18}H${x + 88}`} stroke="#000" strokeOpacity=".25" />)}<Face pts={`${x + 22},398 ${x + 74},398 ${x + 66},352 ${x + 30},352`} fill={c} shade="url(#g-vert)" /><path d={`M${x + 36} 435h8M${x + 52} 435h8M${x + 42} 455q6 5 12 0`} stroke="#000" strokeOpacity=".5" strokeWidth="3" fill="none" /></g>; })}
    <rect x="0" y="600" width="1560" height="46" fill={c} fillOpacity=".5" style={{ ...sweep(0.42, 0.7), ...glow(c, 22) }} />
    {A(4).map((i) => <g key={i} style={i === 0 ? fade(0.3, 0.4) : pop(0.62 + i * 0.04, 0.7 + i * 0.04)}><Orb cx={1170 + i * 100} cy={623} r={34} fill={i === 0 ? '#111' : c} style={i === 0 ? undefined : glow(c, 24)} /></g>)}
    {A(14).map((i) => <rect key={i} x={560 + (i % 7) * 140} y={250 + Math.floor(i / 7) * 280} width="130" height="260" fill="none" stroke="#fff" strokeOpacity=".5" style={fade(0.8 + i * 0.01, 0.82 + i * 0.01)} />)}
    <path d="M1040 240V120M1000 160l40-40 40 40" stroke="#fff" strokeWidth="4" fill="none" pathLength={1} style={draw(0.86, 1)} /></Svg>);
