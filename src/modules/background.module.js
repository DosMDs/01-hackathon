import { Module } from '../core/module'
import { getRandomColor } from '../utils'

export class BackgroundModule extends Module {
  constructor() {
    super("background", "Изменение фона");
  }

  trigger() {
    document.body.style.backgroundColor = getRandomColor();
  }
} 