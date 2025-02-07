import {Module} from '../core/module'
import {deleteMessageBlock, setPositionElement} from '../utils'

export class MessageModule extends Module {
    constructor() {
        super("message", "Вызвать сообщение");
    }

    trigger() {
        this.createMessageBlock()
    }

    createMessageBlock(message = 'Lorem ipsum dolor sit amet', position = 'lb', seconds = 3) {
        const element = this.createDivElement(this.createSpanElement(message), position);
        document.body.append(element);

        deleteMessageBlock(element, seconds);
    }

    createDivElement(spanElement, position) {
        const divElement = document.createElement('div');
        divElement.className = 'block block--message';
        setPositionElement(divElement, position);

        divElement.appendChild(spanElement);
        return divElement;
    }

    createSpanElement(message) {
        const spanElement = document.createElement('span');
        spanElement.className = 'block__span';
        spanElement.innerText = message;

        return spanElement;
    }
}