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
        performance.date
      );
    })
    .sort((firstShow, secondShow) => {
      return firstShow.date.localeCompare(secondShow.date);
    })
    .slice(0, 2);

  if (!shows.length) {
    poster.innerHTML = `
      <h2 class="event-page__poster-title">
        Ближайшие спектакли:
      </h2>

      <p class="event-page__poster-empty">
        Ближайшие показы скоро появятся.
      </p>
    `;

    return;
  }

  const hasPremiere = shows.some((show) => show.isPremiere);
  const firstShow = shows[0];
  const ticketUrl = firstShow.ticketUrl || event.ticketUrl || "#";

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
                ${show.time}
              </span>
            </div>
          `;
        })
        .join("")}
    </div>

    <a
      class="event-page__poster-button"
      href="${ticketUrl}"
      target="_blank"
      rel="noopener noreferrer"
    >
      Купить билеты
    </a>
  `;
}

document.addEventListener("layout:ready", initEventContent);