import CareerAboutCounters from "../classes/components/CareerAboutCounters";

export default function careerAbout() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(".js-career-about-counters")
  );

  sections.forEach((section) => {
    new CareerAboutCounters(section);
  });
}
