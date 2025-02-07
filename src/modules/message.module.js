import {Module} from '../core/module'

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

        this.deleteMessageBlock(element, seconds);
    }

    deleteMessageBlock(element, seconds) {
        setTimeout(() => {
            element.classList.add('delete-block');

            setTimeout(() => {
                element.remove();
            }, seconds * 1000);
        }, 1000);
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