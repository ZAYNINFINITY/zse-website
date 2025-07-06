// Form validation
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  if (!name || !email || !message) {
    e.preventDefault();
    alert('Please fill in all fields.');
  } else {
    alert('Thanks! We will contact you shortly.');
  }
});
