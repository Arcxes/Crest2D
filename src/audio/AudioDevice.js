//AudioDevice.js
//Author - Arcxes

/*
    AudioDevice is designed to handle unlocking access.
*/

//AudioDevice Class
export class AudioDevice{

    //enable audio access when the element is clicked
    static enableAudioAccess(element){
        try{
            let context = window.audioContext;
            if(context.state == "suspended"){
                let unlock = function(){
                    context.resume().then(function(){
                        element.removeEventListener("touchstart",unlock);
                        element.removeEventListener("touchend",unlock);
                        element.removeEventListener("click",unlock);
                    });
                };
                element.addEventListener("touchstart",unlock);
                element.addEventListener("touchend",unlock);
                element.addEventListener("click",unlock);
            }
        }catch(error){
            console.error(error);
        }

    }

    //create an audio source based on audio data
    static makeSource(buffer,volume){
        let context = window.audioContext;
        let source = context.createBufferSource();
        let gainNode = context.createGain();
        gainNode.gain.value = volume;
        source.buffer = buffer;
        source.connect(gainNode);
        gainNode.connect(context.destination);
        return source;
    }

    //return the volume in data or percentage format
    static translateVolume(volume,inverse){
        return inverse ? volime * 100: volume / 100;
    }

    //stop an audio source playback
    static stop(url){
        if(window.activeSounds.hasOwnProperty(url)){
            for(let i in window.activeSounds[url]){
                if(window.activeSounds[url].hasOwnProperty(i)){
                    window.activeSounds[url][i].stop();
                }
            }
        }
    }

    //register an audio source as playing
    static registerSound(url,source){
        if(!window.activeSounds.hasOwnProperty(url)){
            window.activeSounds[url] = [];
        }
        window.activeSounds[url].push(source);
    }
}