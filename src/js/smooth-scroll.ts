import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function initSmoothScroll() {
  if (document.body.classList.contains("is-admin")) return;

  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const desktopQuery = window.matchMedia("(min-width: 1025px)");
  let lenis: Lenis | null = null;
  const tick = (time: number) => lenis?.raf(time * 1000);

  function init() {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(tick);

    gsap.ticker.lagSmoothing(0);

    return lenis;
  }

  function getTarget(hash: string) {
    if (!hash || hash === "#") return null;
    try {
      return document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch {
      return null;
    }
  }

  function scrollToTarget(target: HTMLElement, immediate: boolean) {
    const headerHeight =
      document.querySelector<HTMLElement>(".page-header")?.getBoundingClientRect()
        .height ?? 0;
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(target, {
        offset: -headerHeight,
        immediate,
        // A font or image may finish loading while the smooth scroll is running.
        onComplete: immediate ? undefined : () => scrollToTarget(target, true),
      });
    } else {
      window.scrollTo({
        top: window.scrollY + target.getBoundingClientRect().top - headerHeight,
        behavior: immediate ? "instant" : "smooth",
      });
    }
  }

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

    const target = getTarget(anchor.hash);
    if (!target) return;

    event.preventDefault();
    scrollToTarget(
      target,
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });

  if (!isTouch && desktopQuery.matches) {
    lenis = init();
  }

  desktopQuery.addEventListener("change", (e) => {
    if (isTouch) return;
    if (e.matches && !lenis) {
      lenis = init();
    } else if (!e.matches && lenis) {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
    }
  });

  window.addEventListener("hashchange", () => {
    const target = getTarget(window.location.hash);
    if (target) scrollToTarget(target, true);
  });

  const initialHash = window.location.hash;
  if (!getTarget(initialHash)) return;

  let interrupted = false;
  const interrupt = () => {
    interrupted = true;
  };
  const inputEvents = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
  inputEvents.forEach((event) => {
    window.addEventListener(event, interrupt, { passive: true });
  });

  async function scrollToInitialHash() {
    // Images, fonts and component initialization can move the anchor. GSAP's
    // refresh can also restore a scroll position captured before the native jump.
    await document.fonts.ready;
    ScrollTrigger.refresh();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    inputEvents.forEach((event) => window.removeEventListener(event, interrupt));
    if (interrupted || window.location.hash !== initialHash) return;
    const target = getTarget(initialHash);
    if (target) scrollToTarget(target, true);
  }

  if (document.readyState === "complete") {
    void scrollToInitialHash();
  } else {
    window.addEventListener("load", () => {
      void scrollToInitialHash();
    }, { once: true });
  }
}
