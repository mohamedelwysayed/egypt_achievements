import type { Cue } from './types';

/**
 * Procedural score + sound design for the showreel: every sound is synthesised from oscillators and filtered noise
 * (no samples, no downloads, nothing to license). 128 BPM, 8 bars = 15 s. Works on a live or an Offline audio context.
 */
export const BPM = 128, BEAT = 60 / BPM, DUR = 15;
const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
// bar chords: root (bass) + pad voicing (MIDI)
const CH: { root: number; pad: number[] }[] = [
  { root: 38, pad: [50, 53, 57] }, { root: 34, pad: [46, 50, 53] }, { root: 41, pad: [53, 57, 60] }, { root: 36, pad: [48, 52, 55] },
  { root: 38, pad: [50, 53, 57] }, { root: 34, pad: [46, 50, 53] }, { root: 43, pad: [55, 58, 62] }, { root: 33, pad: [57, 61, 64] },
];

function noiseBuffer(ctx: BaseAudioContext) { const b = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate), d = b.getChannelData(0); let s = 1337; for (let i = 0; i < d.length; i++) { s = (s * 1664525 + 1013904223) >>> 0; d[i] = (s / 4294967296) * 2 - 1; } return b; }

export function scheduleReel(ctx: BaseAudioContext, out: AudioNode, startAt: number, offset: number, cues: Cue[], cuts: number[]) {
  const nb = noiseBuffer(ctx), at = (T: number) => startAt + (T - offset), live = (T: number, len = 0) => T + len >= offset && T < DUR;
  const g = (v = 0) => { const n = ctx.createGain(); n.gain.value = v; return n; };
  const osc = (type: OscillatorType, f: number) => { const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; return o; };
  const noise = (T: number, len: number) => { const s = ctx.createBufferSource(); s.buffer = nb; s.start(Math.max(at(T), ctx.currentTime), 0); s.stop(at(T) + len + 0.05); return s; };
  const env = (n: GainNode, T: number, a: number, peak: number, d: number) => { const t0 = Math.max(at(T), ctx.currentTime); n.gain.cancelScheduledValues(t0); n.gain.setValueAtTime(0.0001, t0); n.gain.linearRampToValueAtTime(peak, t0 + a); n.gain.exponentialRampToValueAtTime(0.0001, t0 + a + d); };

  const kick = (T: number, v = 0.9) => { if (!live(T, 0.4)) return; const o = osc('sine', 150), n = g(); o.connect(n).connect(out); const t0 = Math.max(at(T), ctx.currentTime); o.frequency.setValueAtTime(150, t0); o.frequency.exponentialRampToValueAtTime(42, t0 + 0.14); env(n, T, 0.004, v, 0.32); o.start(t0); o.stop(t0 + 0.45); };
  const hat = (T: number, open = false, v = 0.1) => { if (!live(T, 0.2)) return; const s = noise(T, 0.2), f = ctx.createBiquadFilter(), n = g(); f.type = 'highpass'; f.frequency.value = 7500; s.connect(f).connect(n).connect(out); env(n, T, 0.002, v, open ? 0.16 : 0.04); };
  const clap = (T: number) => { if (!live(T, 0.3)) return; for (const d of [0, 0.012, 0.026]) { const s = noise(T + d, 0.2), f = ctx.createBiquadFilter(), n = g(); f.type = 'bandpass'; f.frequency.value = 1700; f.Q.value = 0.9; s.connect(f).connect(n).connect(out); env(n, T + d, 0.002, 0.22, d === 0.026 ? 0.16 : 0.05); } };
  const bass = (T: number, m: number, len: number, v = 0.5) => { if (!live(T, len)) return; const o = osc('sawtooth', mtof(m)), f = ctx.createBiquadFilter(), n = g(), t0 = Math.max(at(T), ctx.currentTime); f.type = 'lowpass'; f.Q.value = 6; f.frequency.setValueAtTime(900, t0); f.frequency.exponentialRampToValueAtTime(160, t0 + len); o.connect(f).connect(n).connect(out); env(n, T, 0.006, v, len); o.start(t0); o.stop(t0 + len + 0.1); const sub = osc('sine', mtof(m - 12)), sn = g(); sub.connect(sn).connect(out); env(sn, T, 0.01, v * 0.9, len); sub.start(t0); sub.stop(t0 + len + 0.1); };
  const pad = (T: number, notes: number[], len: number, v: number, bright: number) => { if (!live(T, len)) return; const f = ctx.createBiquadFilter(), n = g(), t0 = Math.max(at(T), ctx.currentTime); f.type = 'lowpass'; f.frequency.setValueAtTime(260, t0); f.frequency.linearRampToValueAtTime(bright, t0 + len * 0.8); n.gain.setValueAtTime(0.0001, t0); n.gain.linearRampToValueAtTime(v, t0 + 0.5); n.gain.linearRampToValueAtTime(v * 0.7, t0 + len - 0.2); n.gain.linearRampToValueAtTime(0.0001, t0 + len + 0.5); f.connect(n).connect(out);
    notes.forEach((m) => [-8, 0, 8].forEach((c) => { const o = osc('sawtooth', mtof(m)); o.detune.value = c; o.connect(f); o.start(t0); o.stop(t0 + len + 0.6); })); };
  const pluck = (T: number, m: number, v = 0.12) => { if (!live(T, 0.3)) return; const o = osc('triangle', mtof(m)), f = ctx.createBiquadFilter(), n = g(), t0 = Math.max(at(T), ctx.currentTime); f.type = 'lowpass'; f.frequency.setValueAtTime(5200, t0); f.frequency.exponentialRampToValueAtTime(600, t0 + 0.2); o.connect(f).connect(n).connect(out); env(n, T, 0.003, v, 0.22); o.start(t0); o.stop(t0 + 0.3); };
  const riser = (T0: number, T1: number, v = 0.32) => { if (!live(T0, T1 - T0)) return; const s = noise(T0, T1 - T0), f = ctx.createBiquadFilter(), n = g(), t0 = Math.max(at(T0), ctx.currentTime); f.type = 'bandpass'; f.Q.value = 3; f.frequency.setValueAtTime(300, t0); f.frequency.exponentialRampToValueAtTime(7000, at(T1)); n.gain.setValueAtTime(0.0001, t0); n.gain.exponentialRampToValueAtTime(v, at(T1)); n.gain.linearRampToValueAtTime(0.0001, at(T1) + 0.04); s.connect(f).connect(n).connect(out); };
  const hit = (T: number) => { if (!live(T, 1.4)) return; const o = osc('sine', 90), n = g(), t0 = Math.max(at(T), ctx.currentTime); o.frequency.setValueAtTime(90, t0); o.frequency.exponentialRampToValueAtTime(28, t0 + 0.9); o.connect(n).connect(out); env(n, T, 0.004, 0.95, 1.0); o.start(t0); o.stop(t0 + 1.2);
    const s = noise(T, 1.2), f = ctx.createBiquadFilter(), nn = g(); f.type = 'highpass'; f.frequency.value = 2500; s.connect(f).connect(nn).connect(out); env(nn, T, 0.003, 0.34, 1.0); };
  const whoosh = (T: number) => { if (!live(T - 0.4, 1)) return; const s = noise(T - 0.4, 0.9), f = ctx.createBiquadFilter(), n = g(), t0 = Math.max(at(T - 0.4), ctx.currentTime); f.type = 'bandpass'; f.Q.value = 1.6; f.frequency.setValueAtTime(500, t0); f.frequency.exponentialRampToValueAtTime(5200, t0 + 0.4); f.frequency.exponentialRampToValueAtTime(400, t0 + 0.85); n.gain.setValueAtTime(0.0001, t0); n.gain.linearRampToValueAtTime(0.3, t0 + 0.4); n.gain.linearRampToValueAtTime(0.0001, t0 + 0.88); s.connect(f).connect(n).connect(out); };
  const tick = (T: number) => { if (!live(T, 0.05)) return; const o = osc('square', 2100), n = g(), t0 = Math.max(at(T), ctx.currentTime); o.connect(n).connect(out); env(n, T, 0.001, 0.045, 0.03); o.start(t0); o.stop(t0 + 0.06); };
  const bell = (T: number) => { if (!live(T, 2.6)) return; [[1, 0.5], [2.76, 0.22], [5.4, 0.1]].forEach(([r, v]) => { const o = osc('sine', mtof(74) * r), n = g(), t0 = Math.max(at(T), ctx.currentTime); o.connect(n).connect(out); env(n, T, 0.004, v * 0.5, 2.4); o.start(t0); o.stop(t0 + 2.6); }); };

  // ---- the score
  for (let bar = 0; bar < 8; bar++) {
    const T = bar * 4 * BEAT, c = CH[bar];
    pad(T, c.pad, 4 * BEAT, bar < 2 ? 0.05 : 0.045, 700 + bar * 330);
    if (bar < 2) { bass(T, c.root, 4 * BEAT * 0.98, 0.32); kick(T, 0.5); }
    else for (let e = 0; e < 8; e++) bass(T + e * 0.5 * BEAT, c.root + (e % 4 === 3 ? 12 : 0), 0.42 * BEAT, 0.34);
    if (bar >= 2 && !(bar === 7)) for (let b = 0; b < 4; b++) kick(T + b * BEAT, 0.9);
    if (bar === 7) { kick(T, 0.9); kick(T + BEAT, 0.8); }
    if (bar >= 2 && bar !== 7) for (let b = 0; b < 4; b++) { hat(T + (b + 0.5) * BEAT, false, 0.09); if (b === 3) hat(T + (b + 0.5) * BEAT, true, 0.1); }
    if (bar >= 4 && bar !== 7) { clap(T + BEAT); clap(T + 3 * BEAT); for (let s = 0; s < 16; s++) pluck(T + s * 0.25 * BEAT, c.pad[s % 3] + 12 + (s % 8 === 7 ? 12 : 0), s % 2 ? 0.06 : 0.1); }
  }
  cuts.forEach((t) => riser(t - 1.5 * BEAT * 2 + 0.0, t, 0.3));
  cues.forEach((c) => { if (c.k === 'hit') hit(c.t); else if (c.k === 'whoosh') whoosh(c.t); else if (c.k === 'bell') bell(c.t); else tick(c.t); });
}

/** Live playback wrapper: builds the graph, schedules from `offset`, and can be restarted when scrubbing. */
export class ReelAudio {
  ctx: AudioContext | null = null; master: GainNode | null = null; bus: GainNode | null = null; muted = false;
  constructor(private cues: Cue[], private cuts: number[]) {}
  start(offset: number) {
    if (!this.ctx) { const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext; if (!C) return; this.ctx = new C(); }
    const ctx = this.ctx; ctx.resume(); this.stop();
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.2;
    const m = ctx.createGain(); m.gain.value = this.muted ? 0 : 0.52; comp.connect(m).connect(ctx.destination);
    const bus = ctx.createGain(); bus.gain.value = 1; bus.connect(comp); this.bus = bus; this.master = m;
    const now = ctx.currentTime + 0.06; scheduleReel(ctx, bus, now, offset, this.cues, this.cuts);
    const end = now + (DUR - offset); bus.gain.setValueAtTime(1, Math.max(now, end - 0.5)); bus.gain.linearRampToValueAtTime(0, end);
  }
  stop() { if (this.bus) { try { this.bus.gain.cancelScheduledValues(0); this.bus.gain.value = 0; this.bus.disconnect(); } catch { /* ignore */ } this.bus = null; } }
  setMuted(m: boolean) { this.muted = m; if (this.master && this.ctx) this.master.gain.setTargetAtTime(m ? 0 : 0.52, this.ctx.currentTime, 0.03); }
  dispose() { this.stop(); this.ctx?.close(); this.ctx = null; }
}

