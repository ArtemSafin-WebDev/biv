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
  let circleLogos: (string | null)[] = [];
  let hiddenPool: string[] = [];
  let scheduled: gsap.core.Tween | null = null;

  function getVisibleCircles() {
    return [
      ...el.querySelectorAll<HTMLElement>("[data-leaders-circle]"),
    ].filter((el) => el.offsetParent !== null);
  }

  function cleanup() {
    scheduled?.kill();
    scheduled = null;
    circles.forEach((c) => c.querySelector("img")?.remove());
  }

  function init() {
    circles = getVisibleCircles();
    circleLogos = circles.map(() => null);
    const shuffled = shuffle([...ALL_LOGOS]);
    hiddenPool = shuffled.slice(circles.length);
    shuffled.slice(0, circles.length).forEach((logo, i) => {
      circleLogos[i] = logo;
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
    circles.forEach((circle, i) => {
      const logo = circleLogos[i];
      const img = circle.querySelector<HTMLImageElement>("img");
      if (img && logo) img.src = logo;
    });
    gsap.set(allImgs, { autoAlpha: 1 });

    const filled = shuffle(circleLogos.flatMap((l, i) => (l ? [i] : [])));
    const swapCount = Math.min(filled.length, hiddenPool.length);
    if (!swapCount) return;

    const targets = filled.slice(0, swapCount);
    const nextLogos = shuffle([...hiddenPool]).slice(0, swapCount);
    const oldLogos = targets.map((i) => circleLogos[i]!);

    targets.forEach((circleIdx, i) => {
      const img = circles[circleIdx].querySelector<HTMLImageElement>("img");
      if (!img) return;
      const newLogo = nextLogos[i];
      circleLogos[circleIdx] = newLogo;
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

    hiddenPool = [
      ...hiddenPool.filter((l) => !nextLogos.includes(l)),
      ...oldLogos,
    ];

    scheduleNext();
  }

  function setup() {
    cleanup();
    init();
    scheduleNext();
  }

  setup();

  window.matchMedia("(max-width: 576px)").addEventListener("change", setup);

  btn?.addEventListener("click", (e) => {
    e.preventDefault();
    swapAll();
  });
}
