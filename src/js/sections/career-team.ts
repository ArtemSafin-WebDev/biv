import CareerTeam from "../classes/components/CareerTeam";

export default function careerTeam() {
  document.querySelectorAll<HTMLElement>(".js-career-team").forEach((section) => {
    if (!CareerTeam.getInstanceFor(section)) {
      new CareerTeam(section);
    }
  });
}
