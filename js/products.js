// ✅ Toast function
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ✅ Buy button toast
document.querySelectorAll('.btn-buy').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast("Item added to cart!");
  });
});

// ✅ Live search filter
document.getElementById("searchInput").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  const rows = document.querySelectorAll("#productTableBody tr");
  rows.forEach(row => {
    const name = row.getAttribute("data-name").toLowerCase();
    row.style.display = name.includes(searchValue) ? "table-row" : "none";
  });
});
