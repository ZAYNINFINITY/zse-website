// ✅ Toast Function
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ✅ Filtering
document.querySelectorAll('.filter-buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    document.querySelectorAll('.product-card').forEach(card => {
      const match = category === 'all' || card.classList.contains(category);
      card.style.display = match ? 'block' : 'none';
    });
  });
});

// ✅ Modal open + Toast
document.querySelectorAll('.btn-buy').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.classList.add('active');
    modal.querySelector('.modal-content').innerHTML = `
      <span class="modal-close">&times;</span>
      <h2>Product Added to Cart!</h2>
      <p>Thanks for selecting. We'll contact you soon!</p>
    `;

    // 🎉 Show toast message
    showToast("Item added to cart!");
  });
});

// ✅ Modal close
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
    document.querySelector('.modal').classList.remove('active');
  }
});
