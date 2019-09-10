import { Sound } from "../audio/Sound";

export class AudioLoader{ 
    constructor(){
        window.audioContext = window.audioContext || new AudioContext();
    }

    /**
     * 
     * @param {string} url the url to the music asset
     * @param {Loader} loader the main loader
     */

    /* you need to load in audio data, then pass that to a sound object if it succeeds */
    load(url, loader){
        /* window.fetch goes here */

        window.fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            loader.successCount++;
            loader.cache[url] = new Sound(audioBuffer);
            if (loader.isDone()) {
                loader.callback();
            }
        }).catch(() => {
            loader.errorCount++;
            console.error(`Failed to load music asset: { url: ${url}}`);
            if (loader.isDone()) {
                loader.callback();
            }
        })
    }
}