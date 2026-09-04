function createElement(tagName, className) {
  const element = document.createElement(tagName);


  if (className) {
    element.className = className;
  }


  return element;
}


function resolveRootPath(path) {
  const root = document.body.dataset.root || "";


  return `${root}${path}`;
}


function createActorCard(castItem) {
  const people = window.PEOPLE_DATA || {};
  const actor = people[castItem.actorId];


  if (!actor) {
    return null;
  }


  const isLink = Boolean(actor.href);


  const card = createElement(
    isLink ? "a" : "article",
    "actor-card"
  );


  if (isLink) {
    card.href = actor.href;
  } else {
    card.classList.add("actor-card--static");
  }


  const picture = document.createElement("picture");


  const actorAvif = actor.photo
    .replace(/^assets\/images\/actors\//, 'assets/images/optimized/actors/')
    .replace(/\.jpg$/i, '.avif');

  const actorWebp = actor.photo
    .replace(/^assets\/images\/actors\//, 'assets/images/optimized/actors/')
    .replace(/\.jpg$/i, '.webp');


  const sourceAvif = document.createElement("source");
  sourceAvif.type = "image/avif";
  sourceAvif.srcset = resolveRootPath(actorAvif);


  const sourceWebp = document.createElement("source");
  sourceWebp.type = "image/webp";
  sourceWebp.srcset = resolveRootPath(actorWebp);


  const img = document.createElement("img");
  img.className = "actor-card__image";
  img.src = resolveRootPath(actor.photo);
  img.alt = actor.name;
  img.loading = "lazy";
  img.decoding = "async";


  picture.append(sourceAvif, sourceWebp, img);


  const info = createElement("div", "actor-card__info");


  const role = createElement("div", "actor-card__role");
  role.textContent = `${castItem.role} —`;


  const name = createElement("div", "actor-card__name");
  name.textContent = actor.name;


  const line = createElement("span", "actor-card__line");
  line.setAttribute("aria-hidden", "true");


  info.append(role, name);
  card.append(picture, info, line);


  return card;
}


function createGroupCastCard(castItem) {
  const card = createElement(
    "article",
    "actor-card actor-card--static"
  );


  const picture = document.createElement("picture");


  const groupAvif = castItem.image
    .replace(/^assets\/images\/repertoire\/([^/]+)\//, 'assets/images/optimized/repertoire/$1/')
    .replace(/\.jpg$/i, '.avif');

  const groupWebp = castItem.image
    .replace(/^assets\/images\/repertoire\/([^/]+)\//, 'assets/images/optimized/repertoire/$1/')
    .replace(/\.jpg$/i, '.webp');


  const sourceAvif = document.createElement("source");
  sourceAvif.type = "image/avif";
  sourceAvif.srcset = resolveRootPath(groupAvif);


  const sourceWebp = document.createElement("source");
  sourceWebp.type = "image/webp";
  sourceWebp.srcset = resolveRootPath(groupWebp);


  const img = document.createElement("img");
  img.className = "actor-card__image";
  img.src = resolveRootPath(castItem.image);
  img.alt = castItem.role || "";
  img.loading = "lazy";
  img.decoding = "async";


  picture.append(sourceAvif, sourceWebp, img);


  const info = createElement("div", "actor-card__info");


  const role = createElement("div", "actor-card__role");
  role.textContent = `${castItem.role} —`;


  const name = createElement(
    "div",
    "actor-card__name actor-card__name--static"
  );


  name.textContent = castItem.names.join(" / ");


  const line = createElement("span", "actor-card__line");
  line.setAttribute("aria-hidden", "true");


  info.append(role, name);
  card.append(picture, info, line);


  return card;
}


function renderActors(cast, root) {
  root.innerHTML = "";


  cast.forEach((castItem) => {
    const card =
      castItem.type === "group"
        ? createGroupCastCard(castItem)
        : createActorCard(castItem);


    if (card) {
      root.append(card);
    }
  });
}


function getCreatorPeople(item) {
  if (Array.isArray(item.people) && item.people.length) {
    return item.people;
  }


  if (item.personId) {
    return [
      {
        personId: item.personId,
        href: item.href || ""
      }
    ];
  }


  return [];
}


function createCreatorItem(item) {
  const people = window.PEOPLE_DATA || {};
  const creatorPeople = getCreatorPeople(item);


  if (!creatorPeople.length) {
    return null;
  }


  const article = createElement("article", "creator-item");


  const role = createElement("div", "creator-item__role");
  role.textContent = `${item.role} —`;


  const peopleLine = createElement(
    "div",
    "creator-item__people"
  );


  let renderedCount = 0;


  creatorPeople.forEach((creator) => {
    const person = people[creator.personId];


    if (!person) {
      return;
    }


    const personHref =
      creator.href ||
      person.creatorHref ||
      person.href ||
      "";


    if (renderedCount > 0) {
      peopleLine.append(document.createTextNode(", "));
    }


    const personName = createElement(
      personHref ? "a" : "span",
      "creator-item__person"
    );


    personName.textContent = person.name;


    if (personHref) {
      personName.href = personHref;
    }


    peopleLine.append(personName);
    renderedCount += 1;
  });


  if (!renderedCount) {
    return null;
  }


  article.append(role, peopleLine);


  return article;
}


function renderCreators(columns, root, section) {
  root.innerHTML = "";


  const hasCreators = columns.some((column) => column.length);


  if (!hasCreators) {
    section.hidden = true;
    return;
  }


  section.hidden = false;


  columns.forEach((column) => {
    const columnElement = createElement(
      "div",
      "creators-column"
    );


    column.forEach((item) => {
      const creatorItem = createCreatorItem(item);


      if (creatorItem) {
        columnElement.append(creatorItem);
      }
    });


    root.append(columnElement);
  });
}


function createGalleryPhotos(eventKey, event) {
  if (Array.isArray(event.gallery) && event.gallery.length) {
    return event.gallery.map((photo) => ({
      ...photo,
      avif: photo.src
        .replace(/^assets\/images\/repertoire\/([^/]+)\//, 'assets/images/optimized/repertoire/$1/')
        .replace(/\.jpg$/i, '.avif'),
      webp: photo.src
        .replace(/^assets\/images\/repertoire\/([^/]+)\//, 'assets/images/optimized/repertoire/$1/')
        .replace(/\.jpg$/i, '.webp')
    }));
  }


  const galleryCount = Number(event.galleryCount) || 0;


  return Array.from({ length: galleryCount }, (_, index) => {
    const photoNumber = String(index + 1).padStart(2, "0");


    const src = `assets/images/repertoire/${eventKey}/gallery/${photoNumber}.jpg`;


    const avif = `assets/images/optimized/repertoire/${eventKey}/gallery/${photoNumber}.avif`;
    const webp = `assets/images/optimized/repertoire/${eventKey}/gallery/${photoNumber}.webp`;


    return {
      src,
      avif,
      webp,
      alt: `Сцена из спектакля «${event.title.replace(/\n/g, " ")}»`
    };
  });
}


function applyGalleryLayout(item, index, total) {
  const number = index + 1;
  const positionInCycle = index % 8;


  if (number === total && total % 2 !== 0) {
    item.classList.add("gallery-item--wide");
    return;
  }


  if (positionInCycle === 1 || positionInCycle === 6) {
    item.classList.add("gallery-item--large");
    return;
  }


  if (positionInCycle === 3) {
    item.classList.add("gallery-item--wide");
    return;
  }


  if (positionInCycle === 5) {
    item.classList.add("gallery-item--tall");
  }
}


function createGalleryItem(photo, index, total) {
  const button = createElement("button", "gallery-item");
  button.type = "button";
  button.dataset.galleryIndex = String(index);
  button.setAttribute(
    "aria-label",
    `Открыть фотографию ${index + 1}`
  );


  if (photo.layout) {
    const columnSpan = photo.layout.columnSpan || 1;
    const rowSpan = photo.layout.rowSpan || 1;


    button.style.gridColumn =
      `${photo.layout.column} / span ${columnSpan}`;


    button.style.gridRow =
      `${photo.layout.row} / span ${rowSpan}`;
  } else {
    applyGalleryLayout(button, index, total);
  }


  const picture = document.createElement("picture");


  const sourceAvif = document.createElement("source");
  sourceAvif.type = "image/avif";
  sourceAvif.srcset = resolveRootPath(photo.avif);


  const sourceWebp = document.createElement("source");
  sourceWebp.type = "image/webp";
  sourceWebp.srcset = resolveRootPath(photo.webp);


  const img = document.createElement("img");
  img.src = resolveRootPath(photo.src);
  img.alt = photo.alt || "";
  img.loading = "lazy";
  img.decoding = "async";


  img.addEventListener("error", () => {
    button.classList.add("gallery-item--missing");
    console.error(`Не удалось загрузить фото галереи: ${img.src}`);
  });


  picture.append(sourceAvif, sourceWebp, img);
  button.append(picture);


  return button;
}


function renderGallery(photos, root, section) {
  root.innerHTML = "";


  if (!photos.length) {
    section.hidden = true;
    return;
  }


  section.hidden = false;


  photos.forEach((photo, index) => {
    root.append(
      createGalleryItem(photo, index, photos.length)
    );
  });
}


function createTrailer(eventKey, event, root, section) {
  if (!event.hasTrailer) {
    section.hidden = true;
    return;
  }


  section.hidden = false;
  root.innerHTML = "";


  const wrapper = createElement("div", "event-trailer__inner");
  const player = createElement("div", "event-trailer__player");


  const video = createElement("video", "event-trailer__video");
  video.controls = true;
  video.preload = "metadata";
  video.playsInline = true;


  const source = document.createElement("source");
  source.src = resolveRootPath(
    `assets/images/repertoire/${eventKey}/trailer.mp4`
  );
  source.type = "video/mp4";


  video.append(source);


  const coverButton = createElement(
    "button",
    "event-trailer__cover"
  );


  coverButton.type = "button";
  coverButton.setAttribute(
    "aria-label",
    "Воспроизвести трейлер"
  );


  const picture = document.createElement("picture");


  const coverAvif = `assets/images/optimized/repertoire/${eventKey}/cover.avif`;
  const coverWebp = `assets/images/optimized/repertoire/${eventKey}/cover.webp`;


  const sourceAvif = document.createElement("source");
  sourceAvif.type = "image/avif";
  sourceAvif.srcset = resolveRootPath(coverAvif);


  const sourceWebp = document.createElement("source");
  sourceWebp.type = "image/webp";
  sourceWebp.srcset = resolveRootPath(coverWebp);


  const coverImage = document.createElement("img");
  coverImage.className = "event-trailer__cover-image";
  coverImage.src = resolveRootPath(`assets/images/repertoire/${eventKey}/cover.jpg`);
  coverImage.alt = `Трейлер спектакля «${event.title.replace(/\n/g, " ")}»`;
  coverImage.loading = "lazy";
  coverImage.decoding = "async";


  coverImage.addEventListener("error", () => {
    console.error(`Не удалось загрузить обложку трейлера: ${coverImage.src}`);
  });


  const playIcon = createElement(
    "span",
    "event-trailer__play-icon"
  );


  playIcon.setAttribute("aria-hidden", "true");


  picture.append(sourceAvif, sourceWebp, coverImage);


  const coverWrapper = document.createElement("div");
  coverWrapper.append(picture, playIcon);
  coverButton.append(coverWrapper);


  coverButton.addEventListener("click", () => {
    player.classList.add("event-trailer__player--playing");


    video.play().catch(() => {
      player.classList.remove("event-trailer__player--playing");
    });
  });


  video.addEventListener("play", () => {
    player.classList.add('event-trailer__player--playing');
  });


  video.addEventListener("ended", () => {
    player.classList.remove('event-trailer__player--playing');
  });


  player.append(video, coverButton);
  wrapper.append(player);
  root.append(wrapper);
}


function createGalleryLightbox() {
  const dialog = createElement(
    "dialog",
    "gallery-lightbox"
  );


  dialog.setAttribute(
    "aria-label",
    "Просмотр фотографий спектакля"
  );


  dialog.innerHTML = `
    <div class="gallery-lightbox__content">
      <button
        class="gallery-lightbox__close"
        type="button"
        aria-label="Закрыть фотографии"
      >
        ×
      </button>


      <button
        class="gallery-lightbox__previous"
        type="button"
        aria-label="Предыдущая фотография"
      >
        <span aria-hidden="true">‹</span>
      </button>


      <figure class="gallery-lightbox__figure">
        <img
          class="gallery-lightbox__image"
          src=""
          alt=""
        >


        <figcaption
          class="gallery-lightbox__counter"
          aria-live="polite"
        ></figcaption>
      </figure>


      <button
        class="gallery-lightbox__next"
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


function initGalleryLightbox(photos, galleryRoot) {
  if (!photos.length || !galleryRoot) {
    return;
  }


  const dialog = createGalleryLightbox();


  const image = dialog.querySelector(
    ".gallery-lightbox__image"
  );


  const counter = dialog.querySelector(
    ".gallery-lightbox__counter"
  );


  const closeButton = dialog.querySelector(
    ".gallery-lightbox__close"
  );


  const previousButton = dialog.querySelector(
    ".gallery-lightbox__previous"
  );


  const nextButton = dialog.querySelector(
    ".gallery-lightbox__next"
  );


  let currentIndex = 0;


  function updateLightbox() {
    const photo = photos[currentIndex];


    image.src = resolveRootPath(photo.src);
    image.alt = photo.alt || "";
    counter.textContent = `${currentIndex + 1} / ${photos.length}`;


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


  function showPreviousPhoto() {
    currentIndex =
      (currentIndex - 1 + photos.length) % photos.length;


    updateLightbox();
  }


  function showNextPhoto() {
    currentIndex = (currentIndex + 1) % photos.length;


    updateLightbox();
  }


  galleryRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-index]");


    if (!button) {
      return;
    }


    openLightbox(Number(button.dataset.galleryIndex));
  });


  closeButton.addEventListener("click", () => {
    dialog.close();
  });


  previousButton.addEventListener("click", showPreviousPhoto);
  nextButton.addEventListener("click", showNextPhoto);


  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });


  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      showPreviousPhoto();
    }


    if (event.key === "ArrowRight") {
      showNextPhoto();
    }
  });
}


function renderEventTicketButton(event) {
  const section = document.querySelector(
    "[data-event-ticket-section]"
  );


  const button = document.querySelector(
    "[data-event-ticket-button]"
  );


  if (!section || !button) {
    return;
  }


  if (!event.ticketUrl || event.ticketUrl === "#") {
    section.hidden = true;
    return;
  }


  section.hidden = false;
  button.href = event.ticketUrl;
}


function initEventSections() {
  const eventKey = document.body.dataset.event;
  const event = window.EVENTS_DATA?.[eventKey];


  if (!event) {
    return;
  }


  const castRoot = document.querySelector("[data-cast-grid]");
  const creatorsRoot = document.querySelector(
    "[data-creators-grid]"
  );


  const trailerRoot = document.querySelector(
    "[data-event-trailer]"
  );


  const galleryRoot = document.querySelector(
    "[data-gallery-grid]"
  );


  const creatorsSection = document.querySelector(
    "[data-creators-section]"
  );


  const trailerSection = document.querySelector(
    "[data-trailer-section]"
  );


  const gallerySection = document.querySelector(
    "[data-gallery-section]"
  );


  if (castRoot && event.cast?.length) {
    renderActors(event.cast, castRoot);
  }


  if (creatorsRoot && creatorsSection) {
    renderCreators(
      event.creatorsColumns || [],
      creatorsRoot,
      creatorsSection
    );
  }


  if (trailerRoot && trailerSection) {
    createTrailer(
      eventKey,
      event,
      trailerRoot,
      trailerSection
    );
  }


  if (galleryRoot && gallerySection) {
    const galleryPhotos = createGalleryPhotos(eventKey, event);


    renderGallery(
      galleryPhotos,
      galleryRoot,
      gallerySection
    );


    initGalleryLightbox(galleryPhotos, galleryRoot);
  }


  renderEventTicketButton(event);
}


document.addEventListener("layout:ready", initEventSections);