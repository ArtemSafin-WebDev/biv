import { ScrollTrigger } from "gsap/ScrollTrigger";
import Component from "../Component";
import Accordion from "./Accordion";
import Tabs from "./Tabs";

class CareerVacancies extends Component {
  private readonly tabs: Tabs;
  private readonly accordions: Accordion[] = [];
  private readonly moreButtons: HTMLButtonElement[];
  private readonly pageSize = 6;

  constructor(element: HTMLElement) {
    super(element);
    const panels = Array.from(
      element.querySelectorAll<HTMLElement>(".career-vacancies__panel")
    );
    panels.forEach((panel) => {
      const group: Accordion[] = [];
      panel.querySelectorAll<HTMLElement>(".vacancy-card").forEach((card) => {
        const accordion = new Accordion(card, group, {
          btnSelector: ".vacancy-card__toggle",
          dropdownSelector: ".vacancy-card__dropdown",
          onHeightChange: this.refresh,
        });
        accordion.close();
        group.push(accordion);
        this.accordions.push(accordion);
      });
    });
    this.moreButtons = Array.from(
      element.querySelectorAll<HTMLButtonElement>(".career-vacancies__more")
    );
    this.moreButtons.forEach((button) => {
      button.addEventListener("click", this.showMore);
    });
    this.tabs = new Tabs(element, {
      selectors: {
        root: ".js-career-vacancies",
        btn: ".career-vacancies__tab",
        item: ".career-vacancies__panel",
      },
      onTabChange: () => {
        this.accordions.forEach((accordion) => accordion.close());
        this.refresh();
      },
    });
  }

  private refresh = () => ScrollTrigger.refresh();

  private showMore = (event: MouseEvent) => {
    const button = event.currentTarget as HTMLButtonElement;
    const panel = button.closest<HTMLElement>(".career-vacancies__panel");
    if (!panel) return;
    panel.querySelector(".career-vacancies__list")?.classList.add("is-expanded");
    const nextButton = panel.querySelectorAll<HTMLButtonElement>(".vacancy-card__toggle")[this.pageSize];
    nextButton?.focus({ preventScroll: true });
    this.refresh();
  };

  public destroy() {
    this.tabs.destroy();
    this.accordions.forEach((accordion) => accordion.destroy());
    this.moreButtons.forEach((button) => {
      button.removeEventListener("click", this.showMore);
    });
    this.unregister();
  }
}

export default CareerVacancies;
