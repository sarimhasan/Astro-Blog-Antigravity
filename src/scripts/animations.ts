/**
 * Motion system — Spectral Editorial.
 *
 * One orchestrated program rather than scattered effects. Everything runs
 * inside a gsap.context() so a single revert() tears the whole page down on
 * navigation, and everything is branched through gsap.matchMedia() so the
 * reduced-motion arm is a designed state rather than a kill switch.
 *
 * Entry points are Astro's ClientRouter lifecycle events, which fire on the
 * first load as well as on every subsequent navigation.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { initInterference } from './interference';

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Flip,
  Draggable,
  InertiaPlugin,
  DrawSVGPlugin,
  MorphSVGPlugin,
  ScrambleTextPlugin,
  CustomEase
);

/** The house ease. Everything on the site decelerates on this curve. */
CustomEase.create('spectral', '0.16, 1, 0.3, 1');
CustomEase.create('spectral-in', '0.7, 0, 0.84, 0');

gsap.defaults({ ease: 'spectral', duration: 0.9 });

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let ctx: gsap.Context | null = null;
let smoother: ScrollSmoother | null = null;
let teardown: Array<() => void> = [];

/* ------------------------------------------------------------------ theme */

/**
 * Theme switching. Lives outside the animation context because it must keep
 * working when motion is off and must survive page swaps.
 */
function bindTheme() {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
  if (!buttons.length) return;

  const meta = document.getElementById('theme-color-meta');
  const morphTargets = document.querySelectorAll<SVGPathElement>('[data-morph-target]');

  const sync = (theme: string) => {
    if (meta) meta.setAttribute('content', theme === 'light' ? '#faf8f4' : '#08060f');
    buttons.forEach((b) =>
      b.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme')
    );
  };

  const paint = (theme: string, animate: boolean) => {
    const target = theme === 'light' ? '#path-sun' : '#path-moon';
    const rays = document.querySelectorAll('[data-sun-rays]');

    if (!animate || prefersReduced() || !document.querySelector(target)) {
      morphTargets.forEach((p) => {
        const src = document.querySelector<SVGPathElement>(target);
        if (src) p.setAttribute('d', src.getAttribute('d') || '');
      });
      return;
    }

    morphTargets.forEach((p) => {
      gsap.to(p, { duration: 0.55, morphSVG: target, ease: 'spectral' });
    });
    gsap.to(rays, {
      duration: 0.45,
      opacity: theme === 'light' ? 1 : 0,
      scale: theme === 'light' ? 1 : 0.6,
      rotate: theme === 'light' ? 0 : -40,
      transformOrigin: '12px 12px',
      ease: 'spectral'
    });
  };

  const current = () => document.documentElement.getAttribute('data-theme') || 'dark';

  sync(current());
  paint(current(), false);

  const onClick = () => {
    const next = current() === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode — the switch still applies for this session */
    }
    sync(next);
    paint(next, true);
  };

  buttons.forEach((b) => b.addEventListener('click', onClick));
  teardown.push(() => buttons.forEach((b) => b.removeEventListener('click', onClick)));
}

/* -------------------------------------------------------------- mobile nav */

function bindMenu() {
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!menu || !openBtn || !closeBtn) return;

  const items = menu.querySelectorAll('[data-menu-item]');
  let open = false;
  let lastFocused: HTMLElement | null = null;

  const focusables = () =>
    Array.from(
      menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    ).filter((el) => el.offsetParent !== null);

  const show = () => {
    open = true;
    lastFocused = document.activeElement as HTMLElement;
    menu.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';

    if (prefersReduced()) {
      gsap.set([menu, items], { clearProps: 'all' });
    } else {
      gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6 });
      gsap.fromTo(
        items,
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.055, delay: 0.12 }
      );
    }
    focusables()[0]?.focus();
  };

  const hide = () => {
    open = false;
    openBtn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    const done = () => {
      menu.hidden = true;
      gsap.set(menu, { clearProps: 'clipPath' });
    };
    if (prefersReduced()) done();
    else gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.45, ease: 'spectral-in', onComplete: done });
    lastFocused?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      hide();
      return;
    }
    if (e.key !== 'Tab') return;
    const list = focusables();
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  openBtn.addEventListener('click', show);
  closeBtn.addEventListener('click', hide);
  document.addEventListener('keydown', onKey);

  teardown.push(() => {
    openBtn.removeEventListener('click', show);
    closeBtn.removeEventListener('click', hide);
    document.removeEventListener('keydown', onKey);
    document.documentElement.style.overflow = '';
  });
}

/* ---------------------------------------------------------------- the run */

function build() {
  const mm = gsap.matchMedia();

  /* ---------------------------------------------------- shared, both arms */

  // Sticky nav backdrop. Cheap, and it matters as much with motion off.
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (nav) {
    ScrollTrigger.create({
      start: 'top -40',
      end: 99999,
      onUpdate: (self) => nav.classList.toggle('is-stuck', self.scroll() > 40),
      onRefresh: (self) => nav.classList.toggle('is-stuck', self.scroll() > 40)
    });
  }

  /* ------------------------------------------------------ reduced-motion arm */

  mm.add('(prefers-reduced-motion: reduce)', () => {
    // Everything lands in its final state. The composition is identical; only
    // the travel is removed.
    gsap.set('[data-reveal], [data-reveal-children] > *', { opacity: 1, y: 0, clearProps: 'transform' });
    gsap.set('[data-spine-fill]', { scaleY: 1 });

    // The width axis is composition, not motion: hold it at its start value
    // so the headline breaks the same way it does with motion on.
    document.querySelectorAll<HTMLElement>('[data-width-scrub]').forEach((el) => {
      el.style.fontVariationSettings = `"wdth" ${Number(el.dataset.widthFrom || 100)}`;
    });

    const canvas = document.querySelector<HTMLCanvasElement>('[data-interference]');
    if (canvas) teardown.push(initInterference(canvas));
  });

  /* ---------------------------------------------------------- full arm */

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    /* --- page-level smooth scroll --- */
    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.15,
      effects: true,
      smoothTouch: 0,
      normalizeScroll: false
    });

    /* --- the spine fills with the dispersion as you read --- */
    const fill = document.querySelector('[data-spine-fill]');
    if (fill) {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.4 }
        }
      );
    }

    /* --- hero headline: masked line reveal, then a width axis that
           compresses as you descend --- */
    document.querySelectorAll<HTMLElement>('[data-split-lines]').forEach((el) => {
      const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
      gsap.from(split.lines, {
        yPercent: 118,
        duration: 1.15,
        stagger: 0.09,
        delay: Number(el.dataset.splitDelay || 0.15)
      });
      teardown.push(() => split.revert());
    });

    document.querySelectorAll<HTMLElement>('[data-width-scrub]').forEach((el) => {
      const from = Number(el.dataset.widthFrom || 112);
      const to = Number(el.dataset.widthTo || 66);
      const proxy = { w: from };
      el.style.fontVariationSettings = `"wdth" ${from}`;
      gsap.to(proxy, {
        w: to,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 15%', end: '+=90%', scrub: 0.6 },
        onUpdate: () => {
          el.style.fontVariationSettings = `"wdth" ${proxy.w.toFixed(1)}`;
        }
      });
    });

    /* --- generic reveals --- */
    gsap.set('[data-reveal]', { y: 26, filter: 'blur(6px)' });
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.08,
          overwrite: true
        })
    });

    document.querySelectorAll<HTMLElement>('[data-reveal-children]').forEach((group) => {
      const kids = Array.from(group.children) as HTMLElement[];
      gsap.set(kids, { y: 22 });
      ScrollTrigger.create({
        trigger: group,
        start: 'top 86%',
        once: true,
        onEnter: () => gsap.to(kids, { opacity: 1, y: 0, duration: 0.85, stagger: 0.07 })
      });
    });

    /* --- rules draw themselves in --- */
    document.querySelectorAll<HTMLElement>('[data-draw]').forEach((el) => {
      gsap.fromTo(
        el,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        }
      );
    });

    document.querySelectorAll<SVGElement>('[data-draw-svg]').forEach((el) => {
      gsap.fromTo(
        el,
        { drawSVG: '0%' },
        {
          drawSVG: '100%',
          duration: 1.6,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        }
      );
    });

    /* --- metadata resolves like an instrument settling --- */
    document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((el) => {
      const text = el.textContent || '';
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: () =>
          gsap.to(el, {
            duration: 0.85,
            scrambleText: { text, chars: 'upperAndLowerCase', speed: 0.5, revealDelay: 0.1 }
          })
      });
    });

    /* --- entry hover: the whole plate lifts and its hue blooms --- */
    document.querySelectorAll<HTMLElement>('[data-lift]').forEach((el) => {
      const tl = gsap
        .timeline({ paused: true })
        .to(el, { y: -6, duration: 0.45 }, 0)
        .to(el, { boxShadow: 'var(--shadow-mid)', duration: 0.45 }, 0);

      const enter = () => tl.play();
      const leave = () => tl.reverse();
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      el.addEventListener('focusin', enter);
      el.addEventListener('focusout', leave);
      teardown.push(() => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
        el.removeEventListener('focusin', enter);
        el.removeEventListener('focusout', leave);
        tl.kill();
      });
    });

    /* --- magnetic pull on primary controls --- */
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'spectral' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'spectral' });

      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.34);
      };
      const reset = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', reset);
      teardown.push(() => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', reset);
      });
    });

    /* --- the lens cursor --- */
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const lens = document.querySelector<HTMLElement>('.cursor-lens');
      const dot = document.querySelector<HTMLElement>('.cursor-dot');

      if (lens && dot) {
        const lensX = gsap.quickTo(lens, 'x', { duration: 0.42, ease: 'spectral' });
        const lensY = gsap.quickTo(lens, 'y', { duration: 0.42, ease: 'spectral' });
        const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'spectral' });
        const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'spectral' });
        let shown = false;

        const move = (e: PointerEvent) => {
          if (!shown) {
            shown = true;
            gsap.to([lens, dot], { opacity: 1, duration: 0.3 });
          }
          lensX(e.clientX);
          lensY(e.clientY);
          dotX(e.clientX);
          dotY(e.clientY);
        };

        // The lens dilates over anything interactive and picks up whatever
        // hue that region is bound to.
        const over = (e: Event) => {
          const t = (e.target as HTMLElement)?.closest?.('a, button, [data-lift]');
          if (!t) return;
          const hue = getComputedStyle(t).getPropertyValue('--hue').trim();
          gsap.to(lens, { scale: 2.1, borderColor: hue || 'currentColor', duration: 0.4 });
          gsap.to(dot, { scale: 0.4, duration: 0.4 });
        };
        const out = (e: Event) => {
          const t = (e.target as HTMLElement)?.closest?.('a, button, [data-lift]');
          if (!t) return;
          gsap.to(lens, { scale: 1, borderColor: 'var(--hue)', duration: 0.4 });
          gsap.to(dot, { scale: 1, duration: 0.4 });
        };
        const leaveWindow = () => gsap.to([lens, dot], { opacity: 0, duration: 0.25 });

        window.addEventListener('pointermove', move, { passive: true });
        document.addEventListener('pointerover', over, true);
        document.addEventListener('pointerout', out, true);
        document.addEventListener('mouseleave', leaveWindow);

        teardown.push(() => {
          window.removeEventListener('pointermove', move);
          document.removeEventListener('pointerover', over, true);
          document.removeEventListener('pointerout', out, true);
          document.removeEventListener('mouseleave', leaveWindow);
          gsap.set([lens, dot], { opacity: 0 });
        });
      }
    }

    /* --- the hero field --- */
    const canvas = document.querySelector<HTMLCanvasElement>('[data-interference]');
    if (canvas) teardown.push(initInterference(canvas));

    return () => {
      smoother?.kill();
      smoother = null;
    };
  });

  /* ------------------------------------------------- reading shelf + filter */

  bindReading();

  ScrollTrigger.refresh();
}

/* ------------------------------------------------------------ /reading page */

/**
 * The reading log. Covers sit on an inertial shelf you can throw, and the
 * type/status filters reflow the grid through Flip so nothing ever jumps.
 */
function bindReading() {
  const shelf = document.querySelector<HTMLElement>('[data-shelf]');
  const track = document.querySelector<HTMLElement>('[data-shelf-track]');

  if (shelf && track && !prefersReduced()) {
    const bounds = () => {
      const overflow = track.scrollWidth - shelf.clientWidth;
      return { minX: overflow > 0 ? -overflow : 0, maxX: 0 };
    };
    const [drag] = Draggable.create(track, {
      type: 'x',
      inertia: true,
      edgeResistance: 0.85,
      bounds: bounds(),
      cursor: 'grab',
      activeCursor: 'grabbing',
      onDragStart: () => shelf.classList.add('is-dragging'),
      onDragEnd: () => shelf.classList.remove('is-dragging')
    });
    const resize = () => drag.applyBounds(bounds());
    window.addEventListener('resize', resize);
    teardown.push(() => {
      window.removeEventListener('resize', resize);
      drag.kill();
    });
  }

  const filters = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const items = document.querySelectorAll<HTMLElement>('[data-intel-item]');
  if (!filters.length || !items.length) return;

  const empty = document.querySelector<HTMLElement>('[data-filter-empty]');

  const apply = (value: string) => {
    const state = prefersReduced() ? null : Flip.getState(items);
    let shown = 0;

    items.forEach((item) => {
      const match =
        value === 'all' || item.dataset.type === value || item.dataset.status === value;
      item.style.display = match ? '' : 'none';
      if (match) shown++;
    });

    if (empty) empty.hidden = shown > 0;

    filters.forEach((f) => {
      const on = f.dataset.filter === value;
      f.classList.toggle('chip-solid', on);
      f.setAttribute('aria-pressed', String(on));
    });

    if (state) {
      Flip.from(state, {
        duration: 0.6,
        ease: 'spectral',
        scale: true,
        absolute: true,
        stagger: 0.03,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3 })
      });
    }
  };

  filters.forEach((f) => {
    const handler = () => apply(f.dataset.filter || 'all');
    f.addEventListener('click', handler);
    teardown.push(() => f.removeEventListener('click', handler));
  });
}

/* ---------------------------------------------------------------- lifecycle */

function start() {
  stop();
  teardown = [];
  bindTheme();
  bindMenu();
  ctx = gsap.context(() => build());
}

function stop() {
  teardown.forEach((fn) => {
    try {
      fn();
    } catch {
      /* a node may already be gone after a swap */
    }
  });
  teardown = [];
  smoother?.kill();
  smoother = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  ctx?.revert();
  ctx = null;
}

document.addEventListener('astro:page-load', start);
document.addEventListener('astro:before-swap', stop);

// If ClientRouter is ever unavailable, fall back to the plain lifecycle so the
// site is never left unanimated.
if (!('astroPageLoadBound' in window)) {
  (window as unknown as Record<string, boolean>).astroPageLoadBound = true;
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
      if (!ctx) start();
    }, 0);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      if (!ctx) start();
    });
  }
}
