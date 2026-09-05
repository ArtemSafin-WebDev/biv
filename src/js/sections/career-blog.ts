import { gsap } from "gsap";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import { MOBILE_BREAKPOINT } from "../constants/breakpoints";

export default function careerBlog() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(".js-career-blog")
  );

  sections.forEach((section) => {
    const container = section.querySelector<HTMLElement>(
      ".career-blog__slider"
    );
    if (!container) return;

    const mediaMatch = gsap.matchMedia();
    mediaMatch.add(`(max-width: ${MOBILE_BREAKPOINT}px)`, () => {
      const options: SwiperOptions = {
        modules: [Navigation],
        slidesPerView: "auto",
        spaceBetween: 10,
        speed: 600,
        rewind: true,
        navigation: {
          prevEl: section.querySelector<HTMLButtonElement>(
            ".career-blog__arrow--prev"
          ),
          nextEl: section.querySelector<HTMLButtonElement>(
            ".career-blog__arrow--next"
          ),
        },
      };

      const instance = new Swiper(container, options);
      return () => instance.destroy(true, true);
    });
  });
}
