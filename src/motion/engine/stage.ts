import { EASES, clamp, lerp, outExpo, outQuart, inQuart, inOutQuart, seg } from './ease';
import { HalftoneGrid } from './halftone';
import { Orb } from './orb';
import type { Actor, CountA, OrbKey, Spec, TypeA } from './types';

const FONT = {
  display: "'Syne', 'Arial Black', Impact, 'Noto Kufi Arabic', sans-serif",
  serif: "'Playfair Display', 'Instrument Serif', Georgia, 'Noto Kufi Arabic', serif",
  mono: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, 'Noto Kufi Arabic', monospace",
};
const loadImg = (src: string) => new Promise<HTMLImageElement | null>((res) => { if (!src) return res(null); const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
const isAr = (s: string) => /[\u0600-\u06FF]/.test(s);

interface TypeRT { a: TypeA; wrap: HTMLDivElement; lines: HTMLDivElement[]; units: HTMLSpanElement[][]; mark?: HTMLDivElement; last: string[] }
interface CountRT { a: CountA; wrap: HTMLDivElement; txt: HTMLSpanElement; last: string }

export interface StageOpts { dprCap?: number; cell?: number }

/**
 * Procedural motion-graphics stage. render(t) is a pure function of time, so the same engine plays a timed
 * showreel (t from a clock) or a scroll-scrubbed title sequence (t from scroll progress). Nothing is pre-rendered.
 */
export class MotionStage {
  el: HTMLDivElement; bgEl: HTMLDivElement; c2d: HTMLCanvasElement; ctx: CanvasRenderingContext2D; wipeEls: HTMLDivElement[] = []; gl: HTMLCanvasElement; typeLayer: HTMLDivElement;
  orb: Orb | null = null; halfs = new Map<object, HalftoneGrid>(); types: TypeRT[] = []; counts: CountRT[] = [];
  ptr = { x: 0, y: 0 }; sm = { x: 0, y: 0 }; ready = false; bgNow = '';
  onBg?: (c: string) => void;
  constructor(public host: HTMLElement, public spec: Spec, opts: StageOpts = {}) {
    const { W, H } = spec, dpr = Math.min(opts.dprCap ?? 1.5, window.devicePixelRatio || 1);
    this.el = document.createElement('div'); Object.assign(this.el.style, { position: 'absolute', left: '0', top: '0', width: W + 'px', height: H + 'px', transformOrigin: '0 0', overflow: 'hidden', contain: 'strict', isolation: 'isolate' });
    this.bgEl = this.mk('div', { inset: '0', background: spec.scenes[0].bg }); this.el.appendChild(this.bgEl);
    this.c2d = document.createElement('canvas'); this.c2d.width = Math.round(W * dpr); this.c2d.height = Math.round(H * dpr); Object.assign(this.c2d.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' });
    this.el.appendChild(this.c2d); this.ctx = this.c2d.getContext('2d')!; this.ctx.scale(dpr, dpr);
    for (let i = 0; i < 3; i++) { const w = this.mk('div', { inset: '0', background: '#111112', transform: 'scaleX(0)', willChange: 'transform' }); w.dataset.i = String(i); this.el.appendChild(w); this.wipeEls.push(w); }
    this.gl = document.createElement('canvas'); Object.assign(this.gl.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' }); this.el.appendChild(this.gl);
    this.typeLayer = this.mk('div', { inset: '0' }); this.el.appendChild(this.typeLayer); host.appendChild(this.el);
    try { this.orb = new Orb(this.gl, W, H, spec.light, opts.cell ?? 11); } catch { this.orb = null; }
  }
  private mk(tag: string, css: Record<string, string>) { const e = document.createElement(tag) as HTMLDivElement; Object.assign(e.style, { position: 'absolute' }, css); return e; }

  async init() {
    const half = this.spec.actors.filter((a) => a.k === 'half') as Extract<Actor, { k: 'half' }>[];
    const imgs = await Promise.all(half.map((a) => loadImg(a.img)));
    half.forEach((a, i) => this.halfs.set(a, new HalftoneGrid(a, imgs[i])));
    for (const a of this.spec.actors) { if (a.k === 'type') this.buildType(a); else if (a.k === 'count') this.buildCount(a); }
    if (document.fonts?.ready) await document.fonts.ready.catch(() => undefined);
    this.types.forEach((rt) => this.alignType(rt, Math.max((rt.a.lh ?? 1.0) * rt.a.size, isAr(rt.a.text) ? rt.a.size * 1.38 : 0)));
    this.ready = true;
  }

  private buildType(a: TypeA) {
    const rtl = isAr(a.text), wrap = this.mk('div', { left: '0', top: '0', width: '0', height: '0', transformOrigin: '0 0' }) as HTMLDivElement, size = a.size, lh = Math.max((a.lh ?? 1.0) * size, rtl ? size * 1.38 : 0);
    const lines = a.text.split('\n'), mark = a.mark ? (this.mk('div', { background: a.mark, transformOrigin: rtl ? '100% 50%' : '0 50%', transform: 'scaleX(0)' }) as HTMLDivElement) : undefined;
    if (mark) wrap.appendChild(mark);
    const lineEls: HTMLDivElement[] = [], units: HTMLSpanElement[][] = [];
    lines.forEach((ln, li) => {
      const row = this.mk('div', { left: '0', top: li * lh + 'px', height: lh + 'px', overflow: 'hidden', whiteSpace: 'pre', fontFamily: FONT[a.font], fontSize: size + 'px', fontWeight: String(a.weight ?? (a.font === 'display' ? 800 : a.font === 'mono' ? 700 : 400)), fontStyle: a.font === 'serif' && !rtl ? 'italic' : 'normal', lineHeight: lh + 'px', color: a.color, letterSpacing: rtl ? '0' : (a.track ?? (a.font === 'mono' ? 0.18 : -0.02)) + 'em', direction: rtl ? 'rtl' : 'ltr', textTransform: a.font === 'mono' && !rtl ? 'uppercase' : 'none', padding: '0.06em 0' }) as HTMLDivElement;
      const toks = rtl ? ln.split(' ') : [...ln], us: HTMLSpanElement[] = [];
      toks.forEach((tk, i) => { const s = document.createElement('span'); s.textContent = rtl && i < toks.length - 1 ? tk + ' ' : tk; Object.assign(s.style, { display: 'inline-block', willChange: 'transform', transform: 'translateY(115%)' }); row.appendChild(s); us.push(s); });
      wrap.appendChild(row); lineEls.push(row); units.push(us);
    });
    this.typeLayer.appendChild(wrap);
    const rt: TypeRT = { a, wrap, lines: lineEls, units, mark, last: [] }; this.types.push(rt);
    // measure for alignment + mark block
    requestAnimationFrame(() => this.alignType(rt, lh));
  }
  private alignType(rt: TypeRT, lh: number) {
    const a = rt.a; let w = 0; rt.lines.forEach((l) => { l.style.width = 'max-content'; }); rt.lines.forEach((l) => { if (l.offsetWidth > w) w = l.offsetWidth; }); if (w < 2) return; w = Math.ceil(w + a.size * 0.06 + 2);
    const ox = a.align === 'c' ? -w / 2 : a.align === 'r' ? -w : 0, oy = -(rt.lines.length * lh) / 2;
    const m = this.spec.W * 0.05, room = a.align === 'c' ? Math.min(a.x, this.spec.W - a.x) * 2 - m * 2 : a.align === 'r' ? a.x - m : this.spec.W - a.x - m, fit = Math.min(1, Math.max(0.3, room / w));
    (rt.wrap as unknown as { _ox: number })._ox = ox * fit; (rt.wrap as unknown as { _oy: number })._oy = oy * fit; (rt.wrap as unknown as { _fit: number })._fit = fit;
    rt.lines.forEach((l) => { l.style.width = w + 'px'; if (isAr(a.text)) l.style.textAlign = a.align === 'c' ? 'center' : a.align === 'l' ? 'left' : 'right'; else l.style.textAlign = a.align === 'c' ? 'center' : a.align === 'r' ? 'right' : 'left'; });
    if (rt.mark) Object.assign(rt.mark.style, { left: -a.size * 0.12 + 'px', top: '0', width: w + a.size * 0.24 + 'px', height: rt.lines.length * lh + 'px' });
  }
  private buildCount(a: CountA) {
    const wrap = this.mk('div', { left: '0', top: '0', transformOrigin: '0 0' }) as HTMLDivElement; const txt = document.createElement('span');
    Object.assign(txt.style, { position: 'absolute', left: '0', top: '0', whiteSpace: 'pre', fontFamily: FONT[a.font], fontSize: a.size + 'px', fontWeight: a.font === 'display' ? '800' : '500', lineHeight: '1', color: a.color, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.03em', transform: 'translateY(0)' });
    wrap.appendChild(txt); this.typeLayer.appendChild(wrap); this.counts.push({ a, wrap, txt, last: '' });
  }

  resize(vw: number, vh: number, fit: 'contain' | 'cover' = 'contain') {
    const { W, H } = this.spec, s = fit === 'contain' ? Math.min(vw / W, vh / H) : Math.max(vw / W, vh / H);
    this.el.style.transform = `translate(${(vw - W * s) / 2}px, ${(vh - H * s) / 2}px) scale(${s})`; this.scale = s;
  }
  scale = 1;
  setPointer(nx: number, ny: number) { this.ptr.x = nx; this.ptr.y = ny; }

  private orbAt(t: number): { x: number; y: number; r: number; w: [number, number, number, number]; spin: number; tilt: number; roll: number; base: string; dot: string } {
    const k = this.spec.orb; let i = 0; while (i < k.length - 2 && t >= k[i + 1].t) i++;
    const a: OrbKey = k[i], b: OrbKey = k[Math.min(i + 1, k.length - 1)];
    const p = a === b ? 1 : (EASES[b.ease ?? 'quart'])(seg(t, a.t, b.t)), cMix = p > 0.5 ? b : a;
    const w = a.w.map((v, j) => lerp(v, b.w[j], p)) as [number, number, number, number];
    return { x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p), r: lerp(a.r, b.r, p), w, spin: t * (0.5 + (cMix.spin ?? 0.6)), tilt: lerp(a.tilt ?? 0.25, b.tilt ?? 0.25, p), roll: lerp(a.roll ?? 0, b.roll ?? 0, p), base: cMix.base, dot: cMix.dot };
  }

  render(t: number, dt = 0.016) {
    if (!this.ready) return;
    const { W, H, scenes, wipes } = this.spec, tt = clamp(t, 0, this.spec.dur);
    this.sm.x += (this.ptr.x - this.sm.x) * Math.min(1, dt * 6); this.sm.y += (this.ptr.y - this.sm.y) * Math.min(1, dt * 6);
    const drift = { x: this.sm.x + Math.sin(tt * 0.45) * 0.25, y: this.sm.y + Math.cos(tt * 0.37) * 0.2 };
    const off = (d: number) => [-drift.x * 34 * d, -drift.y * 22 * d] as const;
    // background + wipes
    let bg = scenes[0].bg; for (const s of scenes) if (tt >= s.t0) bg = s.bg;
    if (bg !== this.bgNow) { this.bgNow = bg; this.bgEl.style.background = bg; this.onBg?.(bg); }
    this.wipeEls.forEach((w, i) => w.style.transform = 'scaleX(0)');
    for (let b = 1; b < scenes.length; b++) {
      const B = scenes[b].t0;
      [0, 1, 2].forEach((i) => {
        const inn = outQuart(seg(tt, B - 0.5 + i * 0.07, B - 0.06 + i * 0.07)), out = inQuart(seg(tt, B + 0.04 + i * 0.07, B + 0.5 + i * 0.07)), el = this.wipeEls[i];
        if (tt > B - 0.55 && tt < B + 0.6) { el.style.background = (wipes[b - 1] ?? wipes[0])[i]; if (out > 0) { el.style.transformOrigin = '100% 50%'; el.style.transform = `scaleX(${1 - out})`; } else { el.style.transformOrigin = '0 50%'; el.style.transform = `scaleX(${inn})`; } }
      });
    }
    // 2D layer
    const ctx = this.ctx; ctx.clearRect(0, 0, W, H);
    for (const a of this.spec.actors) {
      if (a.k === 'half') {
        const g = this.halfs.get(a)!, [ox, oy] = off(a.depth ?? 0.4), rv = outQuart(seg(tt, a.reveal[0], a.reveal[1])), fd = 1 - inOutQuart(seg(tt, a.t1, a.t1 + 0.45));
        if (tt < a.t0 || tt > a.t1 + 0.5) continue;
        const zoom = 1 + (a.drift?.[0] ?? 0.0) * seg(tt, a.t0, a.t1) ; g.draw(ctx, rv, fd, ox, oy, zoom);
      } else if (a.k !== 'type' && a.k !== 'count') this.vec(ctx, a, tt, off(a.depth ?? 0.7));
    }
    // 3D orb
    if (this.orb) { const o = this.orbAt(tt), [ox, oy] = off(1); this.orb.set(o.x + ox, o.y + oy, o.r, o.w, o.spin, o.tilt, o.roll, o.base, o.dot); this.orb.draw(); }
    // type
    for (const rt of this.types) this.updType(rt, tt, off);
    for (const rc of this.counts) this.updCount(rc, tt, off);
  }

  private vec(ctx: CanvasRenderingContext2D, a: Exclude<Actor, { k: 'half' | 'type' | 'count' }>, t: number, [ox, oy]: readonly [number, number]) {
    if (t < a.t0 || t > a.t1 + 0.5) return;
    const d = ('d' in a && a.d) || 1.2, p = outQuart(seg(t, a.t0, a.t0 + d)), o = 1 - inOutQuart(seg(t, a.t1, a.t1 + 0.45)); if (o <= 0 || p <= 0) return;
    ctx.save(); ctx.translate(ox, oy); ctx.globalAlpha = o; ctx.strokeStyle = a.color; ctx.fillStyle = a.color; ctx.lineCap = 'round';
    if (a.k === 'rings') { for (let i = 0; i < a.n; i++) { const rr = lerp(a.r0, a.r1, a.n === 1 ? 1 : i / (a.n - 1)) * (0.6 + 0.4 * p); ctx.globalAlpha = o * (0.18 + 0.5 * (i % 2)) * p; ctx.lineWidth = a.lw ?? 2; ctx.beginPath(); ctx.arc(a.x, a.y, rr, 0, 6.2832); ctx.stroke(); } }
    else if (a.k === 'ruler') {
      const x1 = lerp(a.x0, a.x1, p); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(a.x0, a.y); ctx.lineTo(x1, a.y); ctx.stroke();
      for (let i = 0; i <= a.ticks; i++) { const x = lerp(a.x0, a.x1, i / a.ticks); if (x > x1) break; const major = i % 5 === 0, h = major ? 26 : 12; ctx.lineWidth = major ? 3 : 1.6; ctx.beginPath(); ctx.moveTo(x, a.y); ctx.lineTo(x, a.y - h); ctx.stroke(); }
      const m = lerp(a.x0, a.x1, clamp((t - a.t0) / Math.max(0.1, a.t1 - a.t0))); ctx.beginPath(); ctx.moveTo(m, a.y + 8); ctx.lineTo(m - 9, a.y + 24); ctx.lineTo(m + 9, a.y + 24); ctx.closePath(); ctx.fill();
      ctx.font = `700 ${a.size ?? 20}px ${FONT.mono}`; ctx.textBaseline = 'top'; if (a.l0) { ctx.textAlign = 'left'; ctx.fillText(a.l0, a.x0, a.y + 34); } if (a.l1) { ctx.textAlign = 'right'; ctx.globalAlpha = o * seg(p, 0.8, 1); ctx.fillText(a.l1, a.x1, a.y + 34); }
    } else if (a.k === 'route') {
      const L: number[] = [0]; for (let i = 1; i < a.pts.length; i++) L.push(L[i - 1] + Math.hypot(a.pts[i][0] - a.pts[i - 1][0], a.pts[i][1] - a.pts[i - 1][1])); const tot = L[L.length - 1], want = tot * p;
      ctx.lineWidth = a.lw ?? 5; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(a.pts[0][0], a.pts[0][1]); let ex = a.pts[0][0], ey = a.pts[0][1];
      for (let i = 1; i < a.pts.length; i++) { if (L[i] <= want) { ctx.lineTo(a.pts[i][0], a.pts[i][1]); ex = a.pts[i][0]; ey = a.pts[i][1]; } else { const f = (want - L[i - 1]) / (L[i] - L[i - 1]); ex = lerp(a.pts[i - 1][0], a.pts[i][0], f); ey = lerp(a.pts[i - 1][1], a.pts[i][1], f); ctx.lineTo(ex, ey); break; } }
      ctx.stroke(); a.pts.forEach((q, i) => { if (L[i] <= want) { ctx.beginPath(); ctx.arc(q[0], q[1], 9, 0, 6.2832); ctx.fill(); } });
      ctx.fillStyle = a.dot ?? a.color; ctx.beginPath(); ctx.arc(ex, ey, 15, 0, 6.2832); ctx.fill();
    } else if (a.k === 'grid') { for (let r = 0; r < a.rows; r++) for (let c = 0; c < a.cols; c++) { const k = outQuart(seg(p * 1.6 - (c + r) / (a.cols + a.rows), 0, 0.5)); if (k <= 0) continue; ctx.beginPath(); ctx.arc(a.x + c * a.gap, a.y + r * a.gap, a.r * k, 0, 6.2832); ctx.fill(); } }
    else if (a.k === 'brackets') { const l = a.len * p; ctx.lineWidth = a.lw ?? 5; ctx.lineCap = 'butt'; for (const [x, y, sx, sy] of [[a.x0, a.y0, 1, 1], [a.x1, a.y0, -1, 1], [a.x0, a.y1, 1, -1], [a.x1, a.y1, -1, -1]] as const) { ctx.beginPath(); ctx.moveTo(x, y + sy * l); ctx.lineTo(x, y); ctx.lineTo(x + sx * l, y); ctx.stroke(); } }
    else if (a.k === 'arc') { ctx.lineWidth = a.lw ?? 4; ctx.setLineDash(a.dash ?? [18, 14]); ctx.beginPath(); ctx.arc(a.x, a.y, a.r * (0.7 + 0.3 * p), (t * (a.spin ?? 0.6)), (t * (a.spin ?? 0.6)) + 6.2832 * 0.78 * p); ctx.stroke(); ctx.setLineDash([]); }
    ctx.restore();
  }

  private place(wrap: HTMLElement, x: number, y: number, ox: number, oy: number, extraX = 0, extraY = 0, fit = 1) { wrap.style.transform = `translate3d(${x + ox + extraX}px, ${y + oy + extraY}px, 0) scale(${fit})`; }
  private updType(rt: TypeRT, t: number, off: (d: number) => readonly [number, number]) {
    const a = rt.a, vis = t >= a.t0 - 0.01 && t <= a.t1 + 1.6; rt.wrap.style.display = vis ? 'block' : 'none'; if (!vis) return;
    const [ox, oy] = off(a.depth ?? 1.25), w = rt.wrap as unknown as { _ox?: number; _oy?: number; _fit?: number }, stag = a.stagger ?? 0.035, rtl = isAr(a.text);
    this.place(rt.wrap, a.x, a.y, ox, oy, w._ox ?? 0, w._oy ?? 0, w._fit ?? 1); rt.wrap.style.opacity = String(a.opacity ?? 1);
    let n = 0; const total = rt.units.reduce((s, u) => s + u.length, 0);
    const endBy = Math.min(a.t1 - 0.1, this.spec.dur - 0.25), eff = Math.min(stag, Math.max(0.002, (endBy - a.t0 - 0.9) / Math.max(1, total - 1)));
    rt.units.forEach((us, li) => us.forEach((s) => {
      const idx = n; n++; const inP = outExpo(seg(t, a.t0 + idx * eff + li * 0.04, a.t0 + idx * eff + li * 0.04 + 0.9)), outP = inQuart(seg(t, a.t1 + idx * eff * 0.4, a.t1 + idx * eff * 0.4 + 0.45));
      const y = (1 - inP) * 115 - outP * 115, tr = `translateY(${y.toFixed(2)}%)`; if (s.dataset.t !== tr) { s.style.transform = tr; s.dataset.t = tr; }
    }));
    if (rt.mark) { const m = outExpo(seg(t, a.t0 + 0.15, a.t0 + 0.15 + 0.8)) * (1 - inQuart(seg(t, a.t1, a.t1 + 0.4))); rt.mark.style.transform = `scaleX(${m})`; }
  }
  private updCount(rc: CountRT, t: number, off: (d: number) => readonly [number, number]) {
    const a = rc.a, vis = t >= a.t0 - 0.01 && t <= a.t1 + 1; rc.wrap.style.display = vis ? 'block' : 'none'; if (!vis) return;
    const [ox, oy] = off(a.depth ?? 1.25), v = lerp(a.from, a.to, outQuart(seg(t, a.t0, a.t0 + a.dur))), s = (a.dec ? v.toLocaleString('en-US', { minimumFractionDigits: a.dec, maximumFractionDigits: a.dec }) : Math.round(v).toLocaleString('en-US')) + (a.suffix ?? '');
    if (s !== rc.last) { rc.txt.textContent = s; rc.last = s; }
    const w = rc.txt.offsetWidth, room = a.align === 'c' ? Math.min(a.x, this.spec.W - a.x) * 2 : a.align === 'r' ? a.x : this.spec.W - a.x - this.spec.W * 0.05, fit = w > 0 ? Math.min(1, Math.max(0.3, room / w)) : 1, ax = (a.align === 'c' ? -w / 2 : a.align === 'r' ? -w : 0) * fit;
    this.place(rc.wrap, a.x, a.y, ox, oy, ax, (-a.size / 2) * fit, fit);
    rc.wrap.style.opacity = String((a.opacity ?? 1) * outQuart(seg(t, a.t0, a.t0 + 0.4)) * (1 - inQuart(seg(t, a.t1, a.t1 + 0.4))));
  }

  dispose() { this.orb?.dispose(); this.el.remove(); }
}
