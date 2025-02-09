import { Module } from "../core/module";
import { createTimer, showModal } from "../utils";

class ClicksModule extends Module {
  constructor() {
    super("clicks", "Подсчет кликов за 3 секунды");

    this.state = {
      countClick: 0,
      oneClick: 0,
      doubleClick: 0,
      lastTimeClick: 0,
      timeout: null,
    };

    this.timerContainer = document.createElement("div");

    this.handleClick = (event) => {
      const now = Date.now();

      if (event.detail === 1) {
        if (this.state.timeout) {
          clearTimeout(this.state.timeout);
        }

        this.state.timeout = setTimeout(() => {
          this.state.oneClick++;
        }, 200);
      }

      if (event.detail === 2) {
        this.state.doubleClick++;
        clearTimeout(this.state.timeout);
      }

      this.state.lastTimeClick = now;
    };
  }

  trigger() {
    this.#reset();

    setTimeout(() => {
      document.addEventListener("click", this.handleClick);
    }, 1);

    createTimer(3, () => {
      document.removeEventListener("click", this.handleClick);
      this.state.countClick = this.state.oneClick + this.state.doubleClick;
      const result = `Одиночных кликов: ${this.state.oneClick}, Дабл кликов: ${this.state.doubleClick}, Всего кликов: ${this.state.countClick}`;
      showModal("Результат подсчета кликов", result);
    });
  }

  #reset() {
    this.state.countClick = 0;
    this.state.oneClick = 0;
    this.state.doubleClick = 0;
    this.state.lastTimeClick = 0;
    this.state.timeout = null;
  }
}

export default ClicksModule;
