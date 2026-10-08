# vanz-portfolio

Personal site and portfolio for Aivann Martinez. Built with Next.js 16, React 19,
Tailwind CSS v4, and TypeScript.

> [!NOTE]
> This repository holds the source for the site. The deployed version lives at
> [aivann.dev](https://aivann.dev).

## About

The site is a single-page portfolio covering three project case studies, the
toolbox used to build them, and an undergraduate thesis on medical AI
reliability. All copy, links, and project data are kept in a single module so
content changes do not require touching components.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| UI | React 19, Tailwind CSS v4 |
| Smooth scrolling | Lenis |
| Hosting | Vercel |

## Getting started

Requires Node.js 24 or newer.

```bash
npm install
npm run dev
```

The site is served at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler in check mode |
| `npm run check` | Run lint, typecheck, and build together |

## Project structure

```text
src/
├── app/                  # Routes, layout, global styles
│   ├── globals.css       # Tailwind theme, scroll-driven animations
│   └── layout.tsx        # Metadata and root layout
├── components/
│   └── site/             # One component per page section
└── lib/
    ├── content.ts        # All site copy and project data
    └── utils.ts          # Shared helpers
public/
├── images/               # Photography and project media
├── videos/               # Demo recordings
└── papers/               # Thesis PDF
```

## How the scroll animations work

Motion is implemented with CSS scroll-driven animations using
`animation-timeline: view()` rather than a JavaScript animation library.

Each element's animation progress is bound to its position within the viewport
instead of to elapsed time. As a result, scrolling back up naturally reverses
the animation without any additional bookkeeping, and animations stay in sync
with the scrollbar.

Above-the-fold content cannot use a `view()` timeline because it is already in
frame when the page loads, so those blocks use a one-shot load animation with a
staggered delay.

> [!IMPORTANT]
> All animations are disabled under `prefers-reduced-motion: reduce`. If the
> site appears static, check that setting first — Windows disables visual
> effects system-wide when it is enabled, and Chromium inherits the preference.

## Accessibility notes

- Animated content is hidden from assistive technology and exposed as static
  text through `aria-label`, so screen readers are not affected by the
  scroll-driven transforms.
- Keyboard focus states are defined for all interactive elements.
- The site is fully usable with animation disabled.

## Contributing

Issues and pull requests are welcome. Run `npm run check` before submitting to
confirm lint, types, and the production build all pass.
