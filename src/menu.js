import { Module } from './core/module';
import {Menu} from './core/menu'

export default class ContextMenu extends Menu {
    constructor() {
        super('#menu');
        
        this.state = {
            modules: [],
            mouseX: 0,
            mouseY: 0,
            isOpen: false
        };
        
        this.el.addEventListener('click', this.clickHeandler.bind(this));
        document.addEventListener('contextmenu', this.contextmenuHeandler.bind(this));
    }

    open() {
        if (!this.state.modules.length) {
            return;
        }

        this.el.style.left = `${this.state.mouseX}px`;
        this.el.style.top = `${this.state.mouseY}px`;

        const modules = this.state.modules.map(module => module.toHTML()).join();
        this.el.innerHTML = modules;
        this.el.style.display = 'block';
        this.state.isOpen = true;
    }

    close() {
        this.el.style.display = 'none';
        this.state.isOpen = false;
    }
    
    add(module) {
        if (!module instanceof Module) {
            return;
        }
        this.state.modules.push(module);
    }

    contextmenuHeandler(event) {
        event.preventDefault();
        this.state.mouseX = event.clientX;
        this.state.mouseY = event.clientY;
        if (this.state.isOpen) {
            this.close();
        }
        this.open();
    }

    clickHeandler(event) {
        if (event.target.offsetParent === this.el) {
            console.log('!');
        };
    }
}