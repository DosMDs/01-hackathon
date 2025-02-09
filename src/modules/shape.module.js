import { Module } from "../core/module";
import { random, getRandomColor } from "../utils";

class Shape {
  constructor(ctx, state) {
    this.ctx = ctx;
    this.state = state;
  }

  prepareContext() {
    const { x0, y0, w, h } = this.state.newBox;
    this.centerX = x0 + w / 2;
    this.centerY = y0 + h / 2;
    this.ctx.save();
    this.ctx.beginPath();
  }

  finalizeContext() {
    this.ctx.closePath();
    this.ctx.fillStyle = this.state.curColor;
    this.ctx.fill();
    this.ctx.restore();
  }

  draw() {
    throw new Error("'draw()' must be implemented.");
  }

  static generateNewParameters(canvas) {
    const newBox = {};
    newBox.w = random(100, 300);
    newBox.h = newBox.w;
    newBox.x0 = random(0, canvas.width - newBox.w);
    newBox.y0 = random(0, canvas.height - newBox.h);

    return {
      newBox,
      curColor: getRandomColor(),
      verticesNumber: random(3, 10),
      rotateDegree: random(0, 360),
      radiusRatio: random(1, 10) / 10,
    };
  }
}

class Polygon extends Shape {
  draw() {
    const n = this.state.verticesNumber;
    const d = this.state.rotateDegree;
    this.prepareContext();
    this.ctx.moveTo(
      this.centerX + (this.state.newBox.w * Math.cos((d * Math.PI) / 180)) / 2,
      this.centerY + (this.state.newBox.h * Math.sin((d * Math.PI) / 180)) / 2
    );
    for (let i = 1; i <= n; i += 1) {
      this.ctx.lineTo(
        this.centerX +
          (this.state.newBox.w *
            Math.cos((d * Math.PI) / 180 + (i * 2 * Math.PI) / n)) /
            2,
        this.centerY +
          (this.state.newBox.h *
            Math.sin((d * Math.PI) / 180 + (i * 2 * Math.PI) / n)) /
            2
      );
    }
    this.finalizeContext();
  }
}

class Ellipse extends Shape {
  draw() {
    const r = this.state.radiusRatio;
    const d = this.state.rotateDegree;
    this.prepareContext();
    this.ctx.ellipse(
      this.centerX,
      this.centerY,
      this.state.newBox.w / 2,
      (this.state.newBox.w * r) / 2,
      (d * Math.PI) / 180,
      0,
      2 * Math.PI
    );
    this.finalizeContext();
  }
}

class Star extends Shape {
    draw() {
      const n = this.state.verticesNumber;
      const r = this.state.radiusRatio;
      this.prepareContext()
      this.ctx.translate(this.centerX, this.centerY);
      this.ctx.moveTo(0, -this.state.newBox.w / 2);
      for (let i = 0; i < n; i++) {
        this.ctx.rotate(Math.PI / n);
        this.ctx.lineTo(0, -((this.state.newBox.w / 2) * r));
        this.ctx.rotate(Math.PI / n);
        this.ctx.lineTo(0, -this.state.newBox.w / 2);
      }
      this.finalizeContext()
    }
  }

class ShapeModule extends Module {
  constructor() {
    super("shape", "Создать фигуру");
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    document.body.append(this.canvas);

    this.state = {};
  }

  trigger() {
    this.state = Shape.generateNewParameters(this.canvas);
    const shapes = [
      new Polygon(this.ctx, this.state),
      new Ellipse(this.ctx, this.state),
      new Star(this.ctx, this.state),
    ];
    shapes[random(0, shapes.length - 1)].draw();
  }
}

export default ShapeModule;
