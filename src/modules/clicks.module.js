import {Module} from '../core/module'
import { createTimer } from '../utils'

export class ClicksModule extends Module {
    constructor() {
        super("clicks", "Подсчет кликов за определенное время");
        this.timerContainer = document.createElement('div');
        this.countClick = 0;
        this.handleClick = () => this.countClick++;
    }    
    
    trigger() {
        setTimeout(() => {
            document.addEventListener('click', this.handleClick);
        }, 1)

        createTimer(3, this.timerContainer, () => {
            document.removeEventListener('click', this.handleClick);
            alert(this.countClick);
        });
    };
}