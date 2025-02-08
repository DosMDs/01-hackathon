import {Module} from '@/core/module'
import {setPositionElement} from '@/utils'
import {quotes} from '@/resources/data/quotes.json'

export class MessageModule extends Module {
    constructor() {
        super("message", "Вызвать сообщение");

        this.messages = []
    }

    trigger() {
        this.createMessageBlock(this.getRandomQuote())
    }

    getRandomQuote() {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    createMessageBlock(obj, position = 'lb', seconds = 3) {
        const element = this.createDivElement(this.createSpanElement(obj.quote), position);
        document.body.append(element);
        this.messages.push(element);

        this.deleteMessageBlock(element, seconds);
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

    deleteMessageBlock(element, seconds) {
        setTimeout(() => {
            element.classList.add('block--delete');
            if (element.classList.contains('block--rt') || element.classList.contains('block--lt')) element.style.top = '0';
            if (element.classList.contains('block--rb') || element.classList.contains('block--lb')) element.style.bottom = '0';

            setTimeout(() => {
                element.remove();
            }, (seconds * 1000) + 1000);
        }, seconds * 1000);
    }
}