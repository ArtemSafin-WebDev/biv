import CareerStoriesSlider from "../classes/components/CareerStoriesSlider";

export default function careerStories() {
  document.querySelectorAll<HTMLElement>(".js-career-stories").forEach((section) => {
    if (!CareerStoriesSlider.getInstanceFor(section)) {
      new CareerStoriesSlider(section);
    }
  });
}
