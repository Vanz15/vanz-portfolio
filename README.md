# vanz-portfolio

My personal site. Next.js 16, React 19, Tailwind v4, TypeScript.

Live at [aivann.dev](https://aivann.dev). Source lives here, deploys go to Vercel.

## What's in it

Five sections, all content driven from one file:

- **Hero** — intro, portrait, social links
- **Selected works** — three project case studies
- **Toolbox** — the tools I actually reach for
- **Research** — my undergraduate thesis on medical AI reliability
- **Contact** — links and the rolling wordmark

Copy, links and project data live in `src/lib/content.ts`. Editing that file is
usually all you need to change what the site says.

## Running it

```bash
npm install
npm run dev
```

Then open [localhost:3000](http://localhost:3000).

```bash
npm run build     # production build
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```

Node 24 or newer.

## How the motion works

Scroll animations are plain CSS, driven by `animation-timeline: view()`. No
animation library. Each block's progress is tied to its position in the
viewport rather than to elapsed time, so scrolling back up plays them in
reverse for free.

Smooth scrolling is [Lenis](https://github.com/darkroomengineering/lenis).

Everything collapses under `@media (prefers-reduced-motion: reduce)`. If the
animations look like they aren't running, check that setting first — Windows
disables visual effects system-wide when it's on, and Chromium inherits that.

## Layout

```
src/
  app/            routes, layout, global styles
  components/site/ one file per section
  lib/content.ts  all copy and data
public/
  images/ videos/ papers/
```

## Credits

Built on a Next.js starter template. The site's own code is mine.
