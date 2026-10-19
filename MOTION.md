# Procedural motion graphics (no pre-rendered media)

- `src/motion/engine/` — one engine, used twice:
  - `ShowreelOverlay` — the 15 s, 128 BPM showreel (1920x1080, or 1080x1920 on phones), open with the SHOWREEL pill or `?showreel`.
  - `MotionOpener` — a 6.6 s title sequence at the top of every achievement, scrubbed by scroll.
- Visuals: Three.js orb morphing sphere → pyramid → torus → cube with a halftone fragment shader; canvas halftone photos (sampled from the project images each frame); DOM kinetic type; canvas vector HUD (rings, rulers, routes, grids, brackets).
- Audio: `engine/audio.ts` synthesises the score and sound design with the Web Audio API (oscillators + filtered noise). No samples, so nothing to license.
- Specs: `reelSpec.ts` and `episodeSpec.ts` are plain data; change times, colours, copy and layouts there.
