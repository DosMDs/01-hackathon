class Modal {
  constructor(isInput = false, isQuestion = false) {
    this.state = {
      isInput: isInput,
      isQuestion: isQuestion
    };

    this.modal = document.querySelector('.modal-overlay');
    this.modalTitle = document.querySelector('.modal__title');
    this.modalBody = document.querySelector('.modal__body');
    this.modalButtons = document.querySelector('.modal__buttons');

    window.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    });
  }

  open(title, content = '') {
    this.modalTitle.innerHTML = title;
    this.modalBody.innerHTML = content;
    this.modal.classList.toggle('modal-overlay_hidden');
    if (this.state.isInput) {
      this._addInput();
    } else {
      this._addOkBtn();
    }
  }

  _addOkBtn() {
    const buttonOK = document.createElement('button');
    buttonOK.classList.add('modal__button', 'modal__confirm-button');
    buttonOK.textContent = 'OK';
    this.modalButtons.appendChild(buttonOK);

    buttonOK.addEventListener('click', (event) => this.close());
  }

  _addInput() {
    const mainForm = document.createElement('form');
    
  }

  close() {
    this.modal.classList.toggle('modal-overlay_hidden');
    this.modalTitle.innerHTML = '';
    this.modalBody.innerHTML = '';
    this.modalButtons.replaceChildren();
  }
}

export default Modal;
