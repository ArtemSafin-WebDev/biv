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
      //   loopAddBlankSlides: false,
      //   loopAdditionalSlides: 5,
      //   loopPreventsSliding: true,
      speed: 700,
      spaceBetween: 10,
      creativeEffect: {
        perspective: true,
        limitProgress: 3,
        progressMultiplier: 1,
        prev: {
          translate: ["-105%", "0%", -120],
          rotate: [0, -25, 0],
          scale: 1,
          opacity: 1,
          shadow: false,
        },
        next: {
          translate: ["105%", "0%", -120],
          rotate: [0, 25, 0],
          scale: 1,
          opacity: 1,
          shadow: false,
        },
      },
    });
  });
}
