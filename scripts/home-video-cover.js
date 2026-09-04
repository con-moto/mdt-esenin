document.addEventListener("DOMContentLoaded", () => {
  const player = document.querySelector(".about-section__video-player");
  const video = player?.querySelector(".about-section__video");
  const cover = player?.querySelector(".about-section__video-cover");

  if (!player || !video || !cover) {
    return;
  }

  cover.addEventListener("click", () => {
    video.play();
  });

  video.addEventListener("play", () => {
    player.classList.add("about-section__video-player--playing");
  });

  video.addEventListener("ended", () => {
    video.currentTime = 0;
    player.classList.remove("about-section__video-player--playing");
  });
});