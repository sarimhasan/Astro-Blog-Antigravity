/**
 * Single source of truth for the four post categories.
 *
 * The design system maps each category to a position on the visible spectrum.
 * This file is presentation-only: it does NOT define or constrain the content
 * schema. `src/content/config.ts` still types `category` as a free string and
 * `keystatic.config.ts` still owns the authoring options. If a category is ever
 * added there, add it here too — the site will fall back gracefully until then.
 */

export type CategorySlug = 'philosophy' | 'science' | 'thoughts' | 'miscellaneous';

export interface Category {
  slug: CategorySlug;
  label: string;
  /** Position on the spectrum spine, 0 (violet) → 1 (magenta). */
  position: number;
  /** Readout shown in monospace next to the label. Real dispersion values. */
  wavelength: string;
  /** One line describing what lives here. Used on category pages and in nav. */
  blurb: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'philosophy',
    label: 'Philosophy',
    position: 0,
    wavelength: '410nm',
    blurb: 'Arguments I keep turning over, and the ones that turned me over first.',
  },
  {
    slug: 'science',
    label: 'Science',
    position: 0.34,
    wavelength: '490nm',
    blurb: 'Physics, mostly — written for the version of me that did not understand it yet.',
  },
  {
    slug: 'thoughts',
    label: 'Thoughts',
    position: 0.67,
    wavelength: '600nm',
    blurb: 'Notes on being a person. Less rigorous, more honest.',
  },
  {
    slug: 'miscellaneous',
    label: 'Miscellaneous',
    position: 1,
    wavelength: '—',
    blurb: 'Everything that refused to sit in another drawer.',
  },
];

const BY_SLUG = new Map<string, Category>(CATEGORIES.map((c) => [c.slug, c]));

export function getCategory(slug: string | undefined | null): Category | undefined {
  return slug ? BY_SLUG.get(slug) : undefined;
}

export function isCategorySlug(slug: string | undefined | null): slug is CategorySlug {
  return !!slug && BY_SLUG.has(slug);
}

/** Human label for any category value, including ones not in the map. */
export function categoryLabel(slug: string | undefined | null): string {
  if (!slug) return 'Unfiled';
  return BY_SLUG.get(slug)?.label ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

/**
 * Inline style string that binds the local hue variables to a category.
 *
 * Every hue-aware rule in global.css reads `--hue` / `--hue-soft` / `--hue-ink`
 * rather than a per-category class, so a single `style={hueVars(slug)}` on any
 * container tints everything inside it. Unknown categories fall back to the
 * neutral spectral white so nothing renders colourless.
 */
export function hueVars(slug: string | undefined | null): string {
  const key = isCategorySlug(slug) ? slug : 'neutral';
  return [
    `--hue: var(--cat-${key})`,
    `--hue-soft: var(--cat-${key}-soft)`,
    `--hue-ink: var(--cat-${key}-ink)`,
    `--hue-glow: var(--cat-${key}-glow)`,
  ].join('; ');
}
