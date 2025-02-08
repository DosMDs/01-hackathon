import {Module} from '@/core/module'
import nyancatImg from '@/resources/img/nyancat.gif'
import backGroundImg from '@/resources/img/background.gif'
import nyancatSound from '@/resources/sound/nyancat-sound.mp3'

export class NyanCatModule extends Module {
    constructor() {
        super("nyancat", "Позвать нянкат");
    }

    trigger() {
        const audio = new Audio(nyancatSound);
        audio.loop = true;
        audio.volume = 0.01;
        audio.play();


        const backGround = document.createElement('img');
        backGround.src = backGroundImg;
        backGround.style.width = '100%';
        backGround.style.height = '100%';

        document.body.append(backGround);


        const nyanCatImg = document.createElement('img');
        nyanCatImg.src = nyancatImg;
        nyanCatImg.width = '150';
        nyanCatImg.height = '75';
        nyanCatImg.style.position = 'absolute';
        nyanCatImg.style.top = '50%';
        nyanCatImg.style.left = '50%';

        let cursorYPosition = null;
        let cursorXPosition = null;
        setInterval(() => {

            let currentLeft = parseInt(nyanCatImg.style.left);
            let currentTop = parseInt(nyanCatImg.style.top);

            // Движение влево/вправо
            if (currentLeft < cursorXPosition - nyanCatImg.width / 2) {
                nyanCatImg.style.left = (currentLeft + 1) + 'px';
            } else if (currentLeft > cursorXPosition - nyanCatImg.width / 2) {
                nyanCatImg.style.left = (currentLeft - 1) + 'px';
            }

            // Движение вверх/вниз
            if (currentTop < cursorYPosition - nyanCatImg.height / 2) {
                nyanCatImg.style.top = (currentTop + 1) + 'px';
            } else if (currentTop > cursorYPosition - nyanCatImg.height / 2) {
                nyanCatImg.style.top = (currentTop - 1) + 'px';
            }

        }, 10)


        document.body.addEventListener('mousemove', (event) => {
            const x = event.pageX;
            const y = event.pageY;

            cursorXPosition = x;
            cursorYPosition = y;

        });
        document.body.append(nyanCatImg);
    }

    stopGif(img) {
        const currentSrc = img.src;
        img.src = currentSrc;
    }
}