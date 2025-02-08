import {Module} from '../core/module'
import { createTimer } from '../utils'

export class ClicksModule extends Module {
    constructor() {
        super("clicks", "Подсчет кликов за определенное время");
        this.timerContainer = document.createElement('div');
    }    

    trigger() {
        let countClick = 0;

        const handleClick = () => {
            countClick++;
        };

        document.addEventListener('click', handleClick);

        createTimer(10, this.timerContainer, () => {
            document.removeEventListener('click', handleClick);
            alert(countClick);
        });
    };
}