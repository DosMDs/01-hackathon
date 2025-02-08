import Modal from './modal';

export function random(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function getRandomColor() {
    let color = '#' + Math.floor(Math.random() * 16777216).toString(16);
    return color;
}

export function showModal(title, content = '') {
    const modal = new Modal();
    modal.open(title, content);
}

/* Удаление элемента */
export function deleteMessageBlock(element, seconds) {
    setTimeout(() => {
        element.classList.add('block--delete');
        if (element.classList.contains('block--rt') || element.classList.contains('block--lt')) element.style.top = '0';
        if (element.classList.contains('block--rb') || element.classList.contains('block--lb')) element.style.bottom = '0';

        setTimeout(() => {
            element.remove();
        }, (seconds * 1000) + 1000);
    }, seconds * 1000);
}

/* Задаем позицию элементу */
export function setPositionElement(element, position) {
    switch (position) {
        case 'lt': // left-top
            element.classList.add('block--lt')
            break;

        case 'rt': // right-top
            element.classList.add('block--rt')
            break;

        case 'rb': // right-bottom
            element.classList.add('block--rb')
            break;

        case 'lb': // left-bottom
            element.classList.add('block--lb')
            break;

        default:
            element.classList.add('block--lb')
            break;
    }
}

export function createTimer(time, timerContainer = undefined, finalFunction = undefined) {
  if(!timerContainer){
    return
  }

  const timerTextHTML = document.createElement('h3');

  const body = document.querySelector('body');
  timerContainer.prepend(timerTextHTML);
  body.prepend(timerContainer);

  const timer = setInterval(() => {
      if(time === 0){
          clearInterval(timer);
          timerTextHTML.remove();
          timerContainer.remove();

          if (finalFunction && typeof finalFunction === 'function'){
            finalFunction();
          }
      } else {
          timerTextHTML.textContent = time;
          time--;
      }
  }, 1000)
}