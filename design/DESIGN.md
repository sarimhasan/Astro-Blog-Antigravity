```markdown
# Design System Specification: The Mission Terminal

## 1. Overview & Creative North Star

### Creative North Star: "The Brutalist Observatory"
This design system is a synthesis of 1980s NASA mission control and modern, high-end editorial brutalism. It rejects the "softness" of the modern web in favor of deliberate, sharp, and technical interfaces. It is a "Mission Terminal"—an intersection where the cold precision of command-line telemetry meets the warm, tactile record-keeping of a personal observatory log.

To move beyond generic dark modes, this system utilizes **intentional asymmetry** and **high-contrast typographic scales**. Layouts should feel like a technical schematic: dense with information but organized with a rigid, mathematical logic. We are building for the "Digital Curator" who values technical density and atmospheric depth over simple whitespace.

---

## 2. Colors

The palette is rooted in the "Deep Vacuum" of space, using a spectrum of near-blacks and technical accents to drive focus.

### Color Roles
- **Primary (`#ffc880`):** The "Amber Glow." Used for critical data, primary actions, and warnings. It mimics the phosphor persistence of vintage CRT monitors.
- **Secondary (`#d7ffc5` / `#2ff801`):** The "Terminal Neon." Reserved for success states, active telemetry, and code-based flags.
- **Surface Tiers:** 
  - `surface_container_lowest` (#0a0e14): The base vacuum.
  - `surface_container` (#1c2025): The primary workspace.
  - `surface_container_highest` (#31353b): Elevated panels and active terminal inputs.

### The "No-Line" Rule
Prohibit standard 1px solid borders for sectioning large areas of the UI. Instead, define boundaries through **background color shifts**. Use `surface_container_low` sections sitting on `surface` backgrounds to denote hierarchy. Lines should only be used as "Data Bridges"—thin, technical connectors that link related data points, never as simple boxes.

### Signature Textures & Grains
To achieve a "premium industrial" feel, all large surface areas must have a subtle `3% opacity` noise texture overlay. For hero elements or image containers, apply a **Scan Line Overlay** (linear-gradient) to simulate a high-resolution terminal feed.

---

## 3. Typography

The typographic system is a high-contrast pairing of technical Monospaced fonts and intellectual Serifs.

### The Contrast Logic
- **Display & Headlines (Space Grotesk / Mono):** These are your "Telemetry." Use `display-lg` (3.5rem) for main headers. Headlines must feel mechanical, all-caps in specific contexts, and high-tracking (+5%).
- **Body Content (Newsreader / Serif):** This is the "Observatory Log." All long-form content uses `body-lg`. The serif choice adds a human, archival warmth to the cold technical surroundings, suggesting a personal hand behind the data.
- **Labels & Tags (Space Grotesk / Mono):** Small, technical metadata. Use `label-sm` (0.6875rem) with `--tag` prefixing for a command-line aesthetic.

---

## 4. Elevation & Depth

### Tonal Layering
Avoid drop shadows. Hierarchy is achieved by "stacking" the `surface-container` tiers. 
- **The Stacking Principle:** Place a `surface_container_highest` card on top of a `surface_container_low` background. This creates a "monolith" effect—objects feel physically part of the console rather than floating above it.

### The "Ghost Border" Fallback
Where separation is critical (e.g., input fields), use a **Ghost Border**. Apply `outline_variant` at 15% opacity. It should be just barely visible, like a faint etched line on a glass instrument panel.

### Glassmorphism & Thermal Glow
For floating modals or overlays, use `surface_container` with a `20px backdrop-blur`. Surround these elements with an **Amber Glow** (a subtle `primary` outer-glow at 10% opacity) to simulate light leaking from a cathode-ray tube.

---

## 5. Components

### Buttons
- **Primary:** Sharp 0px corners. Background: `primary_container`. Text: `on_primary_container`. On hover, add a `primary` outer glow.
- **Terminal (Ghost):** No background. 1px `outline` border. Prefix text with a cursor block `█`.

### Terminal Flags [--tag]
Instead of standard chips, use **Terminal Flags**.
- **Style:** Monospaced text, `label-md`, prefixed with `--`. 
- **Example:** `--status:active`. Use `secondary` (Neon Green) for values.

### Input Fields
- **State:** No rounded corners (`0px`).
- **Active State:** The border glows `primary` (Amber), and the background shifts to `surface_container_highest`. 
- **Cursor:** Use a blinking block cursor `_` in the `primary` color for text areas.

### Cards & Lists (The Divider Ban)
Forbid the use of horizontal divider lines. Separate list items using **Vertical White Space** (Spacing `4` or `5`) or subtle alternating background shifts (`surface_container_low` vs `surface_container`). This keeps the "Editorial" look clean and authoritative.

### Data Visualization
All charts must use the `primary` (Amber) and `secondary` (Neon) palette. Grid lines in charts must use `outline_variant` at 10% opacity.

---

## 6. Do's and Don'ts

### Do
- **Do** use sharp 0px corners for every single element.
- **Do** use `0.1rem` (Spacing 0.5) for tight technical metadata groupings.
- **Do** treat typography as a graphical element. Align text to a rigid, asymmetrical grid.
- **Do** use the `primary` amber for "interactive" elements and `secondary` green for "system status" elements.

### Don't
- **Don't** use border-radius. Ever. It breaks the industrial terminal aesthetic.
- **Don't** use standard "Material" shadows. If an element needs to pop, use tonal contrast or a faint amber glow.
- **Don't** use icons without accompanying text labels. This is a technical system; clarity is found in the data, not just the symbol.
- **Don't** use pure white. Always use `Text Primary` (#E8E6DF) to maintain the "warm" aged-paper/monitor feel.

---

## 7. Spacing Scale

Strict adherence to the spacing scale is required to maintain the "Linear.app" level of precision.
- **Micro-spacing (0.5 - 2):** For internal component padding and label-to-value relationships.
- **Macro-spacing (16 - 24):** For sectioning major "Mission Modules" on the screen.
- **Asymmetry Rule:** Use larger left-hand margins (e.g., `24`) and tighter right-hand margins (e.g., `12`) to create a deliberate, non-centered editorial layout.```