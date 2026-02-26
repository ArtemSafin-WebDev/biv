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
  const section = document.querySelector(".leaders");
  if (!section) return;

  const ALL_LOGOS: string[] = JSON.parse(
    (section as HTMLElement).dataset.leadersLogos ?? "[]"
  );
  if (!ALL_LOGOS.length) return;

  const circles = [
    ...section.querySelectorAll<HTMLElement>("[data-leaders-circle]"),
  ];
  const btn = section.querySelector<HTMLElement>("[data-leaders-swap]");
  const VISIBLE_COUNT = circles.length;

  let circleLogos: (string | null)[] = circles.map(() => null);
  let hiddenPool: string[] = [];
  let scheduled: gsap.core.Tween | null = null;

  function init() {
    const shuffled = shuffle([...ALL_LOGOS]);
    hiddenPool = shuffled.slice(VISIBLE_COUNT);
    shuffled.slice(0, VISIBLE_COUNT).forEach((logo, i) => {
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
        opacity: 0,
        duration: FADE_DURATION,
        ease: "power2.inOut",
        onComplete: () => {
          img.src = newLogo;
          gsap.to(img, {
            opacity: 1,
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

  init();
  scheduleNext();

  btn?.addEventListener("click", (e) => {
    e.preventDefault();
    swapAll();
  });
}
