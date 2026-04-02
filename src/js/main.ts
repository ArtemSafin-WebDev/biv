import "virtual:svg-icons-register";
import "../scss/style.scss";
import "./smooth-scroll";
import ui from "./ui";
import sections from "./sections";

import FormValidator from "./classes/facades/FormValidator";

declare global {
  interface Window {
    innoApi: {
      Validator: typeof FormValidator;
    };
  }
}

window.innoApi = { Validator: FormValidator };

ui();
sections();
