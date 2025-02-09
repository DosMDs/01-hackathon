import { Module } from "../core/module";
import { setPositionElement } from "../utils";
import quotes from "../resources/data/quotes.json";
import statham from "../resources/img/statham.jpg";

class MessageModule extends Module {
  constructor() {
    super("message", "Вызвать сообщение");

    this.state = {
      messages: [],
      nextHeightForMessage: null
    }

    this.quotes = quotes.quotes;
    this.statham = statham;
  }

  trigger() {
    this.createMessageBlock(this.getRandomQuote());
  }

  getRandomQuote() {
    return this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }

  createMessageBlock(obj, position = "lb", seconds = 7) {
    const element = this.createDivElement(obj, position);
    document.body.append(element);
    this.state.messages.push(element);

    setTimeout(() => {
      this.deleteMessageBlock(element);
    }, seconds * 1000);
  }

  createDivElement(obj, position) {
    const divElement = document.createElement("div");
    divElement.className = "block block--message";
    setPositionElement(divElement, position);

    if (this.state.messages.length > 0) {
      this.state.nextHeightForMessage =
        this.state.messages[this.state.messages.length - 1].getBoundingClientRect().top;

      if (
        divElement.classList.contains("block--rt") ||
        divElement.classList.contains("block--lt")
      ) {
        divElement.style.top = this.state.nextHeightForMessage + 135 + "px";
      }
      if (
        divElement.classList.contains("block--rb") ||
        divElement.classList.contains("block--lb")
      ) {
        divElement.style.top = this.state.nextHeightForMessage - 135 + "px";
      }
    } else {
      this.state.nextHeightForMessage = null;
    }

    const imgElement = document.createElement("img");
    imgElement.className = "block__img";
    imgElement.src = this.statham;

    const divSeparator = document.createElement("div");
    divSeparator.className = "block__vr";

    const divContainer = document.createElement("div");
    
    const h3Element = document.createElement("h3");
    h3Element.className = "block__h3";
    h3Element.innerText = `Вам пишет: ${obj.author}`;

    const spanElement = document.createElement("span");
    spanElement.innerText = obj.quote;

    divContainer.append(h3Element, spanElement);
    divElement.append(imgElement, divSeparator, divContainer);

    return divElement;
  }

  deleteMessageBlock(element) {
    element.classList.add("block--delete");
    if (
      element.classList.contains("block--rt") ||
      element.classList.contains("block--lt")
    )
      element.style.top = "0";
    if (
      element.classList.contains("block--rb") ||
      element.classList.contains("block--lb")
    )
      element.style.bottom = "0";
    this.state.messages.splice(0, 1);

    setTimeout(() => {
      if (this.state.messages.length > 0) {
        const lastMessage =
          this.state.messages[this.state.messages.length - 1].getBoundingClientRect().top;
        let nextTopPosition = lastMessage + 135 + "px";

        this.state.messages.forEach((message) => {
          nextTopPosition = parseInt(message.style.top) + 135 + "px";
          message.style.top = nextTopPosition;
        });
      }

      element.remove();
    }, 777);
  }
}

export default MessageModule;
