import BurgerMenu from "../classes/components/BurgerMenu";

export default function burgerMenu() {
  const headers = Array.from(document.querySelectorAll<HTMLElement>(".page-header"));
  headers.forEach((header) => {
    new BurgerMenu(header);
  });
}
