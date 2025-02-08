import {Module} from '@/core/module'
import {setPositionElement} from '@/utils'
import quotes from '@/resources/data/quotes.json'
import statham from '@/resources/img/statham.jpg'

export class MessageModule extends Module {
    constructor() {
        super("message", "Вызвать сообщение");

        this.quotes = quotes.quotes;
        this.statham = statham;
        this.messages = [];
        this.nextHeightForMessage = null;
    }

    trigger() {
        this.createMessageBlock(this.getRandomQuote())
    }

    getRandomQuote() {
        return this.quotes[Math.floor(Math.random() * this.quotes.length)];
    }

    createMessageBlock(obj, position = 'lt', seconds = 7) {
        const element = this.createDivElement(obj, position);
        document.body.append(element);
        this.messages.push(element);

        this.deleteMessageBlock(element, seconds);
    }

    createDivElement(obj, position) {
        const divElement = document.createElement('div');
        divElement.className = 'block block--message';
        setPositionElement(divElement, position);

        if (this.messages.length > 0) {
            this.nextHeightForMessage = this.messages[this.messages.length - 1].getBoundingClientRect().top;

            if (divElement.classList.contains('block--rt') || divElement.classList.contains('block--lt')) {
                divElement.style.top = this.nextHeightForMessage + 135 + 'px'
            }
            if (divElement.classList.contains('block--rb') || divElement.classList.contains('block--lb')) {
                divElement.style.top = this.nextHeightForMessage - 135 + 'px'
            }

        } else {
            this.nextHeightForMessage = null;
        }


        const imgElement = document.createElement('img');
        imgElement.className = 'block__img';
        imgElement.src = this.statham;

        const divSeparator = document.createElement('div');
        divSeparator.className = 'block__vr';

        const divContainer = document.createElement('div');
        divContainer.className = 'block__container';

        const h3Element = document.createElement('h3');
        h3Element.className = 'block__h3';
        h3Element.innerText = `Вам пишет: ${obj.author}`;

        const spanElement = document.createElement('span');
        spanElement.className = 'block__span';
        spanElement.innerText = obj.quote;

        divContainer.append(h3Element, spanElement);
        divElement.append(imgElement, divSeparator, divContainer);

        return divElement;
    }

    deleteMessageBlock(element, seconds) {
        setTimeout(() => {
            element.classList.add('block--delete');
            if (element.classList.contains('block--rt') || element.classList.contains('block--lt')) element.style.top = '0';
            if (element.classList.contains('block--rb') || element.classList.contains('block--lb')) element.style.bottom = '0';

            setTimeout(() => {
                this.messages.splice(element);
                element.remove();

                if (this.messages.length > 0) {
                    console.log(this.messages)
                }
            }, (seconds * 1000) + 1000);
        }, seconds * 1000);
    }
}