function getRootPath(path) {
  const root = document.body.dataset.root || "";

  return `${root}${path}`;
}

function getCardHref(person, page) {
  if (
    page === "people-management" &&
    person.managementHref
  ) {
    return person.managementHref;
  }

  return person.href || "";
}

function getPersonPhoto(person, page) {
  if (
    page === "people-management" &&
    person.managementPhoto
  ) {
    return person.managementPhoto;
  }

  return person.photo || "assets/images/actors/placeholder.jpg";
}

function hasGroup(person, groupName) {
  return Array.isArray(person.groups) &&
    person.groups.includes(groupName);
}

function getFirstLetter(person) {
  if (!person.lastName) {
    return "";
  }

  return person.lastName
    .trim()
    .charAt(0)
    .toUpperCase();
}

function sortPeopleByLastName(people) {
  return [...people].sort((firstPerson, secondPerson) => {
    const firstFullName =
      `${firstPerson.lastName || ""} ${firstPerson.firstName || ""}`;

    const secondFullName =
      `${secondPerson.lastName || ""} ${secondPerson.firstName || ""}`;

    return firstFullName.localeCompare(
      secondFullName,
      "ru"
    );
  });
}

function getAvailableLetters(people) {
  const letters = people
    .map((person) => getFirstLetter(person))
    .filter(Boolean);

  return [...new Set(letters)].sort((firstLetter, secondLetter) =>
    firstLetter.localeCompare(secondLetter, "ru")
  );
}

function createPersonCard(person, variant, page) {
  const href = getCardHref(person, page);
  const photo = getPersonPhoto(person, page);

  const card = document.createElement("article");
  card.className = `people-card people-card--${variant}`;

  const imageWrapper = href
    ? document.createElement("a")
    : document.createElement("div");

  imageWrapper.className = "people-card__image-link";

  if (href) {
    imageWrapper.href = href;
    imageWrapper.setAttribute(
      "aria-label",
      `Открыть страницу: ${person.name}`
    );
  }

  const image = document.createElement("img");
  image.className = "people-card__image";
  image.src = getRootPath(photo);
  image.alt = person.name || "";
  image.loading = "lazy";
  image.decoding = "async";

  imageWrapper.append(image);

  const content = document.createElement("div");
  content.className = "people-card__content";

  const name = document.createElement("h2");
  name.className = "people-card__name";

  if (href) {
    const nameLink = document.createElement("a");
    nameLink.className = "people-card__name-link";
    nameLink.href = href;
    nameLink.textContent = person.name;

    name.append(nameLink);
  } else {
    name.textContent = person.name;
  }

  content.append(name);

  if (variant !== "troupe" && person.jobTitle) {
    const job = document.createElement("p");
    job.className = "people-card__job";
    job.textContent = person.jobTitle;

    content.append(job);
  }

  card.append(imageWrapper, content);

  return card;
}

function createPeopleGrid(people, variant, page) {
  const grid = document.createElement("div");
  grid.className = `people-grid people-grid--${variant}`;

  people.forEach((person) => {
    grid.append(
      createPersonCard(person, variant, page)
    );
  });

  return grid;
}

function createPeopleHeader(title, modifier = "") {
  const section = document.createElement("section");

  section.className = modifier
    ? `people-header ${modifier}`
    : "people-header";

  const titleElement = document.createElement("h2");
  titleElement.className = "people-header__title";
  titleElement.textContent = title;

  section.append(titleElement);

  return section;
}

function renderAlphabet(people, container, activeLetter) {
  const russianAlphabet = [
    "А",
    "Б",
    "В",
    "Г",
    "Д",
    "Е",
    "Ё",
    "Ж",
    "З",
    "И",
    "Й",
    "К",
    "Л",
    "М",
    "Н",
    "О",
    "П",
    "Р",
    "С",
    "Т",
    "У",
    "Ф",
    "Х",
    "Ц",
    "Ч",
    "Ш",
    "Щ",
    "Ъ",
    "Ы",
    "Ь",
    "Э",
    "Ю",
    "Я"
  ];

  const availableLetters = new Set(
    getAvailableLetters(people)
  );

  container.innerHTML = "";

  const list = document.createElement("ul");
  list.className = "people-alphabet__list";

  const allItem = document.createElement("li");
  allItem.className = "people-alphabet__item";

  const allLink = document.createElement("a");
  allLink.className =
    "people-alphabet__link people-alphabet__link--all";

  allLink.href = "?";
  allLink.textContent = "ВСЕ";

  if (!activeLetter) {
    allLink.classList.add("people-alphabet__link--active");
  }

  allItem.append(allLink);
  list.append(allItem);

  russianAlphabet.forEach((letter) => {
    const item = document.createElement("li");
    item.className = "people-alphabet__item";

    if (availableLetters.has(letter)) {
      const link = document.createElement("a");
      link.className = "people-alphabet__link";
      link.href = `?letter=${encodeURIComponent(letter)}`;
      link.textContent = letter;

      if (letter === activeLetter) {
        link.classList.add("people-alphabet__link--active");
      }

      item.append(link);
    } else {
      const letterElement = document.createElement("span");
      letterElement.className = "people-alphabet__letter";
      letterElement.textContent = letter;

      item.append(letterElement);
    }

    list.append(item);
  });

  container.append(list);
}

function renderGuestSection(guestPeople, guestsContainer) {
  if (!guestsContainer) {
    return;
  }

  guestsContainer.innerHTML = "";

  if (!guestPeople.length) {
    return;
  }

  const header = createPeopleHeader(
    "ПРИГЛАШЁННЫЕ АРТИСТЫ",
    "people-header--guests"
  );

  const list = document.createElement("section");
  list.className = "people-list people-list--guests";

  const grid = createPeopleGrid(
    guestPeople,
    "troupe",
    "people-troupe"
  );

  list.append(grid);

  guestsContainer.append(header, list);
}

function renderTroupePage(
  allPeople,
  listContainer,
  alphabetContainer,
  guestsContainer
) {
  const params = new URLSearchParams(window.location.search);
  const selectedLetter = params.get("letter") || "";

  const troupePeople = sortPeopleByLastName(
    allPeople.filter((person) =>
      hasGroup(person, "troupe")
    )
  );

  const guestPeople = sortPeopleByLastName(
    allPeople.filter((person) =>
      hasGroup(person, "guest")
    )
  );

  renderAlphabet(
    troupePeople,
    alphabetContainer,
    selectedLetter
  );

  const visibleTroupePeople = selectedLetter
    ? troupePeople.filter(
        (person) =>
          getFirstLetter(person) === selectedLetter
      )
    : troupePeople;

  listContainer.innerHTML = "";

  if (visibleTroupePeople.length) {
    listContainer.append(
      createPeopleGrid(
        visibleTroupePeople,
        "troupe",
        "people-troupe"
      )
    );
  }

  if (!selectedLetter) {
    renderGuestSection(
      guestPeople,
      guestsContainer
    );
  } else if (guestsContainer) {
    guestsContainer.innerHTML = "";
  }
}

function renderManagementPage(allPeople, listContainer) {
  const managementOrder = [
    "yaroslav-shevaldov",
    "anna-sardanovskaya"
  ];

  const managementPeople = managementOrder
    .map((personId) =>
      allPeople.find((person) => person.id === personId)
    )
    .filter(Boolean);

  listContainer.innerHTML = "";

  listContainer.append(
    createPeopleGrid(
      managementPeople,
      "management",
      "people-management"
    )
  );
}

function renderProductionPage(allPeople, listContainer) {
  const productionPeople = sortPeopleByLastName(
    allPeople.filter((person) =>
      hasGroup(person, "production")
    )
  );

  listContainer.innerHTML = "";

  listContainer.append(
    createPeopleGrid(
      productionPeople,
      "production",
      "people-production"
    )
  );
}

function initPeoplePage() {
  const page = document.body.dataset.page;

  const allPeople = window.PEOPLE_DATA
    ? Object.values(window.PEOPLE_DATA)
    : [];

  const listContainer = document.querySelector(
    "[data-people-list]"
  );

  const alphabetContainer = document.querySelector(
    "[data-people-alphabet]"
  );

  const guestsContainer = document.querySelector(
    "[data-people-guests]"
  );

  if (!listContainer || !allPeople.length) {
    return;
  }

  if (
    page === "people-troupe" &&
    alphabetContainer
  ) {
    renderTroupePage(
      allPeople,
      listContainer,
      alphabetContainer,
      guestsContainer
    );

    return;
  }

  if (page === "people-management") {
    renderManagementPage(
      allPeople,
      listContainer
    );

    return;
  }

  if (page === "people-production") {
    renderProductionPage(
      allPeople,
      listContainer
    );
  }
}

document.addEventListener(
  "DOMContentLoaded",
  initPeoplePage
);