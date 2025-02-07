import {Module} from '../core/module'
import { createTimer } from '../utils'

export class ClicksModule extends Module {
    constructor() {
        super("clicks", "Подсчет кликов за определенное время");
        this.timerContainer = document.createElement('div');
    }    

    trigger() {
        createTimer(10, this.timerContainer);
    };
}