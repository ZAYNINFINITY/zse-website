// Read More button click handler
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.read-more');

  if (buttons.length === 0) {
    console.warn("No .read-more buttons found on the page.");
    return;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('This would expand the blog or redirect to full article.');
    });
  });

  console.log(`blog.js loaded and ${buttons.length} button(s) bound.`);
});
