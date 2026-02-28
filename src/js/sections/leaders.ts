import { gsap } from "gsap";

const SWAP_INTERVAL = 4;
const FADE_DURATION = 0.4;

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function leaders() {
  const section = document.querySelector<HTMLElement>(".leaders");
  if (!section) return;
  const el = section;

  const ALL_LOGOS: string[] = JSON.parse(el.dataset.leadersLogos ?? "[]");
  if (!ALL_LOGOS.length) return;

  const btn = el.querySelector<HTMLElement>("[data-leaders-swap]");

  let circles: HTMLElement[] = [];
  let circleLogos: string[] = [];
  let queue: string[] = [];
  let scheduled: gsap.core.Tween | null = null;

  function getVisibleCircles() {
    return [
      ...el.querySelectorAll<HTMLElement>("[data-leaders-circle]"),
    ].filter((c) => c.offsetParent !== null);
  }

  function cleanup() {
    scheduled?.kill();
    scheduled = null;
    circles.forEach((c) => c.querySelector("img")?.remove());
  }

  function init() {
    circles = getVisibleCircles();
    const shuffled = shuffle([...ALL_LOGOS]);
    const n = Math.min(circles.length, ALL_LOGOS.length);
    circleLogos = shuffled.slice(0, n);
    queue = shuffled.slice(n);
    circleLogos.forEach((logo, i) => {
      const img = document.createElement("img");
      img.src = logo;
      img.alt = "";
      circles[i].appendChild(img);
    });
  }

  function scheduleNext() {
    scheduled?.kill();
    scheduled = gsap.delayedCall(SWAP_INTERVAL, swapAll);
  }

  function swapAll() {
    const allImgs = circles
      .map((c) => c.querySelector<HTMLImageElement>("img"))
      .filter((img): img is HTMLImageElement => img !== null);
    gsap.killTweensOf(allImgs);
    allImgs.forEach((img, i) => {
      img.src = circleLogos[i];
    });
    gsap.set(allImgs, { autoAlpha: 1 });

    // Outgoing logos shuffled → в хвост очереди
    // Затем берём первые circles.length из головы очереди
    queue.push(...shuffle([...circleLogos]));
    const incoming = queue.splice(0, circles.length);

    incoming.forEach((newLogo, i) => {
      const img = allImgs[i];
      if (!img) return;
      circleLogos[i] = newLogo;
      gsap.to(img, {
        autoAlpha: 0,
        duration: FADE_DURATION,
        ease: "power2.inOut",
        onComplete: () => {
          img.src = newLogo;
          gsap.to(img, {
            autoAlpha: 1,
            duration: FADE_DURATION,
            ease: "power2.inOut",
          });
        },
      });
    });

    scheduleNext();
  }

  function setup() {
    cleanup();
    init();
    const swappable = circles.length > 0 && ALL_LOGOS.length > circles.length;
    if (btn) btn.hidden = !swappable;
    if (swappable) scheduleNext();
  }

  setup();

  window.matchMedia("(max-width: 576px)").addEventListener("change", setup);

  btn?.addEventListener("click", (e) => {
    e.preventDefault();
    swapAll();
  });
}
