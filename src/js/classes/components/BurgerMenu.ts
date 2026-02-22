import Component from "../Component";

class BurgerMenu extends Component {
  private readonly desktopBreakpoint = 1024;
  private burgerButton: HTMLButtonElement | null;
  private menu: HTMLElement | null;
  private links: HTMLAnchorElement[];

  constructor(element: HTMLElement) {
    super(element);
    this.burgerButton =
      this.element.querySelector<HTMLButtonElement>(".page-header__burger");
    this.menu = this.element.querySelector<HTMLElement>(".page-header__menu");
    this.links = Array.from(
      this.element.querySelectorAll<HTMLAnchorElement>(".page-header__nav-link")
    );

    if (!this.burgerButton || !this.menu) return;

    this.burgerButton.addEventListener("click", this.handleBurgerClick);
    document.addEventListener("keydown", this.handleEscape);
    window.addEventListener("resize", this.handleResize);
    this.links.forEach((link) => link.addEventListener("click", this.close));
  }

  public open = () => {
    if (!this.burgerButton || !this.menu) return;

    this.menu.classList.add("active");
    this.burgerButton.classList.add("active");
    this.burgerButton.setAttribute("aria-expanded", "true");
    this.burgerButton.setAttribute("aria-label", "Закрыть меню");
    document.body.classList.add("menu-open");
  };

  public close = () => {
    if (!this.burgerButton || !this.menu) return;

    this.menu.classList.remove("active");
    this.burgerButton.classList.remove("active");
    this.burgerButton.setAttribute("aria-expanded", "false");
    this.burgerButton.setAttribute("aria-label", "Открыть меню");
    document.body.classList.remove("menu-open");
  };

  public destroy() {
    this.close();
    this.burgerButton?.removeEventListener("click", this.handleBurgerClick);
    document.removeEventListener("keydown", this.handleEscape);
    window.removeEventListener("resize", this.handleResize);
    this.links.forEach((link) => link.removeEventListener("click", this.close));
    this.unregister();
  }

  private toggle = () => {
    if (!this.menu) return;
    if (this.menu.classList.contains("active")) {
      this.close();
      return;
    }
    this.open();
  };

  private handleBurgerClick = (event: MouseEvent) => {
    event.preventDefault();
    this.toggle();
  };

  private handleEscape = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    this.close();
  };

  private handleResize = () => {
    if (window.innerWidth <= this.desktopBreakpoint) return;
    this.close();
  };
}

export default BurgerMenu;
