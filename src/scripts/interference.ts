/**
 * Two-source wave interference, rendered as a live field behind the hero.
 *
 * This is the actual physics: the amplitude at every point is the sum of
 * sin(kr - ωt) from each source, and the light and dark bands are the
 * constructive and destructive fringes. The pointer acts as a third,
 * movable source, so the fringe pattern reorganises around the cursor.
 *
 * Cost is kept trivial by rendering on a coarse grid (a few thousand cells)
 * and letting the browser scale and blur it up to full bleed. It pauses
 * whenever it is off-screen or the tab is hidden, and renders exactly one
 * still frame when the visitor prefers reduced motion.
 */

interface Source {
  x: number;
  y: number;
  /** Angular frequency. Slightly detuned per source so the field never loops. */
  w: number;
}

const GRID_W = 340;
const GRID_H = 210;

/** Reads a CSS custom property and returns it as [r,g,b]. */
function readRGB(styles: CSSStyleDeclaration, name: string, fallback: [number, number, number]) {
  const raw = styles.getPropertyValue(name).trim();
  if (!raw) return fallback;
  if (raw.startsWith('#')) {
    const hex = raw.length === 4
      ? raw.slice(1).split('').map((c) => c + c).join('')
      : raw.slice(1);
    const n = parseInt(hex, 16);
    if (Number.isNaN(n)) return fallback;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as [number, number, number];
  }
  const m = raw.match(/-?\d+\.?\d*/g);
  if (!m || m.length < 3) return fallback;
  return [Number(m[0]), Number(m[1]), Number(m[2])] as [number, number, number];
}

/**
 * Builds a 256-entry lookup table running ground → philosophy → science →
 * thoughts → miscellaneous, so amplitude maps onto the site's own spectrum
 * rather than an arbitrary rainbow.
 */
function buildLUT(el: HTMLElement): Uint8ClampedArray {
  const s = getComputedStyle(el);
  const ground = readRGB(s, '--bg', [8, 6, 15]);
  // The ground holds most of the range so the fringes read as thin bright
  // filaments rather than a wash, and the upper range runs the full spectrum
  // so the field is not just one violet mood.
  const stops: Array<[number, [number, number, number]]> = [
    [0.0, ground],
    [0.14, ground],
    [0.5, readRGB(s, '--cat-philosophy', [139, 107, 255])],
    [0.68, readRGB(s, '--cat-science', [47, 212, 232])],
    [0.86, readRGB(s, '--cat-thoughts', [255, 174, 59])],
    [1.0, readRGB(s, '--cat-miscellaneous', [255, 95, 168])]
  ];

  const lut = new Uint8ClampedArray(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let a = stops[0];
    let b = stops[stops.length - 1];
    for (let j = 0; j < stops.length - 1; j++) {
      if (t >= stops[j][0] && t <= stops[j + 1][0]) {
        a = stops[j];
        b = stops[j + 1];
        break;
      }
    }
    const span = b[0] - a[0] || 1;
    const k = (t - a[0]) / span;
    // Ease the ramp so the ground holds longer and the bright fringes stay thin.
    const e = k * k * (3 - 2 * k);
    lut[i * 3] = a[1][0] + (b[1][0] - a[1][0]) * e;
    lut[i * 3 + 1] = a[1][1] + (b[1][1] - a[1][1]) * e;
    lut[i * 3 + 2] = a[1][2] + (b[1][2] - a[1][2]) * e;
  }
  return lut;
}

export function initInterference(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return () => {};

  canvas.width = GRID_W;
  canvas.height = GRID_H;

  const image = ctx.createImageData(GRID_W, GRID_H);
  const data = image.data;
  for (let i = 3; i < data.length; i += 4) data[i] = 255;

  let lut = buildLUT(document.documentElement);

  const sources: Source[] = [
    { x: GRID_W * 0.3, y: GRID_H * 0.26, w: 0.0021 },
    { x: GRID_W * 0.72, y: GRID_H * 0.6, w: 0.0019 }
  ];

  // The pointer source. Starts parked off-centre so the field is already
  // interesting before anyone moves the mouse.
  const pointer = { x: GRID_W * 0.5, y: GRID_H * 0.12, tx: GRID_W * 0.5, ty: GRID_H * 0.12 };

  let running = false;
  let visible = true;
  let raf = 0;
  let disposed = false;

  // Wave number. High enough that the hyperbolic fringes between the two
  // sources are visibly thin lines rather than broad lobes — this is what
  // makes the field read as interference instead of a gradient.
  const K = 0.5;

  function render(t: number) {
    // Ease the pointer source toward the cursor so the field feels like a
    // medium with inertia rather than a value that snaps.
    pointer.x += (pointer.tx - pointer.x) * 0.055;
    pointer.y += (pointer.ty - pointer.y) * 0.055;

    const s0 = sources[0];
    const s1 = sources[1];
    const p0 = t * s0.w;
    const p1 = t * s1.w;
    const p2 = t * 0.0013;

    let idx = 0;
    for (let y = 0; y < GRID_H; y++) {
      for (let x = 0; x < GRID_W; x++) {
        const dx0 = x - s0.x;
        const dy0 = y - s0.y;
        const dx1 = x - s1.x;
        const dy1 = y - s1.y;
        const dx2 = x - pointer.x;
        const dy2 = y - pointer.y;

        const r0 = Math.sqrt(dx0 * dx0 + dy0 * dy0);
        const r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        const r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        // 1/sqrt(r) falloff keeps the sources from blowing out at their centres.
        const a =
          Math.sin(r0 * K - p0) / (1 + r0 * 0.007) +
          Math.sin(r1 * K - p1) / (1 + r1 * 0.007) +
          (Math.sin(r2 * K - p2) * 1.2) / (1 + r2 * 0.006);

        // Normalise roughly to 0..1, then bias dark so the ground dominates
        // and the bright fringes read as thin filaments of colour.
        let v = (a + 2.5) / 5;
        v = v <= 0 ? 0 : v >= 1 ? 1 : v;
        v = v * v * v;

        const li = (v * 255) | 0;
        const o = li * 3;
        data[idx] = lut[o];
        data[idx + 1] = lut[o + 1];
        data[idx + 2] = lut[o + 2];
        idx += 4;
      }
    }

    ctx!.putImageData(image, 0, 0);
  }

  function loop(t: number) {
    if (disposed) return;
    render(t);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (running || disposed || !visible) return;
    running = true;
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  function onPointerMove(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.tx = ((e.clientX - rect.left) / rect.width) * GRID_W;
    pointer.ty = ((e.clientY - rect.top) / rect.height) * GRID_H;
  }

  function onVisibility() {
    if (document.hidden) stop();
    else start();
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    },
    { threshold: 0 }
  );
  io.observe(canvas);

  // Repaint the lookup table when the theme changes — the ground colour is
  // half of what this field is made of.
  const themeObserver = new MutationObserver(() => {
    lut = buildLUT(document.documentElement);
    if (!running) render(performance.now());
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reduced.matches) {
    // One still frame: the composition is preserved, the motion is not.
    render(4200);
  } else {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    start();
  }

  return () => {
    disposed = true;
    stop();
    io.disconnect();
    themeObserver.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('visibilitychange', onVisibility);
  };
}
