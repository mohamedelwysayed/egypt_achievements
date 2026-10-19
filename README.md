# EGYPT — The Eternal Continuity

Editorial, scroll-driven site: cinematic hero with a dual-reality cursor lens, message marquee, dual profile,
a 20-epoch horizontal timeline, a fanned gallery arc, a layered-parallax Pyramids scene, a monuments
showcase and 20 full-screen achievement story pages.

Stack: React 19 · Vite 8 · TypeScript · Tailwind 4 · GSAP · Lenis · Motion.

## Run

```bash
npm install          # .npmrc sets legacy-peer-deps (Vite 8 / plugin-react peer ranges)
npm run dev          # http://localhost:3000
npm run build        # production build -> dist/
npm run preview      # serve dist/ at http://localhost:4173
```

`dist/` is a static site with relative asset paths: upload it to any static host
(Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3) or open it from any sub-folder.

## Project layout

- `src/components/` — one file per section + small interaction primitives
  (`Magnetic`, `TiltCard`, `BoxReveal`, `MicroCursor`, `RiveSleekBackground`).
- `src/data/` — timeline and achievement content (edit copy here).
- `src/utils/assets.ts` — image registry. Use `img('file_name_without_extension')`; never hard-code `/src/assets/...`.
- `src/utils/smoothScroll.ts` — Lenis + GSAP bridge and the multi-owner scroll lock
  (`stopScroll('owner')` / `startScroll('owner')`).
- `design-source/` — not shipped: original full-size JPGs of the transparent cutouts, unused images, retired code.

## Notes for editing

- Overlays with their own scroll (story page, nav drawer) carry `data-lenis-prevent` so the wheel scrolls them natively.
- Portraits and the pyramid sky are pre-cut transparent WebPs (`*_cut.webp`) — re-export from `design-source/` if you change them.
- Fonts load from Google Fonts; with no network the site falls back to system serif/sans.
- Animations respect `prefers-reduced-motion`.
