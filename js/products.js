/* ============================================================
   ZSE STORE — products.js
   Handles: listing, search, filter, sort, quote modal, detail page
   Version: 2.0 — real data, smart image mapping, full UX
============================================================ */

'use strict';

// ─── IMAGE MAP ────────────────────────────────────────────────
// Maps product name keywords → Unsplash photo ID (stable CDN links)
// Each photo is free, commercial-use, no attribution required.
const IMAGE_MAP = [
  // Valves
  { keys: ['ball valve', 'ballvalve'],            img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { keys: ['gate valve'],                          img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80' },
  { keys: ['foot valve'],                          img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { keys: ['non return valve', 'check valve'],     img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  { keys: ['union valve'],                         img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  // Elbows
  { keys: ['elbow 90', 'elbow ppr', 'elbow pvc'], img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  { keys: ['elbow 45'],                            img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  { keys: ['elbow mfit', 'mixer elbow'],           img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  // Tees
  { keys: ['equal tee', 'tee ppr', 'tee pvc', 'y tee', 'plug tee'], img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  // Sockets / Unions / Plugs
  { keys: ['socket ppr', 'socket mfit', 'socket pvc'], img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  { keys: ['union accufit', 'union master'],        img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  { keys: ['plug accufit', 'plug master', 'plug elbow'], img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  { keys: ['end cap'],                              img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  { keys: ['c-band'],                              img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  // GI / Brass fittings
  { keys: ['angle nipple'],                        img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  { keys: ['pipe nipple', 'nipple'],               img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  { keys: ['gi elbow'],                            img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  { keys: ['cp nozzle', 'water nozzle'],           img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { keys: ['tee cock'],                            img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  // PVC fittings / drain
  { keys: ['p trap', 'clean out', 'bend mfit', 'plug elbow', 'y tee pvc', 'socket mfit'], img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  // Taps & Mixers
  { keys: ['basin mixer'],                         img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
  { keys: ['sink mixer'],                          img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
  { keys: ['vanity mixer'],                        img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
  { keys: ['bibcock', 'bicock'],                   img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { keys: ['single pillar cock', 'sink cock'],     img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { keys: ['double bibcock'],                      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { keys: ['toilet shower', 'shower neck', 'sink shower neck'], img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80' },
  // Bathroom accessories
  { keys: ['bath accessories set'],                img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80' },
  { keys: ['tissue holder'],                       img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80' },
  { keys: ['brush holder'],                        img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80' },
  { keys: ['soap dish'],                           img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80' },
  { keys: ['dress holder'],                        img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80' },
  { keys: ['mirror'],                              img: 'https://images.unsplash.com/photo-1620626011761-996317702782?w=400&q=80' },
  { keys: ['sink bowl'],                           img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
  { keys: ['basin waste', 'sink waste'],           img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
  { keys: ['floor waste'],                         img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  // Hardware / small items
  { keys: ['flexible pipe'],                       img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  { keys: ['jubilee clamp', 'killi clamp', 'u clamp'], img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  { keys: ['manhole'],                             img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  { keys: ['bolt kit'],                            img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  { keys: ['rawal plug', 'screw fastener'],        img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  { keys: ['steel nails'],                         img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  { keys: ['teflon tape', 'dhaga'],                img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  { keys: ['blade'],                               img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  { keys: ['waste pipe', 'garden pipe'],           img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  { keys: ['geezer wire', 'hook patti'],           img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80' },
  // PPR Pipes
  { keys: ['pipe ppr accufit'],                    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  { keys: ['pipe ppr master'],                     img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  { keys: ['pipe pn16', 'pipe pn20'],              img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  { keys: ['upvc pipe'],                           img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80' },
  // Water tanks
  { keys: ['water tank accufit loft'],             img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  { keys: ['water tank atlas red'],                img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  { keys: ['water tank blue supreme'],             img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  { keys: ['water tank green medium'],             img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  { keys: ['water tank'],                          img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  // Ceramics
  { keys: ['wc thai', 'toilet'],                   img: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400&q=80' },
  { keys: ['wash basin', 'basin styilo'],          img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80' },
];

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80';

function getProductImage(name) {
  const lower = name.toLowerCase();
  for (const entry of IMAGE_MAP) {
    if (entry.keys.some(k => lower.includes(k))) return entry.img;
  }
  return FALLBACK_IMG;
}

// ─── STATE ────────────────────────────────────────────────────
let allProducts = [];
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'default';

// ─── UTILS ───────────────────────────────────────────────────
function formatPrice(price) {
  if (!price || price === 0) return 'Call for Price';
  return 'Rs.\u00a0' + price.toLocaleString('en-PK');
}

function buildWhatsAppURL(productName, sku, price, name, contact, qty, note) {
  const priceStr = price > 0 ? 'Rs. ' + price.toLocaleString('en-PK') : 'Price on request';
  const msg = `Hello ZSE!\n\nI'd like a quote for:\n\nProduct: ${productName}\nSKU: ${sku}\nUnit Price: ${priceStr}\nQuantity: ${qty}\n\nName: ${name}\nContact: ${contact}${note ? '\nNote: ' + note : ''}\n\nPlease confirm availability and total.`;
  return `https://wa.me/923185929927?text=${encodeURIComponent(msg)}`;
}

function sanitize(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ─── TOAST NOTIFICATION ───────────────────────────────────────
function showToast(msg, type = 'success') {
  let toast = document.getElementById('zseToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'zseToast';
    toast.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:${type === 'error' ? '#c0392b' : '#222'};color:#fff;padding:12px 24px;border-radius:8px;font-size:.875rem;font-weight:600;z-index:9999;border:1px solid ${type === 'error' ? '#e74c3c' : '#ffd700'};box-shadow:0 4px 16px rgba(0,0,0,.6);opacity:0;transition:opacity .3s ease;pointer-events:none;`;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.background = type === 'error' ? '#c0392b' : '#1a1a1a';
  toast.style.borderColor = type === 'error' ? '#e74c3c' : '#ffd700';
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}

// ─── LOAD PRODUCTS ────────────────────────────────────────────
async function loadProducts(path = 'products.json') {
  const res = await fetch(path + '?v=' + Date.now());
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}

// ─── LISTING PAGE ─────────────────────────────────────────────
function initProductsPage() {
  const container = document.getElementById('productsContainer');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  currentSearch = params.get('search') || '';
  currentCategory = params.get('category') || 'all';

  const searchInput = document.getElementById('searchkey');
  if (searchInput && currentSearch) searchInput.value = currentSearch;

  // Set active filter btn
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentCategory);
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Update URL without reload
      const url = new URL(window.location);
      if (currentCategory === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', currentCategory);
      window.history.replaceState({}, '', url);
      renderProducts();
    });
  });

  // Sort
  const sortEl = document.getElementById('sortSelect');
  if (sortEl) {
    sortEl.addEventListener('change', () => {
      currentSort = sortEl.value;
      renderProducts();
    });
  }

  // Search
  const searchBtn = document.querySelector('.btn-search');
  if (searchBtn) searchBtn.addEventListener('click', doSearch);
  if (searchInput) searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  function doSearch() {
    currentSearch = (searchInput ? searchInput.value.trim() : '');
    const url = new URL(window.location);
    if (currentSearch) url.searchParams.set('search', currentSearch);
    else url.searchParams.delete('search');
    window.history.replaceState({}, '', url);
    renderProducts();
  }

  // Modal close
  document.querySelector('.modal .close')?.addEventListener('click', closeQuoteModal);
  document.getElementById('quoteForm')?.addEventListener('submit', handleQuoteSubmit);
  window.addEventListener('click', e => {
    if (e.target === document.getElementById('quoteModal')) closeQuoteModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeQuoteModal();
  });

  // Load
  loadProducts()
    .then(data => {
      allProducts = data;
      renderProducts();
    })
    .catch(() => {
      container.innerHTML = '<p style="color:#ffd700;text-align:center;padding:60px 20px">⚠️ Failed to load products. Please refresh the page.</p>';
    });
}

function getSortedFiltered() {
  let filtered = allProducts;

  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      (p.variant || '').toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  switch (currentSort) {
    case 'price-asc':
      filtered = [...filtered].sort((a, b) => (a.selling_price || 0) - (b.selling_price || 0));
      break;
    case 'price-desc':
      filtered = [...filtered].sort((a, b) => (b.selling_price || 0) - (a.selling_price || 0));
      break;
    case 'name-asc':
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'instock':
      filtered = [...filtered].sort((a, b) => (b.in_stock ? 1 : 0) - (a.in_stock ? 1 : 0));
      break;
  }

  return filtered;
}

function renderProducts() {
  const container = document.getElementById('productsContainer');
  const countEl = document.getElementById('productCount');

  const filtered = getSortedFiltered();
  if (countEl) countEl.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No products found</h3>
        <p>${currentSearch ? `No results for "<strong>${sanitize(currentSearch)}</strong>"` : 'No products in this category'}</p>
        <button class="btn-cta" onclick="clearFilters()" style="margin-top:16px">Clear Filters</button>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const img = getProductImage(p.name);
    const price = formatPrice(p.selling_price);
    const stockClass = p.in_stock ? 'in-stock' : 'out-stock';
    const stockLabel = p.in_stock ? '✔ In Stock' : '⏳ Available to Order';
    return `
      <article class="product-card" tabindex="0" role="button"
        aria-label="${sanitize(p.name)}"
        onclick="openQuoteModal('${p.name.replace(/'/g, "\\'")}','${p.sku}',${p.selling_price})"
        onkeydown="if(event.key==='Enter')openQuoteModal('${p.name.replace(/'/g, "\\'")}','${p.sku}',${p.selling_price})">
        <div class="product-img-wrap">
          <img
            src="${img}"
            alt="${sanitize(p.name)}"
            loading="lazy"
            onerror="this.src='${FALLBACK_IMG}'"
          />
          <span class="product-stock ${stockClass}">${stockLabel}</span>
        </div>
        <div class="product-info">
          <div class="product-category-tag">${sanitize(p.category)}</div>
          <h3 class="product-name">${sanitize(p.name)}</h3>
          ${p.variant ? `<div class="product-variant">${sanitize(p.variant)}</div>` : ''}
          <div class="product-sku">SKU: ${sanitize(p.sku)}</div>
          <div class="product-price">${price}</div>
          <button class="quote-btn" onclick="event.stopPropagation();openQuoteModal('${p.name.replace(/'/g, "\\'")}','${p.sku}',${p.selling_price})">
            📩 Request Quote
          </button>
        </div>
      </article>`;
  }).join('');
}

window.clearFilters = function () {
  currentSearch = '';
  currentCategory = 'all';
  currentSort = 'default';
  const searchInput = document.getElementById('searchkey');
  if (searchInput) searchInput.value = '';
  const sortEl = document.getElementById('sortSelect');
  if (sortEl) sortEl.value = 'default';
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
  const url = new URL(window.location);
  url.searchParams.delete('search');
  url.searchParams.delete('category');
  window.history.replaceState({}, '', url);
  renderProducts();
};

// ─── QUOTE MODAL ──────────────────────────────────────────────
window.openQuoteModal = function (name, sku, price) {
  document.getElementById('modalProductName').textContent = name;
  document.getElementById('modalProductSKU').value = sku;
  document.getElementById('modalProductPrice').value = price;
  const modal = document.getElementById('quoteModal');
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('customerName')?.focus(), 100);
};

window.closeQuoteModal = function () {
  const modal = document.getElementById('quoteModal');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

function handleQuoteSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('customerName').value.trim();
  const contact = document.getElementById('customerContact').value.trim();
  const qty = document.getElementById('quantity').value.trim();
  const sku = document.getElementById('modalProductSKU').value;
  const price = parseInt(document.getElementById('modalProductPrice').value) || 0;
  const productName = document.getElementById('modalProductName').textContent;
  const note = document.getElementById('additionalInfo')?.value.trim() || '';

  if (!name || !contact || !qty) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  const url = buildWhatsAppURL(productName, sku, price, name, contact, qty, note);
  window.open(url, '_blank', 'noopener,noreferrer');
  closeQuoteModal();
  e.target.reset();
  showToast('Opening WhatsApp with your quote request...');
}

// ─── DETAIL PAGE ──────────────────────────────────────────────
function initDetailPage() {
  const container = document.getElementById('detailContent');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const sku = params.get('sku');

  if (!sku) {
    container.innerHTML = notFoundHTML();
    return;
  }

  loadProducts('../products.json')
    .then(data => {
      const product = data.find(p => p.sku === sku);
      if (!product) { container.innerHTML = notFoundHTML(); return; }
      renderDetail(product);
    })
    .catch(() => {
      container.innerHTML = '<p style="color:#ffd700;text-align:center;padding:80px">Failed to load product. Please try again.</p>';
    });
}

function notFoundHTML() {
  return `<div style="text-align:center;padding:80px 20px;color:#aaa">
    <div style="font-size:3rem;margin-bottom:16px">🔍</div>
    <h2 style="color:#fff;margin-bottom:8px">Product Not Found</h2>
    <p>This product may have been removed or the link is incorrect.</p>
    <a href="../products.html" class="btn-cta" style="display:inline-flex;margin-top:24px">← Back to Products</a>
  </div>`;
}

function renderDetail(p) {
  document.title = `${p.name} — ZSE Store`;
  const breadcrumb = document.getElementById('breadcrumbProduct');
  if (breadcrumb) breadcrumb.textContent = p.name;

  const img = getProductImage(p.name);

  document.getElementById('detailContent').innerHTML = `
    <div class="detail-layout">
      <div class="detail-image-wrap">
        <img src="${img}" alt="${sanitize(p.name)}" class="detail-main-img"
          onerror="this.src='${FALLBACK_IMG}'" />
      </div>
      <div class="detail-info">
        <span class="detail-cat-badge">${sanitize(p.category)}</span>
        <h1 class="detail-title">${sanitize(p.name)}</h1>
        ${p.variant ? `<p class="detail-variant">Type: <strong>${sanitize(p.variant)}</strong></p>` : ''}
        <p class="detail-sku">SKU: <code>${sanitize(p.sku)}</code></p>
        <div class="detail-price">${formatPrice(p.selling_price)}</div>
        <div class="detail-availability ${p.in_stock ? 'in-stock' : 'out-stock'}">
          ${p.in_stock
            ? `✔ In Stock — ${p.stock} unit${p.stock !== 1 ? 's' : ''} available`
            : '⏳ Available to Order — contact us for lead time'}
        </div>
        <div class="detail-actions">
          <button class="btn-whatsapp" onclick="quickWhatsApp('${p.name.replace(/'/g, "\\'")}','${p.sku}',${p.selling_price})">
            💬 WhatsApp Us
          </button>
          <a href="tel:+923185929927" class="btn-call">📞 Call Now</a>
        </div>
        <div class="detail-meta">
          <p>✔ Price is per unit, excluding GST where applicable</p>
          <p>✔ Bulk orders welcome — ask for wholesale pricing</p>
          <p>✔ Delivery available in Haripur & surrounding areas</p>
          <p>✔ All products sourced from trusted suppliers</p>
        </div>
      </div>
    </div>`;
}

window.quickWhatsApp = function (name, sku, price) {
  const msg = `Hello ZSE!\n\nI'm interested in:\n\nProduct: ${name}\nSKU: ${sku}\nPrice: ${price > 0 ? 'Rs. ' + price.toLocaleString('en-PK') : 'Price on request'}\n\nPlease confirm availability.`;
  window.open(`https://wa.me/923185929927?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
};

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productsContainer')) initProductsPage();
  if (document.getElementById('detailContent')) initDetailPage();
});
