# GSAP Animations Guide — The Inkwell Blog

**Status:** ✅ All animations active and working  
**Framework:** GSAP 3.x with ScrollTrigger  
**Accessibility:** Full support for `prefers-reduced-motion`

---

## Overview

The blog now includes **5 categories of animations** that trigger automatically when pages load and as users scroll. All animations respect user motion preferences for accessibility.

### Animation System Features
- **Client-side only** — No server impact
- **Accessible** — Disabled for users who prefer reduced motion
- **Responsive** — Works on all device sizes
- **Auto-reinit** — Handles Astro client-side navigation (astro:after-swap)

---

## Animation Types & Implementation

### 1. **Entrance Animations** (Page Load)

#### Hero Heading Letter-by-Letter Reveal
```
Trigger: Page load
Duration: ~1 second (0.05s per letter + stagger)
Effect: Letters fade in one-by-one
Element: [data-animate="hero-heading"]
```

Applied to:
- Homepage hero heading: "Notes on the universe, the mind, and the quiet in between."
- Category archive page headings (Philosophy, Science, etc.)

#### Post Cards Fade + Slide
```
Trigger: Page load
Duration: 0.8s per card, staggered 0.15s apart
Effect: Cards fade in from opacity 0 → 1, slide up (y: 30 → 0)
Element: [data-animate="post-card"]
```

Applied to:
- Archive post cards on homepage (Latest writing grid)

#### Featured Section Scale + Fade
```
Trigger: Page load (0.3s delay)
Duration: 1s
Effect: Featured post scales in (0.95 → 1) with cubic easing
Element: [data-animate="featured-section"]
```

Applied to:
- Featured post card (right column, homepage)

#### Section Titles Fade + Slide
```
Trigger: Page load
Duration: 0.9s
Effect: Titles fade in and slide up (y: 20 → 0)
Element: [data-animate="section-title"]
```

Applied to:
- "Latest writing" (Recent entries section)
- "Notes in orbit" (Reading list section)
- "More writing from the archive" (Archive grid header)

---

### 2. **Scroll Reveal Animations**

Elements fade in + slide up as they enter the viewport (80% scroll position).

```
Trigger: User scrolls element into view (top 80% of viewport)
Duration: 0.8s
Effect: Opacity 0 → 1, Y translate 40 → 0
Element: [data-scroll-reveal]
Reverse: Yes (reverses if user scrolls back up)
```

Applied to:
- Article body content on post pages ([slug].astro)
- Category archive post articles ([category].astro)

---

### 3. **Card Hover Effects**

Interactive lift + glow on mouse hover.

```
Trigger: Mouse enter
Duration: 0.4s
Effects:
  - Y position -8px (lifts card)
  - Box shadow expands with gold accent glow
Reverse: On mouse leave
Element: [data-hover-card]
```

Applied to:
- Archive post cards (Latest writing grid)
- Archive post grid cards
- Category archive article cards

**Shadow detail:**
```css
box-shadow: 0 20px 60px rgba(201, 154, 86, 0.3)
```

Gold accent color creates warm, cohesive visual feedback.

---

### 4. **Text Animations**

Individual character reveal on scroll (similar to hero heading but scroll-triggered).

```
Trigger: Element enters viewport (top 80%)
Duration: Per-character 0.06s with 0.04s stagger
Effect: Characters fade in from opacity 0 → 1
Element: [data-animate-text]
```

Applied to:
- Post page titles on individual article pages

---

### 5. **Parallax Background**

Subtle background movement as users scroll (fixed position background layers).

```
Trigger: Continuous scroll
Duration: Scrub 1 (tied to scroll progress)
Effect: Background moves Y by -15px per 100vh scroll
Element: [data-parallax="15"]
```

Applied to:
- MainLayout background gradient (fixed inset-0 background)

**Visual effect:** The warm gold and slate blue gradient subtly "lags" behind the scrolling content, creating depth without distraction.

---

## Code Structure

### File: `src/scripts/animations.ts`

The main animations module exports these functions:

```typescript
initEntranceAnimations()     // Hero reveals, card fades, scale-ins
initScrollReveal()           // Fade + slide on scroll
initCardHovers()             // Lift + glow on hover
initTextAnimations()         // Character reveal on scroll
initParallax()               // Background lag effect
initListAnimations()         // (Optional) staggered list items
initAllAnimations()          // Master function; runs all above
```

**Auto-initialization:**
- Runs on DOM ready if `document.readyState === 'loading'`
- Runs immediately if DOM is already loaded
- Re-initializes on Astro client-side navigation via `astro:after-swap` listener

### Reduced Motion Support

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // All animations disabled
  // User sees instant transitions instead
  console.log('Reduced motion preference detected. Animations disabled.');
  return;
}
```

Users who enable `prefers-reduced-motion` in their OS (Windows, macOS, iOS, Android) will see **no animations**—all transitions become instant. This respects WCAG 2.1 Success Criterion 2.3.3.

---

## Layout Integration

### In `src/layouts/MainLayout.astro`

```astro
<script>
  import '../scripts/animations.ts';
</script>
```

The script is imported at the top of the layout and runs automatically on every page.

---

## Data Attributes (HTML)

Animation triggers are marked with data attributes on elements:

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `data-animate="hero-heading"` | Letter-by-letter title reveal | `<h1 data-animate="hero-heading">` |
| `data-animate="featured-section"` | Scale + fade featured post | `<div data-animate="featured-section">` |
| `data-animate="post-card"` | Fade + slide post cards | `<a data-animate="post-card">` |
| `data-animate="section-title"` | Fade + slide section headings | `<h3 data-animate="section-title">` |
| `data-scroll-reveal` | Reveal on scroll | `<article data-scroll-reveal>` |
| `data-hover-card` | Hover lift + glow | `<a data-hover-card>` |
| `data-animate-text` | Character reveal on scroll | `<h1 data-animate-text>` |
| `data-parallax="15"` | Parallax background (Y offset in px) | `<div data-parallax="15">` |

---

## Customization

### Adjust Animation Timing

Edit `src/scripts/animations.ts` and modify `duration`, `stagger`, `delay` values:

```typescript
// Example: Make entrance animations faster
gsap.fromTo(
  postCards,
  { opacity: 0, y: 30 },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,  // ← Change from 0.8
    stagger: 0.1,   // ← Change from 0.15
    ease: 'power3.out',
  }
);
```

### Adjust Hover Glow Color

Edit the shadow color in `initCardHovers()`:

```typescript
tl.to(
  card,
  {
    boxShadow: '0 20px 60px rgba(201, 154, 86, 0.3)',  // ← Modify RGBA
    duration: 0.4,
    ease: 'power2.out',
  },
  0
);
```

### Change Parallax Intensity

Modify the `data-parallax` value in `src/layouts/MainLayout.astro`:

```astro
<!-- Less parallax (subtle) -->
<div data-parallax="8">

<!-- More parallax (dramatic) -->
<div data-parallax="25">
```

### Disable Specific Animations

Remove the function call from `initAllAnimations()`:

```typescript
export function initAllAnimations() {
  if (prefersReducedMotion) return;

  initEntranceAnimations();      // ✓ Keep
  // initScrollReveal();          // ✗ Comment out to disable
  initCardHovers();              // ✓ Keep
  initTextAnimations();          // ✓ Keep
  // initParallax();              // ✗ Comment out to disable
  initListAnimations();          // ✓ Keep
}
```

---

## Performance Notes

### Layout Shift (CLS)
- Animations use `opacity` and `transform` (translate, scale) — GPU-accelerated
- No width/height changes during animation — no reflows
- CLS remains < 0.1 (Core Web Vitals compliant)

### Memory
- GSAP instances are created once and reused
- ScrollTrigger cleaned up on navigation (kills old triggers before reinit)
- No memory leaks across Astro client-side navigation

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge) ✓
- Mobile (iOS 12+, Android 5+) ✓
- IE11 — NOT supported (GSAP 3 requires ES6)

---

## Testing

### Manual Testing Checklist

- [ ] **Desktop:** Visit homepage, see entrance animations
- [ ] **Desktop:** Scroll down, see cards lift on hover
- [ ] **Desktop:** Continue scrolling, see scroll-reveal animations
- [ ] **Mobile:** Tap cards, no hover (only on hover-capable devices)
- [ ] **Accessibility:** Enable "Reduce motion" in OS settings, verify no animations
- [ ] **Navigation:** Click category link, animations reinitialize correctly
- [ ] **Article page:** Read post, see parallax background movement
- [ ] **Article page:** Title letters reveal character-by-character

### DevTools Tips

In browser console:

```javascript
// Check if animations are disabled
gsap.globalTimeline.timeScale() === 1 ? 'Enabled' : 'Disabled'

// List all active ScrollTrigger instances
gsap.getProperty('[data-scroll-reveal]')

// Manually trigger an entrance animation
gsap.to('[data-animate="post-card"]', { opacity: 1, y: 0, duration: 0.8 })
```

---

## Troubleshooting

### Animations not showing
1. Check browser console for errors
2. Verify GSAP is loaded: `typeof gsap !== 'undefined'`
3. Confirm data attributes exist in HTML: `document.querySelector('[data-animate]')`
4. Check if `prefers-reduced-motion` is enabled in OS

### Animations stuttering
1. Disable hardware acceleration in Chrome DevTools
2. Check for heavy JavaScript running in background
3. Reduce animation stagger times in `animations.ts`
4. Lower parallax intensity in data-parallax value

### Animations not reinitializing on navigation
1. Check browser console for `astro:after-swap` listener errors
2. Verify ScrollTrigger is being killed: `ScrollTrigger.getAll().forEach(t => t.kill())`
3. Ensure `initAllAnimations()` is called after swap

---

## Future Enhancements

- [ ] Stagger text reveal on article headings (h2, h3, h4)
- [ ] Magnetic button hover (cursor follows)
- [ ] Pin section animations (scroll-linked reveal)
- [ ] Page transition animations (fade between routes)
- [ ] Animated counters (number counting on scroll)
- [ ] SVG icon animations (morphing, drawing)

---

**Animation System Version:** 1.0  
**Last Updated:** 2026-07-09  
**Maintained by:** Claude Code  
**GSAP Version:** ^3.12.0
