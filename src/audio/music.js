export class Music {
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

    play(sound) {
        source = audioContext.createBufferSource();
        source.buffer = sound.audioBuffer;
        source.connect(audioContext.destination);
        source.start();
    }

    stop(sound) {
        sound.stop();
    }
}