import {Module} from '@/core/module'
import backGroundImg from '@/resources/img/background.gif'
import backGroundMk3 from '@/resources/img/background-mk3.gif'
import nyancat from '@/resources/img/nyancat.gif'
import nyancatSound from '@/resources/sound/nyancat-sound.mp3'
import mk3 from '@/resources/sound/mk3.mp3'
import cyraxDancing from '@/resources/img/mk3/cyrax-dance.gif'
import subzero from '@/resources/img/mk3/subzero.gif'
import sonya from '@/resources/img/mk3/sonya.gif'
import fightImg from '@/resources/img/mk3/fight.gif'


export class DioramsModule extends Module {
    constructor() {
        super("watch-diarams", "Посмотреть диорамы");

        this.characters = [];
        this.backGround = null;
        this.currentAudio = null;
        this.diagrams = [
            {
                name: 'Nyan Cat',
                method: this.playNyanCat.bind(this)
            },

            {
                name: 'Mortal Combat 3',
                method: this.playMk3.bind(this)
            },
        ]
    }

    trigger() {
        this.createMenu(this.diagrams);
        this.playMk3();
    }

    createMenu(diagrams) {
        const menuDiagram = document.createElement('div');
        menuDiagram.className = 'diagram-menu'
        diagrams.forEach(diagram => {
            const buttonElement = document.createElement('button');
            buttonElement.className = 'diagram-menu__button';
            buttonElement.innerText = diagram.name;
            buttonElement.addEventListener('click', () => {
                this.reset()
                diagram.method.call(this);
            })

            menuDiagram.append(buttonElement);
        })

        document.body.append(menuDiagram)
    }

    playMk3() {
        this.setMusic(mk3)
        this.setBackGround(backGroundMk3)

        const images = {
            fight: {
                img: fightImg,
                posY: 400,
                posX: -200,
                reverse: false,
                height: 200,
                width: 400,
            },

            cyraxDancing: {
                img: cyraxDancing,
                posY: 225,
                posX: 350,
                reverse: false,
                scale: 0.55,
                height: 400,
                width: 200
            },

            subZero: {
                img: subzero,
                posY: 0,
                posX: -350,
                reverse: false,
                scale: 1,
                height: 400,
                width: 200
            },

            sonya: {
                img: sonya,
                posY: 0,
                posX: 135,
                reverse: true,
                scale: 1,
                height: 400,
                width: 200
            }
        }

        const fight = this.setImage(images.fight)
        const cyraxDancingElement = this.setImage(images.cyraxDancing)
        const subZeroElement = this.setImage(images.subZero)
        const sonyaElement = this.setImage(images.sonya)

        document.body.append(fight, cyraxDancingElement, subZeroElement, sonyaElement);
        this.characters.push(fight, cyraxDancingElement, subZeroElement, sonyaElement);
    }

    playNyanCat() {
        this.setMusic(nyancatSound);
        this.setBackGround(backGroundImg);


        const nyanCatSettings = {
            nyanCat: {
                img: nyancat,
                posY: 75,
                posX: 150,
                reverse: false,
                scale: null,
                height: 90,
                width: 130
            }
        }
        const nyanCatElement = this.setImage(nyanCatSettings.nyanCat);

        let cursorYPosition = null;
        let cursorXPosition = null;

        let movingCat = null;
        let makeRainbowTrail = null;
        movingCat = setInterval(() => {
            if (!document.contains(nyanCatElement)) {
                movingCat.clearInterval();
                makeRainbowTrail.clearInterval();
            }

            let currentLeft = parseInt(nyanCatElement.style.left);
            let currentTop = parseInt(nyanCatElement.style.top);

            let angleRad = Math.atan2(
                cursorYPosition - nyanCatElement.height / 2 - currentTop,
                cursorXPosition - nyanCatElement.width / 2 - currentLeft
            );
            let angleDeg = angleRad * (180 / Math.PI);

            if (angleDeg >= -90 && angleDeg <= 90) {
                nyanCatElement.style.transform = 'scaleX(1)';
            } else {
                nyanCatElement.style.transform = 'scaleX(-1)';
            }

            // Движение влево/вправо
            if (currentLeft < cursorXPosition - nyanCatElement.width / 2) {
                nyanCatElement.style.left = (currentLeft + 1) + 'px';
            } else if (currentLeft > cursorXPosition - nyanCatElement.width / 2) {
                nyanCatElement.style.left = (currentLeft - 1) + 'px';
            }

            // Движение вверх/вниз
            if (currentTop < cursorYPosition - nyanCatElement.height / 2) {
                nyanCatElement.style.top = (currentTop + 1) + 'px';
            } else if (currentTop > cursorYPosition - nyanCatElement.height / 2) {
                nyanCatElement.style.top = (currentTop - 1) + 'px';
            }


            const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
            const offset = 7;

            makeRainbowTrail = setTimeout(() => {
                colors.forEach((color, index) => {
                    const div = document.createElement('div');
                    div.style.position = 'absolute';
                    div.style.zIndex = '2';
                    div.style.background = color;
                    div.style.width = '7px';
                    div.style.height = '7px';

                    div.style.top = (currentTop + nyanCatElement.height / 2 - 27 + (index * offset)) + 'px';
                    div.style.left = currentLeft + nyanCatElement.width / 2 + 'px';

                    document.body.append(div);

                    setTimeout(() => {
                        div.remove();
                    }, 1000);
                });
            }, 100);

        }, 10);


        document.body.addEventListener('mousemove', (event) => {
            cursorXPosition = event.pageX;
            cursorYPosition = event.pageY;
        });
        document.body.append(nyanCatElement);
        this.characters.push(nyanCatElement);
    }

    setImage(settings) {
        const {img, posY, posX, reverse, scale, height, width} = settings;

        const image = document.createElement('img');
        image.src = img;
        image.width = width;
        image.height = height;
        image.style.zIndex = '3'
        image.style.position = 'absolute';
        image.style.top = (window.innerHeight / 2 - posY) + 'px';
        image.style.left = (window.innerWidth / 2 + posX) + 'px';
        if (reverse) {
            image.style.transform = 'scaleX(-1)'
        }
        if (scale) {
            image.style.scale = scale
        }

        this.characters.push(image);
        return image;
    }

    setMusic(audioSrc) {
        const audio = new Audio(audioSrc);
        audio.loop = true;
        audio.volume = 0.05;

        this.currentAudio = audio;
        audio.play();
    }

    setBackGround(imgSrc) {
        // document.body.style.background = 'black';

        const backGround = document.createElement('img');
        backGround.className = 'diagram__background'
        backGround.style.zIndex = '-1'
        backGround.src = imgSrc;

        this.backGround = backGround;
        document.body.append(backGround);
    }

    reset() {
        this.resetBackGround();
        this.resetMusic();
        this.resetCharacters();
    }

    resetBackGround() {
        if (this.backGround) {
            this.backGround.remove();
        }
    }

    resetMusic() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
    }

    resetCharacters() {
        if (this.characters) {
            this.characters.forEach((c) => {
                c.remove();
            })
        }
    }
}