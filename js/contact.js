// ===== ZSE STORE - contact.js =====

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !phone || !message) {
      alert('Please fill in all fields.');
      return;
    }

    // Send via WhatsApp as fallback (Formspree handles email)
    // The form action= points to Formspree; on success we also open WhatsApp
    const whatsappMsg = `Hello ZSE!\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    const whatsappURL = `https://wa.me/923185929927?text=${encodeURIComponent(whatsappMsg)}`;

    // Submit to Formspree via fetch
    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(res => {
      if (res.ok) {
        document.getElementById('formSuccess').style.display = 'block';
        form.reset();
        setTimeout(() => {
          document.getElementById('formSuccess').style.display = 'none';
        }, 5000);
      } else {
        // Fallback: just open WhatsApp
        window.open(whatsappURL, '_blank');
      }
    }).catch(() => {
      window.open(whatsappURL, '_blank');
    });
  });
});
