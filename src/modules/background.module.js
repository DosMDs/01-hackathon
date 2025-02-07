import { Module } from '../core/module'

export class BackgroundModule extends Module {
  constructor() {
    super("background", "Изменение фона");
  }

  getRandomColor() {
    let color = '#' + Math.floor(Math.random() * 16777216).toString(16);
    return color;
  }

  trigger() {
    Promise.race(
      Array.from({ length: 5 }, () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(this.getRandomColor()), Math.random() * 1500 + 500)
        )
      )
    )
      .then((color) => {
        if (document.body) {
          document.body.style.backgroundColor = color;
        }
      })
      .catch((error) => console.error(error));
  }
} 