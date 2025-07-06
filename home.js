// ✅ Smooth scroll for CTA buttons (internal anchors only)
document.querySelectorAll('.btn-cta').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ✅ Fade in hero section on load
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero-clean');
  if (hero) {
    hero.style.opacity = '1';
    hero.style.transition = 'opacity 1s ease-in';
  }
});

// ✅ Scroll-based reveal animation
const revealEls = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  revealEls.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});
