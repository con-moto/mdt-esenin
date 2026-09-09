// scripts/scroll-to-top.js

(function() {
  const scrollBtn = document.getElementById('scrollToTop');
  if (!scrollBtn) return;

  function toggleScrollButton() {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleScrollButton, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  toggleScrollButton();
})();