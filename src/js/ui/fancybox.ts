import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

export default function fancybox() {
  Fancybox.bind("[data-fancybox]", {
    l10n: {
      CLOSE: "Закрыть",
      MODAL: "Галерея изображений",
      NEXT: "Следующая фотография",
      PREV: "Предыдущая фотография",
      TOGGLE_ZOOM: "Изменить масштаб",
      TOGGLE_AUTOPLAY: "Слайд-шоу",
      TOGGLE_FULLSCREEN: "На весь экран",
      TOGGLE_THUMBS: "Миниатюры",
    },
  });
}
