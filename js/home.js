'use strict';

// ─── HEADER SCROLL SHRINK ─────────────────────────────────────
const header = document.querySelector('.top-header-bar');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ─── HAMBURGER MOBILE MENU ────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on overlay click
  mobileNav.addEventListener('click', e => {
    if (e.target === mobileNav) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ─── HERO SLIDER ──────────────────────────────────────────────
(function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const sliderContainer = document.querySelector('.slider-container');
  if (!slides.length) return;

  let current = 0;
  let timer;

  // Build dots
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goTo(index) {
    slides[current].style.display = 'none';
    if (dotsContainer) dotsContainer.children[current]?.classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].style.display = 'block';
    if (dotsContainer) dotsContainer.children[current]?.classList.add('active');

    // Blur toggle for brand slides
    if (sliderContainer) {
      const isBrand = slides[current].classList.contains('faisal') || slides[current].classList.contains('master');
      sliderContainer.classList.toggle('blur-active', isBrand);
    }
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  // Init
  goTo(0);
  startAuto();

  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  if (prev) prev.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (next) next.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // Pause on hover
  sliderContainer?.addEventListener('mouseenter', () => clearInterval(timer));
  sliderContainer?.addEventListener('mouseleave', startAuto);

  // Touch swipe
  let touchStartX = 0;
  sliderContainer?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  sliderContainer?.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
  }, { passive: true });
})();

// ─── HOMEPAGE SEARCH ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchkey');
  const searchBtn = document.querySelector('.btn-search');

  function doSearch() {
    const q = searchInput ? searchInput.value.trim() : '';
    window.location.href = q
      ? `products.html?search=${encodeURIComponent(q)}`
      : 'products.html';
  }

  if (searchBtn) searchBtn.addEventListener('click', doSearch);
  if (searchInput) {
    searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  }

  // Browse all btn
  const browseBtn = document.querySelector('.btn-shop-brands');
  if (browseBtn) {
    browseBtn.addEventListener('click', () => { window.location.href = 'products.html'; });
  }

  // Lazy load featured in-stock products on homepage
  const featuredGrid = document.getElementById('featuredProducts');
  if (featuredGrid) loadFeatured(featuredGrid);
});

// ─── FEATURED PRODUCTS (homepage) ────────────────────────────
async function loadFeatured(container) {
  try {
    const res = await fetch('products.json');
    const products = await res.json();
    const inStock = products.filter(p => p.in_stock).slice(0, 6);

    if (!inStock.length) {
      container.closest('section')?.remove();
      return;
    }

    const IMAGE_KEYWORDS = [
      { keys: ['ball valve'], img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
      { keys: ['gate valve'], img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80' },
      { keys: ['elbow', 'tee', 'socket', 'union', 'plug', 'cap', 'c-band', 'nipple'], img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
      { keys: ['pipe'], img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
      { keys: ['water tank'], img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
      { keys: ['basin mixer', 'sink mixer'], img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
    ];

    function getImg(name) {
      const lower = name.toLowerCase();
      for (const e of IMAGE_KEYWORDS) {
        if (e.keys.some(k => lower.includes(k))) return e.img;
      }
      return 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80';
    }

    container.innerHTML = inStock.map(p => `
      <div class="product-card">
        <div class="product-img-wrap">
          <img src="${getImg(p.name)}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80'" />
          <span class="product-stock in-stock">✔ In Stock</span>
        </div>
        <div class="product-info">
          <div class="product-category-tag">${p.category}</div>
          <h3 class="product-name">${p.name}</h3>
          ${p.variant ? `<div class="product-variant">${p.variant}</div>` : ''}
          <div class="product-price">Rs. ${p.selling_price.toLocaleString('en-PK')}</div>
          <a href="products.html?search=${encodeURIComponent(p.name)}" class="quote-btn">View Product</a>
        </div>
      </div>`).join('');
  } catch (_) {
    container.closest('section')?.remove();
  }
}
