import Modal from "../classes/components/Modal";

export default function modals() {
  const dialogs = Array.from(
    document.querySelectorAll<HTMLDialogElement>("dialog.js-modal")
  );

  dialogs.forEach((dialog) => {
    new Modal(dialog);
  });
}
