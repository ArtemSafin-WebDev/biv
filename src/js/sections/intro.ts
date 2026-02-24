import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function getHeaderOffset() {
  return document.querySelector<HTMLElement>(".page-header")?.offsetHeight ?? 0;
}

export default function intro() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(".intro-spacer")
  );

  sections.forEach((section) => {
    const backgroundImage =
      section.querySelector<HTMLElement>(".intro__bg img");
    if (!backgroundImage) return;

    gsap.to(backgroundImage, {
      clipPath: "circle(150vmax at 50% 50%)",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: () => `top top+=${getHeaderOffset()}`,
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });
}
