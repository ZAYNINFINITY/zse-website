'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const successEl = document.getElementById('formSuccess');
  const errorEl   = document.getElementById('formError');

  // Rate limit: prevent duplicate submissions within 10s
  let lastSubmit = 0;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmit < 10000) return;

    const name    = document.getElementById('contactName').value.trim();
    const phone   = document.getElementById('contactPhone').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // Client-side validation
    if (!name || !phone || !message) {
      errorEl.textContent = '⚠️ Please fill in all required fields.';
      errorEl.style.display = 'block';
      successEl.style.display = 'none';
      return;
    }
    if (phone.length < 10) {
      errorEl.textContent = '⚠️ Please enter a valid phone number.';
      errorEl.style.display = 'block';
      return;
    }

    // Disable button during submit
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    successEl.style.display = 'none';
    errorEl.style.display = 'none';

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        lastSubmit = Date.now();
        successEl.style.display = 'block';
        form.reset();
        submitBtn.textContent = '✔ Sent!';
        setTimeout(() => {
          successEl.style.display = 'none';
          submitBtn.textContent = 'Send Message ✉️';
          submitBtn.disabled = false;
        }, 6000);
      } else {
        throw new Error('Server error');
      }
    } catch (_) {
      // WhatsApp fallback
      const msg = `Hello ZSE!\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
      errorEl.textContent = '⚠️ Form submit failed. Redirecting to WhatsApp…';
      errorEl.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message ✉️';
      setTimeout(() => {
        window.open(`https://wa.me/923185929927?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
      }, 1200);
    }
  });
});
