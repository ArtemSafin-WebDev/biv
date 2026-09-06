import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isTouch = window.matchMedia("(pointer: coarse)").matches;
const isBitrixAdmin = document.body.classList.contains("is-admin");

if (!isTouch && !isBitrixAdmin) {
  const desktopQuery = window.matchMedia("(min-width: 1025px)");

  function init() {
    const headerHeight =
      document.querySelector<HTMLElement>(".page-header")?.getBoundingClientRect()
        .height ?? 0;
    const lenis = new Lenis({
      anchors: {
        offset: -headerHeight,
        immediate: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      },
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return lenis;
  }

  let lenis: Lenis | null = null;

  if (desktopQuery.matches) {
    lenis = init();
  }

  desktopQuery.addEventListener("change", (e) => {
    if (e.matches && !lenis) {
      lenis = init();
    } else if (!e.matches && lenis) {
      lenis.destroy();
      lenis = null;
    }
  });
}
