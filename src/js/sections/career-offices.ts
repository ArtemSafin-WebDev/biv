import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import { MOBILE_BREAKPOINT } from "../constants/breakpoints";

export default function careerOffices() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(".js-career-offices")
  );

  sections.forEach((section) => {
    const container = section.querySelector<HTMLElement>(
      ".career-offices__slider"
    );
    if (!container) return;

    const options: SwiperOptions = {
      modules: [Navigation],
      slidesPerView: "auto",
      spaceBetween: 20,
      speed: 600,
      autoHeight: true,
      breakpoints: {
        [MOBILE_BREAKPOINT + 1]: {
          autoHeight: false,
        },
      },
      navigation: {
        prevEl: section.querySelector<HTMLButtonElement>(
          ".career-offices__arrow--prev"
        ),
        nextEl: section.querySelector<HTMLButtonElement>(
          ".career-offices__arrow--next"
        ),
      },
    };

    new Swiper(container, options);
  });
}
