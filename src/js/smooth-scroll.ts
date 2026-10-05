import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isTouch = window.matchMedia("(pointer: coarse)").matches;
const isBitrixAdmin = document.body.classList.contains("is-admin");

if (!isTouch && !isBitrixAdmin) {
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

  // Lenis' built-in anchor handler also scrolls href="#" UI controls to the top.
  window.addEventListener("click", (event: MouseEvent) => {
    if (
      !lenis ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    const anchor = event.composedPath().find(
      (node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement
    );
    if (!anchor || anchor.hasAttribute("download")) return;
    if (anchor.target && anchor.target !== "_self") return;
    if (
      anchor.origin !== window.location.origin ||
      anchor.pathname !== window.location.pathname ||
      anchor.search !== window.location.search ||
      !anchor.hash
    ) return;

    const target = document.getElementById(anchor.hash.slice(1));
    if (!target) return;

    event.preventDefault();
    const headerHeight =
      document.querySelector<HTMLElement>(".page-header")?.getBoundingClientRect()
        .height ?? 0;
    lenis.scrollTo(target, {
      offset: -headerHeight,
      immediate: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  });

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
