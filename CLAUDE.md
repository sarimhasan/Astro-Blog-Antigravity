# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev        # dev server on http://localhost:4321 (CMS at /keystatic)
npm run build      # production build (Netlify SSR adapter)
npm run preview    # serve the build
npx astro sync     # regenerate content-collection types after schema/content changes
```

There is no test suite, linter, or formatter configured. "Verification" here means: `npm run build` clean, then walk the routes in a browser (see Routes below) in both themes and at 390 / 768 / 1440px.

## Architecture

Astro 5 in **`output: "server"`** (SSR) mode on the Netlify adapter, with Keystatic as a Git-backed CMS writing Markdoc into `src/content/`. React and `@astrojs/markdoc` are integrations only because Keystatic's admin UI needs them — there are no React components in `src/`.

### The backend contract

`src/content/config.ts` and `keystatic.config.ts` are a matched pair and are treated as **frozen**. The user has explicitly asked that CMS features not be altered. Two collections:

- `posts` — `title`, `excerpt?`, `category`, `date` (a plain `z.string()`, not a date), `readTime`, `featured`, `authorName`, `coverImage?`. No tags, no draft flag.
- `intel` — `title`, `excerpt?`, `itemType` (book/movie), `status` (in-progress/complete), `creator?`, `rating?`, `coverImage?`. Surfaced only at `/reading`.

Changing a field means changing both files in lockstep, or Keystatic will write frontmatter Zod rejects.

`coverImage` is a `z.string()` public path, so `astro:assets` optimisation is unavailable. Images use explicit `aspect-ratio` containers plus `loading`/`decoding` instead.

`@astrojs/db` is in `package.json` and `.env.example` mentions Turso, but the integration is **not** registered in `astro.config.mjs`. There is no database in this project.

### Two traps that fail silently

1. **This uses the legacy content-collections API** (`type: "content"`), not the `loader:`/`glob()` API. That means `entry.slug` (not `entry.id`) and `await entry.render()` (not `render(entry)`). Astro docs will show you the new API; it does not apply here.
2. **`src/lib/content.ts` helpers read the *flattened* post shape**, so `mapPostEntry` must run before `sortPostsByDateDesc` / `getFeaturedPost`. Passing raw collection entries compiles, runs, and sorts nothing — `date` and `featured` come back `undefined`.
   ```ts
   sortPostsByDateDesc((await getCollection('posts')).map(mapPostEntry))
   ```

Files under `src/content/` prefixed with `_` are excluded by Astro. After adding content by hand, run `npx astro sync`.

### Routes

`/` · `/<slug>` (post) · `/category/<slug>` · `/reading` · `/blog/<slug>` (301 shim to `/<slug>`, kept for old links) · `/keystatic`.

`category/[category].astro` and `reading.astro` set `export const prerender = false`. Unknown category slugs `Astro.redirect('/')` rather than rendering a convincing empty page. `/keystatic` is injected by the integration and does **not** use `MainLayout` — any in-site link to it needs `data-astro-reload` so `ClientRouter` doesn't intercept it.

### Design system

`DESIGN.md` at the repo root is the authority and is written from the built site. `design/DESIGN.md` describes an obsolete earlier generation — ignore it.

The governing idea is **dispersion**: category *is* wavelength. Everything hue-aware reads four generic CSS variables (`--hue`, `--hue-ink`, `--hue-soft`, `--hue-glow`), never a category name. A container binds them once via `hueVars(slug)` from `src/lib/categories.ts`, and everything inside tints. That file is the single source of truth for label, wavelength, blurb, and order — it is presentation-only and does not constrain the Zod schema, so a new category must be added in **three** places (Zod is `z.string()` so it won't complain, but the Keystatic select and `categories.ts` both need it).

`src/styles/global.css` holds the whole token layer. Tailwind v4 is wired through `@tailwindcss/vite` with **no config file**; runtime CSS variables are exposed as utilities via `@theme inline`. Import it as a frontmatter `import` in `MainLayout.astro` — a `<style is:global>@import …</style>` is not tracked by Vite and will serve stale CSS through HMR.

Two self-hosted variable fonts only (Anybody, Literata) in `public/fonts/`. There is deliberately **no interface monospace**; `--font-mono` resolves to the system stack and is used only by `.prose code`/`pre`. Metadata is set in the display face, sentence case, near-zero tracking. Do not reintroduce tracked-uppercase mono labels.

### Motion

One orchestrated programme in `src/scripts/animations.ts` — not per-component effects. GSAP 3.15, where every former Club plugin is free; ScrollSmoother, SplitText, Flip, Draggable, Inertia, DrawSVG, MorphSVG, ScrambleText and CustomEase are all registered and in use.

- Everything is inside `gsap.context()` + `gsap.matchMedia()`, with a real `(prefers-reduced-motion: reduce)` arm that lands every element in its final state — it is a designed branch, not a kill switch. Changing an animation means updating **both** arms.
- Lifecycle is `astro:page-load` / `astro:before-swap` (ClientRouter), which also fires on first load. Do not use `DOMContentLoaded`.
- Pages opt into behaviour through data attributes (`data-reveal`, `data-split-lines`, `data-scramble`, `data-magnetic`, `data-lift`, `data-width-scrub`, …) and identify themselves to the system via `page` on `MainLayout` → `data-page` on `<html>`.
- ScrollSmoother requires the `#smooth-wrapper` / `#smooth-content` pair in `MainLayout`; fixed chrome (nav, spine, cursor) must stay outside it.
- Content is visible by default. `[data-reveal]` is only hidden once the inline head script confirms JS is running *and* motion is allowed (`html.motion-ready`), so a failed bundle never yields a blank page.
- `src/scripts/interference.ts` renders the hero canvas: real two-source `sin(kr − ωt)` summation on a coarse grid, mapped through a LUT rebuilt from live theme tokens on theme change. It pauses off-screen and paints one still frame under reduced motion.

### Theme

Dark is the default and native state. Resolved by a blocking inline script in `MainLayout.astro` before first paint, persisted to `localStorage`, applied as `data-theme` on `<html>`. Light is a designed daylight counterpart with its own hue values, not an inversion. Any new colour must be defined for both.

## Notes

- `.claude/` and `.github/` are gitignored in this repo, so tooling config there is local-only.
- `README.md` describes a much earlier design generation (Outfit/Playfair, "vanilla CSS", light theme) and is stale.
