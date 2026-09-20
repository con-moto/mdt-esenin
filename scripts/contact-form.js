document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const CONTACT_ENDPOINT = 'https://mdt-esenin-new.vercel.app/api/contact';

  // Добавляем honeypot для защиты от спама
  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = 'website';
  honeypot.style.display = 'none';
  honeypot.tabIndex = -1;
  honeypot.autocomplete = 'off';
  form.appendChild(honeypot);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector('.contact-form__submit');
    const originalText = submitBtn.textContent;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    submitBtn.textContent = 'Отправляется...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const raw = await response.text();

      let result = null;

      if (raw) {
        try {
          result = JSON.parse(raw);
        } catch {
          result = null;
        }
      }

      if (!response.ok) {
        throw new Error(
          result?.message || `Ошибка отправки (${response.status})`
        );
      }

      form.reset();
      alert('✅ Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Произошла ошибка. Попробуйте позже или напишите нам напрямую на mdtesenina@inbox.ru');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
});