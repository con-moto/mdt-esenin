function personCreateElement(tagName, className) {
  const element = document.createElement(tagName);


  if (className) {
    element.className = className;
  }


  return element;
}


function personResolveRootPath(path) {
  const root = document.body.dataset.root || "";


  return `${root}${path}`;
}


function personGetOptimizedPath(path, extension) {
  return path
    .replace(
      /^assets\/images\/actors\//,
      "assets/images/optimized/actors/"
    )
    .replace(
      /^assets\/images\/repertoire\//,
      "assets/images/optimized/repertoire/"
    )
    .replace(/\.(jpg|jpeg|png)$/i, extension);
}


function personGetEventPageUrl(eventKey) {
  const pageUrls = {
    "queens-gambit": "repertoire/queens-gambit.html",
    "idiot": "repertoire/idiot.html",
    "lev-tolstoy": "repertoire/lev-tolstoy.html",
    "esenin": "repertoire/esenin.html",
    "reading-room": "repertoire/reading-room.html",
    "12-chairs": "repertoire/twelve-chairs.html",
    "sherlock-holmes": "repertoire/sherlock-holmes.html",
    "raskolnikov": "repertoire/raskolnikov.html",
    "hero-of-our-time": "repertoire/hero-of-our-time.html",
    "evenings-dikanka": "repertoire/evenings-dikanka.html",
    "karamazovs": "repertoire/karamazovy.html",
    "little-prince": "repertoire/little-prince.html",
    "don-quixote": "repertoire/don-quixote.html",
    "hamlet-illusions": "repertoire/hamlet-illusions.html",
    "pushkin-tragedies": "repertoire/pushkin-tragedies.html"
  };


  return pageUrls[eventKey] || "";
}


function personGetEventImagePath(eventKey) {
  return `assets/images/repertoire/${eventKey}/for-card.jpg`;
}


function personGetFullEventTitle(event) {
  return (event?.title || "").replace(/\n/g, " ");
}


function personFormatName(name) {
  return (name || "")
    .toLocaleLowerCase("ru-RU")
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      return (
        word.charAt(0).toLocaleUpperCase("ru-RU") +
        word.slice(1)
      );
    })
    .join(" ");
}


function personCreatePicture({
  source,
  alt,
  className = "",
  loading = "lazy"
}) {
  const picture = document.createElement("picture");


  const avif = personGetOptimizedPath(source, ".avif");
  const webp = personGetOptimizedPath(source, ".webp");


  const sourceAvif = document.createElement("source");
  sourceAvif.type = "image/avif";
  sourceAvif.srcset = personResolveRootPath(avif);


  const sourceWebp = document.createElement("source");
  sourceWebp.type = "image/webp";
  sourceWebp.srcset = personResolveRootPath(webp);


  const image = document.createElement("img");
  image.className = className;
  image.src = personResolveRootPath(source);
  image.alt = alt || "";
  image.loading = loading;
  image.decoding = "async";


  if (loading === "eager") {
    image.fetchPriority = "high";
  }


  picture.append(sourceAvif, sourceWebp, image);


  return picture;
}


function personSetText(selector, value) {
  const element = document.querySelector(selector);


  if (element) {
    element.textContent = value || "";
  }
}


function personRenderDescription(description, root) {
  if (!root) {
    return;
  }


  root.innerHTML = "";


  if (!Array.isArray(description) || !description.length) {
    root.hidden = true;
    return;
  }


  root.hidden = false;


  description.forEach((paragraphText) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = paragraphText;
    root.append(paragraph);
  });
}


function personCreateFact(iconPath, label, value) {
  const fact = personCreateElement(
    "div",
    "person-profile__fact"
  );


  const factLabel = personCreateElement(
    "div",
    "person-profile__fact-label"
  );


  const icon = document.createElement("img");
  icon.className = "person-profile__fact-icon";
  icon.src = personResolveRootPath(iconPath);
  icon.alt = "";
  icon.setAttribute("aria-hidden", "true");


  const labelElement = document.createElement("span");
  labelElement.textContent = `${label}:`;


  const valueElement = personCreateElement(
    "div",
    "person-profile__fact-value"
  );
  valueElement.textContent = value;


  factLabel.append(icon, labelElement);
  fact.append(factLabel, valueElement);


  return fact;
}


function personRenderFacts(data, type, root) {
  if (!root) {
    return;
  }


  root.innerHTML = "";


  if (type === "production" && data.jobTitle) {
    root.append(
      personCreateFact(
        "assets/icons/source.avif",
        "ДОЛЖНОСТЬ",
        data.jobTitle
      )
    );
  }


  if (data.education) {
    root.append(
      personCreateFact(
        "assets/icons/education.png",
        "ОБРАЗОВАНИЕ",
        data.education
      )
    );
  }


  if (data.birthday) {
    root.append(
      personCreateFact(
        "assets/icons/date.jpg",
        "ДАТА РОЖДЕНИЯ",
        data.birthday
      )
    );
  }


  root.hidden = !root.children.length;
}


function personCreateSliderSlide(person, index) {
  const number = String(index + 1).padStart(2, "0");
  const source = `assets/images/actors/${person.slug}/${number}.jpg`;


  const slide = personCreateElement(
    "li",
    "person-hero__slide"
  );


  if (index === 0) {
    slide.classList.add("person-hero__slide--active");
  }


  // Для Мартынова — object-position: top в слайдере
  const isMartynov = person.slug === "alexsandr-martynov";


  const picture = personCreatePicture({
    source,
    alt: personFormatName(person.name),
    className: "person-hero__image",
    loading: index === 0 ? "eager" : "lazy"
  });


  const image = picture.querySelector("img");


  if (isMartynov) {
    image.style.objectPosition = "50% 20%";
  }


  slide.append(picture);


  return slide;
}


function personRenderSlider(person, data, root) {
  if (!root) {
    return;
  }


  const sliderCount = Number(data.sliderCount) || 0;


  if (!sliderCount) {
    root.hidden = true;
    return;
  }


  root.hidden = false;


  root.innerHTML = `
    <ul class="person-hero__list"></ul>


    <button
      class="person-hero__arrow person-hero__arrow--prev"
      type="button"
      aria-label="Предыдущая фотография"
    >
      &lt;
    </button>


    <button
      class="person-hero__arrow person-hero__arrow--next"
      type="button"
      aria-label="Следующая фотография"
    >
      &gt;
    </button>


    <div
      class="person-hero__pagination"
      aria-label="Пагинация фотографий"
    ></div>
  `;


  const list = root.querySelector(".person-hero__list");
  const pagination = root.querySelector(
    ".person-hero__pagination"
  );
  const previousButton = root.querySelector(
    ".person-hero__arrow--prev"
  );
  const nextButton = root.querySelector(
    ".person-hero__arrow--next"
  );


  let currentIndex = 0;
  let timerId = null;


  function updateSlider() {
    const slides = root.querySelectorAll(".person-hero__slide");
    const dots = root.querySelectorAll(".person-hero__dot");


    slides.forEach((slide, index) => {
      slide.classList.toggle(
        "person-hero__slide--active",
        index === currentIndex
      );
    });


    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;


      dot.classList.toggle(
        "person-hero__dot--active",
        isActive
      );


      dot.setAttribute("aria-current", String(isActive));
    });
  }


  function goToSlide(index) {
    currentIndex = (index + sliderCount) % sliderCount;
    updateSlider();
  }


  function stopTimer() {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  }


  function startTimer() {
    stopTimer();


    if (sliderCount <= 1) {
      return;
    }


    timerId = window.setTimeout(() => {
      goToSlide(currentIndex + 1);
      startTimer();
    }, currentIndex === 0 ? 3500 : 2500);
  }


  for (let index = 0; index < sliderCount; index += 1) {
    list.append(personCreateSliderSlide(person, index));


    const dot = personCreateElement(
      "button",
      "person-hero__dot"
    );


    dot.type = "button";
    dot.setAttribute(
      "aria-label",
      `Перейти к фотографии ${index + 1}`
    );
    dot.setAttribute("aria-current", String(index === 0));


    if (index === 0) {
      dot.classList.add("person-hero__dot--active");
    }


    dot.addEventListener("click", () => {
      goToSlide(index);
      startTimer();
    });


    pagination.append(dot);
  }


  if (sliderCount <= 1) {
    previousButton.hidden = true;
    nextButton.hidden = true;
    pagination.hidden = true;
    return;
  }


  previousButton.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
    startTimer();
  });


  nextButton.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
    startTimer();
  });


  root.addEventListener("mouseenter", stopTimer);
  root.addEventListener("mouseleave", startTimer);


  root.addEventListener("focusin", stopTimer);


  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget)) {
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


function personCreatePerformanceCard(performance, events) {
  const event = events[performance.eventKey];


  if (!event) {
    return null;
  }


  const eventUrl = personGetEventPageUrl(performance.eventKey);


  const card = personCreateElement(
    eventUrl ? "a" : "article",
    "person-performance-card"
  );


  if (eventUrl) {
    card.href = personResolveRootPath(eventUrl);
  }


  const imageWrap = personCreateElement(
    "div",
    "person-performance-card__image-wrap"
  );


  imageWrap.append(
    personCreatePicture({
      source: personGetEventImagePath(performance.eventKey),
      alt: personGetFullEventTitle(event),
      className: "person-performance-card__image"
    })
  );


  const content = personCreateElement(
    "div",
    "person-performance-card__content"
  );


  const role = personCreateElement(
    "p",
    "person-performance-card__role"
  );
  role.textContent = performance.role;


  const title = personCreateElement(
    "h3",
    "person-performance-card__title"
  );
  title.textContent = personGetFullEventTitle(event);


  content.append(role, title);
  card.append(imageWrap, content);


  return card;
}


function personRenderPerformances(data, root) {
  if (!root) {
    return;
  }


  const performances = Array.isArray(data.performances)
    ? data.performances
    : [];


  const events = window.EVENTS_DATA || {};


  root.innerHTML = "";


  if (!performances.length) {
    root.hidden = true;
    return;
  }


  const titleBar = personCreateElement(
    "div",
    "section-title-bar"
  );
  titleBar.textContent = "СПЕКТАКЛИ";


  const grid = personCreateElement(
    "div",
    "person-performances__grid"
  );


  performances.forEach((performance) => {
    const card = personCreatePerformanceCard(
      performance,
      events
    );


    if (card) {
      grid.append(card);
    }
  });


  if (!grid.children.length) {
    root.hidden = true;
    return;
  }


  root.hidden = false;
  root.append(titleBar, grid);
}


function personCreateGalleryPhoto(person, index) {
  const number = index + 1;


  return {
    source:
      `assets/images/actors/${person.slug}/gallery (${number}).jpg`,
    alt:
      `Фотография ${number}: ${personFormatName(person.name)}`
  };
}


function personApplyGalleryLayout(item, index) {
  const cycle = Math.floor(index / 5);
  const positionInCycle = index % 5;
  const firstRow = cycle * 2 + 1;
  const secondRow = firstRow + 1;


  if (positionInCycle === 0) {
    item.style.gridColumn = "1";
    item.style.gridRow = String(firstRow);
    return;
  }


  if (positionInCycle === 1) {
    item.style.gridColumn = "1";
    item.style.gridRow = String(secondRow);
    return;
  }


  if (positionInCycle === 2) {
    item.classList.add("person-gallery-item--feature");
    item.style.gridColumn = "2";
    item.style.gridRow = `${firstRow} / span 2`;
    return;
  }


  if (positionInCycle === 3) {
    item.style.gridColumn = "3";
    item.style.gridRow = String(firstRow);
    return;
  }


  item.style.gridColumn = "3";
  item.style.gridRow = String(secondRow);
}


function personCreateGalleryItem(photo, index) {
  const button = personCreateElement(
    "button",
    "person-gallery-item"
  );


  button.type = "button";
  button.dataset.personGalleryIndex = String(index);


  button.setAttribute(
    "aria-label",
    `Открыть фотографию ${index + 1}`
  );


  personApplyGalleryLayout(button, index);


  const picture = personCreatePicture({
    source: photo.source,
    alt: photo.alt,
    className: "person-gallery-item__image"
  });


  const image = picture.querySelector("img");


  image.addEventListener("error", () => {
    button.classList.add("person-gallery-item--missing");
  });


  button.append(picture);


  return button;
}


function personCreateLightbox() {
  const dialog = personCreateElement(
    "dialog",
    "person-gallery-lightbox"
  );


  dialog.setAttribute(
    "aria-label",
    "Просмотр фотографий"
  );


  dialog.innerHTML = `
    <div class="person-gallery-lightbox__content">
      <button
        class="person-gallery-lightbox__close"
        type="button"
        aria-label="Закрыть фотографии"
      >
        ×
      </button>


      <button
        class="person-gallery-lightbox__previous"
        type="button"
        aria-label="Предыдущая фотография"
      >
        <span aria-hidden="true">‹</span>
      </button>


      <figure class="person-gallery-lightbox__figure">
        <img
          class="person-gallery-lightbox__image"
          src=""
          alt=""
        >


        <figcaption
          class="person-gallery-lightbox__counter"
          aria-live="polite"
        ></figcaption>
      </figure>


      <button
        class="person-gallery-lightbox__next"
        type="button"
        aria-label="Следующая фотография"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  `;


  document.body.append(dialog);


  return dialog;
}


function personInitGalleryLightbox(photos, root) {
  if (!photos.length || !root) {
    return;
  }


  const dialog = personCreateLightbox();


  const image = dialog.querySelector(
    ".person-gallery-lightbox__image"
  );


  const counter = dialog.querySelector(
    ".person-gallery-lightbox__counter"
  );


  const closeButton = dialog.querySelector(
    ".person-gallery-lightbox__close"
  );


  const previousButton = dialog.querySelector(
    ".person-gallery-lightbox__previous"
  );


  const nextButton = dialog.querySelector(
    ".person-gallery-lightbox__next"
  );


  let currentIndex = 0;


  function updateLightbox() {
    const photo = photos[currentIndex];


    image.src = personResolveRootPath(photo.source);
    image.alt = photo.alt;


    counter.textContent =
      `${currentIndex + 1} / ${photos.length}`;


    const isOnePhoto = photos.length === 1;


    previousButton.hidden = isOnePhoto;
    nextButton.hidden = isOnePhoto;
  }


  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();


    if (!dialog.open) {
      dialog.showModal();
    }
  }


  function showPrevious() {
    currentIndex =
      (currentIndex - 1 + photos.length) % photos.length;


    updateLightbox();
  }


  function showNext() {
    currentIndex = (currentIndex + 1) % photos.length;
    updateLightbox();
  }


  root.addEventListener("click", (event) => {
    const item = event.target.closest(
      "[data-person-gallery-index]"
    );


    if (!item) {
      return;
    }


    openLightbox(
      Number(item.dataset.personGalleryIndex)
    );
  });


  closeButton.addEventListener("click", () => {
    dialog.close();
  });


  previousButton.addEventListener("click", showPrevious);
  nextButton.addEventListener("click", showNext);


  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });


  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      showPrevious();
    }


    if (event.key === "ArrowRight") {
      showNext();
    }
  });
}


function personRenderGallery(person, data, root) {
  if (!root) {
    return;
  }


  const galleryCount = Number(data.galleryCount) || 0;


  root.innerHTML = "";


  if (!galleryCount) {
    root.hidden = true;
    return;
  }


  const titleBar = personCreateElement(
    "div",
    "section-title-bar section-title-bar--photos"
  );


  titleBar.textContent = "ФОТОГРАФИИ";


  const grid = personCreateElement(
    "div",
    "person-gallery-grid"
  );


  const photos = Array.from(
    { length: galleryCount },
    (_, index) => personCreateGalleryPhoto(person, index)
  );


  photos.forEach((photo, index) => {
    grid.append(personCreateGalleryItem(photo, index));
  });


  root.hidden = false;
  root.append(titleBar, grid);


  personInitGalleryLightbox(photos, grid);
}


function personRenderBackLink(type, root) {
  if (!root) {
    return;
  }


  const isProduction = type === "production";


  const backUrl = isProduction
    ? "people/production-team/index.html"
    : "people/troupe/index.html";


  const label = isProduction
    ? "ПОСТАНОВОЧНАЯ ЧАСТЬ"
    : "ТРУППА";


  const ariaLabel = isProduction
    ? "Вернуться на страницу постановочной части"
    : "Вернуться на страницу труппы";


  root.innerHTML = `
    <a
      class="person-profile__back-icon"
      href="${personResolveRootPath(backUrl)}"
      aria-label="${ariaLabel}"
    >
      <img
        src="${personResolveRootPath("assets/icons/arrow-back.png")}"
        alt=""
        aria-hidden="true"
      >
    </a>


    <a
      class="person-profile__back-button"
      href="${personResolveRootPath(backUrl)}"
    >
      ${label}
    </a>
  `;
}


function initPersonProfile() {
  const personId = document.body.dataset.person;
  const type = document.body.dataset.personType || "troupe";


  const person = window.PEOPLE_DATA?.[personId];
  const personData = window.PERSON_PAGES_DATA?.[personId];
  const data = personData?.[type];


  if (!personId || !person || !data) {
    console.error(
      "Не найдены данные для персональной страницы:",
      personId,
      type
    );
    return;
  }


  const normalName = personFormatName(person.name);


  personSetText("[data-person-name]", person.name);
  personSetText("[data-person-breadcrumb]", normalName);


  document.title =
    `${normalName} — МДТ имени Сергея Есенина`;


  const sliderRoot = document.querySelector(
    "[data-person-slider]"
  );


  const portraitRoot = document.querySelector(
    "[data-person-portrait]"
  );


  const performancesRoot = document.querySelector(
    "[data-person-performances]"
  );


  const galleryRoot = document.querySelector(
    "[data-person-gallery]"
  );


  if (portraitRoot) {
    portraitRoot.innerHTML = "";


    portraitRoot.append(
      personCreatePicture({
        source: person.photo,
        alt: normalName,
        className: "person-profile__portrait-image",
        loading: "eager"
      })
    );
  }


  if (type === "troupe") {
    personRenderSlider(person, data, sliderRoot);


    personRenderPerformances(data, performancesRoot);


    personRenderGallery(person, data, galleryRoot);
  } else {
    if (sliderRoot) {
      sliderRoot.hidden = true;
    }


    if (performancesRoot) {
      performancesRoot.hidden = true;
    }


    if (galleryRoot) {
      galleryRoot.hidden = true;
    }
  }


  personRenderFacts(
    data,
    type,
    document.querySelector("[data-person-facts]")
  );


  personRenderDescription(
    data.description,
    document.querySelector("[data-person-description]")
  );


  personRenderBackLink(
    type,
    document.querySelector("[data-person-back]")
  );
}


document.addEventListener(
  "DOMContentLoaded",
  initPersonProfile
);