import ServicesShowMore from "../classes/components/ServicesShowMore";

export default function services() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>(".services"));
  sections.forEach((section) => {
    new ServicesShowMore(section);
  });
}
