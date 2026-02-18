import { effectInit } from "swiper/effect-utils";
import type { Swiper, SwiperModule } from "swiper/types";

// Параметры кастомного эффекта panorama, которые мы добавляем в swiper.params.
type PanoramaEffectParams = {
  depth: number;
  rotate: number;
  transformEl?: string;
};

// В рантайме Swiper записывает progress на HTMLElement слайда.
type PanoramaSlideElement = HTMLElement & {
  progress?: number;
};

// Локально расширяем стандартные params, чтобы типобезопасно читать panoramaEffect.
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

// В typings Swiper сигнатура effectInit неточная, поэтому приводим к используемому контракту.
const initEffect = effectInit as unknown as (params: EffectInitParams) => void;

const getTransitionTarget = (
  slideEl: HTMLElement,
  transformEl?: string
): HTMLElement => {
  // Если указан transformEl, трансформацию/transition применяем к дочернему элементу.
  // Иначе работаем с самим слайдом.
  const target = transformEl
    ? slideEl.querySelector<HTMLElement>(transformEl) || slideEl
    : slideEl;

  if (target !== slideEl) {
    // Скрываем обратную сторону, чтобы уменьшить артефакты при 3D-вращении.
    target.style.backfaceVisibility = "hidden";
    target.style.setProperty("-webkit-backface-visibility", "hidden");
  }

  return target;
};

const EffectPanorama: SwiperModule = ({ swiper, extendParams, on }) => {
  // Регистрируем дефолтные значения эффекта в общих параметрах Swiper.
  extendParams({
    panoramaEffect: {
      depth: 200,
      rotate: 30,
    },
  });

  const setTranslate = () => {
    const { slides, slidesSizesGrid } = swiper;

    const params = (swiper.params as PanoramaSwiperParams).panoramaEffect;
    // Полуугол для расчёта глубины дуги в 3D-пространстве.
    const center = (params.rotate * Math.PI) / 180 / 2;
    // Коэффициент перевода прогресса слайда в угол вращения.
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
      // При centeredSlides=false корректируем прогресс относительно "видимой группы".
      const offset = swiper.params.centeredSlides
        ? 0
        : (slidesPerView - 1) * 0.5;

      const slideOffset = slideProgress + offset;
      // Нелинейный коэффициент: чем дальше слайд от центра, тем сильнее его "уводит" в дугу.
      const centerOffset = 1 - Math.cos(slideOffset * rotate * Math.PI);

      const translateX = `${slideOffset * (slideSize / 3) * centerOffset}`;
      // Уводим слайд по Z, формируя панорамный объём.
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
    // Transition нужно ставить на тот же элемент, куда ставим transform.
    const transitionElements = transformEl
      ? swiper.slides.map((slideEl) =>
          getTransitionTarget(slideEl, transformEl)
        )
      : swiper.slides;

    transitionElements.forEach((element) => {
      element.style.transitionDuration = `${duration}ms`;
    });
  };

  // Подключаем эффект к жизненному циклу Swiper:
  // beforeInit/setTranslate/setTransition и перезапись нужных параметров.
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
