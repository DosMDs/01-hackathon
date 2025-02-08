import { Module } from '../core/module'

export class TimerModule extends Module {
  constructor() {
    super("timer", "Обратный таймер");
    this.timerContainer = null
  }
  createTimer() {
    this.timerContainer = document.createElement("div");
    this.timerContainer.style.position = "fixed";
    this.timerContainer.style.top = "20px";
    this.timerContainer.style.right = "20px";
    this.timerContainer.style.background = "black";
    this.timerContainer.style.color = "white";
    this.timerContainer.style.padding = "10px 15px";
    this.timerContainer.style.borderRadius = "5px";
    this.timerContainer.style.fontSize = "18px";
    this.timerContainer.style.fontWeight = "bold";
    document.body.appendChild(this.timerContainer);
  }
  trigger() {

  }
}