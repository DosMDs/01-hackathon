import {Module} from '../core/module'

export class MessageModule extends Module {
    constructor() {
        super("message", "Создать сообщение");
    }

    trigger() {
        const div = document.createElement('div');
        div.className = 'message-box';

        const span = document.createElement('span');
        span.innerText = 'Some message text';

        div.appendChild(span);

        document.body.appendChild(div);
    }

}