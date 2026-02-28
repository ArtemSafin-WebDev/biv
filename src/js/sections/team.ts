import { gsap } from "gsap";

const SWAP_INTERVAL = 5;
const FADE_DURATION = 0.6;

export default function team() {
  const section = document.querySelector(".team");
  if (!section) return;

  const slides = [
    ...section.querySelectorAll<HTMLElement>(".team__image-wrapper"),
  ];
  const btn = section.querySelector<HTMLElement>(".team__btn");

  if (slides.length < 2) {
    if (btn) btn.style.display = "none";
    return;
  }

  let current = 0;
  let scheduled: gsap.core.Tween | null = null;

  gsap.set(slides, { autoAlpha: 0 });
  gsap.set(slides[0], { autoAlpha: 1 });

  function scheduleNext() {
    scheduled?.kill();
    scheduled = gsap.delayedCall(SWAP_INTERVAL, showNext);
  }

  function showNext() {
    const prev = current;
    current = (current + 1) % slides.length;

    gsap.to(slides[prev], { autoAlpha: 0, duration: FADE_DURATION, ease: "power2.inOut" });
    gsap.to(slides[current], { autoAlpha: 1, duration: FADE_DURATION, ease: "power2.inOut" });

    scheduleNext();
  }

  scheduleNext();

  btn?.addEventListener("click", (e) => {
    e.preventDefault();
    showNext();
  });
}
