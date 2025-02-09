import Modal from "./modal";

export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export function getRandomColor() {
  let color = "#" + Math.floor(Math.random() * 16777216).toString(16);
  return color;
}

export function showModal(title, content = "") {
  const modal = new Modal();
  modal.open(title, content);
}

/* Задаем позицию элементу */
export function setPositionElement(element, position) {
  switch (position) {
    case "lt": // left-top
      element.classList.add("block--lt");
      break;

    case "rt": // right-top
      element.classList.add("block--rt");
      break;

    case "rb": // right-bottom
      element.classList.add("block--rb");
      break;

    case "lb": // left-bottom
      element.classList.add("block--lb");
      break;

    default:
      element.classList.add("block--lb");
      break;
  }
}

export function createTimer(
  time,
  finalFunction = undefined,
  textContainer = undefined
) {
  const createContainer = !textContainer;
  let timerTextContainer = textContainer;
  let timerContainer = undefined;

  if (createContainer) {
    timerContainer = document.createElement("div");
    timerContainer.className = "timer";
    setPositionElement(timerContainer, "rt");
    timerTextContainer = document.createElement("h3");
    timerContainer.prepend(timerTextContainer);
    document.body.prepend(timerContainer);
  }

  timerTextContainer.textContent = time;

  const timer = setInterval(() => {
    if (time === 0) {
      clearInterval(timer);
      if (createContainer) {
        timerContainer.remove();
      }

      if (finalFunction && typeof finalFunction === "function") {
        finalFunction();
      }
    } else {
      timerTextContainer.textContent = time;
      time--;
    }
  }, 1000);
}
