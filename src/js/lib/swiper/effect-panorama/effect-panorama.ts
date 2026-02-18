import { effectInit } from "swiper/effect-utils";
import type { Swiper, SwiperModule } from "swiper/types";

type PanoramaEffectParams = {
  depth: number;
  rotate: number;
  transformEl?: string;
};

type PanoramaSlideElement = HTMLElement & {
  progress?: number;
};

type PanoramaSwiperParams = Swiper["params"] & {
  panoramaEffect: PanoramaEffectParams;
};

type EffectInitParams = {
  effect: string;
  swiper: Swiper;
  on: Swiper["on"];
  setTranslate: () => void;
  setTransition: (duration: number) => void;
  perspective?: () => boolean;
  overwriteParams?: () => Partial<Swiper["params"]>;
};

const initEffect = effectInit as unknown as (params: EffectInitParams) => void;

const getTransitionTarget = (
  slideEl: HTMLElement,
  transformEl?: string
): HTMLElement => {
  const target = transformEl
    ? slideEl.querySelector<HTMLElement>(transformEl) || slideEl
    : slideEl;

  if (target !== slideEl) {
    target.style.backfaceVisibility = "hidden";
    target.style.setProperty("-webkit-backface-visibility", "hidden");
  }

  return target;
};

const EffectPanorama: SwiperModule = ({ swiper, extendParams, on }) => {
  extendParams({
    panoramaEffect: {
      depth: 200,
      rotate: 30,
    },
  });

  const setTranslate = () => {
    const { slides, slidesSizesGrid } = swiper;

    const params = (swiper.params as PanoramaSwiperParams).panoramaEffect;
    const center = (params.rotate * Math.PI) / 180 / 2;
    const rotate = 1 / (180 / params.rotate);
    const translate = params.depth;
    const slidesPerView =
      typeof swiper.params.slidesPerView === "number"
        ? swiper.params.slidesPerView
        : 1;

    for (let i = 0, length = slides.length; i < length; i += 1) {
      const slideEl = slides[i] as PanoramaSlideElement;
      const slideProgress = slideEl.progress || 0;
      const slideSize = slidesSizesGrid[i] || 0;
      const offset = swiper.params.centeredSlides
        ? 0
        : (slidesPerView - 1) * 0.5;

      const slideOffset = slideProgress + offset;
      const centerOffset = 1 - Math.cos(slideOffset * rotate * Math.PI);

      const translateX = `${slideOffset * (slideSize / 3) * centerOffset}`;
      const translateZ = `${((slideSize * 0.5) / Math.sin(center)) * centerOffset - translate}`;
      const rotateY = slideOffset * params.rotate;

      const slideTransform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
      const target = getTransitionTarget(slideEl, params.transformEl);
      target.style.transform = slideTransform;
    }
  };

  const setTransition = (duration: number) => {
    const { transformEl } = (swiper.params as PanoramaSwiperParams)
      .panoramaEffect;
    const transitionElements = transformEl
      ? swiper.slides.map((slideEl) =>
          getTransitionTarget(slideEl, transformEl)
        )
      : swiper.slides;

    transitionElements.forEach((element) => {
      element.style.transitionDuration = `${duration}ms`;
    });
  };

  initEffect({
    effect: "panorama",
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true,
    }),
  });
};

export default EffectPanorama;
