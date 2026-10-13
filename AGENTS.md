<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# vanz-portfolio

## What This Is
A personal portfolio site for Aivann Martinez. One route (`/`), fully static, deployed on Vercel at
[aivann.dev](https://aivann.dev). There is no CMS, no API, no database, and no environment variables —
the site is content, markup, and CSS.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **Styling:** Tailwind CSS v4 with a hand-rolled token set in `src/app/globals.css`
- **Icons:** `lucide-react`, plus inline brand SVGs in `src/components/site/brand-icons.tsx`
- **Smooth scrolling:** Lenis
- **Deployment:** Vercel

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes; no inline styles except the `--i` / `--c` stagger indices the
  animation primitives inject
- 2-space indentation
- Responsive: mobile-first

## Content
- **All copy, links, and project data live in `src/lib/content.ts`.** Content changes must not
  require touching components.
- To add a case study, append one `CaseStudy` object to `caseStudies`. `work.tsx` picks the
  video / paper / image variant automatically.

## Design System
- The palette is documented in `src/app/globals.css` — warm paper background, ink foreground,
  and a single saturated pen-blue accent. Do not introduce a second accent color.
  The one exception is the highlighter wash (`--highlight-wash` in `globals.css`),
  used for marker-pen marks behind a word. It is a surface tint, not an accent.
- Radius, spacing, and type scale are Tailwind theme tokens; do not hardcode new arbitrary values
  when an existing token fits.
- Motion for the site sections is **CSS scroll-driven** (`animation-timeline: view()`), not a JavaScript
  animation library. Above-the-fold content uses the one-shot `.reveal-in` path because it cannot use a
  `view()` timeline.
- Exception: components vendored from a shadcn registry under `src/components/ui/` bring their own
  animation library and their own styling. Treat those files as vendored — adapt them to this project's
  tokens at the call site rather than rewriting them, and do not convert them to CSS scroll-driven.
- Every animation must stay behind `prefers-reduced-motion: reduce`. The site must remain fully
  readable and navigable with animation disabled.

## Project Structure
```
src/
  app/                  # Single route, layout, global styles
  components/
    site/               # One component per page section, plus animation primitives
    ui/                 # Vendored shadcn-registry components
  lib/
    content.ts          # All site copy and project data
    utils.ts            # cn() helper
public/
  images/               # Photography and project media
  videos/               # Demo recordings
  papers/               # Thesis PDF
scripts/
  sync-agent-rules.sh   # Regenerates the agent config files below
docs/agents/            # Agent workflow docs
```

## Agent skills

### Issue tracker

Issues and specs live as markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one `GLOSSARY.md` at the repo root and `docs/adr/`. See `docs/agents/domain.md`.

## MOST IMPORTANT NOTES
- When launching Claude Code agent teams, ALWAYS have each teammate work in their own worktree branch and merge everyone's work at the end, resolving any merge conflicts smartly since you are basically serving the orchestrator role and have full context to our goals, work given, work achieved, and desired outcomes.
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh` to regenerate platform-specific instruction files. CI fails if the generated copies drift.
