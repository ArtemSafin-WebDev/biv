import Swiper from "swiper";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
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

    Fancybox.bind(section, '[data-fancybox="career-offices"]', {
      l10n: {
        CLOSE: "Закрыть",
        MODAL: "Фотографии наших офисов",
        NEXT: "Следующая фотография",
        PREV: "Предыдущая фотография",
        TOGGLE_ZOOM: "Изменить масштаб",
        TOGGLE_AUTOPLAY: "Слайд-шоу",
        TOGGLE_FULLSCREEN: "На весь экран",
        TOGGLE_THUMBS: "Миниатюры",
      },
    });

    const options: SwiperOptions = {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 600,
      breakpoints: {
        [MOBILE_BREAKPOINT + 1]: {
          slidesPerView: "auto",
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
