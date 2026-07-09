# Design System: The Inkwell — Sarim Hasan's Blog

**Date:** 2026-07-09  
**Project:** Personal blog on space, physics, philosophy, nature, and serenity  
**Approach:** Modern, minimalistic, and balanced across all five content themes

---

## Design Philosophy

The redesign rejects a single dominant visual language (e.g., purely sci-fi for physics, purely earthy for nature) in favor of a **calm, considered blend**. The palette draws from ink, graphite, candlelight, and dusk—materials and times of day that evoke both intellectual reflection and natural quietude.

---

## Color Palette

### Base Colors (Dark Warm-Graphite)

| Role | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Background** | `#100f0e` | rgb(16, 15, 14) | Main page background; calm, warm black |
| **Bg Elevated** | `#171513` | rgb(23, 21, 19) | Elevated surfaces (cards, panels) |
| **Bg Elevated Strong** | `#1d1a17` | rgb(29, 26, 23) | Highest elevation; strong separation |
| **Surface** | `#141210` | rgb(20, 18, 16) | Component backgrounds |
| **Surface 2** | `#1a1815` | rgb(26, 24, 21) | Secondary surface |
| **Surface 3** | `#211e1a` | rgb(33, 30, 26) | Tertiary surface |
| **Text** | `#eee8de` | rgb(238, 232, 222) | Primary text; warm light cream |
| **Text Muted** | `#ada398` | rgb(173, 163, 152) | Secondary text; muted taupe |
| **Text Soft** | `#837a6e` | rgb(131, 122, 110) | Tertiary text; soft warm gray |
| **Border** | rgba(173, 163, 152, 0.14) | — | Subtle dividers (14% opacity) |
| **Border Strong** | rgba(173, 163, 152, 0.24) | — | Prominent dividers (24% opacity) |
| **Shadow** | rgba(6, 5, 4, 0.45) | — | Soft drop shadows (45% opacity) |
| **Shadow Strong** | rgba(6, 5, 4, 0.72) | — | Strong elevation shadows (72% opacity) |

**Rationale:** Warm graphite avoids the cold tech-noir feel of pure blue-black. It pairs ink-on-paper with starlight and candlelight—visual anchors for both writing and contemplation.

### Primary Accent

| Role | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Accent** | `#c99a56` | rgb(201, 154, 86) | Primary interactive states; warm gold |
| **Accent Strong** | `#e3bf85` | rgb(227, 191, 133) | Hover/active emphasis; lighter gold |
| **Accent Soft** | rgba(201, 154, 86, 0.12) | — | Background tint (12% opacity) |

**Rationale:** Gold reads as sunlight, candlelight, and starlight simultaneously—warm but not garish. It replaces the original blue accent while maintaining sufficient contrast (WCAG AA+) and emotional coherence with the warm graphite base.

### Category Identity Colors

Each of the four content categories has a distinct, muted voice that sits _beside_ the warm-graphite base rather than competing for dominance. None is bright or neon; all are secondary to the primary accent.

#### Philosophy — Dusk Violet
- **Text:** `#c7ade0` | rgb(199, 173, 224)
- **Border (26% opacity):** rgba(168, 140, 201, 0.26)
- **Background (10% opacity):** rgba(168, 140, 201, 0.1)
- **Usage:** Category badges, navigation active state, chip accents
- **Emotional tone:** Contemplative, dreamlike, introspective

#### Science — Slate Blue
- **Text:** `#a8c7d8` | rgb(168, 199, 216)
- **Border (26% opacity):** rgba(122, 158, 181, 0.26)
- **Background (10% opacity):** rgba(122, 158, 181, 0.1)
- **Usage:** Physics, space, empirical content tags
- **Emotional tone:** Cool curiosity, clarity, structural thinking

#### Thoughts — Warm Clay
- **Text:** `#e0ab7e` | rgb(224, 171, 126)
- **Border (26% opacity):** rgba(195, 138, 96, 0.26)
- **Background (10% opacity):** rgba(195, 138, 96, 0.1)
- **Usage:** Personal reflection, journal, informal notes
- **Emotional tone:** Grounded, earthy, authentic

#### Miscellaneous — Sage Green
- **Text:** `#aecda6` | rgb(174, 205, 166)
- **Border (26% opacity):** rgba(140, 174, 134, 0.26)
- **Background (10% opacity):** rgba(140, 174, 134, 0.1)
- **Usage:** General, nature-adjacent, serenity content
- **Emotional tone:** Natural, calm, harmonious

**Rationale:** Each category gets its own subtle hue—distinct enough to aid scanning, muted enough to avoid visual chaos. The four colors are balanced: violet (cool-introspective), slate-blue (cool-analytical), clay (warm-grounded), sage (cool-natural). No theme dominates; they coexist in equilibrium.

---

## Typography

### Font Pairing

| Layer | Font | Weight & Style | Size Range | Usage |
|-------|------|-----------------|-----------|-------|
| **Headings** | Newsreader (Google Fonts) | 400–700, Roman & Italic | clamp(1.2rem, 3vw, 5.6rem) | H1–H4, section titles, emphasis |
| **Body** | Geist (system fallback: Segoe UI, sans-serif) | 400–600 | 1rem–1.05rem | Body copy, UI labels, form text |
| **Labels** | Geist | 400–600, uppercase | 0.66rem–0.76rem | Chips, eyebrows, metadata, tags |

**Rationale:**
- **Newsreader:** A serif font designed for long-form reading. Its optical sizing and generous proportions support both headlines and body text without switching fonts mid-page. Evokes literary journals and editorial typography—appropriate for a philosophy + science blog.
- **Geist:** A humanist sans-serif with warm neutrality, no-nonsense clarity. Supports Newsreader without visual conflict.
- No third font (no mono for general UI). Keeps palette focused; code blocks use system monospace only.

### Typography Scale

| Level | Font Size | Line Height | Letter Spacing | Weight |
|-------|-----------|-------------|----------------|--------|
| **H1 (Hero)** | clamp(2.9rem, 7vw, 5.6rem) | 1.15 | -0.02em | 600 (Newsreader) |
| **H2 (Section)** | clamp(1.8rem, 4vw, 2.7rem) | 1.15 | -0.02em | 600 (Newsreader) |
| **H3 (Subsection)** | clamp(1.3rem, 2.7vw, 2rem) | 1.15 | -0.02em | 600 (Newsreader) |
| **H4 (Card)** | 1.35rem | 1.15 | -0.02em | 500 (Newsreader) |
| **Body** | 1.02–1.05rem | 1.8 | 0 | 400 (Geist) |
| **Muted Body** | 1.02rem | 1.8 | 0 | 400 (Geist) |
| **Label/Small** | 0.66–0.76rem | 1.4 | 0.13em–0.16em | 500–600 (Geist) |

**Rationale:**
- **Tracking (letter-spacing):** Reduced from `-0.04em` / `-0.065em` to `-0.02em` across all headings. Tighter tracking feels more editorial and less tech-forward; -0.02em maintains readability while softening the heavy serif.
- **Line-height:** Consistent 1.15 for all headings supports the calm, readable aesthetic.
- **Label tracking:** Toned down from 0.18em to 0.14em–0.16em for a less "shouted" appearance.

---

## Component & Layout Decisions

### Navigation Bar (Navbar)

- **Active State:** Uses category-specific color with ring: `ring-1 ring-[rgba(201,154,86,0.22)]` and background `bg-[rgba(201,154,86,0.14)]`
- **Inactive State:** Neutral text, subtle hover background
- **Logo:** "I" in an outlined circle; text "The Inkwell" in warm cream
- **Mobile:** Hamburger menu with smooth animat transitions

**Rationale:** Keep the active state distinct without making the nav garish. The warm gold ring signals "you are here" without overwhelming page content.

### Sidebar Navigation (SidebarNav)

- **Category Links:** Each link uses its category's chip styling (`chip chip-philosophy`, `chip chip-science`, etc.)
- **Active State:** Font weight bumped to medium; ring added for focus clarity
- **Hover:** Opacity and border color increase; color text lifts toward the category accent
- **Mobile:** Horizontal scroll above the fold; links remain chippy and scannable

**Rationale:** Sidebar is a secondary navigation layer; category colors help users orient themselves instantly. The chip-based design reuses the same styling as post tags, reducing cognitive load.

### Featured Post & Post Cards

- **Featured Chip:** Uses the primary gold accent: `border-[rgba(201,154,86,0.28)] bg-[rgba(201,154,86,0.12)]`
- **Category Badge:** Uses category color
- **Hover State:** Cards lift slightly (`hover:-translate-y-1`); image scales subtly (`group-hover:scale-[1.03]`)

**Rationale:** Featured posts stand out via the primary accent, not via a busy secondary color. Category color immediately communicates what the post is "about."

### Article Page

- **Title:** Relaxed tracking (`tracking-[-0.02em]`), larger max-width to breathe
- **Excerpt:** Muted text; positioned below the metadata stripe
- **Author Line:** "Written by [Author]" in smaller scale, soft styling
- **Body Prose:** Links are gold; blockquotes use gold left border; code blocks have warm-graphite background with light border

**Rationale:** Reduce visual noise on the article page so readers focus on content. Gold accents guide eyes to calls-to-action and emphasize prose structure (blockquotes, links).

### Footer

- **Tagline:** Updated to reflect all five themes: "A quiet record of essays on space, physics, philosophy, and the slower rhythms of nature — written by Sarim Hasan to be read slowly."
- **Category Links:** Use full category chip styling (not just plain links), encouraging readers to explore by theme
- **Copyright:** Soft text; no visual emphasis

**Rationale:** The footer is an exit point; the updated tagline reminds readers what they've been reading. Category links turn the footer into a secondary discovery path.

### Spacing & Rhythm

- **Base Unit:** 4px–8px increments (Tailwind default); sections spaced at 24px–48px gaps
- **Card Padding:** 16px–24px internal; 24px–32px between sections
- **Typography Margins:** Consistent top/bottom margins tied to section hierarchy

**Rationale:** Predictable spacing supports the minimalistic aesthetic. Readers can scan confidently; no surprise layout shifts.

---

## Accessibility & Performance

### WCAG Compliance
- **Text Contrast:** Primary text (#eee8de) on dark background achieves >7:1 ratio (AAA)
- **Secondary Text:** Muted text (#ada398) achieves ~4.5:1 ratio (AA)
- **Focus States:** All interactive elements have visible focus rings (2px white/accent)
- **Keyboard Navigation:** Full keyboard support via `aria-current` on active navigation items

### Responsive Design
- **Mobile-First Breakpoints:** 375px (small phone), 768px (tablet), 1024px (desktop), 1440px (wide)
- **Typography Scales:** All headings use `clamp()` for fluid sizing without breakpoint hacks
- **Navigation:** Top bar visible on all sizes; sidebar hidden on mobile, visible on lg+
- **Images:** Lazy loaded with aspect-ratio reserves to prevent layout shift

### Color Mode
- **Dark Mode Only:** The warm-graphite base is the sole color scheme. No light mode at present.
- **OLED Optimization:** Backgrounds avoid pure #000000; using #100f0e reduces OLED pixel burn risk
- **Selection Color:** Text selection uses gold tint: `selection:bg-[rgba(201,154,86,0.2)]`

---

## Implementation Notes

### CSS Variables (in `src/styles/global.css`)

All colors are stored as CSS variables under `:root` for easy theming:
```css
--bg: #100f0e;
--accent: #c99a56;
--cat-philosophy: #c7ade0;
--cat-science: #a8c7d8;
--cat-thoughts: #e0ab7e;
--cat-miscellaneous: #aecda6;
/* ... and many more */
```

Components reference these via `var(--bg)`, `var(--accent)`, etc., enabling future theme switching without code changes.

### Tailwind Integration

- **No Custom Config Needed:** Tailwind's opacity modifiers (`bg-[rgba(...)]`) are used for transparency layers
- **Tracking Classes:** All letter-spacing values are inline (e.g., `tracking-[-0.02em]`) to keep files DRY
- **Responsive Classes:** `clamp()` is used for fluid type scaling (e.g., `text-[clamp(2.9rem,7vw,5.6rem)]`)

### Typography Files

**Google Fonts Import** (in `src/layouts/MainLayout.astro`):
```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap" rel="stylesheet" />
```

No additional font loading; Geist is a system font fallback.

---

## Design Rationale Summary

| Aspect | Choice | Why |
|--------|--------|-----|
| **Base Palette** | Warm graphite (#100f0e) | Avoids cold tech noir; evokes ink, night sky, candlelight |
| **Primary Accent** | Gold (#c99a56) | Warm, starlight-like; reads as sunlight + candlelight; high contrast |
| **Category Colors** | Four muted hues (violet, slate, clay, sage) | Balanced; no theme dominates; supports quick scanning |
| **Serif Font** | Newsreader | Designed for long-form reading; literary, not technical |
| **Heading Tracking** | -0.02em (vs. -0.04em–-0.065em) | Softens serif heaviness; maintains editorial feel |
| **Light Text** | Warm cream (#eee8de) | Softer than pure white; reduces eye strain in dark mode |
| **Card Elevation** | Subtle shadows + borders | Glassmorphism avoided; keeps focus on content |
| **Dark Mode Only** | No light variant | Matches blog's nocturnal, reflective tone |

---

## Future Enhancements

- **Light Mode:** A future expansion could add an inverse palette (cream background, dark text) for daytime reading
- **Animations:** Subtle entrance/scroll animations (GSAP) for post cards and sections
- **Custom Fonts:** Host Newsreader locally if performance requires
- **Brand Extensions:** Logo, color-coded post series, category-themed headers

---

**Design System Version:** 1.0  
**Last Updated:** 2026-07-09  
**Designed for:** The Inkwell — Sarim Hasan's Personal Journal
