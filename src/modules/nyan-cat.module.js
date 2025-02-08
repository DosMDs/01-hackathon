import {Module} from '@/core/module'
import nyancat from '@/resources/img/nyancat.gif'
import nyancatSound from '@/resources/sound/nyancat-sound.mp3'

export class NyanCatModule extends Module {
    constructor() {
        super("nyancat", "Позвать нянкат");
    }

    trigger() {
        const img = document.createElement('img');
        img.src = nyancat;
        img.width = '100';
        img.height = '75';
        img.style.position = 'absolute';
        img.style.top = '50%';
        img.style.left = '50%';

        let cursorYPosition = null;
        let cursorXPosition = null;
        setInterval(() => {

            let currentLeft = parseInt(img.style.left);
            let currentTop = parseInt(img.style.top);

            // Движение влево/вправо
            if (currentLeft < cursorXPosition - img.width / 2) {
                img.style.left = (currentLeft + 1) + 'px';
            } else if (currentLeft > cursorXPosition - img.width / 2) {
                img.style.left = (currentLeft - 1) + 'px';
            }

            // Движение вверх/вниз
            if (currentTop < cursorYPosition - img.height / 2) {
                img.style.top = (currentTop + 1) + 'px';
            } else if (currentTop > cursorYPosition - img.height / 2) {
                img.style.top = (currentTop - 1) + 'px';
            }

        }, 10)


        document.body.addEventListener('mousemove', (event) => {
            const x = event.pageX;
            const y = event.pageY;

            cursorXPosition = x;
            cursorYPosition = y;

        });
        document.body.append(img);
    }

    stopGif(img) {
        const currentSrc = img.src;
        img.src = currentSrc;
    }
}