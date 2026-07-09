import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Disable animations if user prefers reduced motion
if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(0);
  gsap.globalTimeline.timeScale(1);
  gsap.defaults({ duration: 0, delay: 0 });
}

// ======================
// 1. ENTRANCE ANIMATIONS
// ======================
export function initEntranceAnimations() {
  if (prefersReducedMotion) return;

  // Post cards fade in + slide up
  const postCards = document.querySelectorAll('[data-animate="post-card"]');
  if (postCards.length > 0) {
    gsap.fromTo(
      postCards,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }
    );
  }

  // Section titles fade in
  const sectionTitles = document.querySelectorAll('[data-animate="section-title"]');
  if (sectionTitles.length > 0) {
    gsap.fromTo(
      sectionTitles,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
      }
    );
  }

  // Hero heading word-by-word reveal so wrapping stays on word boundaries
  const heroHeading = document.querySelector('[data-animate="hero-heading"]');
  if (heroHeading && heroHeading.textContent) {
    const text = heroHeading.textContent;
    heroHeading.innerHTML = text
      .trim()
      .split(/(\s+)/)
      .map((token) => {
        if (/^\s+$/.test(token)) return token;
        return `<span class="word" style="display:inline-block;opacity:0;">${token}</span>`;
      })
      .join('');

    const words = heroHeading.querySelectorAll('.word');
    gsap.to(words, {
      opacity: 1,
      duration: 0.12,
      stagger: 0.04,
      ease: 'power1.in',
      delay: 0.2,
    });
  }

  // Featured post section fade + scale
  const featuredSection = document.querySelector('[data-animate="featured-section"]');
  if (featuredSection) {
    gsap.fromTo(
      featuredSection,
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.2)',
        delay: 0.3,
      }
    );
  }
}

// ======================
// 2. SCROLL REVEAL ANIMATIONS
// ======================
export function initScrollReveal() {
  if (prefersReducedMotion) return;

  // Reveal elements as they enter viewport
  const revealElements = document.querySelectorAll('[data-scroll-reveal]');
  revealElements.forEach((el) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
}

// ======================
// 3. CARD HOVER EFFECTS
// ======================
export function initCardHovers() {
  if (prefersReducedMotion) return;

  const cards = document.querySelectorAll('[data-hover-card]');
  cards.forEach((card) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(
      card,
      {
        boxShadow: '0 20px 60px rgba(201, 154, 86, 0.3)',
        duration: 0.4,
        ease: 'power2.out',
      },
      0
    ).to(
      card,
      {
        y: -8,
        duration: 0.4,
        ease: 'power2.out',
      },
      0
    );

    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => tl.reverse());
  });
}

// ======================
// 4. TEXT ANIMATIONS
// ======================
export function initTextAnimations() {
  if (prefersReducedMotion) return;

  const animatedTexts = document.querySelectorAll('[data-animate-text]');
  animatedTexts.forEach((el) => {
    const text = el.textContent;
    if (!text) return;

    el.innerHTML = text
      .trim()
      .split(/(\s+)/)
      .map((token) => {
        if (/^\s+$/.test(token)) return token;
        return `<span class="anim-word" style="display:inline-block;opacity:0;">${token}</span>`;
      })
      .join('');

    const words = el.querySelectorAll('.anim-word');
    gsap.to(words, {
      opacity: 1,
      duration: 0.12,
      stagger: 0.04,
      ease: 'power1.in',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });
}

// ======================
// 5. PARALLAX BACKGROUNDS
// ======================
export function initParallax() {
  if (prefersReducedMotion) return;

  const parallaxElements = document.querySelectorAll('[data-parallax]');
  parallaxElements.forEach((el) => {
    gsap.to(el, {
      y: (i, target) => {
        const yPercent = parseInt(target.getAttribute('data-parallax') || '20');
        return yPercent * -1;
      },
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        scrub: 1,
        markers: false,
      },
    });
  });
}

// ======================
// 6. STAGGERED LIST ITEMS
// ======================
export function initListAnimations() {
  if (prefersReducedMotion) return;

  const lists = document.querySelectorAll('[data-animate-list]');
  lists.forEach((list) => {
    const items = list.querySelectorAll('li, > a, > div');
    if (items.length === 0) return;

    gsap.fromTo(
      items,
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: list,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// ======================
// 7. INITIALIZE ALL ANIMATIONS
// ======================
export function initAllAnimations() {
  if (prefersReducedMotion) {
    console.log('Reduced motion preference detected. Animations disabled.');
    return;
  }

  initEntranceAnimations();
  initScrollReveal();
  initCardHovers();
  initTextAnimations();
  initParallax();
  initListAnimations();
}

// Auto-init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
  initAllAnimations();
}

// Re-init animations on Astro navigation (for client-side routing)
document.addEventListener('astro:after-swap', () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  initAllAnimations();
});
