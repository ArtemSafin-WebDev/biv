import Component from "../Component";

interface TabsSelectors {
  root: string;
  btn: string;
  item: string;
}

interface TabsOptions {
  selectors: TabsSelectors;
  onTabChange?: (
    oldItem: HTMLElement | null,
    newItem: HTMLElement,
    index: number
  ) => void;
}

class Tabs extends Component {
  private btns: HTMLButtonElement[];
  private items: HTMLElement[];
  private activeIndex = -1;
  private rootSelector: string;
  private onTabChange?: TabsOptions["onTabChange"];

  constructor(element: HTMLElement, options: TabsOptions) {
    super(element);
    this.onTabChange = options?.onTabChange;
    this.rootSelector = options.selectors.root;
    const btnSelector = options.selectors.btn;
    const itemSelector = options.selectors.item;
    this.btns = this.queryOwn<HTMLButtonElement>(btnSelector);
    this.items = this.queryOwn<HTMLElement>(itemSelector);

    this.setActive(0);

    this.btns.forEach((btn) => {
      btn.addEventListener("click", this.handleClick);
      btn.addEventListener("keydown", this.handleKeyDown);
    });
  }

  private handleClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setActive(this.btns.indexOf(event.currentTarget as HTMLButtonElement));
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const button = event.currentTarget as HTMLButtonElement;
    if (button.getAttribute("role") !== "tab") return;
    const current = this.btns.indexOf(button);
    let index: number;
    switch (event.key) {
      case "ArrowRight": index = (current + 1) % this.btns.length; break;
      case "ArrowLeft": index = (current - 1 + this.btns.length) % this.btns.length; break;
      case "Home": index = 0; break;
      case "End": index = this.btns.length - 1; break;
      default: return;
    }
    event.preventDefault();
    this.setActive(index);
    this.btns[index]?.focus();
  };

  public destroy() {
    this.btns.forEach((btn) => {
      btn.removeEventListener("click", this.handleClick);
      btn.removeEventListener("keydown", this.handleKeyDown);
    });
    this.unregister();
  }

  private queryOwn<T extends HTMLElement>(selector: string): T[] {
    return Array.from(this.element.querySelectorAll<T>(selector)).filter(
      (el) => el.closest(this.rootSelector) === this.element
    );
  }

  public setActive(index: number) {
    if (index < 0 || index >= this.btns.length) {
      return;
    }

    const oldItem = this.activeIndex >= 0 ? this.items[this.activeIndex] : null;
    const newItem = this.items[index];
    this.btns.forEach((btn) => btn.classList.remove("active"));
    this.items.forEach((item) => item.classList.remove("active"));
    this.btns[index]?.classList.add("active");
    newItem?.classList.add("active");

    this.btns.forEach((btn, btnIndex) => {
      if (btn.getAttribute("role") !== "tab") return;
      btn.setAttribute("aria-selected", String(btnIndex === index));
      btn.tabIndex = btnIndex === index ? 0 : -1;
    });
    this.items.forEach((item, itemIndex) => {
      if (item.getAttribute("role") === "tabpanel") {
        item.hidden = itemIndex !== index;
      }
    });

    this.activeIndex = index;

    if (newItem) {
      this.onTabChange?.(oldItem ?? null, newItem, index);
    }
  }
}

export default Tabs;
