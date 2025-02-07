class Modal {
  constructor(isQuestion = false) {
    this.state = {
      isQuestion: isQuestion
    };

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
    this.modal.classList.toggle('modal-overlay_hidden');
  }

  close() {
    this.modal.classList.toggle('modal-overlay_hidden');
    this.modalTitle.innerHTML = '';
    this.modalBody.innerHTML = '';
  }
}

export default Modal;
