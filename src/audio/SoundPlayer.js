export class SoundPlayer {
    constructor(){
        this.volume = 50;
    }

    static enableAudioAccess(element) {
        try {
            window.audioContext = window.audioContext || new AudioContext();
            if (audioContext.state == "suspended") {
                let unlock = function () {
                    audioContext.resume().then(function () {
                        element.removeEventListener("touchstart", unlock);
                        element.removeEventListener("touchend", unlock);
                        element.removeEventListener("click", unlock);
                    });
                };
                element.addEventListener("touchstart", unlock);
                element.addEventListener("touchend", unlock);
                element.addEventListener("click", unlock);
            }
        } catch (error) {
            console.error(error);
        }

    }

    static play(sound) {
        let source = audioContext.createBufferSource();
        let gainNode = audioContext.createGain();
        gainNode.gain.value = sound.volume;
        source.buffer = sound.audioBuffer;
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        source.start();

        sound.source = source;
    }

    static stop(sound) {
        sound.source.stop();
    }
}