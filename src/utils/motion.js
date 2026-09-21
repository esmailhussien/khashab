/* 🪵 Khashab Motion System
   Scroll choreography, pointer tilt and depth parallax. Everything degrades to
   a static page: reveal styles only apply once `motion-ready` is set, so a
   script failure can never leave content invisible.

   initMotion() is safe to call repeatedly and on subtrees — grids that re-render
   (store filters, wishlist) call it through ProductCard.setupListeners so freshly
   injected cards are always picked up. */

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let revealObserver = null;
let parallaxTargets = [];
let globalListenersBound = false;
let frameRequested = false;

/* ------------------------------------------------------------------ Reveal */
function getRevealObserver() {
  if (revealObserver) return revealObserver;
  if (!('IntersectionObserver' in window)) return null;

  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  return revealObserver;
}

function setupReveals(root) {
  root.querySelectorAll('[data-reveal-group]').forEach(group => {
    [...group.querySelectorAll('[data-reveal]')].forEach((child, index) => {
      if (!child.style.getPropertyValue('--i')) child.style.setProperty('--i', String(index));
    });
  });

  const targets = [...root.querySelectorAll('[data-reveal], .rings')]
    .filter(el => !el.dataset.revealBound);
  if (!targets.length) return;

  const observer = getRevealObserver();

  targets.forEach(el => {
    el.dataset.revealBound = 'true';

    if (!observer || reduceMotion()) {
      el.classList.add('is-revealed');
      return;
    }

    // Anything already on screen at first paint reveals straight away, so the
    // hero never waits for a scroll that may not come.
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight * 0.9 && box.bottom > 0) {
      el.classList.add('is-revealed');
      return;
    }

    observer.observe(el);
  });
}

/* -------------------------------------------------------------------- Rings */
function setupRings(root) {
  root.querySelectorAll('.rings circle').forEach((circle, index) => {
    const radius = Number(circle.getAttribute('r')) || 0;
    circle.style.setProperty('--len', String(Math.ceil(2 * Math.PI * radius)));
    circle.style.setProperty('--ring-delay', `${index * 120}ms`);
  });
}

/* --------------------------------------------------------------------- Tilt */
function setupTilt(root) {
  if (reduceMotion() || !canHover()) return;

  root.querySelectorAll('[data-tilt]').forEach(el => {
    if (el.dataset.motionBound) return;
    el.dataset.motionBound = 'tilt';

    let pending = false;
    let point = { x: 0.5, y: 0.5 };

    const apply = () => {
      pending = false;
      el.style.setProperty('--mx', point.x.toFixed(3));
      el.style.setProperty('--my', point.y.toFixed(3));
      el.style.setProperty('--tx', (point.x * 2 - 1).toFixed(3));
      el.style.setProperty('--ty', (point.y * 2 - 1).toFixed(3));
    };

    el.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const box = el.getBoundingClientRect();
      point = {
        x: Math.min(Math.max((event.clientX - box.left) / box.width, 0), 1),
        y: Math.min(Math.max((event.clientY - box.top) / box.height, 0), 1)
      };
      el.classList.add('is-pointing');
      if (!pending) {
        pending = true;
        requestAnimationFrame(apply);
      }
    });

    el.addEventListener('pointerleave', () => {
      el.classList.remove('is-pointing');
      el.style.setProperty('--tx', '0');
      el.style.setProperty('--ty', '0');
    });
  });
}

/* ----------------------------------------------------------------- Parallax */
function readParallax() {
  parallaxTargets = [...document.querySelectorAll('[data-parallax]')].map(el => ({
    el,
    speed: Number(el.dataset.parallax) || 0.05
  }));
}

function updateParallax() {
  frameRequested = false;
  const viewport = window.innerHeight;

  parallaxTargets.forEach(({ el, speed }) => {
    const box = el.getBoundingClientRect();
    if (box.bottom < -240 || box.top > viewport + 240) return;
    const fromCenter = (box.top + box.height / 2) - viewport / 2;
    el.style.setProperty('--parallax', `${(fromCenter * speed * -1).toFixed(1)}px`);
  });
}

function onScroll() {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('is-lifted', window.scrollY > 8);

  if (!parallaxTargets.length || reduceMotion()) return;
  if (!frameRequested) {
    frameRequested = true;
    requestAnimationFrame(updateParallax);
  }
}

/* --------------------------------------------------------------------- Init */
export function initMotion(root = document) {
  document.documentElement.classList.add('motion-ready');

  setupRings(root);
  setupReveals(root);
  setupTilt(root);

  if (root === document) {
    readParallax();
    if (!globalListenersBound) {
      globalListenersBound = true;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }
    onScroll();
    if (!reduceMotion()) updateParallax();
  }
}
