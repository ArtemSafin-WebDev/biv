(function () {
  "use strict";

  function initForms() {
    var Validator = window.innoApi && window.innoApi.Validator;
    if (!Validator) {
      console.warn("backend.js: window.innoApi.Validator not found");
      return;
    }

    var forms = Array.from(document.querySelectorAll("form.js-form"));

    forms.forEach(function (form) {
      var validator = new Validator(form);

      form.addEventListener("submit", function (e) {
        if (!validator.validate()) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initForms);
  } else {
    initForms();
  }
})();
