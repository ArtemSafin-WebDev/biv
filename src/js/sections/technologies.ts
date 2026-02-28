import TechnologiesCloudSlider from "../classes/components/TechnologiesCloudSlider";

export default function technologies() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(".technologies")
  );
  sections.forEach((section) => {
    new TechnologiesCloudSlider(section);
  });
}
