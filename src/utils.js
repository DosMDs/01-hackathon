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