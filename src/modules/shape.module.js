import { Module } from '../core/module'
import { random } from '../utils'
import { getRandomColor } from "../utils";

export default class ShapeModule extends Module {
    constructor() {
        super('shape', 'Создать фигуру');
        this.$canvas = document.createElement('canvas');
        this.$canvas.width = window.innerWidth;
        this.$canvas.height = window.innerHeight;
        this.ctx = this.$canvas.getContext("2d");
        document.body.append(this.$canvas);
    }

    polygon({ x0, y0, w, h } = this.createNewBox(), n = random(3, 7), d = random(0, 360), c = getRandomColor()) {
        this.ctx.save();
        const x_c = x0 + w / 2;
        const y_c = y0 + h / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x_c + w * Math.cos(d * Math.PI / 180) / 2, y_c + h * Math.sin(d * Math.PI / 180) / 2);
        for (let i = 1; i <= n; i += 1) {
            this.ctx.lineTo(x_c + w * Math.cos(d * Math.PI / 180 + i * 2 * Math.PI / n) / 2, y_c + h * Math.sin(d * Math.PI / 180 + i * 2 * Math.PI / n) / 2);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = c;
        this.ctx.fill();
        this.ctx.restore();
    }

    ellipse({ x0, y0, w, h } = this.createNewBox(), r = random(2, 10), d = random(0, 360), c = getRandomColor()) {
        this.ctx.save();
        const x_c = x0 + w / 2;
        const y_c = y0 + h / 2;
        this.ctx.beginPath();
        this.ctx.ellipse(x_c, y_c, w / 2, w * r / 20, d * Math.PI / 180, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fillStyle = c;
        this.ctx.fill();
        this.ctx.restore();

    }

    star({ x0, y0, w, h } = this.createNewBox(), n = random(3, 10), k = random(1, 8) / 10, c = getRandomColor()) {
        this.ctx.save();
        const x_c = x0 + w / 2;
        const y_c = y0 + h / 2;
        this.ctx.beginPath();
        this.ctx.translate(x_c, y_c);
        this.ctx.moveTo(0, - w / 2);
        for (let i = 0; i < n; i++) {
            this.ctx.rotate(Math.PI / n);
            this.ctx.lineTo(0, - (w / 2 * k));
            this.ctx.rotate(Math.PI / n);
            this.ctx.lineTo(0, - w / 2);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = c;
        this.ctx.fill();
        this.ctx.restore();
    }

    createNewBox() {
        const newBox = {
            w: random(100, 300),
        };
        newBox.h = newBox.w;
        newBox.x0 = random(0, this.$canvas.width - newBox.w);
        newBox.y0 = random(0, this.$canvas.height - newBox.h);
        return newBox;
    }

    trigger() {
        const func = [this.polygon, this.ellipse, this.star]
        const randomElementIndex = Math.floor(Math.random() * func.length);
        func[randomElementIndex].bind(this)();
    }
}