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
      spaceBetween: 24,
      creativeEffect: {
        perspective: true,
        limitProgress: 2,
        progressMultiplier: 1.1,
        prev: {
          translate: ["-95%", "4%", -360],
          rotate: [0, 28, 0],
          scale: 0.84,
          opacity: 0.55,
          shadow: true,
        },
        next: {
          translate: ["95%", "4%", -360],
          rotate: [0, -28, 0],
          scale: 0.84,
          opacity: 0.55,
          shadow: true,
        },
      },
    });
  });
}
