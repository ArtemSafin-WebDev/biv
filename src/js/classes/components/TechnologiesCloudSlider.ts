import Component from "../Component";

class TechnologiesCloudSlider extends Component {
  private static readonly slideDelayMs = 4000;
  private slides: HTMLElement[];
  private activeIndex: number;
  private intervalId: number | null = null;

  constructor(element: HTMLElement) {
    super(element);

    this.slides = Array.from(
      this.element.querySelectorAll<HTMLElement>(".technologies__cloud-slide")
    );
    this.activeIndex = this.getInitialIndex();
    this.showSlide(this.activeIndex);

    if (this.slides.length > 1) {
      this.start();
    }
  }

  public destroy() {
    this.stop();
    this.unregister();
  }

  private getInitialIndex() {
    const index = this.slides.findIndex((slide) =>
      slide.classList.contains("is-active")
    );
    return index < 0 ? 0 : index;
  }

  private start() {
    this.stop();
    this.intervalId = window.setInterval(() => {
      this.showNextSlide();
    }, TechnologiesCloudSlider.slideDelayMs);
  }

  private stop() {
    if (this.intervalId === null) return;
    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }

  private showNextSlide() {
    const nextIndex = (this.activeIndex + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  private showSlide(index: number) {
    this.slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === index;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    this.activeIndex = index;
  }
}

export default TechnologiesCloudSlider;
