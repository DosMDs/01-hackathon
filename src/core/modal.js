class Modal {
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
    this.modal.style.display = "block";
  }

  close() {
    this.modal.style.display = "none";
    this.modalTitle.innerHTML = "";
    this.modalBody.innerHTML = "";
  }
}

export default Modal;
