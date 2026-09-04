import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function getHeaderOffset() {
  return document.querySelector<HTMLElement>(".page-header")?.offsetHeight ?? 0;
}

function getShapeCoverScale(shape: HTMLElement, section: HTMLElement): number {
  return (
    Math.hypot(window.innerWidth, section.clientHeight) / shape.offsetWidth + 0.02
  );
}

export default function careerHero() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(".career-hero-spacer")
  );

  sections.forEach((spacer) => {
    const section = spacer.querySelector<HTMLElement>(".career-hero");
    const shape = spacer.querySelector<HTMLElement>(".career-hero__shape");
    const navigation = spacer.querySelector<HTMLElement>(".career-hero__nav");

    if (!section || !shape || !navigation) return;

    const mediaMatch = gsap.matchMedia();

    mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: spacer,
          start: () => `top top+=${getHeaderOffset()}`,
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          shape,
          {
            scale: () => getShapeCoverScale(shape, section),
            transformOrigin: "50% 50%",
            duration: 1,
            ease: "none",
          },
          0
        )
        .to(
          navigation,
          {
            autoAlpha: 0,
            duration: 1,
            ease: "none",
          },
          0
        );
    });
  });
}
