import { gsap } from "gsap";
import Swiper from "swiper";
import Component from "../Component";
import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";

type Direction = -1 | 1;

interface StoryGeometry {
  step: number;
  photoScale: number;
  photoX: number;
}

interface StoryDrag {
  pointerId: number;
  startX: number;
  startY: number;
  direction: Direction;
  progress: number;
  dragging: boolean;
  geometry: StoryGeometry;
}

interface StorySlide {
  element: HTMLElement;
  button: HTMLButtonElement;
  background: HTMLElement;
  portrait: HTMLElement;
  color: HTMLImageElement;
  play: SVGElement;
}

class CareerStoriesSlider extends Component {
  private readonly slides: StorySlide[];
  private readonly stories: HTMLElement[];
  private readonly stage: HTMLElement | null;
  private readonly slider: HTMLElement | null;
  private readonly details: HTMLElement | null;
  private readonly mobile = window.matchMedia(
    `(max-width: ${MOBILE_BREAKPOINT}px)`
  );
  private readonly reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  private readonly resizeObserver: ResizeObserver;
  private swiper: Swiper | null = null;
  private animation: gsap.core.Timeline | null = null;
  private activeIndex = 0;
  private queuedDirection: Direction | null = null;
  private pointer: StoryDrag | null = null;
  private dragAnimation: gsap.core.Tween | null = null;
  private suppressClick = false;

  constructor(element: HTMLElement) {
    super(element);

    this.stage = element.querySelector(".career-stories__stage");
    this.slider = element.querySelector(".career-stories__slider");
    this.details = element.querySelector(".career-stories__details");
    this.stories = Array.from(
      element.querySelectorAll<HTMLElement>(".career-stories__story")
    );
    this.slides = Array.from(
      element.querySelectorAll<HTMLElement>(".career-stories__slide")
    ).flatMap((slide) => {
      const button = slide.querySelector<HTMLButtonElement>(".career-story-card");
      const background = slide.querySelector<HTMLElement>(".career-story-card__background");
      const portrait = slide.querySelector<HTMLElement>(".career-story-card__portrait");
      const color = slide.querySelector<HTMLImageElement>(".career-story-card__image--color");
      const play = slide.querySelector<SVGElement>(".career-story-card__play");
      return button && background && portrait && color && play
        ? [{ element: slide, button, background, portrait, color, play }]
        : [];
    });
    this.resizeObserver = new ResizeObserver(this.handleResize);

    if (!this.stage || !this.slider || !this.slides.length) return;

    this.element.addEventListener("click", this.handleClick);
    this.element.addEventListener("keydown", this.handleKeydown);
    this.stage.addEventListener("pointerdown", this.handlePointerDown);
    window.addEventListener("pointermove", this.handlePointerMove, { passive: false });
    window.addEventListener("pointerup", this.handlePointerUp);
    window.addEventListener("pointercancel", this.handlePointerCancel);
    window.addEventListener("blur", this.handlePointerCancel);
    this.mobile.addEventListener("change", this.setupMode);
    this.reducedMotion.addEventListener("change", this.setupMode);
    this.setupMode();
    this.resizeObserver.observe(this.stage);
  }

  public destroy() {
    this.resizeObserver.disconnect();
    this.mobile.removeEventListener("change", this.setupMode);
    this.reducedMotion.removeEventListener("change", this.setupMode);
    this.element.removeEventListener("click", this.handleClick);
    this.element.removeEventListener("keydown", this.handleKeydown);
    this.stage?.removeEventListener("pointerdown", this.handlePointerDown);
    window.removeEventListener("pointermove", this.handlePointerMove);
    window.removeEventListener("pointerup", this.handlePointerUp);
    window.removeEventListener("pointercancel", this.handlePointerCancel);
    window.removeEventListener("blur", this.handlePointerCancel);
    this.stopAnimation();
    this.swiper?.destroy(true, true);
    this.swiper = null;
    this.resetStyles();
    this.slides.forEach((slide) => {
      slide.element.removeAttribute("aria-hidden");
      slide.button.tabIndex = -1;
      slide.button.setAttribute("aria-disabled", "true");
      slide.button.removeAttribute("aria-current");
    });
    this.unregister();
  }

  private wrap(index: number) {
    return (index + this.slides.length) % this.slides.length;
  }

  private offset(index: number) {
    let offset = this.wrap(index - this.activeIndex);
    if (offset > this.slides.length / 2) offset -= this.slides.length;
    return offset;
  }

  private stopAnimation() {
    this.releasePointer();
    this.dragAnimation?.kill();
    this.dragAnimation = null;
    this.animation?.kill();
    this.animation = null;
    this.queuedDirection = null;
    if (this.details) gsap.set(this.details, { clearProps: "opacity,transform" });
  }

  private resetStyles() {
    this.slides.forEach((slide) => {
      gsap.set(
        [slide.element, slide.background, slide.portrait, slide.color, slide.play],
        { clearProps: "all" }
      );
    });
  }

  private setupMode = () => {
    if (!this.slider) return;
    this.stopAnimation();
    this.swiper?.destroy(true, true);
    this.swiper = null;
    this.resetStyles();
    // Swiper reorders loop slides. Restore their data order before reinitializing.
    this.slider.querySelector(".career-stories__list")?.append(
      ...this.slides.map((slide) => slide.element)
    );

    if (this.mobile.matches) {
      this.swiper = new Swiper(this.slider, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: this.slides.length > 1,
        initialSlide: this.activeIndex,
        speed: this.reducedMotion.matches ? 0 : 600,
        on: {
          slideChange: (swiper) => {
            this.activeIndex = swiper.realIndex;
            this.updateContent();
            this.updateAccessibility();
          },
        },
      });
    } else {
      this.renderDesktop();
    }

    this.updateContent();
    this.updateAccessibility();
  };

  private geometry(): StoryGeometry | null {
    const slide = this.slides[0];
    if (!this.stage || !slide) return null;
    const stageWidth = this.stage.getBoundingClientRect().width;
    const sideWidth = slide.background.offsetWidth;
    const styles = getComputedStyle(slide.background);
    const padding = parseFloat(styles.paddingTop);
    const sidePhoto = slide.background.offsetHeight - padding * 2;
    return {
      step: (stageWidth - sideWidth) / 2,
      photoScale: sidePhoto / slide.portrait.offsetWidth,
      photoX: -(sideWidth - sidePhoto) / 2 + padding,
    };
  }

  private renderDesktop() {
    const geometry = this.geometry();
    if (!geometry) return;
    this.slides.forEach((slide, index) => {
      const offset = this.offset(index);
      const active = offset === 0;
      gsap.set(slide.element, {
        x: offset * geometry.step,
        autoAlpha: Math.abs(offset) <= 1 ? 1 : 0,
      });
      gsap.set(slide.background, { opacity: active ? 0 : 1 });
      gsap.set(slide.portrait, {
        x: active ? 0 : geometry.photoX,
        scale: active ? 1 : geometry.photoScale,
      });
      gsap.set(slide.color, { opacity: active ? 1 : 0 });
      gsap.set(slide.play, { opacity: active ? 1 : 0 });
    });
    this.updateAccessibility();
  }

  private move(direction: Direction) {
    if (this.slides.length < 2) return;
    if (this.swiper) {
      if (direction === 1) this.swiper.slideNext();
      else this.swiper.slidePrev();
      return;
    }
    if (this.pointer) return;
    // Keep one requested step, so fast clicks never interrupt a photo in transit.
    if (this.animation || this.dragAnimation) {
      this.queuedDirection = direction;
      return;
    }
    const geometry = this.geometry();
    if (!geometry) return;
    const oldOffsets = this.slides.map((_, index) => this.offset(index));
    const restoreFocus = this.slides.some(
      (slide) => slide.button === document.activeElement
    );
    this.activeIndex = this.wrap(this.activeIndex + direction);

    if (this.reducedMotion.matches) {
      this.renderDesktop();
      this.updateContent();
      this.restoreFocus(restoreFocus, direction);
      return;
    }

    const duration = 0.8;
    this.animation = gsap.timeline({
      defaults: { duration, ease: "power3.inOut" },
      onComplete: () => {
        this.animation = null;
        this.renderDesktop();
        this.updateContent();
        this.restoreFocus(restoreFocus, direction);
        const queued = this.queuedDirection;
        this.queuedDirection = null;
        if (queued) this.move(queued);
      },
    });

    this.slides.forEach((slide, index) => {
      const from = oldOffsets[index];
      const to = this.offset(index);
      if (Math.abs(from) > 1 && Math.abs(to) > 1) return;
      const entering = Math.abs(from) > 1;
      const leaving = Math.abs(to) > 1;
      const active = to === 0;
      // Hidden slides cross the loop boundary off stage, never through the centre.
      if (entering) {
        gsap.set(slide.element, { x: direction * geometry.step * 2, autoAlpha: 0 });
      }
      this.animation?.to(slide.element, {
        x: (leaving ? -direction * 2 : to) * geometry.step,
      }, 0);
      this.animation?.to(slide.element, {
        autoAlpha: leaving ? 0 : 1,
        duration: leaving ? 0.2 : entering ? 0.4 : duration,
      }, entering ? 0.2 : 0);
      this.animation?.to(slide.background, { opacity: active ? 0 : 1 }, 0);
      this.animation?.to(slide.portrait, {
        x: active ? 0 : geometry.photoX,
        scale: active ? 1 : geometry.photoScale,
      }, 0);
      this.animation?.to(slide.color, { opacity: active ? 1 : 0 }, 0);
      this.animation?.to(slide.play, {
        opacity: active ? 1 : 0,
        duration: 0.25,
      }, active ? 0.55 : 0);
    });

    if (this.details) {
      this.animation.to(this.details, { opacity: 0, y: "0.6rem", duration: 0.2 }, 0);
      this.animation.call(() => this.updateContent(), [], 0.2);
      this.animation.to(this.details, { opacity: 1, y: 0, duration: 0.35 }, 0.4);
    }
  }

  private restoreFocus(restore: boolean, direction: Direction) {
    if (restore) {
      this.slides[this.wrap(this.activeIndex + direction)]?.button.focus({ preventScroll: true });
    }
  }

  private updateContent() {
    this.stories.forEach((story, index) => {
      story.hidden = index !== this.activeIndex;
    });
    const counter = this.element.querySelector(".career-stories__counter");
    if (counter) counter.textContent = `${this.activeIndex + 1}/${this.slides.length}`;
    const status = this.element.querySelector(".career-stories__status");
    const announcement = `История ${this.activeIndex + 1} из ${this.slides.length}`;
    if (status && status.textContent !== announcement) status.textContent = announcement;
  }

  private updateAccessibility() {
    this.slides.forEach((slide, index) => {
      const offset = this.offset(index);
      const visible = this.mobile.matches ? offset === 0 : Math.abs(offset) <= 1;
      const interactive = visible;
      slide.element.setAttribute("aria-hidden", String(!visible));
      slide.button.tabIndex = interactive ? 0 : -1;
      slide.button.setAttribute("aria-disabled", String(!interactive));
      slide.button.setAttribute("aria-current", String(offset === 0));
      slide.button.setAttribute("aria-label", offset === 0
        ? `Смотреть видео: история ${index + 1} из ${this.slides.length}`
        : interactive
        ? `${offset < 0 ? "Предыдущая" : "Следующая"} история (${index + 1} из ${this.slides.length})`
        : `История ${index + 1} из ${this.slides.length}`);
    });
  }

  private handleResize = () => {
    if (this.mobile.matches) return;
    this.stopAnimation();
    this.renderDesktop();
    this.updateContent();
  };

  private handleClick = (event: MouseEvent) => {
    if (this.suppressClick) {
      this.suppressClick = false;
      return;
    }
    if (!(event.target instanceof Element)) return;
    if (event.target.closest(".career-stories__arrow--prev")) this.move(-1);
    else if (event.target.closest(".career-stories__arrow--next")) this.move(1);
    else {
      const slide = event.target.closest<HTMLElement>(".career-stories__slide");
      if (!slide || this.animation || this.dragAnimation || this.swiper?.animating) return;
      const index = this.slides.findIndex((item) => item.element === slide);
      const offset = this.offset(index);
      if (offset === 0) {
        // The video popup can subscribe to this event when it is implemented.
        this.element.dispatchEvent(new CustomEvent("career-story:play", {
          bubbles: true,
          detail: { index },
        }));
      } else if (!this.mobile.matches && (offset === -1 || offset === 1)) {
        this.move(offset);
      }
    }
  };

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    this.move(event.key === "ArrowRight" ? 1 : -1);
  };

  private handlePointerDown = (event: PointerEvent) => {
    this.suppressClick = false;
    if (
      this.mobile.matches || !event.isPrimary || event.button !== 0 ||
      this.pointer || this.animation || this.dragAnimation || this.slides.length < 2
    ) return;
    const geometry = this.geometry();
    if (!geometry || geometry.step <= 0) return;
    this.pointer = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      direction: 1,
      progress: 0,
      dragging: false,
      geometry,
    };
  };

  private handlePointerMove = (event: PointerEvent) => {
    const pointer = this.pointer;
    if (!pointer || event.pointerId !== pointer.pointerId) return;
    const x = event.clientX - pointer.startX;
    const y = event.clientY - pointer.startY;
    if (!pointer.dragging) {
      if (Math.max(Math.abs(x), Math.abs(y)) < 6) return;
      if (Math.abs(y) > Math.abs(x)) {
        this.releasePointer();
        return;
      }
      pointer.dragging = true;
      this.suppressClick = true;
      this.stage?.classList.add("is-dragging");
    }

    if (event.cancelable) event.preventDefault();
    if (Math.abs(x) >= 6) pointer.direction = x < 0 ? 1 : -1;
    pointer.progress = gsap.utils.clamp(-1, 1, -x / pointer.geometry.step);
    this.renderDrag(pointer);
  };

  private renderDrag({ progress, geometry }: StoryDrag) {
    const direction = progress < 0 ? -1 : 1;
    const amount = Math.abs(progress);
    this.slides.forEach((slide, index) => {
      const from = this.offset(index);
      const to = from - direction;
      const relevant = Math.abs(from) <= 1 || Math.abs(to) <= 1;
      const entering = Math.abs(from) > 1;
      const leaving = Math.abs(to) > 1;
      const focus = from === 0 ? 1 - amount : to === 0 ? amount : 0;
      // Retire the outer neighbour before revealing its replacement.
      const opacity = !relevant ? 0 : entering
        ? gsap.utils.clamp(0, 1, (amount - 0.25) * 2)
        : leaving ? gsap.utils.clamp(0, 1, 1 - amount * 4) : 1;
      gsap.set(slide.element, {
        x: (from - progress) * geometry.step,
        autoAlpha: opacity,
      });
      gsap.set(slide.background, { opacity: 1 - focus });
      gsap.set(slide.portrait, {
        x: geometry.photoX * (1 - focus),
        scale: geometry.photoScale + (1 - geometry.photoScale) * focus,
      });
      gsap.set(slide.color, { opacity: focus });
      gsap.set(slide.play, { opacity: Math.max(0, (focus - 0.65) / 0.35) });
    });
  }

  private handlePointerUp = (event: PointerEvent) => {
    const pointer = this.pointer;
    if (!pointer || event.pointerId !== pointer.pointerId) return;
    // Fast swipes can release beyond the last delivered pointermove event.
    this.handlePointerMove(event);
    if (this.pointer !== pointer) return;
    this.releasePointer();
    if (!pointer.dragging) return;

    // Once a horizontal swipe starts, releasing always selects its neighbour.
    this.settleDrag(pointer, pointer.direction);
  };

  private releasePointer() {
    this.pointer = null;
    this.stage?.classList.remove("is-dragging");
  }

  private settleDrag(pointer: StoryDrag, target: Direction) {
    const finish = () => {
      this.dragAnimation = null;
      this.activeIndex = this.wrap(this.activeIndex + target);
      this.renderDesktop();
      this.updateContent();
      // A drag can move the focused card into a hidden slot.
      const focused = this.slides.find((slide) => slide.button === document.activeElement);
      if (focused?.element.getAttribute("aria-hidden") === "true") {
        this.slides[this.activeIndex]?.button.focus({ preventScroll: true });
      }
      const queued = this.queuedDirection;
      this.queuedDirection = null;
      if (queued) this.move(queued);
    };
    if (this.reducedMotion.matches) {
      finish();
      return;
    }
    this.dragAnimation = gsap.to(pointer, {
      progress: target,
      duration: 0.2 + Math.abs(target - pointer.progress) * 0.35,
      ease: "power3.out",
      onUpdate: () => this.renderDrag(pointer),
      onComplete: finish,
    });
  }

  private handlePointerCancel = (event: PointerEvent | Event) => {
    const pointer = this.pointer;
    if (!pointer || (event instanceof PointerEvent && event.pointerId !== pointer.pointerId)) return;
    this.releasePointer();
    if (pointer.dragging) this.settleDrag(pointer, pointer.direction);
  };
}

export default CareerStoriesSlider;
