import { Module } from "../core/module";
import { DioramsModule } from "./diorams.module";

class ResetModule extends Module {
  constructor(contextMenu) {
    super("reset", "Выполнить сброс");
    this.state = {
      saveElements: [
        document.getElementById("menu"),
        document.querySelector(".modal-overlay"),
      ],
      contextMenu: contextMenu,
    };
  }

  trigger() {
    this.state.contextMenu.modules.forEach((module) => {
      if (module instanceof DioramsModule) {
        module.reset();
      }
    });
    document.body.replaceChildren();
    document.body.append(...this.state.saveElements);
  }
}

export default ResetModule;
