async function loadComponent(selector, url) {
  const container = document.querySelector(selector);


  if (!container) {
    return;
  }


  const response = await fetch(url);


  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }


  container.innerHTML = await response.text();
}


function isExternalOrSpecialPath(path) {
  return (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  );
}


function updateComponentPaths(root) {
  document.querySelectorAll("[data-root-path]").forEach((element) => {
    const path = element.dataset.rootPath;
    const attribute = element.dataset.rootAttribute || "href";


    if (!path) {
      return;
    }


    const value = isExternalOrSpecialPath(path) ? path : root + path;


    element.setAttribute(attribute, value);
  });
}


function setCurrentPage() {
  const currentPage = document.body.dataset.page;

  if (!currentPage) {
    return;
  }

  const currentLink = document.querySelector(
    `[data-page-link="${currentPage}"]`
  );

  if (!currentLink) {
    return;
  }

  currentLink.setAttribute("aria-current", "page");

  currentLink.closest(".main-navigation__item")?.classList.add(
    "main-navigation__item--active"
  );

  // Получаем имя текущего файла (например, don-quixote.html)
  const currentFileName = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll(".submenu a").forEach((link) => {
    // Берём data-root-path вместо href
    const dataRootPath = link.dataset.rootPath;

    if (!dataRootPath || isExternalOrSpecialPath(dataRootPath)) {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
      return;
    }

    // Получаем имя файла из data-root-path
    const linkFileName = dataRootPath.split('/').pop().split('#')[0].split('?')[0];

    const isActive = linkFileName === currentFileName;

    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}


function closeNavigation(menuToggles, mainNavigation) {
  menuToggles.forEach((menuToggle) => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Открыть меню");
  });


  mainNavigation.classList.remove("main-navigation--open");
}


function initNavigation() {
  const menuToggles = document.querySelectorAll(".menu-toggle");
  const mainNavigation = document.querySelector(".main-navigation");


  if (menuToggles.length && mainNavigation) {
    menuToggles.forEach((menuToggle) => {
      menuToggle.addEventListener("click", () => {
        const isOpen =
          menuToggle.getAttribute("aria-expanded") === "true";


        const nextValue = !isOpen;


        menuToggles.forEach((toggle) => {
          toggle.setAttribute("aria-expanded", String(nextValue));
          toggle.setAttribute(
            "aria-label",
            nextValue ? "Закрыть меню" : "Открыть меню"
          );
        });


        mainNavigation.classList.toggle(
          "main-navigation--open",
          nextValue
        );
      });
    });


    mainNavigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeNavigation(menuToggles, mainNavigation);
      });
    });


    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeNavigation(menuToggles, mainNavigation);
      }
    });
  }


  document.querySelectorAll(".submenu-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const item = toggle.closest(".has-submenu");


      if (!item) {
        return;
      }


      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      const nextValue = !isOpen;


      toggle.setAttribute("aria-expanded", String(nextValue));


      item.classList.toggle(
        "main-navigation__item--submenu-open",
        nextValue
      );
    });
  });
}


async function initLayout() {
  const root = document.body.dataset.root;
  const header = document.body.dataset.header;


  if (!root || !header) {
    console.error("У <body> должны быть data-root и data-header.");
    return;
  }


  try {
    await loadComponent(
      "#common-header",
      `${root}components/${header}.html`
    );


    await loadComponent(
      "#common-navigation",
      `${root}components/navigation.html`
    );


    await loadComponent(
      "#common-footer",
      `${root}components/footer.html`
    );


    updateComponentPaths(root);
    setCurrentPage();
    initNavigation();


    document.dispatchEvent(new CustomEvent("layout:ready"));
  } catch (error) {
    console.error("Не удалось собрать общий макет:", error);
  }
}


document.addEventListener("DOMContentLoaded", initLayout);