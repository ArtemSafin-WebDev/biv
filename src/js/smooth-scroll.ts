import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isTouch = window.matchMedia("(pointer: coarse)").matches;

if (!isTouch) {
  const desktopQuery = window.matchMedia("(min-width: 1025px)");

  function init() {
    const lenis = new Lenis();

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
