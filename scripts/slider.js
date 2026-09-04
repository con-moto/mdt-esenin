const slides = [
  {
    src: './assets/images/hero-1.jpg',
    webp: './assets/images/optimized/hero-1.webp',
    alt: 'Спектакль МДТ имени Сергея Есенина',
  },
  {
    src: './assets/images/hero-2.jpg',
    webp: './assets/images/optimized/hero-2.webp',
    alt: 'Спектакль МДТ имени Сергея Есенина',
  },
  {
    src: './assets/images/hero-3.jpg',
    webp: './assets/images/optimized/hero-3.webp',
    alt: 'Спектакль МДТ имени Сергея Есенина',
  },
  {
    src: './assets/images/hero-4.jpg',
    webp: './assets/images/optimized/hero-4.webp',
    alt: 'Спектакль МДТ имени Сергея Есенина',
  },
  {
    src: './assets/images/hero-5.jpg',
    webp: './assets/images/optimized/hero-5.webp',
    alt: 'Спектакль МДТ имени Сергея Есенина',
  },
  {
    src: './assets/images/hero-6.jpg',
    webp: './assets/images/optimized/hero-6.webp',
    alt: 'Спектакль МДТ имени Сергея Есенина',
  },
];


const FIRST_SLIDE_INTERVAL = 3500;
const SLIDE_INTERVAL = 2500;


let currentIndex = 0;
let timerId = null;


function renderSlides(slidesContainer, paginationContainer) {
  slidesContainer.innerHTML = '';
  paginationContainer.innerHTML = '';


  slides.forEach((slide, index) => {
    const slideElement = document.createElement('li');


    slideElement.className = 'hero__slide';


    if (index === 0) {
      slideElement.classList.add('hero__slide--active');
    }


    const picture = document.createElement('picture');


    if (slide.webp) {
      const sourceWebp = document.createElement('source');
      sourceWebp.type = 'image/webp';
      sourceWebp.srcset = slide.webp;


      picture.append(sourceWebp);
    }


    const img = document.createElement('img');
    img.className = 'hero__image';
    img.src = slide.src;
    img.alt = slide.alt;


    if (index === 0) {
      img.loading = 'eager';
      img.fetchPriority = 'high';
    } else {
      img.loading = 'lazy';
      img.decoding = 'async';
    }


    picture.append(img);
    slideElement.append(picture);
    slidesContainer.append(slideElement);


    const dot = document.createElement('button');


    dot.className = 'hero__dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Перейти к слайду ${index + 1}`);


    if (index === 0) {
      dot.classList.add('hero__dot--active');
      dot.setAttribute('aria-current', 'true');
    } else {
      dot.setAttribute('aria-current', 'false');
    }


    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoTimer();
    });


    paginationContainer.append(dot);
  });
}


function updateActiveSlide() {
  const slideElements = document.querySelectorAll('.hero__slide');
  const dotElements = document.querySelectorAll('.hero__dot');


  slideElements.forEach((slideElement, index) => {
    slideElement.classList.toggle(
      'hero__slide--active',
      index === currentIndex
    );
  });


  dotElements.forEach((dotElement, index) => {
    const isActive = index === currentIndex;


    dotElement.classList.toggle('hero__dot--active', isActive);
    dotElement.setAttribute('aria-current', String(isActive));
  });
}


function goToSlide(index) {
  currentIndex = (index + slides.length) % slides.length;


  updateActiveSlide();
}


function nextSlide() {
  goToSlide(currentIndex + 1);
}


function previousSlide() {
  goToSlide(currentIndex - 1);
}


function stopAutoTimer() {
  if (timerId !== null) {
    clearTimeout(timerId);
    timerId = null;
  }
}


function startAutoTimer() {
  stopAutoTimer();


  const interval = currentIndex === 0
    ? FIRST_SLIDE_INTERVAL
    : SLIDE_INTERVAL;


  timerId = window.setTimeout(() => {
    nextSlide();
    startAutoTimer();
  }, interval);
}


function resetAutoTimer() {
  startAutoTimer();
}


function initSlider() {
  const hero = document.querySelector('.hero');


  if (!hero || slides.length === 0) {
    return;
  }


  const slidesContainer = hero.querySelector('.hero__list');
  const paginationContainer = hero.querySelector('.hero__pagination');
  const previousButton = hero.querySelector('.hero__arrow--prev');
  const nextButton = hero.querySelector('.hero__arrow--next');


  if (
    !slidesContainer ||
    !paginationContainer ||
    !previousButton ||
    !nextButton
  ) {
    return;
  }


  renderSlides(slidesContainer, paginationContainer);
  startAutoTimer();


  previousButton.addEventListener('click', () => {
    previousSlide();
    resetAutoTimer();
  });


  nextButton.addEventListener('click', () => {
    nextSlide();
    resetAutoTimer();
  });


  hero.addEventListener('mouseenter', stopAutoTimer);
  hero.addEventListener('mouseleave', startAutoTimer);


  hero.addEventListener('focusin', stopAutoTimer);


  hero.addEventListener('focusout', (event) => {
    if (!hero.contains(event.relatedTarget)) {
      startAutoTimer();
    }
  });


  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoTimer();
      return;
    }


    startAutoTimer();
  });
}


document.addEventListener('DOMContentLoaded', initSlider);