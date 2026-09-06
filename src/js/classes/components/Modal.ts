import Component from "../Component";

class Modal extends Component {
  private readonly dialog: HTMLDialogElement;
  private readonly triggers: HTMLElement[];
  private readonly closeButtons: HTMLButtonElement[];
  private activeTrigger: HTMLElement | null = null;

  constructor(dialog: HTMLDialogElement) {
    super(dialog);
    this.dialog = dialog;
    this.triggers = Array.from(
      document.querySelectorAll<HTMLElement>("[data-modal-open]")
    ).filter((trigger) => trigger.dataset.modalOpen === dialog.id);
    this.closeButtons = Array.from(
      this.dialog.querySelectorAll<HTMLButtonElement>("[data-modal-close]")
    );

    this.triggers.forEach((trigger) => {
      trigger.addEventListener("click", this.handleTriggerClick);
    });
    this.closeButtons.forEach((button) => {
      button.addEventListener("click", this.close);
    });
    this.dialog.addEventListener("click", this.handleDialogClick);
    this.dialog.addEventListener("close", this.handleClose);
  }

  public open = () => {
    if (this.dialog.open) return;

    this.activeTrigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    this.dialog.showModal();
    document.body.classList.add("modal-open");
  };

  public close = () => {
    if (!this.dialog.open) return;
    this.dialog.close();
  };

  public destroy() {
    this.triggers.forEach((trigger) => {
      trigger.removeEventListener("click", this.handleTriggerClick);
    });
    this.closeButtons.forEach((button) => {
      button.removeEventListener("click", this.close);
    });
    this.dialog.removeEventListener("click", this.handleDialogClick);
    this.dialog.removeEventListener("close", this.handleClose);
    this.close();
    document.body.classList.remove("modal-open");
    this.unregister();
  }

  private handleTriggerClick = (event: MouseEvent) => {
    event.preventDefault();
    this.open();
  };

  private handleDialogClick = (event: MouseEvent) => {
    if (event.target === this.dialog) this.close();
  };

  private handleClose = () => {
    document.body.classList.remove("modal-open");
    this.activeTrigger?.focus();
    this.activeTrigger = null;
  };
}

export default Modal;
