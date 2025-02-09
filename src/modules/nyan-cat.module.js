import {Module} from '@/core/module'
import backGroundImg from '@/resources/img/background.gif'
import backGroundMk3 from '@/resources/img/background-mk3.gif'
import nyancat from '@/resources/img/nyancat.gif'
import nyancatSound from '@/resources/sound/nyancat-sound.mp3'
import mk3 from '@/resources/sound/mk3.mp3'
import cyraxDancing from '@/resources/img/mk3/cyrax-dance.gif'
import subzero from '@/resources/img/mk3/subzero.gif'
import sonya from '@/resources/img/mk3/sonya.gif'


export class NyanCatModule extends Module {
    constructor() {
        super("watch-diarams", "Посмотреть диорамы");

        this.characters = null;
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

        const cyraxDancingElement = document.createElement('img');
        cyraxDancingElement.src = cyraxDancing;
        cyraxDancingElement.width = '200';
        cyraxDancingElement.height = '400';
        cyraxDancingElement.style.zIndex = '3'
        cyraxDancingElement.style.position = 'absolute';
        cyraxDancingElement.style.top = (window.innerHeight / 2 - 250) + 'px';
        cyraxDancingElement.style.left = (window.innerWidth / 2 + 700) + 'px';

        const subZeroElement = document.createElement('img');
        subZeroElement.src = subzero;
        subZeroElement.width = '250';
        subZeroElement.height = '500';
        subZeroElement.style.zIndex = '3'
        subZeroElement.style.position = 'absolute';
        subZeroElement.style.top = (window.innerHeight / 2) + 'px';
        subZeroElement.style.left = (window.innerWidth / 2 - 500) + 'px';


        const sonyaElement = document.createElement('img');
        sonyaElement.src = sonya;
        sonyaElement.width = '250';
        sonyaElement.height = '500';
        sonyaElement.style.zIndex = '3'
        sonyaElement.style.position = 'absolute';
        sonyaElement.style.top = (window.innerHeight / 2) + 'px';
        sonyaElement.style.left = (window.innerWidth / 2 + 200) + 'px';
        sonyaElement.style.transform = 'scaleX(-1)'

        document.body.append(cyraxDancingElement, subZeroElement, sonyaElement);
    }

    playNyanCat() {
        this.setMusic(nyancatSound);
        this.setBackGround(backGroundImg);

        const nyanCatElement = document.createElement('img');
        nyanCatElement.src = nyancat;
        nyanCatElement.width = '150';
        nyanCatElement.height = '90';
        nyanCatElement.style.zIndex = '3'
        nyanCatElement.style.position = 'absolute';
        nyanCatElement.style.top = (window.innerHeight / 2 - 75 / 2) + 'px';
        nyanCatElement.style.left = (window.innerWidth / 2 - 150 / 2) + 'px';

        let cursorYPosition = null;
        let cursorXPosition = null;
        setInterval(() => {
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

            setTimeout(() => {
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
                    }, 5000);
                });
            }, 100);

        }, 10);


        document.body.addEventListener('mousemove', (event) => {
            cursorXPosition = event.pageX;
            cursorYPosition = event.pageY;
        });
        document.body.append(nyanCatElement);
    }

    setMusic(audioSrc) {
        const audio = new Audio(audioSrc);
        audio.loop = true;
        audio.volume = 0.1;

        this.currentAudio = audio;
        audio.play();
    }

    setBackGround(imgSrc) {
        document.body.style.background = 'black';

        const backGround = document.createElement('img');
        backGround.id = 'background';
        backGround.style.width = '100%';
        backGround.style.height = '100%';
        backGround.style.zIndex = '-1';
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
        if(this.backGround) {
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
        if(this.characters) {
            this.characters.forEach((c) => {
                c.remove();
            })
        }
    }
}