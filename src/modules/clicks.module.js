import {Module} from '../core/module'
import { createTimer } from '../utils'

export class ClicksModule extends Module {
    constructor() {
        super("clicks", "Подсчет кликов за определенное время");
        this.timerContainer = document.createElement('div');
        this.countClick = 0;
        this.oneClick = 0;
        this.doubleClick = 0;
        this.lastTimeClick = 0;
        this.handleClick = (event) => {
            const now = Date.now();

            if(event.detail === 1){
                if (this.timeout) {
                    clearTimeout(this.timeout); 
                }

                this.timeout = setTimeout(() => {
                    // Если прошло больше времени, считаем одиночным
                    this.oneClick++;
                }, 200);
            }

            if(event.detail === 2) {
                this.doubleClick++;
                clearTimeout(this.timeout)
            }

            this.lastTimeClick = now;
        };
    }    
    
    trigger() {
        this.#reset();

        setTimeout(() => {
            document.addEventListener('click', this.handleClick);
        }, 1)

        createTimer(3, this.timerContainer, () => {
            document.removeEventListener('click', this.handleClick);
            this.countClick = this.oneClick + this.doubleClick;
            alert(`Одиночных кликов: ${this.oneClick}, Дабл кликов: ${this.doubleClick}, Всего кликов: ${this.countClick}`);
        });
    };

    #reset() {
        this.countClick = 0;
        this.oneClick = 0;
        this.doubleClick = 0;
        this.lastTimeClick = 0;
    }
}