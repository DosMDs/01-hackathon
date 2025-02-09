import { Module } from "../core/module";

class ResetModule extends Module {
    constructor() {
        super("reset", "Выполнить сброс");
        this.state = {
            saveElements: [
                document.getElementById("menu"),
                document.querySelector(".modal-overlay")
            ]
        }
    }

    trigger() {
        document.body.replaceChildren();
        document.body.append(...this.state.saveElements);
        console.log(document.querySelectorAll("audio"));
    }
}

export default ResetModule