import Component from "../Component";

class CareerAboutCounters extends Component {
  private static readonly duration = 1600;

  private readonly counters: HTMLElement[];
  private observer: IntersectionObserver | null = null;
  private animationFrameId: number | null = null;
  private started = false;

  constructor(element: HTMLElement) {
    super(element);

    this.counters = Array.from(
      this.element.querySelectorAll<HTMLElement>(".js-career-about-counter")
    );

    if (this.counters.length === 0) return;

    this.render(0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.renderTargets();
      return;
    }

    if (!("IntersectionObserver" in window)) {
      this.start();
      return;
    }

    this.observer = new IntersectionObserver(this.handleIntersection, {
      rootMargin: "0px 0px -15% 0px",
      threshold: 0.1,
    });
    this.observer.observe(this.element);
  }

  public destroy() {
    this.observer?.disconnect();

    if (this.animationFrameId !== null) {
      window.cancelAnimationFrame(this.animationFrameId);
    }

    this.unregister();
  }

  private handleIntersection: IntersectionObserverCallback = (entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;

    this.observer?.disconnect();
    this.start();
  };

  private start() {
    if (this.started) return;
    this.started = true;

    const startedAt = performance.now();

    const update = (now: number) => {
      const progress = Math.min(
        (now - startedAt) / CareerAboutCounters.duration,
        1
      );
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      this.counters.forEach((counter) => {
        const target = Number(counter.dataset.count);
        counter.textContent = String(Math.round(target * easedProgress));
      });

      if (progress < 1) {
        this.animationFrameId = window.requestAnimationFrame(update);
      } else {
        this.animationFrameId = null;
        this.renderTargets();
      }
    };

    this.animationFrameId = window.requestAnimationFrame(update);
  }

  private render(value: number) {
    this.counters.forEach((counter) => {
      counter.textContent = String(value);
    });
  }

  private renderTargets() {
    this.counters.forEach((counter) => {
      counter.textContent = counter.dataset.count ?? "0";
    });
  }
}

export default CareerAboutCounters;
