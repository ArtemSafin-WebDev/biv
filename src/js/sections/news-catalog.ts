export default function newsCatalog() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(".news-catalog"),
  );

  sections.forEach((section) => {
    const button = section.querySelector<HTMLButtonElement>(
      ".news-catalog__more",
    );

    if (!button) return;

    button.addEventListener("click", () => {
      section.classList.add("news-catalog--expanded");
    });
  });
}
