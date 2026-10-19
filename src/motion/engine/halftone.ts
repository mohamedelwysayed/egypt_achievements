import { clamp } from './ease';
import type { HalfA } from './types';

/** Image sampled onto a dot grid once; each frame only draws circles (procedural halftone, no pre-rendered media). */
export class HalftoneGrid {
  cols: number; rows: number; lum: Float32Array;
  constructor(public a: HalfA, im: HTMLImageElement | null) {
    this.cols = Math.max(1, Math.ceil(a.w / a.cell)); this.rows = Math.max(1, Math.ceil(a.h / (a.cell * 0.86)));
    this.lum = new Float32Array(this.cols * this.rows).fill(0.4);
    if (!im || !im.naturalWidth) return;
    const c = document.createElement('canvas'); c.width = this.cols; c.height = this.rows; const x = c.getContext('2d', { willReadFrequently: true })!;
    const sr = im.naturalWidth / im.naturalHeight, dr = a.w / a.h; let sw = im.naturalWidth, sh = im.naturalHeight, sx = 0, sy = 0;
    if (sr > dr) { sw = sh * dr; sx = (im.naturalWidth - sw) / 2; } else { sh = sw / dr; sy = (im.naturalHeight - sh) / 2; }
    x.drawImage(im, sx, sy, sw, sh, 0, 0, this.cols, this.rows);
    try {
      const d = x.getImageData(0, 0, this.cols, this.rows).data;
      for (let i = 0; i < this.lum.length; i++) this.lum[i] = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
    } catch { /* tainted canvas (file://): keep the neutral grid */ }
  }
  /** reveal 0..1 sweeps diagonally; fade 0..1 multiplies radius; ox/oy are parallax offsets */
  draw(ctx: CanvasRenderingContext2D, reveal: number, fade: number, ox: number, oy: number, zoom: number) {
    const { a, cols, rows, lum } = this, cell = a.cell, rowH = cell * 0.86, gain = a.gain ?? 1;
    if (reveal <= 0 || fade <= 0) return;
    ctx.save(); ctx.beginPath(); ctx.rect(a.x, a.y, a.w, a.h); ctx.clip(); ctx.fillStyle = a.color; ctx.beginPath();
    const cx = a.x + a.w / 2 + ox, cy = a.y + a.h / 2 + oy;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const l = lum[r * cols + c], v = a.mode === 'light' ? l : 1 - l;
      const k = clamp((reveal * 1.9 - (c / cols) * 0.7 - (r / rows) * 0.5) * 3);
      const rad = cell * 0.56 * Math.sqrt(clamp(v * gain)) * k * fade; if (rad < 0.4) continue;
      const px = a.x + (c + 0.5 + (r & 1 ? 0.5 : 0)) * cell, py = a.y + (r + 0.5) * rowH;
      const X = cx + (px - cx) * zoom + (0), Y = cy + (py - cy) * zoom;
      ctx.moveTo(X + rad * zoom, Y); ctx.arc(X, Y, rad * zoom, 0, 6.2832);
    }
    ctx.fill(); ctx.restore();
  }
}
