// ===== ZSE STORE - home.js =====

// ---- Slider ----
let slideIndex = 0;
let autoSlide;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const sliderContainer = document.querySelector('.slider-container');
  if (!slides.length) return;

  // Wrap index
  if (index >= slides.length) slideIndex = 0;
  else if (index < 0) slideIndex = slides.length - 1;
  else slideIndex = index;

  slides.forEach((s, i) => {
    s.style.display = i === slideIndex ? 'block' : 'none';
  });

  // Blur bg for brand slides
  const active = slides[slideIndex];
  if (sliderContainer) {
    sliderContainer.classList.toggle('blur-active',
      active.classList.contains('faisal') || active.classList.contains('master'));
  }
}

function startAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => showSlide(slideIndex + 1), 5000);
}

// Init slider
if (document.querySelector('.slider-container')) {
  showSlide(0);
  startAutoSlide();

  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  if (prev) prev.addEventListener('click', () => { showSlide(slideIndex - 1); startAutoSlide(); });
  if (next) next.addEventListener('click', () => { showSlide(slideIndex + 1); startAutoSlide(); });
}

// ---- Search bar (homepage) ----
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchkey');
  const searchBtn = document.querySelector('.btn-search');

  function doSearch() {
    const q = searchInput ? searchInput.value.trim() : '';
    if (q) {
      window.location.href = `products.html?search=${encodeURIComponent(q)}`;
    } else {
      window.location.href = 'products.html';
    }
  }

  if (searchBtn) searchBtn.addEventListener('click', doSearch);
  if (searchInput) searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  // Remove dead "SHOP BY BRANDS" button behavior — just link to products
  const shopBrands = document.querySelector('.btn-shop-brands');
  if (shopBrands) {
    shopBrands.addEventListener('click', () => { window.location.href = 'products.html'; });
    shopBrands.textContent = 'Browse All Products';
  }
});
