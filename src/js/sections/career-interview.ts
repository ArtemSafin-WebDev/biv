import { gsap } from "gsap";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import { MOBILE_BREAKPOINT } from "../constants/breakpoints";

export default function careerInterview() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(".js-career-interview")
  );

  sections.forEach((section) => {
    const container = section.querySelector<HTMLElement>(
      ".career-interview__swiper"
    );
    if (!container) return;

    const mediaMatch = gsap.matchMedia();
    mediaMatch.add(`(max-width: ${MOBILE_BREAKPOINT}px)`, () => {
      const options: SwiperOptions = {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 600,
        navigation: {
          prevEl: section.querySelector<HTMLButtonElement>(
            ".career-interview__arrow--prev"
          ),
          nextEl: section.querySelector<HTMLButtonElement>(
            ".career-interview__arrow--next"
          ),
        },
      };

      const instance = new Swiper(container, options);
      return () => instance.destroy(true, true);
    });
  });
}
