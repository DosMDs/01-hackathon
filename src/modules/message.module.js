import {Module} from '../core/module'

export class MessageModule extends Module {
    constructor() {
        super("message", "Создать сообщение");
    }

    trigger() {
        this.createMessageBlock('Hello World!', 'rt')
    }

    createMessageBlock(message, position) {
        document.body.append(this.createDivElement(this.createSpanElement(message), position));
    }

    createDivElement(spanElement, position) {
        const divElement = document.createElement('div');
        divElement.className = 'message-box';
        this._setPositionElement(divElement, position);

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


    _setPositionElement(element, position) {
        switch (position) {
            case 'lt': // left-top
                element.classList.add('block_lt')
                break;

            case 'rt': // right-top
                element.classList.add('block_rt')
                break;

            case 'rb': // right-bottom
                element.classList.add('block_rb')
                break;

            case 'lb': // left-bottom
                element.classList.add('block_lb')
                break;

            default:
                element.classList.add('block_lb')
                break;
        }
    }

}