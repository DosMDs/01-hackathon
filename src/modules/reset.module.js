import { Module } from "../core/module";
import { DioramsModule } from "./diorams.module";

class ResetModule extends Module {
  constructor(contextMenu) {
    super("reset", "Выполнить сброс");
    this.state = {
      saveElements: [
        document.getElementById("menu"),
        document.querySelector(".modal-overlay"),
        document.querySelector("canvas"),
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
    document.body.style.background = "#ffffff";

    const canvas = document.querySelector("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}

export default ResetModule;
