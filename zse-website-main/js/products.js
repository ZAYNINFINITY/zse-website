// Global variables
let allProducts = [];
let currentFilter = 'all';

// Load products from JSON
async function loadProducts() {
  try {
    const response = await fetch('products.json');
    if (!response.ok) {
      throw new Error('Failed to load products data');
    }
    allProducts = await response.json();
    renderProducts(allProducts);
  } catch (error) {
    console.error('Error loading products:', error);
    // Show error message to user
    const container = document.getElementById('productsContainer');
    container.innerHTML = '<p style="color: #ffd700; text-align: center; padding: 50px;">Error loading products. Please refresh the page.</p>';
  }
}

// Render products
function renderProducts(products) {
  const container = document.getElementById('productsContainer');
  container.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price}</div>
        <div class="product-description">${product.description}</div>
        <button class="quote-btn" onclick="openQuoteModal('${product.name}')">Request Quote</button>
      </div>
    `;
    container.appendChild(productCard);
  });
}

// Filter products
function filterProducts(category) {
  currentFilter = category;

  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-filter="${category}"]`).classList.add('active');

  let filteredProducts;
  if (category === 'all') {
    filteredProducts = allProducts;
  } else {
    filteredProducts = allProducts.filter(product => product.category === category);
  }

  renderProducts(filteredProducts);
}

// Open quote modal
function openQuoteModal(productName) {
  document.getElementById('productName').value = productName;
  document.getElementById('quoteModal').style.display = 'block';
}

// Close modal
function closeModal() {
  document.getElementById('quoteModal').style.display = 'none';
}

// Handle quote form submission
function handleQuoteSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('customerName').value;
  const contact = document.getElementById('customerContact').value;
  const quantity = document.getElementById('quantity').value;
  const productName = document.getElementById('productName').value;
  const additionalInfo = document.getElementById('additionalInfo').value;

  // Create WhatsApp message
  const message = `Hello! I'm interested in purchasing:

Product: ${productName}
Quantity: ${quantity}
Name: ${name}
Contact: ${contact}
${additionalInfo ? `Additional Info: ${additionalInfo}` : ''}

Please provide a quote.`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  // WhatsApp URL (using Pakistan country code)
  const whatsappURL = `https://wa.me/923185929927?text=${encodedMessage}`;

  // Open WhatsApp
  window.open(whatsappURL, '_blank');

  // Close modal
  closeModal();

  // Reset form
  event.target.reset();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  // Filter button listeners
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterProducts(btn.dataset.filter);
    });
  });

  // Modal listeners
  document.querySelector('.close').addEventListener('click', closeModal);
  document.getElementById('quoteForm').addEventListener('submit', handleQuoteSubmit);

  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    const modal = document.getElementById('quoteModal');
    if (event.target === modal) {
      closeModal();
    }
  });
});
