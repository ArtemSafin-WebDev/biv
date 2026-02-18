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
      speed: 600,
      slidesPerView: "auto",
      centeredSlides: true,
      centeredSlidesBounds: false,
      creativeEffect: {
        prev: {
          translate: ["-120%", 0, -500],
        },
        next: {
          translate: ["120%", 0, -500],
        },
      },
    });
  });
}
