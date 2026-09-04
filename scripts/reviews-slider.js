document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.review-slider');
  const container = document.querySelector('.reviews__container');
  
  if (!slider || !container) return;

  const slides = Array.from(slider.querySelectorAll('.review-slide'));
  const dotsContainer = container.querySelector('.review-slider__dots');
  const prevBtn = slider.querySelector('.review-slider__arrow--prev');
  const nextBtn = slider.querySelector('.review-slider__arrow--next');

  if (!dotsContainer || !prevBtn || !nextBtn || slides.length === 0) {
    console.error('Reviews slider: missing elements');
    console.log('dotsContainer:', dotsContainer);
    console.log('prevBtn:', prevBtn);
    console.log('nextBtn:', nextBtn);
    console.log('slides:', slides.length);
    return;
  }

  let currentIndex = 0;
  let autoPlayInterval;

  // Создаём точки
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('review-slider__dot');
    if (index === 0) dot.classList.add('is-active');
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('.review-slider__dot'));

  function updateSlider() {
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.remove('review-slide--hidden');
        slide.classList.add('review-slide--active');
      } else {
        slide.classList.add('review-slide--hidden');
        slide.classList.remove('review-slide--active');
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoPlay();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // Event listeners
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
    resetAutoPlay();
  });

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
  slider.addEventListener('mouseleave', startAutoPlay);

  // Init
  updateSlider();
  startAutoPlay();
});