import Component from "../Component";

class ServicesShowMore extends Component {
  private static readonly defaultVisibleCount = 4;
  private static readonly collapsedLabel = "Показать еще";
  private static readonly expandedLabel = "Скрыть";

  private button: HTMLAnchorElement | HTMLButtonElement | null;
  private items: HTMLElement[];
  private hiddenItems: HTMLElement[];
  private expanded = false;

  constructor(element: HTMLElement) {
    super(element);

    this.button = this.element.querySelector<
      HTMLAnchorElement | HTMLButtonElement
    >(".services__show-more");
    this.items = Array.from(
      this.element.querySelectorAll<HTMLElement>(".services__item")
    );
    this.hiddenItems = this.items.slice(ServicesShowMore.defaultVisibleCount);

    if (!this.button) return;

    if (this.hiddenItems.length === 0) {
      this.button.hidden = true;
      return;
    }

    this.button.addEventListener("click", this.handleClick);
    this.applyState();
  }

  public destroy() {
    this.button?.removeEventListener("click", this.handleClick);
    this.hiddenItems.forEach((item) => {
      item.hidden = false;
    });
    this.items.forEach((item) => {
      item.classList.remove("services__item--last-visible");
    });
    this.unregister();
  }

  private handleClick = (event: Event) => {
    event.preventDefault();
    this.expanded = !this.expanded;
    this.applyState();
  };

  private applyState() {
    this.hiddenItems.forEach((item) => {
      item.hidden = !this.expanded;
    });
    this.updateButtonState();
    this.updateLastVisibleItem();
  }

  private updateButtonState() {
    if (!this.button) return;

    this.button.textContent = this.expanded
      ? ServicesShowMore.expandedLabel
      : ServicesShowMore.collapsedLabel;
    this.button.setAttribute("aria-expanded", String(this.expanded));
  }

  private updateLastVisibleItem() {
    this.items.forEach((item) => {
      item.classList.remove("services__item--last-visible");
    });

    const visibleItems = this.items.filter((item) => !item.hidden);
    const lastVisibleItem = visibleItems[visibleItems.length - 1];
    if (!lastVisibleItem) return;
    lastVisibleItem.classList.add("services__item--last-visible");
  }
}

export default ServicesShowMore;
