import Modal from './modal';

export function random(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777216).toString(16);
}

export function showModal(title, content = '') {
    const modal = new Modal();
    modal.open(title, content);
}