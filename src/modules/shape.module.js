import { Module } from "../core/module";
import { random, getRandomColor } from "../utils";

class Shape {
  constructor(ctx, state) {
    this.ctx = ctx;
    this.state = state;
  }

  prepareContext() {
    this.ctx.save();
    const { x0, y0, w, h } = this.state.newBox;
    this.centerX = x0 + w / 2;
    this.centerY = y0 + h / 2;
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
      radiiRatio: random(1, 10) / 10,
    };
  }
}

class Polygon extends Shape {
  draw() {
    this.prepareContext();
    const n = this.state.verticesNumber;
    const d = this.state.rotateDegree;
    this.ctx.beginPath();
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

class ShapeModule extends Module {
  constructor() {
    super("shape", "Создать фигуру");
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    document.body.append(this.canvas);

    this.state = {
      newBox: {},
      curColor: "",
      verticesNumber: 0,
      rotateDegree: 0,
      radiiRatio: 1,
    };
  }

  polygon() {
    this.ctx.save();
    const { x0, y0, w, h } = this.state.newBox;
    const x_c = x0 + w / 2;
    const y_c = y0 + h / 2;
    const n = this.state.verticesNumber;
    const d = this.state.rotateDegree;
    this.ctx.beginPath();
    this.ctx.moveTo(
      x_c + (w * Math.cos((d * Math.PI) / 180)) / 2,
      y_c + (h * Math.sin((d * Math.PI) / 180)) / 2
    );
    for (let i = 1; i <= n; i += 1) {
      this.ctx.lineTo(
        x_c + (w * Math.cos((d * Math.PI) / 180 + (i * 2 * Math.PI) / n)) / 2,
        y_c + (h * Math.sin((d * Math.PI) / 180 + (i * 2 * Math.PI) / n)) / 2
      );
    }
    this.ctx.closePath();
    this.ctx.fillStyle = this.state.curColor;
    this.ctx.fill();
    this.ctx.restore();
  }

  ellipse() {
    this.ctx.save();
    const { x0, y0, w, h } = this.state.newBox;
    const x_c = x0 + w / 2;
    const y_c = y0 + h / 2;
    const r = this.state.radiiRatio;
    const d = this.state.rotateDegree;
    this.ctx.beginPath();
    this.ctx.ellipse(
      x_c,
      y_c,
      w / 2,
      (w * r) / 2,
      (d * Math.PI) / 180,
      0,
      2 * Math.PI
    );
    this.ctx.closePath();
    this.ctx.fillStyle = this.state.curColor;
    this.ctx.fill();
    this.ctx.restore();
  }

  star() {
    this.ctx.save();
    const { x0, y0, w, h } = this.state.newBox;
    const x_c = x0 + w / 2;
    const y_c = y0 + h / 2;
    const n = this.state.verticesNumber;
    const r = this.state.radiiRatio;
    this.ctx.beginPath();
    this.ctx.translate(x_c, y_c);
    this.ctx.moveTo(0, -w / 2);
    for (let i = 0; i < n; i++) {
      this.ctx.rotate(Math.PI / n);
      this.ctx.lineTo(0, -((w / 2) * r));
      this.ctx.rotate(Math.PI / n);
      this.ctx.lineTo(0, -w / 2);
    }
    this.ctx.closePath();
    this.ctx.fillStyle = this.state.curColor;
    this.ctx.fill();
    this.ctx.restore();
  }

  generateNewParameters() {
    const newBox = {};
    newBox.w = random(100, 300);
    newBox.h = newBox.w;
    newBox.x0 = random(0, this.canvas.width - newBox.w);
    newBox.y0 = random(0, this.canvas.height - newBox.h);
    this.state.newBox = newBox;
    this.state.curColor = getRandomColor();
    this.state.verticesNumber = random(3, 10);
    this.state.rotateDegree = random(0, 360);
    this.state.radiiRatio = random(1, 10) / 10;
  }

  trigger() {
    this.generateNewParameters();
    const func = [this.polygon, this.ellipse, this.star];
    func[random(0, func.length - 1)].bind(this)();
  }
}

export default ShapeModule;
