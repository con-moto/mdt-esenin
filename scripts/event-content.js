function formatPosterDate(dateString) {
  const [, month, day] = dateString.split("-");

  return `${day}.${month}`;
}

function formatPosterWeekday(dateString) {
  const date = new Date(`${dateString}T12:00:00`);

  return new Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
  })
    .format(date)
    .replace(".", "");
}

function resolveRootPath(path) {
  const root = document.body.dataset.root || "";

  if (!path) {
    return "";
  }

  if (/^(https?:)?\/\//.test(path)) {
    return path;
  }

  return `${root}${path.replace(/^\//, "")}`;
}

function isUpcomingShow(show) {
  if (!show.date) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const showDate = new Date(`${show.date}T00:00:00`);

  return showDate >= today;
}

function initEventContent() {
  const content = document.querySelector("[data-event-content]");
  const eventKey = document.body.dataset.event;
  const event = window.EVENTS_DATA?.[eventKey];

  if (!content || !event) {
    return;
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);

    if (element) {
      element.textContent = value || "";
    }
  }

  setText(
    "[data-event-breadcrumb-title]",
    event.breadcrumbTitle || event.title
  );

  setText("[data-event-duration]", event.duration);
  setText("[data-event-duration-note]", event.durationNote);
  setText("[data-event-age]", event.age);
  setText("[data-event-source]", event.source);

  const description = content.querySelector(
    "[data-event-description]"
  );

  if (description) {
    description.innerHTML = event.description || "";
  }

  const poster = content.querySelector("[data-event-poster]");

  if (!poster) {
    return;
  }

  const allPerformances = window.performances || [];

  const shows = allPerformances
    .filter((performance) => {
      return (
        performance.type === "performance" &&
        performance.eventKey === eventKey &&
        isUpcomingShow(performance)
      );
    })
    .sort((firstShow, secondShow) => {
      const dateCompare = firstShow.date.localeCompare(
        secondShow.date
      );

      if (dateCompare !== 0) {
        return dateCompare;
      }

      return (firstShow.time || "").localeCompare(
        secondShow.time || ""
      );
    })
    .slice(0, 3);

  if (!shows.length) {
    poster.innerHTML = `
      <h2 class="event-page__poster-title">
        Ближайшие спектакли:
      </h2>

      <p class="event-page__poster-empty">
        Ближайшие показы скоро появятся.
      </p>

      <a
        class="event-page__poster-button"
        href="${resolveRootPath("afisha.html")}"
      >
        Посмотреть афишу
      </a>
    `;

    return;
  }

const hasPremiere = shows.some((show) => show.isPremiere);

const ticketUrl =
    shows.length === 1 && shows[0].ticketUrl
      ? shows[0].ticketUrl
      : resolveRootPath("afisha.html");

  poster.innerHTML = `
    <h2 class="event-page__poster-title">
      Ближайшие спектакли:
    </h2>

    ${
      hasPremiere
        ? `
          <p class="event-page__poster-premiere">
            Премьера!
          </p>
        `
        : ""
    }

    <div class="event-page__poster-shows">
      ${shows
        .map((show) => {
          return `
            <div class="event-page__poster-show">
              <time
                class="event-page__poster-date"
                datetime="${show.date}"
              >
                ${formatPosterDate(show.date)}
              </time>

              <span class="event-page__poster-day">
                ${formatPosterWeekday(show.date)}
              </span>

              <span class="event-page__poster-time">
                ${show.time || ""}
              </span>
            </div>
          `;
        })
        .join("")}
    </div>

    <a
      class="event-page__poster-button"
      href="${ticketUrl}"
      ${
        shows.length === 1 && shows[0].ticketUrl
          ? 'target="_blank" rel="noopener noreferrer"'
          : ""
      }
    >
      Купить билеты
    </a>
  `;
}

document.addEventListener("layout:ready", initEventContent);