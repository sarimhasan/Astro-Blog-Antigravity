---
name: Ink & Graphite
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#43474c'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#74777d'
  outline-variant: '#c4c6cd'
  surface-tint: '#4e6073'
  primary: '#162839'
  on-primary: '#ffffff'
  primary-container: '#2c3e50'
  on-primary-container: '#96a9be'
  inverse-primary: '#b5c8df'
  secondary: '#556254'
  on-secondary: '#ffffff'
  secondary-container: '#d6e4d2'
  on-secondary-container: '#596658'
  tertiary: '#312419'
  on-tertiary: '#ffffff'
  tertiary-container: '#493a2e'
  on-tertiary-container: '#b8a394'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4fb'
  primary-fixed-dim: '#b5c8df'
  on-primary-fixed: '#091d2e'
  on-primary-fixed-variant: '#36485b'
  secondary-fixed: '#d9e6d5'
  secondary-fixed-dim: '#bdcab9'
  on-secondary-fixed: '#131e13'
  on-secondary-fixed-variant: '#3e4a3d'
  tertiary-fixed: '#f6decd'
  tertiary-fixed-dim: '#d9c2b2'
  on-tertiary-fixed: '#25190f'
  on-tertiary-fixed-variant: '#534437'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  display-lg:
    fontFamily: Courier Prime
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Courier Prime
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Courier Prime
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Courier Prime
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Source Serif 4
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Courier Prime
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  caption:
    fontFamily: Source Serif 4
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  dot-size: 1px
  dot-gap: 24px
  margin-page: clamp(1.5rem, 5vw, 4rem)
  gutter: 1.5rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style
This design system captures the quiet, introspective atmosphere of a physical dotted journal. It is built for a personal blog that prioritizes slow reading, thoughtful reflection, and a tactile digital experience. The brand personality is scholarly yet approachable, evoking the feeling of high-quality stationery and late-night writing sessions.

The design style is **Tactile Minimalism** with **Stationery-inspired** elements. It avoids the sterile coldness of modern SaaS interfaces in favor of warmth and "analog" imperfections. Depth is created through layering paper-like surfaces rather than traditional digital elevation, using a moody, low-contrast color palette to reduce eye strain and encourage long-form engagement.

## Colors
The palette is rooted in natural pigments: carbon inks, iron-gall blues, and organic dyes. 

- **Primary (Ink Blue):** Used for primary navigation, links, and significant headings.
- **Secondary (Forest Green):** Used for categorization, success states, and subtle callouts.
- **Tertiary (Sepia):** Used for decorative elements, date stamps, and metadata.
- **Neutral (Cream):** The base "paper" color. It is a warm off-white that prevents the harshness of pure white (#FFFFFF).
- **Dot Grid:** A muted, low-contrast gray-beige used for the background pattern to guide the eye without competing with content.

## Typography
The typographic system relies on the contrast between the mechanical, fixed-width nature of a typewriter and the fluid, classic elegance of a literary serif.

- **Headings & Labels:** `Courier Prime` provides the "typewritten" aesthetic. It should be used for titles, dates, and UI labels to suggest a manual, hand-crafted entry.
- **Body Text:** `Source Serif 4` is chosen for its exceptional readability. Its balanced x-height and classic proportions make it ideal for long-form essays.
- **Stylistic Note:** Use "hand-drawn" underlines (via SVG or CSS mask-image) for links instead of standard text-decoration. Blockquotes should feature a slightly tinted background or a thick "ink-bleed" left border.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. While the main reading column is fixed to a maximum width (e.g., 720px) to ensure optimal line lengths, the surrounding canvas uses a dot grid pattern.

- **Dot Grid:** The background should feature a repeating 24px dot grid pattern. Content should ideally align its vertical rhythm and horizontal margins to these increments, mimicking how one writes in a Leuchtturm or Moleskine journal.
- **Intentional Asymmetry:** To enhance the "diary" feel, use slightly asymmetrical margins or "tacked-on" side notes (marginalia) that sit outside the main content column on larger screens.
- **Breakpoints:** On mobile, margins shrink to 24px, and the dot grid persists but may scale down to a 16px rhythm to maintain visual density.

## Elevation & Depth
In this design system, depth is achieved through **Tonal Layering** and **Soft Paper Shadows**. 

Avoid heavy blurs or neon glows. Instead, use:
- **Paper Stacking:** A secondary card or container should appear as if a smaller piece of paper has been laid on top of the main sheet. This is achieved with a very slight color shift and a 2px-4px soft shadow with low opacity (10-15%) using the primary ink color rather than pure black.
- **Subtle Texture:** Use a light grain or noise overlay (3-5% opacity) on the background to simulate the tooth of high-quality paper.
- **Hard-edge "cutouts":** Insets (like search bars or inputs) should look slightly debossed, as if pressed into the paper stock.

## Shapes
Shapes are generally **Soft**, reflecting the slightly rounded corners of a bound notebook. 

- **Containers:** Use `0.25rem` (Soft) for most components. This avoids the "too-perfect" feel of sharp corners while remaining professional.
- **Buttons & Chips:** Use a slightly higher roundedness for interactive elements to make them feel more "hand-held."
- **Organic Borders:** Occasionally use `border-radius` values that are slightly mismatched (e.g., `2px 4px 3px 5px`) to simulate the organic nature of a physical page.

## Components
- **Buttons:** Styled with a solid "Ink Blue" background and "Cream" text. Use a slight "lift" hover effect—a shadow that expands 1-2px to simulate the button being less pressed against the paper.
- **Chips/Tags:** Should look like small strips of paper or tape. Use the `Sepia` or `Forest Green` colors with low-opacity backgrounds.
- **Input Fields:** Minimalist. Only a bottom border (1px solid Ink Blue) to mimic a ruled line, or a very light "recessed" box with the dot grid visible inside.
- **Cards:** Use a slightly different "paper" tint (#F9F7F2) against the main background to define the area. Add a subtle shadow on the bottom-right only to suggest a light source from the top-left.
- **Hand-drawn Accents:** Incorporate "sketched" icons (e.g., a simple loop for a link, a rough star for a favorite) and use SVG paths for dividers that have a slight "shake" or "bleed" to them.
- **Sticky Notes:** A specific component for callouts or "PS" notes, using a slightly warmer yellow-tinted cream background and the `Courier Prime` font.