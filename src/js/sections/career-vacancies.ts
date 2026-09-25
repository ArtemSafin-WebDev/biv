import CareerVacancies from "../classes/components/CareerVacancies";

export default function careerVacancies() {
  document.querySelectorAll<HTMLElement>(".js-career-vacancies").forEach((section) => {
    new CareerVacancies(section);
  });
}
