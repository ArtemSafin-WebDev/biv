import { gsap } from "gsap";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import { MOBILE_BREAKPOINT } from "../constants/breakpoints";

export default function portfolio() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(".portfolio")
  );

  sections.forEach((section) => {
    const container = section.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    const mediaMatch = gsap.matchMedia();
    mediaMatch.add(`(max-width: ${MOBILE_BREAKPOINT}px)`, () => {
      const options: SwiperOptions = {
        modules: [Navigation],
        slidesPerView: "auto",
        speed: 600,
        navigation: {
          prevEl: section.querySelector<HTMLButtonElement>(
            ".portfolio__slider-arrow--prev"
          ),
          nextEl: section.querySelector<HTMLButtonElement>(
            ".portfolio__slider-arrow--next"
          ),
        },
      };
      const instance = new Swiper(container, options);
      return () => {
        instance.destroy(true, true);
      };
    });
  });
}
