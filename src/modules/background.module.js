import { Module } from "../core/module";
import { getRandomColor } from "../utils";

class BackgroundModule extends Module {
  constructor() {
    super("background", "Изменение фона");
  }

  trigger() {
    document.body.style.backgroundColor = getRandomColor();
  }
}

export default BackgroundModule;
