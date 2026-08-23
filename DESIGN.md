# Design System — Spectral Editorial

The visual system for `sarimhasan` (the blog). Written from the built site, not from
intention. Supersedes `design/DESIGN.md` ("The Mission Terminal") and the deleted
`DESIGN_DECISIONS.md` ("The Inkwell"), both of which describe designs that no longer exist.

---

## Thesis

A physics blog does not have to look like space. It can look like **light itself**.

Everything derives from one idea — **dispersion**: white light entering a prism and leaving as
an ordered spectrum. That single idea supplies the palette, the navigation, the section
identities, the empty states, the site mark, and the hero.

**What this refuses.** Near-black plus one neon accent. Starfields, planets, orbit rings,
constellation dot-grids. Cream paper and a high-contrast serif. Any of the three would have been
the predictable answer for "physics blog", "personal blog", or "AI-designed dark site".

**The physics is structural, never decorative.** It appears as instrumentation and notation —
ticked rules, wavelength readouts, a dispersion diagram, a live interference field. A reader who
loves physics notices every one. A reader who does not sees precise editorial design.

---

## Colour

### The programme

Category **is** wavelength. This is the spine of the whole system and it touches every surface.

| Category | Spectral position | Dark | Light |
|---|---|---|---|
| `philosophy` | 410nm violet | `#8b6bff` | `#5b2fd6` |
| `science` | 490nm cyan | `#2fd4e8` | `#0b7f96` |
| `thoughts` | 600nm amber | `#ffae3b` | `#b45a00` |
| `miscellaneous` | extra-spectral magenta | `#ff5fa8` | `#c4156a` |

Each has four tokens: `--cat-<slug>` (the hue), `-ink` (text-safe on the ground), `-soft`
(field tint), `-glow` (bloom).

### The local-hue indirection

**No component ever names a category.** Every hue-aware rule reads four generic variables:

```
--hue        the colour itself
--hue-ink    text-safe variant
--hue-soft   large-area tint
--hue-glow   bloom colour
```

A container binds them once via `hueVars(slug)` from `src/lib/categories.ts`, and everything
inside it tints. This is why a post page, a category page, a list row, and a nav link all take
their colour from one attribute with no per-category CSS classes anywhere.

### Colour strategy: Full palette, at page scale

Colour owns whole **regions**, not accents:

- A post page is drenched in its category's hue — the header wash, the top rule, the chip, the
  prose headings, links, list markers, the read-next block.
- Category pages open on a full-bleed field of their hue.
- The homepage's four section bands each carry their own hue rule and a resting wash, so the
  sections list reads as a stack of four spectral rules.
- The footer closes on all four in sequence.

If a region is not tinted, that is a decision, not an omission.

### Ground

**Dark is the default and the native state.** `--bg: #08060f` — ink-indigo, never black. The
chroma is what lets saturated hues sit on it without vibrating.

**Light is a designed daylight counterpart, not an inversion.** `--bg: #faf8f4` warm paper,
`--text: #141221` ink, the same four hues pushed darker and more saturated so they hold contrast
against white. Layout, composition, and every structural mark are identical between themes.

Resolved in a blocking inline script in `MainLayout.astro` before first paint. Persisted to
`localStorage`. No flash, ever.

---

## Typography

**Two** variable families, self-hosted as `woff2` in `public/fonts/` (280 KB total). No third-party
font request.

| Face | Role | Why |
|---|---|---|
| **Anybody** | display, all UI text, **and all metadata** | Geometric, quirky, uncommon. Its `wdth 50–150` axis is *animatable* — the hero headline physically compresses on scroll. No static face offers this. |
| **Literata** | article prose only | Built for long-form reading; excellent on a dark ground. |

**There is no interface monospace, deliberately.** Tiny tracked-uppercase mono labels are the
single loudest tell of a generated interface, and this site had them everywhere. Metadata —
dates, read times, counts, wavelengths, section labels — is set in the display face at
`0.8125rem`, weight 500, **sentence case, near-zero tracking** (`.readout`). Chips are the same
face at `0.75rem`/600, also sentence case.

`--font-mono` still exists but resolves to the reader's own system stack (`ui-monospace, …`) and
is used **only** by `.prose code` and `.prose pre`. If it is not code, it is not mono. Do not
reintroduce a shipped mono face for labels.

### Scale

`.display-xl` `clamp(2.5rem, 6.4vw, 5.75rem)` · `.display-lg` `clamp(2.4rem, 6.5vw, 5.25rem)` ·
`.display-md` `clamp(1.85rem, 3.8vw, 3.1rem)` · `.display-sm` `clamp(1.3rem, 2.2vw, 1.8rem)`

Display is `font-weight: 800`, `letter-spacing: -0.035em`, `line-height: 0.92`.

**Caution:** the `ch` unit scales with the `wdth` axis, so headline measures are bounded in
absolute units (`min(100%, 72rem)`), never in `ch`. `text-wrap: balance` also fights the width
axis and forces extra lines on hero headlines — use `pretty` there.

Prose measure is `68ch`, dropping to `58ch` for reading-log notes (marginalia, not essays).

---

### The hero

The hero is a **full-viewport plate**: `min-height: 100svh` (with a `100vh` line above it as the
fallback), laid out as `grid-template-rows: auto minmax(0, 1fr) auto` — three registers that
anchor the top, middle and bottom edges of the screen.

| Register | Holds |
|---|---|
| **Rail** | A ticked rule and two readouts: entry and wavelength counts on the left, the latest publication date on the right. Sits under the fixed nav and holds both upper corners. |
| **Headline block** | The h1, then a hairline with the lede on the left and the "Start reading" cue on the right. Vertically centred in the flexible row. |
| **Spectrum band** | The four categories in spectral order — a bar, a label, and a `wavelength · count` readout each. Holds the bottom edge. |

Only the middle row flexes, and it centres its content, so leftover height is split evenly above
and below the type instead of collecting in one dead band. The earlier build had no `min-height`
for exactly that reason; what makes the full-height version work is that the headline takes the
**viewport height** as a size ceiling, not only its width:

```css
/* ≥900px */
font-size: clamp(3rem, min(13.8vw, 12.4svh), 11.5rem);
```

The `vw` term is a *safety* ceiling, not the design intent. The longest word in the headline,
"philosophy,", measures **5.69em** at `wdth 94`, so any size above `container / 5.69` overflows
its line box and is clipped by the hero overflow. Each arm keeps roughly a 5% margin under that:
`13vw` capped at `6rem` below 720px, `13.8vw` capped at `8rem` on tablets, `13.8vw` capped at
`11.5rem` from 900px. **Re-measure that em width before changing the headline text or its
weight.**

Measured fill — hero height against viewport, and the gap above and below the type block:
1440×900 → 900 (33px) · 1920×1080 → 1080 (83px) · 1907×911 → 911 (37px) · 1280×800 → 800 (63px) ·
1024×1366 → 1366 (124px) · 768×1024 → 1024 (56px) · 375×812 → 812 (26px).

## Structural marks

These four recur everywhere and are what make the system legible as one thing:

1. **The spectrum spine** — a hairline pinned to the left edge of every page that fills with the
   full dispersion as you scroll. Reading progress and the site's signature at once. Ticked with a
   wavelength scale above 1024px.
2. **The wavelength rule** — a 2px hue line with a glow, at the top of every coloured region
   (post headers, category headers, homepage section bands). The reading page, which no single
   category owns, gets the whole spectrum instead.
3. **Ticked rules** (`.rule-ticked`) — a 1px rule with measurement ticks fading out to the right.
   An instrument scale up close, a fine editorial rule at a glance.
4. **The dispersion diagram** (`DispersionMark.astro`) — a beam, a prism, seven fanned rays in
   spectral order. Fills every genuinely empty region. Draws itself in under DrawSVG.

---

## Components and shape

- `--r-sm .375rem` · `--r-md .75rem` · `--r-lg 1.25rem` · `--r-xl 2rem`
- Shadows always carry an offset *and* a blur (`--shadow-low/mid/high`). Never a zero-offset halo.
- `--gutter` (1.25 / 2.5 / 3.5rem by breakpoint) drives `.shell`, `.shell-wide`, and
  `.shell-inset`. Full-bleed regions that must align to the text edge use `.shell-inset`.
- **`.plate` is used sparingly.** Page structure is composed regions, rules, and rows — not a
  grid of equal cards. A uniform card grid is the failure mode this system exists to avoid.
- Icons come from `Icon.astro` only: one 24 grid, 1.6 stroke, round caps. **No emoji, no unicode
  arrows, no second icon set.**
- No eyebrows or kickers above headings. Headings carry their own weight.

---

## Motion

One orchestrated programme in `src/scripts/animations.ts`, not scattered effects. GSAP 3.15 with
the full plugin set (free since 3.13). Everything inside `gsap.context()` + `gsap.matchMedia()`.

| Plugin | Job |
|---|---|
| `ScrollSmoother` | Page smooth scroll and `data-speed` parallax. Requires the `#smooth-wrapper` / `#smooth-content` pair in `MainLayout`; fixed chrome stays outside it. |
| `SplitText` | Masked line reveals on every page's h1 (`data-split-lines`). Handles `aria-label` itself. |
| `Flip` | The reading log's filter reflow. |
| `Draggable` + `Inertia` | The reading shelf. |
| `DrawSVG` | Dispersion diagrams and rules. |
| `MorphSVG` | Theme toggle, sun ↔ moon. |
| `ScrambleText` | Metadata resolving on reveal (`data-scramble`) — instrument settling. |
| `CustomEase` | `"spectral"` = `0.16, 1, 0.3, 1`. The house ease. Also `--ease` in CSS. |
| `ScrollTrigger` | Reveals, the spine fill, the headline `wdth` scrub. |

Plus a custom **lens cursor** that dilates over interactive elements and picks up the local
`--hue`, magnetic pull on primary controls, and the **live interference canvas**
(`src/scripts/interference.ts`) — real two-source `sin(kr − ωt)` summation on a 340×210 grid, with
the pointer as a third source, mapped through a LUT built from the live theme tokens.

### Rules

- **Content is visible by default.** `[data-reveal]` is only hidden once the inline head script
  confirms JS is running *and* motion is allowed (`html.motion-ready`). A failed bundle or a
  crawler never sees a blank page.
- **Reduced motion is a designed state, not a kill switch.** `matchMedia` has a real
  `(prefers-reduced-motion: reduce)` arm: everything lands final, ScrollSmoother is off, the
  canvas paints one still frame, the cursor never mounts, and the headline holds its start `wdth`
  so the composition is *identical*.
- Lifecycle is `astro:page-load` / `astro:before-swap` (ClientRouter), which fires on first load
  too.

---

## Content contract — do not break

The frontend is built strictly on the existing backend. **`src/content/config.ts` and
`keystatic.config.ts` were not touched and must stay that way unless you intend a CMS change.**

Available on `posts`: `title`, `excerpt?`, `category`, `date` (string), `readTime`, `featured`,
`authorName`, `coverImage?` — **and nothing else**. No `tags`, no `draft`, no `description`.
On `intel`: `title`, `excerpt?`, `itemType`, `status`, `creator?`, `rating?`, `coverImage?`.

`src/lib/categories.ts` is presentation-only. It does not constrain the schema; Keystatic still
owns the authoring options. If a category is added there, add it here too.

Helpers in `src/lib/content.ts` read the *flattened* shape — **map before you sort**, or
`date`/`featured` will be `undefined` and sorting will silently no-op.

`coverImage` is a `z.string()` public path, which forecloses `astro:assets` optimisation. Images
therefore use explicit `aspect-ratio` containers plus `loading`/`decoding` to avoid layout shift.
Changing this requires a schema change.

`/keystatic` is injected by the integration and does not use `MainLayout`. Any in-site link to it
must carry `data-astro-reload` so ClientRouter does not intercept it.

---

## Routes

`/` · `/<slug>` · `/category/<one of four>` (anything else redirects home) · `/reading` ·
`/blog/<slug>` (301 shim, kept) · `/keystatic`.

There is deliberately no 404, RSS, or sitemap — not an oversight, a scope decision.

---

## Voice

First person, specific, and a little self-deprecating. "Physics, philosophy, and books that ruin
me." "Nothing at 490nm yet." "Still writing. Still wrong about things."

Empty states say what is true rather than apologising or promising. Controls name their action
("Read this one", "Open the reading log"), never "Learn more".
