import { Module } from "../core/module";
import { createTimer, showModal, setPositionElement } from "../utils";

class TimerModule extends Module {
  constructor() {
    super("timer", "Обратный таймер");
  }

  trigger() {
    const seconds = parseInt(
      prompt("Введите количество секунд для таймера"),
      10
    );

    if (isNaN(seconds) || seconds <= 0) {
      showModal("Введите корректное число секунд!");
      return;
    }

    const timerContainer = document.createElement("div");
    timerContainer.className = "timer";
    setPositionElement(timerContainer, "rt");
    createTimer(seconds, timerContainer, () => showModal("Время вышло!"));
  }
}

export default TimerModule;
