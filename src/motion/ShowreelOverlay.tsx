import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Volume2, VolumeX, X } from 'lucide-react';
import { MotionStage } from './engine/stage';
import { buildReelSpec, REEL_DUR } from './engine/reelSpec';
import { ReelAudio } from './engine/audio';
import { reduced } from './tokens';
import { useLang } from '../i18n';

const fmt = (t: number) => `0:${String(Math.floor(t)).padStart(2, '0')}`;

/** The 15 s showreel: a 1920×1080 (or 1080×1920) stage generated entirely in code at 60 fps — nothing pre-rendered. */
const ShowreelOverlay: React.FC<{ onClose: () => void; startAt?: number; autoplay?: boolean }> = ({ onClose, startAt = 0, autoplay = true }) => {
  const { lang, t: tt } = useLang();
  const host = useRef<HTMLDivElement>(null), stage = useRef<MotionStage | null>(null), audio = useRef<ReelAudio | null>(null);
  const clock = useRef({ t: startAt, playing: false, last: 0, raf: 0 });
  const [ready, setReady] = useState(false), [playing, setPlaying] = useState(false), [muted, setMuted] = useState(false), [t, setT] = useState(startAt), [bg, setBg] = useState('#111112');

  const draw = useCallback((time: number, dt = 0.016) => { stage.current?.render(time, dt); }, []);
  const loop = useCallback((now: number) => {
    const c = clock.current; if (!c.playing) return;
    const dt = Math.min(0.05, (now - c.last) / 1000); c.last = now; c.t = Math.min(REEL_DUR, c.t + dt); draw(c.t, dt); setT(c.t);
    if (c.t >= REEL_DUR) { c.playing = false; setPlaying(false); return; }
    c.raf = requestAnimationFrame(loop);
  }, [draw]);
  const play = useCallback(() => {
    const c = clock.current; if (!stage.current) return; if (c.t >= REEL_DUR - 0.01) c.t = 0;
    c.playing = true; c.last = performance.now(); setPlaying(true); audio.current?.start(c.t); cancelAnimationFrame(c.raf); c.raf = requestAnimationFrame(loop);
  }, [loop]);
  const pause = useCallback(() => { const c = clock.current; c.playing = false; setPlaying(false); cancelAnimationFrame(c.raf); audio.current?.stop(); }, []);
  const seek = useCallback((time: number) => { const c = clock.current; c.t = time; setT(time); draw(time); if (c.playing) audio.current?.start(time); }, [draw]);

  useEffect(() => {
    const el = host.current; if (!el) return; let dead = false;
    const vw = el.clientWidth, vh = el.clientHeight, land = vw / vh >= 1, W = land ? 1920 : 1080, H = land ? 1080 : 1920;
    const spec = buildReelSpec(W, H, lang), st = new MotionStage(el, spec); stage.current = st; st.onBg = setBg;
    audio.current = new ReelAudio(spec.cues, spec.scenes.slice(1).map((s) => s.t0));
    const fit = () => st.resize(el.clientWidth, el.clientHeight, 'contain'); fit(); window.addEventListener('resize', fit);
    const pm = (e: PointerEvent) => { const r = el.getBoundingClientRect(); st.setPointer(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2); if (!clock.current.playing) draw(clock.current.t); };
    el.addEventListener('pointermove', pm);
    st.init().then(() => { if (dead) return; setReady(true); draw(clock.current.t); if (autoplay && !reduced()) play(); });
    return () => { dead = true; window.removeEventListener('resize', fit); el.removeEventListener('pointermove', pm); cancelAnimationFrame(clock.current.raf); clock.current.playing = false; audio.current?.dispose(); st.dispose(); stage.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); else if (e.key === ' ') { e.preventDefault(); clock.current.playing ? pause() : play(); } else if (e.key.toLowerCase() === 'm') { setMuted((m) => { audio.current?.setMuted(!m); return !m; }); } };
    window.addEventListener('keydown', kd); return () => window.removeEventListener('keydown', kd);
  }, [onClose, pause, play]);

  return (
    <div role="dialog" aria-modal="true" aria-label={tt('Showreel', 'عرض الأعمال')} className="fixed inset-0 z-[500] flex flex-col text-white" style={{ background: bg, transition: 'background-color .0s' }} data-lenis-prevent>
      <div ref={host} className="relative flex-1 min-h-0 overflow-hidden" dir="ltr" />
      {!ready && <div className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-[0.3em] text-[#d2ff00] bg-[#111112]">{tt('LOADING SHOWREEL', 'جارٍ تحميل العرض')}</div>}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex items-center gap-3 sm:gap-4 bg-gradient-to-t from-black/70 to-transparent" dir="ltr">
        <button onClick={() => (playing ? pause() : play())} aria-label={playing ? 'Pause' : 'Play'} className="w-10 h-10 rounded-full bg-[#d2ff00] text-[#111112] flex items-center justify-center cursor-pointer shrink-0">{t >= REEL_DUR && !playing ? <RotateCcw className="w-4 h-4" /> : playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</button>
        <input aria-label="Scrub" type="range" min={0} max={REEL_DUR} step={0.01} value={t} onChange={(e) => seek(+e.target.value)} className="flex-1 accent-[#d2ff00] cursor-pointer" />
        <span className="font-mono text-[11px] tracking-wider tabular-nums w-20 text-center shrink-0">{fmt(t)} / {fmt(REEL_DUR)}</span>
        <button onClick={() => { setMuted((m) => { audio.current?.setMuted(!m); return !m; }); }} aria-label="Mute" className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center cursor-pointer shrink-0">{muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}</button>
        <button onClick={onClose} aria-label="Close" className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center cursor-pointer shrink-0"><X className="w-4 h-4" /></button>
      </div>
    </div>
  );
};
export default ShowreelOverlay;
