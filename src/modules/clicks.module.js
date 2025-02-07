import {Module} from '../core/module'
import * as Utils from '../utils'

export class ClicksModule extends Module {
    constructor() {
        super("clicks", "Подсчет кликов за определенное время");
    }    

    trigger() {
        Utils.createTimer(10);
    };
}