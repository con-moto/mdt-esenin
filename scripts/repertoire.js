function getRepertoireRootPath(path) {
  const root = document.body.dataset.root || "";

  return `${root}${path}`;
}

function getEventPageUrl(eventKey) {
  return `${eventKey}.html`;
}

function getCardImagePaths(eventKey) {
  const basePath =
    `assets/images/repertoire/${eventKey}/for-card`;

  return {
    jpg: `${basePath}.jpg`,
    webp:
      `assets/images/optimized/repertoire/${eventKey}/for-card.webp`,
    avif:
      `assets/images/optimized/repertoire/${eventKey}/for-card.avif`
  };
}

function formatGenre(genre) {
  if (!genre) {
    return "";
  }

  const normalizedGenre = genre.trim();

  return (
    normalizedGenre.charAt(0).toUpperCase() +
    normalizedGenre.slice(1).toLowerCase()
  );
}

function createMetaItem(text) {
  const item = document.createElement("p");
  item.className = "repertoire-card__meta-item";
  item.textContent = text;

  return item;
}

function createRepertoireCard(eventKey, event) {
  const card = document.createElement("article");
  card.className = "repertoire-card";

  const eventPageUrl = getEventPageUrl(eventKey);
  const imagePaths = getCardImagePaths(eventKey);
  const eventTitle = event.title.replace(/\n/g, " ");

  const imageLink = document.createElement("a");
  imageLink.className = "repertoire-card__image-link";
  imageLink.href = eventPageUrl;
  imageLink.setAttribute(
    "aria-label",
    `Открыть страницу спектакля «${eventTitle}»`
  );

  const picture = document.createElement("picture");

  const avifSource = document.createElement("source");
  avifSource.type = "image/avif";
  avifSource.srcset = getRepertoireRootPath(
    imagePaths.avif
  );

  const webpSource = document.createElement("source");
  webpSource.type = "image/webp";
  webpSource.srcset = getRepertoireRootPath(
    imagePaths.webp
  );

  const image = document.createElement("img");
  image.className = "repertoire-card__image";
  image.src = getRepertoireRootPath(imagePaths.jpg);
  image.alt = `Спектакль «${eventTitle}»`;
  image.loading = "lazy";
  image.decoding = "async";

  image.addEventListener("error", () => {
    console.error(
      `Не удалось загрузить карточку репертуара: ${image.src}`
    );
  });

  picture.append(
    avifSource,
    webpSource,
    image
  );

  imageLink.append(picture);

  const content = document.createElement("div");
  content.className = "repertoire-card__content";

  const title = document.createElement("h2");
  title.className = "repertoire-card__title";

  const titleLink = document.createElement("a");
  titleLink.className = "repertoire-card__title-link";
  titleLink.href = eventPageUrl;
  titleLink.textContent = eventTitle;

  title.append(titleLink);

  const meta = document.createElement("div");
  meta.className = "repertoire-card__meta";

  if (event.source) {
    meta.append(createMetaItem(event.source));
  }

  if (event.genre) {
    meta.append(
      createMetaItem(
        formatGenre(event.genre)
      )
    );
  }

  const duration = [
    event.duration,
    event.durationNote
  ]
    .filter(Boolean)
    .join(" ");

  if (duration) {
    meta.append(createMetaItem(duration));
  }

  const description = document.createElement("p");
  description.className = "repertoire-card__description";
  description.textContent =
    event.repertoireDescription || "";

  content.append(
    title,
    meta,
    description
  );

  card.append(
    imageLink,
    content
  );

  return card;
}

function renderRepertoire() {
  const root = document.querySelector(
    "[data-repertoire-list]"
  );

  const events = window.EVENTS_DATA;

  if (!root || !events) {
    return;
  }

  root.innerHTML = "";

  Object.entries(events).forEach(([eventKey, event]) => {
    root.append(
      createRepertoireCard(eventKey, event)
    );
  });
}

document.addEventListener(
  "layout:ready",
  renderRepertoire
);