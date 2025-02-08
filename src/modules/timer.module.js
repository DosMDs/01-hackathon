import { Module } from '../core/module'
import { createTimer } from '../utils'

export class TimerModule extends Module {
  constructor() {
    super("timer", "Обратный таймер");
  }

  trigger() {
    const seconds = parseInt(prompt("Введите количество секунд для таймера"), 10);

    if (isNaN(seconds) || seconds <= 0) {
      alert("Введите корректное число секунд!");
      return;
    }

    const timerContainer = document.createElement("div");
    timerContainer.style.position = "fixed";
    timerContainer.style.top = "20px";
    timerContainer.style.right = "20px";
    timerContainer.style.background = "black";
    timerContainer.style.color = "white";
    timerContainer.style.padding = "10px 15px";
    timerContainer.style.borderRadius = "5px";
    timerContainer.style.fontSize = "18px";
    timerContainer.style.fontWeight = "bold";

    createTimer(seconds, timerContainer, () => alert("Время вышло!"));
  }
}