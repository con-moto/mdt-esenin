function createSliderImages(eventKey, event) {
  if (Array.isArray(event.images) && event.images.length) {
    return event.images;
  }



  const sliderCount = Number(event.sliderCount) || 0;



  return Array.from({ length: sliderCount }, (_, index) => {
    const photoNumber = String(index + 1).padStart(2, "0");



    return {
      src: `assets/images/repertoire/${eventKey}/${photoNumber}.jpg`,
      avif: `assets/images/optimized/repertoire/${eventKey}/${photoNumber}.avif`,
      webp: `assets/images/optimized/repertoire/${eventKey}/${photoNumber}.webp`,
      alt: `Сцена из спектакля «${event.title.replace(/\n/g, " ")}»`
    };
  });
}



function initEventHeader() {
  const hero = document.querySelector("[data-event-hero]");
  const eventKey = document.body.dataset.event;
  const events = window.EVENTS_DATA;



  if (!hero || !eventKey || !events || !events[eventKey]) {
    return;
  }



  const event = events[eventKey];
  const slidesContainer = hero.querySelector("[data-event-slides]");
  const title = hero.querySelector("[data-event-title]");
  const genre = hero.querySelector("[data-event-genre]");
  const quote = hero.querySelector("[data-event-quote]");
  const ticket = hero.querySelector("[data-event-ticket]");
  const root = document.body.dataset.root || "./";



  const sliderImages = createSliderImages(eventKey, event);



  if (!slidesContainer || !sliderImages.length) {
    return;
  }



  if (event.heroCompact) {
    hero.classList.add("event-hero--compact");
  } else {
    hero.classList.remove("event-hero--compact");
  }



  const normalizePath = (path) => {
    const cleanRoot = root.endsWith("/") ? root : `${root}/`;
    const cleanPath = path.replace(/^\.?\//, "");



    return `${cleanRoot}${cleanPath}`;
  };



  const updateSocialIcons = () => {
    const useDarkIcons = window.innerWidth <= 1400;



    const vkIcon = hero.querySelector(
      '.event-hero__social img[data-root-path*="vk"]'
    );



    const telegramIcon = hero.querySelector(
      '.event-hero__social img[data-root-path*="tg"], ' +
        '.event-hero__social img[data-root-path*="telegram"]'
    );



    if (vkIcon) {
      vkIcon.src = normalizePath(
        useDarkIcons
          ? "assets/icons/vk.avif"
          : "assets/icons/vk-white.png"
      );
    }



    if (telegramIcon) {
      telegramIcon.src = normalizePath(
        useDarkIcons
          ? "assets/icons/telegram.avif"
          : "assets/icons/tg-white.png"
      );
    }
  };



  if (title) {
    title.textContent = event.title || "";
  }



  if (genre) {
    genre.textContent = event.genre || "";
  }



  if (quote) {
    const quoteInner = quote.querySelector(".event-hero__quote-inner");
    const quoteText = event.quote || "";



    if (quoteInner) {
      quoteInner.textContent = quoteText;
    }



    if (quoteText) {
      quote.hidden = false;



      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              quote.classList.add("event-hero__quote--visible");
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );



      observer.observe(quote);
    } else {
      quote.hidden = true;
    }
  }



  if (ticket && event.ticketUrl) {
    ticket.href = event.ticketUrl;
  }



  updateSocialIcons();



  window.addEventListener("resize", updateSocialIcons);



  slidesContainer.innerHTML = "";



  sliderImages.forEach((imageData, index) => {
    const slide = document.createElement("article");
    const picture = document.createElement("picture");



    slide.className = "event-hero__slide";



    if (index === 0) {
      slide.classList.add("event-hero__slide--active");
    }



    const sourceAvif = document.createElement("source");
    sourceAvif.type = "image/avif";
    sourceAvif.srcset = normalizePath(imageData.avif);


    const sourceWebp = document.createElement("source");
    sourceWebp.type = "image/webp";
    sourceWebp.srcset = normalizePath(imageData.webp);



    const img = document.createElement("img");
    img.className = "event-hero__image";
    img.src = normalizePath(imageData.src);
    img.alt = imageData.alt;
    img.loading = index === 0 ? "eager" : "lazy";
    img.decoding = "async";



    img.addEventListener("error", () => {
      console.error(`Не удалось загрузить фото: ${img.src}`);
    });



    picture.append(sourceAvif, sourceWebp, img);
    slide.append(picture);
    slidesContainer.append(slide);
  });



  const slides = Array.from(
    slidesContainer.querySelectorAll(".event-hero__slide")
  );



  let activeIndex = 0;
  let timerId = null;



  const showSlide = (nextIndex) => {
    if (nextIndex === activeIndex) {
      return;
    }



    slides[activeIndex].classList.remove("event-hero__slide--active");



    activeIndex = nextIndex;



    slides[activeIndex].classList.add("event-hero__slide--active");
  };



  const startAutoplay = () => {
    if (slides.length < 2 || timerId) {
      return;
    }



    timerId = window.setInterval(() => {
      showSlide((activeIndex + 1) % slides.length);
    }, 3500);
  };



  const stopAutoplay = () => {
    if (!timerId) {
      return;
    }



    window.clearInterval(timerId);
    timerId = null;
  };



  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    startAutoplay();
  }



  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
      return;
    }



    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      startAutoplay();
    }
  });
}



document.addEventListener("layout:ready", initEventHeader);