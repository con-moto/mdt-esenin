const theatreContacts = {
  email: "mdtesenina@inbox.ru",
  phoneText: "+7 905 206 97 83",
  phoneHref: "tel:+79052069783",
  whatsappUrl: "https://wa.me/79052069783",
};

const performances = [
  {
    type: "performance",
    eventKey: "notes-of-a-madman",
    title: "ЗАПИСКИ СУМАСШЕДШЕГО. В ОЖИДАНИИ ГО...",
    date: "2026-09-25",
    time: "19:00",
    description: "Сюрреалистическая трагикомедия",
    address:
      "Особняк Борисовских-Толстых XVIII века (ДК «Гайдаровец», м. Курская, ул. Земляной Вал, д. 27, стр. 3. Код калитки: 213к4833)",
    mapUrl:
      "https://yandex.ru/maps/org/glavny_dom_usadby_tolstogo_borisovskikh/197433904501/?ll=37.658903%2C55.759100&z=15",
    ticketUrl:
      "https://iframeab-pre6144.intickets.ru/seance/73785474/",
    pageUrl: "repertoire/notes-of-a-madman.html",
  },
];

const performancesOctober = [
  {
    type: "performance",
    eventKey: "karamazovs",
    title: "КараМазовы",
    date: "2026-10-05",
    time: "19:00",
    description: "Иммерсивная драма в двух линиях",
    address:
      "Особняк Мухиных XVIII века (м. Бауманская, ул. Спартаковская, д. 9, стр. 3)",
    mapUrl:
      "https://yandex.ru/maps/org/usadba_vorontsovoy_mukhinoy/198224388711/?ll=37.672063%2C55.772380&z=19.2",
    ticketUrl:
      "https://iframeab-pre6144.intickets.ru/seance/75148084/",
    pageUrl: "repertoire/karamazovs.html",
  },

  {
    type: "performance",
    eventKey: "hamlet-illusions",
    title: "ГАМЛЕТ. ИЛЛЮЗИИ",
    date: "2026-10-06",
    time: "19:00",
    isPremiere: true,
    description: "Иммерсивная трагикомедия",
    address:
      "Арт-кластер «Творческие Люди» (Особняк В. А. Лемана, м. Курская, пер. Гороховский, 19)",
    mapUrl:
      "https://yandex.ru/maps/org/osobnyak_v_a_lemana/206225152580/?filter=alternate_vertical%3ARequestWindow&ll=37.667986%2C55.765837&mode=search&sctx=ZAAAAAgBEAAaKAoSCY9WtaSjUD5AEQgB%2BRIq%2BE1AEhIJDJQUWABT5j8Rixu3mJ8byj8iBgABAgMEBSgKOABAAkgBagJydZ0BzczMPaABAKgBAL0BSBx6QcIBBsS06J%2BABoICXCjQntGB0L7QsdC90Y%2FQuiDQki7QkC4g0JvQtdC80LDQvdCwLCDQvC4g0JrRg9GA0YHQutCw0Y8sINC%2F0LXRgC4g0JPQvtGA0L7RhdC%2B0LLRgdC60LjQuSwgMTkpigIAkgIDMjEzmgIMZGVza3RvcC1tYXBz&sll=37.667986%2C55.765837&sspn=0.021801%2C0.007162&text=%28%D0%9E%D1%81%D0%BE%D0%B1%D0%BD%D1%8F%D0%BA%20%D0%92.%D0%90.%20%D0%9B%D0%B5%D0%BC%D0%B0%D0%BD%D0%B0%2C%20%D0%BC.%20%D0%9A%D1%83%D1%80%D1%81%D0%BA%D0%B0%D1%8F%2C%20%D0%BF%D0%B5%D1%80.%20%D0%93%D0%BE%D1%80%D0%BE%D1%85%D0%BE%D0%B4%D1%81%D0%BA%D0%B8%D0%B9%2C%2019%29&z=16",
    ticketUrl:
      "https://iframeab-pre6144.intickets.ru/seance/75159386/",
    pageUrl: "repertoire/hamlet-illusions.html",
  },

  {
    type: "performance",
    eventKey: "sherlock-holmes",
    title: "ШЕРЛОК ХОЛМС. СОБАКА БАСКЕРВИЛЕЙ",
    isTour: true,
    date: "2026-10-14",
    time: "19:00",
    description: "Ироничный детектив",
    address:
      "г. Нижний Новгород, ДК «Красное Сормово», Юбилейный бул., 32",
    mapUrl:
      "https://yandex.ru/maps/?text=%D0%94%D0%9A%20%C2%AB%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B5%20%D0%A1%D0%BE%D1%80%D0%BC%D0%BE%D0%B2%D0%BE%C2%BB%2C%20%D0%AE%D0%B1%D0%B8%D0%BB%D0%B5%D0%B9%D0%BD%D1%8B%D0%B9%20%D0%B1%D1%83%D0%BB%D1%8C%D0%B2%D0%B0%D1%80%2C%2032%2C%20%D0%9D%D0%B8%D0%B6%D0%BD%D0%B8%D0%B9%20%D0%9D%D0%BE%D0%B2%D0%B3%D0%BE%D1%80%D0%BE%D0%B4",
    ticketUrl:
      "https://nn.kassir.ru/teatr/sherlok-holms-sobaka-baskerviley#5043120",
    pageUrl: "repertoire/sherlock-holmes.html",
  },

  {
    type: "performance",
    eventKey: "sherlock-holmes",
    title: "ШЕРЛОК ХОЛМС. СОБАКА БАСКЕРВИЛЕЙ",
    isTour: true,
    date: "2026-10-15",
    time: "19:00",
    description: "Ироничный детектив",
    address:
      "г. Дзержинск, ДК Химиков, проспект Ленина, 62",
    mapUrl:
      "https://yandex.ru/maps/?text=%D0%94%D0%9A%20%C2%AB%D0%A5%D0%B8%D0%BC%D0%B8%D0%BA%D0%BE%D0%B2%C2%BB%2C%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B0%2C%2062%2C%20%D0%94%D0%B7%D0%B5%D1%80%D0%B6%D0%B8%D0%BD%D1%81%D0%BA",
    ticketUrl:
      "https://nn.kassir.ru/teatr/sherlok-holms-sobaka-baskerviley#5043121",
    pageUrl: "repertoire/sherlock-holmes.html",
  },

  {
    type: "performance",
    eventKey: "pushkin-tragedies",
    title: "НеМаленькие трагедии Пушкина",
    date: "2026-10-19",
    time: "19:00",
    description: "Иммерсивный ванитас",
    address:
      "Особняк Мухиных XVIII века (м. Бауманская, ул. Спартаковская, д. 9, стр. 3)",
    mapUrl:
      "https://yandex.ru/maps/org/usadba_vorontsovoy_mukhinoy/198224388711/?ll=37.672063%2C55.772380&z=19.2",
    ticketUrl:
      "https://iframeab-pre6144.intickets.ru/seance/75159801/",
    pageUrl: "repertoire/pushkin-tragedies.html",
  },

  {
    type: "performance",
    eventKey: "cherry-orchard",
    title: "ВИШНЁВЫЙ САД",
    isPremiere: true,
    date: "2026-10-22",
    time: "19:00",
    description: "Иммерсивная комедия жизни",
    address:
      "Арт-кластер «Творческие Люди» (Особняк В. А. Лемана, м. Курская, пер. Гороховский, 19)",
    mapUrl:
      "https://yandex.ru/maps/org/osobnyak_v_a_lemana/206225152580/?filter=alternate_vertical%3ARequestWindow&ll=37.667986%2C55.765837&mode=search&sctx=ZAAAAAgBEAAaKAoSCY9WtaSjUD5AEQgB%2BRIq%2BE1AEhIJDJQUWABT5j8Rixu3mJ8byj8iBgABAgMEBSgKOABAAkgBagJydZ0BzczMPaABAKgBAL0BSBx6QcIBBsS06J%2BABoICXCjQntGB0L7QsdC90Y%2FQuiDQki7QkC4g0JvQtdC80LDQvdCwLCDQvC4g0JrRg9GA0YHQutCw0Y8sINC%2F0LXRgC4g0JPQvtGA0L7RhdC%2B0LLRgdC60LjQuSwgMTkpigIAkgIDMjEzmgIMZGVza3RvcC1tYXBz&sll=37.667986%2C55.765837&sspn=0.021801%2C0.007162&text=%28%D0%9E%D1%81%D0%BE%D0%B1%D0%BD%D1%8F%D0%BA%20%D0%92.%D0%90.%20%D0%9B%D0%B5%D0%BC%D0%B0%D0%BD%D0%B0%2C%20%D0%BC.%20%D0%9A%D1%83%D1%80%D1%81%D0%BA%D0%B8%D0%B9%2C%2019%29&z=16",
    ticketUrl:
      "https://iframeab-pre6144.intickets.ru/seance/75148138/",
    pageUrl: "repertoire/cherry-orchard.html",
  },

  {
    type: "performance",
    eventKey: "king-lear",
    title: "КОРОЛЬ ЛИР",
    isPremiere: true,
    date: "2026-10-24",
    time: "19:00",
    description: "Моноспектакль",
    address:
      "Особняк Борисовских-Толстых XVIII века (ДК Гайдаровец, м. Курская, ул. Земляной вал, д.27, стр.3. Код калитки: 213к4833)",
    mapUrl:
      "https://yandex.ru/maps/org/glavny_dom_usadby_tolstogo_borisovskikh/197433904501/?ll=37.658903%2C55.759100&z=15",
    ticketUrl:
      "https://iframeab-pre6144.intickets.ru/seance/75391061/",
    pageUrl: "repertoire/king-lear.html",
  },

  {
    type: "performance",
    eventKey: "bankrot",
    title: "БАНКРОТЪ",
    isPremiere: true,
    date: "2026-10-29",
    time: "19:00",
    description: "Авантюрная комедия",
    address:
      "Особняк Борисовских-Толстых XVIII века (ДК Гайдаровец, м. Курская, ул. Земляной вал, д.27, стр.3. Код калитки: 213к4833)",
    mapUrl:
      "https://yandex.ru/maps/org/glavny_dom_usadby_tolstogo_borisovskikh/197433904501/?ll=37.658903%2C55.759100&z=15",
    ticketUrl:
      "https://iframeab-pre6144.intickets.ru/seance/75253543/",
    pageUrl: "repertoire/bankrot.html",
  },

  {
    type: "performance",
    eventKey: "bankrot",
    title: "БАНКРОТЪ",
    isPremiere: true,
    date: "2026-10-30",
    time: "19:00",
    description: "Авантюрная комедия",
    address:
      "Особняк Борисовских-Толстых XVIII века (ДК Гайдаровец, м. Курская, ул. Земляной вал, д.27, стр.3. Код калитки: 213к4833)",
    mapUrl:
      "https://yandex.ru/maps/org/glavny_dom_usadby_tolstogo_borisovskikh/197433904501/?ll=37.658903%2C55.759100&z=15",
    ticketUrl:
      "https://iframeab-pre6144.intickets.ru/seance/75253546/",
    pageUrl: "repertoire/bankrot.html",
  },
];

const performancesNovember = [
  {
    type: "performance",
    eventKey: "mansion",
    title: "ОСОБНЯК: ОТ МИСТИКИ ДО РЕАЛЬНОСТИ",
    date: "2026-11-04",
    time: "19:00",
    isDayOff: true,
    description:
      "Иммерсивная экскурсия в диалогах с призраком",
    address:
      "Особняк Мухиных XVIII века (м. Бауманская, ул. Спартаковская, д. 9, стр. 3)",
    mapUrl:
      "https://yandex.ru/maps/org/usadba_vorontsovoy_mukhinoy/198224388711/?ll=37.672063%2C55.772380&z=19.2",
    ticketUrl:
      "https://iframeab-pre6144.intickets.ru/seance/76434848/",
    pageUrl: "repertoire/mansion.html",
  },

  {
    type: "performance",
    eventKey: "twelve-chairs",
    title: "12 СТУЛЬЕВ",
    date: "2026-11-16",
    time: "19:00",
    description:
      "Иммерсивный музыкальный спектакль",
    address:
      "Особняк Мухиных XVIII века (м. Бауманская, ул. Спартаковская, д. 9, стр. 3)",
    mapUrl:
      "https://yandex.ru/maps/org/usadba_vorontsovoy_mukhinoy/198224388711/?ll=37.672063%2C55.772380&z=19.2",
    ticketUrl:
      "https://iframeab-pre6144.intickets.ru/seance/76434969/",
    pageUrl: "repertoire/twelve-chairs.html",
  },

  {
    type: "performance",
    eventKey: "idiot",
    title: "ИДИОТ",
    date: "2026-11-23",
    time: "19:00",
    description: "Иммерсивная драма",
    address:
      "Особняк Мухиных XVIII века (м. Бауманская, ул. Спартаковская, д. 9, стр. 3)",
    mapUrl:
      "https://yandex.ru/maps/org/usadba_vorontsovoy_mukhinoy/198224388711/?ll=37.672063%2C55.772380&z=19.2",
    ticketUrl:
      "https://iframeab-pre6144.intickets.ru/seance/76435234/",
    pageUrl: "repertoire/idiot.html",
  },
];

const openDateTicket = [
  {
    type: "open-date-ticket",
    eventKey: "open-date-ticket",
    title: "БИЛЕТ С ОТКРЫТОЙ ДАТОЙ",
    description:
      "Хотите подарить близкому человеку билет в наш театр, но не можете выбрать спектакль? Мы вам поможем!",
    additionalText:
      "Вы можете воспользоваться им в любой день на любой спектакль нашего театра! (Но по требованию билетного партнёра в Вашем билете будет стоять фиктивная дата).",
    ticketUrl:
      "https://iframeab-pre6144.intickets.ru/seance/76506470/",
    pageUrl: "",
  },
];

function getPerformanceDateTime(performance) {
  if (!performance.date) {
    return null;
  }

  const time = performance.time || "00:00";

  const dateTime = new Date(
    `${performance.date}T${time}:00`
  );

  if (Number.isNaN(dateTime.getTime())) {
    return null;
  }

  return dateTime;
}

function getActualPerformances(list) {
  const now = new Date();

  return list.filter((performance) => {
    const performanceDateTime =
      getPerformanceDateTime(performance);

    if (!performanceDateTime) {
      return true;
    }

    return (
      performanceDateTime.getTime() > now.getTime()
    );
  });
}

function updateGlobalPerformances() {
  const actualPerformances =
    getActualPerformances(performances);

  const actualPerformancesOctober =
    getActualPerformances(performancesOctober);

  const actualPerformancesNovember =
    getActualPerformances(performancesNovember);

  window.performances = [
    ...actualPerformances,
    ...actualPerformancesOctober,
    ...actualPerformancesNovember,
    ...openDateTicket,
  ];
}

const eventsList = document.querySelector("#events-list");

const eventsListOctober = document.querySelector(
  "#events-list-october"
);

const eventsListNovember = document.querySelector(
  "#events-list-november"
);

const eventsListOpenDate = document.querySelector(
  "#events-list-open-date"
);

function getDateInfo(dateString) {
  const date = new Date(`${dateString}T12:00:00`);

  const day = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
  }).format(date);

  const weekday = new Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
  })
    .format(date)
    .replace(".", "");

  return { day, weekday };
}

function createContactText() {
  return `
    <p class="event-card__contact">
      По вопросам с билетами свяжитесь с нами по почте
      <a href="mailto:${theatreContacts.email}">
        ${theatreContacts.email}
      </a>
      или по телефону
      <a href="${theatreContacts.phoneHref}">
        ${theatreContacts.phoneText}
      </a>
      (
      <a
        href="${theatreContacts.whatsappUrl}"
        target="_blank"
        rel="noopener noreferrer"
      >
        доступен WhatsApp
      </a>
      )
    </p>
  `;
}

function createTitle(performance) {
  if (performance.pageUrl) {
    return `
      <a
        class="event-card__title"
        href="${performance.pageUrl}"
      >
        ${performance.title}
      </a>
    `;
  }

  return `
    <span class="event-card__title">
      ${performance.title}
    </span>
  `;
}

function createPremiereLabel(performance) {
  if (!performance.isPremiere) {
    return "";
  }

  return `
    <p class="event-card__premiere-label">
      Премьера!
    </p>
  `;
}

function createTourLabel(performance) {
  if (!performance.isTour) {
    return "";
  }

  return `
    <p class="event-card__tour-label">
      ГАСТРОЛИ
    </p>
  `;
}

function getPerformanceCardClassName(performance) {
  const classes = ["event-card"];

  if (performance.isPremiere) {
    classes.push("event-card--premiere");
  }

  if (performance.isDayOff) {
    classes.push("event-card--day-off");
  }

  return classes.join(" ");
}

function createPerformanceCardDesktop(performance) {
  const { day, weekday } = getDateInfo(
    performance.date
  );

  const title = createTitle(performance);
  const premiereLabel =
    createPremiereLabel(performance);
  const tourLabel = createTourLabel(performance);
  const cardClassName =
    getPerformanceCardClassName(performance);

  return `
    <article class="${cardClassName}">
      <div class="event-card__date">
        <time
          class="event-card__day"
          datetime="${performance.date}"
        >
          ${day}
        </time>

        <span class="event-card__weekday">
          ${weekday}
        </span>
      </div>

      <div class="event-card__info">
        ${premiereLabel}
        ${tourLabel}
        ${title}

        <p class="event-card__description">
          ${performance.description}
        </p>

        <p class="event-card__address">
          <a
            href="${performance.mapUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Адрес: ${performance.address}
          </a>
        </p>

        ${createContactText()}
      </div>

      <div class="event-card__action">
        <time
          class="event-card__time"
          datetime="${performance.time}"
        >
          ${performance.time}
        </time>

        <a
          class="ticket-button"
          href="${performance.ticketUrl}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Купить билет
        </a>
      </div>
    </article>
  `;
}

function createPerformanceCardMobile(performance) {
  const { day, weekday } = getDateInfo(
    performance.date
  );

  const title = createTitle(performance);
  const premiereLabel =
    createPremiereLabel(performance);
  const tourLabel = createTourLabel(performance);
  const cardClassName =
    getPerformanceCardClassName(performance);

  return `
    <article class="${cardClassName}">
      <div class="event-card__date">
        <time
          class="event-card__day"
          datetime="${performance.date}"
        >
          ${day}
        </time>

        <span class="event-card__weekday">
          ${weekday}
        </span>

        <time
          class="event-card__time"
          datetime="${performance.time}"
        >
          ${performance.time}
        </time>
      </div>

      <div class="event-card__info">
        ${premiereLabel}
        ${tourLabel}
        ${title}

        <p class="event-card__description">
          ${performance.description}
        </p>

        <p class="event-card__address">
          <a
            href="${performance.mapUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Адрес: ${performance.address}
          </a>
        </p>

        ${createContactText()}
      </div>

      <div class="event-card__action">
        <a
          class="ticket-button"
          href="${performance.ticketUrl}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Купить билет
        </a>
      </div>
    </article>
  `;
}

function createOpenDateTicketCard(ticket) {
  const title = createTitle(ticket);

  return `
    <article class="event-card event-card--open-date">
      <div class="event-card__date"></div>

      <div class="event-card__info">
        ${title}

        <p class="event-card__description">
          ${ticket.description}
        </p>

        <p class="event-card__additional-text">
          ${ticket.additionalText}
        </p>

        ${createContactText()}
      </div>

      <div class="event-card__action">
        <a
          class="ticket-button"
          href="${ticket.ticketUrl}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Купить билет
        </a>
      </div>
    </article>
  `;
}

function createEventCard(item) {
  if (item.type === "open-date-ticket") {
    return createOpenDateTicketCard(item);
  }

  if (window.innerWidth <= 680) {
    return createPerformanceCardMobile(item);
  }

  return createPerformanceCardDesktop(item);
}

function updateMonthVisibility(
  monthName,
  hasPerformances
) {
  const monthSection = document.querySelector(
    `[data-month-section="${monthName}"]`
  );

  const eventsSection = document.querySelector(
    `[data-events-section="${monthName}"]`
  );

  const separators = document.querySelectorAll(
    `[data-month-separator="${monthName}"]`
  );

  const isVisible = Boolean(hasPerformances);

  if (monthSection) {
    monthSection.hidden = !isVisible;
    monthSection.style.display = isVisible
      ? "flex"
      : "none";
  }

  if (eventsSection) {
    eventsSection.hidden = !isVisible;
    eventsSection.style.display = isVisible
      ? ""
      : "none";
  }

  separators.forEach((separator) => {
    separator.hidden = !isVisible;
    separator.style.display = isVisible
      ? ""
      : "none";
  });
}

function renderEvents() {
  const actualPerformances =
    getActualPerformances(performances);

  const actualPerformancesOctober =
    getActualPerformances(performancesOctober);

  const actualPerformancesNovember =
    getActualPerformances(performancesNovember);

  updateGlobalPerformances();

  if (eventsList) {
    eventsList.innerHTML = actualPerformances
      .map(createEventCard)
      .join("");
  }

  if (eventsListOctober) {
    eventsListOctober.innerHTML =
      actualPerformancesOctober
        .map(createEventCard)
        .join("");
  }

  if (eventsListNovember) {
    eventsListNovember.innerHTML =
      actualPerformancesNovember
        .map(createEventCard)
        .join("");
  }

  if (eventsListOpenDate) {
    eventsListOpenDate.innerHTML = openDateTicket
      .map(createEventCard)
      .join("");
  }

  updateMonthVisibility(
    "september",
    actualPerformances.length
  );

  updateMonthVisibility(
    "october",
    actualPerformancesOctober.length
  );

  updateMonthVisibility(
    "november",
    actualPerformancesNovember.length
  );
}

let resizeTimer;

window.addEventListener("resize", () => {
  if (
    !eventsList &&
    !eventsListOctober &&
    !eventsListNovember &&
    !eventsListOpenDate
  ) {
    return;
  }

  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    renderEvents();
  }, 150);
});

renderEvents();

window.setInterval(() => {
  renderEvents();
}, 60 * 1000);