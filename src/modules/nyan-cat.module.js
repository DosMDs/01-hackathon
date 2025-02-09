import {Module} from '@/core/module'
import nyancatImg from '@/resources/img/nyancat.gif'
import backGroundImg from '@/resources/img/background.gif'
import nyancatSound from '@/resources/sound/nyancat-sound.mp3'

export class NyanCatModule extends Module {
    constructor() {
        super("watch-diarams", "Посмотреть диорамы");
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
        backGround.style.zIndex = '1';
        document.body.append(backGround);


        const nyanCatImg = document.createElement('img');
        nyanCatImg.src = nyancatImg;
        nyanCatImg.width = '150';
        nyanCatImg.height = '75';
        nyanCatImg.style.zIndex = '3'
        nyanCatImg.style.position = 'absolute';
        nyanCatImg.style.top = (window.innerHeight / 2 - 75 / 2) + 'px';
        nyanCatImg.style.left = (window.innerWidth / 2 - 150 / 2) + 'px';
        let cursorYPosition = null;
        let cursorXPosition = null;

        const menuDiaram = document.createElement('div');
        menuDiaram.className = 'menu--diaram'


        const buttonPrev = document.createElement('button');
        buttonPrev.className = 'button--prev';
        buttonPrev.innerText = '<'

        const buttonNext = document.createElement('button');
        buttonNext.className = 'button--next';
        buttonNext.innerText = '>'

        const divContainer = document.createElement('div');
        divContainer.className = 'div--container';


        const titleDiagram = document.createElement('span');
        titleDiagram.innerText = 'Нянкат';
        titleDiagram.style.margin = 'auto'

        divContainer.append(titleDiagram);
        menuDiaram.append(buttonPrev, divContainer, buttonNext);

        document.body.append(menuDiaram)
        let rotation = 0;
        setInterval(() => {
            let currentLeft = parseInt(nyanCatImg.style.left);
            let currentTop = parseInt(nyanCatImg.style.top);

            let angleRad = Math.atan2(
                cursorYPosition - nyanCatImg.height / 2 - currentTop,
                cursorXPosition - nyanCatImg.width / 2 - currentLeft
            );
            let angleDeg = angleRad * (180 / Math.PI);

            // Плавно поворачиваем спрайт
            rotation = rotation + (((angleDeg - rotation + 180) % 360) - 180) * 0.1;
            nyanCatImg.style.transform = `rotate(${rotation}deg)`;

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


            const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
            const offset = 7;

            setTimeout(() => {
                colors.forEach((color, index) => {
                    const div = document.createElement('div');
                    div.style.position = 'absolute';
                    div.style.zIndex = '2';
                    div.style.background = color;
                    div.style.width = '7px';
                    div.style.height = '7px';
                    div.style.borderRadius = '50%';

                    div.style.top = (currentTop + nyanCatImg.height / 2 - 27 + (index * offset)) + 'px';
                    div.style.left = currentLeft + nyanCatImg.width / 2 + 'px';

                    document.body.append(div);

                    setTimeout(() => {
                        div.remove();
                    }, 5000);
                });
            }, 15);

        }, 10);


        document.body.addEventListener('mousemove', (event) => {
            cursorXPosition = event.pageX;
            cursorYPosition = event.pageY;
        });
        document.body.append(nyanCatImg);
    }

    stopGif(img) {
        const currentSrc = img.src;
        img.src = currentSrc;
    }
}