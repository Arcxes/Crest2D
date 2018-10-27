//Audio.js
//Author - Arcxes

/*
    Audio is designed to handle containment and manipulation of audio data
*/

//imports
import {AudioDevice} from "./AudioDevice";

//Audio Class
export class Audio{

    constructor(url,buffer){
        this.url = url;
        this.buffer = buffer;
        this.looping = false;
        this.volume = 1;
    }

    //play the audio
    play(){
        let source = AudioDevice.makeSource(this.buffer,this.volume);
        source.loop = this.looping;
        source.start();

        AudioDevice.registerSound(this.url,source);
    }

    //stop the audio
    stop(){
        AudioDevice.stop(this.url);
    }

    //return the volume of the audio
    getVolume(){
        return AudioDevice.translateVolume(this.volume,true);
    }

    //set the volume of the audio
    setVolume(volume){
        this.volume = AudioDevice.translateVolume(volume);
    }

    //set the looping property of the audio
    setLooping(looping){
        this.looping = looping;
    }

    //return the state of the audio's looping property
    isLooping(){
        return this.looping;
    }
}