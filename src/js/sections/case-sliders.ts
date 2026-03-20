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
      const projectsWrapper =
        projectsContainer.querySelector<HTMLElement>(".swiper-wrapper");

      // Для loop-режима Swiper требуется минимум 4 слайда.
      // В макете видно 3 карточки, поэтому добавляем клоны только для прокрутки.
      if (projectsWrapper) {
        const initialSlides = Array.from(
          projectsWrapper.querySelectorAll<HTMLElement>(".swiper-slide")
        );

        if (initialSlides.length > 0 && initialSlides.length < 4) {
          let cloneIndex = 0;

          while (projectsWrapper.children.length < 4) {
            const sourceSlide =
              initialSlides[cloneIndex % initialSlides.length];
            const clonedSlide = sourceSlide.cloneNode(true) as HTMLElement;

            clonedSlide.dataset.clone = "true";
            projectsWrapper.append(clonedSlide);
            cloneIndex += 1;
          }
        }
      }

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
