document.addEventListener("DOMContentLoaded", () => {
  const player = document.querySelector(".video-section__player");
  const video = player?.querySelector(".video-section__video");
  const cover = player?.querySelector(".video-section__cover");

  if (!player || !video || !cover) {
    return;
  }

  cover.addEventListener("click", () => {
    video.play().catch((error) => {
      console.error("Не удалось запустить видео:", error);
    });
  });

  video.addEventListener("play", () => {
    player.classList.add("video-section__player--playing");
  });

  video.addEventListener("ended", () => {
    video.currentTime = 0;
    player.classList.remove("video-section__player--playing");
  });
});