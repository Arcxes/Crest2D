//AudioLoader.js
//Author - Arcxes

/*
    AudioLoader is designed to load audio files
*/

//imports
import {Audio} from "../audio/Audio";

//AudioLoader Class
export class AudioLoader{

    constructor(){
        this.context = window.audioContext;
    }

    //load the audio source as an Audio object
    load(url,loader){
        let request = new XMLHttpRequest();
        request.responseType = "arraybuffer";
        request.open("GET",url,true);
        let self = this;
        request.onload = function(){
            self.context.decodeAudioData(request.response, function(buffer){
                if(!buffer){
                    console.error(`Failed to load asset: { url: ${url}}`);
                    return;
                }
                let audio = new Audio(url,buffer);
                loader.successCount++;
                loader.cache[url] = audio;
                if(loader.isDone()){
                    loader.callback();
                }
            });
        };
        request.onerror = function(){
            loader.errorCount++;
            console.error(`Failed to load asset: { url: ${url}}`);
            if(loader.isDone()){
                loader.callback();
            }
        };
        request.send();
    }
}