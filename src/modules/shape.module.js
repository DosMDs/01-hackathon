import { Module } from '../core/module'
import { random } from '../utils'
import { getRandomColor } from "../utils";

export default class ShapeModule extends Module {
    constructor() {
        super('shape', 'Случайная фигура');

        this.$canvas = document.createElement('canvas');
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.$canvas.width = window.innerWidth;
        this.$canvas.height = window.innerHeight;
        document.body.append(this.$canvas);


        this.state = {
            emptyBoxes: [],
        };
    }

    randomRect() {
        const ctx = this.$canvas.getContext("2d");
        ctx.fillStyle = getRandomColor();
        const x = random(1, this.windowWidth);
        const y = random(1, this.windowHeight);
        const w = random(1, this.windowWidth - x);
        const h = random(1, this.windowHeight - y);

        ctx.fillRect(x, y, h, w);

    }

    trigger() {
        this.randomRect()




    }
}