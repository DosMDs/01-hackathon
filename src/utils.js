import { InputModal, Modal } from './modal';

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

export function showInputModal(title, content = '', closeWithResult, inputType = 'text') {
  const modal = new InputModal(closeWithResult, inputType);
  modal.open(title, content);
}