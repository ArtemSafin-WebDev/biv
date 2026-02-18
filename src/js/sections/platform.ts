import Swiper from "swiper";
import { Navigation, EffectCreative, Pagination } from "swiper/modules";
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

    const options: PanoramaSwiperOptions = {
      modules: [Navigation, Pagination, EffectCreative, EffectPanorama],
      effect: "panorama",
      //   spaceBetween: 40,
      slidesPerView: "auto",
      loop: true,
      centeredSlides: true,
      panoramaEffect: { depth: 50, rotate: -15 },
      pagination: {
        el: element.querySelector<HTMLElement>(".platform__slider-pagination"),
        type: "fraction",
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
