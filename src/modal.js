export class Modal {
  constructor() {
    this.modal = document.querySelector(".modal-overlay");
    this.modalTitle = document.querySelector(".modal__title");
    this.modalBody = document.querySelector(".modal__body");
    this.modalButtons = document.querySelector(".modal__buttons");

    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    });
  }

  open(title, content = "") {
    this.modalTitle.innerHTML = title;
    this.modalBody.innerHTML = content;
    this.modal.classList.toggle("modal-overlay_hidden");
    this._addButtons();
  }

  _addButtons() {
    const buttonOK = document.createElement("button");
    buttonOK.classList.add("modal__button", "modal__confirm-button");
    buttonOK.textContent = "OK";
    this.modalButtons.appendChild(buttonOK);

    buttonOK.addEventListener("click", (event) => this.close());
  }

  close() {
    this.modal.classList.toggle("modal-overlay_hidden");
    this.modalTitle.innerHTML = "";
    this.modalBody.innerHTML = "";
    this.modalButtons.replaceChildren();
  }
}

export class InputModal extends Modal {
  constructor(closeWithResult, inputType = "text", placeholder = "") {
    super();
    this.state = {
      closeWithResult,
      inputType,
      placeholder,
    };
  }

  _addButtons() {
    const form = document.createElement("form");
    form.classList.add("modal__form");

    const label = document.createElement("label");
    label.classList.add("modal__input-label");
    label.textContent = "Введите значение:";

    const input = document.createElement("input");
    input.classList.add("modal__input");
    input.type = this.state.inputType;
    input.placeholder = this.state.placeholder;
    input.required = true;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("modal__buttons-container");

    const buttonOK = document.createElement("button");
    buttonOK.classList.add("modal__button", "modal__confirm-button");
    buttonOK.type = "submit";
    buttonOK.textContent = "OK";

    const buttonCancel = document.createElement("button");
    buttonCancel.classList.add("modal__button", "modal__cancel-button");
    buttonCancel.type = "button";
    buttonCancel.textContent = "Отмена";

    buttonsContainer.append(buttonOK, buttonCancel);

    label.append(input);
    form.append(label, buttonsContainer);
    this.modalButtons.appendChild(form);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (input.checkValidity()) {
        this.close();
        this.state.closeWithResult(input.value);
      }
    });

    buttonCancel.addEventListener("click", () => this.close());
    input.focus();
  }
}
