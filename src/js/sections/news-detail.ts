import Slider from "../classes/components/Slider";

export default function newsDetail() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(".news-detail-related")
  );

  sections.forEach((section) => {
    new Slider(section, {
      containerSelector: ".news-detail-related__slider",
      prevArrow: ".news-detail-related__control--prev",
      nextArrow: ".news-detail-related__control--next",
      slidesPerView: "auto",
      speed: 600,
      onlyDesktop: true,
    });

    const moreButton = section.querySelector<HTMLButtonElement>(
      ".news-detail-related__more"
    );

    if (!moreButton) return;

    moreButton.addEventListener("click", () => {
      section.classList.add("news-detail-related--expanded");
    });
  });
}
