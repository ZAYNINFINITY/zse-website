// ===== ZSE STORE - products.js =====
// Handles: product listing page, search, filter, quote modal, detail page

let allProducts = [];
let currentCategory = 'all';
let currentSearch = '';

// ---- SHARED: Load products.json ----
async function loadProducts(jsonPath = 'products.json') {
  const response = await fetch(jsonPath);
  if (!response.ok) throw new Error('Failed to fetch products.json');
  return response.json();
}

// ---- SHARED: Format price ----
function formatPrice(price) {
  if (!price || price === 0) return 'Call for price';
  return 'Rs. ' + price.toLocaleString('en-PK');
}

// ---- SHARED: Build WhatsApp quote message ----
function buildWhatsAppURL(productName, sku, price, customerName, contact, qty, note) {
  const priceStr = price > 0 ? `Rs. ${price.toLocaleString('en-PK')}` : 'Price on request';
  const msg = `Hello ZSE! I'd like to enquire about:

Product: ${productName}
SKU: ${sku}
Unit Price: ${priceStr}
Quantity: ${qty}
Name: ${customerName}
Contact: ${contact}${note ? '\nNote: ' + note : ''}

Please confirm availability and total price.`;
  return `https://wa.me/923185929927?text=${encodeURIComponent(msg)}`;
}

// ============================================================
// PRODUCTS LISTING PAGE (products.html)
// ============================================================
function initProductsPage() {
  const container = document.getElementById('productsContainer');
  const searchInput = document.getElementById('searchkey');
  const searchBtn = document.querySelector('.btn-search');
  if (!container) return;

  // Read ?search= or ?category= from URL
  const params = new URLSearchParams(window.location.search);
  currentSearch = params.get('search') || '';
  currentCategory = params.get('category') || 'all';

  // Pre-fill search bar if search came from homepage
  if (searchInput && currentSearch) searchInput.value = currentSearch;

  // Set active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentCategory);
  });

  loadProducts()
    .then(data => {
      allProducts = data;
      renderProducts();
    })
    .catch(() => {
      container.innerHTML = '<p style="color:#ffd700;text-align:center;padding:60px">Error loading products. Please refresh.</p>';
    });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts();
    });
  });

  // Search bar on products page
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      currentSearch = searchInput.value.trim();
      renderProducts();
    });
  }
  if (searchInput) {
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        currentSearch = searchInput.value.trim();
        renderProducts();
      }
    });
  }

  // Quote modal close
  const closeBtn = document.querySelector('.modal .close');
  if (closeBtn) closeBtn.addEventListener('click', closeQuoteModal);

  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) quoteForm.addEventListener('submit', handleQuoteSubmit);

  window.addEventListener('click', e => {
    const modal = document.getElementById('quoteModal');
    if (e.target === modal) closeQuoteModal();
  });
}

function renderProducts() {
  const container = document.getElementById('productsContainer');
  let filtered = allProducts;

  // Filter by category
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  // Filter by search
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.variant.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // Update count
  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px;color:#aaa;">
        <p style="font-size:1.2rem;">No products found${currentSearch ? ` for "<strong style="color:#ffd700">${currentSearch}</strong>"` : ''}.</p>
        <button onclick="clearFilters()" style="margin-top:16px;background:#ffd700;color:#121212;border:none;padding:10px 24px;border-radius:20px;font-weight:700;cursor:pointer;">Clear Filters</button>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" onerror="this.src='assets/products/Pipe Fittings.jpg'" />
      <div class="product-info">
        <div class="product-category-tag">${p.category}</div>
        <div class="product-name">${p.name}</div>
        ${p.variant ? `<div class="product-variant">${p.variant}</div>` : ''}
        <div class="product-sku">SKU: ${p.sku}</div>
        <div class="product-price">${formatPrice(p.selling_price)}</div>
        <div class="product-stock ${p.in_stock ? 'in-stock' : 'out-stock'}">
          ${p.in_stock ? '✔ In Stock' : '⏳ Available to Order'}
        </div>
        <button class="quote-btn" onclick="openQuoteModal('${p.name.replace(/'/g, "\\'")}','${p.sku}',${p.selling_price})">
          📩 Request Quote
        </button>
      </div>
    </div>`).join('');
}

function clearFilters() {
  currentSearch = '';
  currentCategory = 'all';
  const searchInput = document.getElementById('searchkey');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
  renderProducts();
}

// ---- Quote Modal ----
function openQuoteModal(name, sku, price) {
  document.getElementById('modalProductName').textContent = name;
  document.getElementById('modalProductSKU').value = sku;
  document.getElementById('modalProductPrice').value = price;
  document.getElementById('quoteModal').style.display = 'flex';
}

function closeQuoteModal() {
  document.getElementById('quoteModal').style.display = 'none';
}

function handleQuoteSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('customerName').value.trim();
  const contact = document.getElementById('customerContact').value.trim();
  const qty = document.getElementById('quantity').value.trim();
  const sku = document.getElementById('modalProductSKU').value;
  const price = parseInt(document.getElementById('modalProductPrice').value) || 0;
  const productName = document.getElementById('modalProductName').textContent;
  const note = document.getElementById('additionalInfo').value.trim();

  const url = buildWhatsAppURL(productName, sku, price, name, contact, qty, note);
  window.open(url, '_blank');
  closeQuoteModal();
  e.target.reset();
}

// ============================================================
// PRODUCT DETAIL PAGE (products/product-detail-template.html)
// ============================================================
function initDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const sku = params.get('sku');
  if (!sku) {
    document.getElementById('detailContent').innerHTML = '<p style="color:#ffd700;text-align:center;padding:60px">Product not found. <a href="../products.html" style="color:#ffd700">Back to Products</a></p>';
    return;
  }

  loadProducts('../products.json')
    .then(data => {
      const product = data.find(p => p.sku === sku);
      if (!product) {
        document.getElementById('detailContent').innerHTML = '<p style="color:#ffd700;text-align:center;padding:60px">Product not found. <a href="../products.html" style="color:#ffd700">Back to Products</a></p>';
        return;
      }
      renderDetail(product);
    })
    .catch(() => {
      document.getElementById('detailContent').innerHTML = '<p style="color:red;text-align:center;padding:60px">Error loading product.</p>';
    });
}

function renderDetail(p) {
  document.title = `${p.name} - ZSE Store`;
  document.getElementById('breadcrumbProduct').textContent = p.name;
  document.getElementById('detailContent').innerHTML = `
    <div class="detail-layout">
      <div class="detail-image-wrap">
        <img src="../${p.image}" alt="${p.name}" class="detail-main-img" onerror="this.src='../assets/products/Pipe Fittings.jpg'" />
      </div>
      <div class="detail-info">
        <span class="detail-cat-badge">${p.category}</span>
        <h1 class="detail-title">${p.name}</h1>
        ${p.variant ? `<p class="detail-variant">Type: <strong>${p.variant}</strong></p>` : ''}
        <p class="detail-sku">SKU: <strong>${p.sku}</strong></p>
        <div class="detail-price">${formatPrice(p.selling_price)}</div>
        <div class="detail-availability ${p.in_stock ? 'in-stock' : 'out-stock'}">
          ${p.in_stock ? `✔ In Stock (${p.stock} units)` : '⏳ Available to Order — call us to confirm lead time'}
        </div>
        <div class="detail-actions">
          <button class="btn-whatsapp" onclick="quickWhatsApp('${p.name.replace(/'/g, "\\'")}','${p.sku}',${p.selling_price})">
            💬 WhatsApp Us
          </button>
          <a href="tel:+923185929927" class="btn-call">📞 Call Now</a>
        </div>
        <div class="detail-meta">
          <p>✔ Prices are per unit (excluding GST where applicable)</p>
          <p>✔ Bulk orders available — contact for wholesale pricing</p>
          <p>✔ Delivery available in Haripur & surrounding areas</p>
        </div>
      </div>
    </div>`;
}

function quickWhatsApp(name, sku, price) {
  const msg = `Hello ZSE! I'm interested in:\n\nProduct: ${name}\nSKU: ${sku}\nPrice: ${price > 0 ? 'Rs. ' + price.toLocaleString('en-PK') : 'Price on request'}\n\nPlease confirm availability.`;
  window.open(`https://wa.me/923185929927?text=${encodeURIComponent(msg)}`, '_blank');
}

// ---- Auto-init based on page ----
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productsContainer')) initProductsPage();
  if (document.getElementById('detailContent')) initDetailPage();
});
