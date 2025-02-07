import {Module} from '../core/module'
import {deleteMessageBlock, setPositionElement} from '../utils'

export class MessageModule extends Module {
    constructor() {
        super("message", "Вызвать сообщение");
    }

    trigger() {
        this.createMessageBlock('Hello World!', 'lb', 3)
    }

    createMessageBlock(message, position, seconds) {
        const element = this.createDivElement(this.createSpanElement(message), position);
        document.body.append(element);

        deleteMessageBlock(element, seconds);
    }

    createDivElement(spanElement, position) {
        const divElement = document.createElement('div');
        divElement.className = 'message-box';
        setPositionElement(divElement, position);

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