import { ScrollTrigger } from "gsap/ScrollTrigger";
import Component from "../Component";

class CareerTeam extends Component {
  private readonly items: HTMLElement[];
  private readonly moreButton: HTMLButtonElement | null;
  private observer: IntersectionObserver | null = null;

  constructor(element: HTMLElement) {
    super(element);

    this.items = Array.from(element.querySelectorAll<HTMLElement>(".career-team__item"));
    this.moreButton = element.querySelector<HTMLButtonElement>(".career-team__more");
    this.moreButton?.addEventListener("click", this.showMore);
    element.classList.add("is-collapsible");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
      element.classList.add("is-animated");
      this.observer = new IntersectionObserver(this.reveal, {
        threshold: 0.1,
      });
      this.items.forEach((item) => this.observer?.observe(item));
    }
  }

  private reveal: IntersectionObserverCallback = (entries) => {
    entries.filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
      .forEach((entry, index) => {
        const item = entry.target as HTMLElement;
        item.style.setProperty("--reveal-delay", `${index * 0.1}s`);
        item.classList.add("is-visible");
        this.observer?.unobserve(item);
      });
  };

  private showMore = () => {
    const firstHidden = this.items.find((item) => item.getClientRects().length === 0);
    this.element.classList.add("is-expanded");
    this.moreButton?.setAttribute("aria-expanded", "true");
    firstHidden?.focus({ preventScroll: true });
    ScrollTrigger.refresh();
  };

  public destroy() {
    this.observer?.disconnect();
    this.moreButton?.removeEventListener("click", this.showMore);
    this.moreButton?.setAttribute("aria-expanded", "false");
    this.element.classList.remove("is-collapsible", "is-expanded", "is-animated");
    this.items.forEach((item) => {
      item.classList.remove("is-visible");
      item.style.removeProperty("--reveal-delay");
    });
    this.unregister();
  }
}

export default CareerTeam;
