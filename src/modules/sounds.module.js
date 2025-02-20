import {Module} from '@/core/module'

export class RandomSoundModule extends Module {
    constructor() {
        super("randomSound", "Случайный звук");
    }

    trigger() {
        this.makeRandomSound();
    }


    makeRandomSound() {
        const playNote = (frequency) => {
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            gainNode.gain.value = 0.05;
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.value = frequency;


            oscillator.start();
            setTimeout(() => {
                oscillator.stop();
            }, 500);
        };

        playNote(Math.random().toString().substring(2, 5))
    }
}