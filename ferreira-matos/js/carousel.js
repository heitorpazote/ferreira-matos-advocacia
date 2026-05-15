// carousel.js — CSS Scroll Snap carousel for testimonials

const track    = document.querySelector('.carousel-track');
const dots     = document.querySelectorAll('.dot');
const prevBtn  = document.getElementById('carousel-prev');
const nextBtn  = document.getElementById('carousel-next');
if (!track) { /* no-op */ }
else {
  const cards     = track.querySelectorAll('.card-testimonial');
  const visibleN  = () => window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  let   current   = 0;
  let   autoTimer = null;
  const maxIndex  = () => Math.max(0, cards.length - visibleN());

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIndex()));
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * cardW}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current >= maxIndex() ? 0 : current + 1); }
  function prev() { goTo(current <= 0 ? maxIndex() : current - 1); }

  prevBtn?.addEventListener('click', () => { clearInterval(autoTimer); prev(); startAuto(); });
  nextBtn?.addEventListener('click', () => { clearInterval(autoTimer); next(); startAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(autoTimer); goTo(i); startAuto(); }));

  function startAuto() { autoTimer = setInterval(next, 5000); }
  startAuto();

  // Pause on hover
  track.closest('.carousel-container')?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.closest('.carousel-container')?.addEventListener('mouseleave', startAuto);

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { clearInterval(autoTimer); diff > 0 ? next() : prev(); startAuto(); }
  });

  window.addEventListener('resize', () => goTo(current));
  goTo(0);
}
