import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import EffectPanorama from "../lib/swiper/effectPanorama";

type PanoramaEffectOptions = {
  depth?: number;
  rotate?: number;
  transformEl?: string;
};

type PanoramaSwiperOptions = SwiperOptions & {
  panoramaEffect?: PanoramaEffectOptions;
};

export default function platform() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".platform")
  );
  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    const wrapper = container.querySelector<HTMLElement>(".swiper-wrapper");
    if (!wrapper) return;
    const originalSlides = Array.from(
      wrapper.querySelectorAll<HTMLElement>(".swiper-slide")
    );
    const clonedSlides = originalSlides.map((slide) => slide.cloneNode(true));
    wrapper.append(...clonedSlides);

    const options: PanoramaSwiperOptions = {
      modules: [Navigation, Pagination, EffectPanorama],
      effect: "panorama",
      slidesPerView: "auto",
      loop: true,
      centeredSlides: true,
      panoramaEffect: { depth: 50, rotate: -15 },
      pagination: {
        el: element.querySelector<HTMLElement>(".platform__slider-pagination"),
        type: "custom",
        renderCustom: (swiper) => {
          const current = (swiper.realIndex % originalSlides.length) + 1;
          return `${current}/${originalSlides.length}`;
        },
      },
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(
          ".platform__slider-arrow--prev"
        ),
        nextEl: element.querySelector<HTMLButtonElement>(
          ".platform__slider-arrow--next"
        ),
      },
    };

    new Swiper(container, options);
  });
}
