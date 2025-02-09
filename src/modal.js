export class Modal {
  constructor() {
    this.modal = document.querySelector('.modal-overlay');
    this.modalTitle = document.querySelector('.modal__title');
    this.modalBody = document.querySelector('.modal__body');
    this.modalButtons = document.querySelector('.modal__buttons');

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
    if (this.state.isQuestion) {
    } else {
      this._addOkBtn();
    }
  }

  _addOkBtn() {
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
  constructor(closeWithResult, inputType = 'text') {
    super();

    this.state = {
      closeWithResult: closeWithResult,
      inputType: inputType
    };
  }

  _addButtons() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.name = 'inputField';
    input.type = this.state.inputType;
    const buttonOK = document.createElement('button');
    buttonOK.classList.add('modal__button', 'modal__confirm-button');
    buttonOK.textContent = 'OK';
    form.append(input, buttonOK);
    this.modalButtons.appendChild(form);
    
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.state.closeWithResult(event);
      this.close();
    })
  }
}
