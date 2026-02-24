import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function getHeaderOffset() {
  return document.querySelector<HTMLElement>(".page-header")?.offsetHeight ?? 0;
}

function getViewportCoverRadius() {
  return Math.hypot(window.innerWidth, window.innerHeight) / 2 + 2;
}

function getLogoShiftToContentLeft(
  logo: HTMLElement,
  content: HTMLElement
): number {
  const logoRect = logo.getBoundingClientRect();
  const contentRect = content.getBoundingClientRect();
  return contentRect.left - logoRect.left;
}

export default function intro() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(".intro-spacer")
  );

  sections.forEach((section) => {
    const backgroundImage =
      section.querySelector<HTMLElement>(".intro__bg img");
    const introContent = section.querySelector<HTMLElement>(".intro__content");
    const introLogo = section.querySelector<HTMLElement>(".intro__logo");
    const introText = section.querySelector<HTMLElement>(".intro__text");
    if (!backgroundImage) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: () => `top top+=${getHeaderOffset()}`,
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    const revealDuration = introText ? 0.85 : 1;
    const logoLag = 0;

    if (introText) {
      timeline.to(introText, {
        opacity: 0,
        duration: 0.15,
        ease: "none",
      });
    }

    timeline.to(backgroundImage, {
      clipPath: () => `circle(${getViewportCoverRadius()}px at 50% 50%)`,
      duration: revealDuration,
      ease: "none",
    });

    if (introContent && introLogo) {
      timeline.to(
        introLogo,
        {
          x: () => getLogoShiftToContentLeft(introLogo, introContent),
          duration: revealDuration,
          ease: "power1.in",
        },
        `<+=${logoLag}`
      );
    }
  });
}
