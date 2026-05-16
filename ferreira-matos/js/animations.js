// animations.js — Intersection Observer, counters, parallax

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = parseFloat(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('revealed'), delay * 1000);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target  = parseFloat(el.dataset.target);
  const prefix  = el.dataset.prefix  || '';
  const suffix  = el.dataset.suffix  || '';
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
  const duration = 2000;
  const start    = performance.now();
  const easeOut  = t => 1 - Math.pow(1 - t, 3);

  const tick = now => {
    const progress = Math.min((now - start) / duration, 1);
    const value    = target * easeOut(progress);
    el.textContent = prefix + (decimals ? value.toFixed(decimals) : Math.floor(value).toLocaleString('pt-BR')) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => counterObs.observe(el));

/* ── PROCESS LINE ANIMATION ── */
const processSection = document.querySelector('#processo');
if (processSection) {
  const lineObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      const steps = processSection.querySelectorAll('.process-step');
      steps.forEach((s, i) => {
        setTimeout(() => s.classList.add('revealed'), i * 200);
      });
      lineObs.unobserve(processSection);
    }
  }, { threshold: 0.2 });
  lineObs.observe(processSection);
}

/* ── PARALLAX (hero image) ── */
if (window.matchMedia('(prefers-reduced-motion: no-preference) and (min-width: 1025px)').matches) {
  const heroImg = document.querySelector('.hero-visual');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.18;
      heroImg.style.transform = `translateY(${y}px)`;
    }, { passive: true });
  }
}

