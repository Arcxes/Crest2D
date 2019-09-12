//AudioLoader.js
//Author - Daniel Wedding

/*
    Audio Loader loads any audio file. 
*/

//imports
import { Sound } from "../audio/Sound";

export class AudioLoader {
    constructor() {
        /* Audio context of the Audio Loader */
        window.audioContext = window.audioContext || new AudioContext();
    }

    /**
     * loads a new audio file
     * @param {string} url the url to the music asset
     * @param {Loader} loader the main loader
     */
    load(url, loader) {
        window.fetch(url)
            .then(response => {
                return response.arrayBuffer()
            })
            .then(arrayBuffer => {
                return audioContext.decodeAudioData(arrayBuffer)
            })
            .then(audioBuffer => {
                /* amount of times a file has successfully been loaded */
                loader.successCount += 1;
                /* cache full of assets */
                loader.cache[url] = new Sound(audioBuffer);
                if (loader.isDone()) {
                    loader.callback();
                }

            }).catch((err) => {
                if (err) throw err;
                /* amount of times an asset has failed to load */
                loader.errorCount++;
                console.error(`Failed to load music asset: { url: ${url}}`);
                if (loader.isDone()) {
                    loader.callback();
                }
            })
    }
}