function getAboutRootPath(path) {
  const root = document.body.dataset.root || "";

  return `${root}${path}`;
}

function getDiplomaImagePaths(index) {
  const fileName = String(index).padStart(2, "0");

  return {
    jpg: `assets/images/diploma/${fileName}.jpg`,
    webp: `assets/images/optimized/diploma/${fileName}.webp`,
    avif: `assets/images/optimized/diploma/${fileName}.avif`
  };
}

function createDiplomaCard(index) {
  const imagePaths = getDiplomaImagePaths(index);

  const item = document.createElement("article");
  item.className = "about-diplomas__item";

  const picture = document.createElement("picture");

  const avifSource = document.createElement("source");
  avifSource.type = "image/avif";
  avifSource.srcset = getAboutRootPath(
    imagePaths.avif
  );

  const webpSource = document.createElement("source");
  webpSource.type = "image/webp";
  webpSource.srcset = getAboutRootPath(
    imagePaths.webp
  );

  const image = document.createElement("img");
  image.className = "about-diplomas__image";
  image.src = getAboutRootPath(imagePaths.jpg);
  image.alt = `Диплом театра № ${index}`;
  image.loading = "lazy";
  image.decoding = "async";

  image.addEventListener("error", () => {
    console.error(
      `Не удалось загрузить диплом: ${image.src}`
    );
  });

  picture.append(
    avifSource,
    webpSource,
    image
  );

  item.append(picture);

  return item;
}

function renderDiplomas() {
  const diplomasRoot = document.querySelector(
    "[data-diplomas-list]"
  );

  const diplomaCount = 28;

  if (!diplomasRoot) {
    return;
  }

  diplomasRoot.innerHTML = "";

  for (let index = 1; index <= diplomaCount; index += 1) {
    diplomasRoot.append(
      createDiplomaCard(index)
    );
  }
}

function updateAboutBackgroundFade() {
  const backgroundSection = document.querySelector(
    ".about-theatre__background"
  );

  if (!backgroundSection) {
    return;
  }

  const rect = backgroundSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const fadeStart = viewportHeight * 0.72;
  const fadeEnd = -rect.height * 0.25;

  const progress = Math.min(
    1,
    Math.max(
      0,
      (fadeStart - rect.top) / (fadeStart - fadeEnd)
    )
  );

  backgroundSection.style.setProperty(
    "--about-background-fade",
    progress.toFixed(3)
  );
}

function initAboutBackgroundFade() {
  const backgroundSection = document.querySelector(
    ".about-theatre__background"
  );

  if (!backgroundSection) {
    return;
  }

  let frameId = null;

  function requestUpdate() {
    if (frameId !== null) {
      return;
    }

    frameId = window.requestAnimationFrame(() => {
      updateAboutBackgroundFade();
      frameId = null;
    });
  }

  updateAboutBackgroundFade();

  window.addEventListener(
    "scroll",
    requestUpdate,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    requestUpdate
  );
}

function initAboutPage() {
  renderDiplomas();
  initAboutBackgroundFade();
}

document.addEventListener(
  "layout:ready",
  initAboutPage
);