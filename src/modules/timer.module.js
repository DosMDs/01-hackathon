import { Module } from "../core/module";
import { createTimer, showModal, showInputModal } from "../utils";

class TimerModule extends Module {
  constructor() {
    super("timer", "Обратный таймер");
  }

  trigger() {
    showInputModal("Введите количество секунд для таймера", this.closeWithResult)
  }

  closeWithResult(value) {
    const seconds = Number(value);
    
    if (isNaN(seconds) || seconds <= 0) {
      showModal("Введите корректное число секунд!");
      return;
    }

    createTimer(seconds, () => showModal("Время вышло!"));
  }

}

export default TimerModule;
