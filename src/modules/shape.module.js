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

    polygon({ x0, y0, w, h }, n, d, c) {
        const x_c = x0 + w / 2;
        const y_c = y0 + h / 2;

       
        this.ctx.setTransform(1, 0, 0, 1, x_c, y_c);
        this.ctx.rotate(d * Math.PI / 180);

        this.ctx.beginPath();
        this.ctx.moveTo(w * Math.cos(0) / 2, h * Math.sin(0) / 2);
        for (let i = 1; i <= n; i += 1) {
            this.ctx.lineTo(w * Math.cos(i * 2 * Math.PI / n) / 2, h * Math.sin(i * 2 * Math.PI / n) / 2);
        }

        this.ctx.fillStyle = c;
        this.ctx.fill();
    }

    ellipse({ x0, y0, w, h }, r, d, c) {
        const x_c = x0 + w / 2;
        const y_c = y0 + h / 2;
        console.log(x_c, y_c, w, h);
        

        
        //this.ctx.setTransform(1, 0, 0, 1, x_c, y_c);
        //this.ctx.rotate(d * Math.PI / 180);
        this.ctx.beginPath();
        this.ctx.ellipse(x_c, y_c, w / 2, w * r / 20, d * Math.PI / 180, 0, 2 * Math.PI);

        this.ctx.fillStyle = c;
        this.ctx.fill();

    }

    newBox() {
        const newBox = {
            w: random(50, 300),
        };
        newBox.h = newBox.w;
        newBox.x0 = random(0, window.innerWidth - newBox.w);
        newBox.y0 = random(0, window.innerHeight - newBox.h);

        return newBox;
    }

    trigger() {
        const func = [this.ellipse, this.polygon]
        const randomElementIndex = Math.floor(Math.random() * func.length);

        func[randomElementIndex].bind(this)(this.newBox(), random(3, 7), random(0, 360), getRandomColor());

    }
}