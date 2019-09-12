export class SoundPlayer {
    /**
     * Enables audio on selected element, required on one element
     * @param {HTMLBodyElement} element Element built in html
     */
    static enableAudioAccess(element) {
        try {
            /* creator of nodes, and execution of audio processing, and decoding */
            window.audioContext = window.audioContext || new AudioContext();

            /* detects if music can't play */
            if (audioContext.state == "suspended") {
                /* unlocks the music */
                let unlock = function () {
                    audioContext.resume().then(function () {
                        /* removes click/touch detection */
                        element.removeEventListener("touchstart", unlock);
                        element.removeEventListener("touchend", unlock);
                        element.removeEventListener("click", unlock);
                    });
                };
                /* adds click/touch detection */
                element.addEventListener("touchstart", unlock);
                element.addEventListener("touchend", unlock);
                element.addEventListener("click", unlock);
            }
        } catch (error) {
            /* logs the error */
            console.error(error);
        }

    }

    /**
     * Plays a sound object
     * @param {Sound} sound The sound object created using new Sound()
     */
    static play(sound) {
        /* sound buffer source */
        let source = audioContext.createBufferSource();
        /* sound's audio buffer */
        source.buffer = sound.audioBuffer;
        /* connects the source to the user */
        source.connect(audioContext.destination)
        /* starts the music */
        source.start();

        /* sets the source of sound equal to the source */
        sound.source = source;
    }

    /**
     * Stops a sound object
     * @param {Sound} sound The sound object created using new Sound() 
     */
    static stop(sound) {
        /* stops the source of the sound */
        sound.source.stop();
    }
}