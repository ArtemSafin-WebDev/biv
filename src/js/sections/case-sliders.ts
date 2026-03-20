import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";

export default function caseSliders() {
  const caseDetailSection = document.querySelector<HTMLElement>(".case-detail");

  if (caseDetailSection) {
    const visualsContainer = caseDetailSection.querySelector<HTMLElement>(
      ".case-detail__visuals-slider"
    );

    if (visualsContainer) {
      const visualsOptions: SwiperOptions = {
        modules: [Navigation],
        slidesPerView: "auto",
        speed: 600,
        navigation: {
          prevEl: caseDetailSection.querySelector<HTMLButtonElement>(
            ".case-detail__control--prev"
          ),
          nextEl: caseDetailSection.querySelector<HTMLButtonElement>(
            ".case-detail__control--next"
          ),
        },
        watchOverflow: true,
      };

      new Swiper(visualsContainer, visualsOptions);
    }
  }

  const caseProjectsSection =
    document.querySelector<HTMLElement>(".case-projects");

  if (caseProjectsSection) {
    const projectsContainer = caseProjectsSection.querySelector<HTMLElement>(
      ".case-projects__slider"
    );

    if (projectsContainer) {
      const projectsOptions: SwiperOptions = {
        modules: [Navigation],
        slidesPerView: "auto",
        speed: 600,
        loop: true,
        watchOverflow: false,
        navigation: {
          prevEl: caseProjectsSection.querySelector<HTMLButtonElement>(
            ".case-projects__control--prev"
          ),
          nextEl: caseProjectsSection.querySelector<HTMLButtonElement>(
            ".case-projects__control--next"
          ),
        },
      };

      new Swiper(projectsContainer, projectsOptions);
    }
  }
}
