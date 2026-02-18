import Swiper from "swiper";
import { Navigation, EffectCreative, Pagination } from "swiper/modules";

export default function platform() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".platform")
  );
  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    new Swiper(container, {
      modules: [Navigation, Pagination, EffectCreative],
      effect: "creative",
      centeredSlides: true,
      slidesPerView: "auto",
      watchSlidesProgress: true,
      loop: true,
      speed: 700,
      spaceBetween: 0,
      creativeEffect: {
        perspective: true,
        limitProgress: 2,
        progressMultiplier: 0.9,
        prev: {
          translate: ["-62%", "6%", -320],
          rotate: [0, 22, 0],
          scale: 0.9,
          opacity: 1,
          shadow: false,
        },
        next: {
          translate: ["62%", "6%", -320],
          rotate: [0, -22, 0],
          scale: 0.9,
          opacity: 1,
          shadow: false,
        },
      },
    });
  });
}
