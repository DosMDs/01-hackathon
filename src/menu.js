import {Module} from './core/module';
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


        this.el.innerHTML = this.state.modules.map(module => module.toHTML()).join("");
        this.el.style.display = 'block';
        this.state.isOpen = true;


        const heightElByCursor = this.state.mouseY + this.el.offsetHeight;
        const widthElByCursor = this.state.mouseX + this.el.offsetWidth;
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        if (heightElByCursor > windowHeight) {
            this.el.style.top = Math.max(0, windowHeight - this.el.offsetHeight) + 'px';
        } else {
            this.el.style.top = `${this.state.mouseY}px`;
        }


        if (widthElByCursor > windowWidth) {
            this.el.style.left = Math.max(0, windowWidth - this.el.offsetWidth) + 'px';
        } else {
            this.el.style.left = `${this.state.mouseX}px`;
        }
    }

    close() {
        this.el.style.display = 'none';
        this.state.isOpen = false;
    }

    add(newModule) {
        if (!newModule instanceof Module) {
            return;
        }
        if (this.state.modules.find(module => module.type === newModule.type)) {
            return;
        }
        this.state.modules.push(newModule);
    }

    get modules(){
        return this.state.modules;
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
        if (event.target.offsetParent !== this.el) {
            return;
        }
        ;

        const module = this.state.modules.find((module) => {
            return module.type === event.target.dataset.type;
        })

        module.trigger();
        this.close();
    }
}