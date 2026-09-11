const clubSlides = [
  {
    src: "../assets/images/club/01.jpg",
    webp: "../assets/images/optimized/club/01.webp",
    avif: "../assets/images/optimized/club/01.avif",
    alt: "Клуб друзей МДТ имени Сергея Есенина"
  },
  {
    src: "../assets/images/club/02.jpg",
    webp: "../assets/images/optimized/club/02.webp",
    avif: "../assets/images/optimized/club/02.avif",
    alt: "Клуб друзей МДТ имени Сергея Есенина"
  },
  {
    src: "../assets/images/club/03.jpg",
    webp: "../assets/images/optimized/club/03.webp",
    avif: "../assets/images/optimized/club/03.avif",
    alt: "Клуб друзей МДТ имени Сергея Есенина"
  }
];

const CLUB_FIRST_SLIDE_INTERVAL = 3500;
const CLUB_SLIDE_INTERVAL = 2500;

function createClubSlide(slide, index) {
  const item = document.createElement("li");
  item.className = "club-hero__slide";

  if (index === 0) {
    item.classList.add("club-hero__slide--active");
  }

  const picture = document.createElement("picture");

  if (slide.avif) {
    const avifSource = document.createElement("source");
    avifSource.type = "image/avif";
    avifSource.srcset = slide.avif;
    picture.append(avifSource);
  }

  if (slide.webp) {
    const webpSource = document.createElement("source");
    webpSource.type = "image/webp";
    webpSource.srcset = slide.webp;
    picture.append(webpSource);
  }

  const image = document.createElement("img");
  image.src = slide.src;
  image.alt = slide.alt;

  if (index === 0) {
    image.loading = "eager";
    image.fetchPriority = "high";
  } else {
    image.loading = "lazy";
    image.decoding = "async";
  }

  picture.append(image);
  item.append(picture);

  return item;
}

function initClubSlider() {
  const hero = document.querySelector("[data-club-slider]");

  if (!hero || !clubSlides.length) {
    return;
  }

  const slidesRoot = hero.querySelector(
    "[data-club-slides]"
  );

  const dotsRoot = hero.querySelector(
    "[data-club-dots]"
  );

  if (!slidesRoot || !dotsRoot) {
    return;
  }

  let currentIndex = 0;
  let timerId = null;

  function updateActiveSlide() {
    const slideElements = slidesRoot.querySelectorAll(
      ".club-hero__slide"
    );

    const dots = dotsRoot.querySelectorAll(
      ".club-hero__dot"
    );

    slideElements.forEach((slide, index) => {
      slide.classList.toggle(
        "club-hero__slide--active",
        index === currentIndex
      );
    });

    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;

      dot.classList.toggle(
        "club-hero__dot--active",
        isActive
      );

      dot.setAttribute("aria-current", String(isActive));
    });
  }

  function goToSlide(index) {
    currentIndex =
      (index + clubSlides.length) % clubSlides.length;

    updateActiveSlide();
  }

  function stopTimer() {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  function startTimer() {
    stopTimer();

    timerId = window.setTimeout(() => {
      goToSlide(currentIndex + 1);
      startTimer();
    }, currentIndex === 0
      ? CLUB_FIRST_SLIDE_INTERVAL
      : CLUB_SLIDE_INTERVAL);
  }

  clubSlides.forEach((slide, index) => {
    slidesRoot.append(createClubSlide(slide, index));

    const dot = document.createElement("button");
    dot.className = "club-hero__dot";
    dot.type = "button";
    dot.setAttribute(
      "aria-label",
      `Перейти к фотографии ${index + 1}`
    );
    dot.setAttribute("aria-current", String(index === 0));

    if (index === 0) {
      dot.classList.add("club-hero__dot--active");
    }

    dot.addEventListener("click", () => {
      goToSlide(index);
      startTimer();
    });

    dotsRoot.append(dot);
  });

  hero.addEventListener("mouseenter", stopTimer);
  hero.addEventListener("mouseleave", startTimer);

  hero.addEventListener("focusin", stopTimer);

  hero.addEventListener("focusout", (event) => {
    if (!hero.contains(event.relatedTarget)) {
      startTimer();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopTimer();
      return;
    }

    startTimer();
  });

  startTimer();
}

function initClubTariffs() {
  const tabs = document.querySelectorAll("[data-club-tariff-tab]");
  const cards = document.querySelectorAll("[data-club-tariff]");

  if (!tabs.length || !cards.length) {
    return;
  }

  function setActiveTariff(tariffName) {
    tabs.forEach((tab) => {
      const isActive =
        tab.dataset.clubTariffTab === tariffName;

      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    cards.forEach((card) => {
      const isActive =
        card.dataset.clubTariff === tariffName;

      card.classList.toggle("is-active", isActive);
      card.hidden = !isActive;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveTariff(tab.dataset.clubTariffTab);
    });
  });

  setActiveTariff("economy");
}

document.addEventListener("DOMContentLoaded", () => {
  initClubSlider();
  initClubTariffs();
});