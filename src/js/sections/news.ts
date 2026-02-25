import { gsap } from "gsap";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import { MOBILE_BREAKPOINT } from "../constants/breakpoints";

export default function news() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>(".news"));

  sections.forEach((section) => {
    const container = section.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    const mediaMatch = gsap.matchMedia();
    mediaMatch.add(`(max-width: ${MOBILE_BREAKPOINT}px)`, () => {
      const options: SwiperOptions = {
        modules: [Navigation],
        slidesPerView: "auto",
        spaceBetween: 20,
        speed: 600,
        navigation: {
          prevEl: section.querySelector<HTMLButtonElement>(
            ".news__slider-arrow--prev"
          ),
          nextEl: section.querySelector<HTMLButtonElement>(
            ".news__slider-arrow--next"
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
