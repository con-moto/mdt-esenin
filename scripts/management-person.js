(() => {
  const layouts = document.querySelectorAll("[data-management-layout]");

  if (!layouts.length) {
    return;
  }

  const getMode = () => {
    if (window.innerWidth > 900) {
      return "desktop";
    }

    if (window.innerWidth > 550) {
      return "tablet";
    }

    return "mobile";
  };

  const render = () => {
    const mode = getMode();

    layouts.forEach((layout) => {
      layout.hidden = layout.dataset.managementLayout !== mode;
    });
  };

  let timeoutId;

  window.addEventListener("resize", () => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(render, 100);
  });

  render();
})();