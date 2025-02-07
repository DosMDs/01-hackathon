import {Module} from '../core/module'

export class MessageModule extends Module {
    constructor() {
        super("message", "Создать сообщение");
    }

    trigger() {
        this.createMessageBlock('Hello World!')
    }

    createMessageBlock(message) {
        document.body.append(this.createDivElement(this.createSpanElement(message)));
    }

    createDivElement(spanElement) {
        const divElement = document.createElement('div');
        divElement.className = 'message-box';

        divElement.appendChild(spanElement);
        return divElement;
    }

    createSpanElement(message) {
        if (!message) return;

        const spanElement = document.createElement('span');
        spanElement.className = 'message-box__message-text';
        spanElement.innerText = message;

        return spanElement;
    }
}